// Precarga el formulario de edicion con los datos del usuario indicado en la URL (?run=XXX),
// y guarda los cambios en localStorage cuando el formulario pasa la validacion de usuario-form.js.

document.addEventListener('DOMContentLoaded', function () {

    var formulario = document.getElementById('form-usuario');
    var vistaPreviaTexto = document.getElementById('vista-previa-texto');

    if (!formulario) {
        return;
    }

    var parametros = new URLSearchParams(window.location.search);
    var run = parametros.get('run');

    if (!run) {
        vistaPreviaTexto.textContent = 'No se indicó qué usuario editar. Vuelve al listado y elige uno.';
        formulario.style.display = 'none';
        return;
    }

    var usuario = buscarUsuarioPorRun(run);

    if (!usuario) {
        vistaPreviaTexto.textContent = 'No se encontró ningún usuario con el RUN ' + run + '.';
        formulario.style.display = 'none';
        return;
    }

    vistaPreviaTexto.textContent = 'Editando: ' + usuario.nombre + ' ' + usuario.apellidos + ' (' + usuario.run + ')';

    // Precarga cada campo del formulario con los datos del usuario encontrado
    document.getElementById('run').value = usuario.run;
    document.getElementById('tipo-usuario').value = usuario.tipoUsuario;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellidos').value = usuario.apellidos;
    document.getElementById('correo').value = usuario.correo;
    document.getElementById('fecha-nacimiento').value = usuario.fechaNacimiento || '';
    document.getElementById('region').value = usuario.region;

    // Dispara el cambio de region manualmente para que se arme el select de comunas,
    // y recien despues selecciona la comuna que tenia guardada el usuario
    document.getElementById('region').dispatchEvent(new Event('change'));
    document.getElementById('comuna').value = usuario.comuna;

    document.getElementById('direccion').value = usuario.direccion;

    // usuario-form.js dispara este evento justo cuando el formulario paso la validacion,
    // asi no hace falta repetir esas reglas aca para saber cuando guardar
    formulario.addEventListener('usuario-guardado', function () {
        var usuarioActualizado = {
            run: usuario.run,
            tipoUsuario: document.getElementById('tipo-usuario').value,
            nombre: document.getElementById('nombre').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            fechaNacimiento: document.getElementById('fecha-nacimiento').value,
            region: document.getElementById('region').value,
            comuna: document.getElementById('comuna').value,
            direccion: document.getElementById('direccion').value.trim()
        };

        actualizarUsuario(usuario.run, usuarioActualizado);
    });

});
