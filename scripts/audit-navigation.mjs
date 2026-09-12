/** Check rendered section links and localized contact journeys across the sitemap.
 * Usage: node scripts/audit-navigation.mjs https://www.iteradvisors.com
 */
const base = process.argv[2] ?? "http://localhost:3100";
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap: ${sitemapResponse.status}`);
const paths = [...(await sitemapResponse.text()).matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1]).pathname);
const failures = [];
let sectionLinks = 0;
let contactLinks = 0;
const requiredLinks = new Map([
  ["/ressources/blog/tableau-de-bord-financier-startup-12-kpis", "/services/controle-de-gestion-externalise"],
  ["/ressources/ia-finance/automatiser-reporting-financier", "/services/controle-de-gestion-externalise"],
  ["/ressources/cas-clients/seasonly-marge-par-canal-bfr", "/services/controle-de-gestion-externalise"],
  ["/ressources/blog/reduire-bfr-7-leviers-actionnables", "/services/previsionnel-tresorerie"],
]);
const pending = [...paths];
await Promise.all(Array.from({ length: 5 }, async () => {
  while (pending.length) {
    const path = pending.shift();
    try {
      const response = await fetch(base + path, { redirect: "manual" });
      if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
      const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].map(m => m[1]);
      const locale = path.match(/^\/(en|es)(?:\/|$)/)?.[1];
      for (const href of new Set(anchors)) {
        if (href.startsWith("#") && href.length > 1) {
          sectionLinks++;
          if (!ids.has(decodeURIComponent(href.slice(1)))) failures.push(`${path}: missing ${href}`);
        }
        if (locale && /^\/(?:en\/|es\/)?contact(?:[?#]|$)/.test(href)) {
          contactLinks++;
          if (!href.startsWith(`/${locale}/contact`)) failures.push(`${path}: wrong contact locale ${href}`);
        }
      }
      const required = requiredLinks.get(path);
      // Require a contextual link, rather than counting the global footer.
      const body = html.split(/<footer\b/)[0];
      if (required && !body.includes(`href="${required}"`)) failures.push(`${path}: missing contextual link ${required}`);
      if (path === "/daf-externalise/transition") {
        const faqs = [...html.matchAll(/<h2\b[^>]*>FAQ[^<]*<\/h2>/gi)];
        if (faqs.length !== 1) failures.push(`${path}: expected one FAQ, found ${faqs.length}`);
      }
    } catch (error) {
      failures.push(`${path}: ${error.message}`);
    }
  }
}));
console.log(JSON.stringify({ pages: paths.length, sectionLinks, contactLinks, failures }, null, 2));
if (failures.length) process.exitCode = 1;
