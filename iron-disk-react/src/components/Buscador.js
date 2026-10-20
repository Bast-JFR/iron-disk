// Campo de busqueda, el texto lo guarda el componente que lo usa
function Buscador({ valor, onCambio, placeholder = 'Buscar por disco o artista' }) {
  return (
    <input
      type="search"
      className="form-control"
      value={valor}
      onChange={(e) => onCambio(e.target.value)}
      placeholder={placeholder}
      aria-label="Buscar productos"
    />
  );
}

export default Buscador;
