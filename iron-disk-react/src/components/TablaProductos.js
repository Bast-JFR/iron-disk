import { Link } from 'react-router-dom';
import { formatearPrecio } from '../utils/formato';

// Tabla de productos del admin, las acciones son opcionales
function TablaProductos({ productos, onEliminar }) {
  if (productos.length === 0) {
    return <p className="text-secondary">No hay productos para mostrar.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Formato</th>
            <th className="text-end">Precio</th>
            <th className="text-end">Stock</th>
            <th className="text-end">Crítico</th>
            {onEliminar && <th></th>}
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.codigo}>
              <td>{p.codigo}</td>
              <td>
                {p.nombre}
                <div className="small text-secondary">{p.artista}</div>
              </td>
              <td>{p.formato}</td>
              <td className="text-end">{formatearPrecio(p.precio)}</td>
              <td className={`text-end${p.stock <= p.stockCritico ? ' stock-critico' : ''}`}>{p.stock}</td>
              <td className="text-end">{p.stockCritico}</td>
              {onEliminar && (
                <td className="text-end text-nowrap">
                  <Link to={`/admin/productos/editar/${p.codigo}`} className="btn btn-sm btn-outline-primary me-2">
                    Editar
                  </Link>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(p)}>
                    Eliminar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaProductos;
