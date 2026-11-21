import { useState } from 'react';
import { Link } from 'react-router-dom';
import TablaUsuarios from '../../components/TablaUsuarios';
import Buscador from '../../components/Buscador';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { usuarioService } from '../../services/usuarioService';
import { mensajeDeError } from '../../services/api';
import { filtrarUsuarios } from '../../utils/filtros';

// Listado de usuarios con busqueda, permite crear, editar, ver historial y eliminar
function AdminUsuarios() {
  const { datos, cargando, error, recargar } = useCarga(() => usuarioService.listar(), []);
  const [texto, setTexto] = useState('');
  const [errorEliminar, setErrorEliminar] = useState('');

  const eliminar = async (usuario) => {
    if (!window.confirm(`¿Eliminar a ${usuario.nombre} ${usuario.apellidos}?`)) {
      return;
    }
    setErrorEliminar('');
    try {
      await usuarioService.eliminar(usuario.id);
      recargar();
    } catch (e) {
      // El backend no deja eliminar a un usuario con compras ni a la cuenta propia
      setErrorEliminar(mensajeDeError(e, 'No se pudo eliminar el usuario.'));
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="titulo-seccion mb-0">Usuarios</h1>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
          Nuevo usuario
        </Link>
      </div>
      <div className="mb-3 col-md-6">
        <Buscador valor={texto} onCambio={setTexto} placeholder="Buscar por nombre, apellidos o correo" />
      </div>
      <MensajeError mensaje={error || errorEliminar} onReintentar={error ? recargar : undefined} />
      {cargando ? <Cargando texto="Cargando usuarios..." /> : !error && <TablaUsuarios usuarios={filtrarUsuarios(datos || [], texto)} onEliminar={eliminar} />}
    </>
  );
}

export default AdminUsuarios;
