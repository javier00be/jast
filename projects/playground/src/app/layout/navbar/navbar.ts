import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <div class="inner">
        <a routerLink="/" class="logo">
          <span class="jast-pill">
            <span class="jast-dot"></span>
            JAST
          </span>
          <span class="logo-sub">notification</span>
        </a>
        <div class="links">
          <a routerLink="/docs" routerLinkActive="active" class="link">Docs</a>
          <a href="https://www.npmjs.com/package/jast-notification" target="_blank" class="link">npm</a>
          <a href="#" target="_blank" class="link">GitHub</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      height: 58px;
      display: flex;
      align-items: center;
      padding: 0 32px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
    }
    .inner {
      max-width: var(--max-width);
      margin: 0 auto;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }
    .jast-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--text);
      color: #ffffff;
      padding: 4px 10px 4px 7px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1.5px;
    }
    .jast-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #3b82f6;
      flex-shrink: 0;
    }
    .logo-sub {
      font-size: 13px;
      font-weight: 400;
      color: var(--text-secondary);
      letter-spacing: -0.2px;
    }
    .links {
      display: flex;
      gap: 24px;
      align-items: center;
    }
    .link {
      font-size: 13px;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.15s;
      &:hover { color: var(--text); }
      &.active { color: var(--text); font-weight: 500; }
    }
  `]
})
export class NavbarComponent {}
