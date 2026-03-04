/**
 * KREÄR — Estudio Estratégico Creativo
 * script.js · Interactividad y animaciones
 */

'use strict';

/* ============================================================
   UTILITIES
   ============================================================ */
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function animateCounter(element, target, duration = 2000) {
  const start = performance.now();
  const increment = target / (duration / 16);
  let current = 0;

  function step(timestamp) {
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(target * eased);
    element.textContent = current;
    if (progress < 1) requestAnimationFrame(step);
    else element.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ============================================================
   PARTICLES SYSTEM
   ============================================================ */
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const particleCount = 50;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 20}s;
      animation-duration: ${15 + Math.random() * 15}s;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      opacity: ${0.15 + Math.random() * 0.4};
    `;
    fragment.appendChild(particle);
  }
  container.appendChild(fragment);
}

/* ============================================================
   NAVBAR — STICKY + SCROLL BEHAVIOR
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = debounce(() => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, 10);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen.toString());
    menu.setAttribute('aria-hidden', (!isOpen).toString());
  });

  // Close on link click
  document.querySelectorAll('[data-mobile-link]').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    }
  });
}

/* ============================================================
   FLIP CARDS — TOUCH / TAP SUPPORT ON MOBILE
   ============================================================ */
function initFlipCards() {
  const cards = document.querySelectorAll('.service-card-flip');

  cards.forEach(card => {
    // Touch/click flip for mobile
    card.addEventListener('click', (e) => {
      // Only trigger on touch devices / small screens
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        // Close others
        cards.forEach(c => {
          if (c !== card) c.classList.remove('flipped');
        });
        card.classList.toggle('flipped');
      }
    });

    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

  // Click outside to close all flipped cards
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card-flip') && window.innerWidth <= 1024) {
      cards.forEach(c => c.classList.remove('flipped'));
    }
  });
}

/* ============================================================
   SCROLL ANIMATIONS — INTERSECTION OBSERVER
   ============================================================ */
function initScrollAnimations() {
  const revealItems = document.querySelectorAll('.reveal-item');
  if (!revealItems.length) return;

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay based on siblings
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const i = siblings.indexOf(entry.target);
        const delay = (i % 4) * 120;

        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealItems.forEach(item => observer.observe(item));
}

/* ============================================================
   STATS COUNTER — ANIMATE ON VIEWPORT ENTER
   ============================================================ */
function initCounters() {
  const stats = document.querySelectorAll('.stat-number[data-target]');
  if (!stats.length) return;

  let countersStarted = false;

  const observer = new IntersectionObserver((entries) => {
    if (countersStarted) return;
    const isVisible = entries.some(e => e.isIntersecting);
    if (isVisible) {
      countersStarted = true;
      stats.forEach(stat => {
        const target = parseInt(stat.dataset.target, 10);
        animateCounter(stat, target, 2200);
      });
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}

/* ============================================================
   SMOOTH SCROLL — OVERRIDE ANCHOR LINKS
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });
}

/* ============================================================
   PARALLAX — SUBTLE HERO BACKGROUND
   ============================================================ */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg-gradient');
  if (!heroBg) return;

  const handleScroll = debounce(() => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.2}px)`;
  }, 5);

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ============================================================
   ACTIVE NAV LINKS — HIGHLIGHT CURRENT SECTION
   ============================================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   CURSOR GLOW — MOUSE TRACKING (desktop only)
   ============================================================ */
function initCursorGlow() {
  if (window.innerWidth <= 768) return;

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Apply subtle cursor-following glow to hero visual
  const heroVisual = document.querySelector('.hero-visual-wrapper');
  if (!heroVisual) return;

  function rafLoop() {
    const rect = heroVisual.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (mouseX - centerX) / window.innerWidth;
    const deltaY = (mouseY - centerY) / window.innerHeight;
    heroVisual.style.transform = `perspective(800px) rotateY(${deltaX * 8}deg) rotateX(${-deltaY * 6}deg)`;
    requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);
}

/* ============================================================
   ACTIVE NAV UNDERLINE (CSS injection helper)
   ============================================================ */
function injectNavActiveStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--accent-500) !important;
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   INIT ON DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initMobileMenu();
  initFlipCards();
  initScrollAnimations();
  initCounters();
  initSmoothScroll();
  initParallax();
  initActiveNavLinks();
  injectNavActiveStyles();

  // Cursor glow after a short delay to avoid performance hit on load
  setTimeout(initCursorGlow, 1000);

  // Log
  console.log('%cKreär 🎯 Estudio Estratégico Creativo', 'color: #D9E73C; font-weight: bold; font-size: 14px;');
  console.log('%cUna marca ordenada vende sin gritar.', 'color: #A1A1AA; font-size: 12px;');

  // Language switcher (after DOM is ready)
  initLanguageSwitcher();
});

/* ============================================================
   RESIZE HANDLER — RESET FLIPPED CARDS ON DESKTOP
   ============================================================ */
window.addEventListener('resize', debounce(() => {
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.service-card-flip.flipped').forEach(card => {
      card.classList.remove('flipped');
    });
  }
}, 200));

/* ============================================================
   LANGUAGE SWITCHER — i18n
   ============================================================ */
const translations = {
  es: {
    // Page title
    pageTitle: 'Kreär — Estudio Estratégico Creativo',

    // Navbar
    'nav.services': 'Servicios',
    'nav.methodology': 'Metodología',
    'nav.about': 'Nosotros',
    'nav.clients': 'Clientes',
    'nav.cta': 'Hablemos',

    // Hero
    'hero.badge': 'Estudio Estratégico Creativo · Chaco, Argentina',
    'hero.title.line1': 'La comunicación',
    'hero.title.line2': 'que tu empresa',
    'hero.title.line3': 'merece tener.',
    'hero.subtitle1': 'Ordenamos, profesionalizamos y potenciamos tu comunicación desde la',
    'hero.subtitle1.strong': 'estrategia',
    'hero.subtitle2': 'No diseñamos piezas — construimos sistemas que sostienen tu marca en el tiempo.',
    'hero.cta.primary': 'Empezar diagnóstico',
    'hero.cta.secondary': 'Ver servicios',
    'hero.stat1': 'Marcas acompañadas',
    'hero.stat2': 'Años de trayectoria',
    'hero.stat3': 'Orientado a resultados',

    // Social proof
    'proof.label': 'Empresas que ordenaron su comunicación con nosotros',

    // Services
    'services.label': 'Lo que hacemos',
    'services.title': 'Servicios diseñados',
    'services.title.accent': 'desde la estrategia',
    'services.subtitle': 'Cada servicio es parte de un sistema pensado para que tu marca comunique con claridad y coherencia.',

    'svc1.title': 'Diagnóstico Estratégico',
    'svc1.desc': 'Evaluamos el estado actual de tu marca: posicionamiento, coherencia visual, mensajes y alineación con tu propósito real. Detectamos brechas y definimos el norte.',
    'svc1.tag1': 'Posicionamiento', 'svc1.tag2': 'Coherencia', 'svc1.tag3': 'Análisis',
    'svc1.title.short': 'Diagnóstico de Marca',

    'svc2.title': 'Identidad Visual',
    'svc2.desc': 'Construimos sistemas de identidad visual completos: logo, paleta, tipografía, tono, aplicaciones. Cada decisión tiene un porqué estratégico detrás.',
    'svc2.tag1': 'Branding', 'svc2.tag2': 'Sistema Visual', 'svc2.tag3': 'Manual',

    'svc3.title': 'Sistemas de Comunicación',
    'svc3.desc': 'Desarrollamos la estructura completa de comunicación de tu empresa: qué decir, cómo decirlo, en qué canal y con qué frecuencia. Un sistema que funciona solo.',
    'svc3.tag1': 'Estructura', 'svc3.tag2': 'Mensajes', 'svc3.tag3': 'Canales',

    'svc4.title': 'Gestión de Redes',
    'svc4.desc': 'Gestionamos tus redes con enfoque estratégico. Sin improvisar contenido ni replicar tendencias sin sentido. Cada publicación responde a un objetivo claro de marca.',
    'svc4.tag1': 'Contenido', 'svc4.tag2': 'Estrategia', 'svc4.tag3': 'Analytics',

    'svc5.title': 'Campañas Publicitarias',
    'svc5.desc': 'Diseñamos y ejecutamos campañas de Ads con dirección estratégica. Google, Meta, Programática. No apostamos al azar — cada campaña tiene propósito y métricas claras.',
    'svc5.tag3': 'Performance',

    'svc6.title': 'Dirección Conceptual',
    'svc6.desc': 'Definimos el concepto que unifica toda la comunicación de tu marca. El hilo conductor que da sentido a cada pieza, campaña y decisión creativa que tu empresa tome.',
    'svc6.tag1': 'Concepto', 'svc6.tag2': 'Narrativa', 'svc6.tag3': 'Dirección',

    // Methodology
    'method.label': 'Cómo trabajamos',
    'method.title': 'Antes de ejecutar,',
    'method.title.accent': 'pensamos.',
    'method.subtitle': 'La ejecución es consecuencia del pensamiento estratégico.',
    'method.subtitle2': 'No al revés.',
    'method.step1.title': 'Evaluamos',
    'method.step1.desc': 'Analizamos tu marca, tu mercado y a tu competencia. Entendemos quién eres, dónde estás y adónde querés ir.',
    'method.step2.title': 'Detectamos',
    'method.step2.desc': 'Identificamos desalineaciones, inconsistencias y oportunidades de mejora. Mapeamos lo que funciona y lo que frena.',
    'method.step3.title': 'Definimos',
    'method.step3.desc': 'Establecemos la dirección estratégica. El concepto, el posicionamiento deseado y la hoja de ruta de comunicación.',
    'method.step4.title': 'Construimos',
    'method.step4.desc': 'Desarrollamos el sistema completo: identidad, mensajes, piezas, canales. Todo conectado. Todo con propósito.',

    // Differential
    'diff.quote1': '"No diseñamos piezas.',
    'diff.quote2': 'Construimos sistemas que sostienen la marca en el tiempo."',
    'diff.market.title': 'El mercado ofrece',
    'diff.market.li1': 'Estética sin estrategia',
    'diff.market.li2': 'Métricas sin dirección',
    'diff.market.li3': 'Ejecución sin planificación',
    'diff.krear.title': 'Kreär ofrece',
    'diff.krear.li1': 'Estrategia + Creatividad',
    'diff.krear.li2': 'Dirección + Ejecución',
    'diff.krear.li3': 'Sistema + Coherencia',

    // Hero floating badges
    'badge.strategy': 'Estrategia',
    'badge.direction': 'Dirección',
    'badge.system': 'Sistema',

    // About
    'about.tag1': 'Estrategia', 'about.tag2': 'Creatividad', 'about.tag3': 'Dirección',
    'about.label': 'Quiénes somos',
    'about.title': 'Somos el estudio',
    'about.title.accent': 'que te faltaba.',
    'about.p1': 'En Kreär trabajamos con empresas que',
    'about.p1.strong': 'ya están en movimiento,',
    'about.p1.rest': 'pero cuya comunicación no evolucionó al mismo ritmo que su negocio. Eso crea una brecha entre lo que son y lo que proyectan. Cerramos esa brecha.',
    'about.p2': 'No comenzamos diseñando. Comenzamos',
    'about.p2.strong': 'analizando, pensando y estructurando',
    'about.p2.rest': 'Porque la coherencia genera confianza, la claridad reduce fricción y la dirección precede a la ejecución.',
    'about.p3': 'Nuestra visión es convertirnos en el estudio estratégico de referencia que',
    'about.p3.strong': 'ordenó la comunicación empresarial de la región',
    'about.p3.rest': '— y desde ahí, escalar.',
    'about.quote': '"Una marca ordenada vende sin gritar."',
    'about.cta': 'Trabajemos juntos',
    'about.location': 'Resistencia, Chaco · Argentina',

    // Testimonials
    'test.label': 'Lo que dicen',
    'test.title': 'Empresas que ya',
    'test.title.accent': 'ordenaron su comunicación',
    'test.q1': '\"Kreär hizo algo que ninguna agencia anterior había logrado: entender cómo funciona realmente nuestra empresa y traducirlo en una comunicación que nos representa con claridad. <strong>La diferencia no solo estuvo en lo visual, sino en la dirección.</strong>\"',
    'test.q2': '\"Lo que más valoro es que no empiezan diseñando, empiezan pensando. El diagnóstico fue preciso y nos permitió detectar problemas que llevábamos años sin ver. <strong>A partir de ahí, todo empezó a tener sentido.\"</strong>',
    'test.q3': '\"Después de trabajar con Kreär, nuestra comunicación empezó a reflejar lo que <strong>realmente somos</strong>. Esa coherencia entre lo que hacemos y lo que proyectamos fortaleció la percepción de la marca frente a nuestros clientes.\"',

    // CTA
    'cta.label': '¿Listo para el cambio?',
    'cta.title': '¿Tu comunicación está',
    'cta.title.accent': 'a la altura de tu empresa?',
    'cta.subtitle': 'Si tu negocio creció pero tu comunicación se quedó atrás, es momento de ordenar. Empezamos con un diagnóstico.',
    'cta.button': 'Quiero mi diagnóstico',
    'cta.note': 'Sin compromiso · Respuesta en 24hs · 100% estratégico',

    // Form
    'form.name.label': 'Nombre',
    'form.name.placeholder': 'Tu nombre',
    'form.phone.label': 'Número',
    'form.phone.placeholder': '+54 362 000 0000',
    'form.email.label': 'Email',
    'form.email.placeholder': 'tu@empresa.com',
    'form.message.label': 'Consulta',
    'form.message.placeholder': 'Contanos sobre tu proyecto o consulta...',
    'form.consent': 'Acepto el tratamiento de mis datos personales para recibir respuesta a mi consulta.',
    'form.submit': 'Enviar consulta',
    'form.success': 'Tu solicitud fue recibida por el equipo. ¡Te respondemos pronto!',
    'form.error': 'Hubo un error al enviar. Por favor intentá de nuevo o escribinos directamente.',
    'form.validation': 'Por favor completá todos los campos y aceptá los términos.',

    // Footer
    'footer.tagline': 'Una marca ordenada',
    'footer.tagline.em': 'vende sin gritar.',
    'footer.col1.title': 'Servicios',
    'footer.svc5': 'Campañas Ads',
    'footer.col2.title': 'Estudio',
    'footer.contact.link': 'Contacto',
    'footer.col3.title': 'Contacto',
    'footer.rights': '© 2026 Kreär. Todos los derechos reservados.',
    'footer.credits': 'Estrategia · Creatividad · Dirección',

    // 4 service pillars
    'pillar1.title': 'Dirección',
    'pillar1.desc': 'Antes de ejecutar, pensamos. Definimos el norte estratégico de tu marca desde el diagnóstico hasta la arquitectura de sistema completa.',
    'pillar1.t1': 'Diagnóstico', 'pillar1.t2': 'Posicionamiento', 'pillar1.t3': 'Arquitectura de marca', 'pillar1.t4': 'Definición de sistema',

    'pillar2.title': 'Activo Central',
    'pillar2.desc': 'Tu plataforma digital estratégica. Diseñamos y desarrollamos el activo digital que convierte visitantes en clientes y consolida tu presencia online.',
    'pillar2.t1': 'Sitio web estratégico', 'pillar2.t2': 'E-commerce', 'pillar2.t3': 'Landing systems',

    'pillar3.title': 'Automatización',
    'pillar3.desc': 'Infraestructura digital inteligente que trabaja mientras dormís. Implementamos sistemas de IA y automatización que escalan tu negocio sin escalar tu equipo.',
    'pillar3.t1': 'CRM', 'pillar3.t2': 'Email flows', 'pillar3.t3': 'IA aplicada', 'pillar3.t4': 'Chatbots', 'pillar3.t5': 'Integraciones',

    'pillar4.title': 'Expansión',
    'pillar4.desc': 'Una vez que el sistema está armado, lo escalamos. Generamos presencia, audiencia y conversiones con contenido, campañas y optimización continua.',
    'pillar4.t1': 'Contenido', 'pillar4.t2': 'Campañas', 'pillar4.t3': 'Redes', 'pillar4.t4': 'Optimización continua',
  },

  en: {
    // Page title
    pageTitle: 'Kreär — Strategic Creative Studio',

    // Navbar
    'nav.services': 'Services',
    'nav.methodology': 'Methodology',
    'nav.about': 'About',
    'nav.clients': 'Clients',
    'nav.cta': "Let's Talk",

    // Hero
    'hero.badge': 'Strategic Creative Studio · Chaco, Argentina',
    'hero.title.line1': 'The communication',
    'hero.title.line2': 'your company',
    'hero.title.line3': 'deserves to have.',
    'hero.subtitle1': 'We organize, professionalize and strengthen your communication through',
    'hero.subtitle1.strong': 'strategy',
    'hero.subtitle2': 'We don\'t design pieces — we build systems that sustain your brand over time.',
    'hero.cta.primary': 'Start diagnosis',
    'hero.cta.secondary': 'View services',
    'hero.stat1': 'Brands supported',
    'hero.stat2': 'Years of experience',
    'hero.stat3': 'Results-oriented',

    // Social proof
    'proof.label': 'Companies that organized their communication with us',

    // Services
    'services.label': 'What we do',
    'services.title': 'Services designed',
    'services.title.accent': 'from strategy',
    'services.subtitle': 'Each service is part of a system designed so your brand communicates with clarity and coherence.',

    'svc1.title': 'Strategic Diagnosis',
    'svc1.desc': 'We evaluate the current state of your brand: positioning, visual coherence, messaging and alignment with your real purpose. We detect gaps and define the direction.',
    'svc1.tag1': 'Positioning', 'svc1.tag2': 'Coherence', 'svc1.tag3': 'Analysis',
    'svc1.title.short': 'Brand Diagnosis',

    'svc2.title': 'Visual Identity',
    'svc2.desc': 'We build complete visual identity systems: logo, palette, typography, tone, applications. Every decision has a strategic reason behind it.',
    'svc2.tag1': 'Branding', 'svc2.tag2': 'Visual System', 'svc2.tag3': 'Guideline',

    'svc3.title': 'Communication Systems',
    'svc3.desc': 'We develop the complete communication structure for your company: what to say, how to say it, in which channel and with what frequency. A system that works on its own.',
    'svc3.tag1': 'Structure', 'svc3.tag2': 'Messaging', 'svc3.tag3': 'Channels',

    'svc4.title': 'Social Media Management',
    'svc4.desc': 'We manage your social media with a strategic focus. No improvised content or mindless trend-chasing. Every post responds to a clear brand objective.',
    'svc4.tag1': 'Content', 'svc4.tag2': 'Strategy', 'svc4.tag3': 'Analytics',

    'svc5.title': 'Advertising Campaigns',
    'svc5.desc': 'We design and execute Ads campaigns with strategic direction. Google, Meta, Programmatic. We don\'t leave things to chance — every campaign has a purpose and clear metrics.',
    'svc5.tag3': 'Performance',

    'svc6.title': 'Conceptual Direction',
    'svc6.desc': 'We define the concept that unifies all of your brand\'s communication. The common thread that gives meaning to every piece, campaign and creative decision your company makes.',
    'svc6.tag1': 'Concept', 'svc6.tag2': 'Narrative', 'svc6.tag3': 'Direction',

    // Methodology
    'method.label': 'How we work',
    'method.title': 'Before executing,',
    'method.title.accent': 'we think.',
    'method.subtitle': 'Execution is the consequence of strategic thinking.',
    'method.subtitle2': 'Not the other way around.',
    'method.step1.title': 'We Evaluate',
    'method.step1.desc': 'We analyze your brand, your market and your competitors. We understand who you are, where you are and where you want to go.',
    'method.step2.title': 'We Detect',
    'method.step2.desc': 'We identify misalignments, inconsistencies and improvement opportunities. We map what works and what holds you back.',
    'method.step3.title': 'We Define',
    'method.step3.desc': 'We establish the strategic direction. The concept, the desired positioning and the communication roadmap.',
    'method.step4.title': 'We Build',
    'method.step4.desc': 'We develop the complete system: identity, messaging, pieces, channels. Everything connected. Everything with purpose.',

    // Differential
    'diff.quote1': '"We don\'t design pieces.',
    'diff.quote2': 'We build systems that sustain the brand over time."',
    'diff.market.title': 'The market offers',
    'diff.market.li1': 'Aesthetics without strategy',
    'diff.market.li2': 'Metrics without direction',
    'diff.market.li3': 'Execution without planning',
    'diff.krear.title': 'Kreär offers',
    'diff.krear.li1': 'Strategy + Creativity',
    'diff.krear.li2': 'Direction + Execution',
    'diff.krear.li3': 'System + Coherence',

    // Hero floating badges
    'badge.strategy': 'Strategy',
    'badge.direction': 'Direction',
    'badge.system': 'System',

    // About
    'about.tag1': 'Strategy', 'about.tag2': 'Creativity', 'about.tag3': 'Direction',
    'about.label': 'Who we are',
    'about.title': 'We are the studio',
    'about.title.accent': 'you were missing.',
    'about.p1': 'At Kreär we work with companies that',
    'about.p1.strong': 'are already in motion,',
    'about.p1.rest': 'but whose communication hasn\'t evolved at the same pace as their business. That creates a gap between what they are and what they project. We close that gap.',
    'about.p2': 'We don\'t start by designing. We start by',
    'about.p2.strong': 'analyzing, thinking and structuring',
    'about.p2.rest': 'Because coherence builds trust, clarity reduces friction and direction precedes execution.',
    'about.p3': 'Our vision is to become the leading strategic studio that',
    'about.p3.strong': 'organized business communication in the region',
    'about.p3.rest': '— and from there, scale.',
    'about.quote': '"An organized brand sells without shouting."',
    'about.cta': "Let's work together",
    'about.location': 'Resistencia, Chaco · Argentina',

    // Testimonials
    'test.label': 'What they say',
    'test.title': 'Companies that already',
    'test.title.accent': 'organized their communication',
    'test.q1': '\"Kreär did something no previous agency had achieved: understanding how our company really works and translating it into communication that represents us with clarity. <strong>The difference wasn\'t only in the visuals, but in the direction.</strong>\"',
    'test.q2': '\"What I value most is that they don\'t start by designing, they start by thinking. The diagnosis was precise and allowed us to detect problems we\'d been overlooking for years. <strong>From that point on, everything started to make sense.\"</strong>',
    'test.q3': '\"After working with Kreär, our communication started to reflect what <strong>we truly are</strong>. That coherence between what we do and what we project strengthened the brand\'s perception among our clients.\"',

    // CTA
    'cta.label': 'Ready for the change?',
    'cta.title': 'Is your communication',
    'cta.title.accent': 'up to your company\'s level?',
    'cta.subtitle': 'If your business has grown but your communication has fallen behind, it\'s time to organize. We start with a diagnosis.',
    'cta.button': 'I want my diagnosis',
    'cta.note': 'No commitment · Response within 24h · 100% strategic',

    // Form
    'form.name.label': 'Name',
    'form.name.placeholder': 'Your name',
    'form.phone.label': 'Phone',
    'form.phone.placeholder': '+1 555 000 0000',
    'form.email.label': 'Email',
    'form.email.placeholder': 'you@company.com',
    'form.message.label': 'Message',
    'form.message.placeholder': 'Tell us about your project or inquiry...',
    'form.consent': 'I agree to the processing of my personal data to receive a response to my inquiry.',
    'form.submit': 'Send inquiry',
    'form.success': 'Your request was received by the team. We\'ll be in touch soon!',
    'form.error': 'There was an error sending the form. Please try again or contact us directly.',
    'form.validation': 'Please fill in all fields and accept the terms.',

    // Footer
    'footer.tagline': 'An organized brand',
    'footer.tagline.em': 'sells without shouting.',
    'footer.col1.title': 'Services',
    'footer.svc5': 'Ad Campaigns',
    'footer.col2.title': 'Studio',
    'footer.contact.link': 'Contact',
    'footer.col3.title': 'Contact',
    'footer.rights': '© 2026 Kreär. All rights reserved.',
    'footer.credits': 'Strategy · Creativity · Direction',

    // 4 service pillars
    'pillar1.title': 'Direction',
    'pillar1.desc': 'Before executing, we think. We define the strategic north of your brand from diagnosis through to full system architecture.',
    'pillar1.t1': 'Diagnosis', 'pillar1.t2': 'Positioning', 'pillar1.t3': 'Brand architecture', 'pillar1.t4': 'System definition',

    'pillar2.title': 'Core Asset',
    'pillar2.desc': 'Your strategic digital platform. We design and develop the digital asset that turns visitors into clients and consolidates your online presence.',
    'pillar2.t1': 'Strategic website', 'pillar2.t2': 'E-commerce', 'pillar2.t3': 'Landing systems',

    'pillar3.title': 'Automation',
    'pillar3.desc': 'Intelligent digital infrastructure that works while you sleep. We implement AI and automation systems that scale your business without scaling your team.',
    'pillar3.t1': 'CRM', 'pillar3.t2': 'Email flows', 'pillar3.t3': 'Applied AI', 'pillar3.t4': 'Chatbots', 'pillar3.t5': 'Integrations',

    'pillar4.title': 'Expansion',
    'pillar4.desc': 'Once the system is built, we scale it. We generate presence, audience and conversions through content, campaigns and continuous optimization.',
    'pillar4.t1': 'Content', 'pillar4.t2': 'Campaigns', 'pillar4.t3': 'Social Media', 'pillar4.t4': 'Continuous optimization',
  },
};

