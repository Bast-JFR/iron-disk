import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import FormField from '../../components/FormField';
import SelectorRegionComuna from '../../components/SelectorRegionComuna';
import Boton from '../../components/Boton';
import MensajeError from '../../components/MensajeError';
import { usuarioService } from '../../services/usuarioService';
import { erroresDeCampos, mensajeDeError } from '../../services/api';
import { validarNombre, validarApellidos, validarContrasena, validarDireccion, validarSeleccion } from '../../utils/validaciones';

const CAMPOS = ['nombre', 'apellidos', 'contrasena', 'region', 'comuna', 'direccion'];

// La contrasena es opcional, si queda vacia no se cambia
function calcularErrores(v) {
  return {
    nombre: validarNombre(v.nombre),
    apellidos: validarApellidos(v.apellidos),
    contrasena: v.contrasena ? validarContrasena(v.contrasena) : '',
    region: validarSeleccion(v.region, 'una región'),
    comuna: validarSeleccion(v.comuna, 'una comuna'),
    direccion: validarDireccion(v.direccion),
  };
}

// Datos de la cuenta que inicio sesion, el RUN y el correo se ven pero no se editan
function Perfil() {
  const { usuario, actualizarUsuario } = useAuth();

  const [valores, setValores] = useState({
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    contrasena: '',
    fechaNacimiento: usuario.fechaNacimiento || '',
    region: usuario.region,
    comuna: usuario.comuna,
    direccion: usuario.direccion,
  });
  const [tocados, setTocados] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorServidor, setErrorServidor] = useState('');
  const [erroresServidor, setErroresServidor] = useState({});
  const [guardado, setGuardado] = useState(false);

  const errores = calcularErrores(valores);
  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '') || erroresServidor[campo] || '';

  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    setTocados((t) => ({ ...t, [campo]: true }));
    setErroresServidor((e) => ({ ...e, [campo]: '' }));
    setGuardado(false);
  };

  const cambiarRegionComuna = ({ region, comuna }) => {
    setValores((v) => ({ ...v, region, comuna }));
    setTocados((t) => ({ ...t, region: true, comuna: true }));
    setGuardado(false);
  };

  const guardar = async (e) => {
    e.preventDefault();
    setTocados(Object.fromEntries(CAMPOS.map((c) => [c, true])));

    if (Object.values(errores).some((m) => m !== '') || enviando) {
      return;
    }

    setEnviando(true);
    setErrorServidor('');
    try {
      const datos = {
        nombre: valores.nombre.trim(),
        apellidos: valores.apellidos.trim(),
        password: valores.contrasena || null,
        region: valores.region,
        comuna: valores.comuna,
        direccion: valores.direccion.trim(),
        fechaNacimiento: valores.fechaNacimiento || null,
      };
      // La sesion se actualiza con lo que respondio el backend
      actualizarUsuario(await usuarioService.editarPerfil(datos));
      setValores((v) => ({ ...v, contrasena: '' }));
      setTocados({});
      setGuardado(true);
    } catch (error) {
      setErrorServidor(mensajeDeError(error, 'No se pudo guardar tu perfil.'));
      setErroresServidor(Object.fromEntries(Object.entries(erroresDeCampos(error)).map(([campo, mensaje]) => [campo === 'password' ? 'contrasena' : campo, mensaje])));
    }
    setEnviando(false);
  };

  return (
    <>
      <h1 className="titulo-seccion mb-4">Perfil</h1>

      <div className="card card-iron col-xl-8 mb-4">
        <div className="card-body">
          <dl className="row mb-0">
            <div className="col-sm-4 mb-2">
              <dt className="text-secondary text-uppercase small">RUN</dt>
              <dd className="mb-0">{usuario.run}</dd>
            </div>
            <div className="col-sm-4 mb-2">
              <dt className="text-secondary text-uppercase small">Correo</dt>
              <dd className="mb-0">{usuario.correo}</dd>
            </div>
            <div className="col-sm-4 mb-2">
              <dt className="text-secondary text-uppercase small">Tipo de usuario</dt>
              <dd className="mb-0">{usuario.tipoUsuario}</dd>
            </div>
          </dl>
        </div>
      </div>

      <h2 className="fs-5 mb-3">Editar mis datos</h2>
      <MensajeError mensaje={errorServidor} />
      {guardado && (
        <div className="alert alert-success col-xl-8" role="status">
          Tus datos se guardaron.
        </div>
      )}
      <form onSubmit={guardar} noValidate className="col-xl-8">
        <div className="row">
          <div className="col-md-6">
            <FormField id="nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={mostrarError('nombre')} maxLength={50} />
          </div>
          <div className="col-md-6">
            <FormField id="apellidos" etiqueta="Apellidos" valor={valores.apellidos} onCambio={cambiar('apellidos')} error={mostrarError('apellidos')} maxLength={100} />
          </div>
          <div className="col-md-6">
            <FormField
              id="contrasena"
              etiqueta="Contraseña nueva"
              tipo="password"
              valor={valores.contrasena}
              onCambio={cambiar('contrasena')}
              error={mostrarError('contrasena')}
              maxLength={10}
              placeholder="Vacía para no cambiarla"
            />
          </div>
          <div className="col-md-6">
            <FormField id="fechaNacimiento" etiqueta="Fecha de nacimiento (opcional)" tipo="date" valor={valores.fechaNacimiento} onCambio={cambiar('fechaNacimiento')} />
          </div>
        </div>
        <SelectorRegionComuna
          region={valores.region}
          comuna={valores.comuna}
          onCambio={cambiarRegionComuna}
          errorRegion={mostrarError('region')}
          errorComuna={mostrarError('comuna')}
        />
        <FormField id="direccion" etiqueta="Dirección" valor={valores.direccion} onCambio={cambiar('direccion')} error={mostrarError('direccion')} maxLength={300} />

        <Boton tipo="submit" etiqueta={enviando ? 'Guardando...' : 'Guardar cambios'} deshabilitado={enviando} />
      </form>
    </>
  );
}

export default Perfil;
