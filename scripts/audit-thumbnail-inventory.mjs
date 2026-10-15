import { writeFile, mkdir } from 'node:fs/promises';
import { decodeHTML } from 'entities';

export const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map(m => [m[1], decodeHTML(m[2])]));
export function inspectHtml(html, path) {
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => attrs(m[0]));
  const meta = name => metas.filter(m => (m.property || m.name) === name).map(m => m.content);
  const jsonld = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => {
    try { const s = JSON.parse(m[1]); return s['@graph'] ?? [s]; } catch { return []; }
  });
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map(m => attrs(m[0]));
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(m => attrs(m[0])).find(m => m.rel === 'canonical')?.href;
  return { path, title: decodeHTML(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ''),
    h1: decodeHTML((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()),
    canonical, robots: meta('robots'), og: meta('og:image'), twitter: meta('twitter:image'),
    ogWidth: meta('og:image:width'), ogHeight: meta('og:image:height'),
    schemas: jsonld.filter(s => /Article|BlogPosting|WebPage/.test(JSON.stringify(s['@type']))).map(s => ({ type: s['@type'], id: s['@id'], image: s.image, primaryImageOfPage: s.primaryImageOfPage })),
    images: images.filter(m => !/logo|avatar|team|trustfolio/i.test(m.src ?? '')).map(m => ({ src: m.src, alt: m.alt, width: m.width, height: m.height, loading: m.loading, fetchpriority: m.fetchpriority })) };
}

if (process.argv[1]?.endsWith('audit-thumbnail-inventory.mjs')) {
  const args = Object.fromEntries(process.argv.slice(2).filter(v => v.includes('=')).map(v => v.replace(/^--/, '').split('=')));
  const origin = args.origin ?? 'https://www.iteradvisors.com';
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(decodeHTML(m[1])).pathname);
  const out = args.out ?? '../audits/iter-thumbnails-2026-10-12/inventory-live.json';
  const results = [];
  let cursor = 0;
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (cursor < paths.length) {
      const path = paths[cursor++];
      try {
        const res = await fetch(origin + path, { signal: AbortSignal.timeout(30000), redirect: 'manual' });
        results.push({ ...inspectHtml(await res.text(), path), status: res.status });
      } catch (error) { results.push({ path, error: String(error) }); }
    }
  }));
  await mkdir(out.slice(0, out.lastIndexOf('/')), { recursive: true });
  await writeFile(out, JSON.stringify({ origin, auditedAt: new Date().toISOString(), pages: results.sort((a,b) => a.path.localeCompare(b.path)) }, null, 2));
  console.log(JSON.stringify({ pages: results.length, failures: results.filter(r => r.status !== 200).length, output: out }));
}
