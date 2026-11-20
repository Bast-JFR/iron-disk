import { render, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { authService } from '../services/authService';
import { tokens } from '../services/api';

const ADMIN = { id: 1, run: '190110222', nombre: 'Bastián', apellidos: 'Jofré', correo: 'ba.jofre@duoc.cl', rol: 'ADMIN' };

// Componente de prueba que muestra lo que entrega el contexto
function Sonda() {
  const { usuario, verificando, esAdmin, cerrarSesion } = useAuth();
  return (
    <div>
      <span id="estado">{verificando ? 'verificando' : 'listo'}</span>
      <span id="usuario">{usuario ? `${usuario.nombre} ${usuario.tipoUsuario}` : 'sin sesion'}</span>
      <span id="admin">{esAdmin ? 'si' : 'no'}</span>
      <button onClick={cerrarSesion}>salir</button>
    </div>
  );
}

// Reintenta hasta que se cumpla la condicion, porque el expect de Jasmine no lanza error y waitFor no reintentaria
function esperar(condicion) {
  return waitFor(() => {
    if (!condicion()) {
      throw new Error('La condición todavía no se cumple');
    }
  });
}

function dibujar() {
  return render(
    <AuthProvider>
      <Sonda />
    </AuthProvider>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('al recargar con un token guardado recupera al usuario desde el backend', async () => {
    tokens.guardar('acceso', 'renovacion');
    spyOn(authService, 'me').and.returnValue(Promise.resolve(ADMIN));
    const { container } = dibujar();

    // Mientras valida el token todavia no se decide nada
    expect(container.querySelector('#estado').textContent).toBe('verificando');
    await esperar(() => container.querySelector('#estado').textContent === 'listo');

    expect(container.querySelector('#usuario').textContent).toBe('Bastián Administrador');
    expect(container.querySelector('#admin').textContent).toBe('si');
  });
});
