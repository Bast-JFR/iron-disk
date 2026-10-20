import { Link, useParams } from 'react-router-dom';
import { buscarBlog } from '../data/blogs';

// Una entrada del blog completa, el id viene en la direccion de la pagina
function BlogDetalle() {
  const { id } = useParams();
  const blog = buscarBlog(id);

  if (!blog) {
    return (
      <div className="container py-5">
        <h1 className="titulo-seccion">Entrada no encontrada</h1>
        <Link to="/blogs">Volver a blogs</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <img src={blog.imagen} className="blog-cabecera rounded-4 mb-4" alt={blog.alt} />
      <article className="mx-auto col-lg-8">
        <span className="badge text-bg-secondary mb-2">{blog.categoria}</span>
        <h1 className="titulo-seccion mb-4">{blog.titulo}</h1>

        {blog.contenido.map((bloque, i) => {
          if (bloque.tipo === 'h2') {
            return (
              <h2 key={i} className="fs-4 mt-4">
                {bloque.texto}
              </h2>
            );
          }
          if (bloque.tipo === 'ul') {
            return (
              <ul key={i}>
                {bloque.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{bloque.texto}</p>;
        })}

        <Link to="/blogs" className="btn btn-outline-secondary mt-4">
          ← Volver a blogs
        </Link>
      </article>
    </div>
  );
}

export default BlogDetalle;
