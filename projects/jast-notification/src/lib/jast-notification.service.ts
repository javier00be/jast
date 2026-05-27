import { Injectable, inject, ComponentRef } from '@angular/core';
import { Overlay, GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { JastToastContainerComponent } from './jast-toast-container.component';
import { JastToastConfig, JastToastPosition } from './jast-toast.types';

interface PositionEntry {
  overlayRef: OverlayRef;
  containerRef: ComponentRef<JastToastContainerComponent>;
}

@Injectable({
  providedIn: 'root'
})
export class JastNotificationService {
  private overlay = inject(Overlay);
  private positions = new Map<JastToastPosition, PositionEntry>();

  private getPositionStrategy(position: JastToastPosition = 'top-right'): GlobalPositionStrategy {
    const strategy = this.overlay.position().global();
    const offset = '24px';

    switch (position) {
      case 'top-left':     return strategy.top(offset).left(offset);
      case 'top-right':    return strategy.top(offset).right(offset);
      case 'bottom-left':  return strategy.bottom(offset).left(offset);
      case 'bottom-right': return strategy.bottom(offset).right(offset);
      case 'top-center':   return strategy.top(offset).centerHorizontally();
      case 'bottom-center':return strategy.bottom(offset).centerHorizontally();
      case 'center':       return strategy.centerHorizontally().centerVertically();
      default:             return strategy.top(offset).right(offset);
    }
  }

  show(config: JastToastConfig): void {
    const position = config.position ?? 'top-right';

    let entry = this.positions.get(position);

    if (!entry) {
      const overlayRef = this.overlay.create({
        positionStrategy: this.getPositionStrategy(position)
      });
      const containerRef = overlayRef.attach(new ComponentPortal(JastToastContainerComponent));
      entry = { overlayRef, containerRef };
      this.positions.set(position, entry);
    }

    entry.containerRef.instance.add(config, () => {
      entry!.overlayRef.dispose();
      this.positions.delete(position);
    });
  }

  success(config: Omit<JastToastConfig, 'type'>): void {
    this.show({ ...config, type: 'success' });
  }

  error(config: Omit<JastToastConfig, 'type'>): void {
    this.show({ ...config, type: 'error' });
  }
}
