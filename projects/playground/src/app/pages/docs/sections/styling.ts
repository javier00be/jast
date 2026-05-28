import { Component } from '@angular/core';

@Component({
  selector: 'app-docs-styling',
  standalone: true,
  template: `
    <div class="doc-content">
      <h1>Personalización</h1>
      <p class="intro">
        Los toasts exponen CSS custom properties que podés sobreescribir desde tus estilos globales.
        También podés targetear clases específicas para cambiar colores por tipo.
      </p>

      <!-- CSS Custom Properties -->
      <h2>CSS Custom Properties</h2>
      <p>
        Estas variables están definidas en el componente <code>.jast-toast</code> y podés
        sobreescribirlas globalmente desde tu <code>styles.scss</code>.
      </p>
      <div class="prop-table">
        <div class="prop-header">
          <span>Variable</span>
          <span>Default</span>
          <span>Descripción</span>
        </div>
        @for (v of cssVars; track v.name) {
          <div class="prop-row">
            <code class="var-name">{{ v.name }}</code>
            <code class="var-default">{{ v.default }}</code>
            <span class="var-desc">{{ v.desc }}</span>
          </div>
        }
      </div>

      <!-- Override global -->
      <h2>Override global</h2>
      <p>
        Para aplicar un estilo a todos los toasts de tu aplicación, sobreescribí las variables en la
        clase <code>.jast-toast</code> desde tu <code>styles.scss</code> global. Como los toasts se
        renderizan en un CDK Overlay fuera del árbol de componentes, los estilos deben ser globales.
      </p>
      <div class="code-block">
        <pre><code>{{ globalOverrideCode }}</code></pre>
      </div>

      <!-- Override por tipo -->
      <h2>Override por tipo</h2>
      <p>
        Cada tipo de notificación agrega una clase al elemento raíz:
        <code>.success</code>, <code>.error</code>, <code>.warning</code>, <code>.info</code>. Podés
        usarlas para personalizar colores por tipo.
      </p>
      <div class="type-classes">
        @for (t of typeClasses; track t.cls) {
          <div class="type-row">
            <span class="dot" [style.background]="t.color"></span>
            <code>{{ t.cls }}</code>
          </div>
        }
      </div>
      <div class="code-block">
        <pre><code>{{ typeOverrideCode }}</code></pre>
      </div>

      <!-- Nota sobre ViewEncapsulation -->
      <h2>Importante</h2>
      <p>
        Los toasts se renderizan en un CDK Overlay — un portal fuera del árbol de componentes. Esto
        significa que los estilos encapsulados (dentro de un componente)
        <strong>no los afectan</strong>. Usá siempre <code>styles.scss</code> global o un archivo de
        estilos sin encapsulamiento.
      </p>
      <div class="warning-box">
        <strong>No funciona</strong> poner los overrides en los estilos de un componente con
        encapsulamiento (<code>ViewEncapsulation.Emulated</code>, que es el default de Angular). Los
        selectores generados no van a matchear los elementos del overlay.
      </div>
    </div>
  `,
  styles: [
    `
      .doc-content {
        max-width: 680px;
      }

      h1 {
        font-size: 30px;
        font-weight: 700;
        letter-spacing: -1px;
        margin-bottom: 12px;
      }
      .intro {
        font-size: 16px;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 48px;
        border-bottom: 1px solid var(--border);
        padding-bottom: 32px;
      }
      h2 {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.3px;
        margin: 40px 0 14px;
      }
      p {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.75;
        margin-bottom: 14px;
        strong {
          color: var(--text);
        }
      }
      code {
        font-family: 'JetBrains Mono', monospace;
        font-size: 12px;
        background: var(--surface-2);
        padding: 2px 6px;
        border-radius: 4px;
        color: var(--text);
      }

      /* Tabla */
      .prop-table {
        border: 1px solid var(--border);
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 14px;
        font-size: 13px;
      }
      .prop-header {
        display: grid;
        grid-template-columns: 1.4fr 1fr 2fr;
        gap: 16px;
        padding: 10px 16px;
        background: var(--surface-2);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--text-secondary);
      }
      .prop-row {
        display: grid;
        grid-template-columns: 1.4fr 1fr 2fr;
        gap: 16px;
        padding: 13px 16px;
        border-top: 1px solid var(--border);
        align-items: center;
      }
      .var-name {
        color: var(--accent);
        background: none;
        padding: 0;
      }
      .var-default {
        color: var(--text-secondary);
        background: none;
        padding: 0;
      }
      .var-desc {
        color: var(--text-secondary);
        font-size: 13px;
      }

      /* Type classes */
      .type-classes {
        display: flex;
        flex-direction: column;
        gap: 1px;
        border: 1px solid var(--border);
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 14px;
      }
      .type-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 11px 16px;
        background: var(--surface);
        font-size: 13px;
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        code {
          background: none;
          padding: 0;
        }
      }

      /* Warning */
      .warning-box {
        background: rgba(245, 158, 11, 0.06);
        border: 1px solid rgba(245, 158, 11, 0.2);
        border-radius: 8px;
        padding: 14px 16px;
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.65;
        strong {
          color: #92400e;
        }
        code {
          font-size: 12px;
        }
      }
    `,
  ],
})
export class StylingComponent {
  cssVars = [
    { name: '--toast-bg', default: '#1c1c1e', desc: 'Color de fondo del toast.' },
    { name: '--toast-desc', default: '#a1a1aa', desc: 'Color del texto de la descripción.' },
    {
      name: '--curve-size',
      default: '16px',
      desc: 'Radio de las curvas cóncavas que conectan el tab con el body.',
    },
  ];

  typeClasses = [
    { cls: '.jast-toast.success', color: '#10b981' },
    { cls: '.jast-toast.error', color: '#ef4444' },
    { cls: '.jast-toast.warning', color: '#f59e0b' },
    { cls: '.jast-toast.info', color: '#3b82f6' },
  ];

  globalOverrideCode = `/* styles.scss — override global */
.jast-toast {
  --toast-bg: #ffffff;    /* fondo blanco */
  --toast-desc: #555555;  /* descripción gris oscuro */
  --curve-size: 20px;     /* curvas más pronunciadas */
}`;

  typeOverrideCode = `/* Personalizar colores del ícono y título por tipo */
.jast-toast.success .jast-icon {
  background: linear-gradient(135deg, #8b5cf6, #6d28d9); /* violeta */
}
.jast-toast.success .jast-title {
  color: #8b5cf6;
}

/* Override solo el fondo para error */
.jast-toast.error {
  --toast-bg: #2d1a1a;
}`;
}
