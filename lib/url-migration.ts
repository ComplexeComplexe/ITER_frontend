import type { NextConfig } from 'next';
import migrations from './url-migration-2026-11.json';

type Redirect = Awaited<ReturnType<NonNullable<NextConfig['redirects']>>>[number];
const exact: Record<string, string> = migrations;
const prefixes = [
  ['/en/ressources/cas-clients', '/en/resources/case-studies'],
  ['/en/ressources/glossaire', '/en/resources/glossary'],
  ['/en/ressources', '/en/resources'],
  ['/es/services', '/es/servicios'],
] as const;

/** One canonical spelling, also for generated URLs. Preserve queries and fragments. */
export function finalPublicPath(input: string): string {
  const origin = 'https://www.iteradvisors.com';
  if (input.startsWith(origin + '/')) return origin + finalPublicPath(input.slice(origin.length));
  const [, path, suffix] = input.match(/^([^?#]*)([\s\S]*)$/)!;
  let destination = exact[path];
  if (!destination) {
    for (const [old, current] of prefixes) {
      if (path === current || path.startsWith(current + '/')) {
        destination = exact[old + path.slice(current.length)];
        if (destination) break;
      }
    }
  }
  if (!destination) {
    const prefix = prefixes.find(([old]) => path === old || path.startsWith(old + '/'));
    destination = prefix ? prefix[1] + path.slice(prefix[0].length) : path;
  }
  return destination + suffix;
}

/** Keep historical aliases ahead of folder rules, remove reverse redirects,
 * and flatten destinations before Next builds its routing manifest. */
export function migratedRedirects(legacy: Redirect[]): Redirect[] {
  const canonical = new Set(Object.values(exact));
  const rules = new Map<string, Redirect>();
  const add = (rule: Redirect) => {
    const destination = finalPublicPath(rule.destination);
    if (rule.source === destination || canonical.has(rule.source)) return;
    const folder = prefixes.find(([old]) => rule.source === old || rule.source.startsWith(old + '/'));
    // Do not generate one rule per unchanged page from the locale registry.
    // The shared folder rule below already covers these addresses with 301.
    if (!rule.source.includes(':') && folder && folder[1] + rule.source.slice(folder[0].length) === destination) return;
    if (!rules.has(rule.source)) rules.set(rule.source, { ...rule, destination });
  };
  for (const rule of legacy) {
    add(rule);
    // Old aliases must still resolve directly when typed under the new folder.
    if (finalPublicPath(rule.source) !== rule.source) add({ ...rule, source: finalPublicPath(rule.source) });
  }
  // Only translated slugs need exact rules; unchanged suffixes use folder rules.
  for (const [source, destination] of Object.entries(exact)) {
    const prefix = prefixes.find(([old]) => source === old || source.startsWith(old + '/'));
    if (!prefix || prefix[1] + source.slice(prefix[0].length) !== destination) {
      rules.set(source, { source, destination, statusCode: 301 });
      if (prefix) {
        const alias = prefix[1] + source.slice(prefix[0].length);
        rules.set(alias, { source: alias, destination, statusCode: 301 });
      }
    }
  }
  const all = [...rules.values()];
  return [
    // Vercel retains the destination slash when :path* is empty, unlike
    // next start. Explicit folder roots prevent a second normalization hop.
    ...prefixes.map(([source, destination]) => ({ source, destination, statusCode: 301 as const })),
    ...all.filter(rule => !rule.source.includes(':')),
    ...all.filter(rule => rule.source.includes(':')),
    ...prefixes.map(([source, destination]) => ({ source: source + '/:path*', destination: destination + '/:path*', statusCode: 301 as const })),
  ];
}
