# Prueba Técnica Mercado Libre

Implementación de una aplicación web para explorar productos de Mercado Libre con funcionalidades avanzadas de navegación y filtrado.


## Funcionalidades Implementadas

- **Listado de Productos:** Visualización de los primeros 10 productos en forma de tabla en la ruta `/`.
- **Listado por Categoría:** Mostrar productos correspondientes a una categoría específica en la ruta `/[category_id]`.
- **Menú de Categorías:** Menú lateral que muestra categorías disponibles en forma de árbol, con capacidad de expansión y contracción.
- **Navegación y Redirección:** Navegación a la ruta correspondiente al hacer clic en una categoría. Redirección a la página de Mercado Libre al hacer clic en un producto.
- **Paginación Eficiente:** Implementación de paginación eficiente sobre productos, respetando los filtros actuales de la tabla.
- **Carga Perezosa de Imágenes:** Implementación de carga perezosa para mejorar el rendimiento al cargar imágenes de productos.

## Tecnologías Utilizadas

- Next.js
- React
- Redux
- tankstack query
- Tailwind
- Shadcn
- axios
- API de Mercado Libre

## Instrucciones de Instalación y Uso

### Requisitos Previos

- Node.js y npm instalados

### Pasos para Instalar

1. Clona el repositorio: `git clone https://github.com/Luiskd1/prueba-tecnica-cs3`
2. Entra al directorio del proyecto: `cd tu-proyecto`
3. Instala las dependencias: `npm install`

### Ejecución

- Para ejecutar el proyecto: `npm run dev`
- Abre tu navegador y visita: `http://localhost:3000`
