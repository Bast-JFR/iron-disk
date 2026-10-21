import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Boleta from './Boleta';

// Reemplaza localStorage por un objeto en memoria para no tocar el del navegador
function simularAlmacen() {
  const datos = {};
  spyOn(Storage.prototype, 'getItem').and.callFake((clave) => (clave in datos ? datos[clave] : null));
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    datos[clave] = String(valor);
  });
}

function guardarOrdenDeEjemplo() {
  const orden = {
    id: 'ORD-00001',
    fecha: '2026-10-05T10:00:00.000Z',
    estado: 'Pagada',
    cliente: { nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com' },
    direccion: { calle: 'Calle Valparaíso 567', region: 'Valparaíso', comuna: 'Viña del Mar' },
    items: [{ codigo: 'IM-001', nombre: 'Powerslave', precio: 15990, cantidad: 1 }],
    total: 15990,
  };
  localStorage.setItem('iron-disk-react-ordenes', JSON.stringify([orden]));
}

function dibujar(id) {
  return render(
    <MemoryRouter initialEntries={[`/admin/ordenes/${id}`]}>
      <Routes>
        <Route path="/admin/ordenes/:id" element={<Boleta />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Boleta', () => {
  beforeEach(simularAlmacen);

  it('muestra los datos de la orden', () => {
    guardarOrdenDeEjemplo();
    const { container } = dibujar('ORD-00001');

    expect(container.textContent).toContain('ORD-00001');
    expect(container.textContent).toContain('Camila Soto Rojas');
    expect(container.textContent).toContain('Powerslave');
  });

  it('el boton imprimir llama a window.print', () => {
    guardarOrdenDeEjemplo();
    spyOn(window, 'print');
    const { container } = dibujar('ORD-00001');

    fireEvent.click(Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Imprimir'));

    expect(window.print).toHaveBeenCalled();
  });
});
