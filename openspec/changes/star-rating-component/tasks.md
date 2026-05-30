# Plan de Tareas: Componente de Valoración con Estrellas (JAST)

Este documento detalla el plan de desarrollo atómico dividido en unidades de trabajo independientes y commits semánticos bajo la convención _Conventional Commits_.

---

## Tareas de Implementación

### 📦 Unidad de Trabajo 1: Crear Componente Standalone de Valoración

- **Objetivo**: Desarrollar la lógica, el marcado SVG y los estilos encapsulados para las estrellas interactivas y la persistencia local.
- **Archivos involucrados**:
  - `projects/playground/src/app/layout/sidebar-rating/sidebar-rating.ts` (NUEVO ARCHIVO)
- **Cambios**:
  - Implementar señales reactivas (`rating`, `hoverRating`, `alreadyRated`).
  - Diseñar el template HTML con condicional `@if` / `@else` y bucle `@for` de estrellas con manejadores de eventos.
  - Escribir estilos encapsulados (tarjeta, escala hover cubic-bezier, animaciones de entrada y rebote).
  - Configurar inyección de `JastNotificationService` para disparar Toasts condicionales según la cantidad de estrellas de valoración.
- **Commit**: `feat(playground): create standalone sidebar star rating component`

---

### 📦 Unidad de Trabajo 2: Integrar en la Documentación (Docs Layout)

- **Objetivo**: Añadir el componente al sidebar y al contenido principal con comportamiento responsive adaptable.
- **Archivos a modificar**:
  - `projects/playground/src/app/pages/docs/docs-page.ts`
- **Cambios**:
  - Importar `SidebarRatingComponent` en la sección `@Component.imports`.
  - Agregar `<app-sidebar-rating class="docs-sidebar-rating" />` al pie del sidebar.
  - Agregar `<app-sidebar-rating class="docs-content-rating" />` al final del panel `.content`.
  - Configurar las reglas de visibilidad `@media (max-width: 768px)` en los estilos del layout de Docs para ocultar en sidebar y mostrar en panel de lectura.
- **Commit**: `feat(playground): integrate star rating component in docs page layout`

---

### 📦 Unidad de Trabajo 3: Distintivo de Confianza en el Hero

- **Objetivo**: Dotar al Hero de un badge visual animado de calificaciones.
- **Archivos a modificar**:
  - `projects/playground/src/app/sections/hero/hero.ts`
- **Cambios**:
  - Insertar el contenedor `.hero-trust` con la estrella SVG dorada abajo de los CTAs.
  - Diseñar la animación de pulso infinito de escala `pulse-grow`.
  - Alinear y centrar responsivamente bajo `968px`.
- **Commit**: `feat(playground): add premium trust rating badge to hero`
