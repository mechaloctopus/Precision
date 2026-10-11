# Precision Solutions LLC

Static site: `index.html` + `assets/`. No build step. Served by GitHub Pages from the repository root.

- `assets/css/site.css`, `assets/js/site.js`: styles and interactions (GSAP + ScrollTrigger + Lenis, vendored in `assets/vendor/`)
- `assets/img/`: original material studies (microcement, Venetian plaster, limewash, yakisugi)
- `assets/emblem.svg`: the mark (also inlined in `index.html` as `#emblem`)
- Photos: each `<figure data-src="id1,id2,...">` lists Unsplash photo IDs that are tried in order. To use your own photo, put it in `assets/img/` and list its path first, e.g. `data-src="assets/img/my-fountain.jpg,qrB7Sx319Uw"`.
- Films: `<button class="film" data-yt="VIDEO_ID">` takes any YouTube video ID.
