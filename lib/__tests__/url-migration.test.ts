import { describe, expect, it } from 'vitest';
import { createRequire } from 'node:module';
import config from '../../next.config';
import edge from '../../vercel.json';
import mapping from '../url-migration-2026-11.json';
import { finalPublicPath } from '../url-migration';
import { publishedPaths, parityHref } from '../locale-route-map';
import sitemap from '../../app/sitemap';

const { match, compile } = createRequire(import.meta.url)('next/dist/compiled/path-to-regexp');

describe('November language URL migration', () => {
  it('redirects all 103 old addresses directly with 301 and never redirects a destination', async () => {
    expect((await config.redirects!()).some(rule => rule.source === '/en/ressources/tools/pennylane')).toBe(false);
    const rules = [...edge.redirects.filter(rule => !('has' in rule)), ...await config.redirects!()];
    for (const [source, destination] of Object.entries(mapping)) {
      const rule = rules.find(rule => match(rule.source)(source));
      expect(rule, source).toBeDefined();
      const params = match(rule!.source)(source).params;
      expect(compile(rule!.destination)(params), source).toBe(destination);
      expect(rule!.statusCode, source).toBe(301);
      expect(rules.find(rule => match(rule.source)(destination)), destination).toBeUndefined();
    }
  });
  it('publishes each new address exactly once and removes every old address from sitemap alternates', () => {
    const entries = sitemap();
    expect(entries).toHaveLength(434);
    for (const [old, current] of Object.entries(mapping)) {
      expect(entries.filter(entry => entry.url === 'https://www.iteradvisors.com' + current), current).toHaveLength(1);
      expect(JSON.stringify(entries)).not.toContain('https://www.iteradvisors.com' + old + '"');
      const routes = publishedPaths(current);
      if (routes) for (const locale of ['fr', 'en', 'es'] as const) expect(parityHref(old, locale)).toBe(routes[locale]);
    }
  });
  it('preserves tracking and anchors without renaming the optional commercial clusters', () => {
    expect(finalPublicPath('/en/ressources/blog/flux-de-tresorerie?utm_source=partner#example')).toBe('/en/resources/blog/cash-flow-statement?utm_source=partner#example');
    for (const path of ['/es/externalizacion-daf', '/es/externalizacion-daf/precios', '/fractional-cfo-startups', '/carrieres/fractional-cfo']) expect(finalPublicPath(path)).toBe(path);
  });
});
