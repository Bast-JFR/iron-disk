import { filtrarUsuarios } from './filtros';

const USUARIOS = [
  { nombre: 'Bastián', apellidos: 'Jofré', correo: 'ba.jofre@duoc.cl' },
  { nombre: 'Renato', apellidos: 'Colipe Lienan', correo: 're.colipe@duoc.cl' },
  { nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com' },
];

describe('filtrarUsuarios', () => {
  it('busca por nombre, apellidos o correo sin importar mayusculas', () => {
    expect(filtrarUsuarios(USUARIOS, 'COLIPE').length).toBe(1);
    expect(filtrarUsuarios(USUARIOS, 'jofre').length).toBe(1);
    expect(filtrarUsuarios(USUARIOS, 'gmail.com').length).toBe(1);
  });
});
