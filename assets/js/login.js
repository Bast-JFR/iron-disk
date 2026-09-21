// Validacion del formulario de inicio de sesion, en tiempo real y al enviar

document.addEventListener('DOMContentLoaded', function () {

    var formulario = document.getElementById('form-login');
    if (!formulario) {
        return;
    }

    var campoCorreo = document.getElementById('correo');
    var campoContrasena = document.getElementById('contrasena');
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

    // Valida el correo: requerido, maximo 100 caracteres y dominio permitido (misma regla que en contacto y registro)
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

    // Valida la contraseña: requerida, entre 4 y 10 caracteres
    function validarContrasena() {
        var valor = campoContrasena.value;

        if (valor === '') {
            mostrarError(campoContrasena, 'Ingresa tu contraseña.');
            return false;
        }
        if (valor.length < 4 || valor.length > 10) {
            mostrarError(campoContrasena, 'La contraseña debe tener entre 4 y 10 caracteres.');
            return false;
        }

        quitarError(campoContrasena);
        return true;
    }

    // Validacion en tiempo real mientras el usuario escribe
    campoCorreo.addEventListener('input', validarCorreo);
    campoContrasena.addEventListener('input', validarContrasena);

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var correoValido = validarCorreo();
        var contrasenaValida = validarContrasena();

        if (correoValido && contrasenaValida) {
            mensajeConfirmacion.classList.add('visible');
            formulario.reset();

            // Todavia no hay backend, asi que solo simulamos el ingreso y mandamos al home
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            mensajeConfirmacion.classList.remove('visible');
        }
    });

});
