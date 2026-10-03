import registry from './content/editorial-locales/registry.json';
import type { NextConfig } from 'next';
import legacyPaths from './content/editorial-locales/legacy-paths.json';
type Redirect = Awaited<ReturnType<NonNullable<NextConfig['redirects']>>>[number];
const pages = Object.values(registry);
const canonical = new Set(pages.flatMap(page => Object.values(page.paths)));
const byPath = new Map(pages.flatMap(page => Object.values(page.paths).map(path => [path, page.paths] as const)));
/** A newly translated canonical must never hit a historical FR fallback. */
export function localeRedirects(legacy: Redirect[]): Redirect[] {
  const aliases = new Map<string, Redirect>();
  for (const page of pages.filter(item => item.sharedEditorial)) for (const locale of ['en', 'es'] as const) {
    for (const source of [`/${locale}${page.paths.fr}`, page.paths.fr.replace("/ressources/", locale === "es" ? "/es/recursos/" : "/en/ressources/"), (legacyPaths as Record<string, Record<string, string>>)[page.paths.fr]?.[locale] ?? page.paths[locale], page.paths[locale].replace(locale === 'en' ? '/en/ressources/' : '/es/recursos/', `/${locale}/ressources/`).replace(/\/tools\//, '/outils/').replace(/\/herramientas\//, '/outils/')]) {
      if (!canonical.has(source)) aliases.set(source, { source, destination: page.paths[locale], statusCode: 301 });
    }
  }
  const result = legacy.filter(rule => {
    if (canonical.has(rule.source)) return false;
    // Remove obsolete wildcard fallbacks to the French resource families.
    if (/^\/(en|es)\//.test(rule.source) && rule.source.includes(':') && /^\/ressources\/(outils|fiscalite|glossaire)/.test(rule.destination)) return false;
    return !aliases.has(rule.source);
  }).map(rule => {
    const lang = rule.source.match(/^\/(en|es)\//)?.[1] as 'en' | 'es' | undefined;
    const destination = byPath.get(rule.destination);
    return lang && destination ? { ...rule, destination: destination[lang] } : rule;
  });
  return [...aliases.values(), ...result];
}
