/* =========================================================
   VIDHITRA — CAPABILITIES
   Clean rewrite.

   Fixes vs. the old file:
   - applyOffset() built "translateX(" + n + "px" with no
     closing parenthesis -> invalid CSS value -> the carousel
     never visually moved. Fixed below.
   - Entrance reveal no longer depends on GSAP/ScrollTrigger
     being loaded + registered in a particular order; it now
     uses a plain IntersectionObserver + CSS transitions, so
     it always fires.
   - Cards are permanently open (no expand/collapse state to
     manage), so all the old toggle logic is gone.
   ========================================================= */

(function () {
  "use strict";

  var grid = document.getElementById("vdCapabilitiesGrid");
  var carousel = document.getElementById("vdCapabilitiesCarousel");
  var track = document.getElementById("vdCapabilitiesTrack");

  if (!grid || !carousel || !track) return;

  var items = Array.prototype.slice.call(
    grid.querySelectorAll(".vd-capability-card"),
  );

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
  var isFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;

  /* =========================================================
     1. ENTRANCE ANIMATION
     Dependency-free: IntersectionObserver + CSS transitions,
     staggered per card via an inline transition-delay.
     ========================================================= */

  items.forEach(function (item, index) {
    item.style.transitionDelay = Math.min(index, 7) * 90 + "ms";
  });

  function revealAll() {
    items.forEach(function (item) {
      item.classList.add("vd-in-view");
    });
  }

  if (reduced) {
    revealAll();
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("vd-in-view");

          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    items.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealAll();
  }

  /* =========================================================
     2. NUMBER BADGE STAMP ANIMATION
     ========================================================= */

  items.forEach(function (item) {
    function stamp() {
      item.classList.remove("vd-stamped");
      void item.offsetWidth;
      item.classList.add("vd-stamped");
    }

    item.addEventListener("mouseenter", stamp);
    item.addEventListener("focusin", stamp);

    item.addEventListener("animationend", function (e) {
      if (e.animationName === "vdStampPress") {
        item.classList.remove("vd-stamped");
      }
    });
  });

  /* =========================================================
     3. SUBTLE HOVER TILT (fine pointers only, no reduced motion)
     ========================================================= */

  if (!reduced && isFinePointer) {
    items.forEach(function (item) {
      var maxTilt = 4; // degrees — kept restrained on purpose

      item.addEventListener("mousemove", function (e) {
        var r = item.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;

        item.classList.add("vd-tilting");

        item.style.transform =
          "translateY(-6px) " +
          "perspective(800px) " +
          "rotateX(" +
          py * -maxTilt +
          "deg) " +
          "rotateY(" +
          px * maxTilt +
          "deg)";
      });

      item.addEventListener("mouseleave", function () {
        item.classList.remove("vd-tilting");
        item.style.transform = "";
      });
    });
  }

  /* =========================================================
     4. CAROUSEL
     ========================================================= */

  var offset = 0;
  var maxScroll = 0;
  var rafId = null;
  var scrollDir = 0;
  var scrollSpeed = 0;

  function computeMaxScroll() {
    var trackWidth = track.clientWidth;
    var rowWidth = grid.scrollWidth;

    maxScroll = Math.max(0, rowWidth - trackWidth);
    offset = Math.min(offset, maxScroll);

    applyOffset();
    updateEdgeState();
  }

  function applyOffset() {
    // NOTE: the fix — this string must close the parenthesis,
    // otherwise the browser silently discards the transform.
    grid.style.transform = "translateX(" + -offset + "px)";
    grid.style.willChange = "transform";
  }

  function updateEdgeState() {
    carousel.classList.toggle("vd-can-scroll-left", offset > 1);
    carousel.classList.toggle("vd-can-scroll-right", offset < maxScroll - 1);

    if (prevBtn) prevBtn.disabled = offset <= 1;
    if (nextBtn) nextBtn.disabled = offset >= maxScroll - 1;
  }

  function stopAutoScroll() {
    scrollDir = 0;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function autoScrollTick() {
    if (scrollDir === 0) {
      rafId = null;
      return;
    }

    offset += scrollDir * scrollSpeed;

    if (offset < 0) offset = 0;
    if (offset > maxScroll) offset = maxScroll;

    applyOffset();
    updateEdgeState();

    if (
      (scrollDir < 0 && offset <= 0) ||
      (scrollDir > 0 && offset >= maxScroll)
    ) {
      stopAutoScroll();
      return;
    }

    rafId = requestAnimationFrame(autoScrollTick);
  }

  function startAutoScroll(dir) {
    scrollDir = dir;
    if (!rafId) {
      rafId = requestAnimationFrame(autoScrollTick);
    }
  }

  function handleHotzoneMove(e, zone, dir) {
    var r = zone.getBoundingClientRect();

    var depth =
      dir < 0
        ? (e.clientX - r.left) / r.width
        : (r.right - e.clientX) / r.width;

    depth = Math.min(Math.max(depth, 0), 1);

    scrollSpeed = 4 + (1 - depth) * 14;

    startAutoScroll(dir);
  }

  if (!reduced && isFinePointer) {
    if (hotLeft) {
      hotLeft.addEventListener("mousemove", function (e) {
        handleHotzoneMove(e, hotLeft, -1);
      });
      hotLeft.addEventListener("mouseleave", stopAutoScroll);
    }

    if (hotRight) {
      hotRight.addEventListener("mousemove", function (e) {
        handleHotzoneMove(e, hotRight, 1);
      });
      hotRight.addEventListener("mouseleave", stopAutoScroll);
    }
  }

  carousel.addEventListener("mouseleave", stopAutoScroll);

  function stepTo(newOffset) {
    stopAutoScroll();

    offset = Math.min(Math.max(newOffset, 0), maxScroll);

    grid.classList.add("vd-anim");

    applyOffset();
    updateEdgeState();

    window.clearTimeout(stepTo._t);

    stepTo._t = window.setTimeout(function () {
      grid.classList.remove("vd-anim");
    }, 520);
  }

  function cardStep() {
    var first = items.find
      ? items.find(function (i) {
          return !i.classList.contains("vd-hidden");
        })
      : items[0];

    var w = first ? first.getBoundingClientRect().width : 320;

    return w + 22;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      stepTo(offset - cardStep() * 2);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      stepTo(offset + cardStep() * 2);
    });
  }

  carousel.setAttribute("tabindex", "0");

  carousel.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stepTo(offset + cardStep());
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stepTo(offset - cardStep());
    }
  });

  window.addEventListener("resize", computeMaxScroll);
  window.addEventListener("load", computeMaxScroll);

  computeMaxScroll();

  /* =========================================================
     5. SEARCH
     Matching cards simply stay visible — there's no expand/
     collapse state to manage anymore.
     ========================================================= */

  if (!input) return;

  var originals = new WeakMap();

  items.forEach(function (item) {
    var titleEl =
      item.querySelector(".title a") || item.querySelector(".title");
    var descEl = item.querySelector(".desc");

    if (titleEl) originals.set(titleEl, titleEl.textContent);
    if (descEl) originals.set(descEl, descEl.textContent);
  });

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlight(el, query) {
    if (!el || !originals.has(el)) return;

    var raw = originals.get(el);

    if (!query) {
      el.textContent = raw;
      return;
    }

    var re = new RegExp("(" + escapeRegExp(query) + ")", "ig");

    el.innerHTML = raw.replace(re, '<mark class="vd-mark">$1</mark>');
  }

  var debounceTimer;

  function runFilter() {
    var query = input.value.trim().toLowerCase();

    if (clearBtn) {
      clearBtn.classList.toggle("is-visible", query.length > 0);
    }

    var visibleCount = 0;

    items.forEach(function (item) {
      var title = (item.getAttribute("data-title") || "").toLowerCase();
      var keywords = (item.getAttribute("data-keywords") || "").toLowerCase();

      var match =
        !query || title.indexOf(query) !== -1 || keywords.indexOf(query) !== -1;

      var titleEl =
        item.querySelector(".title a") || item.querySelector(".title");
      var descEl = item.querySelector(".desc");

      var showQuery = query.length >= 2 ? input.value.trim() : "";

      highlight(titleEl, showQuery);
      highlight(descEl, showQuery);

      if (match) {
        visibleCount++;

        item.classList.remove("vd-hidden");
        item.classList.remove("vd-leaving");
      } else {
        item.classList.add("vd-leaving");

        setTimeout(
          function () {
            if (item.classList.contains("vd-leaving")) {
              item.classList.add("vd-hidden");
            }
          },
          reduced ? 0 : 280,
        );
      }
    });

    if (countEl) {
      countEl.textContent = query
        ? visibleCount + " of " + TOTAL + " matched"
        : TOTAL + " capabilities";

      countEl.classList.remove("is-pulsing");
      void countEl.offsetWidth;
      countEl.classList.add("is-pulsing");
    }

    if (noResults) {
      noResults.classList.toggle("vd-visible", visibleCount === 0);
    }

    offset = 0;

    setTimeout(computeMaxScroll, reduced ? 0 : 300);
  }

  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runFilter, 120);
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      input.value = "";
      runFilter();
      input.blur();
    }
  });

  function clearSearch() {
    input.value = "";
    runFilter();
    input.focus();
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", clearSearch);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", clearSearch);
  }
})();
