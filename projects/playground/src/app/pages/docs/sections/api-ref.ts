import { Component } from '@angular/core';

@Component({
  selector: 'app-docs-api',
  standalone: true,
  template: `
    <div class="doc-content">

      <h1>API Reference</h1>
      <p class="intro">
        Referencia completa del servicio, la interfaz de configuración y los tipos disponibles.
      </p>

      <!-- Servicio -->
      <h2>JastNotificationService</h2>
      <p>Servicio inyectable disponible globalmente. Los métodos que muestran toasts retornan <code>JastToastRef</code>, un objeto awaitable con <code>id</code> y <code>dismiss()</code>:</p>
      <div class="method-table">
        <div class="method-header">
          <span>Método</span>
          <span>Parámetro</span>
          <span>Descripción</span>
        </div>
        @for (m of methods; track m.name) {
          <div class="method-row">
            <code class="method-name">{{ m.name }}</code>
            <code class="method-param">{{ m.param }}</code>
            <span class="method-desc">{{ m.desc }}</span>
          </div>
        }
      </div>

      <!-- Service property: maxToasts -->
      <div class="inline-prop">
        <code class="prop-name">maxToasts</code>
        <code class="prop-type">number</code>
        <code class="prop-default">Infinity</code>
        <span class="prop-desc">Límite de toasts visibles por posición. Al superarlo, descarta el más antiguo automáticamente.</span>
      </div>
      <div class="code-block">
        <pre><code>{{ maxToastsCode }}</code></pre>
      </div>

      <!-- JastToastConfig -->
      <h2>JastToastConfig</h2>
      <p>
        Objeto de configuración que reciben todos los métodos del servicio.
        Solo <code>title</code> es requerido.
      </p>
      <div class="prop-table">
        <div class="prop-header">
          <span>Propiedad</span>
          <span>Tipo</span>
          <span>Default</span>
          <span>Descripción</span>
        </div>
        @for (p of configProps; track p.name) {
          <div class="prop-row">
            <code class="prop-name" [class.required]="p.required">{{ p.name }}</code>
            <code class="prop-type">{{ p.type }}</code>
            <code class="prop-default">{{ p.default }}</code>
            <span class="prop-desc">{{ p.desc }}</span>
          </div>
        }
      </div>

      <!-- JastToastRef -->
      <h2>JastToastRef</h2>
      <p>
        Objeto retornado por todos los métodos que muestran toasts. Implementa <code>PromiseLike&lt;string | null&gt;</code>,
        por lo que podés usarlo con <code>await</code> directamente.
      </p>
      <div class="prop-table">
        <div class="prop-header">
          <span>Miembro</span>
          <span>Tipo</span>
          <span>Default</span>
          <span>Descripción</span>
        </div>
        @for (p of refMembers; track p.name) {
          <div class="prop-row">
            <code class="prop-name">{{ p.name }}</code>
            <code class="prop-type">{{ p.type }}</code>
            <code class="prop-default">{{ p.default }}</code>
            <span class="prop-desc">{{ p.desc }}</span>
          </div>
        }
      </div>
      <div class="code-block">
        <pre><code>{{ refCode }}</code></pre>
      </div>

      <!-- JastToastPromiseConfig -->
      <h2>JastToastPromiseConfig</h2>
      <p>Configuración para el método <code>promise()</code>. Define los mensajes para cada estado de la promesa.</p>
      <div class="prop-table">
        <div class="prop-header">
          <span>Propiedad</span>
          <span>Tipo</span>
          <span>Default</span>
          <span>Descripción</span>
        </div>
        @for (p of promiseConfigProps; track p.name) {
          <div class="prop-row">
            <code class="prop-name" [class.required]="p.required">{{ p.name }}</code>
            <code class="prop-type">{{ p.type }}</code>
            <code class="prop-default">{{ p.default }}</code>
            <span class="prop-desc">{{ p.desc }}</span>
          </div>
        }
      </div>
      <div class="code-block">
        <pre><code>{{ promiseCode }}</code></pre>
      </div>

      <!-- JastToastAction -->
      <h2>JastToastAction</h2>
      <p>
        Objeto para definir los botones de acción del toast de confirmación.
        Se pasa como array en la propiedad <code>actions</code> de <code>JastToastConfig</code>.
      </p>
      <div class="prop-table">
        <div class="prop-header">
          <span>Propiedad</span>
          <span>Tipo</span>
          <span>Default</span>
          <span>Descripción</span>
        </div>
        @for (p of actionProps; track p.name) {
          <div class="prop-row">
            <code class="prop-name required">{{ p.name }}</code>
            <code class="prop-type">{{ p.type }}</code>
            <code class="prop-default">{{ p.default }}</code>
            <span class="prop-desc">{{ p.desc }}</span>
          </div>
        }
      </div>
      <div class="code-block">
        <pre><code>{{ confirmExampleCode }}</code></pre>
      </div>

      <!-- JastToastStyles -->
      <h2>JastToastStyles</h2>
      <p>
        Objeto opcional dentro de <code>JastToastConfig</code> para aplicar clases CSS
        o Tailwind a elementos específicos del toast. Todas las propiedades son opcionales.
      </p>
      <div class="prop-table">
        <div class="prop-header">
          <span>Propiedad</span>
          <span>Tipo</span>
          <span>Elemento target</span>
        </div>
        @for (s of styleProps; track s.name) {
          <div class="prop-row styles-row">
            <code class="prop-name">{{ s.name }}</code>
            <code class="prop-type">{{ s.type }}</code>
            <span class="prop-desc">{{ s.target }}</span>
          </div>
        }
      </div>
      <div class="code-block">
        <pre><code>{{ stylesExampleCode }}</code></pre>
      </div>

      <!-- JastToastType -->
      <h2>JastToastType</h2>
      <p>Los cuatro tipos de notificación disponibles:</p>
      <div class="type-grid">
        @for (t of toastTypes; track t.value) {
          <div class="type-chip" [style.--color]="t.color">
            <span class="dot"></span>
            <code>{{ t.value }}</code>
          </div>
        }
      </div>
      <div class="code-block">
        <pre><code>{{ typeCode }}</code></pre>
      </div>

      <!-- JastToastPosition -->
      <h2>JastToastPosition</h2>
      <p>Las seis posiciones donde puede aparecer el toast en pantalla:</p>
      <div class="screen-preview">
        <div class="pos-label top-left">top-left</div>
        <div class="pos-label top-center">top-center</div>
        <div class="pos-label top-right">top-right</div>
        <div class="pos-label bottom-left">bottom-left</div>
        <div class="pos-label bottom-center">bottom-center</div>
        <div class="pos-label bottom-right">bottom-right</div>
      </div>
      <div class="code-block">
        <pre><code>{{ positionCode }}</code></pre>
      </div>

    </div>
  `,
  styles: [`
    .doc-content { max-width: 700px; }

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
    }
    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      background: var(--surface-2);
      padding: 2px 6px;
      border-radius: 4px;
      color: var(--text);
    }

    /* Tabla de métodos */
    .method-table, .prop-table {
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 14px;
      font-size: 13px;
    }
    .method-header, .prop-header {
      display: grid;
      padding: 10px 16px;
      background: var(--surface-2);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-secondary);
      gap: 16px;
    }
    .method-header  { grid-template-columns: 1.2fr 1.6fr 2fr; }
    .prop-header    { grid-template-columns: 1.2fr 1.4fr 1fr 2fr; }
    .prop-header:has(+ .styles-row) { grid-template-columns: 1.2fr 1fr 2fr; }

    .method-row, .prop-row {
      display: grid;
      gap: 16px;
      padding: 13px 16px;
      border-top: 1px solid var(--border);
      align-items: center;
    }
    .method-row  { grid-template-columns: 1.2fr 1.6fr 2fr; }
    .prop-row    { grid-template-columns: 1.2fr 1.4fr 1fr 2fr; }
    .styles-row  { grid-template-columns: 1.2fr 1fr 2fr; }

    .method-name, .prop-name {
      color: var(--accent);
      background: none;
      padding: 0;
    }
    .prop-name.required::after {
      content: '*';
      color: #ef4444;
      margin-left: 2px;
    }
    .method-param, .prop-type, .prop-default {
      color: var(--text-secondary);
      background: none;
      padding: 0;
    }
    .method-desc, .prop-desc { color: var(--text-secondary); }

    /* Type chips */
    .type-grid {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }
    .type-chip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--color);
        flex-shrink: 0;
      }
      code { background: none; padding: 0; }
    }

    /* Screen preview */
    .screen-preview {
      position: relative;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      aspect-ratio: 16 / 7;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .pos-label {
      position: absolute;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: var(--accent);
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 5px;
      padding: 4px 8px;
    }
    .top-left     { top: 12px;  left: 12px; }
    .top-center   { top: 12px;  left: 50%; transform: translateX(-50%); }
    .top-right    { top: 12px;  right: 12px; }
    .bottom-left  { bottom: 12px; left: 12px; }
    .bottom-center{ bottom: 12px; left: 50%; transform: translateX(-50%); }
    .bottom-right { bottom: 12px; right: 12px; }

    /* Inline property row */
    .inline-prop {
      display: grid;
      grid-template-columns: 1.2fr 1.4fr 1fr 2fr;
      gap: 16px;
      padding: 13px 16px;
      border: 1px solid var(--border);
      border-radius: 10px;
      align-items: center;
      font-size: 13px;
      margin-bottom: 14px;
    }

    /* Code block */
    .code-block {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 20px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--text);
      overflow-x: auto;
      margin: 14px 0;
      pre { margin: 0; white-space: pre; }
      code { background: none; padding: 0; border-radius: 0; font-size: inherit; line-height: 1.75; }
    }
  `]
})
export class ApiRefComponent {
  methods = [
    { name: 'show()',       param: 'JastToastConfig',                               desc: 'Muestra un toast con configuración completa. Retorna JastToastRef.' },
    { name: 'success()',    param: "Omit<JastToastConfig, 'type'>",                desc: "Atajo para type: 'success'. Retorna JastToastRef." },
    { name: 'error()',      param: "Omit<JastToastConfig, 'type'>",                desc: "Atajo para type: 'error'. Retorna JastToastRef." },
    { name: 'warning()',    param: "Omit<JastToastConfig, 'type'>",                desc: "Atajo para type: 'warning'. Retorna JastToastRef." },
    { name: 'info()',       param: "Omit<JastToastConfig, 'type'>",                desc: "Atajo para type: 'info'. Retorna JastToastRef." },
    { name: 'confirm()',    param: "Omit<JastToastConfig, 'type' | 'persistent'>", desc: "Toast persistente con acciones. Retorna JastToastRef (awaitable al role)." },
    { name: 'promise()',    param: 'Promise<T>, JastToastPromiseConfig',           desc: 'Muestra loading → éxito/error según el resultado de la promesa. Re-lanza el error.' },
    { name: 'dismiss()',    param: 'id: string',                                   desc: 'Cierra el toast con ese ID (obtenido del JastToastRef.id).' },
    { name: 'dismissAll()', param: '—',                                            desc: 'Cierra todos los toasts activos en todas las posiciones.' },
  ];

