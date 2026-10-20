// Todo el acceso a localStorage pasa por este archivo

export function leer(clave, valorBase) {
  const guardado = localStorage.getItem(clave);

  if (guardado === null) {
    localStorage.setItem(clave, JSON.stringify(valorBase));
    return JSON.parse(JSON.stringify(valorBase));
  }

  return JSON.parse(guardado);
}

export function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

export function eliminar(clave) {
  localStorage.removeItem(clave);
}
