import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JastToastContainerComponent } from './jast-toast-container.component';
import { JastToastConfig } from './jast-toast.types';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';

describe('JastToastContainerComponent', () => {
  let component: JastToastContainerComponent;
  let fixture: ComponentFixture<JastToastContainerComponent>;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({
      imports: [JastToastContainerComponent],
    });
    fixture = TestBed.createComponent(JastToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a toast and resolve when dismissed', async () => {
    const config: JastToastConfig = { title: 'Test Toast', duration: 1000 };
    const onEmptySpy = vi.fn();

    const { id, result } = component.add(config, 3, onEmptySpy);

    expect(component.toasts.length).toBe(1);
    expect(component.toasts[0].id).toBe(id);

    // Dismiss toast
    component.dismiss(id);

    // Advance timers to trigger setTimeout inside triggerHide
    vi.advanceTimersByTime(800);

    // Resolve the promise
    await result;

    expect(component.toasts.length).toBe(0);
    expect(onEmptySpy).toHaveBeenCalled();
  });

  it('should dismiss oldest toast when maxToasts is exceeded', () => {
    const onEmptySpy = vi.fn();
    const { id: firstId } = component.add({ title: 'First' }, 2, onEmptySpy);
    component.add({ title: 'Second' }, 2, onEmptySpy);

    expect(component.toasts.filter((t) => !t.hiding).length).toBe(2);

    // Add a third toast which exceeds maxToasts (2)
    component.add({ title: 'Third' }, 2, onEmptySpy);

    // The first toast should have been triggered to hide
    const firstToast = component.toasts.find((t) => t.id === firstId);
    expect(firstToast?.hiding).toBe(true);

    vi.advanceTimersByTime(800); // Complete dismissal
    expect(component.toasts.length).toBe(2);
  });

  it('should resolve with the correct action/role when action is clicked', async () => {
    const config: JastToastConfig = { title: 'Action Toast' };
    const onEmptySpy = vi.fn();

    const { id, result } = component.add(config, 5, onEmptySpy);

    component.onActionClicked(id, 'confirm');
    vi.advanceTimersByTime(800);

    const val = await result;
    expect(val).toBe('confirm');
  });

  it('should do nothing if entry to dismiss does not exist or is already hiding', () => {
    const onEmptySpy = vi.fn();
    const { id } = component.add({ title: 'Test' }, 5, onEmptySpy);

    // Dismissing an invalid id shouldn't crash
    component.dismiss(999);
    expect(component.toasts.length).toBe(1);

    // Triggering dismiss multiple times shouldn't cause double triggers
    const entry = component.toasts.find((t) => t.id === id);
    if (entry) {
      entry.triggerHide('dismissed');
      const filterSpy = vi.spyOn(component.toasts, 'filter');
      entry.triggerHide('dismissed'); // Second time should return early
      expect(filterSpy).not.toHaveBeenCalled();
    }
  });
});
