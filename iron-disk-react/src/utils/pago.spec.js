import { simularPago } from './pago';

describe('simularPago', () => {
  it('aprueba una tarjeta normal', () => {
    expect(simularPago('4111111111111111').aprobado).toBe(true);
  });

  it('rechaza las tarjetas que parten con 0000', () => {
    const resultado = simularPago('0000111122223333');
    expect(resultado.aprobado).toBe(false);
    expect(resultado.motivo).not.toBe('');
  });
});
