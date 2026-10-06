import { LOCALE_ALIGNMENT_DATE } from "@/lib/content/locale-publication";
import PublishedLocaleLink from "@/components/PublishedLocaleLink";
import PageLayout from "@/components/PageLayout";
import ServiceHero from "@/components/design/ServiceHero";
import PageByline from "@/components/PageByline";
import { FINANCE_REVIEW_DATE, type FinanceService } from "@/lib/content/finance-services";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { getFinanceServices, financeInterface } from "@/lib/content/finance-service-locales";
import { getPublishedCases } from "@/lib/content/published-cases";
import { getDocumentedCase } from "@/lib/content/documented-cases";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";
import { PAGE_REVISIONS } from "@/lib/content/page-revisions";
import styles from "./finance.module.css";
import ServiceSection from "@/components/design/ServiceSection";
import ServiceFaq from "@/components/design/ServiceFaq";
import ServiceTable from "@/components/design/ServiceTable";
import ServiceContact from "@/components/design/ServiceContact";

// Retain links to sections already shared or indexed before the redesign.
const anchors: Record<string, Record<string, string[]>> = {
  "/fractional-cfo-startups": { besoin: ["commercial-intro", "definition", "pour-qui"], livrables: ["avantages"], deroulement: ["methodologie"], preuves: ["temoignages"], faq: ["faq-commercial"], contact: ["cta-service", "jobs-section"] },
  "/daf-externalise-paris": { besoin: ["definition", "signaux", "comparatif"], livrables: ["missions"], deroulement: ["parcours"], perimetre: ["marche-parisien"], preuves: ["avantage-iter"], contact: ["conclusion"] },
  "/daf-externalise/temps-partage": { besoin: ["definition"], deroulement: ["premier-mois"], perimetre: ["responsabilites"], tarifs: ["budget"], preuves: ["bilan"] },
  "/daf-externalise/transition": { besoin: ["situations"], livrables: ["premiers-jours"], deroulement: ["feuille-de-route"], perimetre: [], preuves: ["experience"], tarifs: ["budget"], contact: ["preparer-echange"] },
  "/services/controle-de-gestion-externalise": { besoin: ["definition"], livrables: ["kpis"], exemple: ["exemple-tableau-de-bord"], deroulement: ["revue-mensuelle", "methodologie"], perimetre: ["vs-comptable"], preuves: ["temoignages"], contact: ["cta-final"] },
  "/services/comptabilite-externalisation": { besoin: ["definition", "signaux"], livrables: ["benefices"], deroulement: ["approche-iter"], perimetre: ["comparatif", "erreurs-eviter"], contact: ["conclusion"] },
  "/services/previsionnel-tresorerie": { besoin: ["mission"], exemple: ["exemple-tresorerie"] },
  "/services/gestion-financiere-externalisee": { besoin: ["mission"] },
  "/services/accompagnement-levee-de-fond": { besoin: ["mission"] },
};

function Aliases({ service, section }: { service: FinanceService; section: string }) {
  return (anchors[service.path]?.[section] ?? []).map(id => <span key={id} id={id} className={styles.anchor} aria-hidden="true" />);
}

