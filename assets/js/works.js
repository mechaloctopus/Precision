/* Precision Solutions LLC — Archive rendering. Data lives in works-data.js. */
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
  const titleCard = (w) => `<span class="wk__mono"><b>${esc(w.title)}</b><small>${esc(w.kind)} · ${esc(w.platform)}</small></span>`;
  const chip = (w) => `<span class="status" data-status="${esc(w.status.toLowerCase().replace(/\s+/g, "-"))}">${esc(w.status)}</span>`;
  function cover(w, big) {
    const img = w.shot ? `<img src="assets/works/${w.shot}.webp" alt="${esc(w.title)} — screenshot" loading="${big ? "eager" : "lazy"}" decoding="async">` : "";
    const frame = !w.shot
      ? titleCard(w)
      : w.frame === "phone"
        ? `<span class="device device--phone">${img}</span>`
        : `<span class="device device--browser"><span class="device__bar"><i></i><i></i><i></i><em>${esc(w.domain || host((w.links[0] || {}).url) || w.id)}</em></span><span class="device__screen">${img}</span></span>`;
    return `<span class="wk__cover" style="--accent:${w.accent}"><canvas width="800" height="600" data-art="${w.id}"></canvas>${frame}<span class="wk__glare"></span></span>`;
  }

  grid.innerHTML = works.map((w, i) => `
    <article class="wk" data-kind="${kindKey(w.kind)}" style="--accent:${w.accent}">
      <button class="wk__hit" data-open="${w.id}" aria-label="Open ${esc(w.title)}" data-cursor="Open">
        ${cover(w)}
        <span class="wk__meta"><i>${String(i + 1).padStart(2, "0")}</i><span>${esc(w.kind)} · ${esc(w.platform)}</span>${chip(w)}</span>
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
  function guard(scope, w) {
    scope.querySelectorAll(".wk__cover img").forEach((img) => {
      const fail = () => { const dev = img.closest(".device"); if (dev) dev.outerHTML = titleCard(w); };
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
        <p class="eyebrow">${String(i + 1).padStart(2, "0")} — ${esc(w.kind)} · ${esc(w.platform)} · ${esc(w.year)} ${chip(w)}</p>
        <h2 class="display display--m">${esc(w.title)}</h2>
        <p class="dossier__tag">${esc(w.tagline)}</p>
        <p class="dossier__about">${esc(w.about)}</p>
        <ul class="dossier__features">${w.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <ul class="dossier__stack">${w.stack.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        ${w.note ? `<p class="dossier__note">${esc(w.note)}</p>` : ""}
        <div class="dossier__links">${w.links.length ? w.links.map((l, k) => `<a class="btn ${k ? "btn--ghost" : ""}" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("") : `<span class="dossier__status">Demo on request — 808 647 9523</span>`}</div>
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
