import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';

// Reemplaza localStorage por un objeto en memoria para no tocar el del navegador
function simularAlmacen() {
  const datos = {};
  spyOn(Storage.prototype, 'getItem').and.callFake((clave) => (clave in datos ? datos[clave] : null));
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    datos[clave] = String(valor);
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

// La sesion cuenta como guardada cuando se escribe un usuario y no el null inicial
function sesionGuardada() {
  return Storage.prototype.setItem.calls.allArgs().some((args) => args[0] === 'iron-disk-react-sesion' && args[1] !== 'null');
}

describe('Login', () => {
  beforeEach(simularAlmacen);

  it('con un correo invalido muestra el error y no inicia sesion', () => {
    const { container } = dibujar();

    escribir(container, 'correo', 'ana@hotmail.com');
    escribir(container, 'contrasena', 'abcd');
    fireEvent.submit(container.querySelector('form'));

    expect(container.textContent).toContain('Solo se aceptan');
    expect(sesionGuardada()).toBe(false);
  });

  it('con una contraseña incorrecta muestra el aviso de la cuenta', () => {
    const { container } = dibujar();

    escribir(container, 'correo', 'camila.soto@gmail.com');
    escribir(container, 'contrasena', 'mala1');
    fireEvent.submit(container.querySelector('form'));

    expect(container.querySelector('.alert-danger').textContent).toContain('contraseña es incorrecta');
    expect(sesionGuardada()).toBe(false);
  });

  it('con datos correctos guarda la sesion', () => {
    const { container } = dibujar();

    escribir(container, 'correo', 'camila.soto@gmail.com');
    escribir(container, 'contrasena', 'cliente1');
    fireEvent.submit(container.querySelector('form'));

    expect(sesionGuardada()).toBe(true);
  });
});