  configProps = [
    { name: 'title',       type: 'string',             default: '—',           required: true,  desc: 'Texto principal del toast.' },
    { name: 'description', type: 'string',             default: '—',           required: false, desc: 'Texto secundario debajo del título.' },
    { name: 'type',        type: 'JastToastType',      default: "'info'",      required: false, desc: 'Tipo visual de la notificación.' },
    { name: 'duration',    type: 'number',             default: '4000',        required: false, desc: 'Milisegundos hasta que se oculta.' },
    { name: 'position',    type: 'JastToastPosition',  default: "'top-right'", required: false, desc: 'Posición en pantalla.' },
    { name: 'styles',      type: 'JastToastStyles',    default: '—',           required: false, desc: 'Clases CSS o Tailwind por elemento.' },
    { name: 'actions',     type: 'JastToastAction[]',  default: '—',           required: false, desc: 'Botones de acción. Requiere persistent: true para que no se auto-cierre.' },
    { name: 'progress',    type: 'boolean',            default: 'false',       required: false, desc: 'Muestra una barra de progreso animada con la duración del toast.' },
    { name: 'persistent',  type: 'boolean',            default: 'false',       required: false, desc: 'Impide el cierre automático. El toast espera una acción del usuario.' },
  ];

  maxToastsCode = `// Limitar a 3 toasts visibles por posición
this.toast.maxToasts = 3;

// Solo 1 visible a la vez (comportamiento "replace")
this.toast.maxToasts = 1;`;

