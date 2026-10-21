import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductGrid from './ProductGrid';

const PRODUCTOS = [
  { codigo: 'A-1', nombre: 'Disco A', artista: 'Banda A', formato: 'CD', precio: 10000, stock: 5, ofertaPorcentaje: 0, imagen: 'img/a.png' },
  { codigo: 'B-1', nombre: 'Disco B', artista: 'Banda B', formato: 'Vinilo', precio: 20000, stock: 0, ofertaPorcentaje: 10, imagen: 'img/b.png' },
];

describe('ProductGrid', () => {
  it('dibuja una tarjeta por cada producto', () => {
    const { container } = render(
      <MemoryRouter>
        <ProductGrid productos={PRODUCTOS} onAgregar={() => {}} />
      </MemoryRouter>
    );
    expect(container.querySelectorAll('.card-producto').length).toBe(2);
  });
});
