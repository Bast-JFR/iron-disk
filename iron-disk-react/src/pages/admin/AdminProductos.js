import { useState } from 'react';
import { Link } from 'react-router-dom';
import TablaProductos from '../../components/TablaProductos';
import Buscador from '../../components/Buscador';
import { obtenerProductos, eliminarProducto } from '../../data/productos';
import { filtrarProductos } from '../../utils/filtros';

// Listado de productos con busqueda, ademas permite crear, editar y eliminar
function AdminProductos() {
  const [productos, setProductos] = useState(() => obtenerProductos());
  const [texto, setTexto] = useState('');

  const eliminar = (producto) => {
    if (!window.confirm(`¿Eliminar ${producto.nombre}?`)) {
      return;
    }
    eliminarProducto(producto.codigo);
    setProductos(obtenerProductos());
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="titulo-seccion mb-0">Productos</h1>
        <Link to="/admin/productos/nuevo" className="btn btn-primary">
          Nuevo producto
        </Link>
      </div>
      <div className="mb-3 col-md-6">
        <Buscador valor={texto} onCambio={setTexto} />
      </div>
      <TablaProductos productos={filtrarProductos(productos, { texto })} onEliminar={eliminar} />
    </>
  );
}

export default AdminProductos;
