import type { Metadata } from 'next';
import manifest from './thumbnails/manifest.json';
import { THUMBNAILS_ENABLED, type ThumbnailCategory, type ThumbnailVariant } from './thumbnails/config';
import { parityHref } from './locale-route-map';
import type { Locale } from './i18n';

export interface EditorialThumbnail {
  src: string; social: string; square?: string; alt: string; title: string;
  category: ThumbnailCategory; variant: ThumbnailVariant; width: number; height: number;
}
const BASE = 'https://www.iteradvisors.com';
let translationIndex: Map<string, {path:string;field:'src'|'social'|'square'|'alt';absolute:boolean}> | undefined;
function thumbnailTranslationIndex() {
  if(translationIndex) return translationIndex;
  translationIndex = new Map();
  for(const [path,image] of Object.entries(manifest)) for(const field of ['src','social','square','alt'] as const) {
    const value = (image as EditorialThumbnail)[field];
    if (!value) continue;
    translationIndex.set(value,{path,field,absolute:false});
    if (value.startsWith('/images/')) translationIndex.set(BASE+value,{path,field,absolute:true});
  }
  return translationIndex;
}
/** Localized server-tree adapters must translate both raster URLs and captions. */
export function translatedThumbnailValue(value:string,locale:Locale):string {
  if(!THUMBNAILS_ENABLED || locale==='fr') return value;
  const match = thumbnailTranslationIndex().get(value);
  if(!match) return value;
  const target = getThumbnail(parityHref(match.path,locale));
  const translated = target?.[match.field];
  return translated ? (match.absolute?BASE:'')+translated : value;
}
export function thumbnailPath(value: string): string {
  const p = value.startsWith('http') ? new URL(value).pathname : value.split(/[?#]/)[0];
  return p.replace(/\/$/,'') || '/';
}
/** Static lookup only. Renderers, fonts and Sharp never enter the browser bundle. */
export function getThumbnail(path: string): EditorialThumbnail | undefined {
  if (!THUMBNAILS_ENABLED) return undefined;
  return (manifest as Record<string, EditorialThumbnail>)[thumbnailPath(path)];
}
export function thumbnailImageObject(path: string) {
  const image = getThumbnail(path);
  return image ? { '@type': 'ImageObject', url: BASE+image.src, contentUrl:BASE+image.src, width:image.width, height:image.height, caption:image.alt } : undefined;
}
export function primaryThumbnailSchema(path: string): Record<string, string> {
  const image = getThumbnail(path);
  return image ? { primaryImageOfPage: BASE+image.src } : {};
}
export function withThumbnailMetadata(metadata: Metadata, path: string): Metadata {
  if(typeof metadata.robots==='string' && metadata.robots.includes('noindex') || typeof metadata.robots==='object' && metadata.robots?.index===false) return metadata;
  const image = getThumbnail(path);
  if (!image) return metadata;
  return { ...metadata,
    robots: typeof metadata.robots==='string' ? (metadata.robots.includes('max-image-preview:') ? metadata.robots.replace(/max-image-preview:[^,\s]+/g,'max-image-preview:large') : metadata.robots+', max-image-preview:large') : {...metadata.robots,'max-image-preview':'large'},
    openGraph: { ...metadata.openGraph, images:[{url:BASE+image.src,width:image.width,height:image.height,alt:image.alt}] },
    twitter: { ...metadata.twitter, card:'summary_large_image', images:[{url:BASE+image.social,alt:image.title}] },
  };
}
