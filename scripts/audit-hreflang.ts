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
const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : 200;
const CONCURRENCY = 5;

type HreflangEntry = { hreflang: string; href: string };
type PageReport = {
  url: string;
  status: number;
  alternates: HreflangEntry[];
  hasXDefault: boolean;
};
type Issue = {
  url: string;
  kind:
    | "fetch_error"
    | "missing_x_default"
    | "duplicate_hreflang"
    | "no_reciprocity"
    | "broken_target"
    | "redirect_target";
  detail: string;
};

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`sitemap.xml returned ${res.status}`);
  }
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) =>
    m[1].trim(),
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
    const res = await fetch(url, { redirect: "manual" });
    if (res.status >= 300 && res.status < 400) {
      return { url, status: res.status, alternates: [], hasXDefault: false };
    }
    if (!res.ok) {
      return { url, status: res.status, alternates: [], hasXDefault: false };
    }
    const html = await res.text();
    const alternates = extractHreflang(html);
    const hasXDefault = alternates.some((a) => a.hreflang === "x-default");
    return { url, status: res.status, alternates, hasXDefault };
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
    byUrl.set(r.url, r);
  }

  const valid = Array.from(byUrl.values());

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
      if (seen.has(a.hreflang) && seen.get(a.hreflang) !== a.href) {
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
      const target = byUrl.get(a.href);
      if (!target) continue; // target might be outside our crawl set
      const reverse = target.alternates.find((x) => x.href === r.url);
      if (!reverse) {
        issues.push({
          url: r.url,
          kind: "no_reciprocity",
          detail: `${r.url} → hreflang=${a.hreflang} → ${a.href}, but reverse missing`,
        });
      }
    }
  }

  // 4. Broken / redirect targets — fast HEAD on every distinct target
  const distinctTargets = new Set<string>();
  for (const r of valid) for (const a of r.alternates) distinctTargets.add(a.href);
  const targetStatuses = await pMap(Array.from(distinctTargets), CONCURRENCY, async (u) => {
    try {
      const res = await fetch(u, { method: "HEAD", redirect: "manual" });
      return { url: u, status: res.status };
    } catch {
      return { url: u, status: 0 };
    }
  });
  const statusByUrl = new Map(targetStatuses.map((t) => [t.url, t.status]));
  for (const r of valid) {
    for (const a of r.alternates) {
      const s = statusByUrl.get(a.href);
      if (s === undefined) continue;
      if (s >= 400) {
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
