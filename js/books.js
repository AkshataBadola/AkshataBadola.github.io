/* ==========================================================================
   books.js — Bookshelf grouped by status (Currently reading, Favourites,
   Recommendations), with genre filter chips.
   ========================================================================== */

(async function () {
  const host = document.querySelector('#bookshelf');
  if (!host) return;
  const books = await PortfolioData.load('books');
  if (!books.length) return;

  // Genre filter
  const filterBar = document.querySelector('#book-filters');
  const genres = ['All'];
  books.forEach(b => { if (b.genre && !genres.includes(b.genre)) genres.push(b.genre); });
  if (filterBar) {
    filterBar.innerHTML = genres.map((g, i) =>
      `<button class="filter-btn ${i === 0 ? 'is-active' : ''}" data-genre="${g}">${g}</button>`
    ).join('');
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeGenre = btn.dataset.genre;
      render();
    });
  }
  let activeGenre = 'All';

  function render() {
    const list = books.filter(b => activeGenre === 'All' || b.genre === activeGenre);
    const groups = ['Currently reading', 'Favourites', 'Recommendations'];
    host.innerHTML = groups.map(g => sectionHTML(g, list.filter(b => b.status === g))).join('');
  }
  render();
})();

function sectionHTML(title, items) {
  if (!items.length) return '';
  return `
    <section class="books-section reveal">
      <h2>${title} <span class="count">${items.length}</span></h2>
      <div class="books-grid">
        ${items.map(bookCard).join('')}
      </div>
    </section>
  `;
}

function bookCard(b) {
  return `
    <article class="book-card">
      <div class="book-card__cover">${PortfolioData.img(b.cover, b.title + ' cover')}</div>
      <div class="book-card__body">
        <h4>${PortfolioData.escapeHtml(b.title)}</h4>
        <div class="author">by ${PortfolioData.escapeHtml(b.author || '')}</div>
        ${b.rating ? `<div class="rating" aria-label="${b.rating} out of 5">${PortfolioData.starRating(b.rating)}</div>` : ''}
        <p class="note">${PortfolioData.escapeHtml(b.note || '')}</p>
        <span class="chip chip-accent genre">${PortfolioData.escapeHtml(b.genre || '')}</span>
      </div>
    </article>
  `;
}
