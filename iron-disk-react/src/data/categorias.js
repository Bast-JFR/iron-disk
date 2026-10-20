// Categorias del catalogo guardadas en localStorage
import { leer, guardar } from './storage';

export const CLAVE_CATEGORIAS = 'iron-disk-react-categorias';

export const CATEGORIAS_BASE = [
  { id: 'metal', nombre: 'Metal', descripcion: 'Del heavy clásico al thrash y el power metal.', imagen: 'img/fondo-concierto1.jpg' },
  { id: 'cumbia', nombre: 'Cumbia', descripcion: 'Cumbia villera, tropical y romántica.', imagen: 'img/cumbia-villera.webp' },
];

export function obtenerCategorias() {
  return leer(CLAVE_CATEGORIAS, CATEGORIAS_BASE);
}

export function agregarCategoria(categoria) {
  guardar(CLAVE_CATEGORIAS, [...obtenerCategorias(), categoria]);
}

export function eliminarCategoria(id) {
  guardar(
    CLAVE_CATEGORIAS,
    obtenerCategorias().filter((c) => c.id !== id)
  );
}
