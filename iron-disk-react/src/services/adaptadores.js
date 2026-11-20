// Convierten los datos que manda el backend a la forma que ya usan los componentes del frontend

const TIPOS_USUARIO = { ADMIN: 'Administrador', VENDEDOR: 'Vendedor', CLIENTE: 'Cliente' };

export function aUsuarioFront(usuario) {
  return {
    ...usuario,
    tipoUsuario: TIPOS_USUARIO[usuario.rol] || usuario.rol,
    fechaNacimiento: usuario.fechaNacimiento || '',
  };
}

// El backend manda el id de la categoria como numero y el frontend lo usa como texto
export function aProductoFront(producto) {
  return { ...producto, categoria: String(producto.categoriaId) };
}

export function aCategoriaFront(categoria) {
  return { ...categoria, id: String(categoria.id) };
}

// Datos del formulario del panel a la forma que espera el backend
export function aProductoApi(formulario) {
  return {
    codigo: formulario.codigo,
    nombre: formulario.nombre,
    artista: formulario.artista,
    formato: formulario.formato,
    descripcion: formulario.descripcion,
    precio: Number(formulario.precio),
    ofertaPorcentaje: Number(formulario.ofertaPorcentaje) || 0,
    stock: Number(formulario.stock),
    stockCritico: Number(formulario.stockCritico) || 0,
    imagen: formulario.imagen,
    categoriaId: Number(formulario.categoria),
  };
}
