// Pinta la tabla de usuarios del panel de administrador y maneja los botones de editar y eliminar.
// Usa las funciones de usuarios-admin.js para leer y modificar los datos en localStorage.

document.addEventListener('DOMContentLoaded', function () {

    var cuerpoTabla = document.getElementById('cuerpo-tabla-usuarios');
    if (!cuerpoTabla) {
        return;
    }

    // Dibuja todas las filas de la tabla a partir de los usuarios guardados
    function pintarTabla() {
        var usuarios = obtenerUsuarios();
        cuerpoTabla.innerHTML = '';

        if (usuarios.length === 0) {
            cuerpoTabla.innerHTML = '<tr><td colspan="7" class="tabla-vacia">No hay usuarios registrados todavía.</td></tr>';
            return;
        }

        usuarios.forEach(function (usuario) {
            var fila = document.createElement('tr');

            fila.innerHTML =
                '<td>' + usuario.run + '</td>' +
                '<td>' + usuario.nombre + '</td>' +
                '<td>' + usuario.apellidos + '</td>' +
                '<td>' + usuario.correo + '</td>' +
                '<td>' + usuario.tipoUsuario + '</td>' +
                '<td>' + usuario.region + '</td>' +
                '<td class="celda-acciones">' +
                    '<a href="usuario-editar.html?run=' + encodeURIComponent(usuario.run) + '" class="btn-tabla btn-editar-tabla">Editar</a>' +
                    '<button type="button" class="btn-tabla btn-eliminar-tabla" data-run="' + usuario.run + '">Eliminar</button>' +
                '</td>';

            cuerpoTabla.appendChild(fila);
        });
    }

    // Delegacion de eventos: escucha los clicks de eliminar en toda la tabla
    cuerpoTabla.addEventListener('click', function (evento) {
        var boton = evento.target.closest('.btn-eliminar-tabla');
        if (!boton) {
            return;
        }

        var run = boton.getAttribute('data-run');
        var confirmado = confirm('¿Seguro que quieres eliminar al usuario con RUN ' + run + '? Esta acción no se puede deshacer.');

        if (confirmado) {
            eliminarUsuario(run);
            pintarTabla();
        }
    });

    pintarTabla();

    // Cuando se vuelve a esta pagina con el boton Atras del navegador, algunos navegadores
    // restauran la pagina desde una cache sin volver a ejecutar el codigo de arriba.
    // Este evento se dispara igual en ese caso, asi la tabla siempre queda actualizada.
    window.addEventListener('pageshow', function (evento) {
        if (evento.persisted) {
            pintarTabla();
        }
    });

});
