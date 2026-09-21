// Validacion del formulario de contacto, en tiempo real y al enviar

document.addEventListener('DOMContentLoaded', function () {

    var formulario = document.getElementById('form-contacto');
    if (!formulario) {
        return;
    }

    var campoNombre = document.getElementById('nombre');
    var campoCorreo = document.getElementById('correo');
    var campoComentario = document.getElementById('comentario');
    var contadorComentario = document.getElementById('contador-comentario');
    var mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

    var dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

    // Muestra un mensaje de error debajo del campo correspondiente
    function mostrarError(campo, mensaje) {
        var contenedor = campo.closest('.campo-formulario');
        contenedor.classList.add('campo-error');
        contenedor.querySelector('.mensaje-error').textContent = mensaje;
    }

    // Quita el mensaje de error de un campo cuando vuelve a ser valido
    function quitarError(campo) {
        var contenedor = campo.closest('.campo-formulario');
        contenedor.classList.remove('campo-error');
        contenedor.querySelector('.mensaje-error').textContent = '';
    }

    // Valida el campo nombre: requerido y maximo 100 caracteres
    function validarNombre() {
        var valor = campoNombre.value.trim();

        if (valor === '') {
            mostrarError(campoNombre, 'Ingresa tu nombre completo.');
            return false;
        }
        if (valor.length > 100) {
            mostrarError(campoNombre, 'El nombre no puede superar los 100 caracteres.');
            return false;
        }

        quitarError(campoNombre);
        return true;
    }

    // Valida el campo correo: requerido, maximo 100 caracteres y dominio permitido
    function validarCorreo() {
        var valor = campoCorreo.value.trim();

        if (valor === '') {
            mostrarError(campoCorreo, 'Ingresa tu correo electronico.');
            return false;
        }
        if (valor.length > 100) {
            mostrarError(campoCorreo, 'El correo no puede superar los 100 caracteres.');
            return false;
        }

        var arroba = valor.lastIndexOf('@');
        var dominio = arroba >= 0 ? valor.slice(arroba + 1).toLowerCase() : '';

        if (arroba < 0 || dominiosPermitidos.indexOf(dominio) === -1) {
            mostrarError(campoCorreo, 'Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.');
            return false;
        }

        quitarError(campoCorreo);
        return true;
    }

    // Valida el campo comentario: requerido y maximo 500 caracteres
    function validarComentario() {
        var valor = campoComentario.value.trim();

        if (valor === '') {
            mostrarError(campoComentario, 'Escribe tu comentario antes de enviar.');
            return false;
        }
        if (valor.length > 500) {
            mostrarError(campoComentario, 'El comentario no puede superar los 500 caracteres.');
            return false;
        }

        quitarError(campoComentario);
        return true;
    }

    // Actualiza el contador de caracteres del comentario mientras el usuario escribe
    function actualizarContador() {
        contadorComentario.textContent = campoComentario.value.length;
    }

    // Validacion en tiempo real: se revisa cada campo mientras el usuario escribe
    campoNombre.addEventListener('input', validarNombre);
    campoCorreo.addEventListener('input', validarCorreo);
    campoComentario.addEventListener('input', function () {
        actualizarContador();
        validarComentario();
    });

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var nombreValido = validarNombre();
        var correoValido = validarCorreo();
        var comentarioValido = validarComentario();

        if (nombreValido && correoValido && comentarioValido) {
            mensajeConfirmacion.classList.add('visible');
            formulario.reset();
            actualizarContador();

            // El mensaje de confirmacion se oculta solo despues de unos segundos
            setTimeout(function () {
                mensajeConfirmacion.classList.remove('visible');
            }, 5000);
        } else {
            mensajeConfirmacion.classList.remove('visible');
        }
    });

});
