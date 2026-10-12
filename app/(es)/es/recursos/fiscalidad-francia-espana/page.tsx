import { cloneElement, isValidElement, type ReactNode } from 'react';
import Link from 'next/link';
import LocalizedEditorialPage, { editorialMetadata } from '@/lib/content/localized-editorial';
const source = "/ressources/fiscalite-espagne-france";
const locale = 'es' as const;
export const metadata = editorialMetadata(source, locale);
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const page = await LocalizedEditorialPage({ source, locale, searchParams });
  if (!isValidElement<{ children: ReactNode }>(page)) return page;
  // Keep the service discoverable from its topic hub after removing sitewide links.
  return cloneElement(page, { children: <>{page.props.children}<aside className="container px-4 sm:px-6 pb-10"><Link href="/es/services/ley-beckham" className="text-iter-violet underline underline-offset-4">Ley Beckham: alcance del acompañamiento y coordinación con asesores fiscales</Link></aside></> });
}
