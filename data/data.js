/* ==========================================================================
   data.js — Fallback copy of every JSON file as plain JavaScript.
   This exists so the site works when opened directly from the file system
   (double-click index.html), where fetch() of local JSON is blocked.
   The main loader (js/data-loader.js) tries fetch() first and falls back
   to window.__DATA__ on failure.

   When adding content, prefer editing the matching /data/*.json file —
   the loader will still work. If you want BOTH file:// and server to work,
   duplicate the entry here too (or re-run the included tools/sync-data.sh
   script if provided in the future).
   ========================================================================== */

window.__DATA__ = window.__DATA__ || {};

/* ----------------- experience.json ----------------- */
window.__DATA__.experience = [
  {
    "id": "dravita",
    "role": "Backend + Research Intern",
    "company": "Dravita.ai",
    "location": "Pune (Remote)",
    "start": "Jan 2025", "end": "Aug 2025",
    "summary": "Built scalable data pipelines and PostgreSQL architecture for an AI-driven nutritional analysis platform.",
    "bullets": [
      "Built scalable Python data pipelines for processing large structured datasets used in AI-driven nutritional analysis.",
      "Designed and optimized a PostgreSQL data architecture supporting large-scale dataset management.",
      "Conducted data analysis and preprocessing for ML-ready datasets, improving data quality and consistency.",
      "Implemented automated workflows using pandas and Python scripting to streamline dataset generation.",
      "Created system architecture diagrams and documentation to support future AI model integration and research workflows."
    ],
    "tech": ["Python","PostgreSQL","pandas","ETL","Data Architecture"],
    "links": []
  },
  {
    "id": "detoxio",
    "role": "LLM Security Intern",
    "company": "Detoxio.ai",
    "location": "Bangalore (Remote)",
    "start": "Oct 2024", "end": "Dec 2024",
    "summary": "Systematic security evaluation of Large Language Models — adversarial testing, benchmarking, and automation.",
    "bullets": [
      "Conducted systematic security evaluation of Large Language Models, analyzing failure modes and response vulnerabilities.",
      "Designed and implemented automated testing frameworks in Python to benchmark LLM behavior across adversarial prompts.",
      "Built tools to generate and evaluate 1000+ prompt-based test scenarios for large language model robustness analysis.",
      "Performed experimental analysis of model outputs, identifying patterns in hallucinations, safety bypass, and adversarial prompts.",
      "Developed wrappers and automation scripts to streamline LLM testing pipelines, reducing evaluation time by 60%."
    ],
    "tech": ["Python","LLMs","Adversarial Testing","Automation","Benchmarking"],
    "links": []
  },
  {
    "id": "defensium",
    "role": "AI Security and Research Intern",
    "company": "Defensium Labs",
    "location": "Jaipur (Remote)",
    "start": "Jun 2024", "end": "Oct 2024",
    "summary": "Researched AI vulnerabilities, built a deliberately-vulnerable generative model for education, and authored technical content.",
    "bullets": [
      "Conducted in-depth research on AI vulnerabilities to identify and analyze potential threats.",
      "Developed a generative AI model with built-in vulnerabilities for testing and educational purposes.",
      "Implemented AI vulnerabilities within the generative model to enhance understanding of security risks.",
      "Authored comprehensive blogs and technical content focused on AI security and the intersection of AI and cybersecurity."
    ],
    "tech": ["Generative AI","AI Security","Technical Writing","Research"],
    "links": [],
    "isDefensium": true,
    "sidePath": "content.html"
  },
  {
    "id": "cursor-sicsr",
    "role": "Web Development Team Member",
    "company": "Cursor Magazine, SICSR",
    "location": "Pune, Maharashtra",
    "start": "Jan 2024", "end": "Sep 2024",
    "summary": "Collaborated on the magazine's digital platform — layout, CMS workflow, and student engagement features.",
    "bullets": [
      "Collaborated with the graphic design team to create a visually appealing website layout, contributing to a 15% increase in student engagement.",
      "Implemented a new content management system to streamline article publication, leading to a 30% increase in available resources for students.",
      "Technology used: Drupal."
    ],
    "tech": ["Drupal","HTML/CSS","CMS"],
    "links": []
  }
];

