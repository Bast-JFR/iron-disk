// Precio final de un producto aplicando su porcentaje de oferta
export function precioFinal(producto) {
  // Un producto que viene del backend ya trae el precio final calculado
  if (producto.precioFinal !== undefined) {
    return producto.precioFinal;
  }

  const descuento = producto.ofertaPorcentaje || 0;
  return Math.round(producto.precio * (1 - descuento / 100));
}
