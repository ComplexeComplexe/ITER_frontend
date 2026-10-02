"""HTTP checks for reviewed locale trios. No browser or visual conclusions.

Export routes with node --import tsx from locale-publication.ts, then pass
--routes JSON --base URL --output JSON. Requires beautifulsoup4.
"""
import argparse
import concurrent.futures
import json
import re
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from bs4 import BeautifulSoup


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


parser = argparse.ArgumentParser()
parser.add_argument("--base", required=True)
parser.add_argument("--routes", required=True)
parser.add_argument("--output", required=True)
args = parser.parse_args()
origin = "https://www.iteradvisors.com"
def public_url(path):
    # Next metadata serialises an origin without its optional root slash.
    return origin if path == "/" else origin + path
clusters = json.loads(Path(args.routes).read_text())
opener = urllib.request.build_opener(NoRedirect)


def get(path):
    try:
        with opener.open(args.base.rstrip("/") + path, timeout=30) as response:
            body = response.read()
            # Linked ZIP exercises are binary; only HTML/text bodies need parsing.
            content_type = response.headers.get_content_type()
            html = body.decode(response.headers.get_content_charset() or "utf-8") if content_type.startswith("text/") or content_type in ("application/xhtml+xml", "application/json", "application/xml") else ""
            return response.status, html, {key.title(): value for key, value in response.headers.items()}
    except urllib.error.HTTPError as error:
        return error.code, error.read().decode("utf-8"), {key.title(): value for key, value in error.headers.items()}


def inspect(target):
    cluster, locale, path = target
    status, html, headers = get(path)
    soup = BeautifulSoup(html, "html.parser")
    errors = []
    if status != 200:
        errors.append("HTTP %s" % status)
    canonical = soup.select_one('link[rel="canonical"]')
    if not canonical or canonical.get("href") != public_url(path):
        errors.append("Canonical mismatch")
    if not soup.html or soup.html.get("lang") != locale:
        errors.append("HTML language mismatch")
    for tag in soup.select('meta[name="robots"], meta[name="googlebot"]'):
        if "noindex" in tag.get("content", ""):
            errors.append("Unexpected noindex")
    if "noindex" in headers.get("X-Robots-Tag", ""):
        errors.append("Unexpected noindex header")
    main = soup.select_one("main") or soup
    if len(main.select("h1")) != 1:
        errors.append("H1 count mismatch")
    if not soup.title or not soup.title.get_text(strip=True):
        errors.append("Missing title")
    description = soup.select_one('meta[name="description"]')
    if not description or not description.get("content"):
        errors.append("Missing description")
    alternates = {tag.get("hreflang"): tag.get("href") for tag in soup.select('link[rel="alternate"][hreflang]')}
    expected = {"fr": public_url(cluster["paths"]["fr"]), "en": public_url(cluster["paths"]["en"]), "es": public_url(cluster["paths"]["es"]), "x-default": public_url(cluster["paths"]["fr"])}
    actual = {key.split("-")[0] if key != "x-default" else key: value for key, value in alternates.items()}
    if actual != expected:
        errors.append("Hreflang mismatch: %s" % actual)
    for tag in soup.select('script[type="application/ld+json"]'):
        try:
            json.loads(tag.get_text())
        except (ValueError, TypeError):
            errors.append("Invalid JSON-LD")
    for tag in main.select("script, style"):
        tag.decompose()
    text = " ".join(main.get_text(" ", strip=True).split())
    if re.search(r"\boutsourced CFO\b|timeshare CFO|Wirtschaftspr", text, re.I):
        errors.append("Unreviewed terminology")
    links = []
    fragments = []
    for tag in soup.select("a[href]"):
        href = tag["href"]
        parsed = urllib.parse.urlsplit(href)
        if parsed.scheme and parsed.netloc != "www.iteradvisors.com":
            continue
        if not href.startswith("/") and not href.startswith(origin) and not href.startswith("#"):
            continue
        destination = parsed.path or path
        if destination not in links:
            links.append(destination)
        if parsed.fragment and destination == path and not soup.find(id=parsed.fragment):
            fragments.append(href)
    return {"pageId": cluster["id"], "locale": locale, "path": path, "status": status,
            "title": soup.title.get_text() if soup.title else "", "words": len(text.split()),
            "blocks": [tag.get("data-block-key") for tag in main.select("[data-block-key]")],
            "h2Count": len(main.select("h2")), "canonical": canonical.get("href") if canonical else None,
            "alternates": alternates, "errors": errors, "links": links, "missingFragments": fragments}


targets = [(cluster, locale, path) for cluster in clusters for locale, path in cluster["paths"].items()]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    pages = list(pool.map(inspect, targets))
all_links = sorted(set(path for page in pages for path in page["links"]))


def inspect_link(path):
    status, _, headers = get(path)
    return {"path": path, "status": status, "location": headers.get("Location")}


with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    links = list(pool.map(inspect_link, all_links))
issues = [{"path": page["path"], "errors": page["errors"]} for page in pages if page["errors"]]
for cluster in clusters:
    trio = [page for page in pages if page["pageId"] == cluster["id"]]
    if any(page["blocks"] != trio[0]["blocks"] or page["h2Count"] != trio[0]["h2Count"] for page in trio):
        issues.append({"pageId": cluster["id"], "errors": ["Trio block order or H2 count differs"]})
link_issues = [link for link in links if link["status"] != 200]
result = {"base": args.base, "visualReview": False, "trios": len(clusters), "pageCount": len(pages), "linkCount": len(links),
          "issues": issues, "linkIssues": link_issues, "pages": pages, "links": links}
output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(result, ensure_ascii=False, indent=2))
print(json.dumps({"trios": len(clusters), "pages": len(pages), "links": len(links), "issues": issues, "linkIssues": link_issues}, ensure_ascii=False))
raise SystemExit(bool(issues or link_issues))
