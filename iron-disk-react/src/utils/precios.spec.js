import { precioFinal } from './precios';

describe('precios', () => {
  it('aplica el porcentaje de oferta al precio', () => {
    expect(precioFinal({ precio: 32990, ofertaPorcentaje: 15 })).toBe(28042);
  });
});
