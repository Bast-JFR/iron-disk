// Ordenes de compra generadas por el checkout, guardadas en localStorage.
import { leer, guardar } from './storage';

export const CLAVE_ORDENES = 'iron-disk-react-ordenes';

export function obtenerOrdenes() {
  return leer(CLAVE_ORDENES, []);
}

export function buscarOrden(id) {
  return obtenerOrdenes().find((o) => o.id === id);
}

export function ordenesPorCorreo(correo) {
  return obtenerOrdenes().filter((o) => o.cliente.correo.toLowerCase() === correo.toLowerCase());
}

// Crea una orden nueva con numero correlativo y la guarda. Devuelve la orden creada.
export function crearOrden({ cliente, direccion, items, total, estado = 'Pagada' }) {
  const ordenes = obtenerOrdenes();
  const orden = {
    id: `ORD-${String(ordenes.length + 1).padStart(5, '0')}`,
    fecha: new Date().toISOString(),
    estado,
    cliente,
    direccion,
    items,
    total,
  };

  guardar(CLAVE_ORDENES, [...ordenes, orden]);
  return orden;
}
