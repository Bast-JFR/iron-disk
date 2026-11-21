import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Boleta from './Boleta';
import { AuthContext } from '../../context/AuthContext';
import { boletaService } from '../../services/boletaService';

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

function dibujar(rol = 'ADMIN') {
  return render(
    <AuthContext.Provider value={{ usuario: { rol } }}>
      <MemoryRouter initialEntries={['/admin/ordenes/1']}>
        <Routes>
          <Route path="/admin/ordenes/:id" element={<Boleta />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('Boleta', () => {
  it('muestra los datos de la orden', async () => {
    spyOn(boletaService, 'obtener').and.returnValue(Promise.resolve(ORDEN));
    const { container } = dibujar();

    await esperar(() => container.textContent.includes('ORD-00001'));

    expect(container.textContent).toContain('Camila Soto Rojas');
    expect(container.textContent).toContain('Powerslave');
  });

  it('el boton imprimir llama a window.print', async () => {
    spyOn(boletaService, 'obtener').and.returnValue(Promise.resolve(ORDEN));
    spyOn(window, 'print');
    const { container } = dibujar();
    await esperar(() => container.textContent.includes('ORD-00001'));

    fireEvent.click(Array.from(container.querySelectorAll('button')).find((b) => b.textContent === 'Imprimir'));

    expect(window.print).toHaveBeenCalled();
  });
});
