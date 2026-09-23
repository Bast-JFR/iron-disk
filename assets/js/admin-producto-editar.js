// Precarga el formulario de edicion con los datos del producto indicado en la URL (?codigo=XXX),
// y guarda los cambios en localStorage cuando el formulario pasa la validacion de producto-form.js.

document.addEventListener('DOMContentLoaded', function () {

    var formulario = document.getElementById('form-producto');
    var vistaPrevia = document.getElementById('vista-previa-producto');
    var vistaPreviaImagen = document.getElementById('vista-previa-imagen');
    var vistaPreviaTexto = document.getElementById('vista-previa-texto');

    if (!formulario) {
        return;
    }

    var parametros = new URLSearchParams(window.location.search);
    var codigo = parametros.get('codigo');

    if (!codigo) {
        vistaPreviaTexto.textContent = 'No se indicó qué producto editar. Vuelve al listado y elige uno.';
        vistaPreviaImagen.style.display = 'none';
        formulario.style.display = 'none';
        return;
    }

    var producto = buscarProductoPorCodigo(codigo);

    if (!producto) {
        vistaPreviaTexto.textContent = 'No se encontró ningún producto con el código ' + codigo + '.';
        vistaPreviaImagen.style.display = 'none';
        formulario.style.display = 'none';
        return;
    }

    // Muestra la imagen actual del producto, ya que el campo de tipo archivo
    // nunca puede precargarse con un valor por seguridad del navegador
    vistaPreviaImagen.src = producto.imagen;
    vistaPreviaTexto.textContent = 'Editando: ' + producto.nombre + ' (' + producto.codigo + ')';

    // Precarga cada campo del formulario con los datos del producto encontrado
    document.getElementById('codigo').value = producto.codigo;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion || '';
    document.getElementById('contador-descripcion').textContent = (producto.descripcion || '').length;
    document.getElementById('artista').value = producto.artista;
    document.getElementById('formato').value = producto.formato;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;
    document.getElementById('stock-critico').value = producto.stockCritico != null ? producto.stockCritico : '';
    document.getElementById('categoria').value = producto.categoria;

    // producto-form.js dispara este evento justo cuando el formulario paso la validacion,
    // asi no hace falta repetir esas reglas aca para saber cuando guardar
    formulario.addEventListener('producto-guardado', function () {
        var productoActualizado = {
            codigo: producto.codigo,
            nombre: document.getElementById('nombre').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim(),
            artista: document.getElementById('artista').value.trim(),
            formato: document.getElementById('formato').value,
            precio: Number(document.getElementById('precio').value),
            stock: Number(document.getElementById('stock').value),
            stockCritico: document.getElementById('stock-critico').value === ''
                ? null
                : Number(document.getElementById('stock-critico').value),
            categoria: document.getElementById('categoria').value,
            imagen: producto.imagen
        };

        actualizarProducto(producto.codigo, productoActualizado);
    });

});
