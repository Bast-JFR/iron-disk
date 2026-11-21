import { contarPor } from './reportes';

describe('reportes', () => {
  it('cuenta cuantos elementos hay de cada valor', () => {
    const usuarios = [{ tipo: 'Cliente' }, { tipo: 'Cliente' }, { tipo: 'Vendedor' }];

    expect(contarPor(usuarios, 'tipo')).toEqual({ Cliente: 2, Vendedor: 1 });
  });
});
