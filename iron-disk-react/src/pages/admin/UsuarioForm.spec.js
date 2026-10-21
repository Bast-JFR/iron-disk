import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UsuarioForm from './UsuarioForm';

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
      <UsuarioForm />
    </MemoryRouter>
  );
}

function escribir(container, id, valor) {
  fireEvent.change(container.querySelector(`#${id}`), { target: { value: valor } });
}

function ultimoGuardado() {
  const guardados = Storage.prototype.setItem.calls.allArgs().filter((args) => args[0] === 'iron-disk-react-usuarios');
  return JSON.parse(guardados[guardados.length - 1][1]);
}

describe('UsuarioForm', () => {
  beforeEach(simularAlmacen);

  it('con un run invalido muestra el error y no guarda', () => {
    const { container } = dibujar();

    escribir(container, 'run', '11111111');
    fireEvent.submit(container.querySelector('form'));

    expect(container.textContent).toContain('dígito verificador');
    expect(ultimoGuardado().some((u) => u.run === '11111111')).toBe(false);
  });

  it('con datos validos crea el usuario', () => {
    const { container } = dibujar();

    escribir(container, 'run', '205115706');
    escribir(container, 'nombre', 'Pedro');
    escribir(container, 'apellidos', 'Soto');
    escribir(container, 'correo', 'pedro.soto@gmail.com');
    escribir(container, 'contrasena', 'clave123');
    fireEvent.change(container.querySelector('#tipoUsuario'), { target: { value: 'Cliente' } });
    fireEvent.change(container.querySelector('#region'), { target: { value: 'Metropolitana de Santiago' } });
    fireEvent.change(container.querySelector('#comuna'), { target: { value: 'Santiago' } });
    escribir(container, 'direccion', 'Calle Falsa 123');

    fireEvent.submit(container.querySelector('form'));

    expect(ultimoGuardado().some((u) => u.run === '205115706')).toBe(true);
  });
});
