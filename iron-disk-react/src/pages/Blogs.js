import { Link } from 'react-router-dom';
import { obtenerBlogs } from '../data/blogs';

// Listado de entradas del blog
function Blogs() {
  const blogs = obtenerBlogs();

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-2">Blog Iron Disk</h1>
      <p className="text-secondary mb-4">Historias, guías y curiosidades para quienes viven la música en formato físico.</p>

      <div className="row g-4">
        {blogs.map((b) => (
          <div className="col-md-6" key={b.id}>
            <article className="card card-iron h-100">
              <img src={b.imagen} className="card-img-top card-imagen" alt={b.alt} />
              <div className="card-body d-flex flex-column">
                <span className="badge text-bg-secondary align-self-start mb-2">{b.categoria}</span>
                <h2 className="card-title fs-5">{b.titulo}</h2>
                <p className="card-text text-secondary">{b.resumen}</p>
                <Link to={`/blogs/${b.id}`} className="btn btn-outline-primary mt-auto align-self-start">
                  Leer más
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