function applyLanguage(lang) {
  const dict = translations[lang];
  if (!dict) return;

  const i18nEls = document.querySelectorAll('[data-i18n]');
  const FADE_DURATION = 150; // ms

  // --- Step 1: fade out ---
  i18nEls.forEach(el => el.classList.add('lang-fading'));

  setTimeout(() => {
    // --- Step 2: apply translations ---
    i18nEls.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Update page title
    document.title = dict.pageTitle;

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    });

    // Slide pill + button active state on ALL switchers (desktop + mobile)
    document.querySelectorAll('.lang-switcher').forEach(switcher => {
      switcher.setAttribute('data-active', lang);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('lang-active', btn.getAttribute('data-lang') === lang);
    });

    // Persist
    localStorage.setItem('krear-lang', lang);

    // --- Step 3: fade back in ---
    // Force reflow so transition fires
    i18nEls.forEach(el => el.offsetHeight); // trigger reflow
    i18nEls.forEach(el => el.classList.remove('lang-fading'));

  }, FADE_DURATION);
}

function initLanguageSwitcher() {
  // Wire up all lang buttons (desktop + mobile)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  // Restore saved language or default to 'es'
  const saved = localStorage.getItem('krear-lang') || 'es';
  applyLanguage(saved);
}

/* ============================================================
   PROTECCIÓN — Anti-Inspect / Anti-Copiar
   ============================================================ */
