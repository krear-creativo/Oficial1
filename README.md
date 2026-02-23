# Kreär — Estudio Estratégico Creativo
## Landing Page Premium Dark Mode

---

### 📋 Descripción del proyecto
Landing page profesional en dark mode para **Kreär**, estudio creativo estratégico orientado a empresas que necesitan ordenar y potenciar su comunicación. Diseño de tipo **Dark Luxury Creative** con animaciones premium y sistema de flip cards interactivo.

---

### 🎨 Paleta de colores

| Nombre | Hex | Uso |
|--------|-----|-----|
| Navy Primario | `#00024D` | Fondos, glow principal, gradientes |
| Lima Acento | `#D9E73C` | CTAs, highlights, textos de acento |
| Negro Puro | `#000000` | Fondo base |
| Gris Ultra Oscuro | `#020208` | Secciones alternas |
| Blanco | `#FFFFFF` | Textos principales |
| Gris Medio | `#A1A1AA` | Textos secundarios |

---

### 📸 Imágenes generadas con IA

```
images/
├── logo.png          → Logo de Kreär (K + icono geométrico)
├── hero_visual.png   → Grid estructural 3D con luz lima
├── service_1.png     → Diagnóstico Estratégico (radar holográfico)
├── service_2.png     → Identidad Visual (branding system 3D)
├── service_3.png     → Sistemas de Comunicación (red de nodos)
└── service_4.png     → Gestión de Redes (dashboard holográfico)
```

> **Nota:** Los servicios 5 (Campañas Ads) y 6 (Dirección Conceptual) usan placeholders CSS animados por limitación de cuota de imagen. Se pueden reemplazar fácilmente con imágenes reales.

---

### 📁 Estructura del proyecto

```
/
├── index.html      → Estructura HTML semántica completa
├── styles.css      → Sistema de diseño + animaciones CSS
├── script.js       → Interactividad + animaciones JS
├── README.md       → Este archivo
└── images/
    ├── logo.png
    ├── hero_visual.png
    ├── service_1.png
    ├── service_2.png
    ├── service_3.png
    └── service_4.png
```

---

### ✨ Características

- **Dark Luxury Creative** — Modo oscuro premium con glassmorphism
- **Flip Cards Interactivas** — Hover en desktop, tap en mobile
- **Sistema de Partículas** — 50 partículas flotantes con color lima
- **Navbar Sticky** — Con blur y border al scroll
- **Contadores Animados** — Stats animadas al entrar en viewport
- **Scroll Reveal** — Secciones aparecen con efecto de entrada
- **Parallax Sutil** — Movimiento de fondo en hero
- **Mouse Tracking 3D** — Hero visual reacciona al cursor
- **100% Responsive** — Desktop XL → Mobile
- **Menú Hamburguesa** — Para mobile y tablet
- **Smooth Scroll** — Navegación suave entre secciones
- **SEO Optimizado** — Meta tags, Open Graph, HTML semántico
- **Accesibilidad** — ARIA labels, navegación por teclado, prefers-reduced-motion

---

### 🔧 Cómo personalizar

#### Cambiar datos de contacto
En `index.html`, busca y reemplaza:
- `hola@krear.studio` → tu email real
- `https://wa.me/543624000000` → tu número de WhatsApp real
- `https://instagram.com/krear.studio` → tu Instagram real

#### Cambiar los colores
En `styles.css`, las líneas 14-16:
```css
--primary-600: #00024D;   /* Cambia el navy */
--accent-500: #D9E73C;    /* Cambia el lima */
```

#### Reemplazar imágenes de servicios 5 y 6
Coloca archivos `service_5.png` y `service_6.png` en la carpeta `images/` y actualiza el HTML reemplazando las secciones `.service-card-css` por el mismo patrón de las primeras 4 cards.

#### Cambiar estadísticas del Hero
En `index.html`, busca `data-target="50"` y modifica los números según tu realidad.

---

### 🚀 Para publicar

1. Sube todos los archivos a tu hosting (Netlify, Vercel, cPanel, etc.)
2. Asegúrate de mantener la estructura de carpetas intacta
3. No necesita backend — es 100% HTML/CSS/JS estático
4. Compatible con todos los navegadores modernos

---

### 👤 Créditos

- **Diseño y desarrollo:** Kreär — Estudio Estratégico Creativo
- **Imágenes:** Generadas con IA (Google Imagen)
- **Fuentes:** Plus Jakarta Sans + Inter (Google Fonts)
- **Año:** 2026

---

*© 2026 Kreär. Todos los derechos reservados.*
