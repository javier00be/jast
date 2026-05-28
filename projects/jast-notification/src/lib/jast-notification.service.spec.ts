import { TestBed } from '@angular/core/testing';
import { JastNotificationService } from './jast-notification.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe('JastNotificationService', () => {
  let service: JastNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule],
      providers: [JastNotificationService],
    });
    service = TestBed.inject(JastNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show toast and return JastToastRef', () => {
    const ref = service.show({ title: 'Test Toast', position: 'top-right' });
    expect(ref).toBeTruthy();
    expect(ref.id).toContain('jast-');

    // Cleanup
    service.dismissAll();
  });

  it('should support short-hand success method', () => {
    const spy = vi.spyOn(service, 'show');
    service.success({ title: 'Success' });
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'success', title: 'Success' }),
    );
  });

  it('should support short-hand error method', () => {
    const spy = vi.spyOn(service, 'show');
    service.error({ title: 'Error' });
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'error', title: 'Error' }));
  });

  it('should support short-hand warning method', () => {
    const spy = vi.spyOn(service, 'show');
    service.warning({ title: 'Warning' });
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'warning', title: 'Warning' }),
    );
  });

  it('should support short-hand info method', () => {
    const spy = vi.spyOn(service, 'show');
    service.info({ title: 'Info' });
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'info', title: 'Info' }));
  });

  it('should support confirm dialog configuration', () => {
    const spy = vi.spyOn(service, 'show');
    service.confirm({ title: 'Confirm' });
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'warning', title: 'Confirm', persistent: true }),
    );
  });

  it('should handle promise resolution in promise() method', async () => {
    const fakePromise = Promise.resolve('data');
    const showSpy = vi.spyOn(service, 'show');

    const result = await service.promise(fakePromise, {
      loading: 'Cargando',
      success: 'Completado',
      error: 'Falló',
      position: 'top-right',
    });

    expect(result).toBe('data');
    expect(showSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'info', title: 'Cargando' }),
    );
    expect(showSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'success', title: 'Completado' }),
    );
  });

  it('should handle promise rejection in promise() method', async () => {
    const fakePromise = Promise.reject(new Error('fail-error'));
    const showSpy = vi.spyOn(service, 'show');

    await expect(
      service.promise(fakePromise, {
        loading: 'Cargando',
        success: 'Completado',
        error: 'Falló',
        position: 'top-right',
      }),
    ).rejects.toThrow('fail-error');

    expect(showSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'info', title: 'Cargando' }),
    );
    expect(showSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error', title: 'Falló' }),
    );
  });
});
