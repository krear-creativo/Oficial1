# CHANGELOG.md — Historial de Versiones

> Kreär · krearestudiocreativo.com
> Formato: [Semántico] — YYYY-MM-DD

---

## [1.1.0] — 2026-06-24

### Agregado
- `CLAUDE.md` — Base de contexto permanente para Claude Code (instrucciones del proyecto)
- `docs/` — Carpeta de documentación interna del equipo
  - `docs/DEVELOPMENT.md` — Guía técnica para desarrolladores
  - `docs/DESIGN.md` — Sistema de diseño y guía visual completa
  - `docs/MARKETING.md` — Estrategia de marca, copy y audiencia
  - `docs/SEO.md` — Estrategia SEO, checklist y pendientes
  - `docs/CHANGELOG.md` — Este archivo

### Mejorado
- `.gitignore` — Ahora incluye `.DS_Store`, `node_modules/`, `.env`, `*.log`, `Thumbs.db`, `.vscode/`
- `README.md` — Reescrito con estructura profesional, tech stack, setup local y links a docs

---

## [1.0.3] — 2026-05-XX

### Mejorado
- Actualización de `suscripciones.html` (commit: `f6a681a`)

---

## [1.0.2] — 2026-05-XX

### Mejorado
- Actualización de `servicios.html` (commit: `f6a681a`)

---

## [1.0.1] — 2026-05-XX

### Mejorado
- Actualización de `privacidad.html` (commit: `65f298f`)
- Actualización de `index.html` (commit: `c9157e4`)
- Actualización de `estudio.html` (commit: `720364d`)

---

## [1.0.0] — 2026-03-XX — Lanzamiento Inicial

### Sitio Completo — 5 Páginas

**`index.html` — Landing Principal**
- Hero con badge, título, subtítulo, CTAs, stats animados
- 3 Explore Cards (Servicios, Suscripciones, Estudio)
- Social proof marquee infinito con 8 logos de clientes
- 3 Testimonios (cards con stars y quote)
- CTA final con título, chips de contacto (WhatsApp + Email) y formulario
- Footer con logo, tagline, sitemap, contacto y redes sociales

**`servicios.html` — Servicios**
- Hero de página con badge y descripción
- Timeline horizontal de 6 etapas (interactivo)
- 6 Service Stage Cards con fricción y resultado por etapa:
  1. Kreär Diagnóstico
  2. Kreär Base
  3. Kreär Sistema
  4. Kreär Soporte
  5. Kreär Marca
  6. Kreär Contenido

**`suscripciones.html` — Planes**
- Hero de página
- 4 Pricing Cards:
  - Nivel 1 — Esencial: $60.000 ARS/mes
  - Nivel 2 — Profesional: $90.000 ARS/mes
  - Nivel 3 — Sistema: $160.000 ARS/mes
  - Nivel 4 — Empresarial: Cotización personalizada

**`estudio.html` — El Estudio**
- About section con imagen/logo, tags, texto de filosofía y CTA
- Methodology flow: 4 pasos (Evaluamos, Detectamos, Definimos, Construimos)
- Differential box: Kreär vs El mercado

**`privacidad.html` — Política de Privacidad**
- 11 secciones legales conforme Ley 25.326 Argentina
- Bilingüe ES/EN

### Sistema de Diseño
- **CSS:** 3221 líneas, 14 secciones, custom properties completas
- **Colores:** Navy `#00024D` + Lima `#D9E73C`
- **Fuentes:** Adobe Typekit (mundial + new-order)
- **Dark Luxury Creative** como concepto estético

### JavaScript (1500 líneas)
- Sistema de partículas (50 puntos flotantes)
- Navbar sticky con scroll behavior
- Mobile menu hamburguesa
- Flip cards con soporte touch/teclado
- Scroll animations (IntersectionObserver)
- Contadores animados (ease-out-cubic)
- Smooth scroll
- Services timeline highlight/current
- Parallax hero background
- Active nav links
- Cursor glow 3D (desktop)
- **i18n completo ES/EN** con switch animado y persistencia localStorage
- **Formulario** con validación, loading state, feedback y envío a Google Apps Script

### Tracking y Analytics
- Google Analytics 4 (G-9609EGJC6X)
- Google Tag Manager (GTM-P2TLKQM3)
- Meta Pixel (873186255604884)
- Meta Domain Verification

### SEO
- Canonical tags en todas las páginas
- Open Graph y Twitter Cards
- JSON-LD Organization schema
- hreflang ES/EN/x-default
- Meta robots configurado

### Infraestructura
- **Hosting:** GitHub Pages, branch `main`
- **Dominio:** krearestudiocreativo.com (CNAME configurado)
- **Backend formulario:** Google Apps Script

---

## Roadmap — Próximas Versiones

### [1.2.0] — Pendiente

- [ ] Crear `sitemap.xml`
- [ ] Crear `robots.txt`
- [ ] Agregar `noindex` a `privacidad.html`
- [ ] Verificar en Google Search Console
- [ ] Core Web Vitals audit y optimización
- [ ] Optimizar imágenes a WebP
- [ ] Mejorar alt texts de logos de clientes

### [1.3.0] — Futuro

- [ ] Sección FAQ en landing
- [ ] Portfolio / Casos de éxito (con permiso de clientes)
- [ ] Blog / Recursos (artículos estratégicos)
- [ ] Schema LocalBusiness y Service en JSON-LD
- [ ] Mejoras de accesibilidad (WCAG AA)

### [2.0.0] — Visión

- [ ] Quiz interactivo "¿En qué nivel estás?"
- [ ] Sistema de presupuesto online
- [ ] Área de clientes (portal privado)
