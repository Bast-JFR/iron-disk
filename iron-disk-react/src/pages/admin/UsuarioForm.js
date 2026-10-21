import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormField from '../../components/FormField';
import SelectorRegionComuna from '../../components/SelectorRegionComuna';
import Boton from '../../components/Boton';
import { agregarUsuario, actualizarUsuario, buscarUsuarioPorRun, buscarUsuarioPorCorreo, TIPOS_USUARIO } from '../../data/usuarios';
import { validarRun, validarNombre, validarApellidos, validarCorreo, validarContrasena, validarDireccion, validarSeleccion } from '../../utils/validaciones';

const CAMPOS = ['run', 'nombre', 'apellidos', 'correo', 'contrasena', 'tipoUsuario', 'region', 'comuna', 'direccion'];

function calcularErrores(v, runRepetido, correoRepetido) {
  return {
    run: validarRun(v.run) || (runRepetido ? 'Ya existe un usuario con ese RUN.' : ''),
    nombre: validarNombre(v.nombre),
    apellidos: validarApellidos(v.apellidos),
    correo: validarCorreo(v.correo) || (correoRepetido ? 'Ya existe un usuario con ese correo.' : ''),
    contrasena: validarContrasena(v.contrasena),
    tipoUsuario: validarSeleccion(v.tipoUsuario, 'un tipo de usuario'),
    region: validarSeleccion(v.region, 'una región'),
    comuna: validarSeleccion(v.comuna, 'una comuna'),
    direccion: validarDireccion(v.direccion),
  };
}

// Formulario para crear un usuario o editar uno existente si la direccion trae su run
function UsuarioForm() {
  const { run } = useParams();
  const navegar = useNavigate();
  const existente = run ? buscarUsuarioPorRun(run) : null;
  const editando = !!existente;

  const [valores, setValores] = useState({
    run: existente ? existente.run : '',
    nombre: existente ? existente.nombre : '',
    apellidos: existente ? existente.apellidos : '',
    correo: existente ? existente.correo : '',
    contrasena: existente ? existente.contrasena : '',
    fechaNacimiento: existente ? existente.fechaNacimiento : '',
    tipoUsuario: existente ? existente.tipoUsuario : '',
    region: existente ? existente.region : '',
    comuna: existente ? existente.comuna : '',
    direccion: existente ? existente.direccion : '',
  });
  const [tocados, setTocados] = useState({});

  const runRepetido = !editando && !!buscarUsuarioPorRun(valores.run.trim().toUpperCase());
  const otroConEseCorreo = buscarUsuarioPorCorreo(valores.correo.trim());
  const correoRepetido = !!otroConEseCorreo && otroConEseCorreo.run !== (existente ? existente.run : null);
  const errores = calcularErrores(valores, runRepetido, correoRepetido);
  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '');

  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    setTocados((t) => ({ ...t, [campo]: true }));
  };

  const cambiarRegionComuna = ({ region, comuna }) => {
    setValores((v) => ({ ...v, region, comuna }));
    setTocados((t) => ({ ...t, region: true, comuna: true }));
  };

  if (run && !existente) {
    return (
      <>
        <h1 className="titulo-seccion">Usuario no encontrado</h1>
        <Link to="/admin/usuarios">Volver al listado</Link>
      </>
    );
  }

  const guardar = (e) => {
    e.preventDefault();
    setTocados(Object.fromEntries(CAMPOS.map((c) => [c, true])));

    if (Object.values(errores).some((m) => m !== '')) {
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

    if (editando) {
      actualizarUsuario(existente.run, usuario);
    } else {
      agregarUsuario(usuario);
    }
    navegar('/admin/usuarios');
  };

  const tipos = TIPOS_USUARIO.map((t) => ({ valor: t, texto: t }));

  return (
    <>
      <h1 className="titulo-seccion mb-4">{editando ? 'Editar usuario' : 'Nuevo usuario'}</h1>
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

        <Boton tipo="submit" etiqueta={editando ? 'Guardar cambios' : 'Crear usuario'} />
        <Link to="/admin/usuarios" className="btn btn-outline-secondary ms-2">
          Cancelar
        </Link>
      </form>
    </>
  );
}

export default UsuarioForm;
