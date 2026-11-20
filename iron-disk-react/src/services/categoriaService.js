import { api } from './api';
import { aCategoriaFront } from './adaptadores';

// Llamadas de categorias al backend
export const categoriaService = {
  listar: () => api.get('/categorias').then((r) => r.data.map(aCategoriaFront)),
};
