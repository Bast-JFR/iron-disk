import axios from 'axios';
import { configurarInterceptores, tokens } from './api';

// Crea una instancia con un adaptador falso para no llamar al backend de verdad
function instanciaFalsa(respuestas) {
  const llamadas = [];
  const instancia = axios.create({ baseURL: 'http://prueba/api/v1' });
  instancia.defaults.adapter = (config) => {
    llamadas.push(config);
    const respuesta = respuestas.shift();
    const resultado = { data: respuesta.data || {}, status: respuesta.status, statusText: '', headers: {}, config };
    if (respuesta.status >= 400) {
      return Promise.reject(Object.assign(new Error('error'), { config, response: resultado }));
    }
    return Promise.resolve(resultado);
  };
  configurarInterceptores(instancia);
  return { instancia, llamadas };
}

describe('api', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('con un 401 renueva la sesion y repite la peticion', async () => {
    tokens.guardar('vencido', 'refresh-ok');
    spyOn(axios, 'post').and.returnValue(Promise.resolve({ data: { accessToken: 'nuevo', refreshToken: 'refresh-nuevo' } }));
    const { instancia, llamadas } = instanciaFalsa([{ status: 401 }, { status: 200, data: { ok: true } }]);

    const respuesta = await instancia.get('/perfil');

    expect(respuesta.data.ok).toBe(true);
    expect(llamadas.length).toBe(2);
    expect(llamadas[1].headers.Authorization).toBe('Bearer nuevo');
    expect(tokens.refresh).toBe('refresh-nuevo');
  });
});
