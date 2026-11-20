import { api } from './api';
import { aProductoFront, aProductoApi } from './adaptadores';

// Llamadas de productos al backend, ver el catalogo es publico y administrar es solo ADMIN
export const productoService = {
  // Filtros opcionales: categoriaId, formato y q
  listar: (params) => api.get('/productos', { params }).then((r) => r.data.map(aProductoFront)),
  obtener: (id) => api.get(`/productos/${id}`).then((r) => aProductoFront(r.data)),
  ofertas: () => api.get('/productos/ofertas').then((r) => r.data.map(aProductoFront)),
  criticos: () => api.get('/productos/criticos').then((r) => r.data.map(aProductoFront)),
  crear: (producto) => api.post('/productos', aProductoApi(producto)).then((r) => aProductoFront(r.data)),
  actualizar: (id, producto) => api.put(`/productos/${id}`, aProductoApi(producto)).then((r) => aProductoFront(r.data)),
  eliminar: (id) => api.delete(`/productos/${id}`),
};
