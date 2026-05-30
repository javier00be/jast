# Propuesta: Playground Responsive para Móvil (JAST)

Esta propuesta detalla el plan de diseño y reestructuración de la aplicación Playground del monorepo de **JAST** para garantizar una experiencia visual y funcional impecable en dispositivos móviles, manteniendo la estética premium y minimalista de la marca.

---

## 1. Problema de Diseño y Maquetación Actual
Actualmente, la versión móvil del Playground tiene varios elementos que rompen el diseño o impiden el uso correcto del simulador:
- **Navbar (`navbar.ts`)**: Desborda los enlaces de navegación y el botón de GitHub en pantallas menores a `768px`.
- **Docs Layout (`docs-page.ts`)**: El panel lateral (`sidebar`) tiene un ancho estático de `220px` y se mantiene flotando al lado del contenido, arrinconando la documentación hasta hacerla ilegible. Los paddings del contenedor de contenido (`56px 72px`) consumen casi todo el ancho disponible.
- **Tablas de la API (`api-ref.ts` / `styling.ts`)**: Las filas de clases, propiedades y métodos usan grillas rígidas de hasta 4 columnas que colapsan en móviles, encimando los textos.
- **Sección de Demo (`demo.ts`)**: La grilla de `1fr 1.6fr` no se colapsa, apretando la pantalla de control y el simulador del celular.
- **Sección de Instalación (`install.ts`)**: Los pasos numéricos (`.steps`) ocupan columnas rígidas que aprietan el código en móviles.

---

## 2. Estrategia de Solución Propuesta

### A. Navegación Responsive (Navbar & Footer)
- **Navbar**: En pantallas de menos de `768px`, ocultaremos el texto secundario "notification" del logo y reemplazaremos los enlaces de texto por iconos o un layout de flexbox con espaciados reducidos de forma elegante. Si el usuario desea acceder a secciones, utilizaremos un espaciado optimizado. En lugar de un menú hamburguesa pesado, usaremos una barra simplificada responsiva que ajusta los paddings de `32px` a `16px` y reduce el gap a `12px` (ideal para móvil).
- **Footer**: Colapsar verticalmente los enlaces y el texto de copyright centrándolos en pantallas menores a `600px`.

### B. Layout de Documentación Dinámico (`docs-page.ts`)
- En pantallas menores a `768px`, el layout cambia de `grid-template-columns: 220px 1fr` a un layout vertical de una sola columna.
- El **Sidebar** se reposiciona en la parte superior del contenido en móviles como un selector horizontal de navegación de tipo "tabs" deslizable (`overflow-x: auto`), reduciendo la fricción.
- Se reduce el padding de `.content` a `24px 16px` en móvil para dar el máximo espacio disponible a la lectura de código.

### C. Tablas Adaptativas en Formato Tarjeta
- En pantallas menores a `600px`, las tablas de propiedades, métodos y personalización CSS de la documentación abandonarán el formato de grilla tabular y se convertirán en **tarjetas verticales independientes** (formato lista).
- Ocultamos los encabezados de tabla (`.prop-header`, `.method-header`).
- Transformamos cada fila (`.prop-row`, `.method-row`) en una tarjeta con bordes, usando un diseño vertical claro con espaciado de `8px`, donde el nombre de la propiedad o método se destaque arriba y la descripción abajo.

### D. Demo y Simulador Responsive (`demo.ts`)
- Colapsar la estructura `.cols` a una sola columna bajo `968px`.
- La pantalla del simulador (`.screen`) usará un `aspect-ratio` más flexible y se centrará.
- La grilla de botones de posición (`.pos-grid`) mantendrá un espaciado óptimo para toque táctil.
- Los botones de tipo de toast (`.type-btn`) y botones extras usarán flexwrap completo para adaptarse al ancho de pantalla.

### E. Pasos de Instalación (`install.ts`)
- Colapsar la grilla de pasos `.steps` a una sola columna en pantallas menores a `768px`.
- Ajustar el tamaño del bloque de código para evitar scroll horizontal innecesario o desbordamiento de contenedores.

---

## 3. Archivos Afectados
1. `projects/playground/src/app/layout/navbar/navbar.ts`
2. `projects/playground/src/app/pages/docs/docs-page.ts`
3. `projects/playground/src/app/pages/docs/sections/api-ref.ts`
4. `projects/playground/src/app/pages/docs/sections/styling.ts`
5. `projects/playground/src/app/sections/demo/demo.ts`
6. `projects/playground/src/app/sections/install/install.ts`
7. `projects/playground/src/app/layout/footer/footer.ts`

---

## 4. Riesgos y Tradeoffs
- **Riesgo**: Que los cambios en las grillas CSS alteren el comportamiento visual de los Toasts reales que flotan sobre la página.
  - *Mitigación*: Los toasts se inyectan a través de `CDK Overlay` en un contenedor global (`.cdk-overlay-container`), por lo que los cambios de layout del Playground no interfieren en la posición real de las alertas activas de la librería `jast-notification`.
- **Riesgo**: Que los test unitarios del Playground fallen por cambios en clases o selectores DOM.
  - *Mitigación*: Mantendremos la estructura semántica y los IDs o selectores clave de tests intactos.
