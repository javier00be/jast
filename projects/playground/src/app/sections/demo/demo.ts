import { Component, inject, signal } from '@angular/core';
import { JastNotificationService, JastToastPosition, JastToastType, JastToastPromiseConfig } from 'jast-notification';

@Component({
  selector: 'app-demo',
  standalone: true,
  template: `
    <section id="demo">
      <div class="inner">
        <div class="cols">
          <div class="left">
            <div class="section-label">Playground</div>
            <h2>Pruébalo tú mismo.</h2>
            <p class="subtitle">Elegí un tipo y hacé click en una posición para disparar el toast.</p>
            <div class="type-row">
              @for (t of types; track t.value) {
                <button
                  class="type-btn"
                  [class.active]="selectedType() === t.value"
                  [style.--color]="t.color"
                  (click)="selectedType.set(t.value)">
                  <span class="dot"></span>{{ t.label }}
                </button>
              }
            </div>
            <p class="hint">Hacé click en cualquier flecha para disparar el toast en esa posición</p>

            <div class="extras">
              <button class="extra-btn" (click)="fireConfirm()">
                <span class="extra-icon">⚡</span>
                <div>
                  <strong>Confirmación</strong>
                  <span>Toast con acciones</span>
                </div>
              </button>
              <button class="extra-btn" (click)="fireProgress()">
                <span class="extra-icon">⏱</span>
                <div>
                  <strong>Con progreso</strong>
                  <span>Barra de tiempo</span>
                </div>
              </button>
              <button class="extra-btn" (click)="firePromise()">
                <span class="extra-icon">⏳</span>
                <div>
                  <strong>Promesa</strong>
                  <span>Esperá al cierre</span>
                </div>
              </button>
              <button class="extra-btn" (click)="fireAutoPromise()">
                <span class="extra-icon">🔄</span>
                <div>
                  <strong>toast.promise()</strong>
                  <span>Loading → éxito / error</span>
                </div>
              </button>
            </div>

            @if (confirmResult()) {
              <p class="confirm-result">
                Resultado: <code>{{ confirmResult() }}</code>
              </p>
            }
          </div>

          <div class="right">
            <div class="screen">
              <div class="pos-grid">
                <button class="pos-btn" (click)="fire('top-left')" title="top-left">↖</button>
                <button class="pos-btn" (click)="fire('top-center')" title="top-center">↑</button>
                <button class="pos-btn" (click)="fire('top-right')" title="top-right">↗</button>
                <button class="pos-btn" (click)="fire('bottom-left')" title="bottom-left">↙</button>
                <button class="pos-btn" (click)="fire('bottom-center')" title="bottom-center">↓</button>
                <button class="pos-btn" (click)="fire('bottom-right')" title="bottom-right">↘</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      padding: 60px 32px;
      background: var(--surface);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .inner {
      max-width: var(--max-width);
      margin: 0 auto;
    }
    .cols {
      display: grid;
      grid-template-columns: 1fr 1.6fr;
      gap: 64px;
      align-items: center;
    }
    .left {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--accent);
    }
    h2 {
      font-size: clamp(28px, 4vw, 44px);
      font-weight: 700;
      letter-spacing: -1.2px;
      margin: 0;
    }
    .subtitle {
      font-size: 15px;
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .type-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .type-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text-secondary);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
      .dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--color);
        opacity: 0.4;
        transition: opacity 0.15s;
        flex-shrink: 0;
      }
      &:hover { color: var(--text); border-color: rgba(255, 255, 255, 0.15); }
      &.active {
        color: var(--text);
        border-color: var(--color);
        .dot { opacity: 1; }
      }
    }
    .screen {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      aspect-ratio: 16 / 8;
      display: flex;
      align-items: stretch;
    }
    .pos-grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 8px;
    }
    .pos-btn {
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text-secondary);
      border-radius: 8px;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.15s;
      font-family: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: rgba(59, 130, 246, 0.08);
        border-color: rgba(59, 130, 246, 0.25);
        color: var(--text);
        transform: scale(1.05);
      }
      &:active { transform: scale(0.95); }
    }
    .hint {
      font-size: 12px;
      color: var(--text-secondary);
      opacity: 0.5;
    }
    .extras {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 8px;
    }
    .extra-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: var(--bg);
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      transition: border-color 0.15s;
      .extra-icon { font-size: 18px; flex-shrink: 0; }
      strong { display: block; font-size: 13px; color: var(--text); }
      span { font-size: 12px; color: var(--text-secondary); }
      &:hover { border-color: rgba(59, 130, 246, 0.3); }
    }
    .confirm-result {
      font-size: 13px;
      color: var(--text-secondary);
      margin-top: 8px;
      code {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: var(--accent);
      }
    }
  `]
})
export class DemoComponent {
  private jast = inject(JastNotificationService);
  selectedType = signal<JastToastType>('success');
  confirmResult = signal<string | null>(null);

  types: { value: JastToastType; label: string; color: string }[] = [
    { value: 'success', label: 'Éxito',        color: '#10b981' },
    { value: 'error',   label: 'Error',         color: '#ef4444' },
    { value: 'warning', label: 'Advertencia',   color: '#f59e0b' },
    { value: 'info',    label: 'Información',   color: '#3b82f6' },
  ];

  private messages: Record<JastToastType, { title: string; description: string }> = {
    success: { title: 'Operación exitosa',      description: 'Los cambios fueron guardados.' },
    error:   { title: 'Algo salió mal',         description: 'Intentalo de nuevo más tarde.' },
    warning: { title: 'Atención',               description: 'Esta acción no se puede deshacer.' },
    info:    { title: 'Para que sepas',         description: 'Hay actualizaciones disponibles.' },
  };

  fire(position: JastToastPosition): void {
    this.jast.dismissAll();
    const msg = this.messages[this.selectedType()];
    this.jast.show({ type: this.selectedType(), position, ...msg });
  }

  async fireConfirm(): Promise<void> {
    this.confirmResult.set(null);
    const role = await this.jast.confirm({
      title: '¿Eliminar elemento?',
      description: 'Esta acción no se puede deshacer.',
      position: 'top-center',
      actions: [
        { label: 'Cancelar', role: 'cancel' },
        { label: 'Eliminar', role: 'confirm' },
      ],
    });
    this.confirmResult.set(role ?? 'dismissed');
  }

  fireProgress(): void {
    this.jast.info({
      title: 'Procesando...',
      description: 'Esto tomará unos segundos.',
      progress: true,
      duration: 5000,
      position: 'bottom-center',
    });
  }

  async firePromise(): Promise<void> {
    await this.jast.success({
      title: '¡Guardado!',
      description: 'Esperando a que el toast cierre...',
      duration: 3000,
      position: 'top-right',
    });
    this.jast.info({
      title: 'Promesa resuelta',
      description: 'El toast anterior ya cerró.',
      position: 'top-right',
    });
  }

  async fireAutoPromise(): Promise<void> {
    const fakeUpload = new Promise<void>((resolve, reject) =>
      setTimeout(() => (Math.random() > 0.4 ? resolve() : reject(new Error())), 2000)
    );

    try {
      await this.jast.promise(fakeUpload, {
        loading: { title: 'Subiendo archivo...', description: 'Esperá un momento.' },
        success: { title: '¡Subido!',            description: 'El archivo fue procesado.' },
        error:   { title: 'Error al subir',      description: 'Intentalo de nuevo.' },
        position: 'top-right',
      });
    } catch {
      // el toast de error ya se mostró
    }
  }
}
