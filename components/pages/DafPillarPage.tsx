import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";
import { FINANCE_EXPERT } from "@/lib/content/finance-expert";
import type { CmsNavItem, StrapiTeamMember } from "@/lib/static-content";
import { strapiMediaUrl } from "@/lib/static-content";
import { getFallbackTeamMembers } from "@/lib/content/team";
import { aboutHref } from "@/lib/path-localization";
import { FORMULES } from "@/lib/content/facts";
import { dafPillar, DAF_PILLAR_MODIFIED, DAF_PILLAR_MODIFIED_LABEL, DAF_PILLAR_PATH, DAF_PILLAR_PUBLISHED } from "@/lib/content/daf-pillar";
import { faqPageSchema } from "@/lib/schemas";
import { editorialWebPageSchema } from "@/lib/schemas/editorial";
import { renderInlineMarkdownLinks, stripInlineMarkdown } from "@/lib/render-markdown-inline-links";
import PageLayout from "@/components/PageLayout";
import ServiceHero from "@/components/design/ServiceHero";
import PageByline from "@/components/PageByline";

const AUTHOR = { name: "Sébastien Doat", slug: "sebastien-doat" };
const SITE = "https://www.iteradvisors.com";
const body = "text-base text-muted-foreground leading-relaxed";
const link = "text-iter-violet underline underline-offset-4 font-medium";

function Section({ id, title, children, tinted = false }: { id: string; title: string; children: ReactNode; tinted?: boolean }) {
  return <section id={id} className={`site-section scroll-mt-24 ${tinted ? "bg-muted/30" : "bg-background"}`}>
    <div className="container max-w-4xl">
      <h2 className="font-heading font-bold text-foreground text-balance">{title}</h2>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  </section>;
}

