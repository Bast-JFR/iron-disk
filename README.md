# Iron Disk

Tienda online de discos (vinilos, CDs y cassettes). Proyecto de la Evaluación Parcial 1, 2 y 3 de
Desarrollo Full Stack II (DSY1104), Duoc UC.

- Evaluación 1: sitio en HTML, CSS y JavaScript, en la raíz del repositorio.
- Evaluación 2: la misma tienda hecha con React y Bootstrap, en la carpeta `iron-disk-react`.
- Evaluación 3: la tienda React conectada a un backend con Spring Boot, MySQL y JWT.
  El backend está en otro repositorio: https://github.com/Bast-JFR/iron-disk-backend

Hasta la Evaluación 2 el proyecto era frontend puro y todo se guardaba en `localStorage`. Desde la
Evaluación 3 todo lo que son datos (usuarios, productos, categorías, compras, boletas y reportes) viene del
backend y el único dato que sigue guardándose en el navegador es el carrito.

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

## Evaluación 3: conexión con el backend

La tienda React consume la API del backend con axios. El frontend nunca habla con MySQL, siempre pasa por la API.

1. Levanta el backend (ver el README de `iron-disk-backend`): `docker compose up -d` y `./mvnw spring-boot:run`.
   Queda en `http://localhost:8080`.
2. Desde la carpeta `iron-disk-react`: `npm install` y `npm start`.

La dirección del backend se puede cambiar copiando `.env.example` como `.env` y editando `REACT_APP_API_URL`.

### Qué se hizo en la Evaluación 3

- **Capa de servicios:** se reemplazó la capa de datos sobre `localStorage` por servicios que llaman a la API.
  Los componentes de presentación casi no cambiaron porque un adaptador convierte cada respuesta a la forma que
  ya usaban.
- **Sesión con JWT:** inicio de sesión y registro contra el backend. Los tokens se guardan en el navegador, la
  sesión sobrevive a recargar la página (se valida con `/auth/me` mientras se muestra un indicador de carga) y
  si el token de acceso vence la API lo renueva sola con el token de renovación y repite la petición.
- **Catálogo:** productos, ofertas, categorías y detalle salen de la API. Cada pantalla maneja los tres estados:
  cargando, datos y error.
- **Compra:** el checkout envía solo los datos del cliente y la lista de productos con su cantidad. El precio
  y el total los calcula el backend, que además descuenta el stock. Si responde 201 se muestra la boleta; si no
  alcanza el stock responde 409, se muestra el mensaje y el carrito queda como estaba. Las tarjetas que parten
  con 0000 siguen simulando un pago rechazado.
- **Mis compras:** el cliente con sesión ve sus boletas en `/mis-compras`.
- **Permisos por rol:** se definen en un solo archivo (`src/auth/permisos.js`) y se usan en las rutas, el menú y
  los botones (tabla más abajo).
- **Panel de administración conectado a la API:** dashboard, productos, usuarios (crear con cualquier rol,
  editar, eliminar e historial de compras), órdenes y boletas (el administrador cambia el estado), reportes de
  ventas y perfil.
- **Limpieza:** se eliminaron los módulos de datos locales de usuarios, órdenes, productos y categorías. Solo
  quedan las regiones y los blogs, que son datos fijos, y el carrito.
- **Pruebas:** 26 pruebas con Jasmine y Karma, entre ellas permisos por rol, error de stock en el checkout y
  un vendedor sin botones de edición.

Cómo se conecta:

| Pieza | Qué hace |
|---|---|
| `src/services/api.js` | Instancia de axios hacia el backend, guarda los tokens, agrega el token a cada petición y renueva la sesión |
| `src/services/*Service.js` | Un servicio por recurso: autenticación, productos, categorías, usuarios, boletas y reportes |
| `src/services/adaptadores.js` | Convierte las respuestas del backend a la forma que usan las pantallas, y los formularios a la forma de la API |
| `src/context/AuthContext.js` | Sesión con JWT, sobrevive a recargar la página y se valida con `/auth/me` |
| `src/auth/permisos.js` | Qué puede ver y hacer cada rol |
| `src/hooks/useCarga.js` | Maneja los tres estados de cada pantalla: cargando, datos y error |

### Permisos por rol

| Rol | Panel | Secciones que ve | Qué puede modificar |
|---|---|---|---|
| Administrador | Sí | Dashboard, Productos, Productos críticos, Usuarios, Órdenes, Reportes y Perfil | Todo |
| Vendedor | Sí | Productos, Órdenes y Perfil | Nada de productos ni órdenes: no ve los botones de crear, editar ni eliminar y no cambia estados |
| Cliente | No, aunque escriba la dirección a mano | Solo la tienda y Mis compras | Compra y edita sus datos |

Ocultar un botón no es seguridad: el backend vuelve a revisar el rol en cada petición y responde 403 si no
corresponde.

Cuentas de ejemplo que crea el backend:

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `ba.jofre@duoc.cl` | `admin123` |
| Administrador | `re.colipe@duoc.cl` | `admin123` |
| Vendedor | `diego.perez@duoc.cl` | `vendedor1` |
| Cliente | `camila.soto@gmail.com` | `cliente1` |

Los documentos de la Evaluación 3 (manual de usuario, documentación de APIs e integración, planilla de
endpoints y colección de Postman) están en la carpeta `docs` del repositorio del backend.

## Estructura del proyecto

```
iron-disk/
├── iron-disk-react/        La tienda en React y Bootstrap (Evaluación 2), conectada al backend (Evaluación 3)
│   ├── src/components/     componentes reutilizables (Boton, FormField, tablas...)
│   ├── src/pages/          vistas de la tienda y del administrador (pages/admin)
│   ├── src/services/       axios, un servicio por recurso de la API y los adaptadores
│   ├── src/auth/           permisos de cada rol
│   ├── src/context/        sesión y carrito
│   ├── src/hooks/          useCarga y useAgregarAlCarrito
│   ├── src/data/           datos fijos (regiones y blogs) y acceso a localStorage para el carrito
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

Ramas de la Evaluación 3:

| Rama | Responsable | Contenido |
|---|---|---|
| `feature/react-integracion-auth` | Bastián | Axios con el token y la renovación de sesión, sesión persistente y login, catálogo y panel de productos con la API |
| `feature/react-integracion-compras` | Renato | Servicio de boletas, checkout conectado a la API y Mis compras |
| `feature/react-integracion-admin` | Renato | Permisos por rol, usuarios, órdenes, reportes, dashboard y perfil con la API, y eliminación de los datos locales |
| `feature/react-pruebas-b` | Renato | Pruebas de permisos por rol, error de stock en el checkout y vendedor sin botones |

Las ramas de la Evaluación 1, 2 y 3 están integradas en `main`.
