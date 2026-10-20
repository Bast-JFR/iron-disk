import { obtenerProductos, buscarProductoPorCodigo, agregarProducto, actualizarProducto, eliminarProducto, precioFinal, productosCriticos, PRODUCTOS_BASE } from './productos';

// Reemplaza localStorage por un objeto en memoria para no tocar el del navegador
function simularAlmacen() {
  const datos = {};
  spyOn(Storage.prototype, 'getItem').and.callFake((clave) => (clave in datos ? datos[clave] : null));
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    datos[clave] = String(valor);
  });
  return datos;
}

describe('data de productos', () => {
  it('carga los productos base la primera vez y los guarda', () => {
    simularAlmacen();
    expect(obtenerProductos().length).toBe(PRODUCTOS_BASE.length);
    expect(Storage.prototype.setItem).toHaveBeenCalled();
  });

  it('agrega y busca un producto', () => {
    simularAlmacen();
    agregarProducto({ codigo: 'ZZ-001', nombre: 'Nuevo', precio: 1000, stock: 1, stockCritico: 0, ofertaPorcentaje: 0 });
    expect(buscarProductoPorCodigo('ZZ-001').nombre).toBe('Nuevo');
  });

  it('actualiza un producto existente', () => {
    simularAlmacen();
    const original = buscarProductoPorCodigo('IM-002');
    actualizarProducto('IM-002', { ...original, stock: 99 });
    expect(buscarProductoPorCodigo('IM-002').stock).toBe(99);
  });

  it('elimina un producto', () => {
    simularAlmacen();
    eliminarProducto('IM-002');
    expect(buscarProductoPorCodigo('IM-002')).toBeUndefined();
  });

  it('aplica el porcentaje de oferta al precio final', () => {
    expect(precioFinal({ precio: 10000, ofertaPorcentaje: 20 })).toBe(8000);
    expect(precioFinal({ precio: 10000, ofertaPorcentaje: 0 })).toBe(10000);
  });

  it('lista los productos con stock en nivel critico', () => {
    simularAlmacen();
    const criticos = productosCriticos();
    expect(criticos.length).toBeGreaterThan(0);
    expect(criticos.every((p) => p.stock <= p.stockCritico)).toBe(true);
  });
});
