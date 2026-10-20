import { createContext, useContext, useState } from 'react';
import { leer, guardar, eliminar } from '../data/storage';
import { buscarUsuarioPorCorreo } from '../data/usuarios';

export const CLAVE_SESION = 'iron-disk-react-sesion';

// Revisa el correo y la contrasena contra los usuarios guardados
export function autenticar(correo, contrasena) {
  const usuario = buscarUsuarioPorCorreo(correo);

  if (!usuario) {
    return { ok: false, error: 'No existe una cuenta con ese correo.' };
  }
  if (usuario.contrasena !== contrasena) {
    return { ok: false, error: 'La contraseña es incorrecta.' };
  }
  return { ok: true, usuario };
}

const AuthContext = createContext(null);

// Sesion simulada, guarda en localStorage al usuario que inicio sesion
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => leer(CLAVE_SESION, null));

  const iniciarSesion = (correo, contrasena) => {
    const resultado = autenticar(correo, contrasena);

    if (resultado.ok) {
      guardar(CLAVE_SESION, resultado.usuario);
      setUsuario(resultado.usuario);
    }
    return resultado;
  };

  // Despues de registrarse el usuario queda con la sesion iniciada
  const abrirSesionCon = (nuevoUsuario) => {
    guardar(CLAVE_SESION, nuevoUsuario);
    setUsuario(nuevoUsuario);
  };

  const cerrarSesion = () => {
    eliminar(CLAVE_SESION);
    setUsuario(null);
  };

  const valor = {
    usuario,
    esAdmin: !!usuario && usuario.tipoUsuario === 'Administrador',
    iniciarSesion,
    abrirSesionCon,
    cerrarSesion,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
