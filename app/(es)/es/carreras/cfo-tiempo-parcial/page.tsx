import { cloneElement, isValidElement, type ReactNode } from 'react';
import Link from 'next/link';
import LocalizedEditorialPage, { editorialMetadata } from '@/lib/content/localized-editorial';
const source = "/carrieres/fractional-cfo";
const locale = 'es' as const;
export const metadata = editorialMetadata(source, locale);
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const page = await LocalizedEditorialPage({ source, locale, searchParams });
  if (!isValidElement<{ children: ReactNode }>(page)) return page;
  // Cannibalisation GSC (2026-11-28) : cette offre de recrutement, alors servie
  // sous /es/carreras/cfo-externo, devançait la page commerciale de Barcelone
  // sur « cfo externo barcelona ». Le lien renvoie les entreprises vers l'offre.
  return cloneElement(page, {
    children: (
      <>
        {page.props.children}
        <aside className="container px-4 sm:px-6 pb-10">
          <p className="text-base text-foreground">
            ¿Busca un CFO externo para su empresa?{' '}
            <Link href="/es/cfo-externalizado-barcelona" className="text-iter-violet underline underline-offset-4">
              Nuestro servicio de CFO externo en Barcelona para pymes y startups
            </Link>
          </p>
        </aside>
      </>
    ),
  });
}
