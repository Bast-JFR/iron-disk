import ProductCard from './ProductCard';

// Grilla de tarjetas, si no hay productos muestra un mensaje
function ProductGrid({ productos, onAgregar }) {
  if (productos.length === 0) {
    return <p className="text-center text-secondary py-5">No se encontraron productos.</p>;
  }

  return (
    <div className="row g-4">
      {productos.map((p) => (
        <div className="col-6 col-md-4 col-lg-3" key={p.codigo}>
          <ProductCard producto={p} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
