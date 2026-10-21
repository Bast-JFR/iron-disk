import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminOrdenes from './AdminOrdenes';

// Reemplaza localStorage por un objeto en memoria para no tocar el del navegador
function simularAlmacen() {
  const datos = {};
  spyOn(Storage.prototype, 'getItem').and.callFake((clave) => (clave in datos ? datos[clave] : null));
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    datos[clave] = String(valor);
  });
}

function guardarOrdenes(ordenes) {
  localStorage.setItem('iron-disk-react-ordenes', JSON.stringify(ordenes));
}

function orden(id, fecha, total = 9990) {
  return {
    id,
    fecha,
    estado: 'Pagada',
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
  beforeEach(simularAlmacen);

  it('avisa cuando no hay ordenes', () => {
    const { container } = dibujar();
    expect(container.textContent).toContain('Todavía no hay órdenes');
  });

  it('lista las ordenes guardadas', () => {
    guardarOrdenes([orden('ORD-00001', '2026-10-01T10:00:00.000Z'), orden('ORD-00002', '2026-10-05T10:00:00.000Z')]);

    const { container } = dibujar();

    expect(container.querySelectorAll('tbody tr').length).toBe(2);
  });

  it('muestra la orden mas nueva primero', () => {
    guardarOrdenes([orden('ORD-00001', '2026-10-01T10:00:00.000Z'), orden('ORD-00002', '2026-10-05T10:00:00.000Z')]);

    const { container } = dibujar();

    expect(container.querySelector('tbody tr').textContent).toContain('ORD-00002');
  });
});