  refMembers = [
    { name: 'id',        type: 'string',              default: 'auto', desc: 'Identificador único del toast. Usalo con dismiss(id).' },
    { name: 'dismiss()', type: '() => void',           default: '—',    desc: 'Cierra este toast específico programáticamente.' },
    { name: 'then()',    type: 'PromiseLike<string | null>', default: '—', desc: 'Permite usar await directamente. Resuelve al role de la acción o null.' },
  ];

  refCode = `const ref = this.toast.success({ title: '¡Listo!' });

// Opción A — awaitable (resuelve cuando el toast cierra)
const role = await ref; // string | null

// Opción B — control programático
ref.dismiss();

// Opción C — guardar el ID para cerrar desde otro lado
this.toast.dismiss(ref.id);`;

  promiseConfigProps = [
    { name: 'loading',  type: 'string | { title, description? }', default: '—', required: true,  desc: 'Mensaje mientras la promesa está pendiente.' },
    { name: 'success',  type: 'string | { title, description? }', default: '—', required: true,  desc: 'Mensaje cuando la promesa resuelve.' },
    { name: 'error',    type: 'string | { title, description? }', default: '—', required: true,  desc: 'Mensaje cuando la promesa rechaza.' },
    { name: 'position', type: 'JastToastPosition',                default: "'top-right'", required: false, desc: 'Posición compartida para los tres estados.' },
  ];

