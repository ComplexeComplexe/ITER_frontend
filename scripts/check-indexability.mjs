/** Check built HTML, not a second hand-maintained list of sitemap URLs. */
import { readFileSync, existsSync } from 'node:fs';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import pathToRegexpPackage from 'next/dist/compiled/path-to-regexp/index.js';
const { pathToRegexp } = pathToRegexpPackage;

const origin = 'https://www.iteradvisors.com';
const readJson = path => JSON.parse(readFileSync(path, 'utf8'));
const manifest = readJson('.next/prerender-manifest.json');
const routeManifest = readJson('.next/routes-manifest.json');
const nextRedirects = routeManifest.redirects;
const edgeRedirects = readJson('vercel.json').redirects.filter(r => !r.has && !r.missing);
const redirectPatterns = [
  ...edgeRedirects.map(r => pathToRegexp(r.source)),
  ...nextRedirects.filter(r => !r.has && !r.missing).map(r => new RegExp(r.regex)),
];
const redirected = path => redirectPatterns.some(re => re.test(path));
const sitemap = readFileSync('.next/server/app/sitemap.xml.body', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const paths = new Set(urls.map(url => new URL(url).pathname));
const exceptions = new Map([
  ['/politique-cookies', 'Cookie policy linked from the consent interface'],
  ['/en/cookie-policy', 'Cookie policy linked from the consent interface'],
  ['/es/politica-cookies', 'Cookie policy linked from the consent interface'],
]);
const errors = [];
const pages = new Map();
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1];
const normalize = url => url?.replace(/\/$/, '');
function inspectHtml(rawHtml, meta = {}) {
  const html = rawHtml.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)].map(m => m[0]).find(tag => attr(tag, 'rel') === 'canonical');
  const canonical = canonicalTag && attr(canonicalTag, 'href');
  const noindex = [...html.matchAll(/<meta\b[^>]*>/gi)].some(m => /^(robots|googlebot)$/i.test(attr(m[0], 'name') ?? '') && /noindex/i.test(attr(m[0], 'content') ?? ''))
    || /noindex/i.test(meta.headers?.['x-robots-tag'] ?? '');
  return { canonical, indexable: (meta.status ?? 200) === 200 && !noindex, html };
}
for (const path of Object.keys(manifest.routes)) {
  const file = `.next/server/app${path === '/' ? '/index' : path}.html`;
  if (!existsSync(file) || redirected(path)) continue;
  const metaFile = file.replace(/\.html$/, '.meta');
  const meta = existsSync(metaFile) ? readJson(metaFile) : {};
  const page = inspectHtml(readFileSync(file, 'utf8'), meta);
  pages.set(path, page);
  if (page.indexable && normalize(page.canonical) === normalize(origin + path) && !paths.has(path) && !exceptions.has(path)) {
    errors.push(`Published canonical missing from sitemap: ${path}`);
  }
}
// Some CMS-backed pages render on demand. Verify their actual HTTP response
// with the production server instead of exempting them from validation.
const dynamicPaths = [...paths].filter(path => !pages.has(path) && !redirected(path));
if (dynamicPaths.length) {
  const reservation = createServer();
  await new Promise((resolve, reject) => { reservation.once('error', reject); reservation.listen(0, '127.0.0.1', resolve); });
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Production server startup timed out')), 30000);
      child.on('error', error => { clearTimeout(timer); reject(error); });
      child.on('exit', code => { clearTimeout(timer); reject(new Error(`Production server exited: ${code}`)); });
      child.stdout.on('data', chunk => { if (chunk.toString().includes('Ready')) { clearTimeout(timer); resolve(); } });
    });
    await Promise.all(dynamicPaths.map(async path => {
      const response = await fetch(`http://127.0.0.1:${port}${path}`, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
      pages.set(path, inspectHtml(await response.text(), { status: response.status, headers: Object.fromEntries(response.headers) }));
    }));
  } finally { child.kill('SIGTERM'); }
}
if (urls.length !== new Set(urls).size) errors.push('Duplicate sitemap URLs');
for (const url of urls) {
  const parsed = new URL(url);
  const path = parsed.pathname;
  if (parsed.origin !== origin || parsed.search || parsed.hash) errors.push(`Invalid sitemap URL: ${url}`);
  if (redirected(path)) errors.push(`Redirect in sitemap: ${path}`);
  const page = pages.get(path);
  if (!page) errors.push(`Sitemap URL has no built HTML: ${path}`);
  else if (!page.indexable || normalize(page.canonical) !== normalize(url)) errors.push(`Non-indexable or non-canonical sitemap URL: ${path}`);
}
// Published tools must be reachable through real HTML links from their hub.
const hub = pages.get('/ressources/outils')?.html ?? '';
for (const path of paths) {
  if (path.startsWith('/ressources/outils/') && !hub.includes(`href="${path}"`)) {
    errors.push(`Tool missing from hub navigation: ${path}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Indexability OK: ${urls.length} sitemap URLs, ${pages.size} built pages, explicit legal-page exceptions, linked tool catalog.`);
