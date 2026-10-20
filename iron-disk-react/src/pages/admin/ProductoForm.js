import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FormField from '../../components/FormField';
import Boton from '../../components/Boton';
import { agregarProducto, actualizarProducto, buscarProductoPorCodigo } from '../../data/productos';
import { obtenerCategorias } from '../../data/categorias';
import { validarCodigo, validarNombre, validarTexto, validarPrecio, validarStock, validarStockCritico, validarSeleccion } from '../../utils/validaciones';

const FORMATOS = ['Vinilo', 'CD', 'Cassette'];
const CAMPOS = ['codigo', 'nombre', 'artista', 'formato', 'categoria', 'precio', 'stock', 'stockCritico'];

function calcularErrores(v, codigoRepetido) {
  return {
    codigo: validarCodigo(v.codigo) || (codigoRepetido ? 'Ya existe un producto con ese código.' : ''),
    nombre: validarNombre(v.nombre),
    artista: validarTexto(v.artista, 'el artista', 50),
    formato: validarSeleccion(v.formato, 'un formato'),
    categoria: validarSeleccion(v.categoria, 'una categoría'),
    precio: validarPrecio(v.precio),
    stock: validarStock(v.stock),
    stockCritico: validarStockCritico(v.stockCritico),
  };
}

// Formulario para crear un producto o editar uno existente si la direccion trae su codigo
function ProductoForm() {
  const { codigo } = useParams();
  const navegar = useNavigate();
  const existente = codigo ? buscarProductoPorCodigo(codigo) : null;
  const editando = !!existente;

  const [valores, setValores] = useState({
    codigo: existente ? existente.codigo : '',
    nombre: existente ? existente.nombre : '',
    artista: existente ? existente.artista : '',
    formato: existente ? existente.formato : '',
    categoria: existente ? existente.categoria : '',
    precio: existente ? String(existente.precio) : '',
    stock: existente ? String(existente.stock) : '',
    stockCritico: existente ? String(existente.stockCritico) : '',
    ofertaPorcentaje: existente ? String(existente.ofertaPorcentaje) : '0',
    descripcion: existente ? existente.descripcion : '',
    imagen: existente ? existente.imagen : 'img/iron2.png',
  });
  const [tocados, setTocados] = useState({});

  const codigoRepetido = !editando && !!buscarProductoPorCodigo(valores.codigo.trim());
  const errores = calcularErrores(valores, codigoRepetido);
  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '');

  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    setTocados((t) => ({ ...t, [campo]: true }));
  };

  if (codigo && !existente) {
    return (
      <>
        <h1 className="titulo-seccion">Producto no encontrado</h1>
        <Link to="/admin/productos">Volver al listado</Link>
      </>
    );
  }

  const guardar = (e) => {
    e.preventDefault();
    setTocados(Object.fromEntries(CAMPOS.map((c) => [c, true])));

    if (Object.values(errores).some((m) => m !== '')) {
      return;
    }

    const producto = {
      codigo: valores.codigo.trim(),
      nombre: valores.nombre.trim(),
      artista: valores.artista.trim(),
      formato: valores.formato,
      categoria: valores.categoria,
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      stockCritico: valores.stockCritico === '' ? 0 : Number(valores.stockCritico),
      ofertaPorcentaje: Number(valores.ofertaPorcentaje) || 0,
      descripcion: valores.descripcion.trim(),
      imagen: valores.imagen.trim() || 'img/iron2.png',
    };

    if (editando) {
      actualizarProducto(existente.codigo, producto);
    } else {
      agregarProducto(producto);
    }
    navegar('/admin/productos');
  };

  const categorias = obtenerCategorias().map((c) => ({ valor: c.id, texto: c.nombre }));
  const formatos = FORMATOS.map((f) => ({ valor: f, texto: f }));

  return (
    <>
      <h1 className="titulo-seccion mb-4">{editando ? 'Editar producto' : 'Nuevo producto'}</h1>
      <form onSubmit={guardar} noValidate className="col-xl-8">
        <div className="row">
          <div className="col-md-4">
            <FormField id="codigo" etiqueta="Código" valor={valores.codigo} onCambio={cambiar('codigo')} error={mostrarError('codigo')} deshabilitado={editando} maxLength={20} />
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
            <FormField id="categoria" etiqueta="Categoría" tipo="select" valor={valores.categoria} opciones={categorias} onCambio={cambiar('categoria')} error={mostrarError('categoria')} />
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
            <FormField id="ofertaPorcentaje" etiqueta="Oferta (%)" tipo="number" valor={valores.ofertaPorcentaje} onCambio={cambiar('ofertaPorcentaje')} />
          </div>
        </div>
        <FormField id="descripcion" etiqueta="Descripción" tipo="textarea" valor={valores.descripcion} onCambio={cambiar('descripcion')} maxLength={500} />
        <FormField id="imagen" etiqueta="Imagen (ruta)" valor={valores.imagen} onCambio={cambiar('imagen')} placeholder="img/nombre.png" />

        <Boton tipo="submit" etiqueta={editando ? 'Guardar cambios' : 'Crear producto'} />
        <Link to="/admin/productos" className="btn btn-outline-secondary ms-2">
          Cancelar
        </Link>
      </form>
    </>
  );
}

export default ProductoForm;