/* ----------------- projects.json ----------------- */
window.__DATA__.projects = [
  {
    "id": "mbart-translation",
    "title": "Multilingual Transformer Fine-Tuning for Low-Resource Translation",
    "summary": "Fine-tuning Facebook AI's mBART on low-resource language pairs with efficient training tricks.",
    "category": "NLP",
    "status": "Ongoing",
    "image": "assets/images/projects/mbart.svg",
    "tags": ["PyTorch","mBART","HuggingFace","NLP","Transformers"],
    "github": "[ADD: GitHub link]",
    "demo": "",
    "featured": true,
    "details": {
      "problem": "Low-resource languages suffer from poor machine-translation quality because large pretrained models are optimised for high-resource pairs.",
      "approach": "Fine-tuned Facebook AI's mBART multilingual encoder-decoder model on low-resource datasets. Built a full training pipeline: preprocessing, tokenisation, batching, GPU training.",
      "implementation": "Used gradient accumulation and optimised batching to reduce memory usage. Experimented with beam search and top-k sampling decoding to study quality vs. speed trade-offs.",
      "results": "Running controlled experiments comparing baseline vs. fine-tuned performance across multiple language pairs. [ADD metrics when available.]",
      "future": "Add LoRA adapters and expand to additional language pairs."
    }
  },
  {
    "id": "mental-health-nlp",
    "title": "NLP for Mental Health Diagnosis",
    "summary": "Classification system to detect mental-health conditions from textual data using classical ML + NLP preprocessing.",
    "category": "NLP",
    "status": "Dec 2024 – Feb 2025",
    "image": "assets/images/projects/mental-health.svg",
    "tags": ["Python","NLTK","spaCy","scikit-learn","NLP"],
    "github": "[ADD: GitHub link]",
    "demo": "",
    "featured": true,
    "details": {
      "problem": "Early signals of mental-health difficulties often appear in written language. Automated screening could support — not replace — human care.",
      "approach": "Built preprocessing pipelines with NLTK and spaCy; trained and evaluated Naive Bayes, Random Forest and Logistic Regression classifiers.",
      "implementation": "Compared models with ROC curves, learning curves, and precision-recall metrics to understand model behaviour.",
      "results": "Comparative evaluation across models complete; findings documented in repo README.",
      "future": "Explore transformer baselines (DistilBERT) and multi-label formulations."
    }
  },
  {
    "id": "chronicler-sicsr",
    "title": "Chronicler — Timetable & Schedule System for SICSR",
    "summary": "Modern timetable experience for SICSR students built on MRBS, with a cleaner UI and faster filtering.",
    "category": "Web Development",
    "status": "Jun 2024 – Aug 2024",
    "image": "assets/images/projects/chronicler.svg",
    "tags": ["Python","Django","Poetry","JavaScript","MRBS"],
    "github": "[ADD: GitHub link]",
    "demo": "",
    "featured": true,
    "details": {
      "problem": "The existing SICSR timetable interface was clunky; filtering was slow and the experience discouraged use.",
      "approach": "Rebuilt the student-facing timetable using MRBS as the backing engine, with a thin modern layer on top.",
      "implementation": "Web scraper, data caching + validation, web and textual UIs, CI/CD, and test coverage. Minimalistic, responsive, performant components.",
      "results": "Students can now access, filter and read timetables in a far more intuitive flow.",
      "future": "Push notifications for schedule changes and calendar sync."
    }
  },
  {
    "id": "intrusion-detection",
    "title": "Network Intrusion Detection on UNSW-NB15",
    "summary": "ML + ANN pipeline detecting and classifying multiple network intrusions, with full comparative evaluation.",
    "category": "Machine Learning",
    "status": "Research project",
    "image": "assets/images/projects/intrusion.svg",
    "tags": ["Python","scikit-learn","ANN","Random Forest","UNSW-NB15"],
    "github": "[ADD: GitHub link]",
    "demo": "",
    "featured": false,
    "details": {
      "problem": "Detect and classify multiple network intrusions using a real-time dataset.",
      "approach": "Preprocessed and balanced the UNSW-NB15 dataset; implemented ANN and Random Forest classifiers.",
      "implementation": "Evaluated with accuracy, precision, recall, and ROC analysis. Co-authored a manuscript now under peer review.",
      "results": "Manuscript submitted to a Scopus-indexed Q2 journal; under review.",
      "future": "Extend to ensemble models and streaming / online classification."
    }
  },
  {
    "id": "placeholder-cv",
    "title": "[PLACEHOLDER] Computer Vision Side-Project",
    "summary": "Replace this placeholder with a real entry when ready.",
    "category": "Computer Vision",
    "status": "Placeholder",
    "image": "assets/images/projects/placeholder.svg",
    "tags": ["PyTorch","OpenCV","CNN"],
    "github": "[ADD: GitHub link]", "demo": "", "featured": false,
    "details": { "problem": "[ADD]", "approach": "[ADD]", "implementation": "[ADD]", "results": "[ADD]", "future": "[ADD]" }
  },
  {
    "id": "placeholder-automation",
    "title": "[PLACEHOLDER] Automation Tool",
    "summary": "An automation / developer-tool project — swap for one of your own.",
    "category": "Automation & Tools",
    "status": "Placeholder",
    "image": "assets/images/projects/placeholder.svg",
    "tags": ["Python","Bash","CLI"],
    "github": "[ADD: GitHub link]", "demo": "", "featured": false,
    "details": { "problem": "[ADD]", "approach": "[ADD]", "implementation": "[ADD]", "results": "[ADD]", "future": "[ADD]" }
  }
];

