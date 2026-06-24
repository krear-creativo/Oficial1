# DEVELOPMENT.md — Guía Técnica para Desarrolladores

> Kreär · krearestudiocreativo.com · Repositorio: krear-creativo/Oficial1

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilos | CSS3 con Custom Properties |
| Lógica | JavaScript ES6+ Vanilla |
| Hosting | GitHub Pages (branch `main`) |
| Formulario | Google Apps Script |
| Fuentes | Adobe Typekit (`mundial` + `new-order`) |
| Analytics | Google Analytics 4 + GTM + Meta Pixel |

**Sin npm, sin bundler, sin frameworks.** El proyecto se despliega directamente como archivos estáticos.

---

## Setup Local

```bash
# Clonar el repositorio
git clone https://github.com/krear-creativo/Oficial1.git
cd Oficial1

# Opción A — VS Code Live Server (recomendado)
# Instalar extensión "Live Server" de Ritwick Dey
# Click derecho en index.html → "Open with Live Server"
# Sirve en http://127.0.0.1:5500

# Opción B — Python (si está disponible)
python3 -m http.server 8000
# Abrir http://localhost:8000

# Opción C — Node http-server
npx http-server . -p 8000
```

**Importante:** Abrir siempre desde un servidor local, no directamente como `file://`. Las fuentes Adobe Typekit y los scripts de tracking requieren HTTP/HTTPS.

---

## Estructura de Archivos Clave

```
styles.css      — 3221 líneas organizadas en secciones numeradas (0-14)
script.js       — 1500 líneas, funciones modulares de init
google-apps-script.js — Script de referencia para el backend del formulario
```

### Secciones de `styles.css`

```
0. Reset & Root (variables CSS)
1. Utilities (container, btn-primary, btn-outline, glass-card, section-*)
2. Animations (keyframes)
3. Particles
4. Navbar + 4b Language Switcher
5. Hero
6. Social Proof (marquee infinito)
7. Services Flip Cards + 7b Services Timeline (página servicios)
8. Methodology
9. About
10. Testimonials
11. Final CTA + Formulario
12. Footer
13. Responsive (breakpoints)
14. Explore Hover Cards + Abstract Hero Animations
```

Al agregar nuevas secciones CSS, numerarlas continuando la secuencia y agregar el comentario de bloque:
```css
/* ============================================================
   15. NUEVA SECCIÓN
   ============================================================ */
```

---

## Agregar una Nueva Página

1. **Copiar la estructura base** desde cualquier página existente (ej: `estudio.html`)
2. **Actualizar el `<head>`:**
   - `<title>NuevaPágina | Kreär — Estudio Estratégico Creativo</title>`
   - `<meta name="description" content="...">`
   - `<link rel="canonical" href="https://www.krearestudiocreativo.com/nueva-pagina.html">`
3. **Actualizar el navbar activo** — agregar `style="color:var(--accent-400);"` al link de la página actual
4. **Agregar el link en los navbars** de todas las páginas existentes (desktop + mobile)
5. **Agregar claves i18n** para el contenido nuevo en ambos idiomas en `script.js`
6. **Verificar el footer** — todos los links deben estar presentes

---

## Sistema de Partículas

```js
// script.js línea 40 — initParticles()
// Genera 50 partículas en #particles-container (fijo, z-index:0)
// Las partículas se reducen en mobile (CSS: .particle:nth-child(n+20) { display: none })
// Para cambiar cantidad: modificar particleCount en la función
```

Archivo CSS relacionado: `styles.css línea 493` → `.particles-container`, `.particle`

---

## Animaciones de Scroll (Reveal on Scroll)

```js
// script.js línea 161 — initScrollAnimations()
// Usa IntersectionObserver con threshold: 0.12
// Agregar clase .reveal-item a cualquier elemento para animarlo al entrar al viewport
```

```css
/* styles.css línea 471 */
.reveal-item {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s, transform 0.7s;
}
.reveal-item.revealed { opacity: 1; transform: translateY(0); }
```

**El stagger** (delay escalonado) se calcula automáticamente por posición entre hermanos, en múltiplos de 120ms.

---

## Contadores Animados (Hero Stats)

```html
<!-- index.html línea 205 -->
<span class="stat-number" data-target="50" id="stat-1">0</span>
```

