// Calculos para la pagina de reportes del administrador

// Cuenta ordenes pagadas y rechazadas, y suma solo lo vendido en las pagadas
export function resumenVentas(ordenes) {
  const pagadas = ordenes.filter((o) => o.estado === 'Pagada');

  return {
    pagadas: pagadas.length,
    rechazadas: ordenes.length - pagadas.length,
    totalVendido: pagadas.reduce((suma, o) => suma + o.total, 0),
  };
}

// Agrupa una lista por un campo y devuelve cuantos hay de cada valor
export function contarPor(lista, campo) {
  return lista.reduce((conteo, item) => {
    const clave = item[campo];
    conteo[clave] = (conteo[clave] || 0) + 1;
    return conteo;
  }, {});
}