/* ----------------- research.json ----------------- */
window.__DATA__.research = [
  {
    "id": "network-intrusion-unsw",
    "title": "Detecting and Classifying Multiple Network Intrusions Using the Real-Time Dataset",
    "status": "Under Review", "statusClass": "status-under-review",
    "venue": "Scopus-Indexed Q2 Journal", "year": "2025",
    "authors": ["Akshata Badola","Dr. Amol Vibhute (Supervisor)"],
    "area": "ML Security · Network Security",
    "abstract": "Research on machine-learning approaches for network intrusion detection using the UNSW-NB15 dataset. Covers data preprocessing, feature engineering, and dataset balancing, followed by the implementation and evaluation of Artificial Neural Networks and Random Forest models. Controlled experiments compare model performance using accuracy, precision, recall, and ROC analysis. The resulting manuscript is co-authored and currently under peer review for international publication.",
    "pdf": "", "doi": "", "code": "[ADD: GitHub link]",
    "notes": "Co-authored with Dr. Amol Vibhute, Assistant Professor, Symbiosis Institute of Computer Studies and Research."
  },
  {
    "id": "placeholder-paper-1",
    "title": "[PLACEHOLDER] Working Title of Second Paper",
    "status": "In Progress", "statusClass": "status-in-progress",
    "venue": "[ADD: target venue]", "year": "2026",
    "authors": ["Akshata Badola"], "area": "[ADD: research area]",
    "abstract": "[ADD: short abstract. Keep private manuscripts out of this file.]",
    "pdf": "", "doi": "", "code": "", "notes": "Placeholder — remove or replace."
  },
  {
    "id": "placeholder-paper-2",
    "title": "[PLACEHOLDER] Preprint Title",
    "status": "Preprint", "statusClass": "status-preprint",
    "venue": "arXiv", "year": "2026",
    "authors": ["Akshata Badola","[ADD: co-authors]"], "area": "[ADD: research area]",
    "abstract": "[ADD: abstract].", "pdf": "", "doi": "", "code": "",
    "notes": "Placeholder — remove or replace."
  }
];

/* ----------------- blogs.json ----------------- */
window.__DATA__.blogs = [
  { "id":"defensium-blog-1","title":"[PLACEHOLDER] AI Vulnerabilities in Generative Models — A Primer","excerpt":"A ground-level introduction to the kinds of security holes that appear when generative AI meets production — written during my time at Defensium Labs.","date":"[ADD]","readTime":"[ADD]","topic":"AI Security","image":"assets/images/blogs/placeholder.svg","link":"[ADD: article URL]","source":"Defensium Labs" },
  { "id":"defensium-blog-2","title":"[PLACEHOLDER] Where AI Meets Cybersecurity","excerpt":"On the overlap between AI research and traditional cybersecurity — threat models, assumptions, and what practitioners get wrong.","date":"[ADD]","readTime":"[ADD]","topic":"AI Security","image":"assets/images/blogs/placeholder.svg","link":"[ADD: article URL]","source":"Defensium Labs" },
  { "id":"defensium-blog-3","title":"[PLACEHOLDER] Teaching a Model to Be Vulnerable","excerpt":"Notes from building a deliberately-vulnerable generative model used as a teaching aid for AI security research.","date":"[ADD]","readTime":"[ADD]","topic":"Generative AI","image":"assets/images/blogs/placeholder.svg","link":"[ADD: article URL]","source":"Defensium Labs" }
];

/* ----------------- videos.json ----------------- */
window.__DATA__.videos = [
  { "id":"defensium-vid-1","title":"[PLACEHOLDER] AI Security Explainer","description":"Short-form social explainer created for Defensium Labs.","platform":"LinkedIn","date":"[ADD]","thumb":"assets/images/videos/placeholder.svg","link":"[ADD: video URL]" },
  { "id":"defensium-vid-2","title":"[PLACEHOLDER] Generative Model Demo","description":"Walkthrough of the deliberately-vulnerable generative model.","platform":"YouTube","date":"[ADD]","thumb":"assets/images/videos/placeholder.svg","link":"[ADD: video URL]" },
  { "id":"defensium-vid-3","title":"[PLACEHOLDER] Prompt-Injection, Illustrated","description":"A quick visual breakdown of how prompt-injection attacks on LLMs work.","platform":"Instagram","date":"[ADD]","thumb":"assets/images/videos/placeholder.svg","link":"[ADD: video URL]" }
];

