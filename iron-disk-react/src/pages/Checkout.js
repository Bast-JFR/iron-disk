import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import SelectorRegionComuna from '../components/SelectorRegionComuna';
import Boton from '../components/Boton';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import { crearOrden } from '../data/ordenes';
import { buscarProductoPorCodigo, actualizarProducto } from '../data/productos';
import { validarNombre, validarApellidos, validarCorreo, validarDireccion, validarSeleccion, validarTarjeta } from '../utils/validaciones';
import { simularPago } from '../utils/pago';
import { formatearPrecio } from '../utils/formato';

const CAMPOS = ['nombre', 'apellidos', 'correo', 'direccion', 'region', 'comuna', 'tarjeta'];

function calcularErrores(v) {
  return {
    nombre: validarNombre(v.nombre),
    apellidos: validarApellidos(v.apellidos),
    correo: validarCorreo(v.correo),
    direccion: validarDireccion(v.direccion),
    region: validarSeleccion(v.region, 'una región'),
    comuna: validarSeleccion(v.comuna, 'una comuna'),
    tarjeta: validarTarjeta(v.tarjeta),
  };
}

// Resta del stock lo que se compro
function descontarStock(items) {
  items.forEach((i) => {
    const producto = buscarProductoPorCodigo(i.codigo);
    if (producto) {
      actualizarProducto(i.codigo, { ...producto, stock: Math.max(0, producto.stock - i.cantidad) });
    }
  });
}

// Datos del comprador, direccion y pago, si hay sesion se completan solos
function Checkout() {
  const { items, total, vaciar } = useCarrito();
  const { usuario } = useAuth();
  const navegar = useNavigate();

  const [valores, setValores] = useState({
    nombre: usuario ? usuario.nombre : '',
    apellidos: usuario ? usuario.apellidos : '',
    correo: usuario ? usuario.correo : '',
    direccion: usuario ? usuario.direccion : '',
    region: usuario ? usuario.region : '',
    comuna: usuario ? usuario.comuna : '',
    tarjeta: '',
  });
  const [tocados, setTocados] = useState({});

  const errores = calcularErrores(valores);
  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '');
  const marcar = (campo) => () => setTocados((t) => ({ ...t, [campo]: true }));

  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }));
    setTocados((t) => ({ ...t, [campo]: true }));
  };

  const cambiarRegionComuna = (datos) => {
    setValores((v) => ({ ...v, ...datos }));
    setTocados((t) => ({ ...t, region: true, comuna: true }));
  };

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1 className="titulo-seccion mb-3">Checkout</h1>
        <p className="text-secondary">No hay productos en el carrito.</p>
        <Link to="/productos" className="btn btn-primary">
          Ver productos
        </Link>
      </div>
    );
  }

  const pagar = (e) => {
    e.preventDefault();
    setTocados(Object.fromEntries(CAMPOS.map((c) => [c, true])));

    if (Object.values(errores).some((m) => m !== '')) {
      return;
    }

    const datosOrden = {
      cliente: { nombre: valores.nombre.trim(), apellidos: valores.apellidos.trim(), correo: valores.correo.trim() },
      direccion: { calle: valores.direccion.trim(), region: valores.region, comuna: valores.comuna },
      items,
      total,
    };
    const pago = simularPago(valores.tarjeta);

    if (!pago.aprobado) {
      const rechazada = crearOrden({ ...datosOrden, estado: 'Pago rechazado' });
      navegar('/compra-error', { state: { motivo: pago.motivo, orden: rechazada.id } });
      return;
    }

    const orden = crearOrden(datosOrden);
    descontarStock(items);
    vaciar();
    navegar(`/compra-exitosa/${orden.id}`);
  };

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-4">Checkout</h1>

      <div className="row g-5">
        <div className="col-lg-7">
          <form onSubmit={pagar} noValidate>
            <h2 className="fs-5">Datos del comprador</h2>
            <div className="row">
              <div className="col-md-6">
                <FormField id="nombre" etiqueta="Nombre" valor={valores.nombre} onCambio={cambiar('nombre')} onSalir={marcar('nombre')} error={mostrarError('nombre')} maxLength={50} />
              </div>
              <div className="col-md-6">
                <FormField id="apellidos" etiqueta="Apellidos" valor={valores.apellidos} onCambio={cambiar('apellidos')} onSalir={marcar('apellidos')} error={mostrarError('apellidos')} maxLength={100} />
              </div>
            </div>
            <FormField id="correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} onSalir={marcar('correo')} error={mostrarError('correo')} maxLength={100} />

            <h2 className="fs-5 mt-4">Dirección de envío</h2>
            <FormField id="direccion" etiqueta="Dirección" valor={valores.direccion} onCambio={cambiar('direccion')} onSalir={marcar('direccion')} error={mostrarError('direccion')} maxLength={300} placeholder="Calle y número" />
            <SelectorRegionComuna
              region={valores.region}
              comuna={valores.comuna}
              onCambio={cambiarRegionComuna}
              onSalir={marcar('comuna')}
              errorRegion={mostrarError('region')}
              errorComuna={mostrarError('comuna')}
            />

            <h2 className="fs-5 mt-4">Pago</h2>
            <FormField id="tarjeta" etiqueta="Número de tarjeta" valor={valores.tarjeta} onCambio={cambiar('tarjeta')} onSalir={marcar('tarjeta')} error={mostrarError('tarjeta')} maxLength={16} placeholder="16 dígitos" />
            <p className="small text-secondary">Pago de prueba: las tarjetas que parten con 0000 son rechazadas.</p>

            <Boton tipo="submit" etiqueta={`Pagar ${formatearPrecio(total)}`} />
          </form>
        </div>

        <div className="col-lg-5">
          <div className="card card-iron">
            <div className="card-body">
              <h2 className="fs-5">Resumen</h2>
              <ul className="list-unstyled">
                {items.map((i) => (
                  <li key={i.codigo} className="d-flex justify-content-between mb-2">
                    <span>
                      {i.nombre} x{i.cantidad}
                    </span>
                    <span>{formatearPrecio(i.precio * i.cantidad)}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <p className="d-flex justify-content-between fw-bold fs-5 mb-0">
                <span>Total</span>
                <span>{formatearPrecio(total)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
