import LocalizedEditorialPage, { editorialMetadata } from '@/lib/content/localized-editorial';
const source = "/ressources/blog/cas-etude-happy-scribe";
const locale = 'en' as const;
export const metadata = editorialMetadata(source, locale);
export default function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <LocalizedEditorialPage source={source} locale={locale} searchParams={searchParams} />;
}
