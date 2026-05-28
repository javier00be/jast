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
          <a href="https://www.npmjs.com/package/jast-notification" target="_blank" class="link"
            >npm</a
          >
          <a href="https://github.com/javier00be/jast" target="_blank" class="github-btn">
            <svg
              class="github-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
              ></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
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
        &:hover {
          color: var(--text);
        }
        &.active {
          color: var(--text);
          font-weight: 500;
        }
      }
      .github-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: var(--text);
        color: var(--bg);
        padding: 5px 12px;
        border-radius: 50px;
        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.2s ease;
        border: 1px solid var(--text);
        &:hover {
          background: transparent;
          color: var(--text);
        }
      }
      .github-icon {
        width: 14px;
        height: 14px;
        stroke: currentColor;
        stroke-width: 2.2;
      }
    `,
  ],
})
export class NavbarComponent {}
