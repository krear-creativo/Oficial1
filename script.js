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
