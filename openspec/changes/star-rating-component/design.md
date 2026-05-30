# Diseño Técnico: Componente de Valoración con Estrellas (JAST)

Este documento detalla la arquitectura técnica, las estructuras de componentes de Angular y las hojas de estilos CSS para implementar el sistema de feedback y el distintivo del Hero.

---

## 1. Arquitectura del Componente Standalone (`sidebar-rating.ts`)

Crearemos el archivo `projects/playground/src/app/layout/sidebar-rating/sidebar-rating.ts` con la siguiente estructura de señales para una reactividad premium:

- **Señales de Estado**:
  - `rating = signal<number | null>(null)`: Registra la calificación guardada.
  - `hoverRating = signal<number | null>(null)`: Registra la estrella sobre la que se está haciendo hover temporalmente.
  - `alreadyRated = signal<boolean>(false)`: Controla si ya existe una calificación persistida.

- **Diseño del Template HTML**:
  ```html
  <div class="rating-card">
    @if (!alreadyRated()) {
    <span class="rating-title">¿Te gusta JAST?</span>
    <span class="rating-sub">Tu feedback nos ayuda a mejorar</span>
    <div class="stars" (mouseleave)="hoverRating.set(null)">
      @for (star of [1, 2, 3, 4, 5]; track star) {
      <svg
        class="star-icon"
        [class.filled]="(hoverRating() ?? 0) >= star || (rating() ?? 0) >= star"
        (mouseenter)="hoverRating.set(star)"
        (click)="rate(star)"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        ></polygon>
      </svg>
      }
    </div>
    } @else {
    <div class="thanks-view">
      <span class="thanks-icon">🎉</span>
      <span class="rating-title">¡Gracias por valorar!</span>
      <span class="rating-sub">Registramos tu opinión ({{ rating() }}★)</span>
    </div>
    }
  </div>
  ```

---

## 2. Hoja de Estilos Encapsulada (`sidebar-rating.ts`)

Estilos CSS encapsulados con micro-transiciones fluidas:

```css
.rating-card {
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
  transition: all 0.3s ease;
}
.rating-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  margin: 0;
}
.rating-sub {
  font-size: 11px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 4px;
}
.stars {
  display: flex;
  gap: 6px;
  align-items: center;
}
.star-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: var(--text-secondary);
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    color 0.15s ease;
  opacity: 0.45;
  polygon {
    fill: transparent;
    transition: fill 0.15s ease;
  }
  &:hover {
    transform: scale(1.25);
  }
  &.filled {
    color: #f59e0b;
    opacity: 1;
    polygon {
      fill: #f59e0b;
    }
  }
}
.thanks-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding: 8px 0;
  animation: fade-in 0.35s ease;
}
.thanks-icon {
  font-size: 20px;
  margin-bottom: 2px;
  animation: bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bounce {
  0% {
    transform: scale(0.3);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
```

---

## 3. Integración en Documentación (`docs-page.ts`)

Para renderizar la tarjeta en el sidebar (escritorio) y al final del contenido (móvil), importaremos `SidebarRatingComponent` en `docs-page.ts` y lo declararemos dos veces en el template:

### Template Actualizado:

```html
<div class="docs-layout">
  <aside class="sidebar">
    <a routerLink="/" class="back">← Inicio</a>
    <!-- Enlaces de navegación -->
    ...
    <!-- Votador para escritorio -->
    <app-sidebar-rating class="docs-sidebar-rating" />
  </aside>

  <main class="content">
    <router-outlet />
    <!-- Votador para celulares (al final del contenido) -->
    <app-sidebar-rating class="docs-content-rating" />
  </main>
</div>
```

### Estilos Toggles Responsivos (`docs-page.ts`):

```css
.docs-sidebar-rating {
  display: block;
  margin-top: auto; /* Empuja el card al final del sidebar */
}
.docs-content-rating {
  display: none;
}
@media (max-width: 768px) {
  .docs-sidebar-rating {
    display: none !important;
  }
  .docs-content-rating {
    display: block !important;
    margin-top: 48px;
    border-top: 1px solid var(--border);
    padding-top: 32px;
  }
}
```

---

## 4. Distintivo de Confianza en el Hero (`hero.ts`)

Agregaremos el distintivo de valoraciones debajo de los botones principales del Hero.

### Marcado HTML (`hero.ts`):

```html
<div class="hero-trust">
  <svg class="trust-star" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b">
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    ></polygon>
  </svg>
  <span>4.9/5 · Calificación promedio de la comunidad</span>
</div>
```

### Estilos CSS (`hero.ts`):

```css
.hero-trust {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  span {
    letter-spacing: -0.1px;
  }
}
.trust-star {
  width: 14px;
  height: 14px;
  animation: pulse-grow 2.5s infinite ease-in-out;
}
@keyframes pulse-grow {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
@media (max-width: 968px) {
  .hero-trust {
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
  }
}
```