```js
// script.js línea 193 — initCounters()
// Usa animateCounter() con easing ease-out-cubic
// Dispara cuando .hero-stats entra al viewport (threshold: 0.5)
// Para cambiar valores: solo cambiar data-target en el HTML
```

---

## Formulario de Contacto

**Flujo completo:**
```
Usuario completa form (#contact-form)
→ JS valida campos (nombre, teléfono, email, mensaje)
→ fetch POST a URL de Google Apps Script
→ Apps Script guarda en Google Sheets y envía email de notificación
→ Respuesta JSON { success: true/false }
→ JS muestra .form-feedback (.success o .error)
```

**Para modificar el endpoint del formulario:**
```js
// script.js — buscar: fetch('https://script.google.com/macros/s/...')
// Reemplazar con la nueva URL del Apps Script desplegado
```

**Para redesplegar el Apps Script:**
1. Abrir `google-apps-script.js` como referencia
2. Ir a script.google.com → proyecto del formulario
3. Pegar el código actualizado
4. Desplegar → Nueva versión → Copiar URL
5. Actualizar URL en `script.js`

---

## Sistema i18n (Internacionalización)

```js
// script.js línea 427 — objeto translations
// Estructura: translations.es y translations.en
// Cada clave: 'seccion.elemento': 'Contenido...'

// Aplicar idioma: applyLanguage('es') o applyLanguage('en')
// Persiste en localStorage ('krear-lang')

// Para HTML con innerHTML (ej: títulos con spans de color):
'hero.title': 'Tu sistema <span class="text-accent gradient-text">que convierte</span>'
// El sistema usa el.innerHTML = dict[key] — se permite HTML en las traducciones
```

**Para traducir placeholders:**
```html
<input data-i18n-placeholder="form.name.placeholder" placeholder="Tu nombre" />
```

---

## Responsive Breakpoints

```css
/* styles.css */
/* Mobile first — sin media query = mobile base */

@media (max-width: 767px) {
  /* Mobile — nav hamburguesa, layouts 1 columna, font sizes reducidos */
}

@media (max-width: 1023px) {
  /* Tablet — grids 2 columnas, hero sin visual orbital */
}

@media (max-width: 1200px) {
  /* Desktop chico — services grid 2 cols */
}
```

---

## Dependencias Externas

| Servicio | URL | Propósito |
|----------|-----|-----------|
| Adobe Typekit | `https://use.typekit.net/jru0lzd.css` | Fuentes mundial + new-order |
| Google Analytics | `https://googletagmanager.com/gtag/js?id=G-9609EGJC6X` | Analytics |
| Google Tag Manager | `https://googletagmanager.com/gtm.js?id=GTM-P2TLKQM3` | Tag management |
| Meta Pixel | `https://connect.facebook.net/en_US/fbevents.js` | Conversiones Meta |

**Si cualquiera de estas falla** (offline, CDN caído), el sitio sigue funcionando con fuentes de sistema fallback.

---

## Performance Checklist

- [ ] Imágenes: usar WebP siempre que sea posible, max 200KB para contenido
- [ ] Logos de clientes (marquee): max-height 48px, grayscale con CSS — no preocuparse por resolución alta
- [ ] El `og-cover.png` debe ser exactamente 1200×630px
- [ ] Favicon: `favicon.svg` (vectorial) + `favicon.png` (fallback 32×32)
- [ ] No agregar CSS inline salvo overrides de una sola propiedad
- [ ] Todos los scripts de tracking van en `<head>` (ya están configurados)

---

## Deployment

El deploy es automático:
1. `git push origin main`
2. GitHub Pages detecta el push y publica en ~30 segundos
3. Verificar en `https://krearestudiocreativo.com`

No hay staging, no hay CI/CD, no hay builds. Lo que se pushea es lo que se ve.

---

## Bugs Conocidos y Workarounds

- **Safari iOS flip cards:** Las flip cards 3D tienen un bug en Safari iOS. El workaround actual en mobile desactiva el 3D y apila front+back verticalmente (ver `styles.css línea 2889`).
- **Glass morphism Firefox:** `backdrop-filter` tiene soporte limitado en Firefox más antiguos. El fallback es un `background-color` semi-opaco.
- **Fuentes offline:** Adobe Typekit requiere conexión. Si no carga, el sistema usa `system-ui, -apple-system, sans-serif` como fallback.
