import TablaProductos from '../../components/TablaProductos';
import { productosCriticos } from '../../data/productos';

// Productos con stock igual o menor a su stock critico
function ProductosCriticos() {
  const criticos = productosCriticos();

  return (
    <>
      <h1 className="titulo-seccion mb-2">Productos críticos</h1>
      <p className="text-secondary mb-4">Discos que están en su stock crítico o por debajo.</p>
      <TablaProductos productos={criticos} />
    </>
  );
}

export default ProductosCriticos;
