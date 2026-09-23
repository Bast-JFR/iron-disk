# Iron Disk

Tienda online de discos (vinilos, CDs y cassettes). Proyecto de la Evaluación Parcial 1 de
Desarrollo Full Stack II (DSY1104), Duoc UC.

Proyecto frontend puro: HTML5, CSS3 y JavaScript vanilla. Sin backend ni base de datos; lo
que necesite persistir (carrito de compras, productos y usuarios del administrador) se
guarda en `localStorage`.

Diseño responsivo: el sitio se adapta a celulares y tablets.

## Cómo abrirlo en local

No requiere instalación ni build. Alguna de estas dos formas:

- Abrir `index.html` directamente en el navegador.
- Usar la extensión Live Server de VS Code sobre la carpeta del proyecto.

## Estructura del proyecto

```
iron-disk/
├── docs/
│   └── requisitos.md      reglas de validación de los formularios
├── assets/
│   ├── css/style.css      hoja de estilos externa (incluye el diseño responsivo)
│   ├── js/                scripts del proyecto
│   ├── img/                imágenes del proyecto
│   └── video/              video de presentación de la tienda
├── admin/                  vistas del administrador
├── producto-detalle/       detalle de cada disco del catálogo
└── *.html                  vistas de la tienda pública
```

## Ramas del proyecto

| Rama | Responsable | Contenido |
|---|---|---|
| `feature/tienda-home` | Bastián | Home: menú, banner, grilla de productos destacados, footer |
| `feature/tienda-productos` | Renato | Listado de productos, detalle de producto y carrito |
| `feature/tienda-auth` | Bastián y Renato | Registro de usuario e inicio de sesión |
| `feature/tienda-nosotros-blogs` | Bastián | Página Nosotros y Blogs con sus 2 detalles, video de presentación |
| `feature/tienda-contacto` | Bastián | Formulario de contacto con validación |
| `feature/admin-productos` | Bastián y Renato | Home del administrador y mantenedor de productos |
| `feature/admin-usuarios` | Bastián y Renato | Mantenedor de usuarios |

Todas las ramas están integradas en `main`.
