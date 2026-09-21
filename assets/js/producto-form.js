// Validacion del formulario de productos del admin.
// Lo usan tanto producto-nuevo.html como producto-editar.html, porque tienen los mismos campos.

document.addEventListener('DOMContentLoaded', function () {

    var formulario = document.getElementById('form-producto');
    if (!formulario) {
        return;
    }

    var campoCodigo = document.getElementById('codigo');
    var campoNombre = document.getElementById('nombre');
    var campoDescripcion = document.getElementById('descripcion');
    var contadorDescripcion = document.getElementById('contador-descripcion');
    var campoPrecio = document.getElementById('precio');
    var campoStock = document.getElementById('stock');
    var campoStockCritico = document.getElementById('stock-critico');
    var alertaStockCritico = document.getElementById('alerta-stock-critico');
    var campoCategoria = document.getElementById('categoria');
    var mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

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

    // Valida el codigo: requerido, minimo 3 caracteres, sin maximo
    function validarCodigo() {
        var valor = campoCodigo.value.trim();

        if (valor === '') {
            mostrarError(campoCodigo, 'Ingresa el código del producto.');
            return false;
        }
        if (valor.length < 3) {
            mostrarError(campoCodigo, 'El código debe tener al menos 3 caracteres.');
            return false;
        }

        quitarError(campoCodigo);
        return true;
    }

    // Valida el nombre: requerido, maximo 100 caracteres
    function validarNombre() {
        var valor = campoNombre.value.trim();

        if (valor === '') {
            mostrarError(campoNombre, 'Ingresa el nombre del producto.');
            return false;
        }
        if (valor.length > 100) {
            mostrarError(campoNombre, 'El nombre no puede superar los 100 caracteres.');
            return false;
        }

        quitarError(campoNombre);
        return true;
    }

    // Valida la descripcion: opcional, maximo 500 caracteres
    function validarDescripcion() {
        if (campoDescripcion.value.length > 500) {
            mostrarError(campoDescripcion, 'La descripción no puede superar los 500 caracteres.');
            return false;
        }

        quitarError(campoDescripcion);
        return true;
    }

    function actualizarContadorDescripcion() {
        contadorDescripcion.textContent = campoDescripcion.value.length;
    }

    // Valida el precio: requerido, minimo 0 (un precio de 0 es un producto FREE), acepta decimales
    function validarPrecio() {
        var valor = campoPrecio.value.trim();

        if (valor === '') {
            mostrarError(campoPrecio, 'Ingresa el precio del producto.');
            return false;
        }

        var numero = Number(valor);

        if (isNaN(numero) || numero < 0) {
            mostrarError(campoPrecio, 'El precio no puede ser menor a 0.');
            return false;
        }

        quitarError(campoPrecio);
        return true;
    }

    // Valida el stock: requerido, minimo 0, solo numeros enteros
    function validarStock() {
        var valor = campoStock.value.trim();

        if (valor === '') {
            mostrarError(campoStock, 'Ingresa el stock disponible.');
            revisarStockCritico();
            return false;
        }

        var numero = Number(valor);

        if (isNaN(numero) || numero < 0 || !Number.isInteger(numero)) {
            mostrarError(campoStock, 'El stock debe ser un número entero mayor o igual a 0.');
            revisarStockCritico();
            return false;
        }

        quitarError(campoStock);
        revisarStockCritico();
        return true;
    }

    // Valida el stock critico: opcional, minimo 0, solo numeros enteros
    function validarStockCritico() {
        var valor = campoStockCritico.value.trim();

        if (valor === '') {
            quitarError(campoStockCritico);
            revisarStockCritico();
            return true;
        }

        var numero = Number(valor);

        if (isNaN(numero) || numero < 0 || !Number.isInteger(numero)) {
            mostrarError(campoStockCritico, 'El stock crítico debe ser un número entero mayor o igual a 0.');
            revisarStockCritico();
            return false;
        }

        quitarError(campoStockCritico);
        revisarStockCritico();
        return true;
    }

    // Muestra el aviso cuando el stock ingresado queda en el limite critico o por debajo
    function revisarStockCritico() {
        var stockTexto = campoStock.value.trim();
        var stockCriticoTexto = campoStockCritico.value.trim();

        if (stockTexto === '' || stockCriticoTexto === '') {
            alertaStockCritico.classList.remove('visible');
            return;
        }

        var stock = Number(stockTexto);
        var stockCritico = Number(stockCriticoTexto);

        if (!isNaN(stock) && !isNaN(stockCritico) && stock <= stockCritico) {
            alertaStockCritico.classList.add('visible');
        } else {
            alertaStockCritico.classList.remove('visible');
        }
    }

    // Valida la categoria: requerida
    function validarCategoria() {
        if (campoCategoria.value === '') {
            mostrarError(campoCategoria, 'Selecciona una categoría.');
            return false;
        }

        quitarError(campoCategoria);
        return true;
    }

    // Validacion en tiempo real mientras se llena el formulario
    campoCodigo.addEventListener('input', validarCodigo);
    campoNombre.addEventListener('input', validarNombre);
    campoDescripcion.addEventListener('input', function () {
        actualizarContadorDescripcion();
        validarDescripcion();
    });
    campoPrecio.addEventListener('input', validarPrecio);
    campoStock.addEventListener('input', validarStock);
    campoStockCritico.addEventListener('input', validarStockCritico);
    campoCategoria.addEventListener('change', validarCategoria);

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var codigoValido = validarCodigo();
        var nombreValido = validarNombre();
        var descripcionValida = validarDescripcion();
        var precioValido = validarPrecio();
        var stockValido = validarStock();
        var stockCriticoValido = validarStockCritico();
        var categoriaValida = validarCategoria();

        var todoValido = codigoValido && nombreValido && descripcionValida && precioValido &&
            stockValido && stockCriticoValido && categoriaValida;

        if (todoValido) {
            mensajeConfirmacion.classList.add('visible');

            setTimeout(function () {
                mensajeConfirmacion.classList.remove('visible');
            }, 4000);
        } else {
            mensajeConfirmacion.classList.remove('visible');
        }
    });

});
