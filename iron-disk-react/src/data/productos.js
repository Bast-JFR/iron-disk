// "Base de datos" de productos: un arreglo base + CRUD guardado en localStorage.
import { leer, guardar } from './storage';

export const CLAVE_PRODUCTOS = 'iron-disk-react-productos';

// ofertaPorcentaje: descuento aplicado al precio (0 = sin oferta)
export const PRODUCTOS_BASE = [
  { codigo: 'IM-001', nombre: 'The Number of the Beast', artista: 'Iron Maiden', formato: 'Vinilo', precio: 32990, stock: 12, stockCritico: 3, categoria: 'metal', imagen: 'img/maiden-beast.png', ofertaPorcentaje: 15, descripcion: 'Clásico de 1982 con Run to the Hills y Hallowed Be Thy Name.' },
  { codigo: 'IM-002', nombre: 'Powerslave', artista: 'Iron Maiden', formato: 'CD', precio: 16990, stock: 8, stockCritico: 3, categoria: 'metal', imagen: 'img/iron2.png', ofertaPorcentaje: 0, descripcion: 'Álbum de 1984 con Aces High y Rime of the Ancient Mariner.' },
  { codigo: 'MT-001', nombre: 'and justice for all', artista: 'Metallica', formato: 'Vinilo', precio: 35990, stock: 5, stockCritico: 3, categoria: 'metal', imagen: 'img/meta1.png', ofertaPorcentaje: 0, descripcion: 'Thrash metal progresivo de 1988.' },
  { codigo: 'MT-002', nombre: 'ride the lightning', artista: 'Metallica', formato: 'CD', precio: 18990, stock: 10, stockCritico: 3, categoria: 'metal', imagen: 'img/meta2.png', ofertaPorcentaje: 20, descripcion: 'El segundo disco de Metallica, de 1984.' },
  { codigo: 'MG-001', nombre: 'Rust in Peace', artista: 'Megadeth', formato: 'Vinilo', precio: 29990, stock: 6, stockCritico: 2, categoria: 'metal', imagen: 'img/mega1.png', ofertaPorcentaje: 0, descripcion: 'Obra maestra del thrash técnico, 1990.' },
  { codigo: 'MG-002', nombre: 'Peace Sells', artista: 'Megadeth', formato: 'CD', precio: 15990, stock: 2, stockCritico: 3, categoria: 'metal', imagen: 'img/mega2.png', ofertaPorcentaje: 0, descripcion: 'Segundo álbum de Megadeth, 1986.' },
  { codigo: 'AN-001', nombre: 'Among the Living', artista: 'Anthrax', formato: 'Vinilo', precio: 27990, stock: 7, stockCritico: 2, categoria: 'metal', imagen: 'img/ant1.png', ofertaPorcentaje: 0, descripcion: 'Thrash neoyorquino de 1987.' },
  { codigo: 'AN-002', nombre: 'Spreading the Disease', artista: 'Anthrax', formato: 'CD', precio: 14990, stock: 9, stockCritico: 3, categoria: 'metal', imagen: 'img/ant2.png', ofertaPorcentaje: 0, descripcion: 'Primer álbum con Joey Belladonna, 1985.' },
  { codigo: 'SL-001', nombre: 'Reign in Blood', artista: 'Slayer', formato: 'Vinilo', precio: 31990, stock: 4, stockCritico: 3, categoria: 'metal', imagen: 'img/sla1.png', ofertaPorcentaje: 0, descripcion: 'Menos de 30 minutos de thrash extremo, 1986.' },
  { codigo: 'SL-002', nombre: 'Show No Mercy', artista: 'Slayer', formato: 'Cassette', precio: 11990, stock: 1, stockCritico: 2, categoria: 'metal', imagen: 'img/sla2.png', ofertaPorcentaje: 25, descripcion: 'Debut de Slayer en 1983.' },
  { codigo: 'HW-001', nombre: 'Keeper of the Seven Keys I', artista: 'Helloween', formato: 'CD', precio: 15990, stock: 6, stockCritico: 2, categoria: 'metal', imagen: 'img/hello1.png', ofertaPorcentaje: 0, descripcion: 'Power metal que definió el género, 1987.' },
  { codigo: 'HW-002', nombre: 'Keeper of the Seven Keys II', artista: 'Helloween', formato: 'Vinilo', precio: 28990, stock: 5, stockCritico: 2, categoria: 'metal', imagen: 'img/hello2.png', ofertaPorcentaje: 0, descripcion: 'Continuación del clásico, 1988.' },
  { codigo: 'PC-001', nombre: 'Arriba las Manos', artista: 'Pibes Chorros', formato: 'CD', precio: 9990, stock: 11, stockCritico: 3, categoria: 'cumbia', imagen: 'img/pibe1.png', ofertaPorcentaje: 10, descripcion: 'Cumbia villera para bailar.' },
  { codigo: 'PC-002', nombre: 'En vivo...Hasta la muerte', artista: 'Pibes Chorros', formato: 'Cassette', precio: 10990, stock: 3, stockCritico: 3, categoria: 'cumbia', imagen: 'img/pibe2.png', ofertaPorcentaje: 0, descripcion: 'Registro en vivo en formato cassette.' },
  { codigo: 'DG-001', nombre: 'La gota que rebasó el vaso', artista: 'Damas Gratis', formato: 'CD', precio: 10990, stock: 8, stockCritico: 2, categoria: 'cumbia', imagen: 'img/damas1.png', ofertaPorcentaje: 0, descripcion: 'Cumbia villera de Damas Gratis.' },
  { codigo: 'DG-002', nombre: '100% Negro Cumbiero', artista: 'Damas Gratis', formato: 'CD', precio: 11990, stock: 6, stockCritico: 2, categoria: 'cumbia', imagen: 'img/damas2.png', ofertaPorcentaje: 0, descripcion: 'Otro clásico de Damas Gratis.' },
  { codigo: 'GA-001', nombre: 'En vivo alegria pan de azucar', artista: 'Grupo Alegría', formato: 'Cassette', precio: 5990, stock: 4, stockCritico: 2, categoria: 'cumbia', imagen: 'img/alegria1.png', ofertaPorcentaje: 0, descripcion: 'Cumbia tropical en vivo.' },
  { codigo: 'GA-002', nombre: 'El nuevo tropical', artista: 'Grupo Alegría', formato: 'CD', precio: 8990, stock: 9, stockCritico: 3, categoria: 'cumbia', imagen: 'img/alegria2.png', ofertaPorcentaje: 30, descripcion: 'Cumbia tropical de Grupo Alegría.' },
  { codigo: 'TK-001', nombre: 'Grandes Éxitos', artista: "Tropi-ka'l Sound", formato: 'CD', precio: 9990, stock: 7, stockCritico: 2, categoria: 'cumbia', imagen: 'img/tropikal1.png', ofertaPorcentaje: 0, descripcion: 'Recopilación de grandes éxitos.' },
  { codigo: 'TK-002', nombre: "Tropi-ka'l Sound", artista: "Tropi-ka'l Sound", formato: 'Cassette', precio: 7990, stock: 2, stockCritico: 3, categoria: 'cumbia', imagen: 'img/tropikal2.png', ofertaPorcentaje: 0, descripcion: 'Disco homónimo en cassette.' },
  { codigo: 'AZ-001', nombre: 'Cumbia Nena', artista: 'Amar Azul', formato: 'CD', precio: 12990, stock: 10, stockCritico: 2, categoria: 'cumbia', imagen: 'img/amar1.png', ofertaPorcentaje: 15, descripcion: 'Cumbia romántica de Amar Azul.' },
  { codigo: 'AZ-002', nombre: 'Dime Azul', artista: 'Amar Azul', formato: 'CD', precio: 11990, stock: 5, stockCritico: 2, categoria: 'cumbia', imagen: 'img/amar2.png', ofertaPorcentaje: 0, descripcion: 'Otro éxito de Amar Azul.' },
];

