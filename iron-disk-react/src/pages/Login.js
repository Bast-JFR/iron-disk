import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import Boton from '../components/Boton';
import { useAuth } from '../context/AuthContext';
import { validarCorreo, validarContrasena } from '../utils/validaciones';

// Inicio de sesion, valida el formato antes de revisar la cuenta
function Login() {
  const { iniciarSesion } = useAuth();
  const navegar = useNavigate();
  const [valores, setValores] = useState({ correo: '', contrasena: '' });
  const [tocados, setTocados] = useState({});
  const [errorSesion, setErrorSesion] = useState('');

  const errores = {
    correo: validarCorreo(valores.correo),
    contrasena: validarContrasena(valores.contrasena),
  };
  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '');

  const cambiar = (campo) => (valor) => {
    setValores({ ...valores, [campo]: valor });
    setTocados({ ...tocados, [campo]: true });
    setErrorSesion('');
  };

  const enviar = (e) => {
    e.preventDefault();
    setTocados({ correo: true, contrasena: true });

    if (errores.correo !== '' || errores.contrasena !== '') {
      return;
    }

    const resultado = iniciarSesion(valores.correo.trim(), valores.contrasena);

    if (!resultado.ok) {
      setErrorSesion(resultado.error);
      return;
    }
    navegar(resultado.usuario.tipoUsuario === 'Administrador' ? '/admin' : '/');
  };

  return (
    <div className="container py-5">
      <div className="mx-auto col-md-6 col-lg-5">
        <h1 className="titulo-seccion mb-4">Iniciar sesión</h1>

        {errorSesion && (
          <div className="alert alert-danger" role="alert">
            {errorSesion}
          </div>
        )}

        <form onSubmit={enviar} noValidate>
          <FormField id="correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={mostrarError('correo')} maxLength={100} />
          <FormField id="contrasena" etiqueta="Contraseña" tipo="password" valor={valores.contrasena} onCambio={cambiar('contrasena')} error={mostrarError('contrasena')} maxLength={10} />
          <Boton tipo="submit" etiqueta="Entrar" clase="w-100" />
        </form>

        <p className="mt-3 text-secondary">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
