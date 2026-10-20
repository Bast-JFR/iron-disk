// Pago simulado, las tarjetas que parten con 0000 se rechazan para poder probar el error
export function simularPago(numeroTarjeta) {
  if (numeroTarjeta.startsWith('0000')) {
    return { aprobado: false, motivo: 'La tarjeta fue rechazada por el banco.' };
  }
  return { aprobado: true, motivo: '' };
}
