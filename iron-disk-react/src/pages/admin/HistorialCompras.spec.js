import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HistorialCompras from './HistorialCompras';

// Reemplaza localStorage por un objeto en memoria para no tocar el del navegador
function simularAlmacen() {
  const datos = {};
  spyOn(Storage.prototype, 'getItem').and.callFake((clave) => (clave in datos ? datos[clave] : null));
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    datos[clave] = String(valor);
  });
}

// Camila (run 123456785) tiene una compra guardada de antemano para el usuario de ejemplo
function guardarOrdenDeEjemplo() {
  const orden = {
    id: 'ORD-00001',
    fecha: new Date().toISOString(),
    estado: 'Pagada',
    cliente: { nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com' },
    direccion: { calle: 'Calle Valparaíso 567', region: 'Valparaíso', comuna: 'Viña del Mar' },
    items: [{ codigo: 'IM-001', nombre: 'Powerslave', precio: 15990, cantidad: 1 }],
    total: 15990,
  };
  localStorage.setItem('iron-disk-react-ordenes', JSON.stringify([orden]));
}

function dibujar(run) {
  return render(
    <MemoryRouter initialEntries={[`/admin/usuarios/${run}/compras`]}>
      <Routes>
        <Route path="/admin/usuarios/:run/compras" element={<HistorialCompras />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('HistorialCompras', () => {
  beforeEach(simularAlmacen);

  it('muestra las compras del usuario que compro', () => {
    guardarOrdenDeEjemplo();
    const { container } = dibujar('123456785');

    expect(container.textContent).toContain('ORD-00001');
    expect(container.querySelectorAll('tbody tr').length).toBe(1);
  });

  it('avisa cuando el usuario no tiene compras', () => {
    const { container } = dibujar('123456785');

    expect(container.textContent).toContain('todavía no tiene compras');
  });

  it('avisa cuando el run no corresponde a ningun usuario', () => {
    const { container } = dibujar('999999999');

    expect(container.textContent).toContain('Usuario no encontrado');
  });
});
