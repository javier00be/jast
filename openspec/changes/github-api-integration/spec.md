# Especificaciones: Integración de la API de GitHub (JAST)

Este documento define las especificaciones funcionales, el comportamiento de consumo de la API de GitHub, los criterios de aceptación y los fallbacks de diseño para reflejar las estrellas reales en el frontend.

---

## 1. Consumo de la API Pública de GitHub

- **Endpoint de consulta**: `https://api.github.com/repos/javier00be/jast`
- **Método HTTP**: `GET`
- **Atributo a extraer**: `stargazers_count` (tipo entero).
- **Control de Petición**:
  - Se ejecutará una sola petición de `fetch` asincrónica durante el `ngOnInit` de `HeroComponent` y de `SidebarRatingComponent`.
  - La respuesta se parseará a JSON y se extraerá el número de estrellas.

---

## 2. Comportamiento en Componentes

### A. Distintivo de Confianza en el Hero (`hero.ts`)

- **Señal reactiva**: `githubStars = signal<string>('—')`.
- Al inicializar el componente, si la petición `fetch` es exitosa:
  - Se actualiza la señal con la respuesta: `githubStars.set(data.stargazers_count.toString())`.
- El template mostrará:
  - `<span class="stars-count">{{ githubStars() }}</span> estrellas en GitHub` (o un fallback elegante si está en `'—'`).

### B. Tarjeta de Valoración (`sidebar-rating.ts`)

- **Señal reactiva**: `githubStars = signal<string>('0')`.
- Al inicializar el componente, cargamos de la misma forma las estrellas de GitHub para mostrarlas en la cabecera o en la vista de agradecimiento.
- **Acción del Botón en Calificaciones Altas (4 o 5 estrellas)**:
  - Cuando el usuario vota con **4 o 5 estrellas**, la tarjeta muestra el botón destacado de Conversión.
  - **Texto del Botón**: `¡Dejanos una estrella en GitHub! ⭐`
  - **Acción**: Enlace `<a>` con `href="https://github.com/javier00be/jast"`, `target="_blank"` y `rel="noopener noreferrer"`.
  - **Estilo Visual**: Botón premium con fondo `var(--text)`, color de texto `var(--bg)`, sin bordes, bordes redondeados a `8px`, tipografía mediana `12px` con `font-weight: 600`, y un hover de escala suave.

---

## 3. Robustez ante Fallos (Fallback & Rate Limiting)

Dado que la API pública de GitHub tiene un límite de 60 peticiones por hora por IP para clientes no autenticados, debemos garantizar que la aplicación sea tolerante a fallos:

1. **Estrategia Fallback**:
   - Envolver la petición de `fetch` en un bloque `try-catch`.
   - Si la petición es rechazada (`catch`), si el servidor responde con un estado distinto de `200` (como `403 Forbidden` por rate limit), o si el cliente está sin conexión:
     - El componente **Hero** mostrará por defecto un texto sutil alternativo como: _« Valoración de 5★ en la comunidad »_ o simplemente _« 4.9/5 valorado por desarrolladores »_.
     - El componente **Sidebar** mostrará un conteo genérico de _« +0 »_ o continuará con su renderizado normal de votación sin arrojar excepciones en la consola que interrumpan la ejecución de la app.
   - De esta forma garantizamos que **JAST** siempre se vea premium e impecable.

---

## 4. Criterios de Aceptación

1. **Cero Excepciones**: Las peticiones fallidas (ej. por emulación de desconexión de red) no deben entorpecer el renderizado de la aplicación ni bloquear la navegación.
2. **Redirección Segura**: El enlace a GitHub debe abrirse en una pestaña nueva con las etiquetas de seguridad `rel="noopener noreferrer"`.
3. **Estrellas en Vivo**: Al subir a GitHub Pages, si el repositorio recibe una nueva estrella oficial de GitHub, esta debe verse reflejada al recargar el Playground en vivo (respetando los límites de cache de GitHub).
4. **Sin Impacto en Tests**: La ejecución de las pruebas unitarias existentes debe seguir pasando al 100%.
