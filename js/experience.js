/* ==========================================================================
   experience.js — Renders the experience timeline on home and the full
   experience page.
   ========================================================================== */

(async function () {
  const data = await PortfolioData.load('experience');
  if (!data.length) return;

  // Home: compact timeline (top 3)
  const homeHost = document.querySelector('#experience-timeline');
  if (homeHost) {
    homeHost.innerHTML = data.slice(0, 3).map(timelineItem).join('');
  }

  // Full page: detailed blocks
  const pageHost = document.querySelector('#experience-full');
  if (pageHost) {
    pageHost.innerHTML = data.map(detailBlock).join('');
  }
})();

function timelineItem(e) {
  const defensiumLink = e.isDefensium
    ? `<a href="${e.sidePath}" class="arrow-link" style="font-size:0.85rem;margin-top:0.5rem;display:inline-flex">See videos & blogs</a>`
    : '';
  const bullets = (e.bullets || []).slice(0, 3)
    .map(b => `<li>${PortfolioData.escapeHtml(b)}</li>`).join('');
  return `
    <div class="timeline-item reveal">
      <div class="timeline-item__dates">${PortfolioData.escapeHtml(e.start)} — ${PortfolioData.escapeHtml(e.end)}</div>
      <h3>${PortfolioData.escapeHtml(e.role)}</h3>
      <div class="company">${PortfolioData.escapeHtml(e.company)} · ${PortfolioData.escapeHtml(e.location || '')}</div>
      <ul>${bullets}</ul>
      ${defensiumLink}
    </div>
  `;
}

function detailBlock(e) {
  const tech = (e.tech || []).map(t => PortfolioData.chip(t, 'chip-accent')).join('');
  const bullets = (e.bullets || []).map(b => `<li>${PortfolioData.escapeHtml(b)}</li>`).join('');
  const defensiumExtra = e.isDefensium ? `
    <h4>Content & Communication</h4>
    <p>During this internship I also created short-form social-media videos and wrote blog posts covering AI security and the overlap with cybersecurity. The videos and blogs live on their own page so they get the space they deserve.</p>
    <p><a class="btn btn-secondary" href="${e.sidePath}">↗ Videos &amp; Blogs from Defensium Labs</a></p>
  ` : '';
  return `
    <article class="experience-block reveal" id="${e.id}">
      <div class="experience-block__header">
        <div>
          <h3 class="experience-block__role">${PortfolioData.escapeHtml(e.role)}</h3>
          <div class="experience-block__company">${PortfolioData.escapeHtml(e.company)} · ${PortfolioData.escapeHtml(e.location || '')}</div>
        </div>
        <div class="experience-block__dates">${PortfolioData.escapeHtml(e.start)} — ${PortfolioData.escapeHtml(e.end)}</div>
      </div>
      <p>${PortfolioData.escapeHtml(e.summary || '')}</p>
      <h4>Highlights</h4>
      <ul>${bullets}</ul>
      ${defensiumExtra}
      <h4>Tech &amp; Tools</h4>
      <div class="experience-block__tech">${tech}</div>
    </article>
  `;
}
