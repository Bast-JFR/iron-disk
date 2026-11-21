import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HistorialCompras from './HistorialCompras';
import { usuarioService } from '../../services/usuarioService';
import { boletaService } from '../../services/boletaService';

const USUARIO = { id: 4, run: '123456785', nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com' };

const ORDEN = {
  id: 1,
  numero: 'ORD-00001',
  fecha: '2026-10-05T10:00:00',
  estado: 'Pagada',
  estadoApi: 'PAGADA',
  cliente: { nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com' },
  direccion: { calle: 'Calle Valparaíso 567', region: 'Valparaíso', comuna: 'Viña del Mar' },
  items: [{ codigo: 'IM-001', nombre: 'Powerslave', precio: 15990, cantidad: 1 }],
  total: 15990,
};

function esperar(condicion) {
  return waitFor(() => {
    if (!condicion()) {
      throw new Error('La condición todavía no se cumple');
    }
  });
}

function dibujar(id) {
  return render(
    <MemoryRouter initialEntries={[`/admin/usuarios/${id}/compras`]}>
      <Routes>
        <Route path="/admin/usuarios/:id/compras" element={<HistorialCompras />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('HistorialCompras', () => {
  it('muestra las compras del usuario que compro', async () => {
    spyOn(usuarioService, 'obtener').and.returnValue(Promise.resolve(USUARIO));
    spyOn(boletaService, 'porUsuario').and.returnValue(Promise.resolve([ORDEN]));
    const { container } = dibujar(4);

    await esperar(() => container.textContent.includes('ORD-00001'));

    expect(container.querySelectorAll('tbody tr').length).toBe(1);
    expect(boletaService.porUsuario).toHaveBeenCalledWith('4');
  });
});
