import { Component, OnInit, inject, signal } from '@angular/core';
import { JastNotificationService } from 'jast-notification';

@Component({
  selector: 'app-sidebar-rating',
  standalone: true,
  template: `
    <div class="rating-card">
      @if (!alreadyRated()) {
        <span class="rating-title">¿Te gusta JAST?</span>
        <span class="rating-sub">Tu feedback nos ayuda a mejorar</span>
        <div class="stars" (mouseleave)="hoverRating.set(null)">
          @for (star of [1, 2, 3, 4, 5]; track star) {
            <svg
              class="star-icon"
              [class.filled]="(hoverRating() ?? 0) >= star || (rating() ?? 0) >= star"
              (mouseenter)="hoverRating.set(star)"
              (click)="rate(star)"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              ></polygon>
            </svg>
          }
        </div>
      } @else {
        <div class="thanks-view">
          <span class="thanks-icon">🎉</span>
          <span class="rating-title">¡Gracias por valorar!</span>
          <span class="rating-sub">Registramos tu opinión ({{ rating() }}★)</span>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .rating-card {
        padding: 16px;
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        text-align: left;
        transition: all 0.3s ease;
      }
      .rating-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--text);
        margin: 0;
      }
      .rating-sub {
        font-size: 11px;
        color: var(--text-secondary);
        line-height: 1.4;
        margin-bottom: 4px;
      }
      .stars {
        display: flex;
        gap: 6px;
        align-items: center;
      }
      .star-icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        color: var(--text-secondary);
        transition:
          transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
          color 0.15s ease;
        opacity: 0.45;
        polygon {
          fill: transparent;
          transition: fill 0.15s ease;
        }
        &:hover {
          transform: scale(1.25);
        }
        &.filled {
          color: #f59e0b;
          opacity: 1;
          polygon {
            fill: #f59e0b;
          }
        }
      }
      .thanks-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 4px;
        padding: 8px 0;
        animation: fade-in 0.35s ease;
      }
      .thanks-icon {
        font-size: 20px;
        margin-bottom: 2px;
        animation: bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes bounce {
        0% {
          transform: scale(0.3);
        }
        70% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }
      }
    `,
  ],
})
export class SidebarRatingComponent implements OnInit {
  private jast = inject(JastNotificationService);

  rating = signal<number | null>(null);
  hoverRating = signal<number | null>(null);
  alreadyRated = signal<boolean>(false);

  ngOnInit(): void {
    const saved = localStorage.getItem('jast-project-rated');
    const value = localStorage.getItem('jast-project-rating-value');
    if (saved === 'true' && value) {
      this.rating.set(parseInt(value, 10));
      this.alreadyRated.set(true);
    }
  }

  rate(stars: number): void {
    this.rating.set(stars);
    this.alreadyRated.set(true);

    localStorage.setItem('jast-project-rated', 'true');
    localStorage.setItem('jast-project-rating-value', stars.toString());

    // Disparar notificaciones personalizadas de JAST segun estrellas
    if (stars === 5) {
      this.jast.success({
        title: '¡Espectacular! ⭐⭐⭐⭐⭐',
        description:
          'Muchas gracias por las 5 estrellas. ¡Nos motiva un montón a seguir desarrollando!',
        duration: 4500,
        position: 'top-right',
      });
    } else if (stars === 4) {
      this.jast.success({
        title: '¡Muchas gracias! ⭐⭐⭐⭐',
        description: 'Tu valoración nos ayuda a seguir perfeccionando la librería.',
        duration: 4000,
        position: 'top-right',
      });
    } else {
      this.jast.info({
        title: `¡Gracias por tu valoración! ⭐`,
        description:
          'Tomamos nota de tu feedback para seguir mejorando las notificaciones de JAST.',
        duration: 4000,
        position: 'top-right',
      });
    }
  }
}
