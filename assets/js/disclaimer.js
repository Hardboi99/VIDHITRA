(function () {
  var overlay    = document.getElementById('vdPopupOverlay');
  var wrap       = document.getElementById('vdPopupWrap');
  var shapeBig   = document.querySelector('.vd-popup-shape-big');
  var shapeSmall = document.querySelector('.vd-popup-shape-small');
  var enterBtn   = document.getElementById('vdEnterBtn');
  var exitBtn    = document.getElementById('vdExitBtn');

  var CLOSE_ANIM_MS = 900; // must match .vd-popup-overlay.is-closing .vd-popup-card duration
  var STORAGE_KEY    = 'vidhitraDisclaimerAccepted';
  var EXIT_URL        = 'https://www.google.com'; // where "Exit Website" sends visitors

  function openGate() {
    document.body.classList.add('vd-locked');
    overlay.classList.remove('is-active', 'is-closing');
    void overlay.offsetWidth;
    overlay.classList.add('is-active');
  }

  function enterSite() {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
    overlay.classList.add('is-closing');
    setTimeout(function () {
      overlay.classList.remove('is-active', 'is-closing');
      overlay.style.display = 'none';
      document.body.classList.remove('vd-locked');
    }, CLOSE_ANIM_MS);
  }

  function exitSite() {
    window.location.href = EXIT_URL;
  }

  enterBtn.addEventListener('click', enterSite);
  exitBtn.addEventListener('click', exitSite);

  // NOTE: intentionally no backdrop-click / Escape / X close —
  // a disclaimer gate must be explicitly accepted or declined.

  /* Only the background shapes drift with the cursor — the card never moves */
  var raf = null;
  overlay.addEventListener('mousemove', function (e) {
    if (!overlay.classList.contains('is-active')) return;
    var rect = wrap.getBoundingClientRect();
    var relX = (e.clientX - rect.left) / rect.width;
    var relY = (e.clientY - rect.top) / rect.height;
    var bigX = (relX - 0.5) * 50, bigY = (relY - 0.5) * 50;
    var smallX = (relX - 0.5) * -70, smallY = (relY - 0.5) * -70;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () {
      shapeBig.style.transform   = 'translate(-50%,-50%) translate3d(' + bigX + 'px,' + bigY + 'px,0)';
      shapeSmall.style.transform = 'translate3d(' + smallX + 'px,' + smallY + 'px,0)';
    });
  });
  overlay.addEventListener('mouseleave', function () {
    shapeBig.style.transform   = 'translate(-50%,-50%) translate3d(0,0,0)';
    shapeSmall.style.transform = 'translate3d(0,0,0)';
  });

  /* Show immediately on load — once per browser session (remove the
     try/catch check below if you want it on every single page load) */
  var alreadyAccepted = false;
  try { alreadyAccepted = sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (e) {}

  if (!alreadyAccepted) {
    openGate();
  }
})();


