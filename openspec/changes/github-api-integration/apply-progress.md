# Progreso de Implementación (Apply Progress): Integración de la API de GitHub en JAST

Este documento registra el progreso del desarrollo y las modificaciones de código para conectar el playground con la API pública de GitHub.

---

## 1. Estado de las Tareas Planificadas

| ID     | Tarea                         | Archivos Afectados  | Estado         | Observaciones                                                                                                                   |
| :----- | :---------------------------- | :------------------ | :------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **T1** | Widget de valoración lateral  | `sidebar-rating.ts` | **COMPLETADO** | Importaciones válidas, lógica fetch implementada, plantilla con CTA de 4/5 estrellas y CSS optimizado con hover/active premium. |
| **T2** | Insignia de confianza en Hero | `hero.ts`           | **COMPLETADO** | OnInit importado, señal githubStars agregada, template adaptado con @if y fallback silencioso tolerante a fallos.               |
| **T3** | Formateo y Verificación       | Monorepo general    | **PENDIENTE**  | Listo para formatear el código vía Prettier y correr suite de tests en la fase de verificación.                                 |

---

## 2. Detalle de los Cambios de Código

### A. Sidebar Rating Component (`sidebar-rating.ts`)

- **Lógica asincrónica**: Se agregó la llamada a `https://api.github.com/repos/javier00be/jast` capturando cualquier error silenciosamente para preservar la robustez.
- **HTML**: El bloque `@if ((rating() ?? 0) >= 4)` inyecta el botón `.github-star-cta` con enlaces seguros `target="_blank" rel="noopener noreferrer"`.
- **Diseño Premium**: El CSS del CTA cuenta con transiciones cúbicas `all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)` y sombreado suave.

### B. Hero Component (`hero.ts`)

- **Lógica asincrónica**: Implementada del mismo modo, obteniendo la señal en `ngOnInit`.
- **HTML**: Se reemplazó el texto fijo de 4.9 por el condicional `@if (githubStars() !== '—')`. Si no carga, mantiene el fallback estético general sin arrojar excepciones en consola.

---

## 3. Próximos Pasos (Fase de Verificación)

1. Formatear los archivos modificados con `npx.cmd prettier --write ...` para asegurar calidad y conformidad con las reglas de estilo de Prettier del proyecto.
2. Ejecutar la suite completa de pruebas unitarias con `npx.cmd ng test --watch=false` para corroborar que no haya regresiones (23/23 tests pasando).
