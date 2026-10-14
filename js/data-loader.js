/* ==========================================================================
   data-loader.js — Loads JSON for the site, with a safe fallback.
   Order:
     1. try fetch('data/<name>.json')  — works when hosted or via Live Server
     2. if fetch fails (e.g. opened via file://), fall back to
        window.__DATA__.<name>  (loaded from /data/data.js)
   Also exposes small render helpers used by other scripts.
   ========================================================================== */

window.PortfolioData = (function () {
  const cache = {};

  async function load(name) {
    if (cache[name]) return cache[name];
    // Try fetch first
    try {
      const res = await fetch(`data/${name}.json`, { cache: 'no-cache' });
      if (res.ok) {
        const data = await res.json();
        cache[name] = data;
        return data;
      }
      throw new Error('fetch failed with ' + res.status);
    } catch (_e) {
      // Fallback: data.js
      if (window.__DATA__ && window.__DATA__[name]) {
        cache[name] = window.__DATA__[name];
        return cache[name];
      }
      console.warn(`[data-loader] Could not load "${name}" via fetch or window.__DATA__`);
      return [];
    }
  }

  /* ---------- Shared helpers ---------- */

  // Graceful image fallback — swap to inline SVG tile if load fails.
  function handleImgError(img) {
    img.onerror = () => {
      img.outerHTML = fallbackSvg(img.alt || 'image');
    };
  }

  function fallbackSvg(label) {
    const safe = (label || '').replace(/[<>&"']/g, '');
    return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${safe}" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#242748"/>
          <stop offset="1" stop-color="#1b1e34"/>
        </linearGradient>
        <pattern id="p" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#a99bff" opacity=".25"/>
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#g)"/>
      <rect width="400" height="300" fill="url(#p)"/>
      <g font-family="Inter, sans-serif" font-size="14" fill="#b8b9ce" text-anchor="middle">
        <text x="200" y="155">${safe}</text>
      </g>
    </svg>`;
  }

  // Safe image markup: lazy-loaded, with onerror fallback
  function img(src, alt, cls = '') {
    const safeAlt = (alt || '').replace(/"/g, '&quot;');
    return `<img src="${src}" alt="${safeAlt}" loading="lazy" class="${cls}"
            onerror="this.outerHTML = PortfolioData.fallbackSvg(this.getAttribute('alt'))" />`;
  }

  function escapeHtml(s) {
    return (s || '').replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  // Chip markup
  function chip(label, variant = '') {
    return `<span class="chip ${variant}">${escapeHtml(label)}</span>`;
  }

  function starRating(n) {
    if (!n) return '';
    const full = Math.floor(n);
    const half = n - full >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
  }

  return { load, img, fallbackSvg, chip, escapeHtml, starRating, handleImgError };
})();
