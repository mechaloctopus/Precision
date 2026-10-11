/* Precision Solutions LLC — interactions */
(() => {
  "use strict";

  const doc = document.documentElement;
  doc.classList.add("js");
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  /* ------------------------------------------------------------------
     Images: each slot lists candidate sources; try them in order and
     keep the tonal placeholder if every one fails.
     ------------------------------------------------------------------ */
  const srcFor = (id, w) => {
    if (id.startsWith("assets/")) return id;
    if (id.startsWith("photo-")) return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=78`;
    return `https://unsplash.com/photos/${id}/download?w=${w}`;
  };
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const widthFor = (el) => {
    const want = Number(el.dataset.w) || Math.round((el.getBoundingClientRect().width || 800) * dpr);
    return Math.min(2400, Math.max(640, Math.ceil(want / 320) * 320));
  };

  function loadChain(img, ids, w, onDone) {
    let i = 0;
    const next = () => {
      if (i >= ids.length) { onDone && onDone(null); return; }
      img.src = srcFor(ids[i++], w);
    };
    img.addEventListener("load", () => onDone && onDone(img.currentSrc || img.src));
    img.addEventListener("error", next);
    next();
  }

  const resolved = new Map(); // first working URL per data-src list, reused by the index preview
  function initPhoto(fig) {
    const img = $("img", fig);
    if (!img || fig.dataset.init) return;
    fig.dataset.init = "1";
    const ids = fig.dataset.src.split(",").map((s) => s.trim()).filter(Boolean);
    img.decoding = "async";
    loadChain(img, ids, widthFor(fig), (url) => {
      if (url) { fig.classList.add("is-loaded"); resolved.set(fig.dataset.src, url); }
      else fig.classList.add("is-empty");
    });
  }
  const photos = $$(".ph[data-src]");
  photos.filter((f) => "eager" in f.dataset).forEach(initPhoto);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { initPhoto(e.target); io.unobserve(e.target); } });
    }, { rootMargin: "120% 0px 120% 0px" });
    photos.forEach((f) => io.observe(f));
  } else photos.forEach(initPhoto);

  /* Films: lightweight facades, iframe only on click */
  $$(".film").forEach((btn) => {
    const id = btn.dataset.yt;
    $(".film__thumb", btn).style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;
    btn.setAttribute("aria-label", `Play film: ${$("b", btn).textContent}`);
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-playing")) return;
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      f.title = $("b", btn).textContent;
      f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      $(".film__thumb", btn).replaceWith(f);
      btn.classList.add("is-playing");
    });
  });

  const year = $("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Menu
     ------------------------------------------------------------------ */
  const menuBtn = $(".nav__menu");
  const menu = $("#menu");
  const setMenu = (open) => {
    doc.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  menuBtn.addEventListener("click", () => setMenu(!doc.classList.contains("menu-open")));
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ------------------------------------------------------------------
     Smooth scroll
     ------------------------------------------------------------------ */
  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.085, smoothWheel: true });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = a.getAttribute("href");
      const el = target === "#top" ? document.body : $(target);
      if (!el) return;
      e.preventDefault();
      setMenu(false);
      if (lenis) lenis.scrollTo(el, { duration: 1.6, offset: 0 });
      else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    });
  });

  /* Nav hides on the way down, returns on the way up */
  const nav = $(".nav");
  let lastY = 0;
  const onScroll = (y) => {
    nav.classList.toggle("is-hidden", y > 200 && y > lastY && !doc.classList.contains("menu-open"));
    lastY = y;
  };
  if (lenis) lenis.on("scroll", ({ scroll }) => onScroll(scroll));
  else addEventListener("scroll", () => onScroll(scrollY), { passive: true });

  /* ------------------------------------------------------------------
     Loader
     ------------------------------------------------------------------ */
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    document.body.classList.remove("is-loading");
    if (hasGsap && !reduced) intro();
  };
  addEventListener("load", () => setTimeout(start, 900));
  setTimeout(start, 3200);

  /* ------------------------------------------------------------------
     Custom cursor + magnetic elements
     ------------------------------------------------------------------ */
  if (finePointer && !reduced) {
    doc.classList.add("has-cursor");
    const cur = $(".cursor"), dot = $(".cursor__dot"), ring = $(".cursor__ring"), label = $(".cursor__label");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`; }, { passive: true });
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("a, button, [data-cursor], .film, .swatch");
      cur.classList.toggle("is-hover", !!t);
      const text = t && (t.dataset.cursor || (t.classList.contains("film") ? "Play" : t.classList.contains("swatch") ? "Light" : ""));
      cur.classList.toggle("is-label", !!text);
      label.textContent = text || "";
    });
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25, y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transition = "transform .6s cubic-bezier(.16,1,.3,1)"; el.style.transform = ""; setTimeout(() => (el.style.transition = ""), 600); });
    });
  }

  /* Raking light across material swatches */
  $$("[data-light]").forEach((sw) => {
    sw.addEventListener("pointermove", (e) => {
      const r = sw.getBoundingClientRect();
      sw.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      sw.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  });

  /* Discipline index: floating preview follows the pointer */
  const preview = $(".index__preview");
  if (preview && finePointer) {
    const pimg = $("img", preview);
    const inlaySvg = $(".inlay svg");
    let px = 0, py = 0, tx = 0, ty = 0, raf = 0, current = "";
    const follow = () => { px += (tx - px) * 0.14; py += (ty - py) * 0.14; preview.style.left = px + "px"; preview.style.top = py + "px"; raf = requestAnimationFrame(follow); };
    $$(".index__list a").forEach((a) => {
      a.addEventListener("pointerenter", (e) => {
        const key = a.dataset.preview;
        $$("svg", preview).forEach((s) => s.remove());
        if (key === "local:inlay" && inlaySvg) { pimg.style.display = "none"; preview.appendChild(inlaySvg.cloneNode(true)); }
        else {
          pimg.style.display = "";
          current = key;
          const known = resolved.get(key);
          if (known) pimg.src = known;
          else {
            pimg.removeAttribute("src");
            loadChain(new Image(), key.split(","), 640, (u) => {
              if (!u) return;
              resolved.set(key, u);
              if (current === key) pimg.src = u;
            });
          }
        }
        if (!raf) { px = tx = e.clientX; py = ty = e.clientY; follow(); }
        preview.classList.add("is-on");
      });
      a.addEventListener("pointermove", (e) => { tx = e.clientX + 40; ty = e.clientY; });
      a.addEventListener("pointerleave", () => preview.classList.remove("is-on"));
    });
    $(".index__list").addEventListener("pointerleave", () => { cancelAnimationFrame(raf); raf = 0; });
  }

  /* Code: type the sample when it scrolls into view */
  const codeEl = $("[data-type]");
  if (codeEl) {
    const source = codeEl.textContent;
    const highlight = (s) => s
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/(\/\/[^\n]*)/g, '<span class="c">$1</span>')
      .replace(/\b(const|while|build)\b/g, '<span class="k">$1</span>')
      .replace(/\b(Infinity)\b/g, '<span class="s">$1</span>');
    if (reduced) codeEl.innerHTML = highlight(source);
    else {
      codeEl.innerHTML = '<span class="caret"></span>';
      const run = () => {
        let i = 0;
        const tick = () => {
          i += source[i] === " " ? 2 : 1;
          codeEl.innerHTML = highlight(source.slice(0, i)) + '<span class="caret"></span>';
          if (i < source.length) setTimeout(tick, source[i - 1] === "\n" ? 140 : 22 + Math.random() * 30);
        };
        tick();
      };
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.4 });
      io.observe(codeEl);
    }
  }

  /* Code: drifting circuit field */
  const canvas = $(".code__field");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, traces = [], visible = false;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth * dpr; H = canvas.height = canvas.offsetHeight * dpr;
      const step = 34 * dpr;
      traces = Array.from({ length: Math.round((W * H) / (step * step * 18)) }, () => ({
        x: Math.round((Math.random() * W) / step) * step, y: Math.round((Math.random() * H) / step) * step,
        dir: Math.floor(Math.random() * 4), len: 0, max: 4 + Math.random() * 10, step, path: [],
      }));
      traces.forEach((t) => t.path.push([t.x, t.y]));
    };
    const draw = () => {
      if (!visible) return;
      ctx.fillStyle = "rgba(7,9,8,.08)";
      ctx.fillRect(0, 0, W, H);
      ctx.lineWidth = dpr;
      traces.forEach((t) => {
        if (t.len > t.max) { t.x = Math.random() * W; t.y = Math.random() * H; t.x -= t.x % t.step; t.y -= t.y % t.step; t.len = 0; t.path = [[t.x, t.y]]; }
        if (Math.random() < 0.3) t.dir = (t.dir + (Math.random() < 0.5 ? 1 : 3)) % 4;
        const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][t.dir];
        const nx = t.x + dx * t.step * 0.5, ny = t.y + dy * t.step * 0.5;
        ctx.strokeStyle = "rgba(125,255,216,.28)";
        ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(nx, ny); ctx.stroke();
        ctx.fillStyle = "rgba(125,255,216,.75)";
        ctx.fillRect(nx - dpr, ny - dpr, 2 * dpr, 2 * dpr);
        t.x = nx; t.y = ny; t.len += 0.5;
      });
      setTimeout(() => requestAnimationFrame(draw), 60);
    };
    resize();
    addEventListener("resize", resize);
    new IntersectionObserver(([e]) => { const was = visible; visible = e.isIntersecting; if (visible && !was) draw(); }).observe(canvas);
  }

  /* ------------------------------------------------------------------
     Scroll choreography (GSAP)
     ------------------------------------------------------------------ */
  if (!hasGsap) { $$(".yaki").forEach((y) => y.style.setProperty("--dusk", 1)); return; }
  gsap.registerPlugin(ScrollTrigger);

  // Split headings into masked words
  $$("[data-split]").forEach((el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const w = document.createElement("span"); w.className = "w";
            const wi = document.createElement("span"); wi.className = "wi"; wi.textContent = part;
            w.appendChild(wi); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    walk(el);
  });
  // Split paragraphs into words for scrubbed illumination
  $$("[data-words]").forEach((el) => {
    el.setAttribute("aria-label", el.textContent.trim());
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="ww" aria-hidden="true">${w}</span>`).join(" ");
  });

  if (reduced) { $$(".ww").forEach((w) => (w.style.opacity = 1)); return; }

  function intro() {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".hero__media img", { scale: 1.4, duration: 2.6 }, 0)
      .from(".hero__title span", { yPercent: 110, opacity: 0, duration: 1.6, stagger: 0.06 }, 0.2)
      .from(".hero__eyebrow, .hero__sub", { y: 24, opacity: 0, duration: 1.4, stagger: 0.15 }, 0.8)
      .from(".hero__meta span", { y: 12, opacity: 0, duration: 1.2, stagger: 0.08 }, 1)
      .from(".nav", { opacity: 0, duration: 1.4, clearProps: "opacity" }, 0.9);
  }

  const mm = gsap.matchMedia();

  // Hero: parallax zoom out of the frame
  gsap.to(".hero__media img", { scale: 1.32, yPercent: 8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero__content", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true } });
  gsap.to(".hero__title", { letterSpacing: "0.3em", ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "70% top", scrub: true } });

  // Headings rise word by word
  $$("[data-split]").forEach((el) => {
    gsap.from($$(".wi", el), { yPercent: 115, rotate: 3, duration: 1.4, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: el, start: "top 88%" } });
  });
  // Generic reveal
  $$("[data-reveal]").forEach((el) => {
    gsap.from(el, { y: 40, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
  });
  // Words illuminate as you read
  $$("[data-words]").forEach((el) => {
    gsap.to($$(".ww", el), { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
  });

  // Images: wipe open + inner parallax
  $$(".ph.clip").forEach((fig) => {
    gsap.fromTo(fig, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: fig, start: "top 92%" } });
  });
  $$(".split__media .ph img, .worlds__grid .ph img, .art__mosaic .ph img, .material__pair .ph img, .plaster__photos .ph img, .code__photos .ph img").forEach((img) => {
    gsap.fromTo(img, { scale: 1.25, yPercent: -6 }, { scale: 1.1, yPercent: 6, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });
  $$(".chapter").forEach((ch) => {
    const img = $(".chapter__bleed img", ch);
    gsap.fromTo(img, { scale: 1.3, yPercent: -12 }, { scale: 1, yPercent: 4, ease: "none", scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom top", scrub: true } });
    gsap.from($(".chapter__overlay", ch), { yPercent: 40, ease: "none", scrollTrigger: { trigger: ch, start: "top bottom", end: "bottom bottom", scrub: true } });
  });
  gsap.fromTo(".outdoor__media img", { yPercent: -10 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".outdoor", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".contact__bg img", { scale: 1.35 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom bottom", scrub: true } });
  gsap.from(".lineage__mark", { rotate: -120, opacity: 0, scale: 0.6, ease: "none", scrollTrigger: { trigger: ".lineage", start: "top 85%", end: "top 30%", scrub: true } });
  gsap.from(".swatch--card", { y: 80, opacity: 0, duration: 1.4, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: ".plaster__swatches", start: "top 85%" } });
  gsap.from(".film", { y: 60, opacity: 0, duration: 1.4, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: ".films__grid", start: "top 85%" } });
  gsap.to(".material > .swatch .swatch__tex", { scale: 1.12, ease: "none", scrollTrigger: { trigger: ".material", start: "top bottom", end: "bottom top", scrub: true } });

  // Yakisugi: daylight to dusk as the section scrolls past
  const yaki = $(".yaki");
  ScrollTrigger.create({
    trigger: yaki, start: "top top", end: "bottom bottom", scrub: true,
    onUpdate: (self) => yaki.style.setProperty("--dusk", gsap.utils.clamp(0, 1, (self.progress - 0.2) / 0.55).toFixed(3)),
  });
  gsap.fromTo(".yaki__tex", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: yaki, start: "top bottom", end: "bottom top", scrub: true } });

  // Wood: pinned horizontal travel on desktop
  mm.add("(min-width: 861px)", () => {
    const rail = $(".hscroll__rail");
    const distance = () => Math.max(0, rail.scrollWidth - innerWidth);
    const tween = gsap.to(rail, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: { trigger: ".hscroll", start: "top top", end: () => "+=" + distance(), pin: ".hscroll__pin", scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
    });
    $$(".card .ph img", rail).forEach((img) => {
      gsap.fromTo(img, { xPercent: -8, scale: 1.2 }, { xPercent: 8, scale: 1.2, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
    });
  });

  addEventListener("load", () => ScrollTrigger.refresh());
})();
