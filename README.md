# Iron Disk

Tienda online de discos (vinilos, CDs y cassettes). Proyecto de la Evaluación Parcial 1 y 2 de
Desarrollo Full Stack II (DSY1104), Duoc UC.

- Evaluación 1: sitio en HTML, CSS y JavaScript, en la raíz del repositorio.
- Evaluación 2: la misma tienda hecha con React y Bootstrap, en la carpeta `iron-disk-react`.

Proyecto frontend puro, sin backend ni base de datos; lo que necesite persistir (carrito de
compras, productos, usuarios y órdenes) se guarda en `localStorage`.

Diseño responsivo: el sitio se adapta a celulares y tablets.

## Cómo abrirlo en local

No requiere instalación ni build. Alguna de estas dos formas:

- Abrir `index.html` directamente en el navegador.
- Usar la extensión Live Server de VS Code sobre la carpeta del proyecto.

## Evaluación 2: React, Bootstrap y pruebas

Desde la carpeta `iron-disk-react`:

```
npm install     instala las dependencias (solo la primera vez)
npm start       abre la tienda en el navegador
npm test        ejecuta las pruebas con Jasmine y Karma y genera la cobertura en coverage/
npm run build   genera la versión para publicar
```

Para entrar al panel de administración: `ba.jofre@duoc.cl` con contraseña `admin123`.

En el checkout, las tarjetas que parten con 0000 simulan un pago rechazado.

La documentación de la entrega está en la carpeta `docs`: ERS versión 2 y documento de cobertura de testing.

## Estructura del proyecto

```
iron-disk/
├── iron-disk-react/        Evaluación 2: la tienda en React, Bootstrap y pruebas
│   ├── src/components/     componentes reutilizables (Boton, FormField, tablas...)
│   ├── src/pages/          vistas de la tienda y del administrador (pages/admin)
│   ├── src/data/           capa de datos con CRUD sobre localStorage
│   ├── src/utils/          validaciones, filtros, formato, pago y reportes
│   └── karma.conf.js       configuración de Jasmine y Karma
├── docs/
│   ├── ERS-IronDisk-V2.docx              especificación de requisitos, versión 2
│   ├── Cobertura-Testing-IronDisk.docx   documento de cobertura de testing
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

Ramas de la Evaluación 2:

| Rama | Contenido |
|---|---|
| `feature/react-base` | Proyecto React, Bootstrap y rutas |
| `feature/react-config-pruebas` | Configuración de Jasmine y Karma |
| `feature/react-datos` | Capa de datos con CRUD, validaciones, contextos de carrito y sesión |
| `feature/react-tienda` | Home, catálogo, detalle, categorías, ofertas, nosotros, blogs y contacto |
| `feature/react-compra` | Carrito, checkout, compra exitosa y con error, login y registro |
| `feature/react-admin-productos` | Panel de administración y mantenedor de productos |
| `feature/react-pruebas` | Pruebas unitarias y cobertura |
| `feature/react-documentos` | ERS versión 2 y documento de cobertura |
| `feature/react-admin-usuarios` | Mantenedor de usuarios e historial de compras |
| `feature/react-ordenes` | Órdenes con su boleta, pruebas y cobertura actualizada |
| `feature/react-reportes-perfil` | Reportes y perfil del administrador |
| `feature/react-cierre` | Ajuste de pruebas, README, ERS y documento de cobertura |

Las ramas de la Evaluación 1 y de la Evaluación 2 están integradas en `main`.