export function obtenerProductos() {
  return leer(CLAVE_PRODUCTOS, PRODUCTOS_BASE);
}

export function buscarProductoPorCodigo(codigo) {
  return obtenerProductos().find((p) => p.codigo === codigo);
}

export function agregarProducto(producto) {
  guardar(CLAVE_PRODUCTOS, [...obtenerProductos(), producto]);
}

export function actualizarProducto(codigo, datosNuevos) {
  guardar(
    CLAVE_PRODUCTOS,
    obtenerProductos().map((p) => (p.codigo === codigo ? datosNuevos : p))
  );
}

export function eliminarProducto(codigo) {
  guardar(
    CLAVE_PRODUCTOS,
    obtenerProductos().filter((p) => p.codigo !== codigo)
  );
}

// Precio final de un producto aplicando su porcentaje de oferta
export function precioFinal(producto) {
  const descuento = producto.ofertaPorcentaje || 0;
  return Math.round(producto.precio * (1 - descuento / 100));
}

export function productosEnOferta() {
  return obtenerProductos().filter((p) => p.ofertaPorcentaje > 0);
}

// Productos cuyo stock es igual o inferior a su stock critico
export function productosCriticos() {
  return obtenerProductos().filter(
    (p) => p.stockCritico !== null && p.stockCritico !== undefined && p.stock <= p.stockCritico
  );
}
