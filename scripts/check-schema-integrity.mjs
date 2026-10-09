import fs from 'node:fs';
import path from 'node:path';
const site = 'https://www.iteradvisors.com';
const root = '.next/server/app';
const urls = [...fs.readFileSync(`${root}/sitemap.xml.body`, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
function* nodes(value) {
  if (Array.isArray(value)) { for (const item of value) yield* nodes(item); }
  else if (value && typeof value === 'object') { yield value; for (const item of Object.values(value)) yield* nodes(item); }
}
const errors = [], skipped = [], people = new Map();
let checked = 0, articles = 0, services = 0, profiles = 0, prices = 0;
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = path.join(root, pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`);
  if (!fs.existsSync(file)) { skipped.push(pathname); continue; }
  checked++;
  const html = fs.readFileSync(file, 'utf8');
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  for (const node of nodes(schemas)) {
    const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
    const fail = message => errors.push(`${pathname}: ${message}`);
    if (types.includes('ProfessionalService')) fail('deprecated ProfessionalService');
    if (types.includes('Person') && node.name && node['@id']) {
      if (!people.has(node.name)) people.set(node.name, new Set());
      people.get(node.name).add(node['@id']);
    }
    if (types.includes('ProfilePage')) {
      profiles++;
      if (node.dateModified && !/T.*(?:Z|[+-]\d\d:\d\d)$/.test(node.dateModified)) fail('profile date lacks time or timezone');
    }
    if (types.includes('Service')) {
      services++;
      if (!node['@id']) fail('service lacks ID');
      if (node.provider?.['@id'] !== `${site}/#organization`) fail('service provider lacks canonical organization');
      if (node.inLanguage) fail('inLanguage belongs on the page, not Service');
    }
    if ((types.includes('Article') || types.includes('BlogPosting')) && node.headline) {
      articles++;
      if (!node['@id'] || !node.inLanguage) fail('full article lacks identity or language');
      if (node.publisher?.['@id'] !== `${site}/#organization`) fail('article publisher lacks canonical organization');
      if (node.author?.name === 'Iter Advisors' && node.author['@id'] !== `${site}/#organization`) fail('cabinet author lacks canonical organization');
    }
    if (types.includes('UnitPriceSpecification')) {
      prices++;
      if (node.price !== undefined || !(Number(node.maxPrice) > Number(node.minPrice)) || node.valueAddedTaxIncluded !== false || node.priceCurrency !== 'EUR' || !node.unitText) fail('invalid indicative VAT-exclusive range');
    }
    if (node.aggregateRating || node.reviewRating) fail('unexpected rating');
  }
}
for (const [name, ids] of people) if (ids.size > 1) errors.push(`${name}: fragmented identity (${[...ids].join(', ')})`);
const result = { checked, sitemapUrls: urls.length, articles, services, profiles, prices, people: people.size, skipped, errors };
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
