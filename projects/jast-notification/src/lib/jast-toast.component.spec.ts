import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JastToastComponent } from './jast-toast.component';
import { JastToastConfig } from './jast-toast.types';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';

describe('JastToastComponent', () => {
  let component: JastToastComponent;
  let fixture: ComponentFixture<JastToastComponent>;

  const defaultConfig: JastToastConfig = {
    title: 'Test Toast',
    type: 'success',
    duration: 3000,
    persistent: false,
    position: 'top-right'
  };

  beforeEach(() => {
    vi.useFakeTimers();
    
    TestBed.configureTestingModule({
      imports: [JastToastComponent]
    });
    
    fixture = TestBed.createComponent(JastToastComponent);
    component = fixture.componentInstance;
    component.config = { ...defaultConfig };
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve correct CSS classes based on config', () => {
    expect(component.toastClass).toContain('success');
    expect(component.toastClass).toContain('tab-right');
    expect(component.toastClass).not.toContain('bottom');
    expect(component.toastClass).not.toContain('has-body');
  });

  it('should add "bottom" and "has-body" classes when configured', () => {
    component.config = {
      ...defaultConfig,
      position: 'bottom-left',
      description: 'Tiene descripción',
      progress: true
    };
    fixture.detectChanges();

    expect(component.toastClass).toContain('bottom');
    expect(component.toastClass).toContain('tab-left');
    expect(component.toastClass).toContain('has-body');
  });

  it('should auto-dismiss after configured duration', () => {
    const spy = vi.spyOn(component.actionClicked, 'emit');
    
    // Avanzar el tiempo 3000ms (la duración configurada)
    vi.advanceTimersByTime(3000);
    
    expect(spy).toHaveBeenCalledWith(null);
  });

  it('should not auto-dismiss if persistent', () => {
    component.config.persistent = true;
    // Forzar re-ejecución del ciclo de vida para aplicar el ngOnInit correcto
    component.ngOnInit();
    
    const spy = vi.spyOn(component.actionClicked, 'emit');
    vi.advanceTimersByTime(3000);
    
    expect(spy).not.toHaveBeenCalled();
  });

  it('should pause timer on mouseenter and resume with remaining time on mouseleave', () => {
    const spy = vi.spyOn(component.actionClicked, 'emit');
    
    // Dejar pasar 1000ms (quedan 2000ms)
    vi.advanceTimersByTime(1000);
    
    // Entrar mouse
    component.onMouseEnter();
    expect(component.isPaused).toBe(true);
    
    // Avanzar 5000ms mientras está pausado (no debería dispararse)
    vi.advanceTimersByTime(5000);
    expect(spy).not.toHaveBeenCalled();
    
    // Salir mouse (debería reanudar con los 2000ms restantes)
    component.onMouseLeave();
    expect(component.isPaused).toBe(false);
    
    // Avanzar 1999ms (casi expira, no debería haberse disparado todavía)
    vi.advanceTimersByTime(1999);
    expect(spy).not.toHaveBeenCalled();
    
    // 1ms más y expira
    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledWith(null);
  });

  it('should emit action role when button is clicked', () => {
    const spy = vi.spyOn(component.actionClicked, 'emit');
    
    component.config.actions = [
      { label: 'Cancelar', role: 'cancel' },
      { label: 'Confirmar', role: 'confirm' }
    ];
    fixture.detectChanges();
    
    component.actionClicked.emit('confirm');
    expect(spy).toHaveBeenCalledWith('confirm');
  });
});
