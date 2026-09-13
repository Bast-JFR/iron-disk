# Requisitos de validación — Iron Disk

Reglas de negocio y validaciones exigidas por el Anexo 1 (Instrucciones) de la Evaluación
Parcial 1, DSY1104. Estos son los valores exactos a implementar en JavaScript para cada
formulario.

## Inicio de sesión

- **Correo**
  - Requerido.
  - Máximo 100 caracteres.
  - Solo se aceptan correos de los dominios `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- **Contraseña**
  - Requerida.
  - Entre 4 y 10 caracteres.

## Registro de usuario

El registro de usuario usa las mismas reglas que la creación de usuario en el administrador
(ver sección "Usuario" más abajo).

## Contacto

- **Nombre**
  - Requerido.
  - Máximo 100 caracteres.
- **Correo**
  - Máximo 100 caracteres.
  - Solo se aceptan correos de los dominios `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- **Comentario**
  - Requerido.
  - Máximo 500 caracteres.

## Producto

- **Código de producto**
  - Requerido.
  - Texto.
  - Mínimo 3 caracteres, sin máximo.
- **Nombre**
  - Requerido.
  - Máximo 100 caracteres.
- **Descripción**
  - Opcional.
  - Máximo 500 caracteres.
- **Precio**
  - Requerido.
  - Mínimo 0 (un precio de 0 se considera un producto FREE).
  - Sin máximo.
  - Puede ser un número decimal.
- **Stock** (cantidad de productos en el inventario)
  - Requerido.
  - Mínimo 0, sin máximo.
  - Solo números enteros.
- **Stock crítico**
  - Opcional.
  - Mínimo 0.
  - Solo números enteros.
  - Se debe mostrar un mensaje de alerta cuando el stock sea igual o inferior al stock
    crítico.
- **Categoría**
  - Requerida.
  - Select que muestra la categoría del producto.
- **Imagen**
  - Opcional.

## Usuario

- **RUN**
  - Requerido.
  - Validar que el RUN esté correcto (dígito verificador).
  - Sin puntos ni guion. Ejemplo: `19011022K`.
  - Mínimo 7, máximo 9 caracteres.
- **Nombre**
  - Requerido.
  - Máximo 50 caracteres.
- **Apellidos**
  - Requerido.
  - Máximo 100 caracteres.
- **Correo**
  - Requerido.
  - Máximo 100 caracteres.
  - Solo se aceptan correos de los dominios `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- **Fecha de nacimiento**
  - Opcional.
- **Tipo de usuario**
  - Se implementa solo en la vista administrativa.
  - Select con los perfiles: Administrador, Cliente y Vendedor.
- **Región y comuna**
  - Se muestran desde un arreglo de JavaScript.
  - Al cambiar la región seleccionada, cambia también la búsqueda de comunas disponibles
    para esa región.
- **Dirección**
  - Requerida.
  - Máximo 300 caracteres.

## Roles asociados al sistema

- **Administrador**: tiene acceso total al sistema.
- **Vendedor**: puede visualizar la lista de productos y su detalle, y la lista de órdenes
  y su detalle. Todos los demás accesos no deben aparecer en la vista del vendedor.
- **Cliente**: solo puede acceder a la tienda.

## Productos y carrito de compras

- Los productos se listan mediante JavaScript, a partir de un arreglo de productos.
- El carrito de compras se implementa en JavaScript.
- La información del carrito se guarda en `localStorage`.

## Otros requisitos exigidos por la rúbrica

- Estructura HTML válida usando elementos semánticos: `<header>`, `<nav>`, `<main>`,
  `<section>`, `<article>`, `<footer>`.
- Hipervínculos funcionales, imágenes correctamente insertadas, botones operativos, al menos
  un video embebido, formularios interactivos y un footer informativo.
- Todas las páginas interconectadas mediante hipervínculos, con navegación coherente y
  fluida.
- Todas las páginas HTML deben usar una hoja de estilos CSS externa.
- Los formularios deben validar con JavaScript, con mensajes de error y sugerencias claros,
  específicos y mostrados en el contexto adecuado del formulario, en tiempo real.
- Commits con mensajes claros y descriptivos, con tareas distribuidas entre el equipo.
