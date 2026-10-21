import { Link, useParams } from 'react-router-dom';
import ResumenOrden from '../../components/ResumenOrden';
import { buscarOrden } from '../../data/ordenes';

// Muestra la boleta de una orden, con opcion de imprimirla
function Boleta() {
  const { id } = useParams();
  const orden = buscarOrden(id);

  if (!orden) {
    return (
      <>
        <h1 className="titulo-seccion">Orden no encontrada</h1>
        <Link to="/admin/ordenes">Volver al listado</Link>
      </>
    );
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="titulo-seccion mb-0">Boleta</h1>
        <div>
          <button type="button" className="btn btn-outline-secondary me-2" onClick={() => window.print()}>
            Imprimir
          </button>
          <Link to="/admin/ordenes" className="btn btn-outline-secondary">
            Volver al listado
          </Link>
        </div>
      </div>
      <ResumenOrden orden={orden} />
    </>
  );
}

export default Boleta;
