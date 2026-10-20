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
