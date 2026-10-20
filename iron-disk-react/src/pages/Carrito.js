import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCarrito } from '../context/CarritoContext';
import { buscarProductoPorCodigo } from '../data/productos';
import { formatearPrecio } from '../utils/formato';

// Carrito de compras, la cantidad no puede pasar del stock disponible
function Carrito() {
  const { items, total, cambiarCantidad, quitar, vaciar } = useCarrito();

  const stockDe = (codigo) => {
    const producto = buscarProductoPorCodigo(codigo);
    return producto ? producto.stock : 1;
  };

  const cambiar = (codigo, cantidad) => {
    const maximo = stockDe(codigo);
    cambiarCantidad(codigo, Math.min(Math.max(1, cantidad || 1), maximo));
  };

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="titulo-seccion mb-3">Tu carrito</h1>
        <p className="text-secondary">Todavía no agregas discos al carrito.</p>
        <Link to="/productos" className="btn btn-primary">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-4">Tu carrito</h1>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-end">Precio</th>
              <th>Cantidad</th>
              <th className="text-end">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItem key={item.codigo} item={item} stock={stockDe(item.codigo)} onCantidad={cambiar} onQuitar={quitar} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
        <button type="button" className="btn btn-outline-secondary" onClick={vaciar}>
          Vaciar carrito
        </button>
        <div className="text-end">
          <p className="fs-4 fw-bold mb-2">Total: {formatearPrecio(total)}</p>
          <Link to="/checkout" className="btn btn-primary btn-lg">
            Ir a pagar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
