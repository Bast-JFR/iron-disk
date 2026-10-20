import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import SelectorRegionComuna from '../components/SelectorRegionComuna';
import Boton from '../components/Boton';
import { useAuth } from '../context/AuthContext';
import { agregarUsuario, buscarUsuarioPorCorreo, buscarUsuarioPorRun } from '../data/usuarios';
import { validarNombre, validarApellidos, validarRun, validarCorreo, validarContrasena, validarDireccion, validarSeleccion } from '../utils/validaciones';

const CAMPOS = ['run', 'nombre', 'apellidos', 'correo', 'contrasena', 'repetir', 'direccion', 'region', 'comuna'];

function calcularErrores(v) {
  return {
    run: validarRun(v.run),
    nombre: validarNombre(v.nombre),
    apellidos: validarApellidos(v.apellidos),
    correo: validarCorreo(v.correo),
    contrasena: validarContrasena(v.contrasena),
    repetir: v.repetir !== v.contrasena ? 'Las contraseñas no coinciden.' : '',
    direccion: validarDireccion(v.direccion),
    region: validarSeleccion(v.region, 'una región'),
    comuna: validarSeleccion(v.comuna, 'una comuna'),
  };
}

// Registro de un cliente nuevo, al terminar queda con la sesion iniciada
function Registro() {
  const { abrirSesionCon } = useAuth();
  const navegar = useNavigate();
  const [valores, setValores] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    repetir: '',
    fechaNacimiento: '',
    direccion: '',
    region: '',
    comuna: '',
  });
  const [tocados, setTocados] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

  const errores = calcularErrores(valores);
  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '');

  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    setTocados((t) => ({ ...t, [campo]: true }));
    setErrorGeneral('');
  };

  const cambiarRegionComuna = (datos) => {
    setValores((v) => ({ ...v, ...datos }));
    setTocados((t) => ({ ...t, region: true, comuna: true }));
  };

  const enviar = (e) => {
    e.preventDefault();
    setTocados(Object.fromEntries(CAMPOS.map((c) => [c, true])));

    if (Object.values(errores).some((m) => m !== '')) {
      return;
    }
    if (buscarUsuarioPorRun(valores.run.trim().toUpperCase())) {
      setErrorGeneral('Ya existe una cuenta con ese RUN.');
      return;
    }
    if (buscarUsuarioPorCorreo(valores.correo.trim())) {
      setErrorGeneral('Ya existe una cuenta con ese correo.');
      return;
    }

    const usuario = {
      run: valores.run.trim().toUpperCase(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim(),
      contrasena: valores.contrasena,
      fechaNacimiento: valores.fechaNacimiento,
      tipoUsuario: 'Cliente',
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
    };
    agregarUsuario(usuario);
    abrirSesionCon(usuario);
    navegar('/');
  };

  return (
    <div className="container py-5">
      <div className="mx-auto col-lg-8">
        <h1 className="titulo-seccion mb-4">Crear cuenta</h1>

        {errorGeneral && (
          <div className="alert alert-danger" role="alert">
            {errorGeneral}
          </div>
        )}

        <form onSubmit={enviar} noValidate>
          <div className="row">
            <div className="col-md-6">
              <FormField id="run" etiqueta="RUN" valor={valores.run} onCambio={cambiar('run')} error={mostrarError('run')} maxLength={9} placeholder="Sin puntos ni guion. Ej: 19011022K" />
            </div>
            <div className="col-md-6">
              <FormField id="fechaNacimiento" etiqueta="Fecha de nacimiento (opcional)" tipo="date" valor={valores.fechaNacimiento} onCambio={cambiar('fechaNacimiento')} />
            </div>
            <div className="col-md-6">
              <FormField id="nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={mostrarError('nombre')} maxLength={50} />
            </div>
            <div className="col-md-6">
              <FormField id="apellidos" etiqueta="Apellidos" valor={valores.apellidos} onCambio={cambiar('apellidos')} error={mostrarError('apellidos')} maxLength={100} />
            </div>
          </div>

          <FormField id="correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={mostrarError('correo')} maxLength={100} placeholder="Ej: nombre@gmail.com" />

          <div className="row">
            <div className="col-md-6">
              <FormField id="contrasena" etiqueta="Contraseña" tipo="password" valor={valores.contrasena} onCambio={cambiar('contrasena')} error={mostrarError('contrasena')} maxLength={10} placeholder="Entre 4 y 10 caracteres" />
            </div>
            <div className="col-md-6">
              <FormField id="repetir" etiqueta="Repetir contraseña" tipo="password" valor={valores.repetir} onCambio={cambiar('repetir')} error={mostrarError('repetir')} maxLength={10} />
            </div>
          </div>

          <FormField id="direccion" etiqueta="Dirección" valor={valores.direccion} onCambio={cambiar('direccion')} error={mostrarError('direccion')} maxLength={300} placeholder="Calle y número" />
          <SelectorRegionComuna
            region={valores.region}
            comuna={valores.comuna}
            onCambio={cambiarRegionComuna}
            errorRegion={mostrarError('region')}
            errorComuna={mostrarError('comuna')}
          />

          <Boton tipo="submit" etiqueta="Crear cuenta" />
        </form>

        <p className="mt-3 text-secondary">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;
