/** Contract for the review journey: one indexable URL, honest evidence, usable sources. */
const base = (process.argv[2] || 'http://127.0.0.1:3100').replace(/\/$/, '');
const origin = 'https://www.iteradvisors.com';
const failures = [];
const check = (ok, reason) => { if (!ok) failures.push(reason); };
const decode = s => s.replace(/&#x([\da-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
const text = s => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const path = '/ressources/outils/pennylane';
const response = await fetch(base + path, { redirect: 'manual' });
const html = await response.text();
const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || '';
const visible = text(main.replace(/<script\b[\s\S]*?<\/script>/g, ''));
const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
const article = schemas.find(s => s['@type'] === 'Article');
check(response.status === 200, 'review-url-must-stay-200');
check(html.includes(`rel="canonical" href="${origin}${path}"`), 'one-self-canonical-review');
check(!/hreflang="(?:en|es)"/.test(html), 'no-alternates-to-nonexistent-translations');
check(article?.headline === text(main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || ''), 'article-matches-visible-headline');
check(!/"(?:reviewRating|aggregateRating|ratingValue)"/.test(html), 'no-undocumented-product-rating');
check(visible.includes('ne sont pas des résultats clients mesurés'), 'documentary-evidence-explicit');
const faqs = schemas.filter(s => s['@type'] === 'FAQPage');
check(faqs.length === 1, 'one-faq');
for (const question of faqs[0]?.mainEntity || []) {
  check(visible.includes(question.name) && visible.includes(question.acceptedAnswer.text), 'faq-content-visible');
}
const ids = new Set([...main.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
for (const anchor of main.matchAll(/href="#([^"]+)"/g)) check(ids.has(anchor[1]), 'broken-review-anchor:' + anchor[1]);
const pricing = main.match(/<section id="tarifs"[\s\S]*?<\/section>/)?.[0] || '';
check(pricing.includes('<caption') && pricing.includes('scope="col"') && pricing.includes('scope="row"'), 'accessible-price-table');
check(text(pricing).includes('5 utilisateurs gestion') && text(pricing).includes('HT') && /\d{4}/.test(text(pricing)), 'price-scope-tax-and-date');
const links = [...main.matchAll(/href="([^"#]+)"/g)].map(m => decode(m[1]));
const internal = [...new Set(links.filter(href => href.startsWith('/')))];
for (const link of internal) check((await fetch(base + link, { redirect: 'manual' })).status === 200, 'internal-target:' + link);
check(links.includes('/ressources/outils/methode'), 'review-links-to-method');
check(links.filter(href => href.startsWith('https://help.pennylane.com/')).length >= 5, 'specific-primary-documentation');
for (const incoming of ['/ressources/outils', '/ressources/outils/logiciels-comptabilite', '/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements']) {
  const source = await (await fetch(base + incoming)).text();
  check(source.includes(`href="${path}"`), 'contextual-incoming-link:' + incoming);
}
const methodResponse = await fetch(base + '/ressources/outils/methode', { redirect: 'manual' });
const method = await methodResponse.text();
check(methodResponse.status === 200 && method.includes(`rel="canonical" href="${origin}/ressources/outils/methode"`), 'method-indexable');
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
check(sitemap.includes(`<loc>${origin}/ressources/outils/methode</loc>`), 'method-in-sitemap');
console.log(JSON.stringify({ base, review: path, internalTargets: internal.length, failures }, null, 2));
process.exitCode = failures.length ? 1 : 0;
