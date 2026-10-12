/* Precision Solutions LLC — the Archive.
   Each entry is a past project. `shot` is a capture in assets/works/;
   `frame` is how it is presented ("browser" | "phone"). Leave `shot` empty
   and the card draws its own generative cover from `art`. */
window.PRECISION_WORKS = [
  {
    id: "lensii", title: "Lensii", kind: "App", year: "2026",
    tagline: "The camera app with every tool in the handle.",
    about: "A precision mobile camera, creator studio, screen recorder, compositor and visual-intelligence platform in a single instrument. The Android build already runs a working camera, timelapse, lab preview and a local-first library; an iOS edition follows.",
    features: ["Pro capture controls", "Timelapse & lab modes", "Screen recording & compositing", "Local-first media library"],
    stack: ["Expo", "React Native", "TypeScript", "Static web"],
    links: [{ label: "Android build", url: "https://github.com/mechaloctopus/swissarmycam/releases/tag/android-latest" }, { label: "Source", url: "https://github.com/mechaloctopus/swissarmycam" }],
    status: "Android · in development", domain: "lensii", shot: "lensii", frame: "browser", accent: "#e8402e", art: "aperture",
  },
  {
    id: "moodsignal", title: "MoodSignal", kind: "App", year: "2026",
    tagline: "Daily word. Check in. One wise next step.",
    about: "A local-first emotional check-in and personal-growth companion, built at the request of a family therapist. A short voice reflection estimates energy, calm and stress; the app answers with one practice, one piece of wisdom and one quest on the Inner Path — and everything stays on the device.",
    features: ["Voice & emotion-wheel check-ins", "Breath, stillness & sleep practices", "Inner Path with 11 skill trees", "365 daily messages, journal & insights"],
    stack: ["Expo", "React Native", "TypeScript", "Local-first"],
    links: [{ label: "Source", url: "https://github.com/mechaloctopus/mentalhealthapp" }],
    status: "Android · v1.0", shot: "moodsignal", frame: "phone", accent: "#8fb8a8", art: "waves",
    note: "A wellness companion, not a medical device.",
  },
  {
    id: "honeycomb", title: "Honeycomb", kind: "App", year: "2026",
    tagline: "A members-only institute of frequency.",
    about: "The Honeycomb Hivemind Institute: a gated research and software platform around the Honeycomb Healer, a hexagonal resonance device for group sound. Its heart is a twelve-channel frequency modulator — independent oscillators from 0.1 Hz to 20 kHz, each with its own waveform, filter, delay and reverb, orchestrated with keyframe automation.",
    features: ["12-channel frequency modulator", "Keyframe automation & drone mode", "Schumann, theta, 528 Hz & binaural presets", "Member library & sessions"],
    stack: ["Next.js", "Tone.js", "Prisma", "Stripe"],
    links: [{ label: "Enter", url: "https://honeycomb-kappa.vercel.app" }],
    status: "Live", shot: "honeycomb", frame: "browser", accent: "#e8b64a", art: "hex",
  },
  {
    id: "galaxymind", title: "Galaxy Mind", kind: "App", year: "2026",
    tagline: "Ideas as stars. Connections as constellations.",
    about: "A mind map where every idea is a glowing body in a dark cosmos. Pan, zoom and long-press through your own knowledge graph; nodes hold rich notes and verified sources, and every map lives offline on your device.",
    features: ["Neural-bubble galaxy graph", "Touch-first gestures", "Markdown nodes & source links", "Offline SQLite, JSON import/export"],
    stack: ["Expo", "React Native", "SVG", "SQLite"],
    links: [{ label: "Launch", url: "https://mind-galaxy.vercel.app" }],
    status: "Live", shot: "galaxymind", frame: "phone", accent: "#8a6cff", art: "stars",
  },
  {
    id: "skymap", title: "SkyMap", kind: "App", year: "2026",
    tagline: "Celestial navigation, all eighty-eight constellations.",
    about: "A high-fidelity interactive sky: every constellation with its lines and boundaries, named stars, deep-sky objects, the Milky Way and the planets — searchable, colour-coded into suits, and drawn with an astronomer's care.",
    features: ["88 constellations", "Star names & deep-sky objects", "Milky Way & planets", "Search and colour suits"],
    stack: ["Canvas", "JavaScript", "Astronomical data"],
    links: [],
    status: "Private build", shot: "skymap", frame: "browser", accent: "#4aa3ff", art: "stars",
  },
  {
    id: "modernvibe", title: "Modern Vibe Studio", kind: "App", year: "2025",
    tagline: "Sound, made visible.",
    about: "A real-time, audio-reactive visual instrument. Sing, play or plug in a microphone and the studio maps loudness, spectrum and timbre onto GPU shaders — mandalas, spectra and particles that perform with you.",
    features: ["Live microphone analysis", "FFT bands, RMS & spectral centroid", "Shader-driven visualizers", "Presets with live parameter tweaking"],
    stack: ["Expo", "GLSL", "Web Audio", "TypeScript"],
    links: [{ label: "Launch", url: "https://modernvibestudio.vercel.app" }],
    status: "Live", shot: "modernvibe", frame: "phone", accent: "#00e0ff", art: "waves",
  },
  {
    id: "colorvibe", title: "Color Vibe", kind: "App", year: "2025",
    tagline: "Palette engineering for painters.",
    about: "A colour workstation for artists. A full colour engine converts between HSL, RGB, CMYK and LAB, harmony algorithms build complementary, triadic and tetradic palettes, and a musical mode maps colour to sound.",
    features: ["HSL · RGB · CMYK · LAB engine", "Harmony & palette generation", "Ouija-board colour picker", "Musical colour modes"],
    stack: ["Expo", "Redux", "Reanimated", "SVG"],
    links: [{ label: "Launch", url: "https://color-vibe-app.vercel.app" }],
    status: "Live", shot: "colorvibe", frame: "phone", accent: "#ff4fa3", art: "wheel",
  },
  {
    id: "supersoldier", title: "Super Soldier", kind: "App", year: "2025",
    tagline: "One workout a week. Nothing wasted.",
    about: "A training system distilled from several schools of thought: high-intensity, low-frequency sessions after Mike Mentzer, fasting on training days, Bob Cooley's resistance stretching and meridian-based movement through every plane.",
    features: ["Weekly high-intensity protocol", "Resistance stretching", "Intermittent-fasting rhythm", "Three-month progression"],
    stack: ["Expo", "React Native", "three.js"],
    links: [{ label: "Launch", url: "https://super-soldier.vercel.app" }],
    status: "Live", shot: "", frame: "phone", accent: "#c8302c", art: "rings",
  },
  {
    id: "priceme", title: "Priceme", kind: "App", year: "2025",
    tagline: "Point. Shoot. Know its worth.",
    about: "An AI pricing engine for resellers and collectors. Photograph an item; Priceme identifies it, reads the live eBay market and returns a confident price — the whole pipeline running in the browser.",
    features: ["Camera or library capture", "AI identification", "Live market comparables", "Instant valuation"],
    stack: ["Expo", "OpenAI", "eBay API", "TypeScript"],
    links: [{ label: "Launch (private beta)", url: "https://priceme-zeta.vercel.app" }],
    status: "Private beta", shot: "priceme", frame: "phone", accent: "#d8bd8f", art: "grid",
  },
  {
    id: "chaching", title: "Chaching", kind: "App", year: "2025",
    tagline: "The register, on wheels.",
    about: "A pocket business system for food trucks and mobile vendors: a digital menu, payments, and a WYSIWYG invoice designer with QR pay links and one-tap PDF export.",
    features: ["Digital menu", "Invoice designer & PDF export", "QR payment links", "Cloud sync"],
    stack: ["Expo", "Firebase", "TypeScript"],
    links: [],
    status: "In development", shot: "", frame: "phone", accent: "#3ddc84", art: "grid",
  },
  {
    id: "soulcoast", title: "SoulCoast Pulse", kind: "App", year: "2025",
    tagline: "The pulse of the dance floor.",
    about: "A home for the SoulCoast dance community — events, classes, conversation and personal-growth journeys, wrapped in a fire-and-ice neon aesthetic.",
    features: ["Events & classes", "Community discussions", "Growth journeys", "Fire-and-ice design system"],
    stack: ["React Native", "Firebase", "TypeScript"],
    links: [{ label: "Source", url: "https://github.com/mechaloctopus/soulcoast-pulse" }],
    status: "In development", shot: "", frame: "phone", accent: "#ff6a3d", art: "waves",
  },
  {
    id: "magicsquares", title: "Magic Squares", kind: "App", year: "2024",
    tagline: "The hidden geometry of numbers.",
    about: "Generates magic squares and traces their number sequences — all, odd, even — as continuous lines, revealing the sigils and symmetries folded inside the arithmetic.",
    features: ["Square generation", "Sequence tracing", "Grid & number overlays", "Pattern gallery"],
    stack: ["React", "Canvas"],
    links: [{ label: "Launch", url: "https://magic-squares.vercel.app" }],
    status: "Live", shot: "", frame: "browser", accent: "#b6976b", art: "magic",
  },
  {
    id: "prlx", title: "prlx", kind: "Tool", year: "2025",
    tagline: "Parallax, without writing a line.",
    about: "A visual builder for premium parallax scrollers. Import images and GIFs, set keyframes on a timeline, preview the scroll, and export clean HTML or a ZIP ready to host.",
    features: ["Keyframe timeline", "Image & GIF layers", "Live scroll preview", "HTML / ZIP export"],
    stack: ["React", "Konva", "GSAP", "Vite"],
    links: [{ label: "Launch", url: "https://prlx-tool.vercel.app" }],
    status: "Live", shot: "prlx", frame: "browser", accent: "#f2c14e", art: "layers",
  },
  {
    id: "png2gif", title: "PNG → GIF", kind: "Tool", year: "2025",
    tagline: "Sprite sheet in. Animation out.",
    about: "A small, sharp utility for game artists: feed it sprite sheets and it detects every frame, centres and pads them, and returns a smooth animated GIF — one file or a whole folder at a time.",
    features: ["Automatic frame detection", "Centring & padding", "Batch folders", "Timing control"],
    stack: ["Python", "Pillow"],
    links: [{ label: "Source", url: "https://github.com/mechaloctopus/png2gif" }],
    status: "Open source", shot: "", frame: "browser", accent: "#7bd88f", art: "pixels",
  },
  {
    id: "excellentman", title: "Manual of the Excellent Gentleman", kind: "Book", year: "2026",
    tagline: "A manual of character, conduct, love & sovereignty.",
    about: "Nine Books, fifty chapters, one architecture — Mind, Word, Body, Company, Companion, World, Guardian, Service, Crown. A beginner's guide to etiquette that becomes a guide to becoming.",
    features: ["Nine Books", "Fifty chapters", "Preface & appendix", "Read free online"],
    stack: ["Web book"],
    links: [{ label: "Read", url: "https://mechaloctopus.github.io/excellentman/" }],
    status: "Published online", shot: "excellentman", frame: "browser", accent: "#c9a46a", art: "pages",
  },
  {
    id: "archetypes", title: "The Archetypes of Code", kind: "Book", year: "2026",
    tagline: "Twelve archetypes. One craft.",
    about: "A modern approach to the changing landscape of creative technologies. Code is the hidden grammar of consequence — law, ritual, craft, circuit, shop, engine, city and interface — and this book names the twelve forms that return whenever people try to make order.",
    features: ["Twelve archetypes", "Prologue & epilogue", "Searchable web edition", "Fully referenced"],
    stack: ["Web book"],
    links: [{ label: "Read", url: "https://archetypesofcode.vercel.app" }],
    status: "Published online", shot: "archetypes", frame: "browser", accent: "#7fc8a9", art: "pages",
  },
  {
    id: "quangzoo", title: "Patterns of the Matter", kind: "Book", year: "2026",
    tagline: "Quangzoo's guide to life.",
    about: "A modern guide to ancient wisdom in twenty chapters — the Tao, confidence, critical thinking, sacred literature, nonduality, breath, permaculture, sovereignty, and the art of living with clarity.",
    features: ["Twenty chapters", "Philosophy & practice", "Read free online"],
    stack: ["Web book"],
    links: [{ label: "Read", url: "https://mechaloctopus.github.io/quangzoo/" }],
    status: "Published online", shot: "quangzoo", frame: "browser", accent: "#d8cfbf", art: "pages",
  },
  {
    id: "chickencowboys", title: "Chicken Cowboys", kind: "Game", year: "2026",
    tagline: "An epic of courage, community — and chickens.",
    about: "A humble chicken rises to confront an unimaginable evil. Raise and breed exotic birds, win at the rodeo, cross the Outlands, brave the volcano and the dungeon. An iOS game in development, with its full story and design document published.",
    features: ["Farm, eggs & growth", "Rodeo competitions", "Dungeon & volcano quests", "Breeding exotic chickens"],
    stack: ["iOS", "Game design"],
    links: [{ label: "Design document", url: "https://mechaloctopus.github.io/chickencowboys/" }],
    status: "iOS · in development", shot: "chickencowboys", frame: "browser", accent: "#f0a33a", art: "pixels",
  },
  {
    id: "faeryquest", title: "FaeryQuest", kind: "Venture", year: "2026",
    tagline: "Where learning becomes legend.",
    about: "A game-first education engine that turns any curriculum into an action RPG — automating course creation and embedding mastery-gated assessment directly into play. Presented here as its investor pitch.",
    features: ["Curriculum → quest engine", "Mastery-gated assessment", "Automated course creation", "Investor overview"],
    stack: ["Pitch deck", "EdTech"],
    links: [{ label: "View the pitch", url: "https://mechaloctopus.github.io/gamified_education/" }],
    status: "Pitch", shot: "faeryquest", frame: "browser", accent: "#f2a33a", art: "stars",
  },
  {
    id: "ikuband", title: "IkuBand", kind: "Venture", year: "2026",
    tagline: "Internal health intelligence, worn on a finger.",
    about: "A research concept for a smart ring built around miniaturised spectroscopy — the science, the machine-learning layer, attachments, manufacturing and roadmap, laid out as a living institute.",
    features: ["Spectroscopy research", "Machine-learning layer", "Ring + attachments", "Manufacturing roadmap"],
    stack: ["Next.js", "Research"],
    links: [{ label: "Visit", url: "https://mechaloctopus.github.io/ikuband-site/" }],
    status: "Research concept", shot: "ikuband", frame: "browser", accent: "#7b5cff", art: "rings",
  },
];

