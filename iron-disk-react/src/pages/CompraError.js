import { Link, useLocation } from 'react-router-dom';

// Aviso cuando el pago no se pudo completar, el carrito sigue como estaba
function CompraError() {
  const { state } = useLocation();
  const motivo = state && state.motivo ? state.motivo : 'No pudimos procesar el pago.';

  return (
    <div className="container py-5">
      <div className="alert alert-danger" role="alert">
        <h1 className="fs-3">No se pudo completar el pago</h1>
        <p className="mb-0">{motivo}</p>
        {state && state.orden && <p className="mb-0 small">Quedó registrada como {state.orden}.</p>}
      </div>
      <p>Tus productos siguen en el carrito. Revisa los datos de la tarjeta e inténtalo de nuevo.</p>
      <Link to="/checkout" className="btn btn-primary me-2">
        Volver a intentar
      </Link>
      <Link to="/carrito" className="btn btn-outline-secondary">
        Ver carrito
      </Link>
    </div>
  );
}

export default CompraError;
