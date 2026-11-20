import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';
import { authService } from '../services/authService';
import { tokens } from '../services/api';

const RESPUESTA = {
  accessToken: 'acceso-123',
  refreshToken: 'renovacion-123',
  expiraEnMs: 900000,
  usuario: { id: 4, run: '123456785', nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com', rol: 'CLIENTE' },
};

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
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
}

function escribir(container, id, valor) {
  fireEvent.change(container.querySelector(`#${id}`), { target: { value: valor } });
}

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('con un correo invalido muestra el error y no llama al backend', () => {
    spyOn(authService, 'login');
    const { container } = dibujar();

    escribir(container, 'correo', 'ana@hotmail.com');
    escribir(container, 'contrasena', 'abcd');
    fireEvent.submit(container.querySelector('form'));

    expect(container.textContent).toContain('Solo se aceptan');
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('con datos correctos guarda los tokens de la sesion', async () => {
    spyOn(authService, 'login').and.returnValue(Promise.resolve(RESPUESTA));
    const { container } = dibujar();

    escribir(container, 'correo', 'camila.soto@gmail.com');
    escribir(container, 'contrasena', 'cliente1');
    fireEvent.submit(container.querySelector('form'));

    await esperar(() => tokens.access === 'acceso-123');
    expect(tokens.refresh).toBe('renovacion-123');
    expect(authService.login).toHaveBeenCalledWith('camila.soto@gmail.com', 'cliente1');
  });
});
