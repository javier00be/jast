# Especificaciones: Componente de Valoración con Estrellas (JAST)

Este documento define las especificaciones funcionales, visuales, criterios de aceptación y casos de prueba para el sistema de feedback y el distintivo del Hero.

---

## 1. Trust Badge en el Hero (`hero.ts`)

- **Ubicación**: Debajo de la grilla de CTAs (`.ctas`).
- **Breakpoint `968px`**: Se centrará en pantallas medianas y móviles para alinearse con los botones principales.
- **Contenido Visual**:
  - Un icono SVG de estrella dorada con animación de pulso sutil infinita (`pulse-grow`).
  - Texto: _« 4.9/5 · Calificación promedio de la comunidad »_ en tamaño de fuente `12px` y color `var(--text-secondary)`.

---

## 2. Componente de Valoración (`sidebar-rating.ts`)

- **Estructura Visual de la Tarjeta**:
  - Caja contenedora `.rating-card` con fondo `var(--surface)`, borde `1px solid var(--border)` y bordes redondeados a `12px`.
  - Padding de `16px`.
  - Título: _«¿Te gusta JAST?»_ (`13px`, `font-weight: 600`, color `var(--text)`).
  - Subtítulo: _«Tu feedback nos ayuda a mejorar»_ (`11px`, color `var(--text-secondary)`).
  - Fila de 5 estrellas SVG de tamaño `20px x 20px`, gap de `6px`, alineadas horizontalmente.

- **Comportamiento Interactivo (Hover & Click)**:
  - **Estado Hover**:
    - Al pasar el cursor sobre la estrella $N$ (del 1 al 5), las estrellas $1$ a $N$ se colorean de dorado (`#f59e0b`) y adquieren una micro-escala de `scale(1.15)`. Las estrellas restantes (de $N+1$ a $5$) permanecen en su estado inactivo (gris claro `var(--border)`).
  - **Estado Clic**:
    - Al hacer clic en la estrella $N$:
      1. Se guarda en el `localStorage` del navegador la clave `jast-project-rated: true` junto con el valor de la calificación otorgada.
      2. Se inyecta `JastNotificationService` y se dispara un Toast personalizado según la cantidad de estrellas (ver sección 3).
      3. La tarjeta cambia dinámicamente mediante transiciones de opacidad suaves (`opacity` 0 a 1) para ocultar las estrellas y mostrar un mensaje de agradecimiento: _«¡Gracias por valorar el proyecto! (Calificación: N★)»_.

- **Persistencia Local**:
  - Al inicializar el componente (`ngOnInit`), leeremos `localStorage.getItem('jast-project-rated')`.
  - Si existe un valor previo, el componente se renderiza directamente en el **Estado Agradecimiento**, mostrando la valoración registrada y deshabilitando la interfaz de votación para evitar votos duplicados.

---

## 3. Especificación de Notificaciones (Toasts)

Dependiendo de la calificación del usuario, se disparará una notificación de **JAST** a través de `JastNotificationService` con las siguientes configuraciones de Toast:

- **Calificación 5 Estrellas (Excelente)**:
  - Tipo: `success`
  - Título: `¡Espectacular! ⭐⭐⭐⭐⭐`
  - Descripción: `Muchas gracias por las 5 estrellas. ¡Nos motiva un montón a seguir desarrollando!`
  - Posición: `top-right` (en móviles `bottom-center`).
  - Duración: `4500` ms.

- **Calificación 4 Estrellas (Muy Bueno)**:
  - Tipo: `success`
  - Título: `¡Muchas gracias! ⭐⭐⭐⭐`
  - Descripción: `Tu valoración nos ayuda a seguir perfeccionando la librería.`
  - Posición: `top-right`.
  - Duración: `4000` ms.

- **Calificación 1 a 3 Estrellas (Feedback/Mejora)**:
  - Tipo: `info`
  - Título: `¡Gracias por tu valoración! ⭐`
  - Descripción: `Tomamos nota de tu feedback para seguir mejorando las notificaciones de JAST.`
  - Posición: `top-right`.
  - Duración: `4000` ms.

---

## 4. Adaptabilidad y Responsividad en Celulares

- **Breakpoint `768px` (Sidebar Colapsado)**:
  - Cuando el menú lateral cambia a barra de scroll horizontal en celulares grandes y medianos, la tarjeta de votación de las estrellitas **se ocultará del sidebar** (`display: none;` para `.sidebar .rating-card`) para no estirar ni entorpecer la barra horizontal de enlaces de documentación.
  - Para no perder la funcionalidad de votación en celulares, **renderizaremos de manera responsiva la tarjeta de valoración al final del contenido principal de la documentación** (`.content`). Esto asegura que un usuario móvil pueda votar cómodamente al terminar de leer cualquier sección de las Docs.

---

## 5. Criterios de Aceptación Funcionales

1. **Persistencia Correcta**: Validar que refrescar la página tras votar mantenga el estado de agradecimiento y no permita votar nuevamente.
2. **Hover Fluido**: La transición de colores en el hover de las estrellas debe ser instantánea y sin saltos visuales ni parpadeos.
3. **Cero Scroll Horizontal**: El componente se ajusta al ancho del panel lateral de las Docs en escritorio, y al final del contenido principal en móviles sin sobrepasar los márgenes establecidos.
4. **Validación de Tests**: No debe romper la suite de pruebas unitarias existentes.
