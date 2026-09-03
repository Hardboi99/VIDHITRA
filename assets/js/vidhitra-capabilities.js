/* =========================================================
   VIDHITRA — CAPABILITIES SECTION (horizontal carousel)
   v3: matches the card/track markup in
   vidhitra-capabilities.html / .css.
   ========================================================= */

(function () {
  "use strict";

  var grid = document.getElementById("vdCapabilitiesGrid");
  var carousel = document.getElementById("vdCapabilitiesCarousel");
  var track = document.getElementById("vdCapabilitiesTrack");
  if (!grid || !carousel || !track) return;

  var items = Array.prototype.slice.call(grid.querySelectorAll(".vd-capability-card"));
  var input = document.getElementById("vdCapabilitySearchInput");
  var clearBtn = document.getElementById("vdCapabilitySearchClear");
  var countEl = document.getElementById("vdCapabilityCount");
  var noResults = document.getElementById("vdCapabilitiesNoResults");
  var resetBtn = document.getElementById("vdResetSearchBtn");
  var prevBtn = document.getElementById("vdCarouselPrev");
  var nextBtn = document.getElementById("vdCarouselNext");
  var hotLeft = carousel.querySelector(".vd-carousel-hotzone--left");
  var hotRight = carousel.querySelector(".vd-carousel-hotzone--right");
  var TOTAL = items.length;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------------------------------------------------------
     1. Row entrance — GSAP ScrollTrigger.batch if available,
        otherwise a plain IntersectionObserver fallback.
        Card 01 (items[0]) is excluded from the hidden entrance:
        it is immediately visible and already expanded on load.
     --------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    // Cards 02-07 get the fade-in entrance animation
    var animItems = items.slice(1);
    if (animItems.length) {
      gsap.set(animItems, { opacity: 0, y: 18 });
      ScrollTrigger.batch(animItems, {
        start: "top 92%",
        once: true,
        onEnter: function (batch) {
          gsap.to(batch, {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06,
            onComplete: function () { batch.forEach(function (el) { el.classList.add("vd-in-view"); }); }
          });
        }
      });
    }
    // Card 01 is immediately visible — no entrance animation
    gsap.set(items[0], { opacity: 1, y: 0, clearProps: "opacity,y" });
    items[0].classList.add("vd-in-view");
  } else if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("vd-in-view");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
    // Card 01 visible immediately; observe the rest
    items[0].classList.add("vd-in-view");
    items.slice(1).forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("vd-in-view"); });
  }

  /* ---------------------------------------------------------
     2. Expand / collapse — click the header or the arrow.
        Only one card open at a time. The title link still
        navigates normally.
     --------------------------------------------------------- */
  function collapse(item) {
    item.classList.remove("vd-expanded");
    var arrow = item.querySelector(".vd-capability-arrow");
    if (arrow) arrow.setAttribute("aria-expanded", "false");
  }

  function toggle(item) {
    var willOpen = !item.classList.contains("vd-expanded");
    items.forEach(collapse);
    if (willOpen) {
      item.classList.add("vd-expanded");
      var arrow = item.querySelector(".vd-capability-arrow");
      if (arrow) arrow.setAttribute("aria-expanded", "true");
    }
  }

  items.forEach(function (item) {
    var header = item.querySelector(".vd-capability-header");

    if (header) {
      header.addEventListener("click", function (e) {
        if (e.target.closest(".vd-capability-content a")) return;
        toggle(item);
      });
    }
  });

  /* ---------------------------------------------------------
     Default open: Card 01 starts expanded on page load.
     Card 01 is already visible (excluded from GSAP hide above),
     so we simply add vd-expanded directly — no timing tricks needed.
  --------------------------------------------------------- */
  if (items.length) {
    items.forEach(function (el) { el.classList.remove("vd-expanded"); });
    items[0].classList.add("vd-expanded");
  }

  /* ---------------------------------------------------------
     3. Hover / focus "stamp" on the number badge
     --------------------------------------------------------- */
  items.forEach(function (item) {
    function stamp() {
      item.classList.remove("vd-stamped");
      void item.offsetWidth;
      item.classList.add("vd-stamped");
    }
    item.addEventListener("mouseenter", stamp);
    item.addEventListener("focusin", stamp);
    item.addEventListener("animationend", function (e) {
      if (e.animationName === "vdStampPress") item.classList.remove("vd-stamped");
    });
  });

  /* ---------------------------------------------------------
     5. Carousel — cursor-edge auto-scroll, nav buttons, keys.
     --------------------------------------------------------- */
  var offset = 0;      // current translateX distance (positive = scrolled right)
  var maxScroll = 0;
  var rafId = null;
  var scrollDir = 0;   // -1, 0, or 1
  var scrollSpeed = 0; // px per frame, set by proximity to edge

  function computeMaxScroll() {
    var trackWidth = track.clientWidth;
    var rowWidth = grid.scrollWidth;
    maxScroll = Math.max(0, rowWidth - trackWidth);
    offset = Math.min(offset, maxScroll);
    applyOffset();
    updateEdgeState();
  }

  function applyOffset() {
    grid.style.transform = "translateX(" + (-offset) + "px)";
  }

  function updateEdgeState() {
    carousel.classList.toggle("vd-can-scroll-left", offset > 1);
    carousel.classList.toggle("vd-can-scroll-right", offset < maxScroll - 1);
    if (prevBtn) prevBtn.disabled = offset <= 1;
    if (nextBtn) nextBtn.disabled = offset >= maxScroll - 1;
  }

  function stopAutoScroll() {
    scrollDir = 0;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  function autoScrollTick() {
    if (scrollDir === 0) { rafId = null; return; }
    offset += scrollDir * scrollSpeed;
    if (offset < 0) offset = 0;
    if (offset > maxScroll) offset = maxScroll;
    applyOffset();
    updateEdgeState();
    if ((scrollDir < 0 && offset <= 0) || (scrollDir > 0 && offset >= maxScroll)) {
      stopAutoScroll();
      return;
    }
    rafId = requestAnimationFrame(autoScrollTick);
  }

  function startAutoScroll(dir) {
    scrollDir = dir;
    if (!rafId) rafId = requestAnimationFrame(autoScrollTick);
  }

  function handleHotzoneMove(e, zone, dir) {
    var r = zone.getBoundingClientRect();
    // 0 at the outer edge of the zone, 1 at the inner edge nearest the cards.
    var depth = dir < 0
      ? (e.clientX - r.left) / r.width
      : (r.right - e.clientX) / r.width;
    depth = Math.min(Math.max(depth, 0), 1);
    scrollSpeed = 4 + (1 - depth) * 14; // 4–18px/frame: faster the closer to the true edge
    startAutoScroll(dir);
  }

  if (!reduced && isFinePointer) {
    if (hotLeft) {
      hotLeft.addEventListener("mousemove", function (e) { handleHotzoneMove(e, hotLeft, -1); });
      hotLeft.addEventListener("mouseleave", stopAutoScroll);
    }
    if (hotRight) {
      hotRight.addEventListener("mousemove", function (e) { handleHotzoneMove(e, hotRight, 1); });
      hotRight.addEventListener("mouseleave", stopAutoScroll);
    }
  }
  // Safety net: never keep auto-scrolling once the pointer leaves the carousel entirely.
  carousel.addEventListener("mouseleave", stopAutoScroll);

  function stepTo(newOffset) {
    stopAutoScroll();
    offset = Math.min(Math.max(newOffset, 0), maxScroll);
    grid.classList.add("vd-anim");
    applyOffset();
    updateEdgeState();
    window.clearTimeout(stepTo._t);
    stepTo._t = window.setTimeout(function () { grid.classList.remove("vd-anim"); }, 520);
  }

  function cardStep() {
    var first = items.find ? items.find(function (i) { return !i.classList.contains("vd-hidden"); }) : items[0];
    var w = first ? first.getBoundingClientRect().width : 320;
    return w + 20; // card width + row gap
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { stepTo(offset - cardStep() * 2); });
  if (nextBtn) nextBtn.addEventListener("click", function () { stepTo(offset + cardStep() * 2); });

  carousel.setAttribute("tabindex", "0");
  carousel.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); stepTo(offset + cardStep()); }
    if (e.key === "ArrowLeft") { e.preventDefault(); stepTo(offset - cardStep()); }
  });

  window.addEventListener("resize", computeMaxScroll);
  // Recompute once images/webfonts settle and layout is final.
  window.addEventListener("load", computeMaxScroll);
  computeMaxScroll();

  /* ---------------------------------------------------------
     6. Search
     --------------------------------------------------------- */
  if (!input) return;

  var originals = new WeakMap();
  items.forEach(function (item) {
    var titleEl = item.querySelector(".title a") || item.querySelector(".title");
    var descEl = item.querySelector(".desc");
    if (titleEl) originals.set(titleEl, titleEl.textContent);
    if (descEl) originals.set(descEl, descEl.textContent);
  });

  function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function highlight(el, query) {
    if (!el || !originals.has(el)) return;
    var raw = originals.get(el);
    if (!query) { el.textContent = raw; return; }
    var re = new RegExp("(" + escapeRegExp(query) + ")", "ig");
    el.innerHTML = raw.replace(re, '<mark class="vd-mark">$1</mark>');
  }

  var debounceTimer;
  function runFilter() {
    var query = input.value.trim().toLowerCase();
    if (clearBtn) clearBtn.classList.toggle("is-visible", query.length > 0);
    var visibleCount = 0;

    items.forEach(function (item) {
      var title = (item.getAttribute("data-title") || "").toLowerCase();
      var keywords = (item.getAttribute("data-keywords") || "").toLowerCase();
      var match = !query || title.indexOf(query) !== -1 || keywords.indexOf(query) !== -1;

      var titleEl = item.querySelector(".title a") || item.querySelector(".title");
      var descEl = item.querySelector(".desc");
      var showQuery = query.length >= 2 ? input.value.trim() : "";
      highlight(titleEl, showQuery);
      highlight(descEl, showQuery);

      if (match) {
        visibleCount++;
        if (item.classList.contains("vd-hidden")) { item.classList.remove("vd-hidden"); void item.offsetWidth; }
        item.classList.remove("vd-leaving");
      } else if (!item.classList.contains("vd-hidden")) {
        item.classList.add("vd-leaving");
        collapse(item);
        setTimeout(function () { if (item.classList.contains("vd-leaving")) item.classList.add("vd-hidden"); }, reduced ? 0 : 280);
      }
    });

    if (countEl) {
      countEl.textContent = query ? (visibleCount + " of " + TOTAL + " matched") : (TOTAL + " capabilities");
      countEl.classList.remove("is-pulsing");
      void countEl.offsetWidth;
      countEl.classList.add("is-pulsing");
    }
    if (noResults) noResults.classList.toggle("vd-visible", visibleCount === 0);

    // Filtering changes the row's scrollable width — recompute after
    // the leave transition finishes, and reset to the start so the
    // remaining matches are always visible rather than stuck off-screen.
    offset = 0;
    setTimeout(computeMaxScroll, reduced ? 0 : 300);
  }

  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runFilter, 120);
  });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { input.value = ""; runFilter(); input.blur(); }
  });
  function clearSearch() { input.value = ""; runFilter(); input.focus(); }
  if (clearBtn) clearBtn.addEventListener("click", clearSearch);
  if (resetBtn) resetBtn.addEventListener("click", clearSearch);

})();