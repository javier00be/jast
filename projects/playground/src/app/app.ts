import { Component, inject } from '@angular/core';
import { JastNotificationService } from 'jast-notification';
import { JastToastPosition } from 'jast-notification';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="grid-container">
      <button class="trigger-btn" (click)="lanzar('top-left')">Top Left</button>
      <button class="trigger-btn" (click)="lanzar('top-center')">Top Center</button>
      <button class="trigger-btn" (click)="lanzar('top-right')">Top Right</button>
      
      <button class="trigger-btn" (click)="lanzar('center')">Center</button>
      
      <button class="trigger-btn" (click)="lanzar('bottom-left')">Bottom Left</button>
      <button class="trigger-btn" (click)="lanzar('bottom-center')">Bottom Center</button>
      <button class="trigger-btn" (click)="lanzar('bottom-right')">Bottom Right</button>
    </div>
  `,
  styles: [`
    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
    }
    /* Estilos del botón */
    .trigger-btn {
      padding: 12px 24px;
      background-color: #111111;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }
    .trigger-btn:hover { transform: scale(1.05); }
    
    /* Acomodamos el botón central para que ocupe toda la fila visualmente */
    .trigger-btn:nth-child(4) { grid-column: 1 / -1; background-color: #3b82f6; }
  `]
})
export class App {
  private jastService = inject(JastNotificationService);

  lanzar(pos: JastToastPosition) {
    this.jastService.success({
      title: 'Posición actualizada',
      description: `El toast apareció en ${pos}`, // <-- ¡Faltaba esta coma!
      position: pos
    });
  }
}