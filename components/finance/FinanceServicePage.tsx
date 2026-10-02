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
  const modified = locale === "fr" ? (PAGE_REVISIONS[service.path] ?? FINANCE_REVIEW_DATE) : LOCALE_ALIGNMENT_DATE;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebPageSchema({ path, name: service.headline, description: service.description, locale, author, dateModified: modified }),
      { "@type": "Service", "@id": `https://www.iteradvisors.com${path}#service`, name: service.headline, description: service.intro, url: `https://www.iteradvisors.com${path}`, provider: { "@id": "https://www.iteradvisors.com/#organization" }, ...(service.areaServed ? { areaServed: { "@type": "Place", name: service.areaServed } } : {}) },
      { "@type": "FAQPage", mainEntity: service.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };
  return (
    <PageLayout locale={locale}>
      <div className={styles.root} data-finance-template="service" data-page-id={service.path}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <ServiceHero locale={locale} title={service.headline} label={service.label} eyebrow={`Iter Advisors · ${service.category}`} lead={service.promise} intro={service.intro}
          primary={{ href: contact, label: ui.cta }} secondary={{ href: "#livrables", label: ui.deliverables }}
          summary={service.summary.map(([label, value]) => ({ label, value }))}
          proof={<p className={styles.micro}>{ui.intro}</p>}
          navigation={[{ id: "besoin", label: ui.need }, { id: "livrables", label: ui.outputs }, { id: "deroulement", label: ui.method }, { id: "tarifs", label: ui.budget }, { id: "faq", label: ui.answers }]} />
        <div className={styles.wrap}>
          <section data-block-key="besoin" id="besoin" className={styles.section}>
            <Aliases service={service} section="besoin" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 · {ui.fit}</p><h2>{service.headings?.need ?? ui.fitHeading}</h2></div>
            <div className={styles.sectionBody}>
              <ul className={styles.signals}>{service.signals.map(item => <li key={item}>{item}</li>)}</ul>
              <p>{service.definition}</p>
            </div>
          </section>
          <section data-block-key="livrables" id="livrables" className={`${styles.section} ${styles.stacked}`}>
            <Aliases service={service} section="livrables" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>02 · {ui.concrete}</p><h2>{service.headings?.deliverables ?? ui.inHand}</h2><p>{ui.chosen}</p></div>
            <div className={styles.deliverables}>{service.deliverables.map(([title, detail, decision], i) => <article key={title} className={styles.deliverable}>
              <span className={styles.number} aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{detail}</p><div className={styles.use}><span>{ui.decide}</span><p>{decision}</p></div>
            </article>)}</div>
            <aside id="exemple" className={styles.example}>
              <Aliases service={service} section="exemple" />
              <div><p className={styles.eyebrow}>{ui.practice}</p><h3>{service.exampleTitle}</h3></div><p>{service.example}</p>
            </aside>
          </section>
          {service.calendar && <section data-block-key="rythme" id="rythme" className={`${styles.section} ${styles.stacked}`}>
            <div className={styles.sectionHeading}><h2>{service.calendar.heading ?? ui.calendar}</h2></div>
            <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={service.calendar.caption}>
              <table className={styles.calendar}><caption>{service.calendar.caption}</caption><thead><tr>{service.calendar.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{service.calendar.rows.map(([when, work, decision]) => <tr key={when}><th scope="row">{when}</th><td>{work}</td><td>{decision}</td></tr>)}</tbody></table>
            </div>
            <p>{service.calendar.note}</p>
          </section>}
          <section data-block-key="deroulement" id="deroulement" className={styles.section}>
            <Aliases service={service} section="deroulement" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>03 · {ui.shared}</p><h2>{service.headings?.method ?? ui.together}</h2></div>
            <ol className={styles.steps}>{service.steps.map(([title, text], i) => <li key={title}><span className={styles.stepNumber} aria-hidden="true">{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          </section>
          <section data-block-key="perimetre" id="perimetre" className={styles.section}>
            <Aliases service={service} section="perimetre" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>04 · {ui.responsibilities}</p><h2>{service.scopeTitle}</h2></div>
            <div className={styles.sectionBody}>{service.scope.map(text => <p key={text}>{text}</p>)}<PublishedLocaleLink locale={locale} href={href("/daf-externalise")} className={styles.textLink}>{service.context === "organisation" ? ui.overall : ui.position} <span aria-hidden="true">↗</span></PublishedLocaleLink></div>
          </section>
          <section data-block-key="tarifs" id="tarifs" className={styles.budget}>
            <Aliases service={service} section="tarifs" />
            <div><p className={styles.eyebrow}>{ui.budget}</p><h2>{ui.quote}</h2></div>
            <div><p>{service.budget}</p><PublishedLocaleLink locale={locale} href={href(service.budgetResource?.href ?? "/daf-externalise/tarifs")} className={styles.textLink}>{service.budgetResource?.label ?? ui.prices} <span aria-hidden="true">↗</span></PublishedLocaleLink></div>
          </section>
          <section data-block-key="preuves" id="preuves" className={styles.section}>
            <Aliases service={service} section="preuves" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>{proof ? ui.documented : ui.before}</p><h2>{proof ? proof.company : ui.people}</h2></div>
            <div className={styles.sectionBody}>{proof ? <><h3>{proof.proof}</h3><p>{proof.summary}</p>{service.proofNote && <p>{service.proofNote}</p>}<PublishedLocaleLink locale={locale} href={href(proof.href)} className={styles.textLink}>{ui.readCase} <span aria-hidden="true">↗</span></PublishedLocaleLink></> : <><p>{ui.caseIntro}</p><PublishedLocaleLink locale={locale} href={href("/a-propos#equipe")} className={styles.textLink}>{ui.team} <span aria-hidden="true">↗</span></PublishedLocaleLink></>}</div>
          </section>
          <section data-block-key="faq" id="faq" className={styles.section}>
            <Aliases service={service} section="faq" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>{ui.questions}</p><h2>{`FAQ : ${service.label.toLowerCase()}`}</h2></div>
            <div className={styles.faq}>{service.faq.map(([question, answer]) => <details key={question}><summary><h3>{question}</h3><span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
          </section>
          <section className={`${styles.section} ${styles.stacked}`} aria-labelledby="aller-plus-loin">
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>{ui.next}</p><h2 id="aller-plus-loin">{ui.resources}</h2></div>
            <div className={styles.resourceList}>{service.resources.map(([title, resourcePath]) => <PublishedLocaleLink locale={locale} key={resourcePath} href={href(resourcePath)}>{title}<span aria-hidden="true">↗</span></PublishedLocaleLink>)}</div>
            <div className={styles.related}><p>{ui.related}</p>{service.related.map(key => <PublishedLocaleLink locale={locale} key={key} href={href(services[key].path)}>{services[key].label} <span aria-hidden="true">↗</span></PublishedLocaleLink>)}</div>
          </section>
          <section data-block-key="contact" id="contact" className={styles.contact}>
            <Aliases service={service} section="contact" />
            <p className={styles.eyebrow}>{ui.start}</p><h2>{ui.decision}</h2><p>{ui.contact}</p><PublishedLocaleLink locale={locale} href={contact} className={styles.primary}>{ui.describe} <span aria-hidden="true">↗</span></PublishedLocaleLink>
          </section>
          <div className={styles.byline}><PageByline locale={locale} author={author} dateModified={modified} /></div>
        </div>
      </div>
    </PageLayout>
  );
}
