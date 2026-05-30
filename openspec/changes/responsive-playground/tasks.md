# Plan de Tareas: Playground Responsive para Móvil (JAST)

Este documento detalla el plan de desarrollo atómico dividido en unidades de trabajo independientes y commits semánticos bajo la convención _Conventional Commits_.

---

## Tareas de Implementación

### 📦 Unidad de Trabajo 1: Componentes Globales (Navbar & Footer)

- **Objetivo**: Garantizar que el marco global de la aplicación se adapte sin desbordes.
- **Archivos a modificar**:
  - `projects/playground/src/app/layout/navbar/navbar.ts`
  - `projects/playground/src/app/layout/footer/footer.ts`
- **Cambios**:
  - Navbar: Reducir gap de links a `16px`, padding general a `16px` y ocultar `.logo-sub` bajo `768px`. Ocultar texto "GitHub" dejando solo el icono bajo `480px`.
  - Footer: Colapsar a columna centralizada bajo `600px`.
- **Commit**: `style(playground): make navbar and footer responsive`

---

### 📦 Unidad de Trabajo 2: Secciones Informativas (Features & Install)

- **Objetivo**: Asegurar la legibilidad de características y el código de instalación en móviles.
- **Archivos a modificar**:
  - `projects/playground/src/app/sections/features/features.ts`
  - `projects/playground/src/app/sections/install/install.ts`
- **Cambios**:
  - Features: Ajustar paddings de sección a `40px 16px` en móvil.
  - Install: Colapsar grilla `.steps` a 1 columna bajo `768px` y asegurar `overflow-x: auto` en bloques de código para evitar scroll lateral del viewport.
- **Commit**: `style(playground): make features and install sections responsive`

---

### 📦 Unidad de Trabajo 3: Simulador y Demo Interactiva (`demo.ts`)

- **Objetivo**: Garantizar el uso táctil fluido del Playground de toasts.
- **Archivos a modificar**:
  - `projects/playground/src/app/sections/demo/demo.ts`
- **Cambios**:
  - Colapsar la grilla principal `.cols` a 1 columna bajo `968px`.
  - Centrar el simulador `.screen` y asignarle `aspect-ratio: auto; min-height: 280px; width: 100%;` para evitar compresión.
  - Habilitar `flex-wrap: wrap` y centrado en los selectores de tipo de toast `.type-row`.
- **Commit**: `style(playground): make interactive demo simulator responsive`

---

### 📦 Unidad de Trabajo 4: Documentación - Estructura de Layout (`docs-page.ts`)

- **Objetivo**: Hacer accesible la documentación colapsando el panel lateral.
- **Archivos a modificar**:
  - `projects/playground/src/app/pages/docs/docs-page.ts`
- **Cambios**:
  - Colapsar `.docs-layout` a 1 columna bajo `768px`.
  - Convertir el sidebar `.sidebar` en barra horizontal superior con scroll deslizable (`overflow-x: auto`), ocultando scrollbars y títulos `.nav-label` pesados.
  - Reducir padding de `.content` a `24px 16px` bajo `768px`.
- **Commit**: `style(playground): make docs layout and sidebar responsive`

---

### 📦 Unidad de Trabajo 5: Documentación - Tablas Técnicas (API & Styling)

- **Objetivo**: Evitar textos superpuestos en las tablas de propiedades y métodos.
- **Archivos a modificar**:
  - `projects/playground/src/app/pages/docs/sections/api-ref.ts`
  - `projects/playground/src/app/pages/docs/sections/styling.ts`
- **Cambios**:
  - Ocultar cabeceras `.prop-header` y `.method-header` bajo `600px`.
  - Convertir filas `.prop-row`, `.method-row` y `.styles-row` en tarjetas de visualización en bloque.
  - Inyectar etiquetas contextuales mediante CSS `::before` (`Tipo: `, `Default: `, `Parámetro: `) para mayor legibilidad sin modificar el HTML.
- **Commit**: `style(playground): convert api and styling tables to card layouts on mobile`
