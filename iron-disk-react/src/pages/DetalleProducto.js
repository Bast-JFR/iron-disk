import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Boton from '../components/Boton';
import ProductGrid from '../components/ProductGrid';
import Aviso from '../components/Aviso';
import useAgregarAlCarrito from '../hooks/useAgregarAlCarrito';
import { buscarProductoPorCodigo, obtenerProductos, precioFinal } from '../data/productos';
import { formatearPrecio } from '../utils/formato';

// Detalle de un disco, el codigo viene en la direccion de la pagina
function DetalleProducto() {
  const { codigo } = useParams();
  const producto = buscarProductoPorCodigo(codigo);
  const [cantidad, setCantidad] = useState(1);
  const { aviso, agregarProducto } = useAgregarAlCarrito();

  if (!producto) {
    return (
      <div className="container py-5">
        <h1 className="titulo-seccion">Producto no encontrado</h1>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    );
  }

  const enOferta = producto.ofertaPorcentaje > 0;
  const quedaPoco = producto.stock > 0 && producto.stock <= producto.stockCritico;
  const relacionados = obtenerProductos()
    .filter((p) => p.categoria === producto.categoria && p.codigo !== producto.codigo)
    .slice(0, 4);

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos">Productos</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="row g-5 mb-5">
        <div className="col-md-6">
          <img src={producto.imagen} className="img-fluid rounded-4 border" alt={`${producto.nombre} de ${producto.artista}`} />
        </div>
        <div className="col-md-6">
          <span className="badge text-bg-secondary text-uppercase mb-2">{producto.categoria}</span>
          <h1 className="titulo-seccion">{producto.nombre}</h1>
          <p className="fs-5 text-secondary">
            {producto.artista} · {producto.formato}
          </p>
          <p>{producto.descripcion}</p>

          <p className="fs-3 fw-bold">
            {enOferta && <s className="text-secondary fs-5 me-2">{formatearPrecio(producto.precio)}</s>}
            {formatearPrecio(precioFinal(producto))}
            {enOferta && <span className="badge text-bg-danger ms-2">-{producto.ofertaPorcentaje}%</span>}
          </p>

          {producto.stock === 0 && <p className="text-danger">Sin stock por ahora.</p>}
          {quedaPoco && <p className="stock-critico">¡Quedan solo {producto.stock} unidades!</p>}

          <div className="d-flex align-items-end gap-3 mt-4">
            <div>
              <label htmlFor="cantidad" className="form-label">
                Cantidad
              </label>
              <input
                id="cantidad"
                type="number"
                className="form-control"
                min="1"
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>
            <Boton etiqueta="Añadir al carrito" deshabilitado={producto.stock === 0} onClick={() => agregarProducto(producto, cantidad)} />
          </div>
        </div>
      </div>

      <h2 className="titulo-seccion mb-4">También te puede gustar</h2>
      <ProductGrid productos={relacionados} onAgregar={agregarProducto} />
      <Aviso mensaje={aviso} />
    </div>
  );
}

export default DetalleProducto;
