import PublishedLocaleLink from "@/components/PublishedLocaleLink";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { FINANCE_EXPERT } from "@/lib/content/finance-expert";
import type { CmsNavItem, StrapiTeamMember } from "@/lib/static-content";
import { strapiMediaUrl } from "@/lib/static-content";
import { getFallbackTeamMembers } from "@/lib/content/team";
import { aboutHref } from "@/lib/path-localization";
import { FORMULES } from "@/lib/content/facts";
import { DAF_PILLAR_MODIFIED, DAF_PILLAR_MODIFIED_LABEL, DAF_PILLAR_PATH, DAF_PILLAR_PUBLISHED } from "@/lib/content/daf-pillar";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { getDafPillarContent, pillarInterface } from "@/lib/content/daf-pillar-locales";
import { faqPageSchema } from "@/lib/schemas";
import { editorialWebPageSchema, ITER_AUTHOR } from "@/lib/schemas/editorial";
import { renderInlineMarkdownLinks, stripInlineMarkdown } from "@/lib/render-markdown-inline-links";
import PageLayout from "@/components/PageLayout";
import ServiceHero from "@/components/design/ServiceHero";
import ServiceTable from "@/components/design/ServiceTable";
import ServiceFaq from "@/components/design/ServiceFaq";
import Section from "@/components/design/ServiceSection";
import ServiceContact from "@/components/design/ServiceContact";
import PageByline from "@/components/PageByline";

const AUTHOR = ITER_AUTHOR;
const SITE = "https://www.iteradvisors.com";
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
const body = "text-base text-muted-foreground leading-relaxed";
const link = "text-iter-violet underline underline-offset-4 font-medium";

