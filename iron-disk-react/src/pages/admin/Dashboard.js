import { Link } from 'react-router-dom';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { productoService } from '../../services/productoService';
import { usuarioService } from '../../services/usuarioService';
import { boletaService } from '../../services/boletaService';
import { reporteService } from '../../services/reporteService';
import { formatearPrecio } from '../../utils/formato';

// Totales de la tienda y accesos a cada mantenedor
function Dashboard() {
  const { datos, cargando, error, recargar } = useCarga(async () => {
    const [productos, criticos, usuarios, ordenes, ventas] = await Promise.all([
      productoService.listar(),
      productoService.criticos(),
      usuarioService.listar(),
      boletaService.listar(),
      reporteService.resumen(),
    ]);
    return { productos: productos.length, criticos: criticos.length, usuarios: usuarios.length, ordenes: ordenes.length, ventas: ventas.totalVendido };
  }, []);

  if (cargando) {
    return <Cargando texto="Cargando el panel..." />;
  }

  if (error || !datos) {
    return (
      <>
        <h1 className="titulo-seccion mb-4">Panel de administración</h1>
        <MensajeError mensaje={error} onReintentar={recargar} />
      </>
    );
  }

  const tarjetas = [
    { titulo: 'Productos', valor: datos.productos, ruta: '/admin/productos' },
    { titulo: 'Productos críticos', valor: datos.criticos, ruta: '/admin/productos/criticos' },
    { titulo: 'Usuarios', valor: datos.usuarios, ruta: '/admin/usuarios' },
    { titulo: 'Órdenes', valor: datos.ordenes, ruta: '/admin/ordenes' },
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
          <p className="text-secondary text-uppercase small mb-1">Ventas (sin boletas anuladas)</p>
          <p className="display-6 fw-bold mb-0">{formatearPrecio(datos.ventas)}</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
