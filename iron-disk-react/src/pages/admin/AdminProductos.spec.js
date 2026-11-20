import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminProductos from './AdminProductos';
import { productoService } from '../../services/productoService';

const PRODUCTOS = [
  { id: 1, codigo: 'IM-001', nombre: 'The Number of the Beast', artista: 'Iron Maiden', formato: 'Vinilo', precio: 32990, stock: 12, stockCritico: 3 },
  { id: 2, codigo: 'SL-002', nombre: 'Show No Mercy', artista: 'Slayer', formato: 'Cassette', precio: 11990, stock: 1, stockCritico: 2 },
  { id: 3, codigo: 'MG-002', nombre: 'Peace Sells', artista: 'Megadeth', formato: 'CD', precio: 15990, stock: 2, stockCritico: 3 },
];

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
      <AdminProductos />
    </MemoryRouter>
  );
}

function boton(container, texto) {
  return Array.from(container.querySelectorAll('button')).find((b) => b.textContent === texto);
}

describe('AdminProductos', () => {

  it('pide confirmacion antes de eliminar y no elimina si se cancela', async () => {
    spyOn(productoService, 'listar').and.returnValue(Promise.resolve(PRODUCTOS));
    spyOn(productoService, 'eliminar');
    spyOn(window, 'confirm').and.returnValue(false);
    const { container } = dibujar();
    await esperar(() => container.querySelectorAll('tbody tr').length === 3);

    fireEvent.click(boton(container, 'Eliminar'));

    expect(window.confirm).toHaveBeenCalled();
    expect(productoService.eliminar).not.toHaveBeenCalled();
  });
});
