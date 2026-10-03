import LocalizedEditorialPage, { editorialMetadata } from '@/lib/content/localized-editorial';
const source = "/ressources/blog/les-10-outils-pour-cfos-startup";
const locale = 'es' as const;
export const metadata = editorialMetadata(source, locale);
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <LocalizedEditorialPage source={source} locale={locale} searchParams={searchParams} />;
}
