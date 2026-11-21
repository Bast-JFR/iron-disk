import { api } from './api';

// Llamadas de reportes al backend, solo para el administrador
export const reporteService = {
  resumen: () => api.get('/reportes/resumen').then((r) => r.data),
};
