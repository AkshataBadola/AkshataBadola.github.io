# Akshata Badola — Personal Portfolio

A multi-page, hand-built personal portfolio. **No frameworks, no npm, no build step.** Just HTML, CSS, and a small amount of vanilla JavaScript. Open any file in a browser and it works.

---

## What's inside

| Page | What it holds |
| --- | --- |
| `index.html` | Home — hero, intro, featured projects, featured research, "Beyond work" |
| `about.html` | Longer bio, education, interests, skills |
| `experience.html` | Full detail on each internship + Cursor Magazine role |
| `projects.html` | Filterable, searchable project gallery with click-to-open case studies |
| `research.html` | Research papers with honest publication status |
| `content.html` | Defensium Labs videos + blogs (tabbed) |
| `art.html` | Masonry art gallery with a keyboard-accessible lightbox |
| `books.html` | Reading journal — Currently reading / Favourites / Recommendations |
| `volunteering.html` | Volunteering timeline |
| `contact.html` | Contact form (mailto fallback) + direct links |
| `404.html` | Friendly not-found page |

All content for the dynamic sections lives in **`/data/*.json`** (and the mirrored `/data/data.js` for `file://` fallback). Add a new project, book, or painting by editing one JSON entry — no HTML changes.

---

## Folder structure

```
portfolio/
├── index.html, about.html, experience.html, projects.html,
├── research.html, content.html, art.html, books.html,
├── volunteering.html, contact.html, 404.html
│
├── css/
│   ├── base.css          ← reset, CSS variables, typography
│   ├── layout.css        ← nav, footer, container, scroll bar, back-to-top
│   ├── components.css    ← buttons, cards, chips, modal, lightbox, forms, toast
│   ├── pages.css         ← hero, about layout, 404, section-specific styling
│   ├── animations.css    ← keyframes + reveal-on-scroll utilities
│   └── responsive.css    ← media-query tweaks
│
├── js/
│   ├── main.js           ← nav, theme, scroll progress, back-to-top, reveal, toast
│   ├── data-loader.js    ← JSON loader with file:// fallback + render helpers
│   ├── experience.js     ← timeline + full experience page
│   ├── projects.js       ← grid, filter, search, detail modal
│   ├── research.js       ← paper cards with expandable abstract
│   ├── content.js        ← videos & blogs tabs
│   ├── gallery.js        ← art masonry + lightbox
│   ├── books.js          ← bookshelf grouped by status
│   ├── volunteering.js   ← volunteer cards
│   └── form.js           ← contact form validation + mailto
│
├── data/
│   ├── experience.json
│   ├── projects.json
│   ├── research.json
│   ├── blogs.json
│   ├── videos.json
│   ├── art.json
│   ├── books.json
│   ├── volunteering.json
│   └── data.js           ← mirror of all JSON, used as fallback when
│                           opened via file:// (fetch is blocked there)
│
├── assets/
│   ├── images/
│   │   ├── profile/      ← portrait.svg (replace with your photo)
│   │   ├── projects/     ← project thumbnails
│   │   ├── artwork/      ← art pieces
│   │   ├── books/        ← book covers
│   │   ├── blogs/        ← blog cover images
│   │   ├── videos/       ← video thumbnails
│   │   └── volunteering/ ← photos (empty by default)
│   ├── documents/        ← put your resume.pdf here
│   └── icons/            ← favicon.svg, og-image.svg
│
└── README.md             ← this file
```

---

## Running it locally

**Option 1 — Live Server (recommended).** This is the easiest route and avoids `file://` quirks.

