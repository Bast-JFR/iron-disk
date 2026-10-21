import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ENLACES = [
  { ruta: '/admin', texto: 'Dashboard', exacto: true },
  { ruta: '/admin/productos', texto: 'Productos', exacto: false },
  { ruta: '/admin/productos/criticos', texto: 'Productos críticos', exacto: false },
  { ruta: '/admin/usuarios', texto: 'Usuarios', exacto: false },
  { ruta: '/admin/ordenes', texto: 'Órdenes', exacto: false },
  { ruta: '/admin/reportes', texto: 'Reportes', exacto: false },
];

// Estructura del panel admin con menu lateral, solo entra un administrador
function AdminLayout() {
  const { usuario, esAdmin, cerrarSesion } = useAuth();

  if (!usuario || !esAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <aside className="col-md-3 col-lg-2 sidebar-admin py-4">
          <h2 className="fs-5 text-uppercase px-3">Iron Disk admin</h2>
          <p className="small text-secondary px-3">{usuario.nombre}</p>
          <ul className="nav flex-column">
            {ENLACES.map((e) => (
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
