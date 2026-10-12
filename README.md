# Precision Solutions LLC

Static site: `index.html`, `works.html` + `assets/`. No build step. Served by GitHub Pages from the repository root.

- `assets/css/site.css`, `assets/js/site.js`: styles and interactions shared by both pages (GSAP + ScrollTrigger + Lenis, vendored in `assets/vendor/`)
- `assets/img/`: original material studies (microcement, Venetian plaster, limewash, yakisugi)
- `assets/emblem.svg`: the mark (also inlined in each page as `#emblem`)
- Photos: each `<figure data-src="id1,id2,...">` lists Unsplash photo IDs that are tried in order. To use your own photo, put it in `assets/img/` and list its path first, e.g. `data-src="assets/img/my-fountain.jpg,qrB7Sx319Uw"`.
- Films: `<button class="film" data-yt="VIDEO_ID">` takes any YouTube video ID.

## The Archive (`works.html`)

All content lives at the top of `assets/js/works.js`:

- `PRECISION_WORKS`: one object per digital project (title, tagline, about, features, stack, links, status). `shot` names a screenshot in `assets/works/` (`.webp`); `frame` is `"browser"` or `"phone"`. With no `shot`, the card draws a generative cover from `art` (`stars`, `hex`, `waves`, `wheel`, `rings`, `aperture`, `grid`, `magic`, `layers`, `pixels`, `pages`) in the project's `accent` colour.
- `PRECISION_BUILT`: the field-work categories. `photos` is a comma list tried in order; put your own job photos first (e.g. `assets/img/turf-kailua.jpg,wQ7w8Uasls0`).

Cards open a detail panel; `works.html#lensii` links straight to one.
