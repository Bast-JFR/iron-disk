import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import Aviso from '../components/Aviso';
import useAgregarAlCarrito from '../hooks/useAgregarAlCarrito';
import { obtenerProductos } from '../data/productos';

const ACCESOS = [
  { ruta: '/nosotros', titulo: 'Conócenos', texto: 'Quiénes somos y qué ofrecemos a los coleccionistas.' },
  { ruta: '/blogs', titulo: 'Blog', texto: 'Historias, guías y curiosidades del mundo del vinilo.' },
  { ruta: '/contacto', titulo: 'Contáctanos', texto: 'Escríbenos o visítanos cerca del Metro Los Leones.' },
];

// Pagina de inicio con banner, discos destacados y accesos a otras secciones
function Home() {
  const { aviso, agregarProducto } = useAgregarAlCarrito();
  const destacados = obtenerProductos().slice(0, 8);

  return (
    <>
      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <h1 className="titulo-seccion display-5 mb-3">Tu tienda de discos favorita</h1>
            <p className="text-secondary fs-5 mb-4">
              Vinilos, CDs y cassettes de las mejores bandas de metal y cumbia. Encuentra ediciones originales y agrega tus favoritos al carrito.
            </p>
            <Link to="/productos" className="btn btn-primary btn-lg">
              Ver productos
            </Link>
          </div>
          <div className="col-lg-6">
            <img src="img/maiden-beast.png" className="img-fluid rounded-4 border" alt="The Number of the Beast de Iron Maiden" />
          </div>
        </div>
      </section>

      <section className="container py-4">
        <h2 className="titulo-seccion mb-4">Discos destacados</h2>
        <ProductGrid productos={destacados} onAgregar={agregarProducto} />
      </section>

      <section className="container py-5">
        <div className="row g-4">
          {ACCESOS.map((a) => (
            <div className="col-md-4" key={a.ruta}>
              <div className="card card-iron h-100">
                <div className="card-body">
                  <h5 className="card-title text-uppercase">{a.titulo}</h5>
                  <p className="card-text text-secondary">{a.texto}</p>
                  <Link to={a.ruta} className="btn btn-outline-primary">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Aviso mensaje={aviso} />
    </>
  );
}

export default Home;
