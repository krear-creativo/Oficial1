# CLAUDE.md — Kreär Estudio Estratégico Creativo

> Archivo de contexto permanente para Claude Code. Leer antes de cualquier tarea en este proyecto.

---

## Descripción del Proyecto

**Kreär** es un estudio estratégico creativo con sede en Resistencia, Chaco, Argentina.
Sitio web oficial: **krearestudiocreativo.com**
Repositorio: `https://github.com/krear-creativo/Oficial1`

**Stack:** HTML5 + CSS3 + JavaScript Vanilla — sin frameworks, sin bundler.
**Hosting:** GitHub Pages con dominio personalizado (CNAME → krearestudiocreativo.com).
**Branch principal:** `main` (GitHub Pages sirve desde `main`).

---

## Estructura de Archivos

```
/
├── index.html              # Landing principal — Hero, Explore cards, Clientes, Testimonios, Contacto
├── servicios.html          # Servicios con timeline de 6 etapas
├── suscripciones.html      # Planes de suscripción (4 niveles con precios)
├── estudio.html            # Sobre Kreär, filosofía y metodología
├── privacidad.html         # Política de privacidad legal (Ley 25.326 AR)
├── styles.css              # Sistema de diseño completo (3221 líneas)
├── script.js               # Interactividad + i18n ES/EN + animaciones (1500 líneas)
├── google-apps-script.js   # Backend del formulario de contacto (Google Apps Script)
├── CNAME                   # Dominio personalizado GitHub Pages
├── .gitignore              # Archivos ignorados por Git
├── images/                 # Logos de clientes, favicon, og-cover, hero visual
├── FONT/                   # Fuentes locales de respaldo (Mundial family)
├── Panel/                  # Recursos de diseño: mockups, referencias visuales
└── docs/                   # Documentación interna del equipo (no se sirve en la web)
    ├── DEVELOPMENT.md      # Guía técnica para desarrolladores
    ├── DESIGN.md           # Sistema de diseño y guía visual
    ├── MARKETING.md        # Estrategia de marca y copy
    ├── SEO.md              # Estrategia SEO y checklists
    └── CHANGELOG.md        # Historial de versiones
```

---

## Sistema de Diseño

### Colores (variables CSS en `:root` de `styles.css`)

| Token CSS | Valor | Uso |
|-----------|-------|-----|
| `--primary-600` | `#00024D` | Navy principal, fondo base |
| `--accent-500` | `#D9E73C` | Lima/chartreuse, énfasis y CTAs |
| `--text-primary` | `#FFFFFF` | Texto principal |
| `--text-secondary` | `#E4E4E7` | Texto secundario |
| `--text-tertiary` | `#A1A1AA` | Texto de apoyo |
| `--text-quaternary` | `#71717A` | Labels, metadata |
| `--bg-card` | `rgba(255,255,255,0.05)` | Fondo de cards |

RGB helpers: `--primary-rgb: 0, 2, 77` y `--accent-rgb: 217, 231, 60`

### Tipografía (Adobe Typekit — `https://use.typekit.net/jru0lzd.css`)

| Familia | Variable CSS | Uso |
|---------|-------------|-----|
| `mundial` | font-family | Body, UI, labels, botones |
| `new-order` | font-family | Headings h1–h4, section titles |

### Clases de Utilidad Clave

| Clase | Uso |
|-------|-----|
| `.btn-primary` | Botón lima con gradiente animado |
| `.btn-outline` | Botón transparente con borde |
| `.glass-card` | Card con glass morphism hover |
| `.section-label` | Chip/etiqueta de sección (lima, pill) |
| `.section-title` | Título de sección (new-order, clamp) |
| `.reveal-item` | Animación al scroll (IntersectionObserver) |
| `.text-accent` | Texto en color `--accent-500` |
| `.container` | Wrapper centrado, max 1280px |
| `.animate-fade-up` | Entrada fade + translateY |
| `.animate-scale-in` | Entrada scale desde 0.85 |

### Espaciado y Radios

```css
--section-padding: 120px;  /* padding vertical de secciones */
--container-max: 1280px;
--radius-sm: 8px; --radius-md: 16px; --radius-lg: 24px;
--radius-xl: 32px; --radius-full: 9999px;
```

---

## Internacionalización (i18n ES/EN)

El sitio tiene switch idioma. Toda la UI es bilingüe.

**Para agregar texto traducible en HTML:**
```html
<span data-i18n="mi.clave">Texto por defecto en español</span>
<!-- placeholder en inputs: -->
<input data-i18n-placeholder="mi.clave.placeholder" placeholder="Texto..." />
```

**Para agregar la traducción en `script.js`:**
```js
// Objeto translations línea ~427 de script.js
// Agregar en AMBOS: translations.es y translations.en
es: {
  'mi.clave': 'Texto en español',
},
en: {
  'mi.clave': 'Text in English',
}
```

**Regla:** Nunca agregar texto hardcoded en HTML si hay un equivalente i18n necesario. Siempre agregar la clave en ES y EN simultáneamente.

---

## IDs de Tracking (NO modificar sin confirmar)

