import { readFile, access, readdir } from 'node:fs/promises';
import sharp from 'sharp';
import { inspectHtml } from './audit-thumbnail-inventory.mjs';
const manifest = JSON.parse(await readFile('lib/thumbnails/manifest.json','utf8'));
const catalog = JSON.parse(await readFile('lib/thumbnails/catalog.json','utf8'));
const enabled = /THUMBNAILS_ENABLED\s*=\s*true/.test(await readFile('lib/thumbnails/config.ts','utf8'));
const BASE = 'https://www.iteradvisors.com';
const origin=process.argv.find(v=>v.startsWith('--origin='))?.slice(9);
const errors = [], warnings = [];
const built = !process.argv.includes('--assets-only');
let assets = 0, pages = 0, articles = 0, visible = 0;
let httpAssetsChecked=0;
function* nodes(obj) { if(Array.isArray(obj)) for(const i of obj) yield* nodes(i); else if(obj&&typeof obj==='object'){yield obj;for(const v of Object.values(obj)) yield* nodes(v);} }
for (const [path,image] of Object.entries(manifest)) {
  for (const format of ['src','social','square']) {
    if(!image[format]) continue;
    try { const info = await sharp('public'+image[format]).metadata(); if(info.width!==1200||info.height!==(format==='square'?1200:630)||info.format!=='png') errors.push(`${path}: wrong dimensions/format ${format}`); assets++; }
    catch {errors.push(`${path}: missing asset ${format}`);}
  }
  if(!built || !enabled) continue;
  let file = `.next/server/app/${path==='/'?'index':path.slice(1)}.html`;
  let html;
  try {await access(file);html=await readFile(file,'utf8');}catch{
    file=`.next/server/app/${path.slice(1)}/index.html`;
    try{html=await readFile(file,'utf8');}catch{
      if(!origin){warnings.push(`${path}: dynamic page, verify against a running --origin`);continue;}
      const res=await fetch(origin+path);if(res.status!==200){errors.push(`${path}: dynamic page HTTP ${res.status}`);continue;}html=await res.text();
    }
  }
  const row = inspectHtml(html,path);
  if(row.robots.some(r=>r.includes('noindex'))) { errors.push(`${path}: generated thumbnail attached to noindex page`); continue; }
  pages++;
  if(row.og.length!==1 || row.og[0]!==BASE+image.src) errors.push(`${path}: inconsistent og:image`);
  if(row.ogWidth[0]!=='1200' || row.ogHeight[0]!=='630') errors.push(`${path}: missing OG dimensions`);
  if(row.twitter.length!==1 || row.twitter[0]!==BASE+image.social) errors.push(`${path}: inconsistent Twitter image`);
  if(!row.robots.join(' ').includes('max-image-preview:large')) errors.push(`${path}: large image previews not allowed`);
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  for(const n of nodes(scripts)) {
    const types = Array.isArray(n['@type'])?n['@type']:[n['@type']];
    if(types.some(t=>t==='Article'||t==='BlogPosting') && (n.url===BASE+path || n['@id']===BASE+path+'#article')) {
      articles++;
      const url = typeof n.image==='string' ? n.image : n.image?.url;
      if(url!==BASE+image.src) errors.push(`${path}: Article.image differs from primary image`);
    }
    if(n['@type']==='WebPage' && n.primaryImageOfPage && n.primaryImageOfPage!==BASE+image.src) errors.push(`${path}: WebPage primary image differs`);
  }
  const hasImage = row.images.some(i=>decodeURIComponent(i.src??'').includes(image.src));
  for(const i of row.images.filter(i=>decodeURIComponent(i.src??'').includes(image.src))) if(i.alt!==image.alt) errors.push(`${path}: visible thumbnail alt differs from localized caption`);
  if(hasImage) visible++;
  if(row.schemas.some(s=>/Article|BlogPosting/.test(s.type)) && /\/blog\/|\/fiscalite\/|\/tax\/|\/fiscalidad\/|\/(?:ia|ai)-finance\//.test(path) && !hasImage) errors.push(`${path}: preferred editorial image absent from server HTML`);
}
// New indexable routes cannot silently fall back to a generic logo.
if(built && enabled) {
  const sitemap = await readFile('.next/server/app/sitemap.xml.body','utf8');
  for(const m of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const path = new URL(m[1]).pathname;
    if(!catalog.some(p=>p.path===path)) errors.push(`${path}: new page missing from thumbnail catalog. Refresh catalog after the first build.`);
  }
  const marker1=manifest['/'].src,marker2=manifest['/ressources/outils/pennylane'].social;
  for(const file of await readdir('.next/static/chunks',{recursive:true})) if(file.endsWith('.js')) {
    const js=await readFile('.next/static/chunks/'+file,'utf8');
    if(js.includes(marker1)&&js.includes(marker2)) errors.push(`${file}: complete image manifest must stay out of browser JavaScript`);
  }
}
const result = { enabled,assets,pages,articles,visibleEditorialImages:visible,warnings,errors };
if(origin && enabled) {
  const paths=[...new Set(Object.values(manifest).flatMap(i=>[i.src,i.social,i.square].filter(Boolean)))];
  let cursor=0;
  await Promise.all(Array.from({length:8},async()=>{
    while(cursor<paths.length){
      const asset=paths[cursor++];
      try{const res=await fetch(origin+asset,{method:'HEAD',redirect:'manual',signal:AbortSignal.timeout(15000)});
        if(res.status!==200 || !res.headers.get('content-type')?.startsWith('image/png')) errors.push(`${asset}: image HTTP ${res.status}, ${res.headers.get('content-type')}`);
        else httpAssetsChecked++;
      }catch(error){errors.push(`${asset}: image request failed (${String(error)})`);}
    }
  }));
}
result.httpAssetsChecked=httpAssetsChecked;
console.log(JSON.stringify(result,null,2));
if(errors.length) process.exitCode=1;
