import { createContext, useContext, useEffect, useState } from 'react';
import { leer, guardar } from '../data/storage';

export const CLAVE_CARRITO = 'iron-disk-react-carrito';

// Funciones puras: calculan el nuevo estado sin tocar nada fuera de ellas
export function agregarItem(items, producto, cantidad = 1) {
  const existe = items.some((i) => i.codigo === producto.codigo);

  if (existe) {
    return items.map((i) => (i.codigo === producto.codigo ? { ...i, cantidad: i.cantidad + cantidad } : i));
  }
  return [...items, { ...producto, cantidad }];
}

export function quitarItem(items, codigo) {
  return items.filter((i) => i.codigo !== codigo);
}

export function calcularTotal(items) {
  return items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
}

export function contarUnidades(items) {
  return items.reduce((suma, i) => suma + i.cantidad, 0);
}

const CarritoContext = createContext(null);

// Guarda el carrito en localStorage y lo comparte con toda la aplicacion
export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => leer(CLAVE_CARRITO, []));

  useEffect(() => {
    guardar(CLAVE_CARRITO, items);
  }, [items]);

  const valor = {
    items,
    total: calcularTotal(items),
    unidades: contarUnidades(items),
    agregar: (producto, cantidad) => setItems((actual) => agregarItem(actual, producto, cantidad)),
    quitar: (codigo) => setItems((actual) => quitarItem(actual, codigo)),
    vaciar: () => setItems([]),
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  return useContext(CarritoContext);
}
