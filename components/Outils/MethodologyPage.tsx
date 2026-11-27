import { PAGE_REVISIONS } from '@/lib/content/page-revisions';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import type { Locale } from '@/lib/i18n';
import type { CmsNavItem } from '@/lib/static-content';
import { TOOL_METHODOLOGY } from '@/lib/content/tool-methodology';
export default function MethodologyPage({ locale, cmsNavigation }: { locale: Locale; cmsNavigation?: CmsNavItem[] }) {
  const t = TOOL_METHODOLOGY[locale];
  const modified = PAGE_REVISIONS['/ressources/outils/methodologie'];
  const modifiedLabel = new Intl.DateTimeFormat({ fr: 'fr-FR', en: 'en-GB', es: 'es-ES' }[locale], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${modified}T12:00:00Z`));
  return <PageLayout locale={locale} cmsNavigation={cmsNavigation}><section className="site-hero pt-32 pb-10"><div className="container max-w-4xl"><Breadcrumb locale={locale} items={[{ label: t.hubLabel, href: t.hub }, { label: locale === 'fr' ? 'Méthodologie' : locale === 'en' ? 'Methodology' : 'Metodología' }]} /><h1 className="font-heading text-4xl font-bold mt-8 mb-5">{t.h1}</h1><p className="site-copy text-lg text-muted-foreground leading-relaxed">{t.intro}</p><p className="text-sm text-muted-foreground mt-4"><time dateTime={modified}>{modifiedLabel}</time></p></div></section><div className="container max-w-4xl pb-16">{t.sections.map(([heading, text]) => <section key={heading} className="py-8 border-b border-border"><h2 className="font-heading text-2xl font-bold mb-4">{heading}</h2><p className="site-copy text-muted-foreground leading-relaxed">{text}</p></section>)}<div className="flex flex-wrap gap-5 mt-8"><Link href={t.hub} className="text-iter-violet underline">{t.hubLabel}</Link><Link href={t.contactHref} className="text-iter-violet underline">{t.contact}</Link></div></div></PageLayout>;
}
