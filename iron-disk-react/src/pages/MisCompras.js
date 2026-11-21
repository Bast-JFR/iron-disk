import { Link, Navigate } from 'react-router-dom';
import ResumenOrden from '../components/ResumenOrden';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import useCarga from '../hooks/useCarga';
import { useAuth } from '../context/AuthContext';
import { boletaService } from '../services/boletaService';

// Lista de compras del usuario con sesion, de la mas nueva a la mas antigua
function ListaCompras() {
  const { datos: ordenes, cargando, error, recargar } = useCarga(() => boletaService.mias());

  if (cargando) {
    return <Cargando texto="Cargando tus compras..." />;
  }

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-4">Mis compras</h1>
      <MensajeError mensaje={error} onReintentar={recargar} />

      {ordenes && ordenes.length === 0 && (
        <div className="text-center">
          <p className="text-secondary">Todavía no has comprado nada.</p>
          <Link to="/productos" className="btn btn-primary">
            Ver productos
          </Link>
        </div>
      )}

      {ordenes &&
        ordenes.map((orden) => (
          <div key={orden.id} className="mb-4">
            <p className="mb-2">
              Estado: <span className="badge text-bg-secondary">{orden.estado}</span>
            </p>
            <ResumenOrden orden={orden} />
          </div>
        ))}
    </div>
  );
}

// Solo entra quien tiene sesion, al recargar espera a recuperarla
function MisCompras() {
  const { usuario, verificando } = useAuth();

  if (verificando) {
    return <Cargando texto="Recuperando tu sesión..." />;
  }
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  return <ListaCompras />;
}

export default MisCompras;