| Servicio | ID |
|----------|-----|
| Google Analytics | `G-9609EGJC6X` |
| Google Tag Manager | `GTM-P2TLKQM3` |
| Meta Pixel | `873186255604884` |
| Meta Domain Verification | `0cn8h67gud8r9jpdtv1oe110u4jtve` |

---

## Convenciones de Código

### HTML
- Siempre incluir `aria-label` en elementos interactivos sin texto visible
- Usar `role="list"` en `<ul>` semánticos de navegación
- Todos los `<img>` deben tener atributo `alt`
- Estructura semántica: `<section>`, `<article>`, `<nav>`, `<footer>`
- Canonical, OG y hreflang en cada página (ver `docs/SEO.md`)

### CSS (`styles.css`)
- Variables CSS via `--token-name` definidas en `:root` — nunca valores hardcoded de color
- Breakpoints: `@media (max-width: 767px)` (mobile) y `@media (max-width: 1023px)` (tablet)
- Siempre agregar `@media (prefers-reduced-motion: reduce)` para animaciones nuevas
- No usar `!important` salvo overrides mobile ya existentes
- Mantener el orden de secciones numeradas con comentarios (ej: `/* 14. NUEVA SECCIÓN */`)

### JavaScript (`script.js`)
- Mantener `'use strict'` al inicio del archivo
- Sin frameworks, sin dependencias externas de lógica de negocio
- Toda función de init va dentro de `DOMContentLoaded` (línea ~389)
- Usar `debounce()` (línea 11) para handlers de scroll y resize
- No agregar `console.log()` en producción (solo el log estético de `console.log('%c...')` al final del init)
- Funciones nombradas con verbo: `initXxx()`, `handleXxx()`, `animateXxx()`

---

## Páginas y sus Secciones

### `index.html` — Landing Principal
- `#inicio` → Hero (badge, título, subtitle, CTAs, stats)
- `.explore` → 3 cards a Servicios / Suscripciones / Estudio
- `.social-proof` → Marquee infinito de logos de clientes
- `#testimonios` → 3 testimonials cards
- `#contacto` → CTA + formulario de contacto

### `servicios.html`
- Hero de página con badge y título
- Timeline de 6 etapas (`.services-timeline`)
- 6 service stage cards (`.service-stage-card[data-step]`)

### `suscripciones.html`
- Hero de página
- 4 pricing cards (Esencial $60k, Profesional $90k, Sistema $160k, Empresarial custom)

### `estudio.html`
- About section (`.about-page`)
- Methodology flow (4 pasos: Evaluamos → Detectamos → Definimos → Construimos)
- Differential box (Kreär vs mercado)

### `privacidad.html`
- Página legal con 11 secciones, cumple Ley 25.326 AR

---

## Formulario de Contacto

Flujo: HTML (`#contact-form`) → validación JS → fetch a Google Apps Script URL (hardcoded en `script.js`)
- Campos: nombre, teléfono (con selector de prefijo de país), email, mensaje
- El script de Google Apps Script vive en `google-apps-script.js` (referencia — se despliega en Google)
- Ver `docs/DEVELOPMENT.md` para instrucciones de modificación

---

## Git Workflow

### Tipos de Commit
| Tipo | Cuándo usar |
|------|-------------|
| `feat:` | Nueva funcionalidad o sección |
| `fix:` | Corrección de bug |
| `style:` | Cambios visuales/CSS sin lógica |
| `refactor:` | Reorganización sin cambio de comportamiento |
| `docs:` | Solo archivos .md o comentarios |
| `chore:` | .gitignore, configs, assets |

### Proceso de Push
```bash
git add <archivos específicos>   # nunca git add -A sin revisar
git commit -m "tipo: descripción corta"
git push origin main
```

Push directo a `main`. No hay CI/CD — GitHub Pages publica automáticamente en ~30s.

---

## Prohibiciones

- **No instalar paquetes npm** — el proyecto es HTML/CSS/JS puro, sin node_modules
- **No cambiar IDs de tracking** (GA, GTM, Meta Pixel) sin confirmar con el cliente
- **No modificar CNAME** — rompería el dominio en producción
- **No eliminar `google-apps-script.js`** sin reemplazar el backend del formulario
- **No usar fuentes distintas** a `mundial` y `new-order` — son parte del sistema de diseño
- **No subir imágenes sin optimizar** — preferir WebP, max 200KB para imágenes de contenido
- **No romper la lógica i18n** — siempre agregar claves en ES y EN
- **No agregar `console.log()` de debug** — solo el log estético en `initLanguageSwitcher()`

---

## Documentación del Equipo

| Rol | Archivo |
|-----|---------|
| Desarrollador | [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) |
| Diseñador | [`docs/DESIGN.md`](docs/DESIGN.md) |
| Marketing / Copy | [`docs/MARKETING.md`](docs/MARKETING.md) |
| SEO | [`docs/SEO.md`](docs/SEO.md) |
| Historial | [`docs/CHANGELOG.md`](docs/CHANGELOG.md) |

---

## Contacto del Proyecto

- **Email:** krear.creativo@gmail.com
- **WhatsApp:** +54 362 452-2359
- **Instagram:** @estudio.krear
- **LinkedIn:** /in/kreär-estudio-creativo-0416b73a7/
- **Ubicación:** Resistencia, Chaco, Argentina
