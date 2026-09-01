/**
 * VIDHITRA — Fractional General Counsel page JS
 * Premium Editorial Animations & Scroll Interactions
 * Uses GSAP + ScrollTrigger with lightweight fallback
 * Isolated under .fgc-* namespace
 */

(function () {
  'use strict';

  var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 1. Hero Entrance & Parallax ────────────────────────── */
  function initHero() {
    var hero = document.querySelector('.fgc-hero');
    if (!hero) return;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add('is-loaded');
      });
    });

    if (isReducedMotion) return;

    if (typeof gsap !== 'undefined') {
      var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Sequence: eyebrow -> H1 (SplitText if available) -> tagline -> desc -> actions -> stats
      tl.fromTo('.fgc-hero__eyebrow',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.2 }
      );

      var h1El = document.querySelector('#fgc-hero-title');
      if (h1El && typeof SplitText !== 'undefined') {
        try {
          var splitH1 = new SplitText(h1El, { type: 'words, lines' });
          tl.from(splitH1.words, {
            y: 60,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08
          }, '-=0.4');
        } catch (e) {
          tl.fromTo(h1El, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.4');
        }
      } else if (h1El) {
        tl.fromTo(h1El, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.4');
      }

      tl.fromTo('.fgc-hero__tagline', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
        .fromTo('.fgc-hero__desc', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
        .fromTo('.fgc-hero__actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.fgc-hero__stat', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, '-=0.3');

      // ScrollTrigger background parallax & content floating
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.to('.fgc-hero__bg img', {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fgc-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.to('.fgc-hero__content', {
          yPercent: -10,
          opacity: 0.82,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fgc-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }
  }

  /* ── 2. Phase 2: Understanding Section Animations ────────── */
  function initIntro() {
    var intro = document.querySelector('.fgc-intro');
    if (!intro || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      // Masked upward heading reveal
      gsap.fromTo('.fgc-intro__heading',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.fgc-intro__heading',
            start: 'top 85%'
          }
        }
      );

      // Eyebrow line reveal
      gsap.fromTo('.fgc-intro__left .fgc-eyebrow::before',
        { width: 0 },
        {
          width: '1.5rem',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.fgc-intro__left',
            start: 'top 85%'
          }
        }
      );

      // Meta items entrance & gentle icon settle
      var metaItems = document.querySelectorAll('.fgc-intro__meta-item');
      if (metaItems.length) {
        gsap.fromTo(metaItems,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.fgc-intro__meta',
              start: 'top 85%'
            }
          }
        );

        gsap.fromTo('.fgc-intro__meta-icon',
          { rotation: -30 },
          {
            rotation: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: '.fgc-intro__meta',
              start: 'top 85%'
            }
          }
        );
      }

      // Paragraph by paragraph soft text mask
      var paras = document.querySelectorAll('.fgc-intro__right p');
      paras.forEach(function (p) {
        gsap.fromTo(p,
          { y: 28, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: p,
              start: 'top 88%'
            }
          }
        );
      });

      // Pull quote focal point
      var pull = document.querySelector('.fgc-intro__pull');
      if (pull) {
        gsap.fromTo(pull,
          { x: 25, opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: pull,
              start: 'top 82%'
            }
          }
        );
      }

      // Subtle scroll-linked movement for left column
      gsap.to('.fgc-intro__left', {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.fgc-intro',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  /* ── 3. Phase 3: FGC Model Engagement Sequence ─────────── */
  function initModel() {
    var modelCards = document.querySelectorAll('.fgc-model__card');
    if (!modelCards.length) return;

    // Activate item 0 by default
    modelCards[0].classList.add('is-active');

    if (isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var progressBar = document.querySelector('.fgc-model__progress-bar');

      function activateModel(index) {
        modelCards.forEach(function (card, i) {
          card.classList.toggle('is-active', i === index);
        });

        if (progressBar) {
          var pct = Math.min(100, Math.max(25, ((index + 1) / modelCards.length) * 100));
          progressBar.style.width = pct + '%';
        }
      }

      modelCards.forEach(function (card, index) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 35%',
          onEnter: function () { activateModel(index); },
          onEnterBack: function () { activateModel(index); }
        });
      });
    }
  }

  /* ── 3. Editorial Line Drawing & Clip Reveals ───────────── */
  function initLineReveals() {
    if (isReducedMotion) return;

    var pulls = document.querySelectorAll('.fgc-continuity__statement');
    pulls.forEach(function (el) {
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.fromTo(el,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%'
            }
          }
        );
      }
    });
  }

  /* ── 4. Phase 4: How We Work Editorial Stage Motion ─────── */
  function initProcess() {
    var stages = document.querySelectorAll('.fgc-process__stage');
    if (!stages.length) return;

    if (isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var overlayTitle = document.querySelector('#fgcProcessOverlayTitle');
      var numSpan = document.querySelector('#fgcProcessCurrentNum');
      var visualImg = document.querySelector('.fgc-process__visual-bg img');

      function setActiveStage(index) {
        stages.forEach(function (stage, i) {
          stage.classList.toggle('is-active', i === index);
        });

        var activeStage = stages[index];
        if (!activeStage) return;

        var stageName = activeStage.getAttribute('data-stage-name');
        var stageNum = activeStage.getAttribute('data-stage-num');

        if (numSpan && stageNum) {
          numSpan.textContent = stageNum;
        }

        if (overlayTitle && stageName) {
          gsap.fromTo(overlayTitle,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
          );
          overlayTitle.textContent = stageName;
        }

        if (visualImg) {
          gsap.fromTo(visualImg,
            { scale: 1.06 },
            { scale: 1.0, duration: 0.8, ease: 'power2.out' }
          );
        }
      }

      gsap.context(function () {
        stages.forEach(function (stage, index) {
          ScrollTrigger.create({
            trigger: stage,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: function () { setActiveStage(index); },
            onEnterBack: function () { setActiveStage(index); }
          });
        });
      });
    }
  }

  /* ── 4. Audience List Staggered Entrance ───────────────── */
  function initAudience() {
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
        item.dataset.staggerDelay = (i % 5) * 80;
        io.observe(item);
      });
    } else {
      items.forEach(function (el) { el.classList.add('is-inview'); });
    }
  }

  /* ── 5. Generic Scroll Reveals ──────────────────────────── */
  function initGenericReveals() {
    var els = document.querySelectorAll('.fgc-reveal');
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('is-inview'); });
    }
  }

  /* ── 6. Parallax Background for Continuity Section ──────── */
  function initContinuityParallax() {
    if (isReducedMotion) return;
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var bgImg = document.querySelector('.fgc-continuity__bg img');
      if (bgImg) {
        gsap.to(bgImg, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fgc-continuity',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }
  }

  /* ── Reduced Motion Fallback ────────────────────────────── */
  function applyReducedMotion() {
    if (isReducedMotion) {
      document.querySelectorAll(
        '.fgc-reveal, .fgc-process__stage, .fgc-audience__item'
      ).forEach(function (el) {
        el.classList.add('is-inview');
      });
    }
  }

  /* ── Main Initializer ───────────────────────────────────── */
  function init() {
    initHero();
    initIntro();
    initModel();
    initLineReveals();
    initProcess();
    initAudience();
    initGenericReveals();
    initContinuityParallax();
    applyReducedMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());

