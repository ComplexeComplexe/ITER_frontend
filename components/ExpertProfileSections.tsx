import { COMPANY } from "@/lib/company-facts";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import en from "@/lib/content/expert-profile-en.json";
import es from "@/lib/content/expert-profile-es.json";
import PublishedLocaleLink from "@/components/PublishedLocaleLink";
import Link from "next/link";
import { FINANCE_EXPERT as expert } from "@/lib/content/finance-expert";

export default function ExpertProfileSections({ locale = "fr" }: { locale?: Locale }) {
  const href = (source: string) => parityHref(source, locale);
  const t = (source: string) => { if (locale === "fr") return source; const value = (locale === "en" ? en : es) as Record<string, string>; if (!value[source]) throw new Error(`Missing expert translation: ${locale}/${source}`); return value[source]; };
  return <div className="container max-w-4xl py-12 space-y-14">
    <section id="expertise" className="scroll-mt-28">
      <p className="site-eyebrow">{t("L’accompagnement financier")}</p><h2 className="mb-5">{t("Sur quels sujets échanger avec Sébastien ?")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {title:t("Direction financière à temps partagé"),text:t("Définir les priorités, organiser le pilotage et préparer les décisions avec le dirigeant."),href:"/daf-externalise"},
          {title:t("Trésorerie et reporting"),text:t("Relier les encaissements, les dépenses et les indicateurs aux échéances de l’entreprise."),href:"/services/previsionnel-tresorerie"},
          {title:t("Financement et acquisitions"),text:t("Préparer le modèle financier, les documents investisseurs et les analyses nécessaires à une opération."),href:"/services/accompagnement-levee-de-fond"},
          {title:t("Outils, automatisation et IA en finance"),text:t("Partir d’un besoin métier, définir les contrôles et évaluer l’intérêt d’un pilote avec l’équipe finance."),href:"/ressources/ia-finance"},
        ].map(item=><Link key={item.href} href={href(item.href)} className="site-card rounded-2xl border border-border p-6 hover:border-iter-violet"><h3 className="mb-3">{item.title}</h3><p className="text-muted-foreground leading-relaxed">{item.text}</p><span className="block mt-4 text-iter-violet text-sm underline">{t("Découvrir le sujet")}</span></Link>)}
      </div>
      <p className="mt-5 text-muted-foreground leading-relaxed">{t("Pour l’IA, le rôle du DAF porte sur les données, les indicateurs et la validation des résultats. Les guides distinguent les cas publics, les exercices pédagogiques et les missions du cabinet. Ils ne remplacent pas l’analyse de votre situation.")}</p>
    </section>
    <section id="parcours" className="scroll-mt-28">
      <p className="site-eyebrow">{t("Expérience opérationnelle")}</p><h2 className="mb-5">{t("Un parcours de direction financière")}</h2>
      <ul className="divide-y divide-border">
        <li className="py-4"><h3>{t("Iter Advisors")}</h3><p className="text-muted-foreground mt-2">{({ fr: `Cofondateur et CFO depuis ${COMPANY.foundingYear}. Accompagnement des dirigeants sur la structuration financière et les financements.`, en: `Co-founder and CFO since ${COMPANY.foundingYear}. Supporting business leaders with financial structuring and financing.`, es: `Cofundador y CFO desde ${COMPANY.foundingYear}. Acompañamiento a directivos en estructuración financiera y financiación.` }[locale])}</p></li>
        <li className="py-4"><h3>{t("Carts Guru et Terres de Café")}</h3><p className="text-muted-foreground mt-2">{t("Des fonctions de direction financière avant Iter Advisors, dans des entreprises en développement.")}</p></li>
        <li className="py-4"><h3>{t("Happy Scribe et SolarMente")}</h3><p className="text-muted-foreground mt-2">{t("Des missions de CFO à temps partagé présentées dans son parcours professionnel public.")}</p></li>
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">{t("Parcours à consulter sur")}{" "}<a href={expert.linkedin} className="text-iter-violet underline">{t("LinkedIn")}</a> {t("et")}{" "}<a href={expert.malt} className="text-iter-violet underline">{t("Malt")}</a>{t(". Les périmètres et résultats des missions du cabinet sont présentés séparément dans nos")}{" "}<PublishedLocaleLink locale={locale} href={href("/ressources/cas-clients")} className="text-iter-violet underline">{t("cas clients")}</PublishedLocaleLink>.</p>
    </section>
    <section id="interventions" className="scroll-mt-28">
      <p className="site-eyebrow">{t("Prise de parole publique")}</p><h2 className="mb-5">{t("Sébastien dans Le Nerf de la Guerre")}</h2>
      <article className="site-card rounded-2xl bg-iter-violet/5 p-6 sm:p-8"><p className="text-sm text-muted-foreground mb-3">{t("Podcast · épisode 12 ·")}{" "}<time dateTime={expert.podcast.date}>{t("7 février 2025")}</time></p><h3 className="mb-4">{locale === "fr" ? expert.podcast.title : locale === "en" ? "Managing the financial side of subsidiary acquisitions" : "Gestionar la parte financiera de adquisiciones de filiales"}</h3><p className="leading-relaxed text-muted-foreground">{t("Dans cet entretien, Sébastien revient sur son parcours et son expérience des acquisitions de filiales. Une intervention pour découvrir sa pratique de la direction financière et les sujets qu’il rencontre en entreprise.")}</p><a href={expert.podcast.href} className="site-button site-button-primary mt-5">{t("Écouter l’entretien sur Ausha")}</a></article>
    </section>
    <section id="ressources" className="scroll-mt-28"><h2 className="mb-5">{t("Préparer un échange avec Sébastien")}</h2><p className="text-muted-foreground leading-relaxed mb-5">{t("Décrivez votre activité, votre organisation financière et la décision à préparer. Un échéancier de trésorerie, un exemple de reporting ou la liste de vos outils permettent de rendre le premier échange concret.")}</p><div className="flex flex-wrap gap-4"><Link href={href("/contact#sebastien-doat")} className="site-button site-button-primary">{t("Présenter ma situation")}</Link><Link href={href("/daf-externalise/tarifs")} className="site-button site-button-secondary">{t("Périmètres et tarifs DAF")}</Link></div></section>
  </div>;
}
