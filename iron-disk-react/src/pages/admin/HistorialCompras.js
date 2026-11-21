import { Link, useParams } from 'react-router-dom';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { usuarioService } from '../../services/usuarioService';
import { boletaService } from '../../services/boletaService';
import { formatearFecha, formatearPrecio } from '../../utils/formato';

// Muestra las compras de un usuario, el backend entrega las boletas ligadas a su cuenta
function HistorialCompras() {
  const { id } = useParams();
  const { datos, cargando, error, recargar } = useCarga(async () => {
    const [usuario, ordenes] = await Promise.all([usuarioService.obtener(id), boletaService.porUsuario(id)]);
    return { usuario, ordenes };
  }, [id]);

  if (cargando) {
    return <Cargando texto="Cargando historial..." />;
  }

  if (error || !datos) {
    return (
      <>
        <h1 className="titulo-seccion">Usuario no encontrado</h1>
        <MensajeError mensaje={error} onReintentar={recargar} />
        <Link to="/admin/usuarios">Volver al listado</Link>
      </>
    );
  }

  const { usuario, ordenes } = datos;

  return (
    <>
      <h1 className="titulo-seccion mb-1">Historial de compras</h1>
      <p className="text-secondary mb-4">
        {usuario.nombre} {usuario.apellidos} - {usuario.correo}
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
                  <td>{o.numero}</td>
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
