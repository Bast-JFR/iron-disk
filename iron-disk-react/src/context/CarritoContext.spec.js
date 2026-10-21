import { agregarItem, calcularTotal, contarUnidades } from './CarritoContext';

const DISCO_A = { codigo: 'A-1', nombre: 'Disco A', precio: 10000 };
const DISCO_B = { codigo: 'B-1', nombre: 'Disco B', precio: 5000 };

describe('carrito', () => {
  it('calcula el total y las unidades', () => {
    const items = agregarItem(agregarItem([], DISCO_A, 2), DISCO_B, 1);
    expect(calcularTotal(items)).toBe(25000);
    expect(contarUnidades(items)).toBe(3);
  });
});
