// Mensaje corto en una esquina, no muestra nada si no hay texto
function Aviso({ mensaje }) {
  if (!mensaje) {
    return null;
  }

  return (
    <div className="alert alert-success position-fixed bottom-0 end-0 m-3 shadow" role="status">
      {mensaje}
    </div>
  );
}

export default Aviso;
