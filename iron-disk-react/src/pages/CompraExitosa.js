import { Link, useParams } from 'react-router-dom';
import ResumenOrden from '../components/ResumenOrden';
import { buscarOrden } from '../data/ordenes';

// Confirmacion despues de pagar, muestra el detalle de la orden
function CompraExitosa() {
  const { id } = useParams();
  const orden = buscarOrden(id);

  if (!orden) {
    return (
      <div className="container py-5 text-center">
        <h1 className="titulo-seccion mb-3">Orden no encontrada</h1>
        <Link to="/productos" className="btn btn-primary">
          Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="alert alert-success" role="status">
        <h1 className="fs-3">¡Compra exitosa!</h1>
        <p className="mb-0">Recibimos tu pago. Guarda el número de tu orden: {orden.id}.</p>
      </div>
      <ResumenOrden orden={orden} />
      <Link to="/productos" className="btn btn-primary mt-4">
        Seguir comprando
      </Link>
    </div>
  );
}

export default CompraExitosa;
