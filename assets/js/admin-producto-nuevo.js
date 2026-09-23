// Guarda el producto nuevo en localStorage cuando el formulario pasa la validacion de producto-form.js.

document.addEventListener('DOMContentLoaded', function () {

    var formulario = document.getElementById('form-producto');
    if (!formulario) {
        return;
    }

    // Imagen generica para productos creados desde el admin, ya que el campo de tipo
    // archivo no permite guardar el archivo real sin un servidor detras
    var IMAGEN_POR_DEFECTO = '../assets/img/maiden-beast.png';

    // producto-form.js dispara este evento justo cuando el formulario paso la validacion,
    // asi no hace falta repetir esas reglas aca para saber cuando guardar
    formulario.addEventListener('producto-guardado', function () {
        var productoNuevo = {
            codigo: document.getElementById('codigo').value.trim(),
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
            imagen: IMAGEN_POR_DEFECTO
        };

        agregarProducto(productoNuevo);

        // Limpia el formulario para dejarlo listo para cargar otro producto
        formulario.reset();
        document.getElementById('contador-descripcion').textContent = '0';
    });

});
