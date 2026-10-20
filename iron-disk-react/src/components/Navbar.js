import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

const ENLACES = [
  { ruta: '/', texto: 'Home' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/ofertas', texto: 'Ofertas' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blogs', texto: 'Blogs' },
  { ruta: '/contacto', texto: 'Contacto' },
];

// Barra superior con menu, buscador, carrito y acceso de usuario
function Navbar() {
  const { unidades } = useCarrito();
  const { usuario, esAdmin, cerrarSesion } = useAuth();
  const [texto, setTexto] = useState('');
  const navegar = useNavigate();

  const buscar = (e) => {
    e.preventDefault();
    navegar(`/productos?q=${encodeURIComponent(texto.trim())}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-iron sticky-top">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">
          Iron Disk
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu-principal" aria-label="Abrir menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu-principal">
          <ul className="navbar-nav me-auto">
            {ENLACES.map((e) => (
              <li className="nav-item" key={e.ruta}>
                <NavLink className="nav-link" to={e.ruta} end={e.ruta === '/'}>
                  {e.texto}
                </NavLink>
              </li>
            ))}
          </ul>
          <form className="d-flex me-lg-3 my-2 my-lg-0" role="search" onSubmit={buscar}>
            <input className="form-control form-control-sm me-2" type="search" placeholder="Buscar discos" aria-label="Buscar discos" value={texto} onChange={(e) => setTexto(e.target.value)} />
            <button className="btn btn-sm btn-outline-primary" type="submit">
              Buscar
            </button>
          </form>
          <div className="d-flex align-items-center gap-2">
            {usuario ? (
              <>
                <span className="small text-secondary">Hola, {usuario.nombre}</span>
                {esAdmin && (
                  <Link className="btn btn-sm btn-outline-secondary" to="/admin">
                    Admin
                  </Link>
                )}
                <button className="btn btn-sm btn-outline-secondary" type="button" onClick={cerrarSesion}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-secondary" to="/login">
                  Iniciar sesión
                </Link>
                <Link className="btn btn-sm btn-primary" to="/registro">
                  Crear cuenta
                </Link>
              </>
            )}
            <Link className="btn btn-sm btn-success" to="/carrito">
              Carrito <span className="badge text-bg-light">{unidades}</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
