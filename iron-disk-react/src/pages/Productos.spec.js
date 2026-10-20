import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Productos from './Productos';
import { CarritoProvider } from '../context/CarritoContext';

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
      <CarritoProvider>
        <Productos />
      </CarritoProvider>
    </MemoryRouter>
  );
}

describe('Productos', () => {
  beforeEach(simularAlmacen);

  it('muestra todos los productos al inicio', () => {
    const { container } = dibujar();
    expect(container.querySelectorAll('.card-producto').length).toBe(22);
  });

  it('el buscador filtra la lista al escribir', () => {
    const { container } = dibujar();

    fireEvent.change(container.querySelector('input[type="search"]'), { target: { value: 'metallica' } });

    expect(container.querySelectorAll('.card-producto').length).toBe(2);
  });

  it('el filtro de formato deja solo los cassettes', () => {
    const { container } = dibujar();

    fireEvent.change(container.querySelector('select[aria-label="Filtrar por formato"]'), { target: { value: 'Cassette' } });

    expect(container.querySelectorAll('.card-producto').length).toBe(4);
  });

  it('muestra un mensaje si la busqueda no encuentra nada', () => {
    const { container } = dibujar();

    fireEvent.change(container.querySelector('input[type="search"]'), { target: { value: 'zzzzz' } });

    expect(container.textContent).toContain('No se encontraron productos');
  });

  it('guarda el producto en el carrito al presionar Añadir', () => {
    const { container } = dibujar();

    fireEvent.click(container.querySelector('.card-producto button'));

    expect(container.textContent).toContain('al carrito');
    expect(Storage.prototype.setItem).toHaveBeenCalledWith('iron-disk-react-carrito', jasmine.any(String));
  });
});
