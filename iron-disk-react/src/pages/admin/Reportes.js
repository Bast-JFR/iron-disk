import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { reporteService } from '../../services/reporteService';
import { productoService } from '../../services/productoService';
import { categoriaService } from '../../services/categoriaService';
import { usuarioService } from '../../services/usuarioService';
import { NOMBRES_TIPO } from '../../services/adaptadores';
import { contarPor } from '../../utils/reportes';
import { formatearPrecio } from '../../utils/formato';

// Resumen de ventas del backend, productos por categoria y usuarios por tipo
function Reportes() {
  const { datos, cargando, error, recargar } = useCarga(async () => {
    const [ventas, productos, criticos, categorias, usuarios] = await Promise.all([
      reporteService.resumen(),
      productoService.listar(),
      productoService.criticos(),
      categoriaService.listar(),
      usuarioService.listar(),
    ]);
    return { ventas, criticos: criticos.length, categorias, porCategoria: contarPor(productos, 'categoria'), porTipo: contarPor(usuarios, 'tipoUsuario') };
  }, []);

  if (cargando) {
    return <Cargando texto="Cargando reportes..." />;
  }

  if (error || !datos) {
    return (
      <>
        <h1 className="titulo-seccion mb-4">Reportes</h1>
        <MensajeError mensaje={error} onReintentar={recargar} />
      </>
    );
  }

  const { ventas, criticos, categorias, porCategoria, porTipo } = datos;

  const tarjetas = [
    { titulo: 'Total vendido', valor: formatearPrecio(ventas.totalVendido) },
    { titulo: 'Boletas', valor: ventas.cantidadBoletas },
    { titulo: 'Ticket promedio', valor: formatearPrecio(ventas.ticketPromedio) },
    { titulo: 'Productos críticos', valor: criticos },
  ];

  return (
    <>
      <h1 className="titulo-seccion mb-2">Reportes</h1>
      <p className="text-secondary mb-4">Las boletas anuladas no se cuentan en las ventas.</p>

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

      <h2 className="fs-5 mb-3">Discos más vendidos</h2>
      {ventas.masVendidos.length === 0 ? (
        <p className="text-secondary mb-4">Todavía no hay ventas.</p>
      ) : (
        <div className="table-responsive mb-4">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Código</th>
                <th>Disco</th>
                <th className="text-end">Unidades</th>
              </tr>
            </thead>
            <tbody>
              {ventas.masVendidos.map((p) => (
                <tr key={p.productoId}>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td className="text-end">{p.unidades}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
                {categorias.map((c) => (
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
                {NOMBRES_TIPO.map((tipo) => (
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
