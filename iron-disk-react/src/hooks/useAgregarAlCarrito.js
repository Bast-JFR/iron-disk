import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { precioFinal } from '../utils/precios';

// Agrega un producto al carrito y deja un aviso corto para mostrarle al usuario
function useAgregarAlCarrito() {
  const { agregar } = useCarrito();
  const [aviso, setAviso] = useState('');

  const agregarProducto = (producto, cantidad = 1) => {
    agregar(
      {
        id: producto.id,
        codigo: producto.codigo,
        nombre: producto.nombre,
        artista: producto.artista,
        imagen: producto.imagen,
        precio: precioFinal(producto),
        stock: producto.stock,
      },
      cantidad
    );
    setAviso(`Agregaste ${producto.nombre} al carrito`);
    setTimeout(() => setAviso(''), 2500);
  };

  return { aviso, agregarProducto };
}

export default useAgregarAlCarrito;
