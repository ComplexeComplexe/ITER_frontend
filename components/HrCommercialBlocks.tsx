import Image from 'next/image';
import ServiceTable from '@/components/design/ServiceTable';
import ServiceSection from '@/components/design/ServiceSection';
import Link from 'next/link';
import PublishedLocaleLink from '@/components/PublishedLocaleLink';
import type { Locale } from '@/lib/i18n';
import { parityHref } from '@/lib/locale-route-map';
import { HR_COMMERCIAL_COPY, HR_COMMERCIAL_TERMS } from '@/lib/content/hr-commercial';
import { getToolBySlug } from '@/data/tools';

export function HrPillars({ locale }: { locale: Locale }) {
  const c = HR_COMMERCIAL_COPY[locale];
  return <ServiceSection id="piliers" title={c.pillarsTitle} tinted>
      <p className="site-copy text-muted-foreground max-w-3xl mt-5">{c.pillarsIntro}</p>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {c.pillars.map((pillar, i) => <article key={pillar.title} className="site-card p-6 sm:p-8 flex flex-col">
          <p className="site-eyebrow">0{i + 1}</p>
          <h3 className="text-xl font-semibold mb-4">{pillar.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{pillar.text}</p>
          <p className="border-t border-border pt-4 mt-5 text-sm"><strong>{c.output} : </strong>{pillar.output}</p>
          <Link href={parityHref(pillar.href, locale)} className="site-inline-link mt-5">{pillar.link}</Link>
        </article>)}
      </div>
  </ServiceSection>;
}

export function HrComparison({ locale }: { locale: Locale }) {
  const c = HR_COMMERCIAL_COPY[locale];
  return <ServiceSection id="alternatives" title={c.comparisonTitle}>
      <p className="site-copy text-muted-foreground max-w-3xl mt-5">{c.comparisonIntro}</p>
      <ServiceTable caption={c.comparisonTitle} headers={c.headers} rows={c.comparison} captionHidden />
      <p className="text-sm text-muted-foreground mt-5 max-w-4xl leading-relaxed">{c.salaryNote}</p>
      <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F15018" className="site-inline-link mt-4">{c.legalSource}</a>
  </ServiceSection>;
}

export function HrFees({ locale, includeHeading = true }: { locale: Locale; includeHeading?: boolean }) {
  const c = HR_COMMERCIAL_COPY[locale];
  const currency = (value: number) => new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : locale === 'en' ? 'en-IE' : 'es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  const prices = [
    c.project,
    `${currency(HR_COMMERCIAL_TERMS.regular.min)} à ${currency(HR_COMMERCIAL_TERMS.regular.max)}`.replace(' à ', locale === 'fr' ? ' à ' : locale === 'en' ? ' to ' : ' a '),
    c.project,
  ];
  return <>
    {includeHeading && <h2>{c.priceTitle}</h2>}<p className="site-copy text-muted-foreground max-w-3xl mt-5">{c.priceIntro}</p>
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      {c.priceLabels.map((label, i) => <article key={label} className="site-card p-6 flex flex-col">
        <h3 className="text-xl font-semibold mb-4">{label}</h3>
        <p className="text-2xl font-bold text-iter-violet mb-4">{prices[i]}</p>
        {i === 1 && <p className="text-sm text-muted-foreground mb-4">{c.priceUnit}</p>}
        <p className="text-muted-foreground leading-relaxed flex-1">{c.priceScopes[i]}</p>
        <Link className="site-inline-link mt-5" href={parityHref('/contact#drh', locale)}>{c.request}</Link>
      </article>)}
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mt-5">{c.priceNote}</p>
  </>;
}

export function HrCountries({ locale }: { locale: Locale }) {
  const c = HR_COMMERCIAL_COPY[locale];
  return <ServiceSection id="france-espagne" title={c.countriesTitle} tinted><p className="site-copy text-muted-foreground max-w-3xl mt-5">{c.countriesIntro}</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">{c.countries.map(([title, text]) => <article key={title} className="site-card p-6"><h3 className="text-xl font-semibold mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></article>)}</div>
      <PublishedLocaleLink locale={locale} href={parityHref('/ressources/fiscalite/beckham-law', locale)} className="site-inline-link mt-6">{c.beckham}</PublishedLocaleLink>
  </ServiceSection>;
}

export function HrTools({ locale }: { locale: Locale }) {
  const c = HR_COMMERCIAL_COPY[locale];
  return <ServiceSection id="outils-rh" title={c.toolsTitle}><p className="site-copy text-muted-foreground max-w-3xl mt-5">{c.toolsIntro}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">{Object.entries(c.toolUses).map(([slug, use]) => {
        const tool = getToolBySlug(slug)!;
        return <article key={slug} className="site-card p-6">
          <Image src={tool.logo} alt={`Logo ${tool.name}`} width={144} height={48} sizes="144px" className="h-12 w-36 object-contain object-left mb-5" />
          <h3 className="text-xl font-semibold mb-3"><PublishedLocaleLink locale={locale} href={parityHref(`/ressources/outils/${slug}`, locale)} className="text-iter-violet underline underline-offset-4">{tool.name}</PublishedLocaleLink></h3>
          <p className="text-muted-foreground leading-relaxed">{use}</p>
        </article>;
      })}</div>
      <Link href={parityHref('/ressources/outils', locale)} className="site-inline-link mt-6">{c.toolsLink}</Link>
  </ServiceSection>;
}