export default function FinanceServicePage({ service, locale = "fr" }: { service: FinanceService; locale?: Locale }) {
  const ui = financeInterface[locale];
  const services = getFinanceServices(locale);
  const href = (path: string) => parityHref(path, locale);
  const path = href(service.path);
  const originalProof = service.case ? getDocumentedCase(service.case) : undefined;
  const translatedProof = locale === "fr" ? undefined : getPublishedCases(locale).find(item => item.slug === service.case);
  const proof = originalProof && { ...originalProof, ...(translatedProof ? { proof: translatedProof.solution, summary: translatedProof.challenge } : {}) };
  const contact = href(`/contact#${service.context}`);
  const author = service.author ?? FINANCE_AUTHOR;
  const modified = PAGE_REVISIONS[path] ?? (locale === "fr" ? FINANCE_REVIEW_DATE : LOCALE_ALIGNMENT_DATE);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebPageSchema({ path, name: service.headline, description: service.description, locale, author, dateModified: modified }),
      { "@type": "Service", "@id": `https://www.iteradvisors.com${path}#service`, name: service.headline, description: service.intro, url: `https://www.iteradvisors.com${path}`, provider: { "@id": "https://www.iteradvisors.com/#organization" }, ...(service.areaServed ? { areaServed: { "@type": "Place", name: service.areaServed } } : {}) },
      { "@type": "FAQPage", mainEntity: service.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };
  const copy = "text-base text-muted-foreground leading-relaxed";
  const link = "internal-link-card font-medium";
  const proofTitle = proof ? `${ui.documented} : ${proof.company}` : ui.people;
  return <PageLayout locale={locale}>
    <div data-finance-template="service" data-page-id={service.path}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <ServiceHero locale={locale} title={service.headline} label={service.label} eyebrow={`Iter Advisors · ${service.category}`} lead={service.promise} intro={service.intro}
        primary={{ href: contact, label: ui.cta }} secondary={{ href: "#livrables", label: ui.deliverables }}
        summary={service.summary.map(([label, value]) => ({ label, value }))}
        proof={<p className="text-sm text-muted-foreground mt-4">{ui.intro}</p>}
        navigation={[{ id: "besoin", label: ui.need }, { id: "livrables", label: ui.outputs }, { id: "preuves", label: proof ? ui.caseNav : ui.teamNav }, { id: "deroulement", label: ui.method }, { id: "tarifs", label: ui.budget }, { id: "faq", label: ui.answers }]} />
      <ServiceSection id="besoin" title={service.headings?.need ?? ui.fitHeading}>
        <Aliases service={service} section="besoin" />
        <p className={copy}>{service.definition}</p>
        <ul className="space-y-3 list-disc pl-5 text-muted-foreground leading-relaxed">{service.signals.map(item => <li key={item}>{item}</li>)}</ul>
      </ServiceSection>
      <ServiceSection id="livrables" title={service.headings?.deliverables ?? ui.inHand}>
        <Aliases service={service} section="livrables" />
        <p className={copy}>{ui.chosen}</p>
        <div className="divide-y divide-border">{service.deliverables.map(([title, detail, decision]) => <article key={title} className="py-6 first:pt-0">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <dl className="mt-4 grid sm:grid-cols-2 gap-5">
            <div><dt className="font-semibold text-foreground">{ui.outputs}</dt><dd className={`${copy} mt-2`}>{detail}</dd></div>
            <div><dt className="font-semibold text-foreground">{ui.decide}</dt><dd className={`${copy} mt-2`}>{decision}</dd></div>
          </dl>
        </article>)}</div>
        <aside id="exemple" className="relative site-card border border-border border-l-2 border-l-iter-violet p-5 sm:p-7">
          <Aliases service={service} section="exemple" />
          <p className="site-eyebrow">{ui.practice}</p><h3 className="font-semibold text-foreground">{service.exampleTitle}</h3><p className={`${copy} mt-4`}>{service.example}</p>
        </aside>
      </ServiceSection>
      <ServiceSection id="preuves" title={proofTitle}>
        <Aliases service={service} section="preuves" />
        {proof ? <article className="site-card border border-border p-5 sm:p-7">
          <h3 className="font-semibold text-foreground">{proof.proof}</h3><p className={`${copy} mt-4`}>{proof.summary}</p>
          {service.proofNote && <p className={`${copy} mt-4`}>{service.proofNote}</p>}
          <PublishedLocaleLink locale={locale} href={href(proof.href)} className={`${link} inline-flex mt-5`}>{ui.readCase}</PublishedLocaleLink>
        </article> : <><p className={copy}>{ui.caseIntro}</p><PublishedLocaleLink locale={locale} href={href("/a-propos#equipe")} className={link}>{ui.team}</PublishedLocaleLink></>}
      </ServiceSection>
      {service.calendar && <ServiceSection id="rythme" title={service.calendar.heading ?? ui.calendar}>
        <ServiceTable caption={service.calendar.caption} headers={service.calendar.headers} rows={service.calendar.rows} /><p className={copy}>{service.calendar.note}</p>
      </ServiceSection>}
      <ServiceSection id="deroulement" title={service.headings?.method ?? ui.together} tinted>
        <Aliases service={service} section="deroulement" />
        <ol className="space-y-6">{service.steps.map(([title, text], i) => <li key={title}><h3 className="font-semibold text-foreground"><span className="text-iter-violet">{i + 1}. </span>{title}</h3><p className={`${copy} mt-2`}>{text}</p></li>)}</ol>
      </ServiceSection>
      <ServiceSection id="perimetre" title={service.scopeTitle}>
        <Aliases service={service} section="perimetre" />
        {service.scope.map(text => <p key={text} className={copy}>{text}</p>)}
        <PublishedLocaleLink locale={locale} href={href("/daf-externalise")} className={link}>{service.context === "organisation" ? ui.overall : ui.position}</PublishedLocaleLink>
      </ServiceSection>
      <ServiceSection id="tarifs" title={ui.quote}>
        <Aliases service={service} section="tarifs" /><p className={copy}>{service.budget}</p>
        <PublishedLocaleLink locale={locale} href={href(service.budgetResource?.href ?? "/daf-externalise/tarifs")} className={link}>{service.budgetResource?.label ?? ui.prices}</PublishedLocaleLink>
      </ServiceSection>
      <ServiceSection id="faq" title={`FAQ : ${service.label.toLowerCase()}`}>
        <Aliases service={service} section="faq" />
        <ServiceFaq items={service.faq.map(([question, answer]) => ({ question, answer }))} />
      </ServiceSection>
      <ServiceSection id="aller-plus-loin" title={ui.resources}>
        <ul className="space-y-4">{service.resources.map(([title, resourcePath]) => <li key={resourcePath}><PublishedLocaleLink locale={locale} href={href(resourcePath)} className={link}>{title}</PublishedLocaleLink></li>)}</ul>
        <nav aria-label={ui.related} className="text-sm"><p className="font-semibold mb-3">{ui.related}</p><ul className="flex flex-wrap gap-x-5 gap-y-3">{service.related.map(key => <li key={key}><PublishedLocaleLink locale={locale} href={href(services[key].path)} className={link}>{services[key].label}</PublishedLocaleLink></li>)}</ul></nav>
        <PageByline locale={locale} author={author} dateModified={modified} />
      </ServiceSection>
      <ServiceContact locale={locale} title={ui.decision} text={ui.contact} href={contact} label={ui.describe}>
        <Aliases service={service} section="contact" />
      </ServiceContact>
    </div>
  </PageLayout>;
}
