// Calculos para la pagina de reportes del administrador

// Agrupa una lista por un campo y devuelve cuantos hay de cada valor
export function contarPor(lista, campo) {
  return lista.reduce((conteo, item) => {
    const clave = item[campo];
    conteo[clave] = (conteo[clave] || 0) + 1;
    return conteo;
  }, {});
}
