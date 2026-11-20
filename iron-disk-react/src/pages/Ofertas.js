import ProductGrid from '../components/ProductGrid';
import Aviso from '../components/Aviso';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import useAgregarAlCarrito from '../hooks/useAgregarAlCarrito';
import useCarga from '../hooks/useCarga';
import { productoService } from '../services/productoService';

// Discos con descuento
function Ofertas() {
  const { aviso, agregarProducto } = useAgregarAlCarrito();
  const { datos, cargando, error, recargar } = useCarga(() => productoService.ofertas(), []);

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-2">Ofertas</h1>
      <p className="text-secondary mb-4">Discos con descuento por tiempo limitado.</p>
      <MensajeError mensaje={error} onReintentar={recargar} />
      {cargando ? <Cargando texto="Cargando ofertas..." /> : !error && <ProductGrid productos={datos} onAgregar={agregarProducto} />}
      <Aviso mensaje={aviso} />
    </div>
  );
}

export default Ofertas;
