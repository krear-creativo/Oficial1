# DESIGN.md — Sistema de Diseño Visual

> Kreär · Estudio Estratégico Creativo · Dark Luxury Creative

---

## Identidad Visual

**Concepto:** Dark Luxury Creative. Sofisticación técnica + creatividad estratégica.
**Estética:** Dark mode como valor predeterminado. Navy profundo como lienzo. Lima vibrante como acción.
**Principio:** Menos es más. Cada elemento tiene un propósito.

---

## Paleta de Colores

### Colores Primarios (Navy)

| Token | Hex | Uso |
|-------|-----|-----|
| `--primary-900` | `#00011a` | Sombras más profundas |
| `--primary-800` | `#000230` | Bordes en glass cards |
| `--primary-700` | `#000240` | Backgrounds alternativos |
| `--primary-600` | `#00024D` | **Navy principal — fondo base** |
| `--primary-500` | `#000466` | Backgrounds de cards |
| `--primary-400` | `#000880` | Gradientes internos |
| `--primary-300` | `#0010a0` | Acentos navy claros |
| `--primary-200` | `#001ccc` | Usos excepcionales |

### Colores de Acento (Lima / Chartreuse)

| Token | Hex | Uso |
|-------|-----|-----|
| `--accent-900` | `#3d4200` | Rara vez |
| `--accent-800` | `#6b7300` | Rara vez |
| `--accent-700` | `#99a500` | Sombras de acento |
| `--accent-600` | `#bdd400` | Gradiente inicio de botones |
| `--accent-500` | `#D9E73C` | **Lima principal — énfasis máximo** |
| `--accent-400` | `#e2ed60` | Texto acento secundario |
| `--accent-300` | `#eaf283` | Hover states suaves |
| `--accent-200` | `#f2f7b0` | Rara vez |

### Colores de Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `--text-primary` | `#FFFFFF` | Texto principal |
| `--text-secondary` | `#E4E4E7` | Texto secundario |
| `--text-tertiary` | `#A1A1AA` | Texto de apoyo, descripciones |
| `--text-quaternary` | `#71717A` | Labels, metadata, placeholders |

### Colores Semánticos

| Token | Valor | Uso |
|-------|-------|-----|
| `--success` | `#22C55E` | Formulario enviado OK |
| `--info` | `#3B82F6` | Información |
| `--warning` | `#F59E0B` | Advertencias |

---

## Tipografía

### Familia de Fuentes

| Familia | Fuente real | Uso |
|---------|-------------|-----|
| `"mundial"` | Fontspring Mundial (Adobe Typekit) | Body, UI, navegación, botones, labels |
| `"new-order"` | New Order (Adobe Typekit) | Headings H1–H6, títulos de sección, section-title |
| `system-ui, -apple-system, sans-serif` | Sistema | Fallback si Typekit falla |

### Escala Tipográfica

| Elemento | Fuente | Tamaño | Peso | Letter-spacing |
|----------|--------|--------|------|---------------|
| H1 Hero | new-order | clamp(48px, 6vw, 76px) | 800 | -0.03em |
| H2 Section Title | new-order | clamp(36px, 5vw, 52px) | 800 | -0.02em |
| H2 CTA | new-order | clamp(36px, 5vw, 60px) | 800 | -0.03em |
| Body texto | mundial | 16px–18px | 400 | normal |
| Subtítulo sección | mundial | 18px | 400 | normal |
| Section Label (chip) | mundial | 11px | 600 | 0.15em (uppercase) |
| Nav links | mundial | 14px | 500 | normal |
| Botones | mundial | 15px | 700 | 0.02em |
| Feature tags | mundial | 11px | 600 | 0.05em |
| Stat numbers | mundial | 32px | 800 | -0.02em |

---

## Espaciado

```css
--section-padding: 120px;   /* padding vertical de secciones (desktop) */
/* Tablet (≤1023px): 80px | Mobile (≤767px): 64px */

--container-max: 1280px;    /* ancho máximo del contenido */
/* Padding horizontal: 32px desktop | 20px mobile */
```

