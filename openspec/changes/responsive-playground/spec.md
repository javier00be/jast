# Especificaciones: Playground Responsive para Móvil (JAST)

Este documento define los requisitos funcionales, criterios de aceptación y las especificaciones visuales de los breakpoints para la refactorización responsive del Playground.

---

## 1. Breakpoints Clave y Reglas Generales

Definimos tres breakpoints estándar para los estilos responsivos:
1. **`968px` (Tablet / Laptop chica)**: Transición para las secciones del Home (Hero, Demo/Playground) donde el contenido en dos columnas se apila en vertical.
2. **`768px` (Celular Grande / Tablet vertical)**: Transición para el layout de la documentación, navegación principal y sección de pasos de instalación.
3. **`600px` (Celular Estándar)**: Reestructuración de las tablas de datos pesados (API, personalización de variables CSS) y el footer de la página.

---

## 2. Especificación Detallada por Componente

### A. Navbar (`navbar.ts`)
- **Breakpoint `768px`**:
  - El padding de `<nav>` se reduce de `0 32px` a `0 16px`.
  - El gap de los enlaces `.links` se reduce de `24px` a `12px`.
  - Se oculta la marca secundaria del logotipo `.logo-sub` ("notification").
  - El botón `.github-btn` reduce su padding a `5px 10px` y el texto "GitHub" se oculta en pantallas menores a `480px` (dejando solo el icono de GitHub para ahorrar espacio).

### B. Docs Layout (`docs-page.ts`)
- **Breakpoint `768px`**:
  - El contenedor principal `.docs-layout` cambia de `grid-template-columns: 220px 1fr` a `display: flex; flex-direction: column;`.
  - El padding del panel de contenido `.content` se reduce de `56px 72px` a `24px 16px`. Su `max-width` se ajusta a `100%`.
  - El **Sidebar** (`.sidebar`) cambia su comportamiento:
    - Cambia de `position: sticky` vertical a un menú horizontal estático: `height: auto; border-right: none; border-bottom: 1px solid var(--border); padding: 16px; flex-direction: row; overflow-x: auto; gap: 16px; white-space: nowrap; scrollbar-width: none;`.
    - Oculta las etiquetas de grupos de navegación `.nav-label` (como "Comenzando" o "Referencia") para mantener un scroll de enlaces limpio y directo.
    - Los grupos de navegación `.nav-group` cambian a `flex-direction: row` con `align-items: center` y un `gap` de `8px`.
    - Los enlaces `a` se muestran como chips con `display: inline-block; padding: 6px 12px; margin: 0; font-size: 13px;`.

### C. Tablas de API y Personalización (`api-ref.ts` / `styling.ts`)
- **Breakpoint `600px`**:
  - Las cabeceras `.method-header` y `.prop-header` se ocultan: `display: none;`.
  - Los bordes y fondos globales de `.method-table` y `.prop-table` se eliminan (`border: none; background: transparent;`).
  - Cada fila `.method-row`, `.prop-row` y `.styles-row` se transforma en una **tarjeta independiente**:
    - Estilos: `display: flex; flex-direction: column; align-items: flex-start; gap: 8px; padding: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 12px;`.
  - El nombre del método o propiedad y su tipo/por defecto se muestran en bloque para lectura rápida.
  - La descripción final ocupa todo el ancho de la tarjeta.

### D. Sección de Demo (`demo.ts`)
- **Breakpoint `968px`**:
  - La grilla `.cols` cambia a una sola columna: `grid-template-columns: 1fr; gap: 40px;`.
  - Se centra la sección derecha que simula la pantalla (`.right` y `.screen`).
  - La pantalla del simulador `.screen` se adapta a `aspect-ratio: auto; min-height: 280px; width: 100%;` para evitar que se comprima.
  - Los botones de tipo de toast `.type-row` se centran (`justify-content: center;`) y usan `flex-wrap: wrap`.
  - Los botones extras `.extras` se adaptan a un ancho del 100%.

### E. Sección de Instalación (`install.ts`)
- **Breakpoint `768px`**:
  - La grilla `.steps` cambia a `grid-template-columns: 1fr; gap: 32px;`.
  - Los contenedores `.code-block` y `.code-block.multiline` aseguran un `max-width: 100%; overflow-x: auto;` para que no empujen el layout del celular hacia los lados.

### F. Footer (`footer.ts`)
- **Breakpoint `600px`**:
  - El flex `.inner` se alinea en vertical: `flex-direction: column; gap: 16px; text-align: center;`.

---

## 3. Criterios de Aceptación Funcionales

1. **Sin Scroll Horizontal**: Ninguna resolución móvil (hasta `320px` de ancho mínimo) debe generar desbordamiento ni scroll horizontal en ninguna de las páginas del Playground (Inicio o Documentación).
2. **Interactividad Intacta**: Los clics en las grillas de disparar Toasts y los botones extras del Playground deben seguir funcionando de manera táctil perfectamente. El área de toque (`hitbox`) de los botones móviles debe ser de al menos `44px` de alto/ancho donde sea posible.
3. **Preservar Comportamiento CDK Overlay**: Los toasts inyectados deben seguir posicionándose flotantes en la pantalla según la configuración del usuario, independientemente de los cambios aplicados en la maquetación.
4. **Sin Impacto en Tests**: La suite de pruebas unitarias (`app.spec.ts`, etc.) debe pasar al 100% tras la refactorización.

---

## 4. Estrategia de Verificación y Pruebas
- Realizaremos una inspección visual emulando diferentes viewports (`iPhone SE`, `Pixel 7`, `iPad`).
- Validaremos que el monorepo compile perfectamente con `npm run build` o el servidor local.
- Correremos las pruebas del playground para descartar regresiones.
