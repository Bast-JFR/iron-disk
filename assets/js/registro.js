// Validacion del formulario de registro de usuario, en tiempo real y al enviar
// Incluye el calculo del digito verificador del RUN chileno y los selectores dinamicos de Region/Comuna

document.addEventListener('DOMContentLoaded', function () {

    var formulario = document.getElementById('form-registro');
    if (!formulario) {
        return;
    }

    var campoRun = document.getElementById('run');
    var campoNombre = document.getElementById('nombre');
    var campoApellidos = document.getElementById('apellidos');
    var campoCorreo = document.getElementById('correo');
    var campoContrasena = document.getElementById('contrasena');
    var campoRegion = document.getElementById('region');
    var campoComuna = document.getElementById('comuna');
    var campoDireccion = document.getElementById('direccion');
    var mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

    var dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

    // Regiones de Chile con algunas de sus comunas, para armar los selectores dinamicos.
    // No es el listado completo de las 346 comunas, pero cubre las principales de cada region.
    var regionesComunas = [
        { region: 'Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
        { region: 'Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica'] },
        { region: 'Antofagasta', comunas: ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones'] },
        { region: 'Atacama', comunas: ['Copiapó', 'Vallenar', 'Caldera', 'Chañaral'] },
        { region: 'Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel'] },
        { region: 'Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'San Antonio', 'Los Andes'] },
        { region: 'Metropolitana de Santiago', comunas: ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'Maipú', 'La Florida', 'Puente Alto'] },
        { region: 'Libertador General Bernardo O\'Higgins', comunas: ['Rancagua', 'San Fernando', 'Rengo', 'Santa Cruz'] },
        { region: 'Maule', comunas: ['Talca', 'Curicó', 'Linares', 'Constitución'] },
        { region: 'Ñuble', comunas: ['Chillán', 'Chillán Viejo', 'San Carlos', 'Bulnes'] },
        { region: 'Biobío', comunas: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chiguayante'] },
        { region: 'La Araucanía', comunas: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Angol'] },
        { region: 'Los Ríos', comunas: ['Valdivia', 'La Unión', 'Panguipulli', 'Río Bueno'] },
        { region: 'Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro', 'Puerto Varas'] },
        { region: 'Aysén del General Carlos Ibáñez del Campo', comunas: ['Coyhaique', 'Aysén', 'Chile Chico'] },
        { region: 'Magallanes y de la Antártica Chilena', comunas: ['Punta Arenas', 'Puerto Natales', 'Porvenir'] }
    ];

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

    // Llena el select de regiones apenas carga la pagina
    regionesComunas.forEach(function (item) {
        var opcion = document.createElement('option');
        opcion.value = item.region;
        opcion.textContent = item.region;
        campoRegion.appendChild(opcion);
    });

    // Cada vez que cambia la region, se vuelve a armar el select de comunas con las que le correspondan
    campoRegion.addEventListener('change', function () {
        var regionElegida = regionesComunas.find(function (item) {
            return item.region === campoRegion.value;
        });

        campoComuna.innerHTML = '';

        if (!regionElegida) {
            campoComuna.disabled = true;
            var opcionVacia = document.createElement('option');
            opcionVacia.value = '';
            opcionVacia.textContent = 'Primero selecciona una región';
            campoComuna.appendChild(opcionVacia);
            return;
        }

        campoComuna.disabled = false;

        var opcionInicial = document.createElement('option');
        opcionInicial.value = '';
        opcionInicial.textContent = 'Selecciona una comuna';
        campoComuna.appendChild(opcionInicial);

        regionElegida.comunas.forEach(function (nombreComuna) {
            var opcion = document.createElement('option');
            opcion.value = nombreComuna;
            opcion.textContent = nombreComuna;
            campoComuna.appendChild(opcion);
        });

        validarRegion();
    });

    campoComuna.addEventListener('change', validarComuna);

    // Calcula el digito verificador del RUN con el algoritmo del modulo 11
    function calcularDigitoVerificador(cuerpo) {
        var suma = 0;
        var multiplo = 2;

        for (var i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }

        var resto = 11 - (suma % 11);

        if (resto === 11) return '0';
        if (resto === 10) return 'K';
        return String(resto);
    }

    // Valida el RUN: requerido, sin puntos ni guion, entre 7 y 9 caracteres y con el digito verificador correcto
    function validarRun() {
        var valor = campoRun.value.trim().toUpperCase();

        if (valor === '') {
            mostrarError(campoRun, 'Ingresa tu RUN.');
            return false;
        }
        if (valor.indexOf('.') !== -1 || valor.indexOf('-') !== -1) {
            mostrarError(campoRun, 'El RUN va sin puntos ni guion. Ej: 19011022K');
            return false;
        }
        if (valor.length < 7 || valor.length > 9) {
            mostrarError(campoRun, 'El RUN debe tener entre 7 y 9 caracteres.');
            return false;
        }

        var cuerpo = valor.slice(0, -1);
        var dv = valor.slice(-1);

        if (!/^\d+$/.test(cuerpo) || !/^[0-9K]$/.test(dv)) {
            mostrarError(campoRun, 'El RUN solo puede tener numeros y, al final, un digito o K.');
            return false;
        }
        if (calcularDigitoVerificador(cuerpo) !== dv) {
            mostrarError(campoRun, 'El digito verificador no es valido para ese RUN.');
            return false;
        }

        quitarError(campoRun);
        return true;
    }

    // Valida el nombre: requerido y maximo 50 caracteres
    function validarNombre() {
        var valor = campoNombre.value.trim();

        if (valor === '') {
            mostrarError(campoNombre, 'Ingresa tu nombre.');
            return false;
        }
        if (valor.length > 50) {
            mostrarError(campoNombre, 'El nombre no puede superar los 50 caracteres.');
            return false;
        }

        quitarError(campoNombre);
        return true;
    }

    // Valida los apellidos: requerido y maximo 100 caracteres
    function validarApellidos() {
        var valor = campoApellidos.value.trim();

        if (valor === '') {
            mostrarError(campoApellidos, 'Ingresa tus apellidos.');
            return false;
        }
        if (valor.length > 100) {
            mostrarError(campoApellidos, 'Los apellidos no pueden superar los 100 caracteres.');
            return false;
        }

        quitarError(campoApellidos);
        return true;
    }

    // Valida el correo: requerido, maximo 100 caracteres y dominio permitido (misma regla de todo el sitio)
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

    // Valida la contraseña: requerida, entre 4 y 10 caracteres (misma regla que el login)
    function validarContrasena() {
        var valor = campoContrasena.value;

        if (valor === '') {
            mostrarError(campoContrasena, 'Crea una contraseña.');
            return false;
        }
        if (valor.length < 4 || valor.length > 10) {
            mostrarError(campoContrasena, 'La contraseña debe tener entre 4 y 10 caracteres.');
            return false;
        }

        quitarError(campoContrasena);
        return true;
    }

    // Valida la region: requerida
    function validarRegion() {
        if (campoRegion.value === '') {
            mostrarError(campoRegion, 'Selecciona tu región.');
            return false;
        }

        quitarError(campoRegion);
        return true;
    }

    // Valida la comuna: requerida, una vez que ya se eligio la region
    function validarComuna() {
        if (campoComuna.value === '') {
            mostrarError(campoComuna, 'Selecciona tu comuna.');
            return false;
        }

        quitarError(campoComuna);
        return true;
    }

    // Valida la direccion: requerida y maximo 300 caracteres
    function validarDireccion() {
        var valor = campoDireccion.value.trim();

        if (valor === '') {
            mostrarError(campoDireccion, 'Ingresa tu dirección.');
            return false;
        }
        if (valor.length > 300) {
            mostrarError(campoDireccion, 'La dirección no puede superar los 300 caracteres.');
            return false;
        }

        quitarError(campoDireccion);
        return true;
    }

    // Validacion en tiempo real mientras el usuario va llenando el formulario
    campoRun.addEventListener('input', validarRun);
    campoNombre.addEventListener('input', validarNombre);
    campoApellidos.addEventListener('input', validarApellidos);
    campoCorreo.addEventListener('input', validarCorreo);
    campoContrasena.addEventListener('input', validarContrasena);
    campoDireccion.addEventListener('input', validarDireccion);

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        var runValido = validarRun();
        var nombreValido = validarNombre();
        var apellidosValidos = validarApellidos();
        var correoValido = validarCorreo();
        var contrasenaValida = validarContrasena();
        var regionValida = validarRegion();
        var comunaValida = validarComuna();
        var direccionValida = validarDireccion();

        var todoValido = runValido && nombreValido && apellidosValidos && correoValido &&
            contrasenaValida && regionValida && comunaValida && direccionValida;

        if (todoValido) {
            mensajeConfirmacion.classList.add('visible');
            formulario.reset();

            campoComuna.innerHTML = '<option value="">Primero selecciona una región</option>';
            campoComuna.disabled = true;

            // Todavia no hay backend, asi que solo simulamos el registro y mandamos al login
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 1800);
        } else {
            mensajeConfirmacion.classList.remove('visible');
        }
    });

});
