import ScopeResponsibilities from "@/components/finance/ScopeResponsibilities";
import { PEOPLE, personId } from "@/lib/company-facts";
import HrCatalogue from "@/components/HrCatalogue";
import { formatLongDate, type Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { colon } from "@/lib/quote-marks";
import { hrText, localizeHrValue } from "@/lib/content/hr-locales";
import PublishedLocaleLink from "@/components/PublishedLocaleLink";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import ServiceHero from "@/components/design/ServiceHero";
import ServiceSection from "@/components/design/ServiceSection";
import ServiceFaq from "@/components/design/ServiceFaq";
import ServiceContact from "@/components/design/ServiceContact";
import HRExpert from "@/components/HRExpert";
import { HR_FAQ, HR_TIME_FAQ, HR_LINKS, HR_TERMS } from "@/lib/content/hr-offer";
import { faqPageSchema } from "@/lib/schemas";
import { HR_COMMERCIAL_COPY, hrOfferCatalog } from "@/lib/content/hr-commercial";
import { HrPillars, HrComparison, HrFees, HrCountries, HrTools } from "@/components/HrCommercialBlocks";
import { PAGE_REVISIONS } from "@/lib/content/page-revisions";
import PageByline from "@/components/PageByline";
import { PILLAR_DECISIONS } from "@/lib/content/pillar-decisions";
import { getSiteInterface } from "@/lib/content/site-interface";
import type { CmsNavItem } from "@/lib/static-content";
import compactUx from "@/components/finance/control-deliverables.module.css";

export default function DrhFrenchPage({ sharedTime = false, cmsNavigation, locale = "fr" }: { sharedTime?: boolean; cmsNavigation?: CmsNavItem[]; locale?: Locale }) {
  const t = (value: string) => hrText(value, locale);
  const compact = locale === "fr" && !sharedTime;
  const href = (value: string) => parityHref(value, locale);
  const path = href(sharedTime ? "/drh-externalise/temps-partage" : "/drh-externalise");
  const title = sharedTime ? t("Comment fonctionne un DRH à temps partagé ?") : t("DRH externalisé pour PME et startups");
  const commercial = HR_COMMERCIAL_COPY[locale];
  const decisions = PILLAR_DECISIONS[locale];
  const ui = getSiteInterface(locale);
  const modified = PAGE_REVISIONS[path] ?? "2026-10-03";
  const faq = localizeHrValue(sharedTime ? HR_TIME_FAQ : HR_FAQ, locale).map(item =>
    !sharedTime && item.question === t("Où et comment se déroule la mission ?")
      ? { ...decisions.hrCoverage }
      : { ...item },
  );
  if (!sharedTime) {
    faq[1] = { ...faq[1], answer: commercial.priceFaq };
  }
  const needs = sharedTime ? [
    [t("Un rythme convenu"), t("Définir les jours ou plages d’intervention, les réunions et les moyens de contact. Adapter la présence aux travaux prévus, sans promettre une disponibilité à temps plein.")],
    [t("Des responsabilités explicites"), t("Le dirigeant conserve ses décisions d’employeur. Le DRH prépare les options, accompagne les managers et coordonne les intervenants dans le périmètre convenu.")],
    [t("Une continuité organisée"), t("Partager un suivi des actions et des documents accessibles aux personnes autorisées. Prévoir les relais en cas d’absence et les conditions de passation.")],
  ] : [
    [t("Votre entreprise grandit"), t("Les recrutements et les arrivées se multiplient. Vous souhaitez organiser les priorités, les responsabilités et l’intégration des collaborateurs.")],
    [t("Le dirigeant porte les sujets RH"), t("Les décisions de rémunération, les demandes des équipes et la coordination des prestataires prennent du temps. Vous avez besoin d’un interlocuteur pour structurer le suivi.")],
    [t("Vos managers ont besoin de repères"), t("Fiches de poste, entretiens, rôles et pratiques managériales doivent être clarifiés pour accompagner les équipes.")],
  ];
  const deliverables = sharedTime ? [
    t("Un tableau de suivi partagé : sujet, responsable, décision attendue et prochaine échéance."),
    t("Un ordre du jour préparé avant chaque point avec le dirigeant ou les managers."),
    t("Un calendrier des présences et des relais pour les périodes sans intervention."),
    t("Une organisation documentaire avec les accès limités aux personnes concernées."),
    t("Une liste des travaux en cours et des décisions à transmettre lors de la passation."),
  ] : [
    t("Une feuille de route avec priorités, responsables et prochaines décisions."),
    t("Un plan de recrutement, des fiches de poste et une trame d’intégration."),
    t("Un calendrier RH et une répartition des rôles entre équipe et prestataires."),
    t("Des indicateurs de suivi expliqués et des points réguliers avec les managers."),
    t("Un état des travaux et des documents à transmettre en fin de mission."),
  ];
  const steps = sharedTime ? [
    [t("Préparer les accès"), t("Identifier les interlocuteurs, les documents utiles et les droits nécessaires avant la première intervention.")],
    [t("Installer les rendez-vous"), t("Convenir du calendrier, des points avec les managers et des décisions qui nécessitent le dirigeant.")],
    [t("Suivre entre les présences"), t("Tenir le tableau des actions à jour et préciser qui prend le relais. Le traitement des urgences doit être convenu.")],
    [t("Ajuster et transmettre"), t("Réexaminer le rythme selon les travaux en cours. Préparer une passation documentée si le besoin évolue vers un poste interne.")],
  ] : [
    [t("Diagnostic de votre organisation RH"), t("Faire le point sur vos équipes, vos ressources RH, les sujets ouverts et les décisions à préparer.")],
    [t("Périmètre et livrables de la mission"), t("Définir le périmètre, les livrables, les interlocuteurs et le rythme. Identifier les spécialistes nécessaires.")],
    [t("Travail avec les managers et prestataires"), t("Travailler avec les managers et prestataires, suivre les actions et documenter les décisions.")],
    [t("Revue des priorités et passation"), t("Faire le point sur les travaux, ajuster les priorités et préparer la suite ou la passation.")],
  ];
  return <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
    <div className={compact ? compactUx.test : undefined}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", "@id": `https://www.iteradvisors.com${path}#service`, name: title, url: `https://www.iteradvisors.com${path}`, provider: { "@id": "https://www.iteradvisors.com/#organization" }, mainEntityOfPage: { "@id": `https://www.iteradvisors.com${path}#webpage` }, areaServed: [{ "@type": "Country", name: "France" }, { "@type": "Country", name: "Spain" }], serviceType: t("Direction RH externalisée"), ...(!sharedTime && { hasOfferCatalog: hrOfferCatalog(locale) }), description: sharedTime ? t("Fonctionnement, rythme, responsabilités et passation d’une direction RH à temps partagé.") : t("Direction RH pour PME et startups : organisation, recrutement et accompagnement des managers, selon un périmètre convenu.") }) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "@id": `https://www.iteradvisors.com${path}#webpage`, url: `https://www.iteradvisors.com${path}`, name: title, inLanguage: locale === "fr" ? "fr-FR" : locale === "en" ? "en-GB" : "es-ES", dateModified: modified, author: { "@id": personId(PEOPLE.borith.slug) }, about: { "@id": "https://www.iteradvisors.com/a-propos/borith-biv#person" }, publisher: { "@id": "https://www.iteradvisors.com/#organization" }, isPartOf: { "@id": "https://www.iteradvisors.com/#website" }, mainEntity: { "@id": `https://www.iteradvisors.com${path}#service` } }) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(faq)) }} />
    <ServiceHero locale={locale} family="rh" isRoot={!sharedTime} title={title} label={sharedTime ? t("Temps partagé") : t("DRH externalisé")}
      lead={sharedTime ? t("Une présence régulière, des priorités suivies, des responsabilités définies.") : t("Structurer vos équipes, accompagner vos managers, organiser vos priorités RH.")}
      intro={sharedTime ? t("Le temps partagé permet de travailler dans la durée avec une direction RH extérieure. Sa valeur dépend du périmètre, des relais internes et de la continuité organisée entre les interventions.") : commercial.intro}
      primary={{ href: href(sharedTime ? "/contact#drh-temps-partage" : "/contact#drh"), label: t("Parlons de votre besoin RH") }}
      summary={[{ label: t("Votre besoin"), value: sharedTime ? t("Un accompagnement RH régulier") : t("Organisation, recrutement et management") }, { label: t("Le périmètre"), value: t("Défini selon vos priorités et votre équipe") }, { label: t("Le budget"), value: sharedTime ? t("Sur devis, selon les travaux et le rythme convenus") : commercial.budget }]}
      navigation={[{ id: "besoins", label: sharedTime ? t("Le rythme") : t("Vos besoins") }, ...(!sharedTime ? [{ id: "piliers", label: t("Les missions") }] : []), { id: "livrables", label: t("Les livrables") }, { id: "fonctionnement", label: t("La méthode") }, { id: "budget", label: t("Le budget") }, { id: "questions", label: t("Les réponses") }]} />
    <ServiceSection id="besoins" title={sharedTime ? t("Intégrer le DRH dans votre organisation") : t("Quand faire appel à un DRH externalisé ?")}><span id="quand" /><div className={compact ? compactUx.list : "grid md:grid-cols-3 gap-6"}>{needs.map(([h,p], i) => <article key={h} className={compact ? compactUx.card : "site-card p-6"}>{compact && <span className={compactUx.number} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>}<h3 className={compact ? "font-semibold text-foreground" : "text-xl font-semibold mb-3"}>{h}</h3><p className="text-muted-foreground leading-relaxed">{p}</p></article>)}</div>
    {!sharedTime && <div className="grid md:grid-cols-2 gap-6 mt-8"><div id="pme" className="site-copy"><h3>{t("Organisation RH d’une PME")}</h3><p>{t("Clarifier la répartition des tâches entre dirigeant, managers, administration du personnel et prestataires. Prioriser les sujets qui nécessitent une direction RH et ceux qui relèvent d’une prestation spécialisée.")}</p></div><div id="startup" className="site-copy"><h3>{t("Recrutement et structuration RH d’une startup")}</h3><p>{t("Relier le plan de recrutement à la capacité d’intégration et au budget. Formaliser progressivement les rôles et les pratiques utiles, sans multiplier les processus avant qu’ils soient nécessaires.")}</p></div></div>}</ServiceSection>
    {!sharedTime && <ServiceSection id="experience-terrain" title={t("Exemples de missions RH menées par Borith Biv")}>
      <p className="text-muted-foreground leading-relaxed">{t("La question qui revient le plus souvent dans ses échanges avec les dirigeants concerne la conformité de leur organisation et de leurs contrats. Borith examine notamment la cohérence entre les fonctions exercées, la classification conventionnelle et les rémunérations, ainsi que le traitement des indemnités de télétravail. Les points juridiques sont validés avec les professionnels compétents.")}</p>
      <div className={compactUx.list}>
        <article className={compactUx.card}><span className={compactUx.number} aria-hidden="true">01</span><h3 className="font-semibold">{t("Élections CSE dans deux petites entreprises")}</h3><p>{t("Dans une entreprise de 14 salariés en France, Borith a organisé une élection partielle du CSE. Dans une seconde entreprise de moins de 20 salariés, il a accompagné la mise en place du premier CSE : communications, protocole préélectoral, échanges avec les organisations syndicales et les autorités, puis annonce des résultats. Pour cette seconde mission, il a aussi sélectionné et coordonné un prestataire de vote par correspondance, avec des tests et le suivi des deux tours.")}</p></article>
        <article className={compactUx.card}><span className={compactUx.number} aria-hidden="true">02</span><h3 className="font-semibold">{t("Revue des contrats et processus RH")}</h3><p>{t("Pour trois entreprises, dont deux disposant d’entités en Espagne, Borith a revu les processus et contrats de travail, puis accompagné la refonte des politiques RH et l’adaptation des contrats aux exigences de la convention collective. Les travaux ont également porté sur les affichages obligatoires, la prévention et la recherche de prestataires spécialisés.")}</p></article>
      </div>
      <p className="text-sm text-muted-foreground">{t("Exemples anonymisés décrits par Borith Biv. Ils illustrent les travaux réalisés, sans attribuer de résultat chiffré non documenté.")}</p>
    </ServiceSection>}
    {!sharedTime && <><HrPillars locale={locale} /><HrComparison locale={locale} /></>}
    {!sharedTime && <HrCatalogue locale={locale} />}
    <ServiceSection id="livrables" title={sharedTime ? t("Un suivi partagé pour avancer entre les interventions") : t("Quels livrables attendre d’une mission RH ?")}><p>{t("Les supports sont définis selon la mission. Ils peuvent comprendre :")}</p><ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed">{deliverables.map(item => <li key={item}>{item}</li>)}</ul><p>{t("Ces exemples décrivent des travaux possibles. Leur sélection et les modalités de réalisation figurent dans la proposition.")}</p><ScopeResponsibilities locale={locale} kind="hr" /></ServiceSection>
    <ServiceSection id="fonctionnement" title={sharedTime ? t("Organiser les premières semaines et le suivi") : t("Comment se déroule une mission de DRH externalisé ?")} tinted><ol className="space-y-6">{steps.map(([h,p],i)=><li key={h}><h3 className="font-semibold text-foreground"><span className="text-iter-violet">{i+1}. </span>{h}</h3><p className="text-base text-muted-foreground leading-relaxed mt-2">{p}</p></li>)}</ol><div className="site-actions"><Link className="site-inline-link" href={href(sharedTime ? "/drh-externalise" : "/drh-externalise/temps-partage")}>{sharedTime ? t("Voir l’offre de direction RH externalisée") : t("Approfondir le fonctionnement du temps partagé")}</Link></div></ServiceSection>
    <ServiceSection id="budget" title={sharedTime ? t("Définir la présence, la disponibilité et les honoraires") : commercial.priceTitle}>
      {sharedTime ? <div className="site-copy max-w-4xl"><p>{t("Précisez ce qui est réalisé pendant les plages prévues, ce qui peut être traité entre deux présences et comment une demande supplémentaire est chiffrée. Les déplacements, les relais et la préparation des réunions font partie des points à cadrer.")}</p><Link href={href("/drh-externalise#budget")} className="site-inline-link">{t("Voir les tarifs indicatifs RH")}</Link></div> : <HrFees locale={locale} includeHeading={false} />}
      <p className="site-copy text-muted-foreground max-w-4xl mt-6">{t(HR_TERMS)}</p>
    </ServiceSection>
    {!sharedTime && <ServiceSection id="cadrage" title={t("Comment choisir un DRH externalisé ?")}><ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed"><li>{t("Quelles décisions et quels livrables attendons-nous ?")}</li><li>{t("Qui intervient, avec quel rôle et quelles compétences ?")}</li><li>{t("Quel rythme est prévu et comment les demandes entre deux interventions sont-elles traitées ?")}</li><li>{t("Qui produit la paie et qui traite les questions juridiques ?")}</li><li>{t("Quel budget complet, quelle durée, quel préavis et quelle passation ?")}</li></ul><p>{t("Les réponses doivent figurer dans la proposition. Demandez des exemples de travaux correspondant à votre situation. Un témoignage financier du cabinet ne démontre pas une mission RH. Le cadrage peut conduire à réduire ou réorienter le besoin.")}</p></ServiceSection>}
    <ServiceSection id="interlocuteur" title={t("DRH, DAF et prestataires : qui fait quoi ?")}><HRExpert locale={locale} showOfferLink={sharedTime} /><div id="perimetre" className="site-copy space-y-5"><p>{t("Le DRH accompagne l’organisation et les équipes. Le DAF éclaire le budget, la masse salariale et les arbitrages financiers. Une mission RH peut être définie indépendamment de notre")}{" "}<Link href={href("/daf-externalise")}>{t("direction financière externalisée")}</Link>.</p><p>{t("Les sujets de droit du travail, de paie et de conformité nécessitant une compétence spécialisée sont coordonnés avec les professionnels concernés. Le périmètre de chacun doit être explicite.")}</p>{sharedTime ? <p>{t("Pour préciser les responsabilités, consultez la")}{" "}<PublishedLocaleLink href={href("/ressources/glossaire/drh-externalise")} locale={locale}>{t("définition du DRH externalisé")}</PublishedLocaleLink>{t(". Le choix d’un SIRH vient ensuite : notre")}{" "}<PublishedLocaleLink href={href("/ressources/outils/factorial")} locale={locale}>{t("analyse de Factorial")}</PublishedLocaleLink> {t("présente les critères à vérifier selon vos processus, vos droits d’accès et votre prestataire de paie.")}</p> : <p>{t("Pour préciser les responsabilités, consultez la")}{" "}<PublishedLocaleLink href={href("/ressources/glossaire/drh-externalise")} locale={locale}>{t("définition du DRH externalisé")}</PublishedLocaleLink>.</p>}</div></ServiceSection>
    {!sharedTime && <><HrCountries locale={locale} /><HrTools locale={locale} /></>}
    {!sharedTime && <>
      <ServiceSection id="retour-france-espagne" title={t("France–Espagne : le retour d’expérience de Borith")}>
        <p>{t("Son premier point de vigilance : reproduire les avantages sociaux d’un pays dans l’autre sans examiner leur cadre local, leur fiscalité et leur coût. Il cite notamment la couverture santé et la rémunération flexible en Espagne comme des sujets à étudier selon la situation de l’entreprise.")}</p>
        <p>{t("Il recommande aussi de vérifier la convention collective applicable dès la création de l’entité. Il a accompagné une entreprise dont le choix du « convenio » soulevait des difficultés de cohérence avec son activité. Les horaires, les classifications et les conditions de rémunération doivent être examinés dans ce cadre.")}</p>
        <p>{t("Enfin, il conseille de construire un budget complet plutôt que de supposer qu’une équipe espagnole coûtera systématiquement moins cher : métiers recherchés, localisation, avantages, bureaux et conditions de départ doivent entrer dans l’analyse.")}</p>
      </ServiceSection>
      <span id="avis-outils-borith" className="block scroll-mt-24" />
      <ServiceSection id="accompagnement-managers" title={t("Des supports concrets pour les managers et les salariés")}>
        <p>{t("Borith a mis en place des guides d’onboarding et d’offboarding, ainsi que des documents pour les entretiens annuels. Il accompagne aussi la préparation de dossiers de départ sensibles, l’identification des risques et la coordination avec les avocats, pour aider le dirigeant à préparer ses décisions.")}</p>
        <p>{t("Dans deux entreprises de 14 et 40 salariés, il a également renégocié les contrats de santé et de prévoyance pour rechercher une meilleure couverture à coût réduit ou comparable. Il a étudié des avantages complémentaires, dont la rémunération flexible en Espagne, selon le contexte local.")}</p>
        <p className="text-sm text-muted-foreground">{t("Retours de pratique communiqués par Borith Biv, Partner Capital Humain chez Iter Advisors.")}</p>
      </ServiceSection>
    </>}
    <ServiceSection id="ressources-rh" title={t("Approfondir votre besoin RH")}><div className="grid sm:grid-cols-2 gap-5 mt-8">{localizeHrValue(HR_LINKS, locale).map(x=><Link key={x.href} href={href(x.href)} className="site-card p-6"><h3 className="text-xl font-semibold mb-3">{x.label} ↗</h3><p className="text-muted-foreground">{x.description}</p></Link>)}</div><div className="site-actions"><Link className="site-inline-link" href={sharedTime ? href("/drh-externalise#cadrage") : "#cadrage"}>{t("Préparer le cadrage de votre mission RH")}</Link><PublishedLocaleLink locale={locale} className="site-inline-link" href={href("/ressources/blog/daf-drh-externalises-synergie")}>{t("Coordonner le DAF et le DRH")}</PublishedLocaleLink></div></ServiceSection>
    <ServiceSection id="questions" title={sharedTime ? t("Questions fréquentes sur le DRH à temps partagé") : t("Questions fréquentes sur le DRH externalisé")}>
      <ServiceFaq items={faq} />
      {sharedTime ? <p className="text-sm text-muted-foreground">{commercial.updated} <time dateTime={modified}>{formatLongDate(modified, locale)}</time> · <Link href={href("/a-propos/borith-biv")} className="text-iter-violet underline underline-offset-4">{ui.hrContact}{colon(locale)}Borith Biv</Link></p> : <>
        <p className="text-sm text-muted-foreground">{decisions.hrRevision}</p>
        <PageByline locale={locale} author={{ name: PEOPLE.borith.name, slug: PEOPLE.borith.slug }} dateModified={modified} />
      </>}
    </ServiceSection>
    <ServiceContact locale={locale} title={commercial.contactTitle} text={commercial.contactText} href={href(sharedTime ? "/contact#drh-temps-partage" : "/contact#drh")} label={t("Parlons de votre besoin RH")} />
    </div>
  </PageLayout>;
}