1. Install [VS Code](https://code.visualstudio.com/) if you don't have it.
2. Install the "Live Server" extension by Ritwick Dey.
3. Open the `portfolio/` folder in VS Code.
4. Right-click `index.html` → **Open with Live Server**.

**Option 2 — Just open the file.** Double-click `index.html`. It will work because `data/data.js` acts as a fallback for the JSON loader. Some browsers may still complain in dev-tools about `fetch` of local files; that's harmless — the fallback kicks in silently.

**Option 3 — Python's built-in server.**

```bash
cd portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Publishing for free

### GitHub Pages (easiest)

1. Create a GitHub account and a new public repo called `akshata-portfolio` (or your preferred name).
2. In the `portfolio/` folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/akshata-portfolio.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**. Under *Source*, choose **Deploy from a branch** → `main` → `/ (root)`. Save.
4. Your site will be live at `https://<your-username>.github.io/akshata-portfolio/` within a minute.
5. (Optional) Point a custom domain under the same Pages settings.

### Netlify

1. Create a Netlify account.
2. Drag the whole `portfolio/` folder onto the Netlify dashboard. Done.
3. You can also connect your GitHub repo for auto-deploys on every push.

Both platforms serve the files as-is and support real `fetch()` of the JSON files.

---

## How to add new content

Every list on the site is powered by one of the JSON files in `/data/`. **Edit the JSON, add an image, done.**

> **Important — the `data.js` fallback.** Because the site also works via `file://` (no server), the loader falls back to `/data/data.js` when `fetch` is blocked. If you want BOTH `file://` and a hosted site to show your new entry, add the entry to the matching JSON file **and** to the matching array inside `data/data.js`. If you only publish via GitHub Pages / Netlify / Live Server, editing just the `.json` is enough.

### Add a new project

1. Open `data/projects.json`.
2. Copy an existing entry and change the fields:
   ```json
   {
     "id": "unique-slug",
     "title": "Project title",
     "summary": "One line description.",
     "category": "NLP",
     "status": "Jun 2026 – Present",
     "image": "assets/images/projects/my-project.svg",
     "tags": ["PyTorch", "HuggingFace"],
     "github": "https://github.com/.../my-project",
     "demo": "https://my-project.vercel.app",
     "featured": true,
     "details": {
       "problem": "What problem it solves.",
       "approach": "How you approached it.",
       "implementation": "Key implementation details.",
       "results": "What you measured.",
       "future": "What's next."
     }
   }
   ```
3. Save a thumbnail (any aspect ratio, roughly 1200×800 is ideal) into `assets/images/projects/` and reference it in `image`.
4. If you want it on the home page, keep `"featured": true` (max 3 shown).

**Category options** (filters auto-populate from your data, so you can invent new ones):
`AI`, `Machine Learning`, `Deep Learning`, `NLP`, `Computer Vision`, `Data Science`, `Web Development`, `Automation & Tools`, `Other`.

### Add a research paper

Edit `data/research.json`:
```json
{
  "id": "unique-slug",
  "title": "Paper title",
  "status": "Under Review",
  "statusClass": "status-under-review",
  "venue": "Journal or conference name",
  "year": "2026",
  "authors": ["Akshata Badola", "Co-author Name"],
  "area": "Research area",
  "abstract": "Full abstract text.",
  "pdf": "https://link-to-pdf",
  "doi": "https://doi.org/...",
  "code": "https://github.com/...",
  "notes": "Any extra notes."
}
```
Status options and their CSS classes:
`Under Review → status-under-review`, `Published → status-published`, `In Progress → status-in-progress`, `Preprint → status-preprint`.

### Add a blog post

Edit `data/blogs.json`:
```json
{
  "id": "unique-slug",
  "title": "Post title",
  "excerpt": "A one or two sentence excerpt.",
  "date": "15 Mar 2026",
  "readTime": "6 min read",
  "topic": "AI Security",
  "image": "assets/images/blogs/my-post.svg",
  "link": "https://link-to-the-article",
  "source": "Defensium Labs"
}
```

### Add a video

Edit `data/videos.json`:
```json
{
  "id": "unique-slug",
  "title": "Video title",
  "description": "What it's about.",
  "platform": "YouTube",
  "date": "Mar 2026",
  "thumb": "assets/images/videos/my-video.jpg",
  "link": "https://youtu.be/..."
}
```
Clicking the card opens the link in a new tab.

### Add artwork

Edit `data/art.json`:
```json
{
  "id": "unique-slug",
  "title": "Piece title",
  "description": "Optional story behind it.",
  "medium": "Watercolour",
  "year": "2026",
  "category": "Painting",
  "image": "assets/images/artwork/my-piece.jpg"
}
```
Categories: `Painting`, `Sketches`, `Digital`, `Illustration`, `Photography`, `Other` — or invent your own.

### Add a book

Edit `data/books.json`:
```json
{
  "id": "unique-slug",
  "title": "Book title",
  "author": "Author Name",
  "genre": "Fiction",
  "status": "Favourites",
  "rating": 5,
  "note": "Your personal note on why it mattered.",
  "cover": "assets/images/books/my-book.jpg"
}
```
`status` must be one of: `Currently reading`, `Favourites`, `Recommendations`.

### Add a volunteering experience

Edit `data/volunteering.json`:
```json
{
  "id": "unique-slug",
  "org": "Organisation name",
  "role": "Your role",
  "cause": "Cause / community",
  "start": "Jan 2025",
  "end": "Mar 2026",
  "summary": "What you did, in one line.",
  "activities": [
    "Specific responsibility",
    "Specific activity",
    "Lesson or skill gained"
  ],
  "link": "https://organisation.org"
}
```

---

## Where to replace the placeholders — checklist

Before you share the site, do these:

### Must-replace

- [ ] **Profile photo** — put your real photo at `assets/images/profile/portrait.jpg` and change `index.html` + `about.html` to point at it (`<img src="assets/images/profile/portrait.jpg" …>`).
- [ ] **Resume PDF** — save your resume as `assets/documents/resume.pdf` (filename matters; the download buttons link to it).
- [ ] **GitHub URL** — search the project for `[ADD-USERNAME]` and replace with your GitHub username. It appears in nav, footer, and contact page.
- [ ] **LinkedIn URL** — same search; replace with your LinkedIn URL slug.
- [ ] **Project GitHub links** — in `data/projects.json` and `data/research.json`, replace `"[ADD: GitHub link]"` with real URLs when you have them.

### Should-replace soon

- [ ] **Defensium Labs blogs** — add real links / dates / excerpts in `data/blogs.json`.
- [ ] **Defensium Labs videos** — add real links / thumbnails in `data/videos.json`.
- [ ] **Book covers** — replace `assets/images/books/placeholder.svg` with real cover images. (Tip: Open Library and Google Books have cover images you can use.)
- [ ] **Artwork images** — replace the SVG placeholders in `assets/images/artwork/` with your real pieces.
- [ ] **Volunteering entries** — fill in `data/volunteering.json` with your real experiences.
- [ ] **About page copy** — the voice is approximate; make it yours in `about.html`.

### Nice-to-have

- [ ] **Project thumbnails** — the generated SVG placeholders look fine, but a screenshot of each project is better.
- [ ] **Open Graph image** — the current `assets/icons/og-image.svg` is generic; you can swap it for a nicer PNG.

---

## Replace your resume

1. Save your resume as **PDF**, filename `resume.pdf`.
2. Drop it in `assets/documents/resume.pdf`.
3. Every "Download résumé" button is already wired to that path.

If you prefer a different filename, update it in these places: `index.html`, `about.html`, `experience.html` (search for `resume.pdf`).

---

## Updating contact / social links

Everything is in plain HTML, so just search-and-replace:

| Thing | Where it lives | Current value |
| --- | --- | --- |
| GitHub URL | all `*.html` + `data/*.json` | `https://github.com/[ADD-USERNAME]` |
| LinkedIn URL | all `*.html` | `https://www.linkedin.com/in/[ADD-USERNAME]` |
| Email | `index.html`, `contact.html`, `js/form.js` | `akshatabadola@gmail.com` |
| Phone | `contact.html` only | `+91 87670 23837` |

In VS Code: `Edit → Replace in Files` (Shift+Cmd+H / Shift+Ctrl+H), make the edit, done.

---

## Design tokens (re-themeing in one place)

All colours, fonts, spacing, and shadows are CSS custom properties in `css/base.css`. Change the hex values there and the whole site shifts palette. Try:

```css
--accent-violet: #ff6a9b;   /* pink primary */
--accent-coral:  #ffd166;   /* yellow secondary */
```

A pre-built light theme is included and toggled via `[data-theme="light"]` on `<html>`. The toggle button in the nav remembers the choice in `localStorage`.

---

## Testing checklist

Before you call it done:

- [ ] All nav links go to the right page
- [ ] Hamburger menu works on mobile (resize to <900px)
- [ ] Project filters + search both work
- [ ] A project card opens the detail modal, closes on `Esc` / backdrop click
- [ ] Art lightbox opens, arrow keys navigate, `Esc` closes
- [ ] Contact form shows validation errors on submit with empty fields
- [ ] Contact form opens your email app on valid submit
- [ ] Copy-email button triggers a toast
- [ ] Back-to-top appears after scrolling, scrolls smoothly
- [ ] Theme toggle swaps between dark and light, remembers across reloads
- [ ] Resume download button points to a real PDF
- [ ] Scroll progress bar fills as you scroll
- [ ] Reveal animations trigger as sections enter the viewport
- [ ] Looks good at 480px, 768px, 1024px, 1440px
- [ ] All social links open in a new tab
- [ ] No console errors in dev tools

---

## Browser support

Tested on evergreen browsers (Chrome, Edge, Firefox, Safari — recent 2 versions each). The site uses modern CSS (`backdrop-filter`, grid, `clamp()`, custom properties) and modern JS (`async/await`, `IntersectionObserver`). It will degrade gracefully on older browsers but won't be pretty.

---

## Credits

- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts.
- SVG placeholder art: generated for this project.
- Everything else: written from scratch.

Have fun with it. — AB
