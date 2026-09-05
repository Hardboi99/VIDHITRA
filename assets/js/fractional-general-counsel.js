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
            scrub: 1.2
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
            scrub: 1.2
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

      // Heading numeral watermark
      var headingMark = document.querySelector('.fgc-intro__heading-mark');
      if (headingMark) {
        gsap.fromTo(headingMark,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.fgc-intro__heading',
              start: 'top 85%'
            }
          }
        );
      }

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

      // Meta rail draws in
      var metaRail = document.querySelector('.fgc-intro__meta-rail');
      if (metaRail) {
        gsap.fromTo(metaRail,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.9,
            ease: 'power2.out',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: '.fgc-intro__meta',
              start: 'top 85%'
            }
          }
        );
      }

      // Meta dots pop in
      var metaDots = document.querySelectorAll('.fgc-intro__meta-dot');
      if (metaDots.length) {
        gsap.fromTo(metaDots,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: '.fgc-intro__meta',
              start: 'top 80%'
            }
          }
        );
      }

      // Icon number badges pop in
      var metaNums = document.querySelectorAll('.fgc-intro__meta-num');
      if (metaNums.length) {
        gsap.fromTo(metaNums,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            stagger: 0.12,
            delay: 0.15,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: '.fgc-intro__meta',
              start: 'top 80%'
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

      // Insight panel + tags
      var insight = document.querySelector('.fgc-intro__insight');
      if (insight) {
        gsap.fromTo(insight,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: insight,
              start: 'top 85%'
            }
          }
        );

        var insightTags = insight.querySelectorAll('.fgc-intro__insight-tag');
        if (insightTags.length) {
          gsap.fromTo(insightTags,
            { opacity: 0, x: -12 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.25,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: insight,
                start: 'top 80%'
              }
            }
          );
        }
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

  /* ── 5. Phase 5: Capabilities Showcase Parallax & Stagger ───── */
  function initCapabilitiesShowcase() {
    var showcaseSection = document.querySelector('.fgc-capabilities--showcase');
    if (!showcaseSection || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var bgImg = showcaseSection.querySelector('.fgc-showcase-bg__img');
      if (bgImg) {
        gsap.to(bgImg, {
          yPercent: 12,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: showcaseSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      var cards = showcaseSection.querySelectorAll('.fgc-showcase-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.fgc-showcase-grid',
              start: 'top 82%'
            }
          }
        );
      }
    }
  }

  /* ── 5b. Capabilities Staggered Sequential Entrance ───── */
  function initCapabilities() {
    var items = document.querySelectorAll('.fgc-cap-item');
    if (!items.length || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo(items,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.fgc-capabilities__index',
            start: 'top 75%'
          }
        }
      );
    }
  }

  /* ── 6. Phase 6: Who This Model Is Designed For Moving List ──── */
  function initAudience() {
    var items = document.querySelectorAll('.fgc-audience__item');
    if (!items.length) return;

    if (isReducedMotion) {
      items.forEach(function (el) { el.classList.add('is-active'); });
      return;
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var marker = document.querySelector('.fgc-audience__marker');

      function activateAudienceItem(index) {
        items.forEach(function (item, i) {
          item.classList.toggle('is-active', i === index);
        });

        var activeItem = items[index];
        if (activeItem && marker) {
          marker.style.opacity = '1';
          marker.style.transform = 'translateY(' + activeItem.offsetTop + 'px)';
          marker.style.height = activeItem.offsetHeight + 'px';
        }
      }

      items.forEach(function (item, index) {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 70%',
          end: 'bottom 30%',
          onEnter: function () { activateAudienceItem(index); },
          onEnterBack: function () { activateAudienceItem(index); }
        });
      });

      gsap.fromTo(items,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.fgc-audience__list',
            start: 'top 80%'
          }
        }
      );
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

  /* ── 7. Phase 7: Why Continuity Matters Climax Animations ───── */
  function initContinuity() {
    var contSection = document.querySelector('.fgc-continuity');
    if (!contSection) return;

    requestAnimationFrame(function () {
      contSection.classList.add('is-loaded');
    });

    if (isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var bgImg = document.querySelector('.fgc-continuity__bg img');
      if (bgImg) {
        gsap.to(bgImg, {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: contSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      var heading = document.querySelector('.fgc-continuity__heading');
      if (heading) {
        gsap.fromTo(heading,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%'
            }
          }
        );
      }

      var statement = document.querySelector('.fgc-continuity__statement');
      if (statement) {
        var tlStmt = gsap.timeline({
          scrollTrigger: {
            trigger: statement,
            start: 'top 85%'
          }
        });

        tlStmt.fromTo('.fgc-continuity__statement::before',
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, ease: 'power3.out' }
        ).fromTo(statement,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        );
      }

      var pillars = document.querySelectorAll('.fgc-continuity__pillar');
      var pillarMarker = document.querySelector('.fgc-continuity__pillar-marker');

      if (pillars.length) {
        pillars[0].classList.add('is-active');

        function activatePillar(index) {
          pillars.forEach(function (p, i) {
            p.classList.toggle('is-active', i === index);
          });

          var activePillar = pillars[index];
          if (activePillar && pillarMarker) {
            pillarMarker.style.opacity = '1';
            pillarMarker.style.transform = 'translateY(' + activePillar.offsetTop + 'px)';
            pillarMarker.style.height = activePillar.offsetHeight + 'px';
          }
        }

        pillars.forEach(function (pillar, index) {
          ScrollTrigger.create({
            trigger: pillar,
            start: 'top 70%',
            end: 'bottom 30%',
            onEnter: function () { activatePillar(index); },
            onEnterBack: function () { activatePillar(index); }
          });
        });

        gsap.fromTo(pillars,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 0.38,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.fgc-continuity__pillars',
              start: 'top 82%'
            }
          }
        );
      }
    }
  }

  /* ── 8. Phase 8: Final CTA Motion Sequence ────────────────── */
  function initCTA() {
    var cta = document.querySelector('.fgc-cta');
    if (!cta || isReducedMotion) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: cta,
          start: 'top 80%'
        }
      });

      // 1. Eyebrow fades in
      tl.fromTo('.fgc-cta__eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      // 2. Large CTA heading masked upward reveal
      .fromTo('.fgc-cta__heading',
        { y: 35, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out' },
        '-=0.3'
      )
      // 3. Thin gold line draws beneath heading
      .to('.fgc-cta__line',
        { width: '120px', duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      )
      // 4. Supporting text fades in
      .fromTo('.fgc-cta__text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      // 5. Buttons enter last
      .fromTo('.fgc-cta__actions',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }

  /* ── 9. Fixed Right-Side Sections Navigation ────────────── */
  function initSideNav() {
    var sideNav = document.getElementById('fgcSideNav');
    var trigger = document.getElementById('fgcSideNavTrigger');
    var panel = document.getElementById('fgcSideNavPanel');
    var closeBtn = document.getElementById('fgcSideNavClose');
    var currentBadge = document.getElementById('fgcSideNavCurrent');
    if (!sideNav || !trigger || !panel) return;

    var navBtns = sideNav.querySelectorAll('.fgc-side-nav__btn');
    var sectionIds = ['fgc-hero', 'engagement-model', 'how-we-work', 'capabilities', 'who-we-support', 'continuity', 'contact-cta'];

    function openNav() {
      sideNav.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.setAttribute('aria-hidden', 'false');
    }

    function closeNav() {
      sideNav.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'true');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (sideNav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeNav();
      });
    }

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (sideNav.classList.contains('is-open') && !sideNav.contains(e.target)) {
        closeNav();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sideNav.classList.contains('is-open')) {
        closeNav();
      }
    });

    // Smooth scroll on button click
    navBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var targetId = btn.getAttribute('data-target') || (btn.getAttribute('href') ? btn.getAttribute('href').replace('#', '') : '');
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          var headerOffset = 70;
          var elementPosition = targetEl.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          navBtns.forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');

          // On mobile screens, auto-close after selection for better viewing
          if (window.innerWidth <= 768) {
            setTimeout(closeNav, 300);
          }
        }
      });
    });

    // ScrollSpy to update active state and trigger current badge
    var ticking = false;
    function updateActiveSection() {
      var scrollPosition = window.pageYOffset + 180;
      var currentId = sectionIds[0];
      var currentIndex = 1;

      for (var i = 0; i < sectionIds.length; i++) {
        var el = document.getElementById(sectionIds[i]);
        if (el) {
          var top = el.offsetTop;
          var height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentId = sectionIds[i];
            currentIndex = i + 1;
            break;
          } else if (scrollPosition >= top) {
            currentId = sectionIds[i];
            currentIndex = i + 1;
          }
        }
      }

      navBtns.forEach(function (btn) {
        var targetId = btn.getAttribute('data-target') || (btn.getAttribute('href') ? btn.getAttribute('href').replace('#', '') : '');
        if (targetId === currentId) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });

      if (currentBadge) {
        currentBadge.textContent = currentIndex < 10 ? '0' + currentIndex : currentIndex;
      }

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    }, { passive: true });

    updateActiveSection();
  }

  /* ── Reduced Motion Fallback ────────────────────────────── */
  function applyReducedMotion() {
    if (isReducedMotion) {
      document.querySelectorAll(
        '.fgc-reveal, .fgc-process__stage, .fgc-audience__item, .fgc-model__card, .fgc-cap-item, .fgc-continuity__pillar'
      ).forEach(function (el) {
        el.classList.add('is-inview');
        el.classList.add('is-active');
      });
      var line = document.querySelector('.fgc-cta__line');
      if (line) line.style.width = '120px';
    }
  }

  /* ── Main Initializer ───────────────────────────────────── */
  function init() {
    initHero();
    initIntro();
    initModel();
    initLineReveals();
    initProcess();
    initCapabilitiesShowcase();
    initCapabilities();
    initAudience();
    initGenericReveals();
    initContinuity();
    initCTA();
    initSideNav();
    applyReducedMotion();

    window.addEventListener('load', function () {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
