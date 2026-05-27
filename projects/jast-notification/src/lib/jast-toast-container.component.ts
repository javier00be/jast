import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { JastToastComponent } from './jast-toast.component';
import { JastToastConfig } from './jast-toast.types';

interface ToastEntry {
  id: number;
  config: JastToastConfig;
  hiding: boolean;
}

@Component({
  selector: 'jast-toast-container',
  standalone: true,
  imports: [JastToastComponent],
  template: `
    @for (toast of toasts; track toast.id) {
      <jast-toast [config]="toast.config" [hide]="toast.hiding" />
    }
  `,
  styles: [`:host { display: flex; flex-direction: column; gap: 8px; }`]
})
export class JastToastContainerComponent {
  toasts: ToastEntry[] = [];
  private nextId = 0;
  private cdr = inject(ChangeDetectorRef);

  add(config: JastToastConfig, onEmpty: () => void): void {
    const id = this.nextId++;
    this.toasts.push({ id, config, hiding: false });

    setTimeout(() => {
      const entry = this.toasts.find(t => t.id === id);
      if (entry) {
        entry.hiding = true;
        this.cdr.detectChanges(); // zoneless: propagar [hide]=true al toast
      }

      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id);
        this.cdr.detectChanges(); // zoneless: propagar remoción del array
        if (this.toasts.length === 0) onEmpty();
      }, 800);
    }, config.duration ?? 4000);
  }
}
