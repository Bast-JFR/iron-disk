import { NavLink, Link } from 'react-router-dom';

const ENLACES = [
  { ruta: '/', texto: 'Home' },
  { ruta: '/productos', texto: 'Productos' },
  { ruta: '/categorias', texto: 'Categorías' },
  { ruta: '/ofertas', texto: 'Ofertas' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blogs', texto: 'Blogs' },
  { ruta: '/contacto', texto: 'Contacto' },
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-iron sticky-top">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">Iron Disk</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu-principal" aria-label="Abrir menú">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu-principal">
          <ul className="navbar-nav me-auto">
            {ENLACES.map((e) => (
              <li className="nav-item" key={e.ruta}>
                <NavLink className="nav-link" to={e.ruta} end={e.ruta === '/'}>{e.texto}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
