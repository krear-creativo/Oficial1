# SEO.md — Estrategia de Posicionamiento

> Kreär · krearestudiocreativo.com

---

## Estado Actual del SEO (Junio 2026)

### Configurado ✓

- **Canonical tags** en todas las páginas
- **Open Graph** (og:title, og:description, og:image, og:url, og:type, og:locale)
- **Twitter Cards** (summary_large_image)
- **hreflang** ES y EN con x-default en `index.html`
- **JSON-LD** Organization schema en `index.html`
- **Meta robots** `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`
- **Google Analytics 4** (G-9609EGJC6X)
- **Google Tag Manager** (GTM-P2TLKQM3)
- **Meta Pixel** (873186255604884) — conversiones y remarketing
- **Meta Domain Verification** (content: `0cn8h67gud8r9jpdtv1oe110u4jtve`)
- **CNAME** con dominio personalizado (sin www redirect pendiente)

### Pendientes ✗

- [ ] `sitemap.xml` — No existe. Prioritario.
- [ ] `robots.txt` — No existe. Dejar indexar todo excepto `docs/`.
- [ ] Redirect www → non-www (o viceversa, pero consistente)
- [ ] Core Web Vitals audit (PageSpeed Insights)
- [ ] Alt texts más descriptivos en logos de clientes del marquee
- [ ] Schema adicional: `LocalBusiness`, `Service`, `FAQPage`
- [ ] Google Search Console verificación y monitoreo

---

## Keywords Objetivo

### Primarias (intención transaccional)

| Keyword | Volumen estimado | Competencia |
|---------|-----------------|-------------|
| estudio creativo estratégico Argentina | Bajo | Baja |
| agencia de branding Resistencia Chaco | Bajo | Muy baja |
| diseño web estratégico Argentina | Medio | Media |
| identidad de marca PyME Argentina | Bajo | Baja |
| automatizaciones con IA empresas Argentina | Bajo | Baja |

### Secundarias (intención informacional)

| Keyword | Intención |
|---------|-----------|
| cómo ordenar la comunicación de mi marca | Educacional |
| infraestructura digital empresa | Educacional |
| diferencia entre branding y diseño gráfico | Educacional |
| chatbots para empresas argentinas | Comparación |
| gestión de redes con estrategia | Educacional |

### Keywords de Marca (ya posicionadas o en proceso)

- "Kreär"
- "kreär estudio creativo"
- "krearestudiocreativo"
- "krear estudio chaco"

---

## Meta Tags por Página

### `index.html` — Landing Principal

```html
<title>Kreär — Estudio Estratégico Creativo</title>
<meta name="description" content="Kreär es un estudio creativo estratégico que ordena, profesionaliza y potencia la infraestructura digital de empresas. Diseño web, automatizaciones con IA, identidad de marca y campañas digitales." />
<link rel="canonical" href="https://www.krearestudiocreativo.com/" />
```

### `servicios.html`

```html
<title>Servicios | Kreär — Estudio Estratégico Creativo</title>
<meta name="description" content="Servicios de infraestructura digital: Diagnóstico, Landing, Sistemas Web, Identidad, Contenido y Soporte." />
<link rel="canonical" href="https://www.krearestudiocreativo.com/servicios.html" />
```

### `suscripciones.html`

```html
<title>Suscripciones | Kreär — Estudio Estratégico Creativo</title>
<meta name="description" content="Niveles de suscripción y planes de desarrollo web estratégico." />
<link rel="canonical" href="https://www.krearestudiocreativo.com/suscripciones.html" />
```

### `estudio.html`

```html
<title>Estudio | Kreär — Estudio Estratégico Creativo</title>
<meta name="description" content="Conocé más sobre Kreär, nuestro enfoque estratégico y nuestra metodología de trabajo." />
<link rel="canonical" href="https://www.krearestudiocreativo.com/estudio.html" />
```

### `privacidad.html`

```html
<title>Política de Privacidad | Kreär</title>
<meta name="description" content="Política de privacidad de Kreär Estudio Creativo. Tratamiento de datos personales según Ley 25.326." />
<link rel="canonical" href="https://www.krearestudiocreativo.com/privacidad.html" />
<meta name="robots" content="noindex, follow" />  <!-- RECOMENDADO: no indexar páginas legales -->
```