/* Field work: categories of physical projects. Photos are tried in order
   (Unsplash IDs or paths under assets/). Put your own job photos first. */
window.PRECISION_BUILT = [
  { title: "Turf installations", line: "Laser-graded, seamless, evergreen.", photos: "wQ7w8Uasls0,QSIq9ncQkzY", tone: "forest" },
  { title: "Bathroom remodels", line: "Microcement, plaster, stone, light.", photos: "2QxjeVERIPw,41o2UJWlx6U", tone: "stone" },
  { title: "Kitchens & interiors", line: "Cabinetry and surfaces, end to end.", photos: "XU_ODlSO9ac,5kdlUEHlMXo,mhDeeOvBs9o", tone: "wood" },
  { title: "Decks & outdoor rooms", line: "Built for the century, not the season.", photos: "z5_Tv41SZQg,zswwDSV_NhQ", tone: "wood" },
  { title: "Framing & structure", line: "The bones everything else stands on.", photos: "dUYELbt-H-E,photo-1503387762-592deb58ef4e", tone: "wood" },
  { title: "Water features", line: "Cascades, pools and quiet basins.", photos: "qrB7Sx319Uw,pe-9wdvchxg", tone: "water" },
  { title: "Plaster & microcement", line: "One continuous surface.", photos: "assets/img/venetian-plaster.webp", tone: "plaster" },
  { title: "Fences & screens", line: "Privacy treated as architecture.", photos: "YpK65tUQipg,y2i8-smk41U", tone: "wood" },
  { title: "Treehouses & theming", line: "Worlds, built by hand.", photos: "hlUMmB43VrA,uQ4fnjOP3kI", tone: "forest" },
  { title: "Slabs & furniture", line: "Live edge, finished to glass.", photos: "aXJkDfOVfyE,ZaD7ZpPHtoI", tone: "wood" },
];

