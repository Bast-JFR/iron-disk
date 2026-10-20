import FormField from './FormField';
import { REGIONES_COMUNAS, comunasDeRegion } from '../data/regiones';

// Dos selectores donde las comunas dependen de la region elegida
function SelectorRegionComuna({ region, comuna, onCambio, errorRegion, errorComuna, onSalir }) {
  const regiones = REGIONES_COMUNAS.map((r) => ({ valor: r.region, texto: r.region }));
  const comunas = comunasDeRegion(region).map((c) => ({ valor: c, texto: c }));

  return (
    <div className="row">
      <div className="col-md-6">
        <FormField
          id="region"
          etiqueta="Región"
          tipo="select"
          valor={region}
          opciones={regiones}
          placeholder="Selecciona una región"
          onCambio={(r) => onCambio({ region: r, comuna: '' })}
          onSalir={onSalir}
          error={errorRegion}
        />
      </div>
      <div className="col-md-6">
        <FormField
          id="comuna"
          etiqueta="Comuna"
          tipo="select"
          valor={comuna}
          opciones={comunas}
          placeholder="Selecciona una comuna"
          deshabilitado={region === ''}
          onCambio={(c) => onCambio({ region, comuna: c })}
          onSalir={onSalir}
          error={errorComuna}
        />
      </div>
    </div>
  );
}

export default SelectorRegionComuna;
