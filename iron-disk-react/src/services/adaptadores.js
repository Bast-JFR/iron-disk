// Convierten los datos que manda el backend a la forma que ya usan los componentes del frontend

const TIPOS_USUARIO = { ADMIN: 'Administrador', VENDEDOR: 'Vendedor', CLIENTE: 'Cliente' };

// Textos de los tipos de usuario para mostrar y para los selectores
export const NOMBRES_TIPO = Object.values(TIPOS_USUARIO);

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

const ESTADOS_BOLETA = { PAGADA: 'Pagada', ENVIADA: 'Enviada', ENTREGADA: 'Entregada', ANULADA: 'Anulada' };

// La boleta del backend se transforma en la orden que muestran las pantallas
export function aOrdenFront(boleta) {
  return {
    id: boleta.id,
    numero: `ORD-${String(boleta.id).padStart(5, '0')}`,
    fecha: boleta.fecha,
    estado: ESTADOS_BOLETA[boleta.estado] || boleta.estado,
    estadoApi: boleta.estado,
    usuarioId: boleta.usuarioId,
    cliente: boleta.cliente,
    direccion: boleta.envio,
    items: boleta.items,
    total: boleta.total,
  };
}

// Datos del checkout a la forma que espera el backend, solo viaja el producto y la cantidad
export function aCompraApi(cliente, direccion, items) {
  return {
    nombre: cliente.nombre,
    apellidos: cliente.apellidos,
    correo: cliente.correo,
    calle: direccion.calle,
    region: direccion.region,
    comuna: direccion.comuna,
    items: items.map((i) => ({ productoId: i.id, cantidad: i.cantidad })),
  };
}

// Datos del formulario de usuario a la forma que espera el backend, sin contrasena el backend no la cambia
export function aUsuarioApi(formulario) {
  const rol = Object.keys(TIPOS_USUARIO).find((r) => TIPOS_USUARIO[r] === formulario.tipoUsuario);
  return {
    run: formulario.run,
    nombre: formulario.nombre,
    apellidos: formulario.apellidos,
    correo: formulario.correo,
    password: formulario.contrasena || null,
    rol,
    region: formulario.region,
    comuna: formulario.comuna,
    direccion: formulario.direccion,
    fechaNacimiento: formulario.fechaNacimiento || null,
  };
}
