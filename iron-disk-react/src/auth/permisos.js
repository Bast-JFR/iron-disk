// Permisos del panel segun el rol, el backend vuelve a revisarlos en cada peticion
const SECCIONES_POR_ROL = {
  ADMIN: ['dashboard', 'productos', 'editar-productos', 'criticos', 'usuarios', 'ordenes', 'reportes', 'perfil'],
  VENDEDOR: ['productos', 'ordenes', 'perfil'],
  CLIENTE: [],
};

const ACCIONES_POR_ROL = {
  ADMIN: ['editar-productos', 'cambiar-estado'],
  VENDEDOR: [],
  CLIENTE: [],
};

export function puedeVer(rol, seccion) {
  return (SECCIONES_POR_ROL[rol] || []).includes(seccion);
}

// Acciones que modifican datos, el vendedor solo puede mirar
export function puedeHacer(rol, accion) {
  return (ACCIONES_POR_ROL[rol] || []).includes(accion);
}

export function puedeEntrarAlPanel(rol) {
  return (SECCIONES_POR_ROL[rol] || []).length > 0;
}

// Pantalla a la que se lleva a quien entra a una seccion que no le corresponde
export function rutaInicial(rol) {
  return puedeVer(rol, 'dashboard') ? '/admin' : '/admin/productos';
}

// Seccion a la que pertenece una direccion del panel
export function seccionDeRuta(ruta) {
  if (/^\/admin\/productos\/(nuevo|editar)/.test(ruta)) {
    return 'editar-productos';
  }
  if (ruta.startsWith('/admin/productos/criticos')) {
    return 'criticos';
  }
  const partes = ruta.split('/').filter(Boolean);
  return partes[1] || 'dashboard';
}
