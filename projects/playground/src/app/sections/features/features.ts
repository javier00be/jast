import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: true,
  template: `
    <section>
      <div class="inner">
        <div class="section-label">Características</div>
        <h2>Todo lo que necesitás,<br />nada que no.</h2>
        <div class="grid">
          <div class="card">
            <div class="icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4">
                <rect x="1" y="1" width="5" height="5" rx="1.5" />
                <rect x="7.5" y="1" width="5" height="5" rx="1.5" opacity="0.3" />
                <rect x="14" y="1" width="5" height="5" rx="1.5" />
                <rect x="7.5" y="7.5" width="5" height="5" rx="1.5" />
                <rect x="1" y="14" width="5" height="5" rx="1.5" />
                <rect x="7.5" y="14" width="5" height="5" rx="1.5" opacity="0.3" />
                <rect x="14" y="14" width="5" height="5" rx="1.5" />
              </svg>
            </div>
            <h3>6 posiciones</h3>
            <p>
              Arriba, abajo, izquierda, derecha — todas las combinaciones perimetrales listas para
              usar.
            </p>
          </div>

          <div class="card">
            <div class="icon">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="5" cy="5" r="3.5" fill="#10b981" />
                <circle cx="15" cy="5" r="3.5" fill="#ef4444" />
                <circle cx="5" cy="15" r="3.5" fill="#f59e0b" />
                <circle cx="15" cy="15" r="3.5" fill="#3b82f6" />
              </svg>
            </div>
            <h3>4 tipos</h3>
            <p>Éxito, error, advertencia e información — cada uno con colores e íconos propios.</p>
          </div>

          <div class="card">
            <div class="icon">
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              >
                <path d="M1 13 C4 13 4 7 7 7 C10 7 10 13 13 13 C16 13 16 7 19 7" />
              </svg>
            </div>
            <h3>Animaciones con spring</h3>
            <p>Entrada y salida fluidas con cubic-bezier spring physics. Sin saltos ni cortes.</p>
          </div>

          <div class="card">
            <div class="icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4">
                <rect x="2" y="7" width="16" height="11" rx="2" />
                <rect x="5" y="3" width="10" height="8" rx="2" />
              </svg>
            </div>
            <h3>Basado en Angular CDK</h3>
            <p>Usa CDK Overlay para manejo correcto de z-index, posicionamiento y portales.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        padding: 60px 32px;
        border-top: 1px solid var(--border);
      }
      .inner {
        max-width: var(--max-width);
        margin: 0 auto;
      }
      .section-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--accent);
        margin-bottom: 16px;
      }
      h2 {
        font-size: clamp(28px, 4vw, 44px);
        font-weight: 700;
        letter-spacing: -1.2px;
        line-height: 1.15;
        margin-bottom: 36px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1px;
        background: var(--border);
        border: 1px solid var(--border);
        border-radius: 16px;
        overflow: hidden;
      }
      .card {
        padding: 32px;
        background: var(--surface);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .icon {
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--surface-2);
        border-radius: 10px;
        margin-bottom: 4px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
      h3 {
        font-size: 15px;
        font-weight: 600;
        letter-spacing: -0.2px;
      }
      p {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.65;
      }
    `,
  ],
})
export class FeaturesComponent {}
