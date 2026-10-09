/** Check rendered EN/ES copy and JSON-LD for withdrawn commercial promises. */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { decodeHTML } from 'entities';
const failures = [];
let checked = 0;
const promise = /(?:no|without)\s+(?:a\s+)?minimum\s+(?:engagement|commitment|term|duration)|sin\s+(?:duración|permanencia|compromiso)\s+mínim[oa]|no\s+hay\s+(?:duración|permanencia|compromiso)\s+mínim[oa]|30[- ]days?[’'\s-]*(?:of\s+)?notice|(?:preaviso|aviso)\s+(?:(?:es|de)\s+)*30\s+días|30\s+días\s+de\s+preaviso/i;
async function visit(dir) {
  for (const entry of await readdir(dir, {withFileTypes:true})) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (entry.name.endsWith('.html') && /(?:\/en(?:\/|\.html)|\/es(?:\/|\.html))/.test(path)) {
      const html = await readFile(path, 'utf8');
      const visible = decodeHTML(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
      const ld = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.stringify(JSON.parse(m[1]))).join(' ');
      const metadata = [...html.matchAll(/<title>(.*?)<\/title>|<meta name="description" content="([^"]*)"/g)].map(m => decodeHTML(m[1] || m[2])).join(' ');
      if (/Logiciels|Gestion des dépenses|Méthode des avis/i.test(metadata)) failures.push({path,reason:'untranslated-French-metadata'});
      const match = (visible + ' ' + ld).match(promise);
      if (match) failures.push({ path, reason:'withdrawn-contractual-promise', match:match[0] });
      if (visible.includes('Startups et SaaS') || visible.includes('Les cas documentés')) failures.push({path, reason:'known-untranslated-French-copy'});
      checked++;
    }
  }
}
await visit('.next/server/app');
console.log(JSON.stringify({checkedLocalizedPages:checked,failures},null,2));
if (failures.length) process.exitCode = 1;
