// Convierten los datos que manda el backend a la forma que ya usan los componentes del frontend

const TIPOS_USUARIO = { ADMIN: 'Administrador', VENDEDOR: 'Vendedor', CLIENTE: 'Cliente' };

export function aUsuarioFront(usuario) {
  return {
    ...usuario,
    tipoUsuario: TIPOS_USUARIO[usuario.rol] || usuario.rol,
    fechaNacimiento: usuario.fechaNacimiento || '',
  };
}
