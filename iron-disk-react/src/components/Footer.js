import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer-iron py-4 mt-5">
      <div className="container text-center text-secondary small">
        <p className="mb-1">Iron Disk es tu tienda de confianza para coleccionistas de vinilos, CDs y cassettes.</p>
        <p className="mb-0">
          &copy; 2026 Iron Disk · <Link to="/contacto">Contacto</Link> · <Link to="/nosotros">Nosotros</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
