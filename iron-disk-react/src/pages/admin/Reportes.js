import { obtenerOrdenes } from '../../data/ordenes';
import { obtenerProductos, productosCriticos } from '../../data/productos';
import { obtenerCategorias } from '../../data/categorias';
import { obtenerUsuarios, TIPOS_USUARIO } from '../../data/usuarios';
import { resumenVentas, contarPor } from '../../utils/reportes';
import { formatearPrecio } from '../../utils/formato';

// Resumen de ventas, productos por categoria y usuarios por tipo
function Reportes() {
  const ventas = resumenVentas(obtenerOrdenes());
  const porCategoria = contarPor(obtenerProductos(), 'categoria');
  const porTipo = contarPor(obtenerUsuarios(), 'tipoUsuario');

  const tarjetas = [
    { titulo: 'Total vendido', valor: formatearPrecio(ventas.totalVendido) },
    { titulo: 'Órdenes pagadas', valor: ventas.pagadas },
    { titulo: 'Pagos rechazados', valor: ventas.rechazadas },
    { titulo: 'Productos críticos', valor: productosCriticos().length },
  ];

  return (
    <>
      <h1 className="titulo-seccion mb-4">Reportes</h1>

      <div className="row g-4 mb-4">
        {tarjetas.map((t) => (
          <div className="col-sm-6 col-xl-3" key={t.titulo}>
            <div className="card card-iron h-100">
              <div className="card-body">
                <p className="text-secondary text-uppercase small mb-1">{t.titulo}</p>
                <p className="fs-3 fw-bold mb-0">{t.valor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <h2 className="fs-5 mb-3">Productos por categoría</h2>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th className="text-end">Productos</th>
                </tr>
              </thead>
              <tbody>
                {obtenerCategorias().map((c) => (
                  <tr key={c.id}>
                    <td>{c.nombre}</td>
                    <td className="text-end">{porCategoria[c.id] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-6">
          <h2 className="fs-5 mb-3">Usuarios por tipo</h2>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th className="text-end">Usuarios</th>
                </tr>
              </thead>
              <tbody>
                {TIPOS_USUARIO.map((tipo) => (
                  <tr key={tipo}>
                    <td>{tipo}</td>
                    <td className="text-end">{porTipo[tipo] || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reportes;
