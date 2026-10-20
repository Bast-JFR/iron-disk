import { Link } from 'react-router-dom';
import { obtenerCategorias } from '../data/categorias';
import { obtenerProductos } from '../data/productos';

// Lista de categorias con la cantidad de discos de cada una
function Categorias() {
  const categorias = obtenerCategorias();
  const productos = obtenerProductos();

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-4">Categorías</h1>
      <div className="row g-4">
        {categorias.map((c) => {
          const cantidad = productos.filter((p) => p.categoria === c.id).length;
          return (
            <div className="col-md-6" key={c.id}>
              <div className="card card-iron h-100">
                <img src={c.imagen} className="card-img-top card-imagen" alt={c.nombre} />
                <div className="card-body">
                  <h5 className="card-title text-uppercase">{c.nombre}</h5>
                  <p className="card-text text-secondary">{c.descripcion}</p>
                  <p className="small mb-3">{cantidad} discos</p>
                  <Link to={`/productos?categoria=${c.id}`} className="btn btn-primary">
                    Ver discos
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categorias;
