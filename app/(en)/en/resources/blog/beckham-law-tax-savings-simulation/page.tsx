import LocalizedEditorialPage, { editorialMetadata } from '@/lib/content/localized-editorial';
import { withBeckhamServiceLink } from '@/lib/content/beckham-service-link';
const source = "/ressources/blog/loi-beckham-economie-impot-simulation";
const locale = 'en' as const;
export const metadata = editorialMetadata(source, locale);
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return withBeckhamServiceLink(await LocalizedEditorialPage({ source, locale, searchParams }), locale);
}
