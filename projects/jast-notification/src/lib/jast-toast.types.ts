export type JastToastType = 'success' | 'error' | 'info' | 'warning';

// Definimos todas las posiciones clásicas
export type JastToastPosition = 
  | 'top-right' 
  | 'top-left' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'top-center' 
  | 'bottom-center' 
  | 'center';

export interface JastToastConfig {
  title: string;
  description?: string;
  type?: JastToastType;
  duration?: number;
  position?: JastToastPosition; // Nueva propiedad opcional
}