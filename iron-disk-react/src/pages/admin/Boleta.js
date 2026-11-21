import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ResumenOrden from '../../components/ResumenOrden';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { useAuth } from '../../context/AuthContext';
import { puedeHacer } from '../../auth/permisos';
import { boletaService } from '../../services/boletaService';
import { mensajeDeError } from '../../services/api';

const ESTADOS = [
  { valor: 'PAGADA', texto: 'Pagada' },
  { valor: 'ENVIADA', texto: 'Enviada' },
  { valor: 'ENTREGADA', texto: 'Entregada' },
  { valor: 'ANULADA', texto: 'Anulada' },
];

// Muestra la boleta de una orden, con opcion de imprimirla y de cambiar su estado si es administrador
function Boleta() {
  const { id } = useParams();
  const { usuario } = useAuth();
  const { datos: orden, cargando, error, recargar } = useCarga(() => boletaService.obtener(id), [id]);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [errorEstado, setErrorEstado] = useState('');
  const [guardando, setGuardando] = useState(false);

  if (cargando) {
    return <Cargando texto="Cargando boleta..." />;
  }

  if (error || !orden) {
    return (
      <>
        <h1 className="titulo-seccion">Orden no encontrada</h1>
        <p className="text-secondary">{error}</p>
        <Link to="/admin/ordenes">Volver al listado</Link>
      </>
    );
  }

  const puedeCambiar = puedeHacer(usuario.rol, 'cambiar-estado') && orden.estadoApi !== 'ANULADA';
  const estadoElegido = nuevoEstado || orden.estadoApi;

  const cambiarEstado = async () => {
    // Anular devuelve el stock al inventario y ya no se puede deshacer
    if (estadoElegido === 'ANULADA' && !window.confirm('Al anular la orden el stock vuelve al inventario y no se puede deshacer. ¿Continuar?')) {
      return;
    }
    setGuardando(true);
    setErrorEstado('');
    try {
      await boletaService.cambiarEstado(orden.id, estadoElegido);
      setNuevoEstado('');
      recargar();
    } catch (e) {
      setErrorEstado(mensajeDeError(e, 'No se pudo cambiar el estado.'));
    }
    setGuardando(false);
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="titulo-seccion mb-0">Boleta</h1>
        <div>
          <button type="button" className="btn btn-outline-secondary me-2" onClick={() => window.print()}>
            Imprimir
          </button>
          <Link to="/admin/ordenes" className="btn btn-outline-secondary">
            Volver al listado
          </Link>
        </div>
      </div>

      <p className="mb-3">
        Estado: <span className="badge text-bg-secondary">{orden.estado}</span>
      </p>
      <MensajeError mensaje={errorEstado} />
      {puedeCambiar && (
        <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
          <label htmlFor="estado" className="form-label mb-0">
            Cambiar estado
          </label>
          <select id="estado" className="form-select w-auto" value={estadoElegido} onChange={(e) => setNuevoEstado(e.target.value)}>
            {ESTADOS.map((e) => (
              <option key={e.valor} value={e.valor}>
                {e.texto}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn-primary" onClick={cambiarEstado} disabled={guardando || estadoElegido === orden.estadoApi}>
            Guardar estado
          </button>
        </div>
      )}
      <ResumenOrden orden={orden} />
    </>
  );
}

export default Boleta;