### Grid System

| Layout | Breakpoint | Columnas |
|--------|-----------|----------|
| Services grid | desktop | 3 columnas |
| Services grid | tablet (≤1200px) | 2 columnas |
| Services grid | mobile | 1 columna |
| Testimonials | desktop | 3 columnas |
| Footer | desktop | 1.5fr 1fr 1fr 1fr |
| CTA / Contact | desktop | 1fr 1.2fr |
| About | desktop | 1fr 1.6fr |

---

## Radios (Border Radius)

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `8px` | Nav links, feature tags, social links |
| `--radius-md` | `16px` | Botones, cards medianas, inputs |
| `--radius-lg` | `24px` | Service cards, testimonial cards |
| `--radius-xl` | `32px` | Pricing cards, CTA form wrapper |
| `--radius-full` | `9999px` | Section labels (chips), badges, pills |

---

## Componentes

### Botón Primario — `.btn-primary`
```
Fondo: gradiente lima (--accent-600 → --accent-500 → --accent-400), animado
Texto: #000 / negro (contraste sobre lima)
Peso: 700, 15px
Padding: 16px 32px
Radius: --radius-md (16px)
Shadow: glow lima
Hover: translateY(-2px) + brightness(1.08)
```

### Botón Outline — `.btn-outline`
```
Fondo: transparente
Borde: 1px solid rgba(--accent-rgb, 0.3)
Texto: --text-primary (blanco)
Hover: borde lima, fondo rgba lima 0.06, texto lima, translateY(-2px)
```

### Glass Card — `.glass-card`
```
Fondo: gradiente lima/navy muy opaco (glass morphism)
Blur: backdrop-filter blur(24px) saturate(180%)
Borde: 1px solid rgba(--accent-rgb, 0.12)
Radius: --radius-lg
Hover: border-color más opaco + translateY(-4px) + glow
```

### Section Label — `.section-label`
```
Fondo: rgba(--accent-rgb, 0.1)
Borde: 1px solid rgba(--accent-rgb, 0.2)
Texto: --accent-500, 11px, uppercase, 0.15em spacing
Radius: --radius-full
Margin-bottom: 20px
```

### Explore Cards — `.explore-card`
```
Fondo: rgba(--primary-rgb, 0.78) + blur
Borde: 1px solid rgba(white, 0.11)
Radius: --radius-md
Hover: border lima, translateY(-4px), box-shadow glow
Contiene: título h3, capsules (.explore-capsule), descripción, botón
```

### Testimonial Cards — `.testimonial-card`
```
Igual base que glass card pero sin glass effect visual
Stars: --accent-500
Quote: texto secondary, italic
Hover: border lima + translateY(-4px)
```

### Pricing Cards — `.pricing-card`
```
Fondo: rgba(--primary-rgb, 0.78) + backdrop blur 12px
Borde: 1px solid rgba(white, 0.11)
Radius: --radius-xl
Card destacada (featured): borde lima, glow, badge "Más Popular"
```

### Badges Flotantes — `.hero-badge`, `.floating-badge`
```
Fondo: rgba(0, 0, 16, 0.8) + blur
Borde: 1px solid rgba(--accent-rgb, 0.25)
Texto: 12px, mundial, semi-bold
Padding: 8px 16px, radius sm
```

---

## Efectos y Animaciones

### Principios

1. **Propósito** — Cada animación comunica algo (estado, jerarquía, respuesta al usuario)
2. **Sutileza** — Nada distractivo. Duración ≤0.8s para transiciones de UI
3. **Performance** — Usar `transform` y `opacity`, nunca `width/height/top/left` en transiciones
4. **Accesibilidad** — Respetar `prefers-reduced-motion: reduce`

### Transiciones Disponibles

