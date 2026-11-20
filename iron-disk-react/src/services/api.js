import axios from 'axios';

// Direccion del backend, se puede cambiar con REACT_APP_API_URL en el archivo .env
function leerUrlBase() {
  try {
    return process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';
  } catch (e) {
    // En las pruebas no existe process, se usa la direccion por defecto
    return 'http://localhost:8080/api/v1';
  }
}

export const API_URL = leerUrlBase();

export const EVENTO_SESION_EXPIRADA = 'irondisk:sesion-expirada';
const CLAVE_ACCESS = 'irondisk_access_token';
const CLAVE_REFRESH = 'irondisk_refresh_token';

// Los tokens se guardan en localStorage para que la sesion sobreviva a recargar la pagina
export const tokens = {
  get access() {
    return leerToken(CLAVE_ACCESS);
  },
  get refresh() {
    return leerToken(CLAVE_REFRESH);
  },
  guardar(access, refresh) {
    try {
      localStorage.setItem(CLAVE_ACCESS, access);
      if (refresh) {
        localStorage.setItem(CLAVE_REFRESH, refresh);
      }
    } catch (e) {
      // Si el almacenamiento no esta disponible la sesion dura hasta recargar
    }
  },
  borrar() {
    try {
      localStorage.removeItem(CLAVE_ACCESS);
      localStorage.removeItem(CLAVE_REFRESH);
    } catch (e) {
      // Nada que borrar
    }
  },
};

function leerToken(clave) {
  try {
    return localStorage.getItem(clave);
  } catch (e) {
    return null;
  }
}

// Una sola instancia de axios para todas las llamadas al backend
export const api = axios.create({ baseURL: API_URL, timeout: 15000 });

// Si varias peticiones reciben 401 a la vez, todas esperan la misma renovacion
let renovacionEnCurso = null;

export function renovarSesion() {
  if (!renovacionEnCurso) {
    renovacionEnCurso = axios
      .post(`${API_URL}/auth/refresh`, { refreshToken: tokens.refresh })
      .then(({ data }) => {
        tokens.guardar(data.accessToken, data.refreshToken);
        return data;
      })
      .finally(() => {
        renovacionEnCurso = null;
      });
  }
  return renovacionEnCurso;
}

function expirarSesion() {
  tokens.borrar();
  window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA));
}

export function configurarInterceptores(instancia) {
  // Antes de cada peticion se agrega el token de acceso si hay sesion
  instancia.interceptors.request.use((config) => {
    const access = tokens.access;
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  });

  // Si el backend responde 401 por token vencido, se renueva la sesion y se repite la peticion una vez
  instancia.interceptors.response.use(
    (respuesta) => respuesta,
    async (error) => {
      const original = error.config;
      // Login, registro y refresh responden 401 por credenciales, ahi no se intenta renovar
      const esAuth = /\/auth\/(login|registro|refresh)/.test((original && original.url) || '');

      if (error.response && error.response.status === 401 && original && !esAuth && tokens.access) {
        if (!original._reintento && tokens.refresh) {
          original._reintento = true;
          try {
            await renovarSesion();
            return instancia(original);
          } catch (e) {
            expirarSesion();
          }
        } else {
          expirarSesion();
        }
      }
      return Promise.reject(error);
    }
  );
}

configurarInterceptores(api);

// Mensaje para mostrar al usuario a partir de un error de axios
export function mensajeDeError(error, porDefecto = 'Ocurrió un error inesperado. Intenta nuevamente.') {
  if (error && error.response && error.response.data && error.response.data.mensaje) {
    return error.response.data.mensaje;
  }
  if (error && error.response) {
    return porDefecto;
  }
  if (error && (error.request || error.code === 'ERR_NETWORK')) {
    return 'No se pudo conectar con el servidor. Revisa que el backend esté encendido.';
  }
  return (error && error.message) || porDefecto;
}

// Errores por campo que devuelve el backend cuando los datos no son validos
export function erroresDeCampos(error) {
  return (error && error.response && error.response.data && error.response.data.errores) || {};
}
