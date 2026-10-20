import { agregarItem, quitarItem, cambiarCantidadItem, calcularTotal, contarUnidades } from './CarritoContext';

const DISCO_A = { codigo: 'A-1', nombre: 'Disco A', precio: 10000 };
const DISCO_B = { codigo: 'B-1', nombre: 'Disco B', precio: 5000 };

describe('carrito', () => {
  it('agrega un producto nuevo con su cantidad', () => {
    const items = agregarItem([], DISCO_A, 2);
    expect(items.length).toBe(1);
    expect(items[0].cantidad).toBe(2);
  });

  it('suma la cantidad si el producto ya estaba', () => {
    const items = agregarItem(agregarItem([], DISCO_A, 1), DISCO_A, 3);
    expect(items.length).toBe(1);
    expect(items[0].cantidad).toBe(4);
  });

  it('calcula el total y las unidades', () => {
    const items = agregarItem(agregarItem([], DISCO_A, 2), DISCO_B, 1);
    expect(calcularTotal(items)).toBe(25000);
    expect(contarUnidades(items)).toBe(3);
  });

  it('quita un producto sin modificar el arreglo original', () => {
    const original = agregarItem(agregarItem([], DISCO_A, 1), DISCO_B, 1);
    const nuevo = quitarItem(original, 'A-1');
    expect(nuevo.length).toBe(1);
    expect(original.length).toBe(2);
  });

  it('cambia la cantidad de un producto', () => {
    const items = cambiarCantidadItem(agregarItem([], DISCO_A, 1), 'A-1', 5);
    expect(items[0].cantidad).toBe(5);
  });
});