/** Server-rendered content and native FAQ; shared navigation remains interactive. */
export default function DafPillarPage({ cmsNavigation, teamMembers }: { cmsNavigation?: CmsNavItem[]; teamMembers?: StrapiTeamMember[] }) {
  const t = dafPillar;
  const teamSource = teamMembers?.length ? teamMembers : getFallbackTeamMembers("fr");
  const experts = t.experts.slugs.map(slug => teamSource.find(m => m.slug === slug)).filter((m): m is StrapiTeamMember => Boolean(m));
  return <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
    <ServiceHero title={t.hero.h1} label={t.breadcrumbLabel} eyebrow="Iter Advisors · Direction financière"
      lead={t.hero.lead} intro={t.hero.intro}
      primary={{ href: t.contact.href, label: t.hero.cta }} secondary={{ href: "#tarifs", label: "Voir les tarifs" }}
      summary={t.hero.landmarks} navigation={t.nav}
      proof={<div className="mt-6 space-y-3"><ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">{t.hero.proofs.map(item => <li key={item}>{item}</li>)}</ul><a href="#preuves" className={link}>Lire les missions clients et le témoignage d’Opti Digital</a></div>} />

    <Section id="besoin" title={t.needs.heading}>
      <span id="pour-qui" className="block scroll-mt-24" />
      <span id="comprendre" className="block scroll-mt-24" />
      <p className={body}>{t.needs.intro}</p>
      <div className="space-y-6">{t.needs.items.map(item => <div key={item.title}><h3 className="font-semibold text-foreground">{item.title}</h3><p className={`${body} mt-2`}>{item.text}</p></div>)}</div>
      <p className={`${body} border-l-2 border-iter-violet pl-5`}>{t.needs.note}</p>
    </Section>

    <Section id="missions" title={t.missions.heading} tinted>
      <span id="livrables-pme" className="block scroll-mt-24" />
      <p className={body}>{t.missions.intro}</p>
      <div className="divide-y divide-border">{t.missions.items.map(item => <article key={item.title} className="py-6 first:pt-0">
        <h3 className="font-semibold text-foreground">{item.title}</h3>
        <dl className="mt-4 grid sm:grid-cols-2 gap-5"><div><dt className="font-semibold text-foreground">Votre livrable</dt><dd className={`${body} mt-2`}>{item.deliverable}</dd></div><div><dt className="font-semibold text-foreground">Pour décider</dt><dd className={`${body} mt-2`}>{item.decision}</dd></div></dl>
        <Link className={`${link} inline-flex mt-4`} href={item.href}>{item.linkLabel}</Link>
      </article>)}</div>
      <figure className="site-card bg-white border border-border p-5 sm:p-7">
        <figcaption><h3 className="font-semibold text-foreground">{t.missions.example.heading}</h3><p className={`${body} mt-2`}>{t.missions.example.intro}</p></figcaption>
        <div className="overflow-x-auto mt-5"><table className="w-full text-sm text-left border-collapse"><caption className="sr-only">Trame illustrative de revue mensuelle, sans données client</caption><thead><tr>{["Constat", "Question à examiner", "Action à suivre"].map(label => <th scope="col" key={label} className="p-3 border-b border-border">{label}</th>)}</tr></thead><tbody>{t.missions.example.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell} className="p-3 border-b border-border font-medium">{cell}</th> : <td key={cell} className="p-3 border-b border-border">{cell}</td>)}</tr>)}</tbody></table></div>
      </figure>
    </Section>

    <Section id="preuves" title={t.cases.heading}>
      <p className={body}>{t.cases.intro}</p>
      <div className="grid md:grid-cols-2 gap-6">{t.cases.items.map(item => <article className="site-card border border-border p-5 sm:p-7 flex flex-col" key={item.company}><p className="site-eyebrow">{item.company}</p><h3 className="font-semibold text-foreground">{item.title}</h3><p className={`${body} mt-4`}>{item.text}</p><p className={`${body} mt-4 mb-5`}>{item.takeaway}</p><Link href={item.href} className={`${link} mt-auto`}>{item.linkLabel}</Link></article>)}</div>
      <figure id="avis" className="border-l-2 border-iter-violet pl-5 scroll-mt-24"><blockquote className="site-copy text-foreground">« {t.cases.quote.text} »</blockquote><figcaption className="mt-3 text-sm text-muted-foreground"><strong className="text-foreground">{t.cases.quote.author}</strong>, {t.cases.quote.role}<br /><a className={link} href={t.cases.quote.sourceUrl} target="_blank" rel="noopener noreferrer">{t.cases.quote.sourceLabel}</a></figcaption></figure>
      <Link href={t.contact.href} className="site-button site-button-primary">{t.hero.cta}</Link>
    </Section>

    <Section id="methode" title={t.method.heading} tinted>
      <p className={body}>{t.method.intro}</p>
      <ol className="space-y-6">{t.method.steps.map((step, index) => <li key={step.title}><h3 className="font-semibold text-foreground"><span className="text-iter-violet">{index + 1}. </span>{step.title}</h3><p className={`${body} mt-2`}>{step.text}</p></li>)}</ol>
      <p className={body}>{t.method.note}</p>
      <div id="villes" className="scroll-mt-24"><p className={body}>{t.method.cities}</p><ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3">{[["Paris", "/daf-externalise-paris"], ["Barcelone", "/daf-externalise-barcelone"], ["Toulouse", "/daf-externalise-toulouse"]].map(([label, href]) => <li key={href}><Link className={link} href={href}>DAF externalisé à {label}</Link></li>)}</ul></div>
    </Section>

    <Section id="tarifs" title={t.pricing.heading}>
      <p className={`${body} font-medium text-foreground`}>{t.pricing.intro}</p>
      {t.pricing.paragraphs.map(text => <p key={text} className={body}>{text}</p>)}
      <Link href={t.pricing.link.href} className={link}>{t.pricing.link.label}</Link>
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
                    strapiMediaUrl(getFallbackTeamMembers("fr").find((m) => m.slug === e.slug)?.photo);
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
                          <Link href={aboutHref("fr", e.slug)} className="hover:text-iter-violet">
                            {e.firstName} {e.lastName}
                          </Link>
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{e.role}</p>
                        {e.linkedIn && (
                          <a
                            href={e.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1.5 text-xs text-iter-violet hover:underline"
                            aria-label={`Profil LinkedIn de ${e.firstName} ${e.lastName}`}
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
      <Link href="/ressources/ia-finance" className={link}>Notre approche de l’IA en finance</Link>
      <PageByline locale="fr" author={AUTHOR} dateModified={DAF_PILLAR_MODIFIED} dateLabel={DAF_PILLAR_MODIFIED_LABEL} />
    </Section>

    <Section id="faq" title="Les questions à clarifier avant de démarrer">
      <div>{t.faq.map(item => <details key={item.question} className="group border-b border-border"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5"><h3 className="font-semibold text-foreground">{item.question}</h3><span aria-hidden="true" className="shrink-0 text-iter-violet group-open:rotate-45">+</span></summary><p className={body}>{renderInlineMarkdownLinks(item.answer)}</p></details>)}</div>
      <nav id="secteurs" aria-label="Accompagnements sectoriels" className="scroll-mt-24 text-sm"><p className="font-semibold mb-3">Approfondir selon votre activité</p><ul className="flex flex-wrap gap-x-5 gap-y-3">{[["Startups et SaaS", "/fractional-cfo-startups"], ["E-commerce", "/daf-externalise/ecommerce"], ["Industrie", "/daf-externalise/industrie"], ["Deep-tech", "/daf-externalise/deep-tech"]].map(([label, href]) => <li key={href}><Link href={href} className={link}>{label}</Link></li>)}</ul></nav>
    </Section>

    <section className="site-section site-contact-band"><div className="container max-w-3xl text-center"><h2 className="site-cta-title">{t.contact.heading}</h2><p className="site-cta-copy mt-5 mb-8">{t.contact.text}</p><Link href={t.contact.href} className="site-button site-button-primary">{t.hero.cta}</Link></div></section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${SITE}${DAF_PILLAR_PATH}#service-offer`,
            serviceType: "DAF externalisé",
            name: "DAF externalisé pour PME et startups",
            description: t.meta.description,
            provider: { "@id": `${SITE}/#organization` },
            areaServed: [
              { "@type": "Country", name: "France" },
              { "@type": "Country", name: "Espagne" },
            ],
            url: `${SITE}${DAF_PILLAR_PATH}`,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: String(FORMULES[0].prixMin),
              highPrice: String(FORMULES[FORMULES.length - 1].prixMax),
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceType: "https://schema.org/MinimumPrice",
                price: String(FORMULES[0].prixMin),
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
          __html: JSON.stringify(
            { ...editorialWebPageSchema({
              path: DAF_PILLAR_PATH,
              name: t.meta.title,
              description: t.meta.description,
              locale: "fr",
              author: AUTHOR,
              datePublished: DAF_PILLAR_PUBLISHED,
              dateModified: DAF_PILLAR_MODIFIED,
            }), mainEntity: { "@id": `${SITE}${DAF_PILLAR_PATH}#service-offer` } },
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageSchema(
              t.faq.map((item) => ({ question: item.question, answer: stripInlineMarkdown(item.answer) })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": FINANCE_EXPERT.id,
                name: "Sébastien Doat",
                jobTitle: "Associé fondateur, DAF externalisé et CFO",
                url: `${SITE}${aboutHref("fr", "sebastien-doat")}`,
                sameAs: ["https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"],
                worksFor: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Iter Advisors" },
                knowsAbout: ["DAF externalisé", "direction financière externalisée", "levée de fonds", "reporting financier", "budget prévisionnel"],
              },
              {
                "@type": "Person",
                "@id": `${SITE}/#florent-greth`,
                name: "Florent Greth",
                jobTitle: "Associé et CFO",
                url: `${SITE}${aboutHref("fr", "florent-greth")}`,
                sameAs: ["https://www.linkedin.com/in/florent-greth-cfo-pennylane/"],
                worksFor: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Iter Advisors" },
                knowsAbout: ["DAF externalisé", "finance startups", "tableau de bord financier", "contrôle de gestion"],
              },
            ],
          }),
        }}
      />
    </PageLayout>;
}
