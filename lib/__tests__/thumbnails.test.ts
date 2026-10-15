import { describe, it, expect, vi } from 'vitest';
import { getThumbnail, withThumbnailMetadata, thumbnailImageObject, translatedThumbnailValue } from '../thumbnails';
import { classifyThumbnail, shortThumbnailTitle, thumbnailExcluded } from '../thumbnails/config';
import { articleSchema } from '../schemas';
import { editorialAsset } from '../content/editorial-assets';
import { editorialWebPageSchema } from '../schemas/editorial-thumbnail';
import { ITER_AUTHOR } from '../schemas/editorial';

describe('editorial image system',()=>{
  it('classifies meaningful subjects across languages and prioritises primary routes',()=>{
    expect(classifyThumbnail('/daf-externalise/ecommerce','Outils de calcul des marges').category).toBe('finance');
    expect(classifyThumbnail('/es/externalizacion-rrhh','Dirección de recursos humanos').category).toBe('hr');
    expect(classifyThumbnail('/en/resources/ai-finance','AI finance').variant).toBe('workflow');
    expect(classifyThumbnail('/ressources/fiscalite/double-imposition-france-espagne','Convention fiscale').variant).toBe('treaty');
    expect(classifyThumbnail('/ressources/blog/flux-de-tresorerie','Calcul et outils').variant).toBe('cash');
    expect(classifyThumbnail('/ressources/glossaire/besoin-fonds-roulement-bfr','BFR').variant).toBe('calculator');
    expect(classifyThumbnail('/services/recrutement-talent-acquisition','Recrutement').variant).toBe('recruitment');
  });
  it('keeps portraits, client material and administrative pages intact',()=>{
    for(const path of ['/a-propos/sebastien-doat','/en/about/benjamin-ziza','/es/aviso-legal','/en/cookie-policy','/ressources/cas-clients/opti-digital-structuration-financement']) expect(thumbnailExcluded(path)).toBe(true);
    expect(getThumbnail('/a-propos/sebastien-doat')).toBeUndefined();
    expect(getThumbnail('/ressources/facturation-electronique')).toBeUndefined();
  });
  it('aligns absolute metadata, schema and visible asset lookup without changing editorial metadata',()=>{
    const path='/ressources/fiscalite/double-imposition-france-espagne',image=getThumbnail(path)!;
    const metadata=withThumbnailMetadata({title:'Titre original',description:'Description originale',openGraph:{type:'article'},alternates:{canonical:'https://www.iteradvisors.com'+path}},path);
    expect(metadata.title).toBe('Titre original'); expect(metadata.description).toBe('Description originale');
    expect(metadata.openGraph).toHaveProperty('images.0.url','https://www.iteradvisors.com'+image.src);
    expect(metadata.twitter).toHaveProperty('images.0.url','https://www.iteradvisors.com'+image.social);
    expect(metadata.openGraph).toHaveProperty('type','article');
    expect(thumbnailImageObject(path)).toMatchObject({width:1200,height:630});
    expect(articleSchema({url:path,headline:'Test',description:'Test',imageSrc:'/old.png'}).image).toEqual(thumbnailImageObject(path));
    const page=editorialWebPageSchema({path,name:'Test',description:'Test',locale:'fr',author:ITER_AUTHOR});
    expect(page.primaryImageOfPage).toBe('https://www.iteradvisors.com'+image.src);
    expect(page.author).toEqual({'@id':'https://www.iteradvisors.com/#organization'});
  });
  it('translates generated assets and their captions inside localized server trees',()=>{
    const fr=getThumbnail('/ressources/blog/flux-de-tresorerie')!;
    const en=getThumbnail('/en/ressources/blog/flux-de-tresorerie')!;
    expect(en).toBeDefined();
    expect(editorialAsset(fr.src,'en')).toBe(en.src);
    expect(editorialAsset('https://www.iteradvisors.com'+fr.src,'en')).toBe('https://www.iteradvisors.com'+en.src);
    expect(translatedThumbnailValue(fr.alt,'en')).toBe(en.alt);
    expect(en.alt).not.toContain('Schéma');
    // Do not shorten or alter a page's visible title while translating image captions.
    expect(translatedThumbnailValue('Flux de trésorerie','en')).toBe('Flux de trésorerie');
  });
  it('does not activate images on noindex routes and preserves a sensible legacy fallback',()=>{
    const m={title:'Private',robots:'noindex, follow'};
    expect(withThumbnailMetadata(m,'/daf-externalise')).toBe(m);
    expect(getThumbnail('/future-page')).toBeUndefined();
    expect(shortThumbnailTitle('Titre | Iter Advisors')).toBe('Titre');
  });
  it('supports a real rollback with one feature switch',async()=>{
    vi.resetModules();
    vi.doMock('../thumbnails/config',async()=>({...await vi.importActual('../thumbnails/config'),THUMBNAILS_ENABLED:false}));
    const legacy=await import('../thumbnails');
    expect(legacy.getThumbnail('/daf-externalise')).toBeUndefined();
    const m={title:'Old',openGraph:{images:[{url:'/old.png'}]}};
    expect(legacy.withThumbnailMetadata(m,'/daf-externalise')).toBe(m);
    vi.doUnmock('../thumbnails/config');vi.resetModules();
  });
});
