import { Link } from 'react-router-dom';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import useCarga from '../hooks/useCarga';
import { categoriaService } from '../services/categoriaService';

// Lista de categorias con la cantidad de discos de cada una
function Categorias() {
  const { datos, cargando, error, recargar } = useCarga(() => categoriaService.listar(), []);

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-4">Categorías</h1>
      <MensajeError mensaje={error} onReintentar={recargar} />
      {cargando && <Cargando texto="Cargando categorías..." />}
      <div className="row g-4">
        {(datos || []).map((c) => (
          <div className="col-md-6" key={c.id}>
            <div className="card card-iron h-100">
              <img src={c.imagen} className="card-img-top card-imagen" alt={c.nombre} />
              <div className="card-body">
                <h5 className="card-title text-uppercase">{c.nombre}</h5>
                <p className="card-text text-secondary">{c.descripcion}</p>
                <p className="small mb-3">{c.totalProductos} discos</p>
                <Link to={`/productos?categoria=${c.id}`} className="btn btn-primary">
                  Ver discos
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
