import { Link } from 'react-router-dom';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { boletaService } from '../../services/boletaService';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

// Listado de ordenes, el backend las entrega de la mas nueva a la mas antigua
function AdminOrdenes() {
  const { datos: ordenes, cargando, error, recargar } = useCarga(() => boletaService.listar(), []);

  return (
    <>
      <h1 className="titulo-seccion mb-4">Órdenes</h1>
      <MensajeError mensaje={error} onReintentar={recargar} />

      {cargando && <Cargando texto="Cargando órdenes..." />}

      {ordenes && ordenes.length === 0 && <p className="text-secondary">Todavía no hay órdenes.</p>}

      {ordenes && ordenes.length > 0 && (
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
                  <td>{o.numero}</td>
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