```css
--transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1)   /* hover states */
--transition-base: 0.4s cubic-bezier(0.4, 0, 0.2, 1)   /* card reveals */
--transition-slow: 0.8s cubic-bezier(0.16, 1, 0.3, 1)  /* entry animations */
```

### Keyframes Disponibles

| Nombre | Uso |
|--------|-----|
| `fade-in-up` | Entrada desde abajo (`.animate-fade-up`) |
| `scale-in` | Entrada con scale (`.animate-scale-in`) |
| `gradient-shift` | Animación de gradiente en botón primario |
| `float` | Flotación suave (hero visual) |
| `float-particle` | Movimiento de partículas |
| `orb-pulse` | Pulsación del badge dot |
| `scroll-dot` | Indicador de scroll |
| `rotate-ring` / `rotate-ring-reverse` | Anillos orbitales |
| `orbit-spin` / `orbit-spin-reverse` | Planetas orbitales |
| `marquee-scroll` | Carrusel infinito de logos |
| `badge-float` | Flotación de badges en hero |
| `dot-bounce` | Indicador de carga del formulario |
| `pulse-glow` | Pulsación del botón CTA |

### Reveal al Scroll — `.reveal-item`
```
Agregar clase .reveal-item a cualquier elemento para animarlo al entrar al viewport.
Se activa con .revealed cuando IntersectionObserver detecta el 70% visible.
Stagger automático por orden entre hermanos (cada 120ms).
```

### Delays de Entrada

```css
.anim-delay-1 { animation-delay: 0.1s; }
.anim-delay-2 { animation-delay: 0.25s; }
.anim-delay-3 { animation-delay: 0.45s; }
.anim-delay-4 { animation-delay: 0.65s; }
```

---

## Imágenes y Assets

### Carpeta `images/`

| Archivo | Uso |
|---------|-----|
| `logo.png` | Logo oscuro (para fondo claro — footer) |
| `logo2.png` | Logo claro/blanco (para navbar dark) |
| `favicon.svg` | Favicon vectorial (preferido) |
| `favicon.png` | Favicon raster (fallback 32×32) |
| `og-cover.png` | Open Graph cover (1200×630px) |
| `about_image.png` | Imagen de la sección About |
| `hero_visual.png` | Visual del hero (referencia — actualmente usa elemento CSS) |
| `Logo-*.png` | Logos de clientes (marquee) |
| `logo-whatsapp_1@2x.png` | Icono WhatsApp en CTA |
| `logo-mail_1@2x.png` | Icono Email en CTA |
| `logo-instagram@2x.png` | Icono Instagram |

### Logos de Clientes (Marquee)

Los logos se muestran en grayscale con filtro CSS:
```css
filter: grayscale(100%) brightness(200%) opacity(0.7);
/* Hover: sin filtro (a color) */
```

Tamaño en tarjeta: `200px × 100px` (la tarjeta), imagen `max-height: 48px`.
Formato recomendado: PNG con transparencia o SVG.
Agregar nuevo logo: duplicar un `.brand-logo-card` en ambas `.marquee-track` de `index.html`.

### Carpeta `Panel/`

Recursos internos de diseño: mockups, presentaciones, referencias.
No se sirven en la web. Solo para el equipo.

---

## Principios del Dark Luxury

1. **Navy profundo como lienzo** — Nunca fondos completamente negros (#000). Siempre navy (`#00024D`).
2. **Lima como acento único** — Solo un color de acento. No agregar colores adicionales al sistema.
3. **Transparencias estratégicas** — Usar `rgba()` y `backdrop-filter` para crear profundidad.
4. **Brillo sobre sombra** — Los glows (box-shadow lima) se prefieren a sombras negras.
5. **Bordes sutiles** — Bordes con `rgba(white, 0.08-0.15)` en lugar de bordes sólidos.
6. **Tipografía como jerarquía** — new-order para headline, mundial para todo lo demás.
7. **Espacio en blanco generoso** — Padding `--section-padding` respetado en todas las secciones.
