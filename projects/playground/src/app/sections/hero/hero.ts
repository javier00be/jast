import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section>
      <!-- Fondos de brillo superpuestos de estilo aurora -->
      <div class="glow glow-blue"></div>
      <div class="glow glow-purple"></div>
      
      <div class="inner">
        <div class="cols">

          <div class="left">
            <!-- Badge premium de la marca -->
            <div class="badge">
              <span class="badge-brand">JAST</span>
              <span class="badge-separator"></span>
              <span class="badge-text">CDK Overlay Notification System</span>
            </div>

            <!-- Título principal imponente con gradiente animado -->
            <h1 class="hero-title">
              <span class="gradient-text">JAST</span>
              <br />
              Notificaciones toast<br />como deben ser.
            </h1>
            
            <p class="hero-desc">
              La biblioteca de notificaciones reactiva definitiva para Angular. 
              API nativa basada en Promises, cero dependencias externas y control total sobre el flujo de tu UI.
            </p>

            <div class="ctas">
              <a href="#demo" class="primary">Pruébalo ahora</a>
              <a href="#install" class="secondary">Empezar →</a>
            </div>
          </div>

          <div class="right">
            <!-- Toasts flotantes con animaciones asincrónicas de levitación -->
            <div class="toasts-preview">

              <div class="deco-toast success float-1">
                <div class="deco-tab">
                  <div class="deco-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span class="deco-title">JAST · ¡Guardado!</span>
                </div>
                <div class="deco-body">
                  <div class="deco-body-inner">
                    <div class="deco-body-content">
                      <p class="deco-desc">Los cambios se aplicaron en tu servidor correctamente.</p>
                      <div class="deco-progress">
                        <div class="deco-bar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="deco-toast warning float-2">
                <div class="deco-tab">
                  <div class="deco-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                  </div>
                  <span class="deco-title">JAST · ¿Confirmar borrado?</span>
                  <span class="deco-close">✕</span>
                </div>
                <div class="deco-body">
                  <div class="deco-body-inner">
                    <div class="deco-body-content">
                      <p class="deco-desc">Esta acción eliminará la base de datos permanentemente.</p>
                      <div class="deco-actions">
                        <button class="deco-action cancel">Cancelar</button>
                        <button class="deco-action confirm">Borrar todo</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="deco-toast info compact float-3">
                <div class="deco-tab">
                  <div class="deco-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="12"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                  </div>
                  <span class="deco-title">JAST · Promesa de API resuelta</span>
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
      min-height: 85vh;
      display: flex;
      align-items: center;
      padding: 120px 32px 80px;
      overflow: hidden;
      background: var(--bg);
    }

    /* Luces de fondo de estilo Aurora */
    .glow {
      position: absolute;
      width: 700px;
      height: 600px;
      border-radius: 50%;
      filter: blur(140px);
      pointer-events: none;
      opacity: 0.45;
      z-index: 0;
      mix-blend-mode: plus-lighter;
    }
    .glow-blue {
      top: -100px;
      left: 30%;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
      animation: drift-blue 20s infinite alternate ease-in-out;
    }
    .glow-purple {
      bottom: -100px;
      right: 20%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
      animation: drift-purple 20s infinite alternate ease-in-out;
    }

    @keyframes drift-blue {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(80px, 40px) scale(1.1); }
    }
    @keyframes drift-purple {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(-80px, -40px) scale(1.15); }
    }

    .inner {
      max-width: var(--max-width);
      margin: 0 auto;
      width: 100%;
      position: relative;
      z-index: 1;
    }
    .cols {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 80px;
      align-items: center;
    }
    .left {
      display: flex;
      flex-direction: column;
    }

    /* Badge Premium */
    .badge {
      display: inline-flex;
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 100px;
      padding: 6px 16px 6px 6px;
      margin-bottom: 32px;
      width: fit-content;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .badge-brand {
      background: linear-gradient(135deg, var(--accent), #8b5cf6);
      color: white;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 100px;
      margin-right: 10px;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
    }
    .badge-separator {
      width: 1px;
      height: 12px;
      background: var(--border);
      margin-right: 10px;
    }
    .badge-text {
      color: var(--text-secondary);
      text-transform: uppercase;
      font-weight: 600;
      font-size: 10px;
    }

    /* Título principal con degradado dinámico */
    .hero-title {
      font-size: clamp(38px, 4.5vw, 64px);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -2px;
      margin-bottom: 24px;
      color: var(--text);
    }
    .gradient-text {
      background: linear-gradient(135deg, var(--accent), #8b5cf6, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 900;
      letter-spacing: -3px;
      font-size: clamp(56px, 7vw, 86px);
      display: inline-block;
      margin-bottom: 8px;
      animation: shine 8s ease infinite alternate;
      background-size: 200% 200%;
    }

    @keyframes shine {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .hero-desc {
      font-size: 16px;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 40px;
      max-width: 480px;
    }

    .ctas {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      align-items: center;
    }
    .primary {
      display: inline-flex;
      align-items: center;
      background: var(--text);
      color: var(--bg);
      padding: 14px 32px;
      border-radius: 9px;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      &:hover {
        transform: translateY(-2px);
        background: var(--accent);
        color: white;
        box-shadow: 0 6px 18px rgba(59, 130, 246, 0.25);
      }
    }
    .secondary {
      display: inline-flex;
      align-items: center;
      color: var(--text-secondary);
      padding: 14px 18px;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
      border-radius: 9px;
      border: 1px solid transparent;
      &:hover {
        color: var(--text);
        background: var(--surface);
        border-color: var(--border);
      }
    }

    /* ── Decorative Toasts flotantes (Diseño Limpio y Levitante) ─────────────────── */
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .toasts-preview {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 100%;
      max-width: 360px;
      position: relative;
    }

    .deco-toast {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: system-ui, -apple-system, sans-serif;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 22px;
      --bg: #1c1c1e;
      --curve: 16px;
      background: var(--bg);
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.03) !important;
        border-color: rgba(255, 255, 255, 0.15);
      }
    }

    /* Levitación asincrónica */
    .float-1 { animation: float-1 7s infinite ease-in-out; }
    .float-2 { animation: float-2 9s infinite ease-in-out; }
    .float-3 { animation: float-3 8s infinite ease-in-out; }

    @keyframes float-1 {
      0%, 100% { transform: translateY(0) rotate(-0.5deg); }
      50% { transform: translateY(-10px) rotate(0.5deg); }
    }
    @keyframes float-2 {
      0%, 100% { transform: translateY(0) rotate(0.5deg); }
      50% { transform: translateY(-8px) rotate(-0.5deg); }
    }
    @keyframes float-3 {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
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
      border: 1px solid rgba(255, 255, 255, 0.04);
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
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      svg { width: 12px; height: 12px; color: white; }
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
      border: 1px solid rgba(255, 255, 255, 0.04);
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

    @media (max-width: 968px) {
      section { padding: 80px 24px 60px; min-height: auto; }
      .cols { grid-template-columns: 1fr; gap: 60px; text-align: center; }
      .badge, .ctas { margin-left: auto; margin-right: auto; justify-content: center; }
      .hero-desc { margin-left: auto; margin-right: auto; }
      .right { margin-top: 20px; }
    }
  `]
})
export class HeroComponent {}
