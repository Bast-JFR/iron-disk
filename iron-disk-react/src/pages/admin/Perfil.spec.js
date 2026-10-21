import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Perfil from './Perfil';
import { AuthProvider } from '../../context/AuthContext';
import { USUARIOS_BASE } from '../../data/usuarios';

// Reemplaza localStorage por un objeto en memoria para no tocar el del navegador
function simularAlmacen() {
  const datos = {};
  spyOn(Storage.prototype, 'getItem').and.callFake((clave) => (clave in datos ? datos[clave] : null));
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    datos[clave] = String(valor);
  });
}

// Deja iniciada la sesion de Renato, que es administrador
function dibujarConSesion() {
  const renato = USUARIOS_BASE.find((u) => u.correo === 're.colipe@duoc.cl');
  localStorage.setItem('iron-disk-react-sesion', JSON.stringify(renato));

  return render(
    <MemoryRouter>
      <AuthProvider>
        <Perfil />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('Perfil', () => {
  beforeEach(simularAlmacen);

  it('muestra los datos del administrador con sesion', () => {
    const { container } = dibujarConSesion();

    expect(container.textContent).toContain('re.colipe@duoc.cl');
    expect(container.textContent).toContain('Renato Colipe Lienan');
  });
});
