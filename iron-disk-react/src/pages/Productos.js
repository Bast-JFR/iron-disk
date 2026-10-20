import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Buscador from '../components/Buscador';
import ProductGrid from '../components/ProductGrid';
import Aviso from '../components/Aviso';
import useAgregarAlCarrito from '../hooks/useAgregarAlCarrito';
import { obtenerProductos } from '../data/productos';
import { obtenerCategorias } from '../data/categorias';
import { filtrarProductos } from '../utils/filtros';

const FORMATOS = ['Vinilo', 'CD', 'Cassette'];

// Catalogo completo con busqueda por texto y filtros de categoria y formato
function Productos() {
  const [params] = useSearchParams();
  const [texto, setTexto] = useState(params.get('q') || '');
  const [categoria, setCategoria] = useState(params.get('categoria') || '');
  const [formato, setFormato] = useState('');
  const { aviso, agregarProducto } = useAgregarAlCarrito();

  const todos = obtenerProductos();
  const categorias = obtenerCategorias();
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

      <p className="text-secondary small">{visibles.length} productos</p>
      <ProductGrid productos={visibles} onAgregar={agregarProducto} />
      <Aviso mensaje={aviso} />
    </div>
  );
}

export default Productos;
