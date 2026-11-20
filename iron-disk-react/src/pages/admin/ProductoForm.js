import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormField from '../../components/FormField';
import Boton from '../../components/Boton';
import Cargando from '../../components/Cargando';
import MensajeError from '../../components/MensajeError';
import useCarga from '../../hooks/useCarga';
import { productoService } from '../../services/productoService';
import { categoriaService } from '../../services/categoriaService';
import { erroresDeCampos, mensajeDeError } from '../../services/api';
import { validarCodigo, validarNombre, validarTexto, validarPrecio, validarStock, validarStockCritico, validarSeleccion } from '../../utils/validaciones';

const FORMATOS = ['Vinilo', 'CD', 'Cassette'];
const CAMPOS = ['codigo', 'nombre', 'artista', 'formato', 'categoria', 'precio', 'stock', 'stockCritico'];

function calcularErrores(v) {
  return {
    codigo: validarCodigo(v.codigo),
    nombre: validarNombre(v.nombre),
    artista: validarTexto(v.artista, 'el artista', 50),
    formato: validarSeleccion(v.formato, 'un formato'),
    categoria: validarSeleccion(v.categoria, 'una categoría'),
    precio: validarPrecio(v.precio),
    stock: validarStock(v.stock),
    stockCritico: validarStockCritico(v.stockCritico),
  };
}

// El backend llama categoriaId al campo que el formulario llama categoria
function erroresDelServidor(error) {
  const campos = erroresDeCampos(error);
  return campos.categoriaId ? { ...campos, categoria: campos.categoriaId } : campos;
}

// Formulario del producto, recibe el producto a editar o nada si es uno nuevo
function Formulario({ existente, categorias }) {
  const navegar = useNavigate();
  const editando = !!existente;

  const [valores, setValores] = useState({
    codigo: existente ? existente.codigo : '',
    nombre: existente ? existente.nombre : '',
    artista: existente ? existente.artista : '',
    formato: existente ? existente.formato : '',
    categoria: existente ? String(existente.categoriaId) : '',
    precio: existente ? String(existente.precio) : '',
    stock: existente ? String(existente.stock) : '',
    stockCritico: existente ? String(existente.stockCritico) : '',
    ofertaPorcentaje: existente ? String(existente.ofertaPorcentaje) : '0',
    descripcion: existente && existente.descripcion ? existente.descripcion : '',
    imagen: existente && existente.imagen ? existente.imagen : 'img/iron2.png',
  });
  const [tocados, setTocados] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [errorServidor, setErrorServidor] = useState({});
  const [guardando, setGuardando] = useState(false);

  const errores = calcularErrores(valores);
  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '') || errorServidor[campo] || '';

  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    setTocados((t) => ({ ...t, [campo]: true }));
    setErrorServidor((e) => ({ ...e, [campo]: '' }));
    setErrorGeneral('');
  };

  const guardar = async (e) => {
    e.preventDefault();
    setTocados(Object.fromEntries(CAMPOS.map((c) => [c, true])));

    if (Object.values(errores).some((m) => m !== '')) {
      return;
    }

    const producto = {
      ...valores,
      codigo: valores.codigo.trim(),
      nombre: valores.nombre.trim(),
      artista: valores.artista.trim(),
      descripcion: valores.descripcion.trim(),
      imagen: valores.imagen.trim() || 'img/iron2.png',
    };

    setGuardando(true);
    try {
      if (editando) {
        await productoService.actualizar(existente.id, producto);
      } else {
        await productoService.crear(producto);
      }
      navegar('/admin/productos');
    } catch (error) {
      // El backend valida de nuevo y avisa por ejemplo si el codigo ya existe
      setErrorGeneral(mensajeDeError(error, 'No se pudo guardar el producto.'));
      setErrorServidor(erroresDelServidor(error));
      setGuardando(false);
    }
  };

  const opcionesCategoria = categorias.map((c) => ({ valor: String(c.id), texto: c.nombre }));
  const formatos = FORMATOS.map((f) => ({ valor: f, texto: f }));

  return (
    <>
      <h1 className="titulo-seccion mb-4">{editando ? 'Editar producto' : 'Nuevo producto'}</h1>
      <MensajeError mensaje={errorGeneral} />
      <form onSubmit={guardar} noValidate className="col-xl-8">
        <div className="row">
          <div className="col-md-4">
            <FormField id="codigo" etiqueta="Código" valor={valores.codigo} onCambio={cambiar('codigo')} error={mostrarError('codigo')} maxLength={20} />
          </div>
          <div className="col-md-8">
            <FormField id="nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} error={mostrarError('nombre')} maxLength={50} />
          </div>
          <div className="col-md-4">
            <FormField id="artista" etiqueta="Artista" valor={valores.artista} onCambio={cambiar('artista')} error={mostrarError('artista')} maxLength={50} />
          </div>
          <div className="col-md-4">
            <FormField id="formato" etiqueta="Formato" tipo="select" valor={valores.formato} opciones={formatos} onCambio={cambiar('formato')} error={mostrarError('formato')} />
          </div>
          <div className="col-md-4">
            <FormField id="categoria" etiqueta="Categoría" tipo="select" valor={valores.categoria} opciones={opcionesCategoria} onCambio={cambiar('categoria')} error={mostrarError('categoria')} />
          </div>
          <div className="col-md-3">
            <FormField id="precio" etiqueta="Precio" tipo="number" valor={valores.precio} onCambio={cambiar('precio')} error={mostrarError('precio')} />
          </div>
          <div className="col-md-3">
            <FormField id="stock" etiqueta="Stock" tipo="number" valor={valores.stock} onCambio={cambiar('stock')} error={mostrarError('stock')} />
          </div>
          <div className="col-md-3">
            <FormField id="stockCritico" etiqueta="Stock crítico" tipo="number" valor={valores.stockCritico} onCambio={cambiar('stockCritico')} error={mostrarError('stockCritico')} />
          </div>
          <div className="col-md-3">
            <FormField id="ofertaPorcentaje" etiqueta="Oferta (%)" tipo="number" valor={valores.ofertaPorcentaje} onCambio={cambiar('ofertaPorcentaje')} error={mostrarError('ofertaPorcentaje')} />
          </div>
        </div>
        <FormField id="descripcion" etiqueta="Descripción" tipo="textarea" valor={valores.descripcion} onCambio={cambiar('descripcion')} maxLength={500} />
        <FormField id="imagen" etiqueta="Imagen (ruta)" valor={valores.imagen} onCambio={cambiar('imagen')} placeholder="img/nombre.png" />

        <Boton tipo="submit" etiqueta={guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear producto'} deshabilitado={guardando} />
        <Link to="/admin/productos" className="btn btn-outline-secondary ms-2">
          Cancelar
        </Link>
      </form>
    </>
  );
}

// Carga las categorias y, si hay un id en la direccion, el producto que se va a editar
function ProductoForm() {
  const { id } = useParams();
  const { datos, cargando, error } = useCarga(
    () => Promise.all([id ? productoService.obtener(id) : null, categoriaService.listar()]),
    [id]
  );

  if (cargando) {
    return <Cargando texto="Cargando formulario..." />;
  }

  if (error || !datos) {
    return (
      <>
        <h1 className="titulo-seccion">No se pudo abrir el producto</h1>
        <p className="text-secondary">{error}</p>
        <Link to="/admin/productos">Volver al listado</Link>
      </>
    );
  }

  return <Formulario key={id || 'nuevo'} existente={datos[0]} categorias={datos[1]} />;
}

export default ProductoForm;
