import { Link } from 'react-router-dom';
import { obtenerProductos, productosCriticos } from '../../data/productos';
import { obtenerUsuarios } from '../../data/usuarios';
import { obtenerOrdenes } from '../../data/ordenes';
import { formatearPrecio } from '../../utils/formato';

// Totales de la tienda y accesos a cada mantenedor
function Dashboard() {
  const ordenes = obtenerOrdenes();
  const ventas = ordenes.filter((o) => o.estado === 'Pagada').reduce((suma, o) => suma + o.total, 0);

  const tarjetas = [
    { titulo: 'Productos', valor: obtenerProductos().length, ruta: '/admin/productos' },
    { titulo: 'Productos críticos', valor: productosCriticos().length, ruta: '/admin/productos/criticos' },
    { titulo: 'Usuarios', valor: obtenerUsuarios().length, ruta: '/admin/usuarios' },
    { titulo: 'Órdenes', valor: ordenes.length, ruta: '/admin/ordenes' },
  ];

  return (
    <>
      <h1 className="titulo-seccion mb-4">Panel de administración</h1>
      <div className="row g-4 mb-4">
        {tarjetas.map((t) => (
          <div className="col-sm-6 col-xl-3" key={t.titulo}>
            <div className="card card-iron h-100">
              <div className="card-body">
                <p className="text-secondary text-uppercase small mb-1">{t.titulo}</p>
                <p className="display-6 fw-bold mb-2">{t.valor}</p>
                <Link to={t.ruta}>Ver detalle</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card card-iron">
        <div className="card-body">
          <p className="text-secondary text-uppercase small mb-1">Ventas pagadas</p>
          <p className="display-6 fw-bold mb-0">{formatearPrecio(ventas)}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
