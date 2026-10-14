/* ==========================================================================
   main.js — Site-wide behaviour: nav, theme, scroll progress, back-to-top,
   reveal-on-scroll, footer year, typing effect, animated counters,
   copy-email toast. Runs on every page.
   ========================================================================== */

/* ---------- Utility: tiny $ helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Footer year ---------- */
function setFooterYear() {
  const yearEl = $('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- 2. Mobile nav ---------- */
function initNav() {
  const toggle = $('.nav-toggle');
  const links  = $('.nav-links');
  if (!toggle || !links) return;

  const close = () => {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  const open = () => {
    links.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    links.classList.contains('is-open') ? close() : open();
  });
  // Close after link tap on mobile
  $$('a', links).forEach(a => a.addEventListener('click', close));
  // Close on Esc
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ---------- 3. Active nav link highlighting ---------- */
function markActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- 4. Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = $('.scroll-progress__bar');
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  };
  update();
  document.addEventListener('scroll', update, { passive: true });
}

/* ---------- 5. Back-to-top ---------- */
function initBackToTop() {
  const btn = $('.back-to-top');
  if (!btn) return;
  const onScroll = () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}

/* ---------- 6. Theme toggle ---------- */
function initTheme() {
  const btn = $('.theme-toggle');
  const stored = localStorage.getItem('theme');
  if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    if (next === 'light') document.documentElement.setAttribute('data-theme', 'light');
    else                  document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', next);
  });
}

/* ---------- 7. Reveal-on-scroll via IntersectionObserver ---------- */
function initReveal() {
  const targets = $$('.reveal, .reveal-stagger');
  if (!targets.length || prefersReducedMotion) {
    targets.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(el => io.observe(el));
}

/* ---------- 8. Hero typing effect ---------- */
function initTyping() {
  const el = $('[data-typing]');
  if (!el) return;
  const words = JSON.parse(el.getAttribute('data-typing'));
  if (prefersReducedMotion) {
    el.textContent = words[0];
    return;
  }
  let wordIdx = 0, charIdx = 0, deleting = false;
  const typeSpeed = 70, deleteSpeed = 40, holdFull = 1600, holdEmpty = 300;

  const span = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.textContent = '';
  el.appendChild(span);
  el.appendChild(cursor);

  const tick = () => {
    const current = words[wordIdx];
    if (!deleting) {
      span.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        return setTimeout(tick, holdFull);
      }
      return setTimeout(tick, typeSpeed);
    }
    span.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      return setTimeout(tick, holdEmpty);
    }
    setTimeout(tick, deleteSpeed);
  };
  tick();
}

/* ---------- 9. Animated counters ---------- */
function initCounters() {
  const targets = $$('[data-count]');
  if (!targets.length) return;
  const animate = el => {
    const target = parseFloat(el.getAttribute('data-count'));
    if (prefersReducedMotion) { el.textContent = target; return; }
    const dur = 1200;
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toString();
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.4 });
  targets.forEach(t => io.observe(t));
}

/* ---------- 10. Copy-email ---------- */
function initCopyEmail() {
  const btns = $$('[data-copy]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        showToast('Copied: ' + value);
      } catch (err) {
        showToast('Could not copy — long-press to copy manually.');
      }
    });
  });
}

/* ---------- 11. Toast ---------- */
let toastTimer;
function showToast(msg) {
  let t = $('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2800);
}
window.showToast = showToast;

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initNav();
  markActiveNav();
  initScrollProgress();
  initBackToTop();
  initTheme();
  initReveal();
  initTyping();
  initCounters();
  initCopyEmail();
});
