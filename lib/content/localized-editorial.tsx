import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import Footer from '@/components/Footer';
import type { Locale } from '@/lib/i18n';
import { parityHref } from '@/lib/locale-route-map';
import { buildMetadata } from '@/lib/metadata';
import registry from './editorial-locales/registry.json';
import { editorialText, editorialHtml } from './editorial-text';
import { editorialAsset } from './editorial-assets';
import { EDITORIAL_SOURCE_PAGES } from './editorial-source-pages';

type TargetLocale = Exclude<Locale, 'fr'>;
const technical = new Set(['locale', 'slug', 'id', 'key', 'className', 'class', 'style', 'categorySlug', 'type', 'role', 'variant', 'icon', 'color', 'size', 'width', 'height', 'sizes', 'src', 'srcSet',    'dateTime', 'publishedDate', 'updatedDate', 'modifiedDate', 'referencesKey', 'code', '@type', '@context', 'datePublished', 'dateModified', 'datePosted', 'validThrough', 'employmentType', 'unitText', 'currency', 'addressCountry', 'postalCode', 'streetAddress']);
function data(value: unknown, locale: TargetLocale, key = ''): unknown {
  if (key === 'inLanguage') return locale === 'en' ? 'en-GB' : 'es-ES';
  if (typeof value === 'string' && editorialAsset(value, locale) !== value) return editorialAsset(value, locale);
  if (technical.has(key)) return value;
  if (typeof value === 'string') {
    if (key === '__html') {
      try { return JSON.stringify(data(JSON.parse(value), locale)).replace(/</g, '\\u003c'); }
      catch { return editorialHtml(value, locale); }
    }
    if (value.startsWith('/') || value.startsWith('https://www.iteradvisors.com')) {
      // Person and Organization IDs identify one entity across languages.
      if (key === '@id' && /#(?:person|organization|website)$/.test(value)) return value;
      return parityHref(value, locale);
    }
    return editorialText(value, locale);
  }
  if (Array.isArray(value)) return value.map(item => data(item, locale));
  if (value && typeof value === 'object' && !isValidElement(value)) {
    // Do not flatten dates, promises, icon constructors or other React objects.
    if (Object.getPrototypeOf(value) !== Object.prototype) return value;
    return Object.fromEntries(Object.entries(value).map(([name, item]) => [name, data(item, locale, name)]));
  }
  return value;
}

/** Resolve only Server Components; preserve client boundaries and their state.
 * All classes, sections, anchors and original French source components survive.
 * Client components receive translated data and their normal locale parameter.
 */
async function localizedTree(node: ReactNode, locale: TargetLocale): Promise<ReactNode> {
  if (node && typeof node === 'object' && 'then' in node) return localizedTree(await node, locale);
  if (typeof node === 'string') return editorialText(node, locale);
  if (Array.isArray(node)) {
    const children = await Promise.all(node.map(child => localizedTree(child, locale)));
    return children.map((child, index) => isValidElement(child) && child.key === null ? cloneElement(child, { key: `localized-${index}` }) : child);
  }
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  const original = element.props;
  const props = Object.fromEntries(Object.entries(original).filter(([key]) => key !== 'children').map(([key, value]) => [key, data(value, locale, key)]));
  const children = await localizedTree(original.children as ReactNode, locale);
  const type = element.type as unknown as { $$typeof?: symbol; $$id?: string };
  if (element.type === Footer) return <Footer locale={locale} />;
  if (element.type === PageLayout) return <PageLayout locale={locale}>{children}</PageLayout>;
  // React marks imported client boundaries; invoking one would break its hooks.
  const client = type?.$$typeof === Symbol.for('react.client.reference');
  if (client && ('locale' in props || (type.$$id?.includes('/components/') || type.$$id?.includes('/app/')))) props.locale = locale;
  if (typeof element.type === 'function' && !client) {
    const render = element.type as (props: Record<string, unknown>) => ReactNode | Promise<ReactNode>;
    return localizedTree(await render({ ...props, children }), locale);
  }
  return cloneElement(element, props, children);
}
export const EDITORIAL_REGISTRY = registry;
export function editorialSourceFor(path: string) {
  return Object.entries(registry).find(([, page]) => page.sharedEditorial && Object.values(page.paths).includes(path));
}
export function editorialMetadata(source: string, locale: TargetLocale) {
  const page = registry[source as keyof typeof registry];
  if (!page) notFound();
  return buildMetadata({ locale, title: editorialText(page.title, locale), description: editorialText(page.description, locale), path: page.paths[locale], localizedPaths: page.paths, noindex: page.noindex });
}
export default async function LocalizedEditorialPage({ source, locale, searchParams }: { source: string; locale: TargetLocale; searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const entry = EDITORIAL_SOURCE_PAGES[source as keyof typeof EDITORIAL_SOURCE_PAGES];
  if (!entry) notFound();
  const render = entry.component as (props: { params: Promise<Record<string, string>>; searchParams: Promise<Record<string, string | string[] | undefined>> }) => ReactNode | Promise<ReactNode>;
  return localizedTree(await render({ params: Promise.resolve(entry.params), searchParams: searchParams ?? Promise.resolve({}) }), locale);
}
