import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminOrdenes from './AdminOrdenes';
import { boletaService } from '../../services/boletaService';

function esperar(condicion) {
  return waitFor(() => {
    if (!condicion()) {
      throw new Error('La condición todavía no se cumple');
    }
  });
}

function orden(id, fecha, total = 9990) {
  return {
    id,
    numero: `ORD-0000${id}`,
    fecha,
    estado: 'Pagada',
    estadoApi: 'PAGADA',
    cliente: { nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com' },
    direccion: { calle: 'Calle Valparaíso 567', region: 'Valparaíso', comuna: 'Viña del Mar' },
    items: [{ codigo: 'IM-001', nombre: 'Powerslave', precio: total, cantidad: 1 }],
    total,
  };
}

function dibujar() {
  return render(
    <MemoryRouter>
      <AdminOrdenes />
    </MemoryRouter>
  );
}

describe('AdminOrdenes', () => {
  it('lista las ordenes que entrega el backend', async () => {
    spyOn(boletaService, 'listar').and.returnValue(Promise.resolve([orden(2, '2026-10-05T10:00:00'), orden(1, '2026-10-01T10:00:00')]));

    const { container } = dibujar();

    await esperar(() => container.querySelectorAll('tbody tr').length === 2);
    expect(container.textContent).toContain('ORD-00002');
  });
});
