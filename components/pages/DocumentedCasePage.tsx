import Link from "@/components/PublishedLocaleLink";
import type { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/static-content";
import { getReviewedCase, caseInterface } from "@/lib/content/documented-case-locales";
import { parityHref } from "@/lib/locale-route-map";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

export default function DocumentedCasePage({ locale, item, cmsNavigation }: { locale: Locale; item: NonNullable<ReturnType<typeof getReviewedCase>>; cmsNavigation?: CmsNavItem[] }) {
  const t = caseInterface[locale];
  const href = (path: string) => parityHref(path, locale);
  const date = (value: string) => new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale === "es" ? "es-ES" : "fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(value));
  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    "@id": `https://www.iteradvisors.com${item.href}#article`,
    url: `https://www.iteradvisors.com${item.href}`,
    headline: item.title, description: item.summary, inLanguage: { fr: "fr-FR", en: "en-GB", es: "es-ES" }[locale],
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.iteradvisors.com${item.href}#webpage`, url: `https://www.iteradvisors.com${item.href}`, mainEntity: { "@id": `https://www.iteradvisors.com${item.href}#article` }, isPartOf: { "@id": "https://www.iteradvisors.com/#website" } },
    datePublished: item.published, dateModified: item.modified,
    author: { "@type": "Organization", "@id": "https://www.iteradvisors.com/#organization", name: "Iter Advisors", url: "https://www.iteradvisors.com/" },
    publisher: { "@id": "https://www.iteradvisors.com/#organization" },
  };
  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <article className="pt-28 sm:pt-32 pb-16">
        <div className="container max-w-4xl">
          <Breadcrumb locale={locale} items={[{ label: t.resources, href: href("/ressources") }, { label: t.cases, href: href("/ressources/cas-clients") }, { label: item.company }]} />
          <p className="text-sm font-semibold text-iter-violet mt-8 mb-3">{t.case} · {item.sectorTag}</p>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading leading-tight mb-6">{item.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{item.summary}</p>
          <p className="text-sm text-muted-foreground mt-4">{t.by} <Link locale={locale} href={href("/a-propos")} className="underline">Iter Advisors</Link> · {t.published} <time dateTime={item.published}>{date(item.published)}</time> · {t.updated} <time dateTime={item.modified}>{date(item.modified)}</time></p>
          <div className="mt-10 space-y-10">
            <section data-block-key="situation"><h2 className="text-2xl font-bold mb-4">{t.situation}</h2><p className="leading-relaxed text-muted-foreground">{item.description}</p></section>
            <section data-block-key="need"><h2 className="text-2xl font-bold mb-4">{t.need}</h2><p className="leading-relaxed text-muted-foreground">{item.challenge}</p></section>
            <section data-block-key="work"><h2 className="text-2xl font-bold mb-4">{t.work}</h2><p className="leading-relaxed text-muted-foreground">{item.solution}</p></section>
            <section className="site-card bg-muted/30 border border-border/50 rounded-2xl p-6" data-block-key="outputs"><h2 className="text-2xl font-bold mb-4">{t.outputs}</h2><ul className="list-disc pl-5 space-y-3">{item.deliverables.map(text => <li key={text}>{text}</li>)}</ul>{"relatedService" in item && item.relatedService && <p className="mt-5 leading-relaxed text-muted-foreground">{t.channelText} <Link locale={locale} href={item.relatedService.href} className="text-iter-violet underline">{item.relatedService.label}</Link>.</p>}</section>
            <section data-block-key="results"><h2 className="text-2xl font-bold mb-4">{t.results}</h2><ul className="list-disc pl-5 space-y-3 mb-5">{item.results.map(text => <li key={text}>{text}</li>)}</ul><p className="text-sm leading-relaxed text-muted-foreground">{item.limits}</p></section>
            {"source" in item && item.source && <section data-block-key="feedback"><h2 className="text-2xl font-bold mb-4">{t.feedback}</h2><p className="text-muted-foreground mb-3">{t.feedbackText}</p><a href={item.source.href} className="text-iter-violet underline underline-offset-4">{item.source.label}</a></section>}
            <section className="border-t border-border pt-8" data-block-key="comparable"><h2 className="text-2xl font-bold mb-4">{t.comparable}</h2><p className="text-muted-foreground leading-relaxed mb-5">{t.ctaText} {locale === "fr" ? "Pour identifier le rôle qui correspond à votre situation, consultez les " : ""}<Link locale={locale} href={href("/daf-externalise")} className="text-iter-violet underline">{locale === "fr" ? "missions d’un DAF externalisé pour PME et startups" : t.offer}</Link>.</p><div className="flex flex-wrap gap-4"><Link locale={locale} href={item.offer.href} className="text-iter-violet underline">{item.offer.label}</Link><Link locale={locale} href={href("/daf-externalise/tarifs")} className="text-iter-violet underline">{t.prices}</Link></div><Link locale={locale} href={href(`/contact#cas-${item.slug}`)} className="site-button site-button-primary inline-flex mt-6 rounded-full bg-iter-chartreuse text-iter-dark px-6 py-3 font-semibold">{t.contact}</Link></section>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
