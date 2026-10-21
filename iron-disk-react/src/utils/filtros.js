// Filtra los productos segun el texto buscado, la categoria y el formato
export function filtrarProductos(productos, { texto = '', categoria = '', formato = '' }) {
  const busqueda = texto.trim().toLowerCase();

  return productos.filter((p) => {
    const coincideTexto =
      busqueda === '' || p.nombre.toLowerCase().includes(busqueda) || p.artista.toLowerCase().includes(busqueda);
    const coincideCategoria = categoria === '' || p.categoria === categoria;
    const coincideFormato = formato === '' || p.formato === formato;

    return coincideTexto && coincideCategoria && coincideFormato;
  });
}

// Filtra los usuarios segun el texto buscado en nombre, apellidos o correo
export function filtrarUsuarios(usuarios, texto = '') {
  const busqueda = texto.trim().toLowerCase();

  if (busqueda === '') {
    return usuarios;
  }

  return usuarios.filter((u) => {
    const nombreCompleto = `${u.nombre} ${u.apellidos}`.toLowerCase();
    return nombreCompleto.includes(busqueda) || u.correo.toLowerCase().includes(busqueda);
  });
}
