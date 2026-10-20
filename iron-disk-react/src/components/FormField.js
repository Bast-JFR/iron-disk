// Campo de formulario con etiqueta y mensaje de error, sirve para input, textarea y select
function FormField({ id, etiqueta, tipo = 'text', valor, onCambio, onSalir, error, opciones, placeholder, maxLength, deshabilitado = false }) {
  const clase = `form-control${error ? ' is-invalid' : ''}`;
  const comunes = { id, value: valor, onBlur: onSalir, disabled: deshabilitado };

  let campo;
  if (tipo === 'textarea') {
    campo = <textarea {...comunes} className={clase} rows="4" maxLength={maxLength} placeholder={placeholder} onChange={(e) => onCambio(e.target.value)} />;
  } else if (tipo === 'select') {
    campo = (
      <select {...comunes} className={`form-select${error ? ' is-invalid' : ''}`} onChange={(e) => onCambio(e.target.value)}>
        <option value="">{placeholder || 'Selecciona una opción'}</option>
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>
            {o.texto}
          </option>
        ))}
      </select>
    );
  } else {
    campo = <input {...comunes} type={tipo} className={clase} maxLength={maxLength} placeholder={placeholder} onChange={(e) => onCambio(e.target.value)} />;
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>
      {campo}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}

export default FormField;
