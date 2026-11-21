import { Link, useLocation, useParams } from 'react-router-dom';
import ResumenOrden from '../components/ResumenOrden';
import Cargando from '../components/Cargando';
import useCarga from '../hooks/useCarga';
import { useAuth } from '../context/AuthContext';
import { boletaService } from '../services/boletaService';

// Detalle de la orden recien pagada, si se recarga la pagina se vuelve a pedir al backend
function DetalleCompra() {
  const { id } = useParams();
  const { state } = useLocation();
  const { datos: orden, cargando } = useCarga(() => (state && state.orden ? state.orden : boletaService.obtener(id)), [id]);

  if (cargando) {
    return <Cargando texto="Buscando tu orden..." />;
  }

  if (!orden) {
    return (
      <div className="container py-5 text-center">
        <h1 className="titulo-seccion mb-3">Orden no encontrada</h1>
        <p className="text-secondary">Inicia sesión para ver tus compras anteriores.</p>
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
        <p className="mb-0">Recibimos tu pago. Guarda el número de tu orden: {orden.numero}.</p>
      </div>
      <ResumenOrden orden={orden} />
      <Link to="/productos" className="btn btn-primary mt-4">
        Seguir comprando
      </Link>
    </div>
  );
}

// Al recargar la pagina espera a recuperar la sesion antes de pedir la orden
function CompraExitosa() {
  const { verificando } = useAuth();

  if (verificando) {
    return <Cargando texto="Recuperando tu sesión..." />;
  }
  return <DetalleCompra />;
}

export default CompraExitosa;