  promiseCode = `// Forma corta (solo título)
await this.toast.promise(fetchData(), {
  loading: 'Cargando...',
  success: '¡Listo!',
  error:   'Algo falló.',
});

// Forma completa (título + descripción)
try {
  const result = await this.toast.promise(uploadFile(), {
    loading: { title: 'Subiendo...', description: 'Esperá un momento.' },
    success: { title: '¡Subido!',    description: 'El archivo fue procesado.' },
    error:   { title: 'Error',       description: 'Intentalo de nuevo.' },
    position: 'top-right',
  });
} catch {
  // el toast de error ya se mostró, manejá el estado acá
}`;

  actionProps = [
    { name: 'label', type: 'string', default: '—', desc: 'Texto visible en el botón.' },
    { name: 'role',  type: 'string', default: '—', desc: "Valor retornado por la Promise al hacer click. Usá 'cancel' para el estilo secundario." },
  ];

  confirmExampleCode = `// Confirm — espera la acción del usuario
const role = await this.toast.confirm({
  title: '¿Eliminar elemento?',
  description: 'Esta acción no se puede deshacer.',
  position: 'top-center',
  actions: [
    { label: 'Cancelar', role: 'cancel' },
    { label: 'Eliminar', role: 'confirm' },
  ],
});
// role === 'confirm' | 'cancel' | 'dismissed' | null

// Progress — barra de tiempo visual
this.toast.info({
  title: 'Procesando...',
  description: 'Esto tomará unos segundos.',
  progress: true,
  duration: 5000,
  position: 'bottom-center',
});

// Promise — esperá al cierre para encadenar acciones
await this.toast.success({
  title: '¡Guardado!',
  description: 'Esperando a que el toast cierre...',
  duration: 3000,
});
this.toast.info({ title: 'Promesa resuelta', description: 'El toast anterior ya cerró.' });`;

  toastTypes = [
    { value: 'success', color: '#10b981' },
    { value: 'error',   color: '#ef4444' },
    { value: 'warning', color: '#f59e0b' },
    { value: 'info',    color: '#3b82f6' },
  ];

  styleProps = [
    { name: 'tab',         type: 'string', target: 'El pill/tab que contiene el ícono y el título.' },
    { name: 'icon',        type: 'string', target: 'El círculo del ícono.' },
    { name: 'title',       type: 'string', target: 'El texto del título.' },
    { name: 'description', type: 'string', target: 'El texto de la descripción.' },
  ];

  stylesExampleCode = `// Con CSS puro
this.toast.success({
  title: 'Guardado',
  styles: {
    title: 'my-custom-title',
    description: 'my-custom-desc',
  }
});

// Con Tailwind
this.toast.error({
  title: 'Error crítico',
  description: 'Revisá los logs.',
  styles: {
    tab: 'bg-red-950!',
    title: 'text-red-400!',
    description: 'text-red-300/70!',
  }
});`;

  typeCode = `type JastToastType = 'success' | 'error' | 'warning' | 'info';`;

  positionCode = `type JastToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';`;
}
