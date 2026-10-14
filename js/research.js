/* ==========================================================================
   research.js — Renders research papers on home (featured) and research.html.
   ========================================================================== */

(async function () {
  const papers = await PortfolioData.load('research');
  if (!papers.length) return;

  // Home featured (first 2)
  const home = document.querySelector('#featured-research');
  if (home) {
    const items = papers.filter(p => !p.id.startsWith('placeholder')).slice(0, 2);
    home.innerHTML = (items.length ? items : papers.slice(0, 2)).map(paperCard).join('');
    wireExpand(home);
  }

  // Full research page
  const page = document.querySelector('#research-list');
  if (page) {
    page.innerHTML = papers.map(paperCard).join('');
    wireExpand(page);
  }
})();

function paperCard(p) {
  const authors = (p.authors || []).map(a => PortfolioData.escapeHtml(a)).join(', ');
  const links = [
    p.pdf  ? `<a class="btn btn-secondary" href="${p.pdf}"  target="_blank" rel="noopener">↗ PDF</a>`  : '',
    p.doi  ? `<a class="btn btn-secondary" href="${p.doi}"  target="_blank" rel="noopener">↗ DOI</a>`  : '',
    p.code && !p.code.startsWith('[ADD') ? `<a class="btn btn-secondary" href="${p.code}" target="_blank" rel="noopener">↗ Code</a>` : ''
  ].filter(Boolean).join('');
  return `
    <article class="paper-card reveal">
      <span class="paper-card__status ${p.statusClass || ''}">${PortfolioData.escapeHtml(p.status || '')}</span>
      <h3>${PortfolioData.escapeHtml(p.title)}</h3>
      <div class="paper-card__meta">
        <span>${PortfolioData.escapeHtml(p.venue || '')}</span>
        <span>·</span>
        <span>${PortfolioData.escapeHtml(p.year || '')}</span>
        ${p.area ? `<span>·</span><span>${PortfolioData.escapeHtml(p.area)}</span>` : ''}
      </div>
      <p style="color:var(--text-tertiary); font-size:0.9rem; margin-bottom:0.75rem"><em>${authors}</em></p>
      <div class="paper-card__abstract">${PortfolioData.escapeHtml(p.abstract || '')}</div>
      <button class="paper-card__expand" aria-expanded="false">Read more ↓</button>
      ${links ? `<div class="paper-card__links">${links}</div>` : ''}
      ${p.notes ? `<p style="margin-top:1rem; color:var(--text-tertiary); font-size:0.85rem">${PortfolioData.escapeHtml(p.notes)}</p>` : ''}
    </article>
  `;
}

function wireExpand(root) {
  root.querySelectorAll('.paper-card__expand').forEach(btn => {
    const abs = btn.previousElementSibling;
    btn.addEventListener('click', () => {
      const open = abs.classList.toggle('is-expanded');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Show less ↑' : 'Read more ↓';
    });
  });
}
