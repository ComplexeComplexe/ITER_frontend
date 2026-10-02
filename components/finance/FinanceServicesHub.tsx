import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import PageByline from "@/components/PageByline";
import { FINANCE_SERVICES, FINANCE_REVIEW_DATE } from "@/lib/content/finance-services";
import { editorialWebPageSchema, FINANCE_AUTHOR } from "@/lib/schemas/editorial";
import { getServicesContent } from "@/lib/content/services";
import { PAGE_REVISIONS } from "@/lib/content/page-revisions";
import styles from "./finance.module.css";

const groups = [
  { id: "direction", title: "Une direction financière adaptée à votre rythme", intro: "Un interlocuteur pour le pilotage récurrent, ou un relais pour une période définie.", keys: ["temps-partage", "transition"] },
  { id: "pilotage", title: "Des chiffres pour préparer vos décisions", intro: "Commencer par un besoin précis : comprendre vos marges ou anticiper les échéances de cash.", keys: ["controle", "tresorerie"] },
  { id: "organisation", title: "Une organisation qui tient dans la durée", intro: "Clarifier les responsabilités et la circulation des données, avec votre équipe et vos conseils.", keys: ["comptabilite", "organisation"] },
  { id: "operations", title: "La préparation financière de vos opérations", intro: "Des missions définies selon le projet, les informations disponibles et les autres intervenants.", keys: ["levee", "due-diligence"] },
];

export default function FinanceServicesHub() {
  const modified = PAGE_REVISIONS["/services"] ?? FINANCE_REVIEW_DATE;
  const schema = editorialWebPageSchema({ path: "/services", name: "Services finance pour PME et startups", description: "Choisir un accompagnement de direction financière, de reporting, de trésorerie ou d’organisation selon votre besoin.", locale: "fr", author: FINANCE_AUTHOR, dateModified: modified });
  return <PageLayout locale="fr"><div className={styles.root} data-finance-template="hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={`${styles.hero} site-hero`}><div className={styles.wrap}><Breadcrumb locale="fr" items={[{ label: "Services finance" }]} /><div className={styles.hubHero}>
      <p className={styles.eyebrow}>Les services finance d’Iter Advisors</p><h1>Services finance pour PME et startups</h1><p className={styles.promise}>Le bon accompagnement, au bon endroit.</p><p className={styles.intro}>Partons du besoin à traiter : un DAF dans la durée, un remplacement, des marges à comprendre ou une opération à préparer. Chaque mission précise les travaux, les responsabilités et les livrables.</p><div className={styles.actions}><a href="#direction" className={`${styles.primary} site-button site-button-primary`}>Trouver mon accompagnement <span aria-hidden="true">↓</span></a><Link href="/daf-externalise" className={styles.textLink}>Découvrir notre direction financière externalisée ↗</Link></div>
    </div></div></section>
    <nav className={styles.subnav} aria-label="Les besoins financiers"><div className={styles.wrap}><a href="#direction">Direction financière</a><a href="#pilotage">Reporting et trésorerie</a><a href="#organisation">Organisation</a><a href="#operations">Opérations</a></div></nav>
    <div className={styles.wrap}>{groups.map((group, index) => <section id={group.id} key={group.id} className={`${styles.section} ${styles.stacked}`}>
      <div className={styles.sectionHeading}><p className={styles.eyebrow}>0{index + 1} · Votre priorité</p><h2>{group.title}</h2><p>{group.intro}</p></div>
      <div className={styles.hubGrid}>{group.keys.map(key => { const service = FINANCE_SERVICES[key]; return <article key={key} className={styles.hubItem}><h3><Link href={service.path}>{service.label}<span aria-hidden="true">↗</span></Link></h3><p>{service.promise}</p><p>{service.summary[0][1]}.</p><Link href={service.path} className={styles.textLink}>Voir les missions et les livrables</Link></article>; })}</div>
    </section>)}
    <section className={styles.section}><div className={styles.sectionHeading}><p className={styles.eyebrow}>Comment choisir ?</p><h2>Commencer par la décision à préparer.</h2></div><div className={styles.sectionBody}><p>Un besoin transversal et récurrent appelle souvent un DAF à temps partagé. Un sujet ciblé peut justifier une mission de reporting, de trésorerie ou d’organisation. Un remplacement temporaire relève de la transition.</p><p>Le premier échange sert à situer votre priorité, votre équipe et vos échéances. Le devis distingue les travaux inclus, les projets complémentaires et les interventions de vos autres conseils.</p><Link className={styles.textLink} href="/daf-externalise/tarifs">Consulter les tarifs DAF ↗</Link></div></section>
    <section className={`${styles.section} ${styles.stacked}`}><div className={styles.sectionHeading}><p className={styles.eyebrow}>Explorer une mission réelle</p><h2>Des cas pour comprendre notre travail</h2></div><div className={styles.resourceList}><Link href="/ressources/cas-clients/opti-digital-structuration-financement">Opti Digital : structurer la fonction finance <span aria-hidden="true">↗</span></Link><Link href="/ressources/cas-clients/seasonly-marge-par-canal-bfr">Seasonly : marge par canal et BFR <span aria-hidden="true">↗</span></Link><Link href="/ressources/cas-clients/solarmente-serie-b-cleantech">SolarMente : préparation financière et financement <span aria-hidden="true">↗</span></Link></div></section>
    <section className={styles.contact}><p className={styles.eyebrow}>Un point de départ simple</p><h2>Quel sujet finance<br />prend trop de place aujourd’hui ?</h2><p>Décrivez votre besoin et votre échéance. Nous préciserons le type d’accompagnement à envisager.</p><Link href="/contact#services-finance" className={`${styles.primary} site-button site-button-primary`}>Décrire mon besoin <span aria-hidden="true">↗</span></Link></section>
    <section className={`${styles.section} ${styles.stacked}`}><div className={styles.sectionHeading}><h2>Vous cherchez un accompagnement RH ?</h2><p>Découvrez l’autre pôle d’expertise du cabinet.</p></div><div className={styles.related}><Link href="/drh-externalise">DRH externalisé ↗</Link>{getServicesContent("fr").services.filter(service => service.category === "rh").map(service => <Link key={service.href} href={service.href}>{service.title} ↗</Link>)}</div></section>
    <div className={styles.byline}><PageByline locale="fr" author={FINANCE_AUTHOR} dateModified={modified} /></div>
    </div>
  </div></PageLayout>;
}
