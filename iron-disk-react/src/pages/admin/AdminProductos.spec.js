import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminProductos from './AdminProductos';

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
      <AdminProductos />
    </MemoryRouter>
  );
}

function boton(container, texto) {
  return Array.from(container.querySelectorAll('button')).find((b) => b.textContent === texto);
}

describe('AdminProductos', () => {
  beforeEach(simularAlmacen);

  it('lista todos los productos en la tabla', () => {
    const { container } = dibujar();
    expect(container.querySelectorAll('tbody tr').length).toBe(22);
  });

  it('pide confirmacion antes de eliminar', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const { container } = dibujar();

    fireEvent.click(boton(container, 'Eliminar'));

    expect(window.confirm).toHaveBeenCalled();
    expect(container.querySelectorAll('tbody tr').length).toBe(22);
  });

  it('elimina el producto cuando se confirma', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const { container } = dibujar();

    fireEvent.click(boton(container, 'Eliminar'));

    expect(container.querySelectorAll('tbody tr').length).toBe(21);
  });

  it('el buscador filtra la tabla', () => {
    const { container } = dibujar();

    fireEvent.change(container.querySelector('input[type="search"]'), { target: { value: 'slayer' } });

    expect(container.querySelectorAll('tbody tr').length).toBe(2);
  });
});
