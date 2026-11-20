import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Perfil from './Perfil';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { tokens } from '../../services/api';
import { USUARIOS_BASE } from '../../data/usuarios';

// Reemplaza localStorage por un objeto en memoria para no tocar el del navegador
function simularAlmacen() {
  const datos = {};
  spyOn(Storage.prototype, 'getItem').and.callFake((clave) => (clave in datos ? datos[clave] : null));
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    datos[clave] = String(valor);
  });
}

// El perfil solo se muestra cuando ya se valido la sesion, igual que en el panel
function SoloConSesion({ children }) {
  const { verificando } = useAuth();
  return verificando ? null : children;
}

// Deja iniciada la sesion de Renato, que es administrador
function dibujarConSesion() {
  const renato = { ...USUARIOS_BASE.find((u) => u.correo === 're.colipe@duoc.cl'), rol: 'ADMIN' };
  tokens.guardar('acceso', 'renovacion');
  spyOn(authService, 'me').and.returnValue(Promise.resolve(renato));

  return render(
    <MemoryRouter>
      <AuthProvider>
        <SoloConSesion>
          <Perfil />
        </SoloConSesion>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Perfil', () => {
  beforeEach(simularAlmacen);

  it('muestra los datos del administrador con sesion', async () => {
    const { container } = dibujarConSesion();

    await waitFor(() => {
      if (!container.textContent.includes('re.colipe@duoc.cl')) {
        throw new Error('La sesión todavía no se recupera');
      }
    });

    expect(container.textContent).toContain('re.colipe@duoc.cl');
    expect(container.textContent).toContain('Renato Colipe Lienan');
  });
});
