// Indicador de carga mientras llegan los datos del backend
function Cargando({ texto = 'Cargando...' }) {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2 py-5 text-secondary" role="status">
      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span>{texto}</span>
    </div>
  );
}

export default Cargando;
