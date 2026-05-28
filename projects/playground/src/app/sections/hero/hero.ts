import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section>
      <div class="glow"></div>
      <div class="inner">
        <div class="cols">

          <div class="left">
            <div class="badge">Angular · CDK Overlay · Sin dependencias externas</div>
            <h1>Notificaciones toast<br /><span>como deben ser.</span></h1>
            <p>Biblioteca minimalista y animada para Angular.<br />6 posiciones. 4 tipos. Spring physics.</p>
            <div class="ctas">
              <a href="#demo" class="primary">Pruébalo ahora</a>
              <a href="#install" class="secondary">Empezar →</a>
            </div>
          </div>

          <div class="right">
            <div class="toasts-preview">

              <div class="deco-toast success">
                <div class="deco-tab">
                  <div class="deco-icon"></div>
                  <span class="deco-title">¡Operación exitosa!</span>
                </div>
                <div class="deco-body">
                  <div class="deco-body-inner">
                    <div class="deco-body-content">
                      <p class="deco-desc">Los cambios fueron guardados correctamente.</p>
                      <div class="deco-progress">
                        <div class="deco-bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="deco-toast warning">
                <div class="deco-tab">
                  <div class="deco-icon"></div>
                  <span class="deco-title">¿Eliminar elemento?</span>
                  <span class="deco-close">✕</span>
                </div>
                <div class="deco-body">
                  <div class="deco-body-inner">
                    <div class="deco-body-content">
                      <p class="deco-desc">Esta acción no se puede deshacer.</p>
                      <div class="deco-actions">
                        <button class="deco-action cancel">Cancelar</button>
                        <button class="deco-action confirm">Eliminar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="deco-toast info compact">
                <div class="deco-tab">
                  <div class="deco-icon"></div>
                  <span class="deco-title">Promesa resuelta</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    section {
      position: relative;
      min-height: 80vh;
      display: flex;
      align-items: center;
      padding: 100px 32px 60px;
      overflow: hidden;
    }
    .glow {
      position: absolute;
      top: -160px;
      left: 50%;
      transform: translateX(-50%);
      width: 800px;
      height: 700px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 65%);
      pointer-events: none;
    }
    .inner {
      max-width: var(--max-width);
      margin: 0 auto;
      width: 100%;
      position: relative;
    }
    .cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
    }
    .left {
      display: flex;
      flex-direction: column;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      font-size: 12px;
      font-weight: 500;
      color: var(--accent);
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(59, 130, 246, 0.18);
      border-radius: 100px;
      padding: 5px 14px;
      margin-bottom: 32px;
      letter-spacing: 0.3px;
      width: fit-content;
    }
    h1 {
      font-size: clamp(40px, 5.5vw, 72px);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: -2.5px;
      margin-bottom: 24px;
      color: var(--text);
      span { color: var(--accent); }
    }
    p {
      font-size: 17px;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 36px;
      max-width: 420px;
    }
    .ctas {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      align-items: center;
    }
    .primary {
      display: inline-flex;
      align-items: center;
      background: var(--accent);
      color: white;
      padding: 13px 28px;
      border-radius: 9px;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s;
      &:hover { opacity: 0.85; }
    }
    .secondary {
      display: inline-flex;
      align-items: center;
      color: var(--text-secondary);
      padding: 13px 4px;
      font-size: 15px;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.2s;
      &:hover { color: var(--text); }
    }

    /* ── Decorative toasts ─────────────────── */
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .toasts-preview {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 360px;
    }

    .deco-toast {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: system-ui, -apple-system, sans-serif;
      filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.18));
      --bg: #1c1c1e;
      --curve: 16px;
    }
    .deco-toast.success { --accent-color: #10b981; --icon-grad: linear-gradient(135deg, #10b981, #059669); }
    .deco-toast.warning { --accent-color: #f59e0b; --icon-grad: linear-gradient(135deg, #f59e0b, #d97706); }
    .deco-toast.info    { --accent-color: #3b82f6; --icon-grad: linear-gradient(135deg, #3b82f6, #6366f1); }

    .deco-tab {
      background: var(--bg);
      border-radius: 50px;
      padding: 9px 14px 9px 9px;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      z-index: 2;
      margin-bottom: -16px;
    }

    .deco-toast:not(.compact) .deco-tab::before,
    .deco-toast:not(.compact) .deco-tab::after {
      content: '';
      position: absolute;
      width: var(--curve);
      height: var(--curve);
      pointer-events: none;
      z-index: -1;
    }
    .deco-toast:not(.compact) .deco-tab::before {
      bottom: 15px;
      right: calc(100% - 1px);
      background: radial-gradient(circle at 0 0, transparent var(--curve), var(--bg) calc(var(--curve) + 0.5px));
    }
    .deco-toast:not(.compact) .deco-tab::after {
      bottom: 15px;
      left: calc(100% - 1px);
      background: radial-gradient(circle at 100% 0, transparent var(--curve), var(--bg) calc(var(--curve) + 0.5px));
    }

    .deco-icon {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--icon-grad);
      flex-shrink: 0;
    }
    .deco-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--accent-color);
      white-space: nowrap;
    }
    .deco-close {
      margin-left: auto;
      font-size: 11px;
      color: rgba(255,255,255,0.35);
      padding-left: 8px;
    }

    .deco-body {
      background: var(--bg);
      border-radius: 22px;
      width: 100%;
      position: relative;
      z-index: 1;
    }
    .deco-body-inner { padding: 0; }
    .deco-body-content { padding: 22px 18px 16px; }

    .deco-desc {
      color: #a1a1aa;
      font-size: 13px;
      line-height: 1.55;
      margin: 0;
    }

    .deco-progress {
      height: 2px;
      background: rgba(255,255,255,0.08);
      border-radius: 1px;
      overflow: hidden;
      margin-top: 14px;
    }
    .deco-bar {
      height: 100%;
      width: 55%;
      background: var(--accent-color);
      border-radius: 1px;
    }

    .deco-actions {
      display: flex;
      gap: 8px;
      margin-top: 14px;
    }
    .deco-action {
      flex: 1;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: default;
      font-family: inherit;
      border: none;
    }
    .deco-action.cancel {
      background: rgba(255,255,255,0.07);
      color: rgba(255,255,255,0.5);
    }
    .deco-action.confirm {
      background: #ffffff;
      color: #111111;
    }

    .compact .deco-tab { margin-bottom: 0; }
    .compact .deco-tab::before,
    .compact .deco-tab::after { display: none; }
  `]
})
export class HeroComponent {}
