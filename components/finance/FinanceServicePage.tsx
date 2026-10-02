import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import ServiceHero from "@/components/design/ServiceHero";
import PageByline from "@/components/PageByline";
import { FINANCE_SERVICES, FINANCE_REVIEW_DATE, type FinanceService } from "@/lib/content/finance-services";
import { getDocumentedCase } from "@/lib/content/documented-cases";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";
import { PAGE_REVISIONS } from "@/lib/content/page-revisions";
import styles from "./finance.module.css";

// Retain links to sections already shared or indexed before the redesign.
const anchors: Record<string, Record<string, string[]>> = {
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

export default function FinanceServicePage({ service }: { service: FinanceService }) {
  const proof = service.case ? getDocumentedCase(service.case) : undefined;
  const contact = `/contact#${service.context}`;
  const modified = PAGE_REVISIONS[service.path] ?? FINANCE_REVIEW_DATE;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      editorialWebPageSchema({ path: service.path, name: service.headline, description: service.description, locale: "fr", author: FINANCE_AUTHOR, dateModified: modified }),
      { "@type": "Service", "@id": `https://www.iteradvisors.com${service.path}#service`, name: service.headline, description: service.intro, url: `https://www.iteradvisors.com${service.path}`, provider: { "@id": "https://www.iteradvisors.com/#organization" } },
      { "@type": "FAQPage", mainEntity: service.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };
  return (
    <PageLayout locale="fr">
      <div className={styles.root} data-finance-template="service">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <ServiceHero title={service.headline} label={service.label} eyebrow={`Iter Advisors · ${service.category}`} lead={service.promise} intro={service.intro}
          primary={{ href: contact, label: "Parlons de votre besoin" }} secondary={{ href: "#livrables", label: "Voir les livrables" }}
          summary={service.summary.map(([label, value]) => ({ label, value }))}
          proof={<p className={styles.micro}>Premier échange pour préciser votre situation et la suite.</p>}
          navigation={[{ id: "besoin", label: "Votre besoin" }, { id: "livrables", label: "Les livrables" }, { id: "deroulement", label: "La méthode" }, { id: "tarifs", label: "Le budget" }, { id: "faq", label: "Les réponses" }]} />
        <div className={styles.wrap}>
          <section id="besoin" className={styles.section}>
            <Aliases service={service} section="besoin" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>01 · Le bon accompagnement</p><h2>{service.headings?.need ?? <>Vous vous reconnaissez<br />dans ces situations ?</>}</h2></div>
            <div className={styles.sectionBody}>
              <ul className={styles.signals}>{service.signals.map(item => <li key={item}>{item}</li>)}</ul>
              <p>{service.definition}</p>
            </div>
          </section>
          <section id="livrables" className={`${styles.section} ${styles.stacked}`}>
            <Aliases service={service} section="livrables" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>02 · Du travail concret</p><h2>{service.headings?.deliverables ?? "Ce que vous avez en main"}</h2><p>Les livrables sont choisis au cadrage, selon vos priorités et les données disponibles.</p></div>
            <div className={styles.deliverables}>{service.deliverables.map(([title, detail, decision], i) => <article key={title} className={styles.deliverable}>
              <span className={styles.number} aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{detail}</p><div className={styles.use}><span>Pour décider</span><p>{decision}</p></div>
            </article>)}</div>
            <aside id="exemple" className={styles.example}>
              <Aliases service={service} section="exemple" />
              <div><p className={styles.eyebrow}>En pratique</p><h3>{service.exampleTitle}</h3></div><p>{service.example}</p>
            </aside>
          </section>
          <section id="deroulement" className={styles.section}>
            <Aliases service={service} section="deroulement" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>03 · Une méthode partagée</p><h2>{service.headings?.method ?? <>Comment nous<br />travaillons ensemble</>}</h2></div>
            <ol className={styles.steps}>{service.steps.map(([title, text], i) => <li key={title}><span className={styles.stepNumber} aria-hidden="true">{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          </section>
          <section id="perimetre" className={styles.section}>
            <Aliases service={service} section="perimetre" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>04 · Les responsabilités</p><h2>{service.scopeTitle}</h2></div>
            <div className={styles.sectionBody}>{service.scope.map(text => <p key={text}>{text}</p>)}<Link href="/daf-externalise" className={styles.textLink}>{service.context === "organisation" ? "Découvrir notre direction financière externalisée" : "Situer ce besoin dans une mission de DAF externalisé"} <span aria-hidden="true">↗</span></Link></div>
          </section>
          <section id="tarifs" className={styles.budget}>
            <Aliases service={service} section="tarifs" />
            <div><p className={styles.eyebrow}>Le budget</p><h2>Un périmètre avant un devis.</h2></div>
            <div><p>{service.budget}</p><Link href="/daf-externalise/tarifs" className={styles.textLink}>Consulter les tarifs DAF <span aria-hidden="true">↗</span></Link></div>
          </section>
          <section id="preuves" className={styles.section}>
            <Aliases service={service} section="preuves" />
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>{proof ? "Une mission documentée" : "Avant de vous engager"}</p><h2>{proof ? proof.company : "Parler avec les personnes qui interviennent."}</h2></div>
            <div className={styles.sectionBody}>{proof ? <><h3>{proof.proof}</h3><p>{proof.summary}</p><Link href={proof.href} className={styles.textLink}>Lire le cas et son périmètre <span aria-hidden="true">↗</span></Link></> : <><p>Le premier échange permet de préciser votre situation. Le cadrage identifie ensuite le profil, les compétences et les modalités de collaboration adaptés à la mission.</p><Link href="/a-propos#equipe" className={styles.textLink}>Découvrir l’équipe Iter <span aria-hidden="true">↗</span></Link></>}</div>
          </section>
          <section id="faq" className={styles.section}>
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>Vos questions</p><h2>{`FAQ : ${service.label.toLowerCase()}`}</h2></div>
            <div className={styles.faq}>{service.faq.map(([question, answer]) => <details key={question}><summary><h3>{question}</h3><span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
          </section>
          <section className={`${styles.section} ${styles.stacked}`} aria-labelledby="aller-plus-loin">
            <div className={styles.sectionHeading}><p className={styles.eyebrow}>Pour préparer la suite</p><h2 id="aller-plus-loin">Les ressources utiles</h2></div>
            <div className={styles.resourceList}>{service.resources.map(([title, href]) => <Link key={href} href={href}>{title}<span aria-hidden="true">↗</span></Link>)}</div>
            <div className={styles.related}><p>Un besoin complémentaire ?</p>{service.related.map(key => <Link key={key} href={FINANCE_SERVICES[key].path}>{FINANCE_SERVICES[key].label} <span aria-hidden="true">↗</span></Link>)}</div>
          </section>
          <section id="contact" className={styles.contact}>
            <Aliases service={service} section="contact" />
            <p className={styles.eyebrow}>Commençons par votre situation</p><h2>Quelle décision ou échéance<br />souhaitez-vous préparer ?</h2><p>Décrivez votre besoin, votre organisation actuelle et votre calendrier. Nous préciserons ensemble les travaux utiles.</p><Link href={contact} className={styles.primary}>Décrire mon besoin <span aria-hidden="true">↗</span></Link>
          </section>
          <div className={styles.byline}><PageByline locale="fr" author={FINANCE_AUTHOR} dateModified={modified} /></div>
        </div>
      </div>
    </PageLayout>
  );
}
