// Pagina temporal que se muestra mientras se construye cada vista
function Pendiente({ titulo }) {
  return (
    <div className="container py-5">
      <h1 className="titulo-seccion">{titulo}</h1>
      <p className="text-secondary">Esta vista se está construyendo.</p>
    </div>
  );
}

export default Pendiente;
