# Showroom Commerce

Aplicación web de comercio electrónico desarrollada con React y Vite. Permite explorar un catálogo de productos, consultar el detalle de cada artículo, gestionar un carrito y mostrar información del equipo. Firestore proporciona los datos del catálogo, el equipo y los cupones.

## Funcionalidades

- Catálogo de productos obtenido desde la colección `productos` de Firestore.
- Vista de detalle para cada producto.
- Carrito con controles para ajustar cantidades, quitar artículos y vaciar la selección.
- Formulario de alta de productos, con asignación consecutiva de identificador mediante una transacción de Firestore y carga de imágenes a ImgBB.
- Sección «Nosotros» que presenta los perfiles guardados en la colección `equipo`.
- Pantalla de administración de cupones conectada a la colección `cupones`.
- Diseño adaptable a distintos tamaños de pantalla.

## Tecnologías

- React 19 y React DOM
- Vite 8
- React Router
- Firebase Web SDK y Cloud Firestore
- CSS Modules
- ImgBB para alojar las imágenes cargadas desde el formulario

## Requisitos

- Node.js compatible con la versión de Vite indicada en `package.json`.
- npm
- Un proyecto Firebase con Cloud Firestore configurado.
- Una API key de ImgBB si se va a utilizar la carga de imágenes.

## Instalación y ejecución

Cloná el repositorio e instalá las dependencias:

```bash
git clone https://github.com/ChristianQuiroga/showroom-react-preentrega.git
cd showroom-react-preentrega
npm install
```

Creá un archivo `.env.local` en la raíz del proyecto, tomando como referencia `.env.example`, y completá la configuración de Firebase. Para habilitar la carga de imágenes, completá también `VITE_IMGBB_API_KEY`.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_IMGBB_API_KEY=
```

Iniciá el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación.

## Comandos disponibles

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia el servidor local de desarrollo. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la última compilación para revisarla. |

## Rutas principales

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio |
| `/productos` | Catálogo |
| `/producto/:id` | Detalle del producto |
| `/alta` | Alta de productos |
| `/nosotros` | Equipo |
| `/admin/cupones` | Administración de cupones |
| `/carrito` | Carrito de compras |
| `/contacto` | Contacto |

## Datos en Firebase

La aplicación consulta datos de Cloud Firestore. Entre las colecciones utilizadas están `productos`, `equipo` y `cupones`; el alta de productos también utiliza el documento `contadores/productos` para generar identificadores consecutivos.

Las operaciones disponibles dependen de las reglas de seguridad configuradas en el proyecto Firebase. En el entorno de producción actual, Firestore permite lectura y bloquea escritura; por eso las acciones que crean o eliminan productos y cupones requieren permisos de escritura y no se completan allí con las reglas vigentes. No cambies las reglas de producción para habilitar formularios sin definir antes una política de acceso adecuada.

## Variables y seguridad

Las variables con prefijo `VITE_` se incorporan al código que recibe el navegador. La configuración del SDK web de Firebase está diseñada para usarse en cliente, pero el acceso a los datos debe protegerse con reglas de Firestore. No guardes contraseñas, claves privadas ni credenciales de Firebase Admin en variables `VITE_` ni en este repositorio.

La API key de ImgBB se usa desde el navegador para subir imágenes, por lo que queda expuesta al cliente. No la trates como un secreto; limitá su uso desde el proveedor o trasladá la operación de carga a un servicio de backend si necesitás protegerla.

## Compilación

Para crear y revisar la compilación de producción:

```bash
npm run build
npm run preview
```

La salida queda en `dist/`, que es el directorio que puede publicar un servicio de hosting estático como Vercel.
