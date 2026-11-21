import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Checkout from './Checkout';
import CompraError from './CompraError';
import { AuthContext } from '../context/AuthContext';
import { CarritoProvider, CLAVE_CARRITO } from '../context/CarritoContext';
import { boletaService } from '../services/boletaService';

const DISCO = { id: 1, codigo: 'IM-001', nombre: 'The Number of the Beast', precio: 28042, cantidad: 2 };

function esperar(condicion) {
  return waitFor(() => {
    if (!condicion()) {
      throw new Error('La condición todavía no se cumple');
    }
  });
}

function dibujar() {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify([DISCO]));
  return render(
    <AuthContext.Provider value={{ usuario: null, verificando: false }}>
      <CarritoProvider>
        <MemoryRouter initialEntries={['/checkout']}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/compra-error" element={<CompraError />} />
          </Routes>
        </MemoryRouter>
      </CarritoProvider>
    </AuthContext.Provider>
  );
}

function escribir(container, id, valor) {
  fireEvent.change(container.querySelector(`#${id}`), { target: { value: valor } });
}

describe('Checkout', () => {
  afterEach(() => localStorage.clear());

  it('si el backend responde que falta stock muestra el mensaje y deja el carrito', async () => {
    const respuesta = { response: { status: 409, data: { mensaje: 'Stock insuficiente para The Number of the Beast' } } };
    spyOn(boletaService, 'comprar').and.callFake(() => Promise.reject(respuesta));
    const { container } = dibujar();

    escribir(container, 'nombre', 'Camila');
    escribir(container, 'apellidos', 'Soto Rojas');
    escribir(container, 'correo', 'camila.soto@gmail.com');
    escribir(container, 'direccion', 'Calle Valparaiso 567');
    escribir(container, 'region', 'Valparaíso');
    escribir(container, 'comuna', 'Viña del Mar');
    escribir(container, 'tarjeta', '4111111111111111');
    fireEvent.submit(container.querySelector('form'));

    await esperar(() => container.textContent.includes('Stock insuficiente para The Number of the Beast'));
    expect(boletaService.comprar).toHaveBeenCalled();
    expect(JSON.parse(localStorage.getItem(CLAVE_CARRITO)).length).toBe(1);
  });
});
