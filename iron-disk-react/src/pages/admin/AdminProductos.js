import { useState } from 'react';
import { Link } from 'react-router-dom';
import TablaProductos from '../../components/TablaProductos';
import Buscador from '../../components/Buscador';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { productoService } from '../../services/productoService';
import { mensajeDeError } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { puedeHacer } from '../../auth/permisos';
import { filtrarProductos } from '../../utils/filtros';

// Listado de productos con busqueda, ademas permite crear, editar y eliminar
function AdminProductos() {
  const { usuario } = useAuth();
  const puedeEditar = puedeHacer(usuario.rol, 'editar-productos');
  const { datos, cargando, error, recargar } = useCarga(() => productoService.listar(), []);
  const [texto, setTexto] = useState('');
  const [errorEliminar, setErrorEliminar] = useState('');

  const eliminar = async (producto) => {
    if (!window.confirm(`¿Eliminar ${producto.nombre}?`)) {
      return;
    }
    setErrorEliminar('');
    try {
      await productoService.eliminar(producto.id);
      recargar();
    } catch (e) {
      // El backend no deja eliminar un producto que ya se vendio
      setErrorEliminar(mensajeDeError(e, 'No se pudo eliminar el producto.'));
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="titulo-seccion mb-0">Productos</h1>
        {puedeEditar && (
          <Link to="/admin/productos/nuevo" className="btn btn-primary">
            Nuevo producto
          </Link>
        )}
      </div>
      <div className="mb-3 col-md-6">
        <Buscador valor={texto} onCambio={setTexto} />
      </div>
      <MensajeError mensaje={error || errorEliminar} onReintentar={error ? recargar : undefined} />
      {cargando ? <Cargando texto="Cargando productos..." /> : !error && <TablaProductos productos={filtrarProductos(datos || [], { texto })} onEliminar={puedeEditar ? eliminar : undefined} />}
    </>
  );
}

export default AdminProductos;
