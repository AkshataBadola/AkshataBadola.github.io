/* ==========================================================================
   projects.js — Renders the project gallery (projects.html) + home featured.
   Features: filter by category, keyword search, click to open detail modal.
   ========================================================================== */

(async function () {
  const projects = await PortfolioData.load('projects');
  if (!projects.length) return;

  // --- Home: featured only -----------------------------------------------
  const featuredHost = document.querySelector('#featured-projects');
  if (featuredHost) {
    const items = projects.filter(p => p.featured).slice(0, 3);
    featuredHost.innerHTML = items.map(cardHTML).join('');
    wireCards(featuredHost, projects);
  }

  // --- Projects page: full grid + filters + search ------------------------
  const gridHost  = document.querySelector('#projects-grid');
  const emptyEl   = document.querySelector('#projects-empty');
  const filterBar = document.querySelector('#projects-filters');
  const searchEl  = document.querySelector('#projects-search');

  if (!gridHost) return;

  // Collect categories from data (preserve order)
  const cats = ['All'];
  projects.forEach(p => { if (p.category && !cats.includes(p.category)) cats.push(p.category); });
  if (filterBar) {
    filterBar.innerHTML = cats.map((c, i) =>
      `<button class="filter-btn ${i === 0 ? 'is-active' : ''}" data-cat="${c}">${c}</button>`
    ).join('');
  }

  let activeCat = 'All';
  let query = '';

  function render() {
    const q = query.trim().toLowerCase();
    const filtered = projects.filter(p => {
      const inCat = activeCat === 'All' || p.category === activeCat;
      const inQ   = !q || (p.title + p.summary + (p.tags || []).join(' ')).toLowerCase().includes(q);
      return inCat && inQ;
    });
    gridHost.innerHTML = filtered.map(cardHTML).join('');
    if (emptyEl) emptyEl.style.display = filtered.length ? 'none' : 'block';
    wireCards(gridHost, projects);
  }

  if (filterBar) {
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCat = btn.dataset.cat;
      render();
    });
  }
  if (searchEl) {
    searchEl.addEventListener('input', e => {
      query = e.target.value;
      render();
    });
  }
  render();
})();

/* ---------- helpers ---------- */
function cardHTML(p) {
  const tags = (p.tags || []).slice(0, 4).map(t => PortfolioData.chip(t)).join('');
  return `
    <article class="card project-card reveal" data-id="${p.id}" tabindex="0" role="button" aria-label="${PortfolioData.escapeHtml(p.title)} — open details">
      <div class="project-card__media">
        ${PortfolioData.img(p.image, p.title + ' preview')}
        <span class="project-card__category">${PortfolioData.escapeHtml(p.category || '')}</span>
      </div>
      <h3 class="project-card__title">${PortfolioData.escapeHtml(p.title)}</h3>
      <p class="project-card__desc">${PortfolioData.escapeHtml(p.summary || '')}</p>
      <div class="project-card__tags">${tags}</div>
      <div class="project-card__actions">
        ${p.github && !p.github.startsWith('[ADD') ? `<a href="${p.github}" target="_blank" rel="noopener">↗ Code</a>` : ''}
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">↗ Live</a>` : ''}
        <span class="arrow-link" style="margin-left:auto">Details</span>
      </div>
    </article>
  `;
}

function wireCards(host, allProjects) {
  host.querySelectorAll('.project-card').forEach(card => {
    const open = () => openModal(allProjects.find(p => p.id === card.dataset.id));
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

/* ---------- Project modal ---------- */
function openModal(p) {
  if (!p) return;
  const d = p.details || {};
  const tags = (p.tags || []).map(t => PortfolioData.chip(t, 'chip-accent')).join('');
  const linksRow = [
    p.github && !p.github.startsWith('[ADD') ? `<a class="btn btn-secondary" href="${p.github}" target="_blank" rel="noopener">↗ GitHub</a>` : '',
    p.demo ? `<a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener">↗ Live Demo</a>` : ''
  ].filter(Boolean).join('');

  const html = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal__backdrop" data-close></div>
      <div class="modal__panel">
        <button class="modal__close" data-close aria-label="Close">✕</button>
        <div class="modal__meta">
          <span class="chip chip-accent">${PortfolioData.escapeHtml(p.category || '')}</span>
          <span class="chip">${PortfolioData.escapeHtml(p.status || '')}</span>
        </div>
        <div class="modal__content">
          <h2 id="modal-title">${PortfolioData.escapeHtml(p.title)}</h2>
          <p>${PortfolioData.escapeHtml(p.summary || '')}</p>
          ${d.problem ? `<h4>Problem</h4><p>${PortfolioData.escapeHtml(d.problem)}</p>` : ''}
          ${d.approach ? `<h4>Approach</h4><p>${PortfolioData.escapeHtml(d.approach)}</p>` : ''}
          ${d.implementation ? `<h4>Implementation</h4><p>${PortfolioData.escapeHtml(d.implementation)}</p>` : ''}
          ${d.results ? `<h4>Results</h4><p>${PortfolioData.escapeHtml(d.results)}</p>` : ''}
          ${d.future ? `<h4>Future improvements</h4><p>${PortfolioData.escapeHtml(d.future)}</p>` : ''}
          <h4>Tech stack</h4>
          <div class="project-card__tags">${tags}</div>
          ${linksRow ? `<div class="hero__ctas" style="margin-top:1.5rem">${linksRow}</div>` : ''}
        </div>
      </div>
    </div>`;
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const modal = tmp.firstElementChild;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modal.classList.add('is-open'));

  const close = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 240);
    document.removeEventListener('keydown', onKey);
  };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', close));
  // Focus trap starts on close button
  modal.querySelector('.modal__close').focus();
}
