import { simularPago } from './pago';

describe('simularPago', () => {
  it('rechaza las tarjetas que parten con 0000', () => {
    const resultado = simularPago('0000111122223333');
    expect(resultado.aprobado).toBe(false);
    expect(resultado.motivo).not.toBe('');
  });
});
