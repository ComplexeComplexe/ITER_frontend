import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import type { Locale } from '@/lib/i18n';
import type { CmsNavItem } from '@/lib/static-content';
import { TOOL_METHODOLOGY } from '@/lib/content/tool-methodology';
export default function MethodologyPage({ locale, cmsNavigation }: { locale: Locale; cmsNavigation?: CmsNavItem[] }) {
  const t = TOOL_METHODOLOGY[locale];
  return <PageLayout locale={locale} cmsNavigation={cmsNavigation}><section className="site-hero pt-32 pb-10"><div className="container max-w-4xl"><Breadcrumb locale={locale} items={[{ label: t.hubLabel, href: t.hub }, { label: locale === 'fr' ? 'Méthodologie' : locale === 'en' ? 'Methodology' : 'Metodología' }]} /><h1 className="font-heading text-4xl font-bold mt-8 mb-5">{t.h1}</h1><p className="site-copy text-lg text-muted-foreground leading-relaxed">{t.intro}</p><p className="text-sm text-muted-foreground mt-4"><time dateTime="2026-10-03">{locale === 'fr' ? '3 octobre 2026' : locale === 'en' ? '3 October 2026' : '3 de octubre de 2026'}</time></p></div></section><div className="container max-w-4xl pb-16">{t.sections.map(([heading, text]) => <section key={heading} className="py-8 border-b border-border"><h2 className="font-heading text-2xl font-bold mb-4">{heading}</h2><p className="site-copy text-muted-foreground leading-relaxed">{text}</p></section>)}<div className="flex flex-wrap gap-5 mt-8"><Link href={t.hub} className="text-iter-violet underline">{t.hubLabel}</Link><Link href={t.contactHref} className="text-iter-violet underline">{t.contact}</Link></div></div></PageLayout>;
}
