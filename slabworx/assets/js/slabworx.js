/* Aloha Slabworx — interactions */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const doc = document.documentElement;
  doc.classList.add("js");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- photographs (photos/photos.js) ---------- */
  const photos = (window.SLABWORX_PHOTOS || []).filter((p) => p && p.src);
  const bySlot = (slot) => photos.filter((p) => (p.slot || "yard") === slot);
  const hero = bySlot("hero")[0];
  if (hero) $(".log").style.setProperty("--img", `url("${hero.src.replace(/"/g, "%22")}")`), $(".log").classList.add("log--photo");
  const mill = bySlot("mill")[0];
  if (mill) { const img = $('[data-slot="mill"] img'); img.src = mill.src; img.alt = mill.alt || "The mill at work"; }
  const gallery = $("[data-gallery]");
  const yard = bySlot("yard");
  gallery.innerHTML = yard.length
    ? yard.map((p) => `<figure data-reveal><img src="${esc(p.src)}" alt="${esc(p.alt || p.caption || "From the slab yard")}" loading="lazy" decoding="async">${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ""}</figure>`).join("")
    : `<div class="yard__empty"><div><p class="eyebrow">By appointment</p><b>Walk the stacks.</b><span>Slabs are stickered under cover across the yard, from fresh-milled to kiln-dry. Call or text and come pick yours.</span><a class="btn" href="tel:+18086479523">808 647 9523</a></div></div>`;

  /* ---------- reveal ---------- */
  $$(".head, .service, .wood, .trace__list li, .faq details, .mill__text > *, .specs div").forEach((el) => el.setAttribute("data-reveal", ""));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  $$("[data-reveal]").forEach((el) => (reduced ? el.classList.add("is-in") : io.observe(el)));

  /* ---------- nav ---------- */
  const nav = $(".nav"); let lastY = 0;
  const onScroll = (y) => { nav.classList.toggle("is-solid", y > 40); nav.classList.toggle("is-hidden", y > 300 && y > lastY); lastY = y; };

  if (reduced || !window.gsap || !window.ScrollTrigger) {
    addEventListener("scroll", () => onScroll(scrollY), { passive: true });
    $(".log").style.setProperty("--gap", "14px");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", ({ scroll }) => onScroll(scroll));
    gsap.ticker.add((t) => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
  } else addEventListener("scroll", () => onScroll(scrollY), { passive: true });
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const el = $(a.getAttribute("href")); if (!el) return;
    e.preventDefault(); lenis ? lenis.scrollTo(el, { duration: 1.6 }) : el.scrollIntoView({ behavior: "smooth" });
  }));

  /* ---------- hero: the saw passes, the log opens into slabs ---------- */
  const log = $(".log");
  const clamp = gsap.utils.clamp(0, 1);
  ScrollTrigger.create({
    trigger: ".hero", start: "top top", end: "bottom bottom", scrub: true,
    onUpdate: ({ progress: p }) => {
      const cut = clamp((p - 0.04) / 0.5);                   // kerf sweeps down the face
      log.style.setProperty("--kerf", `${-4 + cut * 108}%`);
      log.style.setProperty("--kerf-o", cut > 0 && cut < 1 ? 1 : 0);
      const open = clamp((p - 0.42) / 0.5);                  // slabs separate
      log.style.setProperty("--gap", `${open * 26}px`);
      log.style.setProperty("--shift", (open * 10).toFixed(2));
    },
  });
  gsap.from(".hero__copy > *", { y: 40, opacity: 0, duration: 1.4, stagger: 0.12, ease: "expo.out", delay: 0.2 });
  gsap.from(".log", { scale: 0.9, rotate: -6, opacity: 0, duration: 2, ease: "expo.out" });
  gsap.to(".log", { rotate: 4, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: true } });

  /* ---------- parallax ---------- */
  gsap.fromTo(".mill__media img", { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".mill", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.fromTo(".contact__bg", { rotate: -8, scale: 1.1 }, { rotate: 8, scale: 1, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: true } });

  /* ---------- process: pinned horizontal travel ---------- */
  gsap.matchMedia().add("(min-width: 761px)", () => {
    const rail = $(".process__rail");
    const dist = () => Math.max(0, rail.scrollWidth - innerWidth);
    gsap.to(rail, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: ".process", start: "top top", end: () => "+=" + dist(), pin: ".process__pin", scrub: 1, invalidateOnRefresh: true } });
  });
  addEventListener("load", () => ScrollTrigger.refresh());
})();
