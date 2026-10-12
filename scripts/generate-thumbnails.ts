import sharp from 'sharp';
import { readFile, writeFile, mkdir, access, rename, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { artSvg } from './thumbnails/art';
import { classifyThumbnail, shortThumbnailTitle, thumbnailExcluded, THUMBNAIL_OVERRIDES, THUMBNAIL_VERSION, THUMBNAIL_BRAND as B, CATEGORY_LABELS, DRAWING_ALTS } from '../lib/thumbnails/config';
import type { ThumbnailCategory, ThumbnailVariant } from '../lib/thumbnails/config';
import { blogPosts } from '../lib/content/blog-posts';
import { resolveBlogArticleHref } from '../lib/path-localization';

type Page = { path: string; title: string; h1?: string; og?: string[]; status?: number; robots?: string[] };
type CatalogItem = { path: string; title: string; locale: 'fr'|'en'|'es'; category: ThumbnailCategory; variant: ThumbnailVariant; square: boolean; preserve: boolean; previousImage?: string };
async function main() {
const fontCache = await mkdtemp(resolve(tmpdir(), 'iter-thumbnails-'));
if (!process.env.FONTCONFIG_FILE) {
  process.env.FONTCONFIG_FILE = resolve(fontCache,'fonts.conf');
  await writeFile(process.env.FONTCONFIG_FILE,`<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd"><fontconfig><dir>${resolve('scripts/thumbnails/fonts')}</dir><cachedir>${fontCache}</cachedir></fontconfig>`);
}
const args = process.argv.slice(2);
const arg = (name: string) => args.find(v=>v.startsWith(`--${name}=`))?.slice(name.length+3);
const catalogPath = resolve('lib/thumbnails/catalog.json');
const manifestPath = resolve('lib/thumbnails/manifest.json');
const assetRoot = resolve('public/images/thumbnails');
const fontfile = resolve('scripts/thumbnails/fonts/space-grotesk-latin.woff2');
const logoBytes = await readFile('public/images/logos/logo-hero.png');
const fontBytes = await readFile(fontfile);
const safeXml = (s:string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
await mkdir(assetRoot, { recursive: true });
let catalog: CatalogItem[];
if (arg('inventory')) {
  const inventory = JSON.parse(await readFile(resolve(arg('inventory')!), 'utf8'));
  if (inventory.pages.some((p:Page)=>p.status !== 200)) throw new Error('Inventory contains failed requests: resolve before generating.');
  catalog = inventory.pages.filter((p:Page)=>!p.robots?.some(v=>v.includes('noindex'))).map((p:Page)=>{
    const locale = p.path.startsWith('/en/') || p.path === '/en' ? 'en' : p.path.startsWith('/es/') || p.path === '/es' ? 'es' : 'fr';
    const override = THUMBNAIL_OVERRIDES[p.path];
    const title = override?.title ?? shortThumbnailTitle(p.h1 || p.title);
    const art = classifyThumbnail(p.path, p.title + ' ' + (p.h1 ?? ''));
    // Dedicated invoicing drawings already match content and language. Keep them.
    const preserve = override?.preserve ?? (thumbnailExcluded(p.path) || !!p.og?.[0]?.includes('/electronic-invoicing/'));
    return { path: p.path, title, locale, ...art, square: override?.square ?? p.path.includes('/blog/'), preserve, previousImage: p.og?.[0] };
  });
  await writeFile(catalogPath, JSON.stringify(catalog, null, 2)+'\n');
} else { catalog = JSON.parse(await readFile(catalogPath,'utf8')); }
// New static blog articles are registered directly from the publishing source.
for (const locale of ['fr','en','es'] as const) for (const [slug,post] of Object.entries(blogPosts[locale] ?? {})) {
  const path = resolveBlogArticleHref(locale,slug);
  if (!path || catalog.some(p=>p.path===path)) continue;
  catalog.push({path,title:shortThumbnailTitle(post.h1 ?? slug),locale,...classifyThumbnail(path,post.h1??slug),square:true,preserve:thumbnailExcluded(path)});
}
await writeFile(catalogPath,JSON.stringify(catalog,null,2)+'\n');

const manifest: Record<string,unknown> = {};
const sizes: number[] = [];
const logo = await sharp(logoBytes).resize({ width: 214 }).toBuffer();
const whiteLogo = await sharp(logo).linear([0,0,0,1],[255,255,255,0]).png().toBuffer();
async function textLayer(text:string, size:number, width:number, color:string) {
  return sharp({ text: { text: `<span foreground="${color}">${safeXml(text)}</span>`, font: `Space Grotesk Bold ${size}`, fontfile, width, rgba: true, align: 'left', spacing: 6, wrap: 'word' } }).png().toBuffer();
}
async function render(page:CatalogItem, format:'search'|'social'|'square', file:string) {
  if (!args.includes('--force')) { try { await access(file); sizes.push((await readFile(file)).length); return; } catch {} }
  const h = format === 'square' ? 1200 : 630;
  let layers: sharp.OverlayOptions[] = [];
  let canvas: Buffer;
  if(page.category === 'corporate') {
    canvas = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${h}"><rect width="1200" height="${h}" fill="${B.violet}"/><circle cx="1100" cy="${h-70}" r="360" fill="none" stroke="#ffffff" stroke-opacity=".08" stroke-width="70"/><path d="M65 ${h-64}H1135" stroke="#fff" stroke-opacity=".2" stroke-width="2"/></svg>`);
    const bigLogo = await sharp(whiteLogo).resize({width:580}).toBuffer();
    layers = [{ input: bigLogo, left:310, top:Math.round(h/2-33) }];
    if(format==='social') layers.push({input:await textLayer({fr:'Finance · Capital humain',en:'Finance · People',es:'Finanzas · Capital humano'}[page.locale],30,900,'#fff'),left:250,top:380});
  } else {
    canvas = Buffer.from(artSvg(page.variant,format));
    layers.push({ input:logo,left:64,top:h-41 });
    if(format==='social') {
      layers.push({input:await textLayer(CATEGORY_LABELS[page.category][page.locale],23,505,B.violet),left:64,top:78});
      const titleLayer = await textLayer(page.title,52,510,B.ink);
      const tm = await sharp(titleLayer).metadata();
      if((tm.height ?? 0)>300) throw new Error(`Title too tall: ${page.path}. Add a short title override.`);
      layers.push({input:titleLayer,left:64,top:Math.round(280-(tm.height??120)/2)});
      const perspective = page.category==='hr' ? {fr:'Lecture RH',en:'HR perspective',es:'Perspectiva de RR. HH.'} : {fr:'Lecture CFO',en:'CFO perspective',es:'Perspectiva CFO'};
      layers.push({input:await textLayer(perspective[page.locale],21,440,B.muted),left:64,top:496});
    }
  }
  const tmp = file+'.tmp';
  const data = await sharp(canvas).composite(layers).png({compressionLevel:9,palette:true,effort:7}).toBuffer();
  await writeFile(tmp,data); await rename(tmp,file); sizes.push(data.length);
}

for(const page of catalog) {
  const override = THUMBNAIL_OVERRIDES[page.path];
  Object.assign(page, override && { ...override, title:override.title??page.title });
  if(page.preserve) continue;
  const digest = createHash('sha256').update(JSON.stringify({version:THUMBNAIL_VERSION,brand:B,path:page.path,title:page.title,locale:page.locale,category:page.category,variant:page.variant})).update(logoBytes).update(fontBytes).update(await readFile('scripts/thumbnails/art.ts')).update(await readFile('scripts/generate-thumbnails.ts')).digest('hex').slice(0,10);
  const subject = page.title.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const basename = `${page.locale}-${subject}-${digest}`;
  const src = `/images/thumbnails/${basename}.png`;
  const social = `/images/thumbnails/${basename}-social.png`;
  const square = page.square ? `/images/thumbnails/${basename}-square.png` : undefined;
  await render(page,'search',resolve('public'+src));
  await render(page,'social',resolve('public'+social));
  if(square) await render(page,'square',resolve('public'+square));
  const alt = `${DRAWING_ALTS[page.variant][['fr','en','es'].indexOf(page.locale)]} : ${page.title}`;
  manifest[page.path] = { src,social,...(square && {square}),alt,title:page.title,category:page.category,variant:page.variant,width:1200,height:630 };
}
await mkdir(dirname(manifestPath), {recursive:true});
await writeFile(manifestPath+'.tmp',JSON.stringify(manifest,null,2)+'\n');
await rename(manifestPath+'.tmp',manifestPath);
console.log(JSON.stringify({catalog:catalog.length,generatedPages:Object.keys(manifest).length,preserved:catalog.filter(p=>p.preserve).length,assets:sizes.length,maxBytes:Math.max(...sizes),totalBytes:sizes.reduce((a,b)=>a+b,0)}));
await rm(fontCache,{recursive:true,force:true});
}
main().catch(error => { console.error(error); process.exitCode = 1; });
