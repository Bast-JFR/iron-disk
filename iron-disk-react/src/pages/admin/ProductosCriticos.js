import TablaProductos from '../../components/TablaProductos';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { productoService } from '../../services/productoService';

// Productos con stock igual o menor a su stock critico
function ProductosCriticos() {
  const { datos, cargando, error, recargar } = useCarga(() => productoService.criticos(), []);

  return (
    <>
      <h1 className="titulo-seccion mb-2">Productos críticos</h1>
      <p className="text-secondary mb-4">Discos que están en su stock crítico o por debajo.</p>
      <MensajeError mensaje={error} onReintentar={recargar} />
      {cargando ? <Cargando texto="Cargando productos..." /> : !error && <TablaProductos productos={datos || []} />}
    </>
  );
}

export default ProductosCriticos;
