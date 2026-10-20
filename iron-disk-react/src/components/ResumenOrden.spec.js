import { render } from '@testing-library/react';
import ResumenOrden from './ResumenOrden';

const ORDEN = {
  id: 'ORD-00007',
  fecha: '2026-10-20T15:30:00.000Z',
  estado: 'Pagada',
  cliente: { nombre: 'Camila', apellidos: 'Soto', correo: 'camila@gmail.com' },
  direccion: { calle: 'Calle 123', region: 'Valparaíso', comuna: 'Viña del Mar' },
  items: [
    { codigo: 'A-1', nombre: 'Disco A', precio: 10000, cantidad: 2 },
    { codigo: 'B-1', nombre: 'Disco B', precio: 5000, cantidad: 1 },
  ],
  total: 25000,
};

describe('ResumenOrden', () => {
  it('muestra el numero de orden y los datos del cliente', () => {
    const { container } = render(<ResumenOrden orden={ORDEN} />);
    expect(container.textContent).toContain('ORD-00007');
    expect(container.textContent).toContain('camila@gmail.com');
  });

  it('muestra una fila por producto y el total', () => {
    const { container } = render(<ResumenOrden orden={ORDEN} />);
    expect(container.querySelectorAll('tbody tr').length).toBe(2);
    expect(container.querySelector('tfoot').textContent).toContain('25');
  });

  it('muestra la direccion de envio', () => {
    const { container } = render(<ResumenOrden orden={ORDEN} />);
    expect(container.textContent).toContain('Viña del Mar, Valparaíso');
  });
});
