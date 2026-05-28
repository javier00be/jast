import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { JastToastComponent } from './jast-toast.component';
import { JastToastConfig } from './jast-toast.types';

interface ToastEntry {
  id: number;
  config: JastToastConfig;
  hiding: boolean;
  triggerHide: (action: string | null) => void;
}

@Component({
  selector: 'jast-toast-container',
  standalone: true,
  imports: [JastToastComponent],
  template: `
    @for (toast of toasts; track toast.id) {
      <jast-toast
        [config]="toast.config"
        [hide]="toast.hiding"
        (actionClicked)="onActionClicked(toast.id, $event)"
      />
    }
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    `,
  ],
})
export class JastToastContainerComponent {
  toasts: ToastEntry[] = [];
  private nextId = 0;
  private cdr = inject(ChangeDetectorRef);

  add(
    config: JastToastConfig,
    maxToasts: number,
    onEmpty: () => void,
  ): { id: number; result: Promise<string | null> } {
    const visible = this.toasts.filter((t) => !t.hiding);
    if (visible.length >= maxToasts) {
      visible[0].triggerHide(null);
    }

    const id = this.nextId++;
    const result = new Promise<string | null>((resolve) => {
      const triggerHide = (action: string | null) => {
        const entry = this.toasts.find((t) => t.id === id);
        if (!entry || entry.hiding) return;
        entry.hiding = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.toasts = this.toasts.filter((t) => t.id !== id);
          this.cdr.detectChanges();
          if (this.toasts.length === 0) onEmpty();
          resolve(action);
        }, 800);
      };

      this.toasts.push({ id, config, hiding: false, triggerHide });
      this.cdr.detectChanges();
    });
    return { id, result };
  }

  dismiss(id: number): void {
    const entry = this.toasts.find((t) => t.id === id);
    entry?.triggerHide(null);
  }

  onActionClicked(id: number, role: string | null): void {
    const entry = this.toasts.find((t) => t.id === id);
    entry?.triggerHide(role);
  }
}
