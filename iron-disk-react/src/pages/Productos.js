import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Buscador from '../components/Buscador';
import ProductGrid from '../components/ProductGrid';
import Aviso from '../components/Aviso';
import Cargando from '../components/Cargando';
import MensajeError from '../components/MensajeError';
import useAgregarAlCarrito from '../hooks/useAgregarAlCarrito';
import useCarga from '../hooks/useCarga';
import { productoService } from '../services/productoService';
import { categoriaService } from '../services/categoriaService';
import { filtrarProductos } from '../utils/filtros';

const FORMATOS = ['Vinilo', 'CD', 'Cassette'];

// Catalogo completo con busqueda por texto y filtros de categoria y formato
function Productos() {
  const [params] = useSearchParams();
  const [texto, setTexto] = useState(params.get('q') || '');
  const [categoria, setCategoria] = useState(params.get('categoria') || '');
  const [formato, setFormato] = useState('');
  const { aviso, agregarProducto } = useAgregarAlCarrito();

  // Pide los productos y las categorias al mismo tiempo, los filtros se aplican en el navegador
  const { datos, cargando, error, recargar } = useCarga(() => Promise.all([productoService.listar(), categoriaService.listar()]), []);
  const [todos, categorias] = datos || [[], []];
  const visibles = filtrarProductos(todos, { texto, categoria, formato });

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-4">Productos</h1>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <Buscador valor={texto} onCambio={setTexto} />
        </div>
        <div className="col-6 col-md-3">
          <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)} aria-label="Filtrar por categoria">
            <option value="">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <select className="form-select" value={formato} onChange={(e) => setFormato(e.target.value)} aria-label="Filtrar por formato">
            <option value="">Todos los formatos</option>
            {FORMATOS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>

      <MensajeError mensaje={error} onReintentar={recargar} />
      {cargando ? (
        <Cargando texto="Cargando discos..." />
      ) : (
        !error && (
          <>
            <p className="text-secondary small">{visibles.length} productos</p>
            <ProductGrid productos={visibles} onAgregar={agregarProducto} />
          </>
        )
      )}
      <Aviso mensaje={aviso} />
    </div>
  );
}

export default Productos;
