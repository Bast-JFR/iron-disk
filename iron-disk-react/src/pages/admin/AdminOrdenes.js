import { Link } from 'react-router-dom';
import { obtenerOrdenes } from '../../data/ordenes';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

// Listado de ordenes, mostradas de la mas nueva a la mas antigua
function AdminOrdenes() {
  const ordenes = [...obtenerOrdenes()].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <>
      <h1 className="titulo-seccion mb-4">Órdenes</h1>

      {ordenes.length === 0 ? (
        <p className="text-secondary">Todavía no hay órdenes.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Fecha</th>
                <th>Cliente</th>
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
                  <td>
                    {o.cliente.nombre} {o.cliente.apellidos}
                    <div className="small text-secondary">{o.cliente.correo}</div>
                  </td>
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
    </>
  );
}

export default AdminOrdenes;
