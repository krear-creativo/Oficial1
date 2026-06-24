# Kreär — Estudio Estratégico Creativo

Sitio web oficial de **Kreär**, estudio estratégico creativo con sede en Resistencia, Chaco, Argentina.

🌐 **[krearestudiocreativo.com](https://www.krearestudiocreativo.com)**

---

## Descripción

Kreär construye infraestructura digital estratégica para empresas: diagnóstico de marca, identidad visual, desarrollo web, automatizaciones con IA y campañas digitales.

Este repositorio contiene el sitio web completo — 5 páginas HTML estáticas con sistema de diseño propio, bilingüe ES/EN y formulario de contacto integrado.

---

## Tech Stack

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilos | CSS3 + Custom Properties |
| Lógica | JavaScript ES6+ Vanilla |
| Fuentes | Adobe Typekit (`mundial` + `new-order`) |
| Hosting | GitHub Pages |
| Dominio | krearestudiocreativo.com (CNAME) |
| Formulario | Google Apps Script |
| Analytics | GA4 + GTM + Meta Pixel |

**Sin frameworks. Sin npm. Sin bundler.**

---

## Estructura del Proyecto

```
/
├── index.html              # Landing principal
├── servicios.html          # Servicios (6 etapas)
├── suscripciones.html      # Planes (4 niveles)
├── estudio.html            # Sobre el estudio
├── privacidad.html         # Política de privacidad
├── styles.css              # Sistema de diseño (3221 líneas)
├── script.js               # Interactividad + i18n ES/EN
├── google-apps-script.js   # Backend del formulario (referencia)
├── CLAUDE.md               # Contexto para Claude Code
├── images/                 # Logos, favicon, og-cover
├── FONT/                   # Fuentes locales de respaldo
├── Panel/                  # Recursos de diseño internos
└── docs/                   # Documentación del equipo
    ├── DEVELOPMENT.md
    ├── DESIGN.md
    ├── MARKETING.md
    ├── SEO.md
    └── CHANGELOG.md
```

---

## Setup Local

```bash
# Clonar el repositorio
git clone https://github.com/krear-creativo/Oficial1.git
cd Oficial1
```

**Opción A — VS Code Live Server (recomendado)**
1. Instalar extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Click derecho en `index.html` → "Open with Live Server"
3. Abrir `http://127.0.0.1:5500`

**Opción B — Python**
```bash
python3 -m http.server 8000
# Abrir http://localhost:8000
```

> Siempre usar un servidor local (no `file://`). Las fuentes y scripts de tracking requieren HTTP.

---

## Sistema de Diseño

**Colores principales:**
- Navy: `#00024D` (`--primary-600`)
- Lima: `#D9E73C` (`--accent-500`)

**Fuentes:** `mundial` (body) + `new-order` (headings) via Adobe Typekit.

Ver [`docs/DESIGN.md`](docs/DESIGN.md) para el sistema de diseño completo.

---

## Deployment

El deploy es **automático**:
```bash
git push origin main
# GitHub Pages publica en ~30 segundos
```

No hay CI/CD ni builds. Lo que se pushea a `main` es lo que se ve en producción.

---

## Documentación del Equipo

| Área | Archivo |
|------|---------|
| Desarrollo | [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) |
| Diseño | [`docs/DESIGN.md`](docs/DESIGN.md) |
| Marketing | [`docs/MARKETING.md`](docs/MARKETING.md) |
| SEO | [`docs/SEO.md`](docs/SEO.md) |
| Historial | [`docs/CHANGELOG.md`](docs/CHANGELOG.md) |
| Claude Code | [`CLAUDE.md`](CLAUDE.md) |

---

## Contacto

- **Email:** krear.creativo@gmail.com
- **WhatsApp:** +54 362 452-2359
- **Instagram:** [@estudio.krear](https://instagram.com/krear.creativo)
- **Ubicación:** Resistencia, Chaco, Argentina

---

© 2026 Kreär Estudio Creativo. Todos los derechos reservados.
