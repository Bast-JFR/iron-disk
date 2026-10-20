// Formatea un numero como precio en pesos chilenos. Ej: 32990 -> $32.990
export function formatearPrecio(valor) {
  return '$' + Number(valor).toLocaleString('es-CL');
}

// Formatea una fecha ISO como dd-mm-aaaa hh:mm
export function formatearFecha(iso) {
  const f = new Date(iso);
  const dos = (n) => String(n).padStart(2, '0');
  return `${dos(f.getDate())}-${dos(f.getMonth() + 1)}-${f.getFullYear()} ${dos(f.getHours())}:${dos(f.getMinutes())}`;
}
