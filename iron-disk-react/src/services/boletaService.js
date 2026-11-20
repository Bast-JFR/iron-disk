import { api } from './api';
import { aOrdenFront, aCompraApi } from './adaptadores';

// Llamadas de compras y boletas al backend, comprar es publico y el resto pide sesion
export const boletaService = {
  comprar: (cliente, direccion, items) => api.post('/boletas', aCompraApi(cliente, direccion, items)).then((r) => aOrdenFront(r.data)),
  mias: () => api.get('/boletas/mias').then((r) => r.data.map(aOrdenFront)),
  listar: () => api.get('/boletas').then((r) => r.data.map(aOrdenFront)),
  obtener: (id) => api.get(`/boletas/${id}`).then((r) => aOrdenFront(r.data)),
  porUsuario: (usuarioId) => api.get(`/boletas/usuario/${usuarioId}`).then((r) => r.data.map(aOrdenFront)),
  cambiarEstado: (id, estado) => api.patch(`/boletas/${id}/estado`, { estado }).then((r) => aOrdenFront(r.data)),
};
