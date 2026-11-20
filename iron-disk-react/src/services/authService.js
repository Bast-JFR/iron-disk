import { api } from './api';

// Llamadas de autenticacion al backend
export const authService = {
  login: (correo, password) => api.post('/auth/login', { correo, password }).then((r) => r.data),
  registro: (datos) => api.post('/auth/registro', datos).then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data),
};
