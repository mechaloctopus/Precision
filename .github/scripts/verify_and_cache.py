"""Verify every external photo, film and link the site uses, and cache the photos locally.

Runs in GitHub Actions (which has the internet access the authoring sandbox lacks):
  - downloads each Unsplash photo referenced by the pages, saves a resized WebP
    copy in assets/photos/<id>.webp, and records whether it loaded;
  - checks each YouTube film exists and is embeddable, caching its thumbnail;
  - checks every outbound link and the live GitHub Pages URLs.
Writes assets/photos/report.json and a human summary to the job log.
"""
import io, json, os, re, sys, time
import requests
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "assets", "photos")
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "precision-site-cache/1.0 (+https://mechaloctopus.github.io/Precision/)"}
read = lambda p: open(os.path.join(ROOT, p), encoding="utf8").read()

pages = {p: read(p) for p in ["index.html", "works.html", "slabworx/index.html", "404.html"]}
data = read("assets/js/works-data.js")

# ---------- photos ----------
ids = set()
for html in pages.values():
    for m in re.findall(r'data-(?:src|preview)="([^"]+)"', html):
        ids.update(x.strip() for x in m.split(","))
for m in re.findall(r'photos: "([^"]+)"', data):
    ids.update(x.strip() for x in m.split(","))
remote = sorted(i for i in ids if i and "/" not in i and not i.startswith("local:"))

KEY = os.environ.get("UNSPLASH_ACCESS_KEY", "").strip()


def resolve(pid):
    """Return the image URL for a photo reference, using only official Unsplash channels.

    photo-… references are already images.unsplash.com CDN paths. Short photo IDs are
    resolved through the Unsplash API (needs UNSPLASH_ACCESS_KEY), which also registers
    the download as the API guidelines require."""
    if pid.startswith("photo-"):
        return f"https://images.unsplash.com/{pid}?auto=format&fit=crop&w=2000&q=80&fm=jpg", {}
    if not KEY:
        return None, {"needs": "UNSPLASH_ACCESS_KEY"}
    meta = requests.get(f"https://api.unsplash.com/photos/{pid}", params={"client_id": KEY}, timeout=30)
    if not meta.ok:
        return None, {"api_status": meta.status_code}
    j = meta.json()
    loc = (j.get("links") or {}).get("download_location")
    if loc:
        requests.get(loc, params={"client_id": KEY}, timeout=30)
    info = {"photographer": (j.get("user") or {}).get("name"), "page": (j.get("links") or {}).get("html"), "alt": j.get("alt_description")}
    return j["urls"]["raw"] + "&auto=format&fit=crop&w=2000&q=80&fm=jpg", info


report = {"photos": {}, "films": {}, "links": {}}
for pid in remote:
    entry = {}
    try:
        url, info = resolve(pid)
        entry.update(info)
        if not url:
            entry["ok"] = False
            report["photos"][pid] = entry
            continue
        entry["url"] = url
        r = requests.get(url, headers=UA, timeout=60, allow_redirects=True)
        entry.update(status=r.status_code, final=r.url[:160], type=r.headers.get("content-type", ""))
        if r.ok and r.headers.get("content-type", "").startswith("image/"):
            im = Image.open(io.BytesIO(r.content)).convert("RGB")
            if im.width > 2000:
                im = im.resize((2000, round(2000 * im.height / im.width)), Image.LANCZOS)
            im.save(os.path.join(OUT, f"{pid}.webp"), quality=78, method=6)
            entry.update(ok=True, size=list(im.size))
        else:
            entry["ok"] = False
    except Exception as e:  # noqa: BLE001
        entry.update(ok=False, error=str(e)[:200])
    report["photos"][pid] = entry
    time.sleep(0.3)

# ---------- films ----------
for yid in sorted(set(re.findall(r'data-yt="([^"]+)"', pages["index.html"]))):
    e = {}
    try:
        o = requests.get("https://www.youtube.com/oembed", params={"url": f"https://www.youtube.com/watch?v={yid}", "format": "json"}, headers=UA, timeout=30)
        e["oembed_status"] = o.status_code
        if o.ok:
            j = o.json(); e.update(title=j.get("title"), author=j.get("author_name"))
        t = requests.get(f"https://i.ytimg.com/vi/{yid}/hqdefault.jpg", headers=UA, timeout=30)
        if t.ok:
            Image.open(io.BytesIO(t.content)).convert("RGB").save(os.path.join(OUT, f"yt-{yid}.webp"), quality=78, method=6)
            e["thumb"] = True
    except Exception as ex:  # noqa: BLE001
        e["error"] = str(ex)[:200]
    report["films"][yid] = e

# ---------- links ----------
links = set()
for html in pages.values():
    links.update(re.findall(r'href="(https?://[^"]+)"', html))
links.update(re.findall(r'url: "(https?://[^"]+)"', data))
links.update(["https://mechaloctopus.github.io/Precision/", "https://mechaloctopus.github.io/Precision/works.html",
              "https://mechaloctopus.github.io/Precision/slabworx/", "https://mechaloctopus.github.io/Precision/assets/badge.js",
              "https://mechaloctopus.github.io/Precision/assets/meta/og-home.jpg"])
for u in sorted(links):
    try:
        r = requests.get(u, headers=UA, timeout=30, allow_redirects=True)
        report["links"][u] = {"status": r.status_code, "final": r.url[:160]}
    except Exception as e:  # noqa: BLE001
        report["links"][u] = {"status": None, "error": str(e)[:160]}

json.dump(report, open(os.path.join(OUT, "report.json"), "w"), indent=1)

# the site serves these from assets/photos/ instead of a third-party host
cached = sorted(f[:-5] for f in os.listdir(OUT) if f.endswith(".webp"))
with open(os.path.join(OUT, "cached.js"), "w") as fh:
    fh.write("/* Generated by .github/scripts/verify_and_cache.py: photos and film stills served locally. */\n")
    fh.write("window.PRECISION_CACHED = " + json.dumps(cached) + ";\n")

ok = sum(1 for v in report["photos"].values() if v.get("ok"))
lines = [f"PHOTOS {ok}/{len(report['photos'])} loaded"]
lines += [f"  FAIL {k}: {v.get('needs') or v.get('api_status') or v.get('status')} {v.get('type','')} {v.get('error','')}" for k, v in report["photos"].items() if not v.get("ok")]
lines += ["FILMS"] + [f"  {k}: {v.get('oembed_status')} {v.get('title')} / {v.get('author')}" for k, v in report["films"].items()]
lines += ["LINKS"] + [f"  {v.get('status')} {k}" + (f" -> {v.get('final')}" if v.get('final') and v.get('final') != k else "") for k, v in report["links"].items()]
text = "\n".join(lines)
print(text)
if os.environ.get("GITHUB_STEP_SUMMARY"):
    open(os.environ["GITHUB_STEP_SUMMARY"], "a").write("```\n" + text + "\n```\n")
