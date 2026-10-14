/* ==========================================================================
   gallery.js — Art gallery with category filters + keyboard-accessible
   lightbox (prev / next / Esc / arrow keys).
   ========================================================================== */

(async function () {
  const host = document.querySelector('#art-masonry');
  if (!host) return;
  const items = await PortfolioData.load('art');
  if (!items.length) return;

  // Filter chips
  const filterBar = document.querySelector('#art-filters');
  const cats = ['All'];
  items.forEach(i => { if (i.category && !cats.includes(i.category)) cats.push(i.category); });
  if (filterBar) {
    filterBar.innerHTML = cats.map((c, i) =>
      `<button class="filter-btn ${i === 0 ? 'is-active' : ''}" data-cat="${c}">${c}</button>`
    ).join('');
  }

  let active = 'All';
  function render() {
    const list = items.filter(i => active === 'All' || i.category === active);
    host.innerHTML = list.map((item, idx) => tile(item, idx)).join('');
    wireTiles(list);
  }
  render();

  if (filterBar) {
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      active = btn.dataset.cat;
      render();
    });
  }

  function tile(a, i) {
    return `
      <figure class="art-tile reveal" data-index="${i}" tabindex="0" role="button" aria-label="View ${PortfolioData.escapeHtml(a.title)}">
        ${PortfolioData.img(a.image, a.title)}
        <figcaption class="art-tile__caption">
          <strong>${PortfolioData.escapeHtml(a.title)}</strong>
          <span>${PortfolioData.escapeHtml(a.medium || '')}${a.year ? ' · ' + PortfolioData.escapeHtml(a.year) : ''}</span>
        </figcaption>
      </figure>
    `;
  }

  function wireTiles(list) {
    host.querySelectorAll('.art-tile').forEach(tileEl => {
      const open = () => openLightbox(list, parseInt(tileEl.dataset.index, 10));
      tileEl.addEventListener('click', open);
      tileEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
  }
})();

/* ---------- Lightbox ---------- */
let lightboxRoot;
let currentList = [];
let currentIdx = 0;
let onLightboxKey;

function openLightbox(list, index) {
  currentList = list;
  currentIdx = index;
  if (!lightboxRoot) {
    lightboxRoot = document.createElement('div');
    lightboxRoot.className = 'lightbox';
    lightboxRoot.setAttribute('role', 'dialog');
    lightboxRoot.setAttribute('aria-modal', 'true');
    lightboxRoot.innerHTML = `
      <button class="lightbox__close" aria-label="Close">✕</button>
      <button class="lightbox__prev" aria-label="Previous">‹</button>
      <button class="lightbox__next" aria-label="Next">›</button>
      <div class="lightbox__content">
        <img class="lightbox__image" alt="" />
        <div class="lightbox__caption"></div>
      </div>`;
    document.body.appendChild(lightboxRoot);
    lightboxRoot.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lightboxRoot.querySelector('.lightbox__prev').addEventListener('click', () => step(-1));
    lightboxRoot.querySelector('.lightbox__next').addEventListener('click', () => step(1));
    lightboxRoot.addEventListener('click', e => {
      if (e.target === lightboxRoot) closeLightbox();
    });
  }
  updateLightbox();
  lightboxRoot.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  onLightboxKey = e => {
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   step(-1);
    if (e.key === 'ArrowRight')  step(1);
  };
  document.addEventListener('keydown', onLightboxKey);
  lightboxRoot.querySelector('.lightbox__close').focus();
}

function step(delta) {
  currentIdx = (currentIdx + delta + currentList.length) % currentList.length;
  updateLightbox();
}

function updateLightbox() {
  const a = currentList[currentIdx];
  if (!a) return;
  const img = lightboxRoot.querySelector('.lightbox__image');
  const cap = lightboxRoot.querySelector('.lightbox__caption');
  img.src = a.image; img.alt = a.title;
  img.onerror = () => {
    img.replaceWith(Object.assign(document.createElement('div'), {
      innerHTML: PortfolioData.fallbackSvg(a.title),
      style: 'max-width:60vw;max-height:70vh;'
    }));
  };
  cap.innerHTML = `
    <h4>${PortfolioData.escapeHtml(a.title)}</h4>
    <p>${PortfolioData.escapeHtml([a.medium, a.year].filter(Boolean).join(' · '))}</p>
    ${a.description ? `<p style="margin-top:0.5rem">${PortfolioData.escapeHtml(a.description)}</p>` : ''}
  `;
}

function closeLightbox() {
  lightboxRoot.classList.remove('is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onLightboxKey);
}
