import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductGrid from './ProductGrid';

const PRODUCTOS = [
  { codigo: 'A-1', nombre: 'Disco A', artista: 'Banda A', formato: 'CD', precio: 10000, stock: 5, ofertaPorcentaje: 0, imagen: 'img/a.png' },
  { codigo: 'B-1', nombre: 'Disco B', artista: 'Banda B', formato: 'Vinilo', precio: 20000, stock: 0, ofertaPorcentaje: 10, imagen: 'img/b.png' },
];

function dibujar(productos, alAgregar = () => {}) {
  return render(
    <MemoryRouter>
      <ProductGrid productos={productos} onAgregar={alAgregar} />
    </MemoryRouter>
  );
}

describe('ProductGrid', () => {
  it('dibuja una tarjeta por cada producto', () => {
    const { container } = dibujar(PRODUCTOS);
    expect(container.querySelectorAll('.card-producto').length).toBe(2);
  });

  it('muestra un mensaje si no hay productos', () => {
    const { container } = dibujar([]);
    expect(container.textContent).toContain('No se encontraron productos');
  });

  it('llama a onAgregar con el producto al presionar Añadir', () => {
    const alAgregar = jasmine.createSpy('alAgregar');
    const { container } = dibujar(PRODUCTOS, alAgregar);

    fireEvent.click(container.querySelector('.card-producto button'));

    expect(alAgregar).toHaveBeenCalledWith(PRODUCTOS[0]);
  });

  it('deshabilita el boton cuando no hay stock', () => {
    const { container } = dibujar(PRODUCTOS);
    const botones = container.querySelectorAll('.card-producto button');
    expect(botones[1].disabled).toBe(true);
  });
});