(() => {
  "use strict";
  const works = window.PRECISION_WORKS;
  const grid = document.querySelector(".works__grid");
  const builtGrid = document.querySelector(".built__grid");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const host = (u) => { try { return new URL(u).host.replace(/^www\./, ""); } catch { return ""; } };
  const kindKey = (k) => k.toLowerCase();

  /* ---------- generative covers ---------- */
  function rng(seed) { let s = 0; for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function drawArt(cv, w) {
    const ctx = cv.getContext("2d"), W = cv.width, H = cv.height, r = rng(w.id), a = w.accent;
    const g = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.5, W * 0.75);
    g.addColorStop(0, a + "40"); g.addColorStop(0.55, "#0f0e0c"); g.addColorStop(1, "#080706");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = a; ctx.fillStyle = a; ctx.lineWidth = 1;
    const cx = W / 2, cy = H / 2;
    const art = {
      stars() {
        const pts = Array.from({ length: 160 }, () => [r() * W, r() * H, r()]);
        pts.forEach(([x, y, s]) => { ctx.globalAlpha = 0.25 + s * 0.75; ctx.beginPath(); ctx.arc(x, y, s * 1.6, 0, 7); ctx.fill(); });
        ctx.globalAlpha = 0.45; ctx.beginPath();
        let p = pts[0]; ctx.moveTo(p[0], p[1]);
        for (let i = 1; i < 9; i++) { p = pts[i * 7]; ctx.lineTo(p[0], p[1]); }
        ctx.stroke();
      },
      hex() {
        const s = 34; ctx.globalAlpha = 0.5;
        for (let y = -s; y < H + s; y += s * 1.5) for (let x = -s; x < W + s; x += s * Math.sqrt(3)) {
          const ox = (Math.round(y / (s * 1.5)) % 2) * s * Math.sqrt(3) / 2;
          const d = Math.hypot(x + ox - cx, y - cy) / W; ctx.globalAlpha = Math.max(0.06, 0.6 - d);
          ctx.beginPath(); for (let k = 0; k < 6; k++) { const an = Math.PI / 3 * k + Math.PI / 6; ctx.lineTo(x + ox + s * 0.92 * Math.cos(an), y + s * 0.92 * Math.sin(an)); } ctx.closePath(); ctx.stroke();
        }
      },
      waves() {
        for (let i = 0; i < 26; i++) {
          ctx.globalAlpha = 0.08 + (i / 26) * 0.6; ctx.beginPath();
          const amp = 10 + i * 2.4, f = 0.006 + r() * 0.004, ph = r() * 6;
          for (let x = 0; x <= W; x += 6) ctx.lineTo(x, cy + Math.sin(x * f + ph + i * 0.18) * amp * Math.sin(x / W * Math.PI));
          ctx.stroke();
        }
      },
      wheel() {
        for (let i = 0; i < 36; i++) { ctx.globalAlpha = 0.9; ctx.fillStyle = `hsl(${i * 10} 70% 58%)`; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, H * 0.36, (i / 36) * 6.283, ((i + 1) / 36) * 6.283); ctx.fill(); }
        ctx.fillStyle = "#0f0e0c"; ctx.beginPath(); ctx.arc(cx, cy, H * 0.2, 0, 7); ctx.fill();
      },
      rings() { for (let i = 1; i < 14; i++) { ctx.globalAlpha = 0.7 - i * 0.045; ctx.beginPath(); ctx.arc(cx, cy, i * H * 0.034, 0, 7); ctx.stroke(); } },
      aperture() {
        for (let k = 0; k < 9; k++) { const an = (k / 9) * 6.283; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * H * 0.12, cy + Math.sin(an) * H * 0.12); ctx.lineTo(cx + Math.cos(an + 1.2) * H * 0.38, cy + Math.sin(an + 1.2) * H * 0.38); ctx.stroke(); }
        ctx.beginPath(); ctx.arc(cx, cy, H * 0.38, 0, 7); ctx.stroke();
      },
      grid() { const s = 28; ctx.globalAlpha = 0.18; for (let x = 0; x < W; x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } },
      magic() {
        const n = 5, s = H * 0.13, ox = cx - (n * s) / 2, oy = cy - (n * s) / 2, sq = [[17,24,1,8,15],[23,5,7,14,16],[4,6,13,20,22],[10,12,19,21,3],[11,18,25,2,9]];
        ctx.globalAlpha = 0.25; for (let i = 0; i <= n; i++) { ctx.beginPath(); ctx.moveTo(ox + i * s, oy); ctx.lineTo(ox + i * s, oy + n * s); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ox, oy + i * s); ctx.lineTo(ox + n * s, oy + i * s); ctx.stroke(); }
        const pos = {}; sq.forEach((row, y) => row.forEach((v, x) => (pos[v] = [ox + (x + 0.5) * s, oy + (y + 0.5) * s])));
        ctx.globalAlpha = 0.85; ctx.lineWidth = 1.5; ctx.beginPath(); for (let v = 1; v <= 25; v++) ctx.lineTo(...pos[v]); ctx.stroke();
      },
      layers() { for (let i = 0; i < 6; i++) { ctx.globalAlpha = 0.15 + i * 0.12; ctx.strokeRect(W * 0.2 + i * 16, H * 0.2 + i * 12, W * 0.45, H * 0.45); } },
      pixels() { const s = 14; for (let y = 0; y < H; y += s) for (let x = 0; x < W; x += s) { const d = Math.hypot(x - cx, y - cy) / W; if (r() > 0.55 + d) { ctx.globalAlpha = 0.25 + r() * 0.6; ctx.fillRect(x + 1, y + 1, s - 2, s - 2); } } },
      pages() { for (let i = 0; i < 40; i++) { ctx.globalAlpha = 0.05 + (i % 5 === 0 ? 0.25 : 0.06); ctx.beginPath(); ctx.moveTo(W * 0.18, H * 0.12 + i * H * 0.019); ctx.lineTo(W * 0.82, H * 0.12 + i * H * 0.019); ctx.stroke(); } },
    };
    (art[w.art] || art.grid)();
    ctx.globalAlpha = 1;
  }

  /* ---------- cards ---------- */
  function cover(w, big) {
    const img = w.shot ? `<img src="assets/works/${w.shot}.webp" alt="${esc(w.title)} — screenshot" loading="${big ? "eager" : "lazy"}" decoding="async">` : "";
    const frame = !w.shot
      ? `<span class="wk__mono">${esc(w.title.replace(/[^A-Za-z0-9 ]/g, "").split(" ").map((s) => s[0]).join("").slice(0, 3))}</span>`
      : w.frame === "phone"
        ? `<span class="device device--phone">${img}</span>`
        : `<span class="device device--browser"><span class="device__bar"><i></i><i></i><i></i><em>${esc(w.domain || host((w.links[0] || {}).url) || w.id)}</em></span><span class="device__screen">${img}</span></span>`;
    return `<span class="wk__cover" style="--accent:${w.accent}"><canvas width="800" height="600" data-art="${w.id}"></canvas>${frame}<span class="wk__glare"></span></span>`;
  }

  grid.innerHTML = works.map((w, i) => `
    <article class="wk" data-kind="${kindKey(w.kind)}" style="--accent:${w.accent}">
      <button class="wk__hit" data-open="${w.id}" aria-label="Open ${esc(w.title)}" data-cursor="Open">
        ${cover(w)}
        <span class="wk__meta"><i>${String(i + 1).padStart(2, "0")}</i><span>${esc(w.kind)} · ${esc(w.status)}</span></span>
        <b class="wk__title">${esc(w.title)}</b>
        <em class="wk__tag">${esc(w.tagline)}</em>
      </button>
    </article>`).join("");

  const counts = works.reduce((m, w) => ((m[kindKey(w.kind)] = (m[kindKey(w.kind)] || 0) + 1), m), {});
  document.querySelectorAll(".filters button").forEach((b) => {
    const k = b.dataset.filter;
    const n = k === "all" ? works.length : k === "built" ? window.PRECISION_BUILT.length : counts[k] || 0;
    b.insertAdjacentHTML("beforeend", `<sup>${n}</sup>`);
  });
  document.querySelector("[data-count]").textContent = String(works.length);

  // paint covers when they come near the viewport
  const paint = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const w = works.find((x) => x.id === e.target.dataset.art);
    drawArt(e.target, w); paint.unobserve(e.target);
  }), { rootMargin: "400px" });
  document.querySelectorAll("canvas[data-art]").forEach((c) => paint.observe(c));
  // a screenshot that fails to load gives way to the generative cover + monogram
  const mono = (w) => `<span class="wk__mono">${esc(w.title.replace(/[^A-Za-z0-9 ]/g, "").split(" ").map((s) => s[0]).join("").slice(0, 3))}</span>`;
  function guard(scope, w) {
    scope.querySelectorAll(".wk__cover img").forEach((img) => {
      const fail = () => { const dev = img.closest(".device"); if (dev) dev.outerHTML = mono(w); };
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail(); else img.addEventListener("error", fail, { once: true });
    });
  }
  grid.querySelectorAll(".wk").forEach((el) => guard(el, works.find((x) => x.id === el.querySelector("[data-open]").dataset.open)));

  /* ---------- filters ---------- */
  const built = document.querySelector("#built");
  document.querySelectorAll(".filters button").forEach((b) => b.addEventListener("click", () => {
    const f = b.dataset.filter;
    document.querySelectorAll(".filters button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    if (f === "built") { (window.__lenis ? window.__lenis.scrollTo(built, { duration: 1.4 }) : built.scrollIntoView({ behavior: "smooth" })); return; }
    grid.classList.toggle("is-filtered", f !== "all");
    grid.querySelectorAll(".wk").forEach((el) => el.classList.toggle("is-hidden", f !== "all" && el.dataset.kind !== f));
    window.ScrollTrigger && window.ScrollTrigger.refresh();
  }));

  /* ---------- tilt + glare ---------- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    grid.addEventListener("pointermove", (e) => {
      const c = e.target.closest(".wk__cover"); if (!c) return;
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      c.style.setProperty("--gx", `${(x + 0.5) * 100}%`); c.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
    });
    grid.addEventListener("pointerout", (e) => { const c = e.target.closest(".wk__cover"); if (c && !c.contains(e.relatedTarget)) c.style.transform = ""; });
  }

  /* ---------- dossier (modal) ---------- */
  const modal = document.querySelector(".dossier");
  const body = modal.querySelector(".dossier__body");
  let lastFocus = null;
  function open(id) {
    const i = works.findIndex((w) => w.id === id), w = works[i];
    if (!w) return;
    lastFocus = document.activeElement;
    body.innerHTML = `
      <div class="dossier__media" style="--accent:${w.accent}">${cover(w, true)}</div>
      <div class="dossier__text">
        <p class="eyebrow">${String(i + 1).padStart(2, "0")} — ${esc(w.kind)} · ${esc(w.year)}</p>
        <h2 class="display display--m">${esc(w.title)}</h2>
        <p class="dossier__tag">${esc(w.tagline)}</p>
        <p class="dossier__about">${esc(w.about)}</p>
        <ul class="dossier__features">${w.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <ul class="dossier__stack">${w.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        ${w.note ? `<p class="dossier__note">${esc(w.note)}</p>` : ""}
        <div class="dossier__links">${w.links.length ? w.links.map((l, k) => `<a class="btn ${k ? "btn--ghost" : ""}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("") : `<span class="dossier__status">${esc(w.status)} — demo on request</span>`}</div>
        <nav class="dossier__nav"><button data-step="-1">← Previous</button><button data-step="1">Next →</button></nav>
      </div>`;
    body.dataset.index = i;
    drawArt(body.querySelector("canvas"), w);
    guard(body, w);
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.documentElement.classList.add("dossier-open");
    window.__lenis && window.__lenis.stop();
    modal.querySelector(".dossier__close").focus();
    history.replaceState(null, "", "#" + w.id);
  }
  function close() {
    modal.classList.remove("is-open");
    document.documentElement.classList.remove("dossier-open");
    window.__lenis && window.__lenis.start();
    setTimeout(() => { modal.hidden = true; }, 600);
    history.replaceState(null, "", location.pathname);
    lastFocus && lastFocus.focus();
  }
  grid.addEventListener("click", (e) => { const b = e.target.closest("[data-open]"); if (b) open(b.dataset.open); });
  modal.addEventListener("click", (e) => {
    if (e.target.closest(".dossier__close") || e.target === modal) close();
    const step = e.target.closest("[data-step]");
    if (step) { const n = works.length; open(works[(Number(body.dataset.index) + Number(step.dataset.step) + n) % n].id); }
  });
  addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const n = works.length; open(works[(Number(body.dataset.index) + (e.key === "ArrowRight" ? 1 : -1) + n) % n].id); }
  });
  if (location.hash && works.some((w) => "#" + w.id === location.hash)) setTimeout(() => open(location.hash.slice(1)), 600);

  /* ---------- built ---------- */
  builtGrid.innerHTML = window.PRECISION_BUILT.map((b, i) => `
    <figure class="ph clip built__tile" data-tone="${b.tone}" data-src="${esc(b.photos)}">
      <img alt="${esc(b.title)}">
      <figcaption><i>${String(i + 1).padStart(2, "0")}</i><b>${esc(b.title)}</b><span>${esc(b.line)}</span></figcaption>
    </figure>`).join("");
})();
