/* ============================================================
   HOMMAT – script.js
   Interacciones, animaciones y efectos dinámicos
   ============================================================ */

'use strict';

// ============================================================
// 1. NAVBAR – Sticky / Scroll Effect
// ============================================================
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = debounce(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);

        // Back to top button
        const btn = document.getElementById('backToTop');
        if (btn) btn.classList.toggle('visible', window.scrollY > 400);
    }, 10);

    window.addEventListener('scroll', onScroll, { passive: true });
})();

// ============================================================
// 2. MOBILE MENU
// ============================================================
(function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const close  = document.getElementById('menuClose');
    const menu   = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    function openMenu() {
        menu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menu.classList.remove('open');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', openMenu);
    if (close) close.addEventListener('click', closeMenu);

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on backdrop click
    menu.addEventListener('click', function(e) {
        if (e.target === menu) closeMenu();
    });
})();

// ============================================================
// 3. SMOOTH SCROLL
// ============================================================
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = 88; // navbar height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();

// ============================================================
// 4. BACK TO TOP
// ============================================================
(function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ============================================================
// 5. PARTICLE SYSTEM
// ============================================================
(function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = window.innerWidth > 768 ? 50 : 22;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.top  = Math.random() * 100 + '%';
        p.style.animationDelay    = (Math.random() * 20) + 's';
        p.style.animationDuration = (14 + Math.random() * 12) + 's';
        // Vary sizes
        const size = 1.5 + Math.random() * 2.5;
        p.style.width  = size + 'px';
        p.style.height = size + 'px';
        p.style.opacity = (0.15 + Math.random() * 0.5).toString();
        fragment.appendChild(p);
    }

    container.appendChild(fragment);
})();

// ============================================================
// 6. SCROLL REVEAL (Intersection Observer)
// ============================================================
(function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger siblings in same parent
                const siblings = entry.target.parentElement.querySelectorAll('.reveal');
                siblings.forEach((sib, index) => {
                    if (!sib.classList.contains('visible')) {
                        sib.style.transitionDelay = (index * 90) + 'ms';
                    }
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    elements.forEach(el => observer.observe(el));
})();

// ============================================================
// 7. ANIMATED COUNTERS
// ============================================================
(function initCounters() {
    const allCounters = document.querySelectorAll('[data-target]');
    if (!allCounters.length) return;

    let started = false;

    function animateCounter(el) {
        const target   = parseInt(el.getAttribute('data-target'), 10);
        const duration = 2200;
        const start    = performance.now();

        function easeOutQuart(t) {
            return 1 - Math.pow(1 - t, 4);
        }

        function update(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value    = Math.round(easeOutQuart(progress) * target);
            el.textContent = value.toLocaleString('es-AR');
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target.toLocaleString('es-AR');
        }

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                allCounters.forEach(el => animateCounter(el));
            }
        });
    }, { threshold: 0.3 });

    // Observe first counter's section
    const firstCounter = allCounters[0].closest('section');
    if (firstCounter) observer.observe(firstCounter);
})();

// ============================================================
// 8. FLIP CARDS – Mobile tap support
// ============================================================
(function initFlipCards() {
    const cards = document.querySelectorAll('.service-card-flip');
    if (!cards.length) return;

    // On touch devices, toggle flip on click
    function isTouchDevice() {
        return window.matchMedia('(hover: none)').matches;
    }

    cards.forEach(card => {
        card.addEventListener('click', function() {
            if (isTouchDevice()) {
                this.classList.toggle('flipped');
            }
        });

        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
        card.addEventListener('focusin', function() {
            this.classList.add('flipped');
        });
        card.addEventListener('focusout', function() {
            this.classList.remove('flipped');
        });
    });
})();

// ============================================================
// 9. PARALLAX – Subtle background movement
// ============================================================
(function initParallax() {
    const heroBg = document.querySelector('.hero-grid-bg');
    const heroImg = document.querySelector('.hero-image-wrapper');
    if (!heroBg || !heroImg) return;

    // Only on desktop
    if (window.matchMedia('(max-width: 1023px)').matches) return;

    const onScroll = debounce(() => {
        const scrolled = window.scrollY;
        heroBg.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroImg.style.transform = `translateY(${scrolled * 0.06}px)`;
    }, 8);

    window.addEventListener('scroll', onScroll, { passive: true });
})();

// ============================================================
// 10. NAVBAR ACTIVE LINK (highlight current section)
// ============================================================
(function initActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.style.color = 'var(--cream-100)';
                    }
                });
            }
        });
    }, {
        threshold: 0.4
    });

    sections.forEach(s => observer.observe(s));
})();

// ============================================================
// 11. HOVER GLOW EFFECT on glass cards
// ============================================================
(function initCardGlow() {
    const cards = document.querySelectorAll('.glass-card');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            this.style.background = `
                radial-gradient(ellipse at ${x}% ${y}%, rgba(143, 179, 226, 0.1) 0%, rgba(30, 46, 79, 0.55) 60%)
            `;
        });

        card.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });
})();

// ============================================================
// UTILITY: Debounce
// ============================================================
function debounce(fn, wait) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
    };
}

// ============================================================
// INIT LOG
// ============================================================
console.log('%cHOMMATweb v1.0 | Construido con precisión y orgullo', 'color: #8fb3e2; font-weight: bold; font-size: 12px;');
