'use client';
import { contractCopy } from "./contract-copy";
import { cloneElement, createContext, isValidElement, useContext, type ReactElement, type ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';
import copy from './editorial-locales/cads.json';
import { parityHref } from '@/lib/locale-route-map';
export const CadsLocale = createContext<Locale>('fr');
export const useCadsLocale = () => useContext(CadsLocale);
const technical = new Set(['className', 'id', 'name', 'type', 'value', 'method', 'action', 'src', 'role', 'key', 'style']);
export function cadsText(source: string, locale: Locale) {
  if (locale === 'fr') return source;
  const key = source.replace(/\s+/g, ' ').trim();
  const text = (copy[locale] as Record<string, string>)[key];
  return text === undefined ? source : (source.match(/^\s*/)?.[0] ?? '') + contractCopy(text, locale) + (source.match(/\s*$/)?.[0] ?? '');
}
/** Translate only presentation props. Event handlers, field names and values survive. */
export function cadsElement(node: ReactNode, locale: Locale): ReactNode {
  if (locale === 'fr') return node;
  if (typeof node === 'string') return cadsText(node, locale);
  if (Array.isArray(node)) return node.map(child => cadsElement(child, locale));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  const props = Object.fromEntries(Object.entries(element.props).filter(([key]) => key !== 'children').map(([key, value]) => [key, typeof value === 'string' && !technical.has(key) ? key === 'href' ? parityHref(value, locale) : cadsText(value, locale) : value]));
  return cloneElement(element, props, cadsElement(element.props.children as ReactNode, locale));
}
