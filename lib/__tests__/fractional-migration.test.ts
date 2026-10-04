import { describe, expect, it } from 'vitest';
import nextConfig from '../../next.config';
import { parityHref } from '../locale-route-map';

const moves = [
  ['/jobs/fractional-cfo-startups', '/fractional-cfo-startups'],
  ['/en/jobs/fractional-cfo-startups', '/en/fractional-cfo-for-startups'],
  ['/es/jobs/fractional-cfo-startups', '/es/cfo-externo-startups'],
] as const;

describe('Fractional CFO migration consolidation', () => {
  it('retains the startup intent and locale in the effective permanent redirects', async () => {
    const redirects = await nextConfig.redirects!();
    for (const [source, destination] of moves) {
      const rule = redirects.find(item => item.source === source);
      expect(rule?.destination, source).toBe(destination);
      expect(rule && ('permanent' in rule ? rule.permanent : rule.statusCode === 308)).toBe(true);
      expect(redirects.some(item => item.source === destination), destination).toBe(false);
    }
  });

  it('routes historical aliases to the startup equivalent without losing query or anchor', () => {
    for (const [source] of moves) {
      expect(parityHref(source + '?utm_source=linkedin#tarifs', 'en'))
        .toBe('/en/fractional-cfo-for-startups?utm_source=linkedin#tarifs');
      expect(parityHref(source, 'fr')).toBe('/fractional-cfo-startups');
      expect(parityHref(source, 'es')).toBe('/es/cfo-externo-startups');
    }
  });

  it('keeps global slash normalization enabled during this focused migration', () => {
    expect(nextConfig.skipTrailingSlashRedirect).not.toBe(true);
    expect(nextConfig.trailingSlash).not.toBe(true);
  });
});
