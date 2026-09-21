// Pinta la tabla de productos del panel de administrador y maneja los botones de editar y eliminar.
// Usa las funciones de productos-admin.js para leer y modificar los datos en localStorage.

document.addEventListener('DOMContentLoaded', function () {

    var cuerpoTabla = document.getElementById('cuerpo-tabla-productos');
    if (!cuerpoTabla) {
        return;
    }

    function formatearPrecio(precio) {
        return '$' + precio.toLocaleString('es-CL');
    }

    // Dibuja todas las filas de la tabla a partir de los productos guardados
    function pintarTabla() {
        var productos = obtenerProductos();
        cuerpoTabla.innerHTML = '';

        if (productos.length === 0) {
            cuerpoTabla.innerHTML = '<tr><td colspan="8" class="tabla-vacia">No hay productos registrados todavía.</td></tr>';
            return;
        }

        productos.forEach(function (producto) {
            var fila = document.createElement('tr');

            var enStockCritico = producto.stockCritico !== null && producto.stockCritico !== undefined &&
                producto.stock <= producto.stockCritico;

            var celdaStock = enStockCritico
                ? '<span class="badge-stock-critico">' + producto.stock + ' ⚠️</span>'
                : producto.stock;

            fila.innerHTML =
                '<td><img class="miniatura-tabla" src="' + producto.imagen + '" alt="' + producto.nombre + '"></td>' +
                '<td>' + producto.codigo + '</td>' +
                '<td>' + producto.nombre + '</td>' +
                '<td>' + producto.artista + '</td>' +
                '<td>' + formatearPrecio(producto.precio) + '</td>' +
                '<td>' + celdaStock + '</td>' +
                '<td>' + (producto.categoria === 'metal' ? 'Metal' : 'Cumbia') + '</td>' +
                '<td class="celda-acciones">' +
                    '<a href="producto-editar.html?codigo=' + encodeURIComponent(producto.codigo) + '" class="btn-tabla btn-editar-tabla">Editar</a>' +
                    '<button type="button" class="btn-tabla btn-eliminar-tabla" data-codigo="' + producto.codigo + '">Eliminar</button>' +
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

        var codigo = boton.getAttribute('data-codigo');
        var confirmado = confirm('¿Seguro que quieres eliminar el producto ' + codigo + '? Esta acción no se puede deshacer.');

        if (confirmado) {
            eliminarProducto(codigo);
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
