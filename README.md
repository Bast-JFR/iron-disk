# Iron Disk

Tienda online de discos (vinilos, CDs y cassettes). Proyecto de la Evaluación Parcial 1 de
Desarrollo Full Stack II (DSY1104), Duoc UC.

Proyecto frontend puro: HTML5, CSS3 y JavaScript vanilla. Sin backend ni base de datos; lo
que necesite persistir (como el carrito de compras) se guarda en `localStorage`.

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
│   ├── css/style.css      hoja de estilos externa
│   ├── js/                scripts del proyecto
│   └── img/                imágenes del proyecto
├── admin/                  vistas del administrador
└── *.html                  vistas de la tienda pública
```

## Ramas del proyecto

| Rama | Responsable | Contenido |
|---|---|---|
| `feature/tienda-home` | Bastián | Home: menú, banner, grilla de productos destacados, footer |
| `feature/tienda-productos` | Renato | Listado de productos, detalle de producto y carrito |
| `feature/tienda-auth` | Bastián y Renato | Registro de usuario e inicio de sesión |
| `feature/tienda-nosotros-blogs` | Bastián | Página Nosotros y Blogs con sus 2 detalles |
| `feature/tienda-contacto` | Bastián | Formulario de contacto con validación |
| `feature/admin-productos` | Renato | Home del administrador y mantenedor de productos |
| `feature/admin-usuarios` | Renato | Mantenedor de usuarios |

`main` está protegida: no se sube directo salvo la base inicial del proyecto. Cada quien
trabaja en su propia rama y avisa antes de mergear a `main`.
