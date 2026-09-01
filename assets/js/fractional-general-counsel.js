/**
 * VIDHITRA — Fractional General Counsel page JS
 * Isolated to this page. No global state pollution.
 * Does NOT interfere with main.js, Swiper, GSAP, WOW, meanmenu, etc.
 */

(function () {
  'use strict';

  /* ── 1. Hero entrance ─────────────────────────────────── */
  function initHeroEntrance() {
    var hero = document.querySelector('.fgc-hero');
    if (!hero) return;
    // Add .is-loaded on next frame so CSS transitions fire cleanly
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add('is-loaded');
      });
    });
  }

  /* ── 2. Generic IntersectionObserver reveal ───────────── */
  function initReveal(selector, threshold) {
    threshold = threshold || 0.15;
    var els = document.querySelectorAll(selector);
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: threshold });

      els.forEach(function (el) { io.observe(el); });
    } else {
      // Fallback: just make everything visible
      els.forEach(function (el) { el.classList.add('is-inview'); });
    }
  }

  /* ── 3. Staggered audience list reveal ───────────────── */
  function initAudienceStagger() {
    var items = document.querySelectorAll('.fgc-audience__item');
    if (!items.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.dataset.staggerDelay || 0;
            setTimeout(function () {
              entry.target.classList.add('is-inview');
            }, parseInt(delay, 10));
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      items.forEach(function (item, i) {
        item.dataset.staggerDelay = i * 70;
        io.observe(item);
      });
    } else {
      items.forEach(function (el) { el.classList.add('is-inview'); });
    }
  }

  /* ── 4. Staggered process stage reveal ───────────────── */
  function initProcessStagger() {
    var stages = document.querySelectorAll('.fgc-process__stage');
    if (!stages.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      stages.forEach(function (stage) { io.observe(stage); });
    } else {
      stages.forEach(function (el) { el.classList.add('is-inview'); });
    }
  }

  /* ── 5. Reduced-motion override ──────────────────────── */
  function applyReducedMotion() {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      document.querySelectorAll(
        '.fgc-reveal, .fgc-process__stage, .fgc-audience__item'
      ).forEach(function (el) {
        el.classList.add('is-inview');
      });
    }
  }

  /* ── Init ─────────────────────────────────────────────── */
  function init() {
    initHeroEntrance();
    initReveal('.fgc-reveal');
    initProcessStagger();
    initAudienceStagger();
    applyReducedMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
