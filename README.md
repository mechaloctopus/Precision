# Precision Solutions LLC

Static site: `index.html`, `works.html`, `404.html` + `assets/`. No build step. Served by GitHub Pages from the repository root.

- `assets/css/site.css`, `assets/js/site.js`: styles and interactions shared by both pages (GSAP + ScrollTrigger + Lenis, vendored in `assets/vendor/`)
- `assets/img/`: original material studies (microcement, Venetian plaster, limewash, yakisugi)
- `assets/emblem.svg`: the mark (also inlined in each page as `#emblem`)
- Photos: each `<figure data-src="id1,id2,...">` lists Unsplash photo IDs that are tried in order. To use your own photo, put it in `assets/img/` and list its path first, e.g. `data-src="assets/img/my-fountain.jpg,qrB7Sx319Uw"`.
- Films: `<button class="film" data-yt="VIDEO_ID">` takes any YouTube video ID.

## The Archive (`works.html`)

All project content lives in `assets/js/works-data.js` (rendering is in `works.js`). The homepage teaser reads the same data: change the IDs in `<div class="teaser" data-works="…">` to feature different projects.

- `PRECISION_WORKS`: one object per digital project (title, tagline, about, features, stack, links, platform, status). Keep to the shared vocabulary so cards read uniformly. Status: Live · Released · Beta · In development · Private · Published · Open source · Pitch · Concept. Link verbs: Open · Read · View (+ Source, Android build). `shot` names a screenshot in `assets/works/` (`.webp`); `frame` is `"browser"` or `"phone"`. With no `shot`, the card draws a generative cover from `art` (`stars`, `hex`, `waves`, `wheel`, `rings`, `aperture`, `grid`, `magic`, `layers`, `pixels`, `pages`) in the project's `accent` colour.
- `PRECISION_BUILT`: the field-work categories. `photos` is a comma list tried in order; put your own job photos first (e.g. `assets/img/turf-kailua.jpg,wQ7w8Uasls0`).

Cards open a detail panel; `works.html#lensii` links straight to one.

## House style

- Chapters are numbered 01–11 and the number is the same in the discipline index, the chapter heading and the menu: 01 Water, 02 Worlds, 03 Wood, 04 Microcement, 05 Plaster & limewash, 06 Yakisugi, 07 Concrete, 08 Sculpture & murals, 09 Outdoor living, 10 Code & machines, 11 Building.
- Other sections carry a plain label (Manifesto, Disciplines, Films, The Archive, Built), never a number.
- Phone is always written `808 647 9523` and linked as `tel:+18086479523`.
- Share images and the home-screen icon live in `assets/meta/`.
