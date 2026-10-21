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
});
