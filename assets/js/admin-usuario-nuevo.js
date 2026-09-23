// Guarda el usuario nuevo en localStorage cuando el formulario pasa la validacion de usuario-form.js.

document.addEventListener('DOMContentLoaded', function () {

    var formulario = document.getElementById('form-usuario');
    if (!formulario) {
        return;
    }

    // usuario-form.js dispara este evento justo cuando el formulario paso la validacion,
    // asi no hace falta repetir esas reglas aca para saber cuando guardar
    formulario.addEventListener('usuario-guardado', function () {
        var usuarioNuevo = {
            run: document.getElementById('run').value.trim().toUpperCase(),
            tipoUsuario: document.getElementById('tipo-usuario').value,
            nombre: document.getElementById('nombre').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            fechaNacimiento: document.getElementById('fecha-nacimiento').value,
            region: document.getElementById('region').value,
            comuna: document.getElementById('comuna').value,
            direccion: document.getElementById('direccion').value.trim()
        };

        agregarUsuario(usuarioNuevo);

        // Limpia el formulario para dejarlo listo para cargar otro usuario
        formulario.reset();
        document.getElementById('comuna').innerHTML = '<option value="">Primero selecciona una región</option>';
        document.getElementById('comuna').disabled = true;
    });

});
