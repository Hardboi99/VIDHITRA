/**
 * VIDHITRA CORPORATE ADVISORS LLP
 * Capability Detail Page: Corporate Law & Strategic Advisory
 * GSAP + ScrollTrigger Interactions & Physics System
 * Namespace: .cla-*
 */

(function () {
  'use strict';

  var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Hero Entrance & Parallax ────────────────────────── */
  function initHero() {
    var hero = document.querySelector('.cla-hero');
    if (!hero) return;

    if (isReducedMotion) {
      document.querySelectorAll('.cla-hero .cla-reveal').forEach(function (el) {
        el.classList.add('is-inview');
      });
      return;
    }

    if (typeof gsap !== 'undefined') {
      var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo('.cla-hero__eyebrow',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.2 }
      )
      .fromTo('.cla-hero__h1',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        '-=0.4'
      )
      .fromTo('.cla-hero__tagline',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      )
      .fromTo('.cla-hero__desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        '-=0.4'
      )
      .fromTo('.cla-hero__actions',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      )
      .fromTo('.cla-hero__visual-frame',
        { scale: 0.94, y: 30, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo('.cla-hero__block-back',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        '-=0.7'
      )
      .fromTo('.cla-hero__block-front',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        '-=0.7'
      )
      .fromTo('.cla-hero__visual-badge',
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.3)' },
        '-=0.5'
      )
      .fromTo('.cla-hero__stat-item',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.3'
      );

      // Hero 3D Tilt on Mouse Move
      var heroVisual = document.querySelector('.cla-hero__visual-frame');
      if (heroVisual) {
        var rect;
        window.addEventListener('resize', function () {
          rect = heroVisual.getBoundingClientRect();
        });
        
        hero.addEventListener('mousemove', function (e) {
          if (!rect) rect = heroVisual.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          gsap.to(heroVisual, {
            rotationY: x * 0.025,
            rotationX: -y * 0.025,
            ease: 'power1.out',
            duration: 0.5
          });
        });

        hero.addEventListener('mouseleave', function () {
          gsap.to(heroVisual, {
            rotationY: 0,
            rotationX: 0,
            ease: 'power2.out',
            duration: 0.8
          });
        });
      }
    }
  }

  /* ── 2. Why This Matters Architectural Banner ───────────── */
  function initWhyMatters() {
    var matters = document.querySelector('.cla-matters');
    if (!matters || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var banner = matters.querySelector('.cla-arch-banner');
      if (banner) {
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: banner,
            start: 'top 80%'
          }
        });

        tl.fromTo(banner.querySelector('.cla-arch-banner__media'),
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' }
        )
        .fromTo(banner.querySelector('.cla-arch-banner__block-top'),
          { x: 35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(banner.querySelector('.cla-arch-banner__block-bottom'),
          { x: -35, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(banner.querySelector('.cla-arch-banner__card'),
          { y: 30, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.2)' },
          '-=0.4'
        );

        var img = banner.querySelector('.cla-arch-banner__img');
        if (img) {
          gsap.to(img, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: banner,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        }
      }
    }
  }

  /* ── 3. When You Need Legal Counsel Trigger Cards ───────── */
  function initTriggers() {
    var cards = document.querySelectorAll('.cla-trigger-card');
    if (!cards.length || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(cards,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cla-triggers__grid',
            start: 'top 80%'
          }
        }
      );
    }
  }

  /* ── 4. Who We Support Interactive System ───────────────── */
  function initAudience() {
    var items = document.querySelectorAll('.cla-audience__item');
    if (!items.length) return;

    items[0].classList.add('is-active');

    items.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        items.forEach(function (el) { el.classList.remove('is-active'); });
        item.classList.add('is-active');
      });
    });

    if (isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(items,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cla-audience__list',
            start: 'top 80%'
          }
        }
      );
    }
  }

  /* ── 5. How We Help You Service Matrix ──────────────────── */
  function initServices() {
    var rows = document.querySelectorAll('.cla-service-row');
    if (!rows.length || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(rows,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cla-services__matrix',
            start: 'top 80%'
          }
        }
      );
    }
  }

  /* ── 6. Perspective Section Statement Reveal ────────────── */
  function initPerspective() {
    var sec = document.querySelector('.cla-perspective');
    if (!sec || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var stmt = sec.querySelector('.cla-perspective__statement');
      if (stmt) {
        gsap.fromTo(stmt,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stmt,
              start: 'top 80%'
            }
          }
        );
      }

      var line = sec.querySelector('.cla-perspective__line');
      if (line) {
        gsap.fromTo(line,
          { width: 0 },
          {
            width: '90px',
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 85%'
            }
          }
        );
      }
    }
  }

  /* ── 7. Selected Transactions & Matters ─────────────────── */
  function initMatters() {
    var items = document.querySelectorAll('.cla-matter-item');
    if (!items.length || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cla-matters-list__table',
            start: 'top 80%'
          }
        }
      );
    }
  }

  /* ── 8. Closing CTA ─────────────────────────────────────── */
  function initCTA() {
    var cta = document.querySelector('.cla-cta');
    if (!cta || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var bg = cta.querySelector('.cla-cta__bg img');
      if (bg) {
        gsap.to(bg, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: cta,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }
  }

  /* ── Generic Intersection Observer Reveals ──────────────── */
  function initGenericReveals() {
    var reveals = document.querySelectorAll('.cla-reveal');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-inview'); });
    }
  }

  /* ── Main Init ──────────────────────────────────────────── */
  function init() {
    initHero();
    initWhyMatters();
    initTriggers();
    initAudience();
    initServices();
    initPerspective();
    initMatters();
    initCTA();
    initGenericReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
