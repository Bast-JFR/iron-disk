// Manejo de los usuarios del panel de administrador, guardados en localStorage.
// Mismo patron que assets/js/productos-admin.js

var CLAVE_USUARIOS = 'iron-disk-usuarios';

// Usuarios base, para inicializar localStorage la primera vez
var USUARIOS_BASE = [
    { run: '190110226', nombre: 'Bastián', apellidos: 'Jofré', correo: 'ba.jofre@duocuc.cl', fechaNacimiento: '', tipoUsuario: 'Administrador', region: 'Metropolitana de Santiago', comuna: 'Providencia', direccion: 'Av. Providencia 2124, local 15' },
    { run: '181245879', nombre: 'Renato', apellidos: 'Colipe Lienan', correo: 're.colipe@duocuc.cl', fechaNacimiento: '', tipoUsuario: 'Administrador', region: 'Metropolitana de Santiago', comuna: 'Santiago', direccion: 'Alameda 1234' }
];

// Devuelve el arreglo de usuarios guardado en localStorage.
// Si todavia no existe, lo inicializa con los usuarios base.
function obtenerUsuarios() {
    var datosGuardados = localStorage.getItem(CLAVE_USUARIOS);

    if (!datosGuardados) {
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(USUARIOS_BASE));
        return USUARIOS_BASE.slice();
    }

    return JSON.parse(datosGuardados);
}

// Reemplaza todo el arreglo de usuarios guardado en localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

// Busca un usuario por su RUN. Devuelve undefined si no existe.
function buscarUsuarioPorRun(run) {
    var usuarios = obtenerUsuarios();
    return usuarios.filter(function (usuario) {
        return usuario.run === run;
    })[0];
}

// Agrega un usuario nuevo al arreglo guardado
function agregarUsuario(usuario) {
    var usuarios = obtenerUsuarios();
    usuarios.push(usuario);
    guardarUsuarios(usuarios);
}

// Actualiza un usuario existente, buscandolo por RUN
function actualizarUsuario(run, datosNuevos) {
    var usuarios = obtenerUsuarios();

    var usuariosActualizados = usuarios.map(function (usuario) {
        if (usuario.run === run) {
            return datosNuevos;
        }
        return usuario;
    });

    guardarUsuarios(usuariosActualizados);
}

// Elimina un usuario del arreglo guardado, buscandolo por RUN
function eliminarUsuario(run) {
    var usuarios = obtenerUsuarios();

    var usuariosRestantes = usuarios.filter(function (usuario) {
        return usuario.run !== run;
    });

    guardarUsuarios(usuariosRestantes);
}
