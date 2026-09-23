// Manejo de los productos del panel de administrador, guardados en localStorage.
// El listado publico de la tienda sigue siendo el catalogo escrito en productos.html;
// este arreglo es la base de datos que usa el administrador para gestionar el inventario.

var CLAVE_PRODUCTOS = 'iron-disk-productos';

// Arreglo base con el mismo catalogo que ya existe en la tienda publica.
// Se usa solo la primera vez, para inicializar localStorage si todavia no tiene datos.
var PRODUCTOS_BASE = [
    { codigo: 'IM-001', nombre: 'The Number of the Beast', artista: 'Iron Maiden', formato: 'Vinilo', precio: 32990, stock: 12, stockCritico: 3, categoria: 'metal', imagen: '../assets/img/maiden-beast.png' },
    { codigo: 'IM-002', nombre: 'Powerslave', artista: 'Iron Maiden', formato: 'CD', precio: 16990, stock: 8, stockCritico: 3, categoria: 'metal', imagen: '../assets/img/iron2.png' },
    { codigo: 'MT-001', nombre: 'and justice for all', artista: 'Metallica', formato: 'Vinilo', precio: 35990, stock: 5, stockCritico: 3, categoria: 'metal', imagen: '../assets/img/meta1.png' },
    { codigo: 'MT-002', nombre: 'ride the lightning', artista: 'Metallica', formato: 'CD', precio: 18990, stock: 10, stockCritico: 3, categoria: 'metal', imagen: '../assets/img/meta2.png' },
    { codigo: 'MG-001', nombre: 'Rust in Peace', artista: 'Megadeth', formato: 'Vinilo', precio: 29990, stock: 6, stockCritico: 2, categoria: 'metal', imagen: '../assets/img/mega1.png' },
    { codigo: 'MG-002', nombre: 'Peace Sells', artista: 'Megadeth', formato: 'CD', precio: 15990, stock: 2, stockCritico: 3, categoria: 'metal', imagen: '../assets/img/mega2.png' },
    { codigo: 'AN-001', nombre: 'Among the Living', artista: 'Anthrax', formato: 'Vinilo', precio: 27990, stock: 7, stockCritico: 2, categoria: 'metal', imagen: '../assets/img/ant1.png' },
    { codigo: 'AN-002', nombre: 'Spreading the Disease', artista: 'Anthrax', formato: 'CD', precio: 14990, stock: 9, stockCritico: 3, categoria: 'metal', imagen: '../assets/img/ant2.png' },
    { codigo: 'SL-001', nombre: 'Reign in Blood', artista: 'Slayer', formato: 'Vinilo', precio: 31990, stock: 4, stockCritico: 3, categoria: 'metal', imagen: '../assets/img/sla1.png' },
    { codigo: 'SL-002', nombre: 'Show No Mercy', artista: 'Slayer', formato: 'Cassette', precio: 11990, stock: 1, stockCritico: 2, categoria: 'metal', imagen: '../assets/img/sla2.png' },
    { codigo: 'HW-001', nombre: 'Keeper of the Seven Keys I', artista: 'Helloween', formato: 'CD', precio: 15990, stock: 6, stockCritico: 2, categoria: 'metal', imagen: '../assets/img/hello1.png' },
    { codigo: 'HW-002', nombre: 'Keeper of the Seven Keys II', artista: 'Helloween', formato: 'Vinilo', precio: 28990, stock: 5, stockCritico: 2, categoria: 'metal', imagen: '../assets/img/hello2.png' },
    { codigo: 'PC-001', nombre: 'Arriba las Manos', artista: 'Pibes Chorros', formato: 'CD', precio: 9990, stock: 11, stockCritico: 3, categoria: 'cumbia', imagen: '../assets/img/pibe1.png' },
    { codigo: 'PC-002', nombre: 'En vivo...Hasta la muerte', artista: 'Pibes Chorros', formato: 'Cassette', precio: 10990, stock: 3, stockCritico: 3, categoria: 'cumbia', imagen: '../assets/img/pibe2.png' },
    { codigo: 'DG-001', nombre: 'La gota que rebasó el vaso', artista: 'Damas Gratis', formato: 'CD', precio: 10990, stock: 8, stockCritico: 2, categoria: 'cumbia', imagen: '../assets/img/damas1.png' },
    { codigo: 'DG-002', nombre: '100% Negro Cumbiero', artista: 'Damas Gratis', formato: 'CD', precio: 11990, stock: 6, stockCritico: 2, categoria: 'cumbia', imagen: '../assets/img/damas2.png' },
    { codigo: 'GA-001', nombre: 'En vivo alegria pan de azucar', artista: 'Grupo Alegría', formato: 'Cassette', precio: 5990, stock: 4, stockCritico: 2, categoria: 'cumbia', imagen: '../assets/img/alegria1.png' },
    { codigo: 'GA-002', nombre: 'El nuevo tropical', artista: 'Grupo Alegría', formato: 'CD', precio: 8990, stock: 9, stockCritico: 3, categoria: 'cumbia', imagen: '../assets/img/alegria2.png' },
    { codigo: 'TK-001', nombre: 'Grandes Éxitos', artista: "Tropi-ka'l Sound", formato: 'CD', precio: 9990, stock: 7, stockCritico: 2, categoria: 'cumbia', imagen: '../assets/img/tropikal1.png' },
    { codigo: 'TK-002', nombre: "Tropi-ka'l Sound", artista: "Tropi-ka'l Sound", formato: 'Cassette', precio: 7990, stock: 2, stockCritico: 3, categoria: 'cumbia', imagen: '../assets/img/tropikal2.png' },
    { codigo: 'AZ-001', nombre: 'Cumbia Nena', artista: 'Amar Azul', formato: 'CD', precio: 12990, stock: 10, stockCritico: 2, categoria: 'cumbia', imagen: '../assets/img/amar1.png' },
    { codigo: 'AZ-002', nombre: 'Dime Azul', artista: 'Amar Azul', formato: 'CD', precio: 11990, stock: 5, stockCritico: 2, categoria: 'cumbia', imagen: '../assets/img/amar2.png' }
];

// Devuelve el arreglo de productos guardado en localStorage.
// Si todavia no existe, lo inicializa con el catalogo base.
function obtenerProductos() {
    var datosGuardados = localStorage.getItem(CLAVE_PRODUCTOS);

    if (!datosGuardados) {
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(PRODUCTOS_BASE));
        return PRODUCTOS_BASE.slice();
    }

    return JSON.parse(datosGuardados);
}

// Reemplaza todo el arreglo de productos guardado en localStorage
function guardarProductos(productos) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
}

// Busca un producto por su codigo. Devuelve undefined si no existe.
function buscarProductoPorCodigo(codigo) {
    var productos = obtenerProductos();
    return productos.filter(function (producto) {
        return producto.codigo === codigo;
    })[0];
}

// Agrega un producto nuevo al arreglo guardado
function agregarProducto(producto) {
    var productos = obtenerProductos();
    productos.push(producto);
    guardarProductos(productos);
}

// Actualiza un producto existente, buscandolo por codigo
function actualizarProducto(codigo, datosNuevos) {
    var productos = obtenerProductos();

    var productosActualizados = productos.map(function (producto) {
        if (producto.codigo === codigo) {
            return datosNuevos;
        }
        return producto;
    });

    guardarProductos(productosActualizados);
}

// Elimina un producto del arreglo guardado, buscandolo por codigo
function eliminarProducto(codigo) {
    var productos = obtenerProductos();

    var productosRestantes = productos.filter(function (producto) {
        return producto.codigo !== codigo;
    });

    guardarProductos(productosRestantes);
}
