import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="inner">
        <span>Licencia MIT · Hecho con Angular</span>
        <div class="links">
          <a href="https://www.npmjs.com/package/jast-notification" target="_blank">npm</a>
          <a href="#" target="_blank">GitHub</a>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        border-top: 1px solid var(--border);
        padding: 32px;
      }
      .inner {
        max-width: var(--max-width);
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 13px;
          color: var(--text-secondary);
        }
      }
      .links {
        display: flex;
        gap: 20px;
        a {
          font-size: 13px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.15s;
          &:hover {
            color: var(--text);
          }
        }
      }
    `,
  ],
})
export class FooterComponent {}
