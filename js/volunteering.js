/* ==========================================================================
   volunteering.js — Renders volunteering experiences.
   ========================================================================== */

(async function () {
  const host = document.querySelector('#volunteer-list');
  if (!host) return;
  const items = await PortfolioData.load('volunteering');
  if (!items.length) {
    host.innerHTML = `<div class="empty-state"><h4>No volunteering entries yet</h4><p>Add entries in <code>data/volunteering.json</code>.</p></div>`;
    return;
  }
  host.innerHTML = items.map(volCard).join('');
})();

function volCard(v) {
  const activities = (v.activities || [])
    .map(a => `<li>${PortfolioData.escapeHtml(a)}</li>`).join('');
  const link = v.link
    ? `<a href="${v.link}" class="arrow-link" target="_blank" rel="noopener">Learn more</a>`
    : '';
  return `
    <article class="volunteer-card reveal">
      <div class="volunteer-card__header">
        <div>
          <h3>${PortfolioData.escapeHtml(v.role)}</h3>
          <div class="org">${PortfolioData.escapeHtml(v.org)}${v.cause ? ' · ' + PortfolioData.escapeHtml(v.cause) : ''}</div>
        </div>
        <div class="volunteer-card__dates">${PortfolioData.escapeHtml(v.start)} — ${PortfolioData.escapeHtml(v.end)}</div>
      </div>
      <p>${PortfolioData.escapeHtml(v.summary || '')}</p>
      ${activities ? `<h4 style="margin-top:1rem; color:var(--accent-violet); font-size:0.85rem; letter-spacing:0.14em; text-transform:uppercase">What I did</h4><ul style="list-style:disc; padding-left:1.25rem; color:var(--text-secondary)">${activities}</ul>` : ''}
      ${link ? `<div style="margin-top:1rem">${link}</div>` : ''}
    </article>
  `;
}
