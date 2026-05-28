import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="docs-layout">

      <aside class="sidebar">
        <a routerLink="/" class="back">← Inicio</a>

        <div class="nav-group">
          <span class="nav-label">Comenzando</span>
          <a routerLink="/docs/basics" routerLinkActive="active">Básicos</a>
        </div>

        <div class="nav-group">
          <span class="nav-label">Referencia</span>
          <a routerLink="/docs/api" routerLinkActive="active">API Reference</a>
          <a routerLink="/docs/styling" routerLinkActive="active">Personalización</a>
        </div>
      </aside>

      <main class="content">
        <router-outlet />
      </main>

    </div>
  `,
  styles: [`
    .docs-layout {
      display: grid;
      grid-template-columns: 220px 1fr;
      padding-top: 58px;
      min-height: 100vh;
    }
    .sidebar {
      position: sticky;
      top: 58px;
      height: calc(100vh - 58px);
      overflow-y: auto;
      padding: 32px 16px;
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .back {
      font-size: 13px;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 0 12px;
      transition: color 0.15s;
      &:hover { color: var(--text); }
    }
    .nav-group {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .nav-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--text-secondary);
      padding: 0 12px;
      margin-bottom: 6px;
      display: block;
    }
    a:not(.back):not(.nav-label) {
      display: block;
      padding: 8px 12px;
      border-radius: 7px;
      font-size: 14px;
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.15s;
      &:hover { color: var(--text); background: var(--surface); }
      &.active {
        color: var(--accent);
        background: rgba(59, 130, 246, 0.07);
        font-weight: 500;
      }
    }
    .content {
      padding: 56px 72px;
      min-width: 0;
      max-width: 820px;
    }
  `]
})
export class DocsPageComponent {}