/* ----------------- art.json ----------------- */
window.__DATA__.art = [
  { "id":"art-1","title":"[PLACEHOLDER] Study in Indigo","description":"Short note about the piece.","medium":"Watercolour","year":"[ADD]","category":"Painting","image":"assets/images/artwork/placeholder-1.svg" },
  { "id":"art-2","title":"[PLACEHOLDER] Sketch Series — I","description":"Replace with a real line about this piece.","medium":"Graphite on paper","year":"[ADD]","category":"Sketches","image":"assets/images/artwork/placeholder-2.svg" },
  { "id":"art-3","title":"[PLACEHOLDER] Digital Composition","description":"Replace with a real line about this piece.","medium":"Procreate","year":"[ADD]","category":"Digital","image":"assets/images/artwork/placeholder-3.svg" },
  { "id":"art-4","title":"[PLACEHOLDER] Mixed-Media Study","description":"Replace with a real line.","medium":"Acrylic + ink","year":"[ADD]","category":"Painting","image":"assets/images/artwork/placeholder-4.svg" },
  { "id":"art-5","title":"[PLACEHOLDER] Sketch Series — II","description":"Replace with a real line.","medium":"Ink","year":"[ADD]","category":"Sketches","image":"assets/images/artwork/placeholder-5.svg" },
  { "id":"art-6","title":"[PLACEHOLDER] Portrait Study","description":"Replace with a real line.","medium":"Charcoal","year":"[ADD]","category":"Sketches","image":"assets/images/artwork/placeholder-6.svg" }
];

/* ----------------- books.json ----------------- */
window.__DATA__.books = [
  { "id":"book-1","title":"[PLACEHOLDER] Replace me with a favourite","author":"[ADD: author]","genre":"Technology","status":"Favourites","rating":5,"note":"A short personal note — your words.","cover":"assets/images/books/placeholder-1.svg" },
  { "id":"book-2","title":"[PLACEHOLDER] A psychology favourite","author":"[ADD: author]","genre":"Psychology","status":"Favourites","rating":5,"note":"Short personal review — your words.","cover":"assets/images/books/placeholder-2.svg" },
  { "id":"book-3","title":"[PLACEHOLDER] A novel you keep rereading","author":"[ADD: author]","genre":"Fiction","status":"Favourites","rating":4,"note":"What made this one stick — your words.","cover":"assets/images/books/placeholder-3.svg" },
  { "id":"book-4","title":"[PLACEHOLDER] Currently reading","author":"[ADD: author]","genre":"Personal Development","status":"Currently reading","rating":0,"note":"First impressions so far — your words.","cover":"assets/images/books/placeholder-4.svg" },
  { "id":"book-5","title":"[PLACEHOLDER] A recommendation","author":"[ADD: author]","genre":"Philosophy","status":"Recommendations","rating":4,"note":"Why you'd pass this on — your words.","cover":"assets/images/books/placeholder-5.svg" },
  { "id":"book-6","title":"[PLACEHOLDER] AI / tech recommendation","author":"[ADD: author]","genre":"Technology","status":"Recommendations","rating":4,"note":"Why it belongs on an AI/ML reading list — your words.","cover":"assets/images/books/placeholder-6.svg" },
  { "id":"book-7","title":"[PLACEHOLDER] Fiction recommendation","author":"[ADD: author]","genre":"Fiction","status":"Recommendations","rating":4,"note":"What stayed with you — your words.","cover":"assets/images/books/placeholder-7.svg" },
  { "id":"book-8","title":"[PLACEHOLDER] Other-interests pick","author":"[ADD: author]","genre":"Other","status":"Recommendations","rating":4,"note":"A short note — your words.","cover":"assets/images/books/placeholder-8.svg" }
];

/* ----------------- volunteering.json ----------------- */
window.__DATA__.volunteering = [
  { "id":"placeholder-vol-1","org":"[PLACEHOLDER] Organisation name","role":"[ADD: your role]","cause":"[ADD: cause / community]","start":"[ADD]","end":"[ADD]","summary":"A short line about what you did and why it mattered — your own description.","activities":["[ADD]","[ADD]","[ADD]"],"link":"" },
  { "id":"placeholder-vol-2","org":"[PLACEHOLDER] Another organisation","role":"[ADD]","cause":"[ADD]","start":"[ADD]","end":"[ADD]","summary":"Another short description — your real volunteering story.","activities":["[ADD]","[ADD]"],"link":"" }
];
