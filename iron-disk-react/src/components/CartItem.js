import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/formato';

// Una fila del carrito con su imagen, cantidad editable y boton para quitarla
function CartItem({ item, stock, onCantidad, onQuitar }) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center gap-3">
          <img src={item.imagen} alt={item.nombre} className="carrito-imagen rounded" />
          <div>
            <Link to={`/productos/${item.codigo}`} className="fw-bold text-decoration-none">
              {item.nombre}
            </Link>
            <div className="small text-secondary">{item.artista}</div>
          </div>
        </div>
      </td>
      <td className="text-end">{formatearPrecio(item.precio)}</td>
      <td>
        <input
          type="number"
          className="form-control form-control-sm carrito-cantidad"
          min="1"
          max={stock}
          value={item.cantidad}
          aria-label={`Cantidad de ${item.nombre}`}
          onChange={(e) => onCantidad(item.codigo, Number(e.target.value))}
        />
      </td>
      <td className="text-end">{formatearPrecio(item.precio * item.cantidad)}</td>
      <td className="text-end">
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onQuitar(item.codigo)}>
          Quitar
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
