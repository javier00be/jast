import { Injectable, inject, ComponentRef } from '@angular/core';
import { Overlay, GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { JastToastContainerComponent } from './jast-toast-container.component';
import {
  JastToastConfig,
  JastToastPosition,
  JastToastRef,
  JastToastPromiseConfig,
  JastToastPromiseMessages,
} from './jast-toast.types';

interface PositionEntry {
  overlayRef: OverlayRef;
  containerRef: ComponentRef<JastToastContainerComponent>;
}

@Injectable({
  providedIn: 'root',
})
export class JastNotificationService {
  private overlay = inject(Overlay);
  private positions = new Map<JastToastPosition, PositionEntry>();
  private registry = new Map<string, JastToastRef>();
  private nextToastId = 0;
  maxToasts = Infinity;

  private getPositionStrategy(position: JastToastPosition = 'top-right'): GlobalPositionStrategy {
    const strategy = this.overlay.position().global();
    const offset = '24px';

    switch (position) {
      case 'top-left':
        return strategy.top(offset).left(offset);
      case 'top-right':
        return strategy.top(offset).right(offset);
      case 'bottom-left':
        return strategy.bottom(offset).left(offset);
      case 'bottom-right':
        return strategy.bottom(offset).right(offset);
      case 'top-center':
        return strategy.top(offset).centerHorizontally();
      case 'bottom-center':
        return strategy.bottom(offset).centerHorizontally();
      default:
        return strategy.top(offset).right(offset);
    }
  }

  show(config: JastToastConfig): JastToastRef {
    const position = config.position ?? 'top-right';

    let entry = this.positions.get(position);

    if (!entry) {
      const overlayRef = this.overlay.create({
        positionStrategy: this.getPositionStrategy(position),
      });
      const containerRef = overlayRef.attach(new ComponentPortal(JastToastContainerComponent));
      entry = { overlayRef, containerRef };
      this.positions.set(position, entry);
    }

    const toastId = `jast-${this.nextToastId++}`;
    const capturedEntry = entry;

    const { id: internalId, result } = capturedEntry.containerRef.instance.add(
      config,
      this.maxToasts,
      () => {
        capturedEntry.overlayRef.dispose();
        this.positions.delete(position);
      },
    );

    const ref = new JastToastRef(result, toastId, () => {
      capturedEntry.containerRef.instance.dismiss(internalId);
    });

    this.registry.set(toastId, ref);
    result.finally(() => this.registry.delete(toastId));

    return ref;
  }

  dismiss(id: string): void {
    this.registry.get(id)?.dismiss();
  }

  dismissAll(): void {
    this.registry.forEach((ref) => ref.dismiss());
  }

  async promise<T>(p: Promise<T>, config: JastToastPromiseConfig): Promise<T> {
    const toMessages = (m: JastToastPromiseMessages) => (typeof m === 'string' ? { title: m } : m);

    const ref = this.show({
      ...toMessages(config.loading),
      type: 'info',
      persistent: true,
      position: config.position,
    });

    try {
      const result = await p;
      ref.dismiss();
      this.show({ ...toMessages(config.success), type: 'success', position: config.position });
      return result;
    } catch (err) {
      ref.dismiss();
      this.show({ ...toMessages(config.error), type: 'error', position: config.position });
      throw err;
    }
  }

  success(config: Omit<JastToastConfig, 'type'>): JastToastRef {
    return this.show({ ...config, type: 'success' });
  }

  error(config: Omit<JastToastConfig, 'type'>): JastToastRef {
    return this.show({ ...config, type: 'error' });
  }

  warning(config: Omit<JastToastConfig, 'type'>): JastToastRef {
    return this.show({ ...config, type: 'warning' });
  }

  info(config: Omit<JastToastConfig, 'type'>): JastToastRef {
    return this.show({ ...config, type: 'info' });
  }

  confirm(config: Omit<JastToastConfig, 'type' | 'persistent'>): JastToastRef {
    return this.show({ ...config, type: 'warning', persistent: true });
  }
}
