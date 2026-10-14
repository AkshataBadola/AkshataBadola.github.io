/* ==========================================================================
   content.js — Defensium Labs "Content" page: Videos + Blogs tabs.
   ========================================================================== */

(async function () {
  const videosHost = document.querySelector('#videos-grid');
  const blogsHost  = document.querySelector('#blogs-list');
  if (!videosHost && !blogsHost) return;

  const [videos, blogs] = await Promise.all([
    PortfolioData.load('videos'),
    PortfolioData.load('blogs')
  ]);

  if (videosHost) {
    videosHost.innerHTML = videos.map(videoCard).join('');
    wireVideos(videosHost, videos);
  }
  if (blogsHost) {
    blogsHost.innerHTML = blogs.map(blogCard).join('');
  }

  // --- Tabs ---
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      document.querySelector('#' + tab.dataset.panel)?.classList.add('is-active');
    });
  });
})();

function videoCard(v) {
  const linkOk = v.link && !v.link.startsWith('[ADD');
  return `
    <article class="video-card reveal" data-id="${v.id}" ${linkOk ? `data-link="${v.link}"` : ''} tabindex="0" role="button" aria-label="Open ${PortfolioData.escapeHtml(v.title)}">
      <div class="video-card__thumb">
        ${PortfolioData.img(v.thumb, v.title + ' thumbnail')}
        <div class="video-card__play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
      </div>
      <div class="video-card__body">
        <h4>${PortfolioData.escapeHtml(v.title)}</h4>
        <p>${PortfolioData.escapeHtml(v.description || '')}</p>
        <span class="video-card__platform">${PortfolioData.escapeHtml(v.platform || '')} · ${PortfolioData.escapeHtml(v.date || '')}</span>
      </div>
    </article>
  `;
}

function wireVideos(host, videos) {
  host.querySelectorAll('.video-card').forEach(card => {
    const open = () => {
      const link = card.dataset.link;
      if (link) window.open(link, '_blank', 'noopener');
      else showToast('Video link is a placeholder — update data/videos.json');
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });
}

function blogCard(b) {
  const linkOk = b.link && !b.link.startsWith('[ADD');
  const href = linkOk ? b.link : '#';
  return `
    <a class="blog-card reveal" href="${href}" ${linkOk ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}>
      <div class="blog-card__thumb">${PortfolioData.img(b.image, b.title + ' cover')}</div>
      <div class="blog-card__content">
        <div class="blog-card__meta">
          <span>${PortfolioData.escapeHtml(b.date || '[ADD]')}</span>
          <span>·</span>
          <span>${PortfolioData.escapeHtml(b.readTime || '')}</span>
          <span>·</span>
          <span>${PortfolioData.escapeHtml(b.topic || '')}</span>
        </div>
        <h3>${PortfolioData.escapeHtml(b.title)}</h3>
        <p class="blog-card__excerpt">${PortfolioData.escapeHtml(b.excerpt || '')}</p>
        <span class="arrow-link">Read on ${PortfolioData.escapeHtml(b.source || 'external')}</span>
      </div>
    </a>
  `;
}