(function () {
  'use strict';

  // 1. Deshabilitar menú contextual (clic derecho)
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  });

  // 2. Bloquear atajos de teclado que abren DevTools o fuente
  document.addEventListener('keydown', function (e) {
    const key = e.key || '';
    const ctrl = e.ctrlKey || e.metaKey; // Cmd en Mac

    if (e.keyCode === 123) { e.preventDefault(); return false; } // F12
    if (ctrl && e.shiftKey && (key === 'I' || key === 'i')) { e.preventDefault(); return false; } // Inspector
    if (ctrl && e.shiftKey && (key === 'J' || key === 'j')) { e.preventDefault(); return false; } // Consola
    if (ctrl && e.shiftKey && (key === 'C' || key === 'c')) { e.preventDefault(); return false; } // Selector
    if (ctrl && (key === 'U' || key === 'u')) { e.preventDefault(); return false; } // Ver fuente
    if (ctrl && (key === 'S' || key === 's')) { e.preventDefault(); return false; } // Guardar página
  });

  // 3. Detectar apertura de DevTools por diferencia en dimensiones
  const THRESHOLD = 160;
  let devToolsOpen = false;

  function checkDevTools() {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > THRESHOLD || heightDiff > THRESHOLD) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        document.body.style.filter = 'blur(8px)';
        document.body.style.userSelect = 'none';
        document.body.style.pointerEvents = 'none';
      }
    } else {
      if (devToolsOpen) {
        devToolsOpen = false;
        document.body.style.filter = '';
        document.body.style.userSelect = '';
        document.body.style.pointerEvents = '';
      }
    }
  }

  window.addEventListener('resize', checkDevTools);
  setInterval(checkDevTools, 1200);

  // 4. Deshabilitar selección de texto en desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('selectstart', function (e) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    });
  }

})();

