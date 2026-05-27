import { Component, Input, ChangeDetectorRef, inject } from '@angular/core';
import { JastToastConfig } from './jast-toast.types';

@Component({
  selector: 'jast-toast',
  standalone: true,
  template: `
    <div [class]="toastClass">

      <div class="jast-tab">
        <div class="jast-icon">
          @switch (config.type) {
            @case ('success') {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            }
            @case ('error') {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            }
            @case ('warning') {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            }
            @default {
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="12"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
            }
          }
        </div>
        <strong class="jast-title">{{ config.title }}</strong>
      </div>

      @if (config.description) {
        <div class="jast-body">
          <div class="jast-body-inner">
            <div class="jast-body-content">
              <p class="jast-description">{{ config.description }}</p>
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .jast-toast {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: system-ui, -apple-system, sans-serif;
      animation: toast-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      
      /* Variables del diseño unificado */
      --toast-bg: #1c1c1e;
      --toast-text: #ffffff;
      --toast-desc: #a1a1aa;
      --curve-size: 16px;
      
      /* Sombra unificada y orgánica para toda la forma combinada */
      filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.25));
    }

    @keyframes toast-enter {
      0%   { transform: scale(0.75) translateY(-10px); opacity: 0; }
      70%  { transform: scale(1.03) translateY(2px);   opacity: 1; }
      100% { transform: scale(1)    translateY(0);      opacity: 1; }
    }

    .tab-left  { align-items: flex-start; }
    .tab-right { align-items: flex-end; }

    .jast-tab {
      background: var(--toast-bg);
      border-radius: 50px;
      padding: 9px 14px 9px 9px;
      display: flex;
      align-items: center;
      gap: 8px;
      position: relative;
      z-index: 10;
      margin-bottom: -16px;
      box-sizing: border-box;
    }

    /* Alineación Izquierda (Flush con el borde izquierdo, elimina el "cuerno" y unifica la esquina) */
    .tab-left .jast-tab { margin-left: 0; }
    .tab-left:not(.bottom) .jast-body { border-top-left-radius: 0 !important; }
    .tab-left.bottom .jast-body { border-bottom-left-radius: 0 !important; }
    .tab-left .jast-tab::before { display: none !important; }

    /* Alineación Derecha (Flush con el borde derecho, elimina el "cuerno" y unifica la esquina) */
    .tab-right .jast-tab { margin-right: 0; }
    .tab-right:not(.bottom) .jast-body { border-top-right-radius: 0 !important; }
    .tab-right.bottom .jast-body { border-bottom-right-radius: 0 !important; }
    .tab-right .jast-tab::after { display: none !important; }

    .bottom { flex-direction: column-reverse; }
    .bottom .jast-tab { margin-bottom: 0; margin-top: -16px; }

    /* --- Esquinas Cóncavas Orgánicas (Inverted Border-Radius) --- */
    .has-body .jast-tab::before,
    .has-body .jast-tab::after {
      content: '';
      position: absolute;
      width: var(--curve-size);
      height: var(--curve-size);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease-out; /* Animación de opacidad limpia sin escalas para evitar el efecto de "inflado flotante" */
      z-index: -1;
    }

    /* Activación animada de las curvas */
    .expanded.has-body .jast-tab::before,
    .expanded.has-body .jast-tab::after {
      opacity: 1;
    }

    /* Tab superior: círculo transparente en el extremo exterior, sólido en la unión */
    .jast-toast:not(.bottom) .jast-tab::before {
      bottom: 15px; /* Un píxel de overlap vertical evita líneas de luz por subpixel-rendering */
      right: calc(100% - 1px); /* Solapamiento de 1px lateral para evitar la línea de luz vertical por subpixel-rounding */
      background: radial-gradient(circle at 0 0, transparent var(--curve-size), var(--toast-bg) calc(var(--curve-size) + 0.5px));
    }

    .jast-toast:not(.bottom) .jast-tab::after {
      bottom: 15px;
      left: calc(100% - 1px);
      background: radial-gradient(circle at 100% 0, transparent var(--curve-size), var(--toast-bg) calc(var(--curve-size) + 0.5px));
    }

    /* Tab inferior: círculo transparente en el extremo exterior, sólido en la unión */
    .jast-toast.bottom .jast-tab::before {
      top: 15px;
      right: calc(100% - 1px);
      background: radial-gradient(circle at 0 100%, transparent var(--curve-size), var(--toast-bg) calc(var(--curve-size) + 0.5px));
    }

    .jast-toast.bottom .jast-tab::after {
      top: 15px;
      left: calc(100% - 1px);
      background: radial-gradient(circle at 100% 100%, transparent var(--curve-size), var(--toast-bg) calc(var(--curve-size) + 0.5px));
    }

    .jast-body {
      display: grid;
      grid-template-rows: 0fr;
      background: var(--toast-bg);
      border-radius: 22px;
      width: 340px;
      box-sizing: border-box;
      transition: grid-template-rows 0.42s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      z-index: 1;
    }

    .jast-body-inner {
      overflow: hidden;
      transform: translateY(-12px);
      opacity: 0;
      transition: transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) 0.06s,
                  opacity 0.3s ease 0.06s;
    }

    .jast-body-content { padding: 22px 18px 16px; }

    /* Fase 2: expansión */
    .expanded .jast-body       { grid-template-rows: 1fr; }
    .expanded .jast-body-inner { transform: translateY(0); opacity: 1; }

    /* Fase 3: body se pliega, tab queda como cápsula */
    .collapsing .jast-body {
      display: block;
      overflow: hidden;
      animation: body-collapse 0.35s ease-in forwards;
    }
    .collapsing .jast-body-inner {
      animation: inner-fade-out 0.28s ease-in forwards;
    }

    @keyframes body-collapse {
      from { max-height: 200px; }
      to   { max-height: 0; }
    }
    @keyframes inner-fade-out {
      from { transform: translateY(0);    opacity: 1; }
      to   { transform: translateY(-8px); opacity: 0; }
    }

    /* Fase 4: tab sale solo */
    .exiting:not(.bottom) .jast-tab { animation: tab-exit-top    0.3s cubic-bezier(0.55, 0, 1, 0.45) forwards; }
    .exiting.bottom       .jast-tab { animation: tab-exit-bottom 0.3s cubic-bezier(0.55, 0, 1, 0.45) forwards; }

    @keyframes tab-exit-top {
      from { transform: scale(1)    translateY(0);     opacity: 1; }
      to   { transform: scale(0.82) translateY(-14px); opacity: 0; }
    }
    @keyframes tab-exit-bottom {
      from { transform: scale(1)    translateY(0);    opacity: 1; }
      to   { transform: scale(0.82) translateY(14px); opacity: 0; }
    }

    .jast-icon {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .jast-icon svg { width: 13px; height: 13px; color: #ffffff; }

    .jast-title {
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 240px;
    }

    .jast-description {
      color: var(--toast-desc);
      font-size: 14px;
      margin: 0;
      line-height: 1.55;
    }

    .success .jast-icon { background: linear-gradient(135deg, #10b981, #059669); }
    .error   .jast-icon { background: linear-gradient(135deg, #ef4444, #dc2626); }
    .warning .jast-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .info    .jast-icon { background: linear-gradient(135deg, #3b82f6, #6366f1); }

    .success .jast-title { color: #10b981; }
    .error   .jast-title { color: #ef4444; }
    .warning .jast-title { color: #f59e0b; }
    .info    .jast-title { color: #3b82f6; }
  `]
})
export class JastToastComponent {
  @Input() config!: JastToastConfig;
  @Input() set hide(value: boolean) {
    if (value) setTimeout(() => this.startExit(), 0);
  }

  private cdr = inject(ChangeDetectorRef);
  phase: 'idle' | 'expanded' | 'collapsing' | 'exiting' = 'idle';

  constructor() {
    setTimeout(() => {
      this.phase = 'expanded';
      this.cdr.detectChanges();
    }, 350);
  }

  private startExit(): void {
    // Fase 3: body colapsa
    this.phase = 'collapsing';
    this.cdr.detectChanges();

    // Fase 4: body ya colapsó, tab sale solo
    setTimeout(() => {
      this.phase = 'exiting';
      this.cdr.detectChanges();
    }, 400);
  }

  get tabAlignment(): string {
    const pos = this.config?.position ?? 'top-right';
    if (pos.includes('left'))  return 'tab-left';
    if (pos.includes('right')) return 'tab-right';
    return 'tab-center';
  }

  get toastClass(): string {
    const type   = this.config?.type || 'info';
    const bottom = (this.config?.position ?? '').startsWith('bottom') ? ' bottom' : '';
    const hasBody = this.config?.description ? ' has-body' : '';
    return `jast-toast ${type} ${this.tabAlignment} ${this.phase}${bottom}${hasBody}`;
  }
}
