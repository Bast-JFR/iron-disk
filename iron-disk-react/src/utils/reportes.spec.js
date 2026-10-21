import { resumenVentas } from './reportes';

describe('reportes', () => {
  it('suma solo las ordenes pagadas y cuenta las rechazadas', () => {
    const ordenes = [
      { estado: 'Pagada', total: 10000 },
      { estado: 'Pagada', total: 5000 },
      { estado: 'Pago rechazado', total: 8000 },
    ];

    expect(resumenVentas(ordenes)).toEqual({ pagadas: 2, rechazadas: 1, totalVendido: 15000 });
  });
});
