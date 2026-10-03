import LocalizedEditorialPage, { editorialMetadata } from '@/lib/content/localized-editorial';
const source = "/cads/roi";
const locale = 'en' as const;
export const metadata = editorialMetadata(source, locale);
export default function Page() { return <LocalizedEditorialPage source={source} locale={locale} />; }
