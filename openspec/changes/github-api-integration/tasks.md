# Plan de Tareas: Integración de la API de GitHub en JAST

Este plan detalla el desglose atómico de tareas para conectar el sistema de valoraciones y el Hero del playground de JAST con la API de GitHub, implementando llamadas asincrónicas tolerantes a fallos (rate limits) y un CTA de fidelización premium.

---

## 1. Pronóstico de Carga de Revisión (Review Workload Forecast)

Evaluamos el impacto del cambio antes de escribir una sola línea de código:

- **Archivos a modificar**: 2 componentes standalone (`sidebar-rating.ts` y `hero.ts`).
- **Estimación de líneas agregadas/modificadas**: ~60 líneas.
- **Nivel de riesgo**: Muy bajo. No hay lógica de negocio compleja ni alteraciones en el CDK de `jast-notification`.
- **Estrategia de entrega sugerida**: Un único PR autocontenido (`delivery_strategy: single-pr`). No se requiere división en cadenas de PRs ya que el cambio total está muy por debajo del límite presupuestado de 400 líneas.
- **¿Decisión crítica pendiente?**: No. Todo está mapeado en la fase de especificaciones y diseño técnico.

---

## 2. Desglose Atómico de Tareas

A continuación se detallan las unidades de trabajo exactas con sus respectivos commits convencionales. Todos los commits se realizarán de forma atómica y sin atribución automática de IA.

### Tarea 1: Widget de valoración lateral (`sidebar-rating.ts`)

- **Descripción**:
  - Importar `signal` e `OnInit` (si no están importados).
  - Definir la señal `githubStars` inicializada en `'—'`.
  - Crear el método asincrónico `fetchStars()` con manejo robusto de errores mediante `try-catch` para llamar a la API pública de GitHub.
  - Invocar `fetchStars()` en `ngOnInit`.
  - Actualizar el bloque `@else` del template HTML para que muestre el botón `.github-star-cta` que redirige a `https://github.com/javier00be/jast` si el rating otorgado por el usuario es mayor o igual a 4.
  - Agregar las reglas de estilo CSS para `.github-star-cta` incluyendo micro-animaciones (transform, shadow, hovers premium).
- **Archivo afectado**: [sidebar-rating.ts](file:///C:/Users/Javier/Documents/jast-workspace/projects/playground/src/app/layout/sidebar-rating/sidebar-rating.ts)
- **Commit Convencional**: `feat(playground): fetch github stars and add rating cta in sidebar`

### Tarea 2: Insignia de Confianza en la Sección Hero (`hero.ts`)

- **Descripción**:
  - Modificar las importaciones para incluir `OnInit` y `signal` desde `@angular/core`.
  - Agregar `implements OnInit` a la declaración de `HeroComponent`.
  - Declarar la señal `githubStars` inicializada en `'—'`.
  - Implementar el método asincrónico `fetchStars()` idéntico al del widget lateral para garantizar coherencia y aislamiento.
  - Invocar `fetchStars()` en `ngOnInit`.
  - Actualizar el marcado HTML de `.hero-trust` para renderizar condicionalmente el conteo en vivo de estrellas mediante `@if (githubStars() !== '—')`, aplicando un elegante texto de fallback si falla.
- **Archivo afectado**: [hero.ts](file:///C:/Users/Javier/Documents/jast-workspace/projects/playground/src/app/sections/hero/hero.ts)
- **Commit Convencional**: `feat(playground): display live github star count in hero trust badge`

### Tarea 3: Verificación y Calidad

- **Descripción**:
  - Ejecutar formateo de código automático mediante Prettier.
  - Ejecutar el juego de pruebas unitarias completo para asegurar que todos los tests existentes de la aplicación playground y la librería jast siguen pasando sin regresiones (23/23 tests OK).
- **Comandos**:
  - `npx.cmd prettier --write projects/playground/src/app/layout/sidebar-rating/sidebar-rating.ts projects/playground/src/app/sections/hero/hero.ts`
  - `npx.cmd ng test --watch=false`
- **Commit Convencional**: `test(playground): verify layout and component ratings stability`

---

## 3. Matriz de Trazabilidad y Verificación

| ID         | Requisito          | Archivo                         | Criterio de Aceptación                                          | Estado    |
| :--------- | :----------------- | :------------------------------ | :-------------------------------------------------------------- | :-------- |
| **REQ-01** | Live star counts   | `hero.ts` & `sidebar-rating.ts` | Consulta asincrónica sin bloquear renderizado.                  | Pendiente |
| **REQ-02** | Fallback elegante  | `hero.ts`                       | Texto "Calificación promedio 5.0★ por la comunidad" si falla.   | Pendiente |
| **REQ-03** | Redirección GitHub | `sidebar-rating.ts`             | Botón premium `.github-star-cta` visible con valoraciones >= 4. | Pendiente |
| **REQ-04** | Tests e Integridad | Proyectos del monorepo          | 100% de tests unitarios aprobados y formateo limpio.            | Pendiente |
