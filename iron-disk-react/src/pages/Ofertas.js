import ProductGrid from '../components/ProductGrid';
import Aviso from '../components/Aviso';
import useAgregarAlCarrito from '../hooks/useAgregarAlCarrito';
import { productosEnOferta } from '../data/productos';

// Discos con descuento
function Ofertas() {
  const { aviso, agregarProducto } = useAgregarAlCarrito();
  const ofertas = productosEnOferta();

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-2">Ofertas</h1>
      <p className="text-secondary mb-4">Discos con descuento por tiempo limitado.</p>
      <ProductGrid productos={ofertas} onAgregar={agregarProducto} />
      <Aviso mensaje={aviso} />
    </div>
  );
}

export default Ofertas;
