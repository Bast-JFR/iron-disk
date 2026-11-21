import { api } from './api';
import { aUsuarioFront, aUsuarioApi } from './adaptadores';

// Llamadas de usuarios al backend, administrar usuarios es solo ADMIN y el perfil es de cualquier usuario con sesion
export const usuarioService = {
  listar: () => api.get('/usuarios').then((r) => r.data.map(aUsuarioFront)),
  obtener: (id) => api.get(`/usuarios/${id}`).then((r) => aUsuarioFront(r.data)),
  crear: (usuario) => api.post('/usuarios', aUsuarioApi(usuario)).then((r) => aUsuarioFront(r.data)),
  actualizar: (id, usuario) => api.put(`/usuarios/${id}`, aUsuarioApi(usuario)).then((r) => aUsuarioFront(r.data)),
  eliminar: (id) => api.delete(`/usuarios/${id}`),
  editarPerfil: (datos) => api.put('/perfil', datos).then((r) => aUsuarioFront(r.data)),
};
