import { Link } from 'react-router-dom';
import Boton from './Boton';
import { precioFinal } from '../data/productos';
import { formatearPrecio } from '../utils/formato';

// Tarjeta de un disco con su imagen, precio y boton para agregarlo al carrito
function ProductCard({ producto, onAgregar }) {
  const enOferta = producto.ofertaPorcentaje > 0;
  const sinStock = producto.stock === 0;

  return (
    <div className="card card-iron card-producto h-100">
      <Link to={`/productos/${producto.codigo}`}>
        <img src={producto.imagen} className="card-img-top" alt={`${producto.nombre} de ${producto.artista}`} />
      </Link>
      <div className="card-body d-flex flex-column">
        {enOferta && <span className="badge text-bg-danger align-self-start mb-2">-{producto.ofertaPorcentaje}%</span>}
        <h5 className="card-title text-uppercase fs-6">{producto.nombre}</h5>
        <p className="card-text text-secondary small mb-1">
          {producto.artista} · {producto.formato}
        </p>
        <p className="fw-bold mt-auto mb-2">
          {enOferta && <s className="text-secondary me-2">{formatearPrecio(producto.precio)}</s>}
          {formatearPrecio(precioFinal(producto))}
        </p>
        <Boton etiqueta={sinStock ? 'Sin stock' : 'Añadir'} deshabilitado={sinStock} onClick={() => onAgregar(producto)} />
      </div>
    </div>
  );
}

export default ProductCard;