/* ============================================================
   Footer service links — click → flip card → auto unflip
   ============================================================ */
function initFooterServiceLinks() {
  const FLIP_CLASS = 'flipped';
  const FLIP_DURATION = 2800; // ms before auto-unflip
  let activeTimer = null;

  document.querySelectorAll('.footer-svc-link[data-target-card]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const cardId = this.getAttribute('data-target-card');
      const card = document.getElementById(cardId);
      if (!card) return;

      // scroll directly to the specific card with offset for sticky nav
      const navHeight = 80;
      const cardTop = card.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: cardTop, behavior: 'smooth' });

      // wait for scroll then flip
      setTimeout(() => {
        // unflip any previously flipped card
        document.querySelectorAll('.service-card-flip.' + FLIP_CLASS).forEach(c => {
          c.classList.remove(FLIP_CLASS);
        });
        if (activeTimer) clearTimeout(activeTimer);

        // flip the target card
        card.classList.add(FLIP_CLASS);

        // auto-unflip after duration
        activeTimer = setTimeout(() => {
          card.classList.remove(FLIP_CLASS);
          activeTimer = null;
        }, FLIP_DURATION);
      }, 600);
    });
  });
}

document.addEventListener('DOMContentLoaded', initFooterServiceLinks);

/* ============================================================
   CONTACT FORM — Submit via n8n Webhook (JSON)
   ============================================================ */
