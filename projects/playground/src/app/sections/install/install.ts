import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-install',
  standalone: true,
  template: `
    <section id="install">
      <div class="inner">
        <div class="section-label">Instalación</div>
        <h2>En marcha en minutos.</h2>

        <div class="steps">
          <div class="step">
            <div class="step-num">01</div>
            <div class="step-body">
              <h3>Instalá</h3>
              <div class="code-block">
                <button
                  class="copy-btn"
                  [class.copied]="copiedInstall()"
                  (click)="copyCode('npm install jast-notification', 'install')"
                >
                  @if (copiedInstall()) {
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>¡Copiado!</span>
                  } @else {
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copiar</span>
                  }
                </button>
                <pre><code><span class="prompt">$</span> npm install jast-notification</code></pre>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-num">02</div>
            <div class="step-body">
              <h3>Inyectá y usá</h3>
              <div class="code-block multiline">
                <button
                  class="copy-btn"
                  [class.copied]="copiedUsage()"
                  (click)="copyCode(usageCode, 'usage')"
                >
                  @if (copiedUsage()) {
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>¡Copiado!</span>
                  } @else {
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                    <span>Copiar</span>
                  }
                </button>
                <pre><code>{{ usageCode }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      section {
        padding: 60px 32px 80px;
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
      .steps {
        display: grid;
        grid-template-columns: 1fr 1.6fr;
        gap: 40px;
        align-items: start;
      }
      .step {
        display: flex;
        gap: 20px;
        align-items: flex-start;
      }
      .step-num {
        font-size: 11px;
        font-weight: 700;
        color: var(--accent);
        letter-spacing: 1px;
        padding-top: 3px;
        flex-shrink: 0;
        width: 24px;
      }
      .step-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
        h3 {
          font-size: 15px;
          font-weight: 600;
        }
      }
      @media (max-width: 768px) {
        section {
          padding: 40px 16px;
        }
        .steps {
          grid-template-columns: 1fr;
          gap: 28px;
        }
        .step {
          width: 100%;
          min-width: 0;
        }
        .step-body {
          min-width: 0;
        }
        .code-block {
          max-width: 100%;
        }
      }
    `,
  ],
})
export class InstallComponent {
  copiedInstall = signal(false);
  copiedUsage = signal(false);

  usageCode = `import { Component, inject } from '@angular/core';
import { JastNotificationService } from 'jast-notification';

@Component({ standalone: true, template: \`...\` })
export class MyComponent {
  private toast = inject(JastNotificationService);

  save() {
    this.toast.success({
      title: 'Saved!',
      description: 'Your changes were saved successfully.'
    });
  }
}`;

  copyCode(text: string, type: 'install' | 'usage') {
    navigator.clipboard.writeText(text);
    if (type === 'install') {
      this.copiedInstall.set(true);
      setTimeout(() => this.copiedInstall.set(false), 2000);
    } else {
      this.copiedUsage.set(true);
      setTimeout(() => this.copiedUsage.set(false), 2000);
    }
  }
}
