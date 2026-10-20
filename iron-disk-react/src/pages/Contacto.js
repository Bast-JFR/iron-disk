import { useState } from 'react';
import FormField from '../components/FormField';
import Boton from '../components/Boton';
import { validarNombre, validarCorreo, validarComentario } from '../utils/validaciones';

const VALIDADORES = {
  nombre: validarNombre,
  correo: validarCorreo,
  comentario: validarComentario,
};

const VACIO = { nombre: '', correo: '', comentario: '' };

// Formulario de contacto, valida mientras se escribe y al enviar
function Contacto() {
  const [valores, setValores] = useState(VACIO);
  const [tocados, setTocados] = useState({});
  const [enviado, setEnviado] = useState(false);

  const errores = {
    nombre: VALIDADORES.nombre(valores.nombre),
    correo: VALIDADORES.correo(valores.correo),
    comentario: VALIDADORES.comentario(valores.comentario),
  };

  const cambiar = (campo) => (valor) => {
    setValores({ ...valores, [campo]: valor });
    setTocados({ ...tocados, [campo]: true });
    setEnviado(false);
  };

  const mostrarError = (campo) => (tocados[campo] ? errores[campo] : '');

  const enviar = (e) => {
    e.preventDefault();
    setTocados({ nombre: true, correo: true, comentario: true });

    if (Object.values(errores).some((m) => m !== '')) {
      return;
    }
    setEnviado(true);
    setValores(VACIO);
    setTocados({});
  };

  return (
    <div className="container py-5">
      <h1 className="titulo-seccion mb-2">Contáctanos</h1>
      <p className="text-secondary mb-4">¿Tienes una consulta, sugerencia o quieres saber más sobre nuestro catálogo? Escríbenos y te responderemos a la brevedad.</p>

      <div className="row g-5">
        <div className="col-lg-6">
          <h2 className="fs-4">Envíanos un mensaje</h2>
          {enviado && (
            <div className="alert alert-success" role="status">
              ¡Gracias por escribirnos! Tu mensaje fue enviado correctamente.
            </div>
          )}
          <form onSubmit={enviar} noValidate>
            <FormField id="nombre" etiqueta="Nombre completo" valor={valores.nombre} onCambio={cambiar('nombre')} error={mostrarError('nombre')} maxLength={100} placeholder="Ej: Juan Pérez" />
            <FormField id="correo" etiqueta="Correo electrónico" tipo="email" valor={valores.correo} onCambio={cambiar('correo')} error={mostrarError('correo')} maxLength={100} placeholder="Ej: juan.perez@gmail.com" />
            <FormField id="comentario" etiqueta="Comentario" tipo="textarea" valor={valores.comentario} onCambio={cambiar('comentario')} error={mostrarError('comentario')} maxLength={500} placeholder="Escribe tu mensaje aquí" />
            <p className="small text-secondary">{valores.comentario.length}/500</p>
            <Boton tipo="submit" etiqueta="Enviar mensaje" />
          </form>
        </div>

        <div className="col-lg-6">
          <h2 className="fs-4">Información de contacto</h2>
          <ul className="list-unstyled">
            <li className="mb-2">
              <strong>Dirección:</strong> Av. Providencia 2124, local 15, Providencia, Santiago (a pasos del Metro Los Leones)
            </li>
            <li className="mb-2">
              <strong>Correo:</strong> ba.jofre@duocuc.cl / re.colipe@duocuc.cl
            </li>
            <li className="mb-2">
              <strong>Horario:</strong> Lunes a sábado, de 10:00 a 20:00 hrs
            </li>
          </ul>
          <div className="ratio ratio-4x3">
            <iframe src="https://www.google.com/maps?q=Metro+Los+Leones,+Providencia,+Santiago&output=embed" loading="lazy" title="Ubicación de Iron Disk cerca de Metro Los Leones"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
