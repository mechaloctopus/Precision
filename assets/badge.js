/* Precision Solutions — shared credit badge for every project in the Archive.
   Add one line to a project's HTML:
   <script src="https://mechaloctopus.github.io/Precision/assets/badge.js" data-work="PROJECT_ID" defer></script>
   Optional: data-position="right" (default left), data-theme="light" (default dark). */
(() => {
  const me = document.currentScript;
  if (!me || window.__precisionBadge) return;
  window.__precisionBadge = true;
  const id = me.dataset.work || "";
  const right = me.dataset.position === "right";
  const light = me.dataset.theme === "light";
  const href = "https://mechaloctopus.github.io/Precision/works.html" + (id ? "#" + encodeURIComponent(id) : "");
  const mount = () => {
    const host = document.createElement("div");
    host.setAttribute("data-precision-badge", "");
    const root = host.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        a { position: fixed; ${right ? "right" : "left"}: 14px; bottom: 14px; z-index: 2147483000;
            display: flex; align-items: center; gap: 8px; padding: 7px 12px 7px 8px; border-radius: 100px;
            font: 500 10px/1 system-ui, -apple-system, "Segoe UI", sans-serif; letter-spacing: .16em; text-transform: uppercase;
            text-decoration: none; color: ${light ? "#14120f" : "#ece6da"};
            background: ${light ? "rgba(243,238,229,.86)" : "rgba(12,11,9,.72)"};
            border: 1px solid ${light ? "rgba(12,11,9,.14)" : "rgba(236,230,218,.16)"};
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            opacity: .78; transition: opacity .3s, transform .3s; }
        a:hover, a:focus-visible { opacity: 1; transform: translateY(-1px); outline: none; }
        svg { width: 18px; height: 18px; flex: none; color: #b6976b; }
        @media print { a { display: none; } }
      </style>
      <a href="${href}" target="_blank" rel="noopener" aria-label="A Precision Solutions work — see the Archive">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="10" aria-hidden="true">
          <circle cx="100" cy="100" r="90"/><path d="M84 140V60h22c14 0 23 8 23 21s-9 21-23 21H84" stroke-linecap="square"/>
        </svg>
        <span>A Precision Solutions work</span>
      </a>`;
    document.body.appendChild(host);
  };
  document.body ? mount() : addEventListener("DOMContentLoaded", mount);
})();
