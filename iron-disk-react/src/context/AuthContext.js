import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { EVENTO_SESION_EXPIRADA, erroresDeCampos, mensajeDeError, tokens } from '../services/api';
import { authService } from '../services/authService';
import { aUsuarioFront } from '../services/adaptadores';

const AuthContext = createContext(null);

// Sesion del usuario con JWT, los tokens se guardan en localStorage y la sesion sobrevive a recargar la pagina
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  // Mientras se valida el token guardado no se debe redirigir al login
  const [verificando, setVerificando] = useState(() => !!tokens.access);

  // Al abrir la pagina, si hay un token guardado se pide al backend el usuario de esa sesion
  useEffect(() => {
    if (!tokens.access) {
      return undefined;
    }
    let activo = true;
    authService
      .me()
      .then((datos) => activo && setUsuario(aUsuarioFront(datos)))
      .catch(() => tokens.borrar())
      .finally(() => activo && setVerificando(false));
    return () => {
      activo = false;
    };
  }, []);

  // Si el backend no puede renovar la sesion, la api avisa con un evento y aqui se cierra
  useEffect(() => {
    const alExpirar = () => setUsuario(null);
    window.addEventListener(EVENTO_SESION_EXPIRADA, alExpirar);
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, alExpirar);
  }, []);

  const abrirSesion = useCallback((respuesta) => {
    tokens.guardar(respuesta.accessToken, respuesta.refreshToken);
    const datos = aUsuarioFront(respuesta.usuario);
    setUsuario(datos);
    return datos;
  }, []);

  const iniciarSesion = useCallback(
    async (correo, contrasena) => {
      try {
        return { ok: true, usuario: abrirSesion(await authService.login(correo, contrasena)) };
      } catch (error) {
        return { ok: false, error: mensajeDeError(error, 'No se pudo iniciar sesión.') };
      }
    },
    [abrirSesion]
  );

  // Despues de registrarse el usuario queda con la sesion iniciada
  const registrar = useCallback(
    async (datos) => {
      try {
        return { ok: true, usuario: abrirSesion(await authService.registro(datos)) };
      } catch (error) {
        return { ok: false, error: mensajeDeError(error, 'No se pudo crear la cuenta.'), errores: erroresDeCampos(error) };
      }
    },
    [abrirSesion]
  );

  const cerrarSesion = useCallback(() => {
    tokens.borrar();
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({
      usuario,
      verificando,
      esAdmin: !!usuario && usuario.rol === 'ADMIN',
      iniciarSesion,
      registrar,
      cerrarSesion,
    }),
    [usuario, verificando, iniciarSesion, registrar, cerrarSesion]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
