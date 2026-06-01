# Diseño Técnico: Integración de la API de GitHub (JAST)

Este documento detalla el diseño de código TypeScript, las estructuras de plantilla HTML de Angular y las hojas de estilos CSS para realizar el consumo dinámico de estrellas y el botón de invitación al repositorio.

---

## 1. Diseño TypeScript del Consumo de API (Signals)

Implementaremos la llamada asincrónica usando `window.fetch` nativo dentro de los componentes.

### Código TypeScript de Consulta (`hero.ts` y `sidebar-rating.ts`):

```typescript
githubStars = signal<string>('—');

ngOnInit(): void {
  this.fetchStars();
}

async fetchStars(): Promise<void> {
  try {
    const res = await fetch('https://api.github.com/repos/javier00be/jast');
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.stargazers_count === 'number') {
        this.githubStars.set(data.stargazers_count.toString());
      }
    }
  } catch (err) {
    // Silencio de fallback: no ensucia la consola y mantiene el valor original '—'
  }
}
```

---

## 2. Marcado HTML y CSS del Botón de Conversión (`sidebar-rating.ts`)

Cuando el usuario vota con 4 o 5 estrellas, se mostrará el botón de redirección de GitHub.

### HTML del Estado de Agradecimiento:

```html
<div class="thanks-view">
  <span class="thanks-icon">🎉</span>
  <span class="rating-title">¡Gracias por valorar!</span>
  <span class="rating-sub">Registramos tu opinión ({{ rating() }}★)</span>

  @if ((rating() ?? 0) >= 4) {
  <a
    href="https://github.com/javier00be/jast"
    target="_blank"
    rel="noopener noreferrer"
    class="github-star-cta"
  >
    ¡Dejanos una estrella en GitHub! ⭐
  </a>
  }
</div>
```

### Estilos CSS del Botón (`sidebar-rating.ts`):

```css
.github-star-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 10px 16px;
  background: var(--text);
  color: var(--bg);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid var(--text);
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    background: transparent;
    color: var(--text);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  }
  &:active {
    transform: translateY(0);
  }
}
```

---

## 3. Marcado HTML y CSS Dinámico del Hero Badge (`hero.ts`)

Reemplazaremos el promedio estático por la cantidad en vivo de estrellas de GitHub.

### HTML del Badge:

```html
<div class="hero-trust">
  <svg class="trust-star" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b">
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    ></polygon>
  </svg>
  <span>
    @if (githubStars() !== '—') { {{ githubStars() }} estrellas en GitHub · Calificación promedio
    5.0★ } @else { Calificación promedio 5.0★ por la comunidad }
  </span>
</div>
```

_Nota: Si las estrellas no cargan, se aplica el fallback elegantly mostrando el texto de cortesía general._
