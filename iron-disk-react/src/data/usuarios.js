// Usuarios de la tienda, un arreglo base con las operaciones sobre localStorage
import { leer, guardar } from './storage';

export const CLAVE_USUARIOS = 'iron-disk-react-usuarios';

export const TIPOS_USUARIO = ['Administrador', 'Vendedor', 'Cliente'];

// Usuarios de ejemplo con RUN validos
export const USUARIOS_BASE = [
  { run: '190110222', nombre: 'Bastián', apellidos: 'Jofré', correo: 'ba.jofre@duoc.cl', contrasena: 'admin123', fechaNacimiento: '', tipoUsuario: 'Administrador', region: 'Metropolitana de Santiago', comuna: 'Providencia', direccion: 'Av. Providencia 2124, local 15' },
  { run: '181245875', nombre: 'Renato', apellidos: 'Colipe Lienan', correo: 're.colipe@duoc.cl', contrasena: 'admin123', fechaNacimiento: '', tipoUsuario: 'Administrador', region: 'Metropolitana de Santiago', comuna: 'Santiago', direccion: 'Alameda 1234' },
  { run: '123456785', nombre: 'Camila', apellidos: 'Soto Rojas', correo: 'camila.soto@gmail.com', contrasena: 'cliente1', fechaNacimiento: '1998-05-12', tipoUsuario: 'Cliente', region: 'Valparaíso', comuna: 'Viña del Mar', direccion: 'Calle Valparaíso 567' },
  { run: '204567891', nombre: 'Diego', apellidos: 'Pérez Mora', correo: 'diego.perez@duoc.cl', contrasena: 'vendedor1', fechaNacimiento: '', tipoUsuario: 'Vendedor', region: 'Biobío', comuna: 'Concepción', direccion: 'Barros Arana 890' },
];

export function obtenerUsuarios() {
  return leer(CLAVE_USUARIOS, USUARIOS_BASE);
}

export function buscarUsuarioPorRun(run) {
  return obtenerUsuarios().find((u) => u.run === run);
}

export function buscarUsuarioPorCorreo(correo) {
  return obtenerUsuarios().find((u) => u.correo.toLowerCase() === correo.toLowerCase());
}

export function agregarUsuario(usuario) {
  guardar(CLAVE_USUARIOS, [...obtenerUsuarios(), usuario]);
}

export function actualizarUsuario(run, datosNuevos) {
  guardar(
    CLAVE_USUARIOS,
    obtenerUsuarios().map((u) => (u.run === run ? datosNuevos : u))
  );
}

export function eliminarUsuario(run) {
  guardar(
    CLAVE_USUARIOS,
    obtenerUsuarios().filter((u) => u.run !== run)
  );
}
