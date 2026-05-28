import { Component } from '@angular/core';

@Component({
  selector: 'app-docs',
  standalone: true,
  template: `
    <section id="docs">
      <div class="inner">
        <div class="section-label">Documentación</div>
        <h2>Todo lo que necesitás saber.</h2>

        <!-- Básicos -->
        <div class="doc-block">
          <div class="doc-header">
            <h3>Básicos</h3>
            <p>
              Inyectá <code>JastNotificationService</code> en cualquier componente y usá los métodos
              disponibles. No requiere configuración adicional — el servicio está disponible
              globalmente con <code>providedIn: 'root'</code>.
            </p>
          </div>
          <div class="code-block">
            <pre><code>{{ basicsCode }}</code></pre>
          </div>
        </div>

        <!-- API Reference -->
        <div class="doc-block api">
          <div class="doc-header">
            <h3>API Reference</h3>
            <p>
              Todos los métodos aceptan un objeto <code>JastToastConfig</code>. Solo
              <code>title</code> es requerido, el resto es opcional.
            </p>
          </div>
          <div class="api-table">
            <div class="api-header-row">
              <span>Propiedad</span>
              <span>Tipo</span>
              <span>Descripción</span>
            </div>
            @for (prop of apiProps; track prop.name) {
              <div class="api-row">
                <code class="prop-name">{{ prop.name }}</code>
                <code class="prop-type">{{ prop.type }}</code>
                <span class="prop-desc">{{ prop.desc }}</span>
              </div>
            }
          </div>
        </div>

        <!-- Styling -->
        <div class="doc-block">
          <div class="doc-header">
            <h3>Personalización</h3>
            <p>
              Los toasts exponen CSS custom properties que podés sobreescribir desde tus estilos
              globales. Aplicalas sobre la clase <code>.jast-toast</code>
              para que afecten a todas las instancias.
            </p>
          </div>
          <div class="code-block">
            <pre><code>{{ stylingCode }}</code></pre>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        padding: 60px 32px 80px;
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
        margin-bottom: 56px;
      }

      /* Bloque base: dos columnas */
      .doc-block {
        display: grid;
        grid-template-columns: 1fr 1.6fr;
        gap: 48px;
        align-items: start;
        padding: 40px 0;
        border-top: 1px solid var(--border);
      }

      /* API usa ancho completo */
      .doc-block.api {
        grid-template-columns: 1fr;
        gap: 24px;
        .doc-header p {
          max-width: 540px;
        }
      }

      .doc-header {
        display: flex;
        flex-direction: column;
        gap: 10px;
        h3 {
          font-size: 16px;
          font-weight: 600;
        }
        p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }
        code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          background: var(--surface-2);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--text);
        }
      }

      .code-block {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 20px;
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 13px;
        color: var(--text);
        overflow-x: auto;
        pre {
          margin: 0;
          white-space: pre;
        }
        code {
          line-height: 1.75;
        }
      }

      /* Tabla API */
      .api-table {
        border: 1px solid var(--border);
        border-radius: 10px;
        overflow: hidden;
      }
      .api-header-row {
        display: grid;
        grid-template-columns: 1.2fr 1.4fr 2fr;
        gap: 16px;
        padding: 10px 18px;
        background: var(--surface-2);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--text-secondary);
      }
      .api-row {
        display: grid;
        grid-template-columns: 1.2fr 1.4fr 2fr;
        gap: 16px;
        padding: 14px 18px;
        border-top: 1px solid var(--border);
        align-items: center;
        font-size: 13px;
      }
      .prop-name {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: var(--accent);
      }
      .prop-type {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        color: var(--text-secondary);
      }
      .prop-desc {
        color: var(--text-secondary);
      }
    `,
  ],
})
export class DocsComponent {
  apiProps = [
    { name: 'title', type: 'string', desc: 'Texto principal del toast. Requerido.' },
    { name: 'description', type: 'string?', desc: 'Texto secundario debajo del título.' },
    {
      name: 'type',
      type: 'JastToastType?',
      desc: "'success' | 'error' | 'warning' | 'info'. Default: 'info'.",
    },
    { name: 'duration', type: 'number?', desc: 'Tiempo visible en milisegundos. Default: 3000.' },
    {
      name: 'position',
      type: 'JastToastPosition?',
      desc: "Posición en pantalla. Default: 'top-right'.",
    },
  ];

  basicsCode = `import { inject } from '@angular/core';
import { JastNotificationService } from 'jast-notification';

export class MyComponent {
  private toast = inject(JastNotificationService);

  // Métodos abreviados
  this.toast.success({ title: 'Guardado', description: 'Los cambios se aplicaron.' });
  this.toast.error({ title: 'Error', description: 'No se pudo completar la acción.' });

  // Método genérico — control total sobre la configuración
  this.toast.show({
    type: 'warning',
    title: 'Atención',
    description: 'Esta acción no se puede deshacer.',
    position: 'bottom-right',
    duration: 5000,
  });
}`;

  stylingCode = `/* En tu styles.scss global */
.jast-toast {
  --toast-bg: #1c1c1e;    /* Fondo del toast */
  --toast-text: #ffffff;  /* Color del título */
  --toast-desc: #a1a1aa;  /* Color de la descripción */
  --curve-size: 16px;     /* Radio de las curvas cóncavas */
}`;
}
