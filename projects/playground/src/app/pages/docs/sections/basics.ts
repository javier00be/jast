import { Component } from '@angular/core';

@Component({
  selector: 'app-docs-basics',
  standalone: true,
  template: `
    <div class="doc-content">

      <h1>Básicos</h1>
      <p class="intro">
        Todo lo que necesitás para empezar a usar <code>jast-notification</code>
        en tu proyecto Angular desde cero.
      </p>

      <h2>¿Qué es jast-notification?</h2>
      <p>
        Una biblioteca de notificaciones toast para Angular con una API completamente
        basada en Promises. Construida sobre <code>@angular/cdk/overlay</code> —
        sin dependencias externas adicionales.
      </p>
      <p>
        Cada toast es un objeto awaitable (<code>JastToastRef</code>): podés esperar
        a que cierre, cancelarlo programáticamente, o encadenar acciones. El servicio
        maneja posicionamiento, apilado, animaciones spring physics y limpieza del DOM
        de forma automática.
      </p>
      <p>
        Como es <code>providedIn: 'root'</code>, no necesitás configurarlo en ningún
        módulo ni en <code>app.config.ts</code>. Lo inyectás y listo.
      </p>

      <h2>Requisitos</h2>
      <p>Antes de instalar, asegurate de cumplir con los siguientes requisitos:</p>
      <div class="req-list">
        <div class="req-item">
          <code>Angular</code>
          <span>17 o superior</span>
        </div>
        <div class="req-item">
          <code>@angular/cdk</code>
          <span>Peer dependency — necesario para el Overlay</span>
        </div>
      </div>

      <h2>Instalación</h2>
      <p>Instalá el paquete principal de la biblioteca vía npm:</p>
      
      <div class="code-editor">
        <div class="editor-header">
          <div class="window-buttons">
            <span class="dot close"></span>
            <span class="dot minimize"></span>
            <span class="dot expand"></span>
          </div>
          <span class="editor-title">bash — install jast-notification</span>
        </div>
        <div class="editor-body">
          <button class="copy-btn" [class.copied]="copiedJast" (click)="copyCommand('npm install jast-notification', 'jast')">
            @if (copiedJast) {
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>¡Copiado!</span>
            } @else {
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copiar</span>
            }
          </button>
          <div class="editor-lines">
            <div class="editor-line">
              <span class="prompt">~</span>
              <span class="prompt cmd-sign">$</span>
              <span class="command">npm install jast-notification</span>
            </div>
          </div>
        </div>
      </div>

      <p>Si todavía no tenés <code>&#64;angular/cdk</code> en tu proyecto, es necesario instalarlo como dependencia de pares (peer dependency):</p>
      
      <div class="code-editor">
        <div class="editor-header">
          <div class="window-buttons">
            <span class="dot close"></span>
            <span class="dot minimize"></span>
            <span class="dot expand"></span>
          </div>
          <span class="editor-title">bash — install angular-cdk</span>
        </div>
        <div class="editor-body">
          <button class="copy-btn" [class.copied]="copiedCdk" (click)="copyCommand('npm install @angular/cdk', 'cdk')">
            @if (copiedCdk) {
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>¡Copiado!</span>
            } @else {
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copiar</span>
            }
          </button>
          <div class="editor-lines">
            <div class="editor-line">
              <span class="prompt">~</span>
              <span class="prompt cmd-sign">$</span>
              <span class="command">npm install &#64;angular/cdk</span>
            </div>
          </div>
        </div>
      </div>

      <h2>Tu primer toast</h2>
      <p>
        Inyectá <code>JastNotificationService</code> en cualquier componente standalone
        y llamá a uno de sus métodos. No hace falta importar nada en el template.
      </p>
      <div class="code-block">
        <pre><code>{{ firstToastCode }}</code></pre>
      </div>

      <h2>Métodos disponibles</h2>
      <p>
        El servicio expone métodos abreviados para los tipos más comunes y un método
        genérico <code>show()</code> que acepta configuración completa.
      </p>
      <div class="code-block">
        <pre><code>{{ methodsCode }}</code></pre>
      </div>
      <p class="note">
        <strong>Nota:</strong> <code>success()</code> y <code>error()</code> son atajos que
        omiten el campo <code>type</code>. Para <code>'warning'</code> e <code>'info'</code>
        usá <code>show()</code> con el tipo explícito.
      </p>

    </div>
  `,
  styles: [`
    .doc-content { max-width: 680px; }

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
    .req-list {
      display: flex;
      flex-direction: column;
      gap: 1px;
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 14px;
    }
    .req-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 18px;
      background: var(--surface);
      font-size: 13px;
      code { color: var(--accent); }
      span { color: var(--text-secondary); }
    }
    .note {
      background: rgba(59, 130, 246, 0.05);
      border: 1px solid rgba(59, 130, 246, 0.15);
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 13px;
      color: var(--text-secondary);
      strong { color: var(--text); }
    }

  `]
})
export class BasicsComponent {
  copiedJast = false;
  copiedCdk = false;

  copyCommand(text: string, type: 'jast' | 'cdk') {
    navigator.clipboard.writeText(text);
    if (type === 'jast') {
      this.copiedJast = true;
      setTimeout(() => this.copiedJast = false, 2000);
    } else {
      this.copiedCdk = true;
      setTimeout(() => this.copiedCdk = false, 2000);
    }
  }

  firstToastCode = `import { Component, inject } from '@angular/core';
import { JastNotificationService } from 'jast-notification';

@Component({
  standalone: true,
  selector: 'app-example',
  template: \`<button (click)="guardar()">Guardar</button>\`
})
export class ExampleComponent {
  private toast = inject(JastNotificationService);

  guardar() {
    this.toast.success({
      title: '¡Guardado!',
      description: 'Los cambios se aplicaron correctamente.'
    });
  }
}`;

  methodsCode = `// Método abreviado — success
this.toast.success({ title: '¡Listo!', description: 'Operación completada.' });

// Método abreviado — error
this.toast.error({ title: 'Error', description: 'No se pudo completar.' });

// Método genérico — control total
this.toast.show({
  type: 'warning',         // 'success' | 'error' | 'warning' | 'info'
  title: 'Atención',
  description: 'Esta acción no se puede deshacer.',
  position: 'bottom-right', // ver todas las posiciones en API Reference
  duration: 6000,           // ms hasta que se oculta (default: 4000)
});`;
}
