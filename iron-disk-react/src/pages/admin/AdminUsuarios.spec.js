import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminUsuarios from './AdminUsuarios';

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
      <AdminUsuarios />
    </MemoryRouter>
  );
}

function boton(container, texto) {
  return Array.from(container.querySelectorAll('button')).find((b) => b.textContent === texto);
}

describe('AdminUsuarios', () => {
  beforeEach(simularAlmacen);

  it('lista todos los usuarios en la tabla', () => {
    const { container } = dibujar();
    expect(container.querySelectorAll('tbody tr').length).toBe(4);
  });

  it('pide confirmacion antes de eliminar', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const { container } = dibujar();

    fireEvent.click(boton(container, 'Eliminar'));

    expect(window.confirm).toHaveBeenCalled();
    expect(container.querySelectorAll('tbody tr').length).toBe(4);
  });

  it('elimina el usuario cuando se confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const { container } = dibujar();

    fireEvent.click(boton(container, 'Eliminar'));

    expect(container.querySelectorAll('tbody tr').length).toBe(3);
  });

  it('el buscador filtra la tabla', () => {
    const { container } = dibujar();

    fireEvent.change(container.querySelector('input[type="search"]'), { target: { value: 'camila' } });

    expect(container.querySelectorAll('tbody tr').length).toBe(1);
  });
});