---

## JSON-LD Schema (index.html)

Schema actual: `Organization`. Completar / mejorar con:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://www.krearestudiocreativo.com/#organization",
      "name": "Kreär",
      "alternateName": "Kreär Estudio Creativo",
      "url": "https://www.krearestudiocreativo.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.krearestudiocreativo.com/images/logo.png"
      },
      "image": "https://www.krearestudiocreativo.com/images/og-cover.png",
      "description": "Estudio estratégico creativo especializado en infraestructura digital.",
      "foundingDate": "2023",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Resistencia",
        "addressRegion": "Chaco",
        "addressCountry": "AR"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+54-362-452-2359",
        "contactType": "customer service",
        "availableLanguage": ["Spanish", "English"]
      },
      "sameAs": [
        "https://www.instagram.com/estudio.krear/",
        "https://www.linkedin.com/in/kreär-estudio-creativo-0416b73a7/"
      ],
      "priceRange": "$$"
    }
  ]
}
```

---

## Checklist para Nueva Página

Al crear una nueva página HTML, verificar:

**Head:**
- [ ] `<title>Página | Kreär — Estudio Estratégico Creativo</title>` (máx 60 caracteres)
- [ ] `<meta name="description">` (130-160 caracteres, incluir keyword principal)
- [ ] `<link rel="canonical" href="URL completa">`
- [ ] `<meta property="og:title">`, `og:description`, `og:image`, `og:url`
- [ ] `<meta name="twitter:card">`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Si es página legal/utils: `<meta name="robots" content="noindex, follow">`
- [ ] Pixel de Meta + GA + GTM copiados del template

**Contenido:**
- [ ] H1 único con keyword principal
- [ ] Alt texts en todas las imágenes (descriptivos, no "imagen1.jpg")
- [ ] Links internos a otras páginas del sitio
- [ ] Link externo de retorno (WhatsApp, email)

---

## Crear `sitemap.xml` (PENDIENTE — PRIORITARIO)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://www.krearestudiocreativo.com/</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="es" href="https://www.krearestudiocreativo.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://www.krearestudiocreativo.com/?lang=en"/>
  </url>

  <url>
    <loc>https://www.krearestudiocreativo.com/servicios.html</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.krearestudiocreativo.com/suscripciones.html</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.krearestudiocreativo.com/estudio.html</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

---

## Crear `robots.txt` (PENDIENTE)

```txt
User-agent: *
Allow: /
Disallow: /docs/

Sitemap: https://www.krearestudiocreativo.com/sitemap.xml
```

El `Disallow: /docs/` evita que los crawlers indexen la documentación interna.

---

## Open Graph — Imagen

**Archivo:** `images/og-cover.png`
**Dimensiones:** 1200 × 630px (obligatorio)
**Contenido sugerido:** Logo Kreär sobre fondo navy con tagline
**Verificar en:** developers.facebook.com/tools/debug/ y opengraph.xyz

---

## Google Search Console

**Pasos pendientes:**
1. Ir a search.google.com/search-console
2. Agregar propiedad `https://www.krearestudiocreativo.com`
3. Verificar via HTML tag o via Google Analytics (ya configurado)
4. Subir sitemap.xml una vez creado
5. Revisar errores de indexación, Core Web Vitals, y keywords orgánicas mensualmente

---

## Métricas a Monitorear (Mensual)

| Métrica | Herramienta | Objetivo |
|---------|-------------|----------|
| Impresiones orgánicas | Search Console | Crecimiento mes a mes |
| Clicks orgánicos | Search Console | CTR > 3% |
| Posición promedio keywords | Search Console | Top 10 para keywords de marca |
| Core Web Vitals (LCP, CLS, FID) | PageSpeed Insights | LCP < 2.5s, CLS < 0.1 |
| Sesiones orgánicas | Google Analytics | Crecimiento 10%+ mensual |
| Tasa de conversión (formulario) | GA4 Events | > 2% de sesiones |
