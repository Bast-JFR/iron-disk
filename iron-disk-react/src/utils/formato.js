// Da formato de pesos chilenos a un numero
export function formatearPrecio(valor) {
  return '$' + Number(valor).toLocaleString('es-CL');
}

// Da formato de dia, mes, ano y hora a una fecha
export function formatearFecha(iso) {
  const f = new Date(iso);
  const dos = (n) => String(n).padStart(2, '0');
  return `${dos(f.getDate())}-${dos(f.getMonth() + 1)}-${f.getFullYear()} ${dos(f.getHours())}:${dos(f.getMinutes())}`;
}
