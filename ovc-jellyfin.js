/* ═══════════════════════════════════════════════════════════════════════
   OCEAN VIEW CINEMA — Jellyfin Theme JS
   ovc-jellyfin.js
   -----------------------------------------------------------------------
   INSTALL:
   1. Copy this file to your Jellyfin web root, e.g.:
        /usr/share/jellyfin/web/ovc-jellyfin.js
        (or wherever your index.html lives)
   
   2. Edit index.html in that same folder.
      Find the closing </body> tag and add just before it:
        <script src="ovc-jellyfin.js"></script>
   
   3. Hard-refresh the browser (Ctrl+Shift+R) after saving.
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Wait for Jellyfin's router to settle before injecting ────────── */
  function init() {
    injectCenterLight();
    injectParticles();
    watchNavigation();
  }

  /* ─── CENTER LIGHT ─────────────────────────────────────────────────── */
  function injectCenterLight() {
    if (document.getElementById('ovc-center-light')) return;
    const el = document.createElement('div');
    el.id = 'ovc-center-light';
    document.body.appendChild(el);
  }

  /* ─── GRID INJECTION ────────────────────────────────────────────────
     Grid divs are injected into the current page's main content area
     every time Jellyfin navigates. They scroll with content (same plane).
     Void stays fixed behind everything — depth is architectural, not faked.
  ─────────────────────────────────────────────────────────────────────── */
  function injectGrid(container) {
    if (!container) return;
    if (container.querySelector('#ovc-grid-far')) return;

    // Container must be position:relative for absolute children to anchor
    const cs = window.getComputedStyle(container);
    if (cs.position === 'static') container.style.position = 'relative';

    const far = document.createElement('div');
    far.id = 'ovc-grid-far';
    container.insertBefore(far, container.firstChild);

    const near = document.createElement('div');
    near.id = 'ovc-grid-near';
    container.insertBefore(near, container.firstChild);
  }

  /* ─── VOID + CENTER LIGHT PARALLAX ─────────────────────────────────
     Void moves at 0.08x scroll — barely drifts, sells "endless depth".
     Center light moves with the void (same plane).
     Grid/content are the same plane — scroll at 1x naturally via DOM.
     Particles are at 0.5x — they float between void and foreground.
  ─────────────────────────────────────────────────────────────────────── */
  let currentY = 0, targetY = 0;
  let scrollContainer = null;

  function setupParallax(container) {
    if (scrollContainer) {
      scrollContainer.removeEventListener('scroll', onScroll);
    }
    scrollContainer = container;
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });
  }

  function onScroll() {
    targetY = scrollContainer.scrollTop;
  }

  function parallaxTick() {
    currentY += (targetY - currentY) * 0.07;

    // Void drifts slightly — enough to prove it's a different plane
    const voidEl = document.querySelector('.backgroundContainer') || document.body;
    const lightEl = document.getElementById('ovc-center-light');
    const drift = -currentY * 0.08;

    if (lightEl) {
      lightEl.style.transform = `translate(-50%, calc(-50% + ${drift}px))`;
    }

    requestAnimationFrame(parallaxTick);
  }
  parallaxTick();

  /* ─── PARTICLES ─────────────────────────────────────────────────────
     165 particles in world-space (WORLD_H = 3000px).
     Drawn at scrollY * 0.5 offset — mid-depth between void and foreground.
     Each twinkles independently. Bigger, brighter than the grid lines.
  ─────────────────────────────────────────────────────────────────────── */
  function injectParticles() {
    if (document.getElementById('ovc-particles')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'ovc-particles';
    canvas.style.cssText = 'position:fixed;left:0;top:0;pointer-events:none;z-index:4;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const WORLD_H = 3000;
    const COUNT = 165;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: COUNT }, () => ({
      x:      Math.random() * window.innerWidth,
      worldY: Math.random() * WORLD_H,
      vy:     Math.random() * 0.3  + 0.06,
      vx:     (Math.random() - 0.5) * 0.09,
      r:      Math.random() * 1.9  + 0.5,
      base:   Math.random() * 0.42 + 0.16,
      phase:  Math.random() * Math.PI * 2,
      freq:   Math.random() * 0.011 + 0.004
    }));

    let frame = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Mid-depth: particles lag at half scroll speed
      const offset = currentY * 0.5;

      particles.forEach(p => {
        const screenY = ((p.worldY - offset) % WORLD_H + WORLD_H) % WORLD_H;

        if (screenY < -4 || screenY > canvas.height + 4) {
          p.worldY -= p.vy;
          if (p.worldY < 0) p.worldY = WORLD_H;
          return;
        }

        const twinkle = 0.5 + 0.5 * Math.sin(p.phase + frame * p.freq);
        const alpha   = p.base * twinkle;

        const g = ctx.createRadialGradient(p.x, screenY, 0, p.x, screenY, p.r * 3.2);
        g.addColorStop(0,   `rgba(0,240,255,${alpha})`);
        g.addColorStop(0.5, `rgba(0,220,240,${alpha * 0.45})`);
        g.addColorStop(1,   `rgba(0,200,230,0)`);

        ctx.beginPath();
        ctx.arc(p.x, screenY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        p.worldY -= p.vy;
        p.x += p.vx;
        if (p.worldY < 0)             p.worldY = WORLD_H;
        if (p.x < -4)                 p.x = canvas.width + 4;
        if (p.x > canvas.width + 4)   p.x = -4;
      });

      requestAnimationFrame(draw);
    }
    draw();
  }

  /* ─── NAVIGATION WATCHER ────────────────────────────────────────────
     Jellyfin is a SPA. Re-inject grid + re-bind parallax on every
     page navigation. Watches for the main content container changing.
  ─────────────────────────────────────────────────────────────────────── */
  function watchNavigation() {
    // Try to find the scroll container immediately
    tryBind();

    // Jellyfin swaps content via DOM mutations — watch for it
    const observer = new MutationObserver(() => {
      tryBind();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function tryBind() {
    // Jellyfin's main scrollable content container candidates
    const candidates = [
      '.mainAnimatedPages .activePage',
      '.mainAnimatedPages > div:not([hidden])',
      '.libraryPage',
      '.homePage',
      '.standardUserPage',
      '.itemDetailPage',
      '.mainAnimatedPages',
    ];

    let container = null;
    for (const sel of candidates) {
      const el = document.querySelector(sel);
      if (el) { container = el; break; }
    }

    if (!container) return;

    // Inject grid into this page's content area
    injectGrid(container);

    // Bind scroll parallax to this container
    setupParallax(container);
  }

  /* ─── BOOT ──────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Small delay — let Jellyfin's router render the first page
    setTimeout(init, 300);
  }

})();
