/**
 * Hreflang reciprocity & validity audit (CC-15).
 *
 * Crawls the public sitemap, fetches each URL, extracts every
 * <link rel="alternate" hreflang="..." href="..."> from <head>, and reports:
 *   - missing reciprocity (A says B is its EN alternate, but B doesn't say A is its FR)
 *   - hreflang pointing to a 4xx or following a 3xx
 *   - missing x-default
 *   - duplicate hreflang values on the same page
 *
 * Usage:
 *   npx tsx scripts/audit-hreflang.ts                 # audit production
 *   BASE=https://iter-frontend-fawn.vercel.app \
 *     npx tsx scripts/audit-hreflang.ts               # audit a preview
 *   LIMIT=20 npx tsx scripts/audit-hreflang.ts        # cap pages crawled
 *
 * Output: prints a JSON report and exits 1 if any error is found.
 */

const BASE = process.env.BASE ?? "https://www.iteradvisors.com";
const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : Infinity;
const CONCURRENCY = 5;
const PUBLIC = "https://www.iteradvisors.com";
const normalize = (url: string) => url.replace(/\/$/, "");
const fetchUrl = (url: string) => `${BASE}${new URL(url).pathname}`;
const sitemapAlternates = new Map<string, HreflangEntry[]>();
const attribute = (tag: string, name: string) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1];

type HreflangEntry = { hreflang: string; href: string };
type PageReport = {
  url: string;
  status: number;
  alternates: HreflangEntry[];
  hasXDefault: boolean;
  noindex?: boolean;
  canonical?: string;
};
type Issue = {
  url: string;
  kind:
    | "fetch_error"
    | "missing_x_default"
    | "duplicate_hreflang"
    | "no_reciprocity"
    | "broken_target"
    | "redirect_target"
    | "noindex_target"
    | "non_self_canonical"
    | "html_xml_mismatch"
    | "missing_self_reference"
    | "inconsistent_cluster";
  detail: string;
};

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`sitemap.xml returned ${res.status}`);
  }
  const xml = await res.text();
  for (const [block] of xml.matchAll(/<url>[\s\S]*?<\/url>/g)) {
    const url = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (url) sitemapAlternates.set(normalize(url), extractHreflang(block.replaceAll("xhtml:link", "link")));
  }
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) =>
    normalize(m[1].trim()),
  );
  // Dedupe and cap
  const unique = Array.from(new Set(urls));
  return unique.slice(0, LIMIT);
}

function extractHreflang(html: string): HreflangEntry[] {
  // <link rel="alternate" hreflang="fr" href="https://..."> in any attr order
  const out: HreflangEntry[] = [];
  const linkRegex = /<link\s+([^>]*?)\s*\/?>/gi;
  for (const m of html.matchAll(linkRegex)) {
    const attrs = m[1];
    if (!/rel\s*=\s*["']alternate["']/i.test(attrs)) continue;
    const hreflangMatch = attrs.match(/hreflang\s*=\s*["']([^"']+)["']/i);
    const hrefMatch = attrs.match(/href\s*=\s*["']([^"']+)["']/i);
    if (hreflangMatch && hrefMatch) {
      out.push({ hreflang: hreflangMatch[1], href: hrefMatch[1] });
    }
  }
  return out;
}

async function fetchPageReport(url: string): Promise<PageReport | { url: string; error: string }> {
  try {
    if (new URL(url).origin !== PUBLIC) throw new Error(`Unexpected target domain: ${url}`);
    const res = await fetch(fetchUrl(url), { redirect: "manual", signal: AbortSignal.timeout(30000) });
    if (res.status >= 300 && res.status < 400) {
      return { url, status: res.status, alternates: [], hasXDefault: false };
    }
    if (!res.ok) {
      return { url, status: res.status, alternates: [], hasXDefault: false };
    }
    const html = (await res.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const alternates = extractHreflang(html);
    const hasXDefault = alternates.some((a) => a.hreflang === "x-default");
    const canonical = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]).find(tag => attribute(tag, "rel") === "canonical");
    const noindex = /noindex/i.test(res.headers.get("x-robots-tag") ?? "") || [...html.matchAll(/<meta\b[^>]*>/gi)].some(([tag]) => /^(robots|googlebot)$/i.test(attribute(tag, "name") ?? "") && /noindex/i.test(attribute(tag, "content") ?? ""));
    return { url, status: res.status, alternates, hasXDefault, canonical: canonical && attribute(canonical, "href"), noindex };
  } catch (e) {
    return { url, error: e instanceof Error ? e.message : String(e) };
  }
}

async function pMap<T, R>(items: T[], n: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const ret: R[] = new Array(items.length);
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (true) {
        const idx = i++;
        if (idx >= items.length) return;
        ret[idx] = await fn(items[idx]);
      }
    }),
  );
  return ret;
}

