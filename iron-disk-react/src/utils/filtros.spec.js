import { filtrarProductos, filtrarUsuarios } from './filtros';

const PRODUCTOS = [
  { nombre: 'Powerslave', artista: 'Iron Maiden', categoria: 'metal', formato: 'CD' },
  { nombre: 'Rust in Peace', artista: 'Megadeth', categoria: 'metal', formato: 'Vinilo' },
  { nombre: 'Arriba las Manos', artista: 'Pibes Chorros', categoria: 'cumbia', formato: 'CD' },
];

const USUARIOS = [
  { nombre: 'Bastián', apellidos: 'Jofré', correo: 'ba.jofre@duoc.cl' },
  { nombre: 'Renato', apellidos: 'Colipe Lienan', correo: 're.colipe@duoc.cl' },
  { nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com' },
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

describe('filtrarUsuarios', () => {
  it('devuelve todos si no hay texto', () => {
    expect(filtrarUsuarios(USUARIOS, '').length).toBe(3);
  });

  it('busca por nombre, apellidos o correo sin importar mayusculas', () => {
    expect(filtrarUsuarios(USUARIOS, 'COLIPE').length).toBe(1);
    expect(filtrarUsuarios(USUARIOS, 'jofre').length).toBe(1);
    expect(filtrarUsuarios(USUARIOS, 'gmail.com').length).toBe(1);
  });
});
