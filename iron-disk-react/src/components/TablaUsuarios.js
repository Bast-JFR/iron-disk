import { Link } from 'react-router-dom';

// Tabla de usuarios del admin, con enlaces a editar, ver historial y eliminar
function TablaUsuarios({ usuarios, onEliminar }) {
  if (usuarios.length === 0) {
    return <p className="text-secondary">No hay usuarios para mostrar.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>RUN</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo</th>
            <th>Región</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.run}>
              <td>{u.run}</td>
              <td>
                {u.nombre} {u.apellidos}
              </td>
              <td>{u.correo}</td>
              <td>{u.tipoUsuario}</td>
              <td>{u.region}</td>
              <td className="text-end text-nowrap">
                <Link to={`/admin/usuarios/editar/${u.run}`} className="btn btn-sm btn-outline-primary me-2">
                  Editar
                </Link>
                <Link to={`/admin/usuarios/${u.run}/compras`} className="btn btn-sm btn-outline-secondary me-2">
                  Historial
                </Link>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(u)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuarios;
