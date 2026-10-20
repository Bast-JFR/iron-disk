import { filtrarProductos } from './filtros';

const PRODUCTOS = [
  { nombre: 'Powerslave', artista: 'Iron Maiden', categoria: 'metal', formato: 'CD' },
  { nombre: 'Rust in Peace', artista: 'Megadeth', categoria: 'metal', formato: 'Vinilo' },
  { nombre: 'Arriba las Manos', artista: 'Pibes Chorros', categoria: 'cumbia', formato: 'CD' },
];

describe('filtrarProductos', () => {
  it('devuelve todo si no hay filtros', () => {
    expect(filtrarProductos(PRODUCTOS, {}).length).toBe(3);
  });

  it('busca por nombre o artista sin importar mayusculas', () => {
    expect(filtrarProductos(PRODUCTOS, { texto: 'MEGA' }).length).toBe(1);
    expect(filtrarProductos(PRODUCTOS, { texto: 'powerslave' }).length).toBe(1);
  });

  it('combina categoria y formato', () => {
    const resultado = filtrarProductos(PRODUCTOS, { categoria: 'metal', formato: 'CD' });
    expect(resultado.length).toBe(1);
    expect(resultado[0].nombre).toBe('Powerslave');
  });
});
