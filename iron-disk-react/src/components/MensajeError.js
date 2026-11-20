// Aviso de error con un boton opcional para volver a intentar
function MensajeError({ mensaje, onReintentar }) {
  if (!mensaje) {
    return null;
  }

  return (
    <div className="alert alert-danger d-flex flex-wrap justify-content-between align-items-center gap-2" role="alert">
      <span>{mensaje}</span>
      {onReintentar && (
        <button type="button" className="btn btn-sm btn-outline-light" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}

export default MensajeError;