/** Server-rendered content and native FAQ; shared navigation remains interactive. */
export default function DafPillarPage({ cmsNavigation, teamMembers, locale = "fr" }: { locale?: Locale; cmsNavigation?: CmsNavItem[]; teamMembers?: StrapiTeamMember[] }) {
  const t = getDafPillarContent(locale);
  const ui = pillarInterface[locale];
  const href = (path: string) => parityHref(path, locale);
  const path = href(DAF_PILLAR_PATH);
  const teamSource = teamMembers?.length ? teamMembers : getFallbackTeamMembers(locale);
  const experts = t.experts.slugs.map(slug => teamSource.find(m => m.slug === slug)).filter((m): m is StrapiTeamMember => Boolean(m));
  return <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
    <ServiceHero locale={locale} title={t.hero.h1} label={t.breadcrumbLabel} eyebrow={ui.eyebrow}
      lead={t.hero.lead} intro={t.hero.intro}
      primary={{ href: href(t.contact.href), label: t.hero.cta }} secondary={{ href: "#tarifs", label: ui.pricing }}
      summary={t.hero.landmarks} navigation={t.nav}
      proof={<div className="mt-6 space-y-3"><ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">{t.hero.proofs.map(item => <li key={item}>{item}</li>)}</ul><a href="#preuves" className={link}>{ui.proof}</a></div>} />

    <Section id="besoin" title={t.needs.heading}>
      <span id="pour-qui" className="block scroll-mt-24" />
      <span id="comprendre" className="block scroll-mt-24" />
      <p className={body}>{renderInlineMarkdownLinks(t.needs.intro.replace(/\]\((\/[^)]+)\)/g, (_, linkPath: string) => `](${href(linkPath)})`))}</p>
      <div className="space-y-6">{t.needs.items.map(item => <div key={item.title}><h3 className="font-semibold text-foreground">{item.title}</h3><p className={`${body} mt-2`}>{item.text}</p></div>)}</div>
      <p className={`${body} border-l-2 border-iter-violet pl-5`}>{t.needs.note}</p>
    </Section>

    <Section id="missions" title={t.missions.heading} tinted>
      <span id="livrables-pme" className="block scroll-mt-24" />
      <p className={body}>{t.missions.intro}</p>
      <div className="divide-y divide-border">{t.missions.items.map(item => <article key={item.title} className="py-6 first:pt-0">
        <h3 className="font-semibold text-foreground">{item.title}</h3>
        <dl className="mt-4 grid sm:grid-cols-2 gap-5"><div><dt className="font-semibold text-foreground">{ui.deliverable}</dt><dd className={`${body} mt-2`}>{item.deliverable}</dd></div><div><dt className="font-semibold text-foreground">{ui.decision}</dt><dd className={`${body} mt-2`}>{item.decision}</dd></div></dl>
        <PublishedLocaleLink locale={locale} className={`${link} inline-flex mt-4`} href={href(item.href)}>{item.linkLabel}</PublishedLocaleLink>
      </article>)}</div>
      <figure className="site-card bg-white border border-border p-5 sm:p-7">
        <figcaption><h3 className="font-semibold text-foreground">{t.missions.example.heading}</h3><p className={`${body} mt-2`}>{t.missions.example.intro}</p></figcaption>
        <ServiceTable caption={ui.caption} headers={ui.headers} rows={t.missions.example.rows} captionHidden />
      </figure>
    </Section>

    <Section id="preuves" title={t.cases.heading}>
      <p className={body}>{t.cases.intro}</p>
      <div className="grid md:grid-cols-2 gap-6">{t.cases.items.map(item => <article className="site-card border border-border p-5 sm:p-7 flex flex-col" key={item.company}><p className="site-eyebrow">{item.company}</p><h3 className="font-semibold text-foreground">{item.title}</h3><p className={`${body} mt-4`}>{item.text}</p><p className={`${body} mt-4 mb-5`}>{item.takeaway}</p><PublishedLocaleLink locale={locale} href={href(item.href)} className={`${link} mt-auto`}>{item.linkLabel}</PublishedLocaleLink></article>)}</div>
      <figure id="avis" className="border-l-2 border-iter-violet pl-5 scroll-mt-24"><blockquote className="site-copy text-foreground">« {t.cases.quote.text} »</blockquote><figcaption className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">{t.cases.quote.author}</strong>, {t.cases.quote.role}<br /><a className={link} href={t.cases.quote.sourceUrl} target="_blank" rel="noopener noreferrer">{t.cases.quote.sourceLabel}</a></figcaption></figure>
      <PublishedLocaleLink locale={locale} href={href(t.contact.href)} className="site-button site-button-primary">{t.hero.cta}</PublishedLocaleLink>
    </Section>

    <Section id="methode" title={t.method.heading} tinted>
      <p className={body}>{t.method.intro}</p>
      <ol className="space-y-6">{t.method.steps.map((step, index) => <li key={step.title}><h3 className="font-semibold text-foreground"><span className="text-iter-violet">{index + 1}. </span>{step.title}</h3><p className={`${body} mt-2`}>{step.text}</p></li>)}</ol>
      <p className={body}>{t.method.note}</p>
      <div id="villes" className="scroll-mt-24"><p className={body}>{t.method.cities}</p><ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3">{["/daf-externalise-paris", "/daf-externalise-barcelone", "/daf-externalise-toulouse"].map((cityPath, index) => <li key={cityPath}><PublishedLocaleLink locale={locale} className={link} href={href(cityPath)}>{ui.cityPrefix} {ui.cities[index]}</PublishedLocaleLink></li>)}</ul></div>
    </Section>

    <Section id="tarifs" title={t.pricing.heading}>
      <p className={`${body} font-medium text-foreground`}>{t.pricing.intro}</p>
      {t.pricing.paragraphs.map(text => <p key={text} className={body}>{renderInlineMarkdownLinks(text.replace(/\]\((\/[^)]+)\)/g, (_, linkPath: string) => `](${href(linkPath)})`))}</p>)}
      <PublishedLocaleLink locale={locale} href={href(t.pricing.link.href)} className={link}>{t.pricing.link.label}</PublishedLocaleLink>
    </Section>

    <Section id="pourquoi-iter" title={t.experts.heading} tinted>
      <p className={body}>{t.experts.intro}</p>
      <div id="experts" className="scroll-mt-24">
              <ul className="mt-6 grid sm:grid-cols-2 gap-4">
                {experts.map((e) => {
                  // Strapi ne renvoie pas toujours la photo : repli sur le
                  // portrait local (Florent apparaissait sans visage).
                  const photo =
                    strapiMediaUrl(e.photo) ||
                    strapiMediaUrl(getFallbackTeamMembers(locale).find((m) => m.slug === e.slug)?.photo);
                  return (
                    <li key={e.slug} className="site-card rounded-2xl border border-border/50 p-4 sm:p-5 flex items-center gap-4">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden bg-iter-violet/10">
                        {photo && (
                          <Image
                            src={photo}
                            alt={`${e.firstName} ${e.lastName}, ${e.role}, Iter Advisors`}
                            fill
                            className="object-cover object-top"
                            sizes="80px"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-semibold font-heading text-foreground">
                          <PublishedLocaleLink locale={locale} href={aboutHref(locale, e.slug)} className="hover:text-iter-violet">
                            {e.firstName} {e.lastName}
                          </PublishedLocaleLink>
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{e.role}</p>
                        {e.linkedIn && (
                          <a
                            href={e.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1.5 text-xs text-iter-violet hover:underline"
                            aria-label={`${ui.linkedIn} ${e.firstName} ${e.lastName}`}
                          >
                            <Linkedin size={13} />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
      </div>
      {t.experts.paragraphs.map(text => <p className={body} key={text}>{text}</p>)}
      <PublishedLocaleLink locale={locale} href={href("/ressources/ia-finance")} className={link}>{ui.ai}</PublishedLocaleLink>
      <PageByline locale={locale} author={AUTHOR} dateModified={DAF_PILLAR_MODIFIED} dateLabel={locale === "fr" ? DAF_PILLAR_MODIFIED_LABEL : undefined} />
    </Section>

    <Section id="faq" title={ui.faq}>
      <ServiceFaq items={t.faq.map(item => ({ question: item.question, answer: renderInlineMarkdownLinks(item.answer.replace(/\]\((\/[^)]+)\)/g, (_, linkPath: string) => `](${href(linkPath)})`)) }))} />
      <nav id="secteurs" aria-label={ui.sectors} className="scroll-mt-24 text-sm"><p className="font-semibold mb-3">{ui.explore}</p><ul className="flex flex-wrap gap-x-5 gap-y-3">{[["Startups et SaaS", "/fractional-cfo-startups"], ["E-commerce", "/daf-externalise/ecommerce"], [ui.industry, "/daf-externalise/industrie"], ["Deep-tech", "/daf-externalise/deep-tech"]].map(([label, sectorPath]) => <li key={sectorPath}><PublishedLocaleLink locale={locale} href={href(sectorPath)} className={link}>{label}</PublishedLocaleLink></li>)}</ul></nav>
    </Section>

    <ServiceContact locale={locale} title={t.contact.heading} text={t.contact.text} href={href(t.contact.href)} label={t.hero.cta} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJson({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${SITE}${path}#service-offer`,
            serviceType: ui.service,
            name: t.hero.h1,
            description: t.meta.description,
            provider: { "@id": `${SITE}/#organization` },
            areaServed: [
              { "@type": "Country", name: "France" },
              { "@type": "Country", name: ui.spain },
            ],
            url: `${SITE}${path}`,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: String(FORMULES[0].prixMin),
              highPrice: String(FORMULES[FORMULES.length - 1].prixMax),
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: String(FORMULES[0].prixMin),
                maxPrice: String(FORMULES[FORMULES.length - 1].prixMax),
                valueAddedTaxIncluded: false,
                priceCurrency: "EUR",
                unitText: "MONTH",
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJson(
            { ...editorialWebPageSchema({
              path,
              name: t.meta.title,
              description: t.meta.description,
              locale,
              author: AUTHOR,
              datePublished: DAF_PILLAR_PUBLISHED,
              dateModified: DAF_PILLAR_MODIFIED,
            }), mainEntity: { "@id": `${SITE}${path}#service-offer` } },
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJson(
            faqPageSchema(
              t.faq.map((item) => ({ question: item.question, answer: stripInlineMarkdown(item.answer) })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJson({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": FINANCE_EXPERT.id,
                name: "Sébastien Doat",
                jobTitle: ui.founder,
                url: `${SITE}${aboutHref(locale, "sebastien-doat")}`,
                sameAs: ["https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"],
                worksFor: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Iter Advisors" },
                knowsAbout: ui.expertise,
              },
              {
                "@type": "Person",
                "@id": `${SITE}/#florent-greth`,
                name: "Florent Greth",
                jobTitle: ui.partner,
                url: `${SITE}${aboutHref(locale, "florent-greth")}`,
                sameAs: ["https://www.linkedin.com/in/florent-greth-cfo-pennylane/"],
                worksFor: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Iter Advisors" },
                knowsAbout: ui.florentExpertise,
              },
            ],
          }),
        }}
      />
    </PageLayout>;
}
