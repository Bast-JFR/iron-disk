import { buscarProductoPorCodigo, agregarProducto } from './productos';

// Reemplaza localStorage por un objeto en memoria para no tocar el del navegador
function simularAlmacen() {
  const datos = {};
  spyOn(Storage.prototype, 'getItem').and.callFake((clave) => (clave in datos ? datos[clave] : null));
  spyOn(Storage.prototype, 'setItem').and.callFake((clave, valor) => {
    datos[clave] = String(valor);
  });
}

describe('data de productos', () => {
  beforeEach(simularAlmacen);

  it('agrega y busca un producto', () => {
    agregarProducto({ codigo: 'ZZ-001', nombre: 'Nuevo', precio: 1000, stock: 1, stockCritico: 0, ofertaPorcentaje: 0 });
    expect(buscarProductoPorCodigo('ZZ-001').nombre).toBe('Nuevo');
  });
});
