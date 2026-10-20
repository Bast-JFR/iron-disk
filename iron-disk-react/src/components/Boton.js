// Boton reutilizable: recibe la etiqueta y la accion por props
function Boton({ etiqueta, onClick, variante = 'primary', tipo = 'button', deshabilitado = false, clase = '' }) {
  return (
    <button type={tipo} className={`btn btn-${variante} ${clase}`.trim()} onClick={onClick} disabled={deshabilitado}>
      {etiqueta}
    </button>
  );
}

export default Boton;