const N8N_ENDPOINT = 'https://krearestudiocreativo.app.n8n.cloud/webhook/3d7b0e9e-723f-48cb-882c-08d51c3a5d1f';

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // ── Phone field: only allow digits, +, spaces and hyphens ──
  const phoneInput = document.getElementById('form-phone');
  if (phoneInput) {
    phoneInput.addEventListener('keydown', (e) => {
      // Allow: backspace, delete, tab, escape, enter, arrows, home, end
      const allowed = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
      if (allowed.includes(e.key)) return;
      // Allow: Ctrl/Cmd + A, C, V, X
      if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) return;
      // Allow: digits 0-9, +, space, hyphen
      if (/^[0-9+\-\s]$/.test(e.key)) return;
      // Block everything else
      e.preventDefault();
    });

    // Also sanitize paste events
    phoneInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData('text');
      const sanitized = pasted.replace(/[^0-9+\-\s]/g, '');
      const start = phoneInput.selectionStart;
      const end = phoneInput.selectionEnd;
      phoneInput.value = phoneInput.value.slice(0, start) + sanitized + phoneInput.value.slice(end);
    });
  }

  // ── Form submission ──
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const lang = localStorage.getItem('krear-lang') || 'es';
    const dict = translations[lang];

    const nombre = document.getElementById('form-name').value.trim();
    const numero = document.getElementById('form-phone').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const consulta = document.getElementById('form-message').value.trim();
    const consent = document.getElementById('form-consent').checked;
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');

    // Clear previous errors
    form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    // Validation
    let isValid = true;
    if (!nombre) { document.getElementById('form-name').classList.add('field-error'); isValid = false; }
    if (!numero) { document.getElementById('form-phone').classList.add('field-error'); isValid = false; }
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      document.getElementById('form-email').classList.add('field-error'); isValid = false;
    }
    if (!consulta) { document.getElementById('form-message').classList.add('field-error'); isValid = false; }
    if (!consent) { isValid = false; }

    if (!isValid) {
      feedback.textContent = dict['form.validation'];
      feedback.className = 'form-feedback error visible';
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Build JSON payload — one key per field
    const payload = JSON.stringify({
      nombre,
      numero,
      email,
      consulta,
      timestamp: new Date().toISOString(),
    });

    try {
      const response = await fetch(N8N_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      // n8n returns 200 on success; we treat any 2xx as success
      if (response.ok) {
        feedback.textContent = dict['form.success'];
        feedback.className = 'form-feedback success visible';
        form.reset();
      } else {
        throw new Error('HTTP_' + response.status);
      }
    } catch (err) {
      feedback.textContent = dict['form.error'];
      feedback.className = 'form-feedback error visible';
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
