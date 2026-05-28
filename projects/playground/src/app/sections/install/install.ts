import { Component } from '@angular/core';

@Component({
  selector: 'app-install',
  standalone: true,
  template: `
    <section id="install">
      <div class="inner">
        <div class="section-label">Instalación</div>
        <h2>En marcha<br />en minutos.</h2>

        <div class="steps">

          <div class="step">
            <div class="step-num">01</div>
            <div class="step-body">
              <h3>Instalá</h3>
              <div class="code-block">
                <span class="prompt">$</span>
                <code>npm install jast-notification</code>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-num">02</div>
            <div class="step-body">
              <h3>Inyectá y usá</h3>
              <div class="code-block multiline">
                <pre><code>{{ usageCode }}</code></pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
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
    .code-block {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 13px;
      color: var(--text);
      .prompt { color: var(--text-secondary); }
      &.multiline {
        align-items: flex-start;
        pre { margin: 0; white-space: pre; }
        code { line-height: 1.75; }
      }
    }
  `]
})
export class InstallComponent {
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
}
