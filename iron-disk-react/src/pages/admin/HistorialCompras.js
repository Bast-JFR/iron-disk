import { Link, useParams } from 'react-router-dom';
import { buscarUsuarioPorRun } from '../../data/usuarios';
import { ordenesPorCorreo } from '../../data/ordenes';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

// Muestra las compras de un usuario, buscando sus ordenes por su correo
function HistorialCompras() {
  const { run } = useParams();
  const usuario = buscarUsuarioPorRun(run);

  if (!usuario) {
    return (
      <>
        <h1 className="titulo-seccion">Usuario no encontrado</h1>
        <Link to="/admin/usuarios">Volver al listado</Link>
      </>
    );
  }

  const ordenes = ordenesPorCorreo(usuario.correo);

  return (
    <>
      <h1 className="titulo-seccion mb-1">Historial de compras</h1>
      <p className="text-secondary mb-4">
        {usuario.nombre} {usuario.apellidos} — {usuario.correo}
      </p>

      {ordenes.length === 0 ? (
        <p className="text-secondary">Este usuario todavía no tiene compras.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th className="text-end">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{formatearFecha(o.fecha)}</td>
                  <td>{o.estado}</td>
                  <td className="text-end">{formatearPrecio(o.total)}</td>
                  <td className="text-end">
                    <Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-primary">
                      Ver boleta
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/admin/usuarios" className="btn btn-outline-secondary mt-3">
        Volver al listado
      </Link>
    </>
  );
}

export default HistorialCompras;
