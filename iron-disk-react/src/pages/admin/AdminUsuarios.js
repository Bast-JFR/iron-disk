import { useState } from 'react';
import { Link } from 'react-router-dom';
import TablaUsuarios from '../../components/TablaUsuarios';
import Buscador from '../../components/Buscador';
import { obtenerUsuarios, eliminarUsuario } from '../../data/usuarios';
import { filtrarUsuarios } from '../../utils/filtros';

// Listado de usuarios con busqueda, permite crear, editar, ver historial y eliminar
function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());
  const [texto, setTexto] = useState('');

  const eliminar = (usuario) => {
    if (!window.confirm(`¿Eliminar a ${usuario.nombre} ${usuario.apellidos}?`)) {
      return;
    }
    eliminarUsuario(usuario.run);
    setUsuarios(obtenerUsuarios());
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
      <TablaUsuarios usuarios={filtrarUsuarios(usuarios, texto)} onEliminar={eliminar} />
    </>
  );
}

export default AdminUsuarios;
