import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Cargando from './Cargando';
import { puedeEntrarAlPanel, puedeVer, rutaInicial, seccionDeRuta } from '../auth/permisos';

const ENLACES = [
  { ruta: '/admin', texto: 'Dashboard', exacto: true, seccion: 'dashboard' },
  { ruta: '/admin/productos', texto: 'Productos', exacto: false, seccion: 'productos' },
  { ruta: '/admin/productos/criticos', texto: 'Productos críticos', exacto: false, seccion: 'criticos' },
  { ruta: '/admin/usuarios', texto: 'Usuarios', exacto: false, seccion: 'usuarios' },
  { ruta: '/admin/ordenes', texto: 'Órdenes', exacto: false, seccion: 'ordenes' },
  { ruta: '/admin/reportes', texto: 'Reportes', exacto: false, seccion: 'reportes' },
  { ruta: '/admin/perfil', texto: 'Perfil', exacto: false, seccion: 'perfil' },
];

// Estructura del panel con menu lateral, entran el administrador y el vendedor y cada uno ve solo lo suyo
function AdminLayout() {
  const { usuario, cerrarSesion, verificando } = useAuth();
  const { pathname } = useLocation();

  // Al recargar la pagina se espera a validar la sesion antes de decidir si se redirige al login
  if (verificando) {
    return <Cargando texto="Verificando sesión..." />;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Un cliente no entra al panel
  if (!puedeEntrarAlPanel(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  // Si escribe la direccion de una seccion que no le corresponde lo llevamos a la suya
  if (!puedeVer(usuario.rol, seccionDeRuta(pathname))) {
    return <Navigate to={rutaInicial(usuario.rol)} replace />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3 col-lg-2 sidebar-admin py-4">
          <h2 className="fs-5 text-uppercase px-3">Iron Disk admin</h2>
          <p className="small text-secondary px-3">{usuario.nombre}</p>
          <ul className="nav flex-column">
            {ENLACES.filter((e) => puedeVer(usuario.rol, e.seccion)).map((e) => (
              <li className="nav-item" key={e.ruta}>
                <NavLink className="nav-link" to={e.ruta} end={e.exacto}>
                  {e.texto}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Ver tienda
              </NavLink>
            </li>
          </ul>
          <button type="button" className="btn btn-sm btn-outline-secondary mx-3 mt-3" onClick={cerrarSesion}>
            Salir
          </button>
        </aside>
        <main className="col-md-9 col-lg-10 py-4 px-md-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
