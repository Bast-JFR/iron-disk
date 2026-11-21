import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormField from '../../components/FormField';
import SelectorRegionComuna from '../../components/SelectorRegionComuna';
import Boton from '../../components/Boton';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { usuarioService } from '../../services/usuarioService';
import { NOMBRES_TIPO } from '../../services/adaptadores';
import { erroresDeCampos, mensajeDeError } from '../../services/api';
import { validarRun, validarNombre, validarApellidos, validarCorreo, validarContrasena, validarDireccion, validarSeleccion } from '../../utils/validaciones';

const CAMPOS = ['run', 'nombre', 'apellidos', 'correo', 'contrasena', 'tipoUsuario', 'region', 'comuna', 'direccion'];

// Nombres de los campos del backend que no se llaman igual en el formulario
const CAMPO_DEL_BACKEND = { password: 'contrasena', rol: 'tipoUsuario' };

// Al editar la contrasena es opcional, si queda vacia no se cambia
function calcularErrores(v, editando) {
  return {
    run: validarRun(v.run),
    nombre: validarNombre(v.nombre),
    apellidos: validarApellidos(v.apellidos),
    correo: validarCorreo(v.correo),
    contrasena: editando && !v.contrasena ? '' : validarContrasena(v.contrasena),
    tipoUsuario: validarSeleccion(v.tipoUsuario, 'un tipo de usuario'),
    region: validarSeleccion(v.region, 'una región'),
    comuna: validarSeleccion(v.comuna, 'una comuna'),
    direccion: validarDireccion(v.direccion),
  };
}

// Formulario con los datos del usuario, existente viene vacio al crear
function Formulario({ existente }) {
  const navegar = useNavigate();
  const editando = !!existente;

  const [valores, setValores] = useState({
    run: existente ? existente.run : '',
    nombre: existente ? existente.nombre : '',
    apellidos: existente ? existente.apellidos : '',
    correo: existente ? existente.correo : '',
    contrasena: '',
    fechaNacimiento: existente ? existente.fechaNacimiento : '',
    tipoUsuario: existente ? existente.tipoUsuario : '',
    region: existente ? existente.region : '',
    comuna: existente ? existente.comuna : '',
    direccion: existente ? existente.direccion : '',
  });
  const [tocados, setTocados] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [errorServidor, setErrorServidor] = useState('');
  const [erroresServidor, setErroresServidor] = useState({});

  const errores = calcularErrores(valores, editando);
  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '') || erroresServidor[campo] || '';

  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    setTocados((t) => ({ ...t, [campo]: true }));
    setErroresServidor((e) => ({ ...e, [campo]: '' }));
  };

  const cambiarRegionComuna = ({ region, comuna }) => {
    setValores((v) => ({ ...v, region, comuna }));
    setTocados((t) => ({ ...t, region: true, comuna: true }));
  };

  const guardar = async (e) => {
    e.preventDefault();
    setTocados(Object.fromEntries(CAMPOS.map((c) => [c, true])));

    if (Object.values(errores).some((m) => m !== '') || enviando) {
      return;
    }

    const usuario = {
      run: valores.run.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim(),
      contrasena: valores.contrasena,
      fechaNacimiento: valores.fechaNacimiento,
      tipoUsuario: valores.tipoUsuario,
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
    };

    setEnviando(true);
    setErrorServidor('');
    try {
      if (editando) {
        await usuarioService.actualizar(existente.id, usuario);
      } else {
        await usuarioService.crear(usuario);
      }
      navegar('/admin/usuarios');
    } catch (error) {
      // El backend avisa si el RUN o el correo ya existen o si un dato no es valido
      setEnviando(false);
      setErrorServidor(mensajeDeError(error, 'No se pudo guardar el usuario.'));
      const delBackend = erroresDeCampos(error);
      setErroresServidor(Object.fromEntries(Object.entries(delBackend).map(([campo, mensaje]) => [CAMPO_DEL_BACKEND[campo] || campo, mensaje])));
    }
  };

  const tipos = NOMBRES_TIPO.map((t) => ({ valor: t, texto: t }));

  return (
    <>
      <h1 className="titulo-seccion mb-4">{editando ? 'Editar usuario' : 'Nuevo usuario'}</h1>
      <MensajeError mensaje={errorServidor} />
      <form onSubmit={guardar} noValidate className="col-xl-8">
        <div className="row">
          <div className="col-md-4">
            <FormField
              id="run"
              etiqueta="RUN"
              valor={valores.run}
              onCambio={cambiar('run')}
              error={mostrarError('run')}
              deshabilitado={editando}
              maxLength={9}
              placeholder="Sin puntos ni guion"
            />
          </div>
          <div className="col-md-4">
            <FormField id="nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={mostrarError('nombre')} maxLength={50} />
          </div>
          <div className="col-md-4">
            <FormField id="apellidos" etiqueta="Apellidos" valor={valores.apellidos} onCambio={cambiar('apellidos')} error={mostrarError('apellidos')} maxLength={100} />
          </div>
          <div className="col-md-6">
            <FormField id="correo" etiqueta="Correo" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={mostrarError('correo')} maxLength={100} />
          </div>
          <div className="col-md-6">
            <FormField
              id="contrasena"
              etiqueta="Contraseña"
              tipo="password"
              valor={valores.contrasena}
              onCambio={cambiar('contrasena')}
              error={mostrarError('contrasena')}
              maxLength={10}
              placeholder={editando ? 'Vacía para no cambiarla' : ''}
            />
          </div>
          <div className="col-md-6">
            <FormField id="fechaNacimiento" etiqueta="Fecha de nacimiento (opcional)" tipo="date" valor={valores.fechaNacimiento} onCambio={cambiar('fechaNacimiento')} />
          </div>
          <div className="col-md-6">
            <FormField
              id="tipoUsuario"
              etiqueta="Tipo de usuario"
              tipo="select"
              valor={valores.tipoUsuario}
              opciones={tipos}
              onCambio={cambiar('tipoUsuario')}
              error={mostrarError('tipoUsuario')}
            />
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

        <Boton tipo="submit" etiqueta={enviando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear usuario'} deshabilitado={enviando} />
        <Link to="/admin/usuarios" className="btn btn-outline-secondary ms-2">
          Cancelar
        </Link>
      </form>
    </>
  );
}

// Crear usuario o editar uno existente si la direccion trae su id
function UsuarioForm() {
  const { id } = useParams();
  const { datos: existente, cargando, error } = useCarga(() => (id ? usuarioService.obtener(id) : null), [id]);

  if (cargando) {
    return <Cargando texto="Cargando usuario..." />;
  }

  if (id && (error || !existente)) {
    return (
      <>
        <h1 className="titulo-seccion">Usuario no encontrado</h1>
        <p className="text-secondary">{error}</p>
        <Link to="/admin/usuarios">Volver al listado</Link>
      </>
    );
  }

  return <Formulario existente={existente} />;
}

export default UsuarioForm;