async function main() {
  console.error(`Auditing hreflang on ${BASE} (limit=${LIMIT}, concurrency=${CONCURRENCY})…`);

  const urls = await fetchSitemapUrls();
  console.error(`Found ${urls.length} URLs in sitemap.`);

  const reports = await pMap(urls, CONCURRENCY, fetchPageReport);

  const issues: Issue[] = [];
  // Build a fast lookup: url -> set of hreflang targets
  const byUrl = new Map<string, PageReport>();
  for (const r of reports) {
    if ("error" in r) {
      issues.push({ url: r.url, kind: "fetch_error", detail: r.error });
      continue;
    }
    byUrl.set(normalize(r.url), r);
  }

  const missing = [...new Set([...byUrl.values()].flatMap(r => r.alternates.map(a => normalize(a.href))))].filter(url => !byUrl.has(url));
  for (const r of await pMap(missing, CONCURRENCY, fetchPageReport)) {
    if ("error" in r) issues.push({ url: r.url, kind: "fetch_error", detail: r.error });
    else byUrl.set(normalize(r.url), r);
  }
  const valid = Array.from(byUrl.values());
  const signature = (entries: HreflangEntry[]) => JSON.stringify(entries.map(a => [a.hreflang, normalize(a.href)]).sort());
  for (const r of valid) {
    if (r.status !== 200) issues.push({ url: r.url, kind: "broken_target", detail: `HTTP ${r.status}` });
    if (r.noindex) issues.push({ url: r.url, kind: "noindex_target", detail: "Excluded from indexation" });
    if (normalize(r.canonical ?? "") !== normalize(r.url)) issues.push({ url: r.url, kind: "non_self_canonical", detail: r.canonical ?? "missing" });
    if (sitemapAlternates.has(normalize(r.url)) && signature(r.alternates) !== signature(sitemapAlternates.get(normalize(r.url))!)) issues.push({ url: r.url, kind: "html_xml_mismatch", detail: "HTML and sitemap language sets differ" });
    const pathname = new URL(r.url).pathname;
    const ownLanguage = /^\/en(?:\/|$)/.test(pathname) ? "en-GB" : /^\/es(?:\/|$)/.test(pathname) ? "es-ES" : "fr-FR";
    if (r.alternates.length && !r.alternates.some(a => a.hreflang === ownLanguage && normalize(a.href) === normalize(r.url))) issues.push({ url: r.url, kind: "missing_self_reference", detail: ownLanguage });
  }

  // 1. Missing x-default
  for (const r of valid) {
    if (r.alternates.length > 0 && !r.hasXDefault) {
      issues.push({ url: r.url, kind: "missing_x_default", detail: "no <link rel=alternate hreflang=x-default>" });
    }
  }

  // 2. Duplicate hreflang on same page
  for (const r of valid) {
    const seen = new Map<string, string>();
    for (const a of r.alternates) {
      if (seen.has(a.hreflang)) {
        issues.push({
          url: r.url,
          kind: "duplicate_hreflang",
          detail: `${a.hreflang} → ${seen.get(a.hreflang)} AND → ${a.href}`,
        });
      }
      seen.set(a.hreflang, a.href);
    }
  }

  // 3. Reciprocity: A says hreflang=en href=B → B must say hreflang=fr href=A
  //    (and so on for the other locales)
  for (const r of valid) {
    for (const a of r.alternates) {
      if (a.hreflang === "x-default") continue;
      const target = byUrl.get(normalize(a.href));
      if (!target) continue; // target might be outside our crawl set
      const reverse = target.alternates.find((x) => normalize(x.href) === normalize(r.url));
      if (!reverse) {
        issues.push({
          url: r.url,
          kind: "no_reciprocity",
          detail: `${r.url} → hreflang=${a.hreflang} → ${a.href}, but reverse missing`,
        });
      }
      if (signature(target.alternates) !== signature(r.alternates)) issues.push({ url: r.url, kind: "inconsistent_cluster", detail: `Cluster differs at ${a.href}` });
    }
  }

  // 4. Every target was fetched above, including alternates outside the sitemap.
  const distinctTargets = new Set<string>();
  for (const r of valid) for (const a of r.alternates) distinctTargets.add(a.href);
  const statusByUrl = new Map([...distinctTargets].map(url => [url, byUrl.get(normalize(url))?.status ?? 0]));
  for (const r of valid) {
    for (const a of r.alternates) {
      const s = statusByUrl.get(a.href);
      if (s === undefined) continue;
      if (s === 0 || s >= 400) {
        issues.push({ url: r.url, kind: "broken_target", detail: `hreflang=${a.hreflang} → ${a.href} returned ${s}` });
      } else if (s >= 300 && s < 400) {
        issues.push({ url: r.url, kind: "redirect_target", detail: `hreflang=${a.hreflang} → ${a.href} returned ${s}` });
      }
    }
  }

  const summary = {
    base: BASE,
    pagesCrawled: valid.length,
    distinctHreflangTargets: distinctTargets.size,
    issuesByKind: issues.reduce<Record<string, number>>((acc, i) => {
      acc[i.kind] = (acc[i.kind] ?? 0) + 1;
      return acc;
    }, {}),
    issues,
    pages: valid,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (issues.length > 0) {
    console.error(`\n❌ ${issues.length} hreflang issue(s) detected.`);
    process.exit(1);
  } else {
    console.error("\n✅ No hreflang issues detected.");
  }
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(2);
});
