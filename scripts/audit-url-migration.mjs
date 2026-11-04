/** Live regression guard for the 103 approved November URL migrations. */
import { readFileSync } from 'node:fs';
const base = (process.argv[2] ?? 'http://127.0.0.1:3100').replace(/\/$/, '');
const migrations = JSON.parse(readFileSync(new URL('../lib/url-migration-2026-11.json', import.meta.url), 'utf8'));
const failures = [];
const items = Object.entries(migrations);
const query = '?utm_source=url-migration&check=1';
for (let index = 0; index < items.length; index += 6) {
  await Promise.all(items.slice(index, index + 6).map(async ([old, current]) => {
    try {
      const redirect = await fetch(base + old + query, { redirect: 'manual' });
      const location = redirect.headers.get('location');
      const target = location ? new URL(location, base) : null;
      if (redirect.status !== 301 || !target || target.pathname !== current || target.search !== query) failures.push({ old, status: redirect.status, location });
      const page = await fetch(base + current, { redirect: 'manual' });
      const html = await page.text();
      for (const [, raw] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
        const scan = value => {
          if (value && typeof value === 'object') return Object.values(value).forEach(scan);
          if (typeof value !== 'string' || !value.startsWith('https://www.iteradvisors.com/')) return;
          const path = new URL(value).pathname;
          if (path in migrations || path.startsWith('/en/ressources/') || path.startsWith('/es/services/')) failures.push({ current, staleSchemaUrl: value });
        };
        scan(JSON.parse(raw));
      }
      const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
      if (page.status !== 200 || canonical !== 'https://www.iteradvisors.com' + current) failures.push({ current, status: page.status, canonical });
    } catch (error) { failures.push({ old, error: String(error) }); }
  }));
}
console.log(JSON.stringify({ migrations: items.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
