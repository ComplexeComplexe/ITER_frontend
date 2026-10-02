import FinanceExpert from "@/components/FinanceExpert";
import Link from "@/components/PublishedLocaleLink";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { iaText } from "@/lib/content/ia-finance-interface";
import { getIaGuide, iaHub, iaGuideHref } from "@/lib/content/ia-finance-locales";
import { ArrowRight } from "lucide-react";
import { getCmsNavigation } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { IA_FINANCE_AUTHOR, IA_FINANCE_HUB } from "@/lib/content/ia-finance-references";
import { PAGE_REVISIONS } from "@/lib/content/page-revisions";

export const IA_HUB_TITLE = "IA et finance : cas réels et guides pratiques pour les PME";
export const IA_HUB_DESCRIPTION = "Reporting automatisé, ChatGPT, choix des outils et cas documentés : une méthode pour appliquer l’IA à la finance d’une PME avec des résultats vérifiables.";
const paths = ["automatiser-reporting-financier","chatgpt-finance","llm-finance","outils","retours-experience","feuille-de-route-90-jours"];
const intents = [
  {need:"Mon reporting prend trop de temps",slug:"automatiser-reporting-financier",label:"Cartographier les tâches et calculer le ROI"},
  {need:"Je veux tester l’IA sur une tâche précise",slug:"chatgpt-finance",label:"Essayer les prompts sur des données fictives"},
  {need:"Je cherche des preuves avant d’investir",slug:"retours-experience",label:"Lire les cas publics et leurs limites"},
  {need:"Je dois organiser le déploiement",slug:"feuille-de-route-90-jours",label:"Définir le pilote et les critères de validation"},
];
export default async function IaFinanceHub({ locale = "fr" }: { locale?: Locale }) {
  const t = (source: string) => iaText(locale, source);
  const title = t(IA_HUB_TITLE), description = t(IA_HUB_DESCRIPTION);
  const hub = iaHub(locale);
  const cmsNavigation = await getCmsNavigation(locale);
  const modified = locale === "fr" ? (PAGE_REVISIONS[IA_FINANCE_HUB.href] ?? "2026-09-05") : "2026-10-02";
  const modifiedLabel = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${modified}T12:00:00Z`));
  const structuredData = {"@context":"https://schema.org", "@type":"CollectionPage", "@id":`https://www.iteradvisors.com${hub.href}#collection`, url:`https://www.iteradvisors.com${hub.href}`, name:title, description, inLanguage:{fr:"fr-FR",en:"en-GB",es:"es-ES"}[locale], dateModified:modified, isPartOf:{"@id":"https://www.iteradvisors.com/#website"}, hasPart:paths.map(slug => ({"@type":"Article", url:`https://www.iteradvisors.com${iaGuideHref(slug, locale)}`, name:getIaGuide(locale, slug).title}))};
  return <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g, "\\u003c")}} />
    <section data-block-key="hero" className="site-hero bg-background pt-32 pb-12">
      <div className="container max-w-5xl">
        <Breadcrumb locale={locale} items={[{label:t("Ressources"),href:parityHref("/ressources", locale)},{label:hub.label}]} />
        <h1 className="mt-6 mb-6 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">{title}</h1>
        <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">{t("L’IA peut aider une équipe finance à préparer des commentaires, traiter des documents et repérer des écarts. Les connexions et les règles de calcul restent les fondations du reporting. Ces guides vous aident à choisir un premier usage, le tester et vérifier son intérêt avant de l’étendre.")}</p>
        <p className="mt-5 text-sm text-muted-foreground">{t("Par")} <Link locale={locale} href={parityHref(IA_FINANCE_AUTHOR.url, locale)} rel="author" className="text-iter-violet underline">{IA_FINANCE_AUTHOR.name}</Link> · {t("Mise à jour du")} <time dateTime={modified}>{modifiedLabel}</time></p>
        <FinanceExpert locale={locale} compact />
        <nav aria-label={t("Sommaire IA et finance")} className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-iter-violet">
          <a href="#commencer" className="underline">{t("Par où commencer")}</a><a href="#guides" className="underline">{t("Les six guides")}</a><a href="#preuves" className="underline">{t("Cas et méthode")}</a><a href="#accompagnement" className="underline">{t("Accompagnement DAF")}</a>
        </nav>
      </div>
    </section>
    <section className="bg-background pb-16">
      <div className="container max-w-5xl space-y-14">
        <div data-block-key="intents" id="commencer" className="scroll-mt-24">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-5">{t("Quel est votre point de départ ?")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">{intents.map(item => <Link locale={locale} key={item.slug} href={iaGuideHref(item.slug, locale)} className="site-card rounded-2xl border border-border p-6 hover:border-iter-violet focus-visible:outline-2 focus-visible:outline-iter-violet">
            <h3 className="font-semibold text-lg mb-2">{t(item.need)}</h3><p className="text-iter-violet text-sm flex items-center gap-2">{t(item.label)}<ArrowRight size={16} aria-hidden /></p>
          </Link>)}</div>
        </div>
        <div data-block-key="guides" id="guides" className="scroll-mt-24">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-5">{t("Six guides pour passer du besoin au pilote")}</h2>
          <div className="grid sm:grid-cols-2 gap-5">{paths.map((slug,i) => <div key={slug} className="site-card rounded-2xl bg-iter-violet/5 p-6">
            <p className="text-sm text-iter-violet font-semibold mb-2">{t("Guide")} {i+1}</p>
            <h3 className="font-heading font-semibold text-xl mb-3"><Link locale={locale} className="hover:underline" href={iaGuideHref(slug, locale)}>{getIaGuide(locale, slug).label}</Link></h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{getIaGuide(locale, slug).description}</p>
          </div>)}</div>
        </div>
        <div data-block-key="evidence" id="preuves" className="scroll-mt-24 prose-iter-blog max-w-none">
          <h2>{t("Quelles preuves trouverez-vous dans cette section ?")}</h2>
          <p>{t("Les")} <Link locale={locale} href={iaGuideHref("retours-experience", locale)}>{t("cas publics U.S. Venture, Armanino et Hebbia")}</Link> {t("sont attribués à Microsoft ou Anthropic. La lecture indique les tâches concernées et distingue les résultats rapportés des bénéfices estimés. Ces entreprises ne sont pas présentées comme des clients Iter.")}</p>
          <p>{t("Nos")} <Link locale={locale} href={parityHref("/ressources/cas-clients/opti-digital-structuration-financement", locale)}>{t("travaux documentés chez Opti Digital")}</Link> {t("illustrent la structuration ERP, reporting et clôture. Aucun gain IA ne leur est attribué. Les prompts et le calcul de ROI proposés dans les guides sont des exercices fictifs, identifiés comme tels.")}</p>
          <h2>{t("Automatisation, IA et responsabilité : qui fait quoi ?")}</h2>
          <p>{t("Un connecteur récupère les données. Des règles calculent les indicateurs. Un assistant peut préparer une analyse ou un commentaire. Le responsable financier contrôle les résultats et valide les décisions. Décrivez ces étapes séparément pour identifier les erreurs et mesurer le gain net de temps.")}</p>
          <p>{t("Pour comprendre les choix d’organisation, lisez")} <Link locale={locale} href={parityHref("/ressources/blog/ia-finance-automatisation-direction-financiere", locale)}>{t("le rôle du DAF dans une finance assistée par IA")}</Link>{t(". Pour sélectionner les premières tâches, utilisez")} <Link locale={locale} href={parityHref("/ressources/blog/ia-et-automatisation-des-taches-repetitives", locale)}>{t("la grille de priorisation des tâches répétitives")}</Link>.</p>
        </div>
        <aside data-block-key="cta" id="accompagnement" className="site-card scroll-mt-24 rounded-3xl bg-iter-dark text-white p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold mb-3">{t("Un DAF pour cadrer et piloter le chantier")}</h2>
          <p className="text-white/80 leading-relaxed mb-4">{t("Le")} <Link locale={locale} href={parityHref("/daf-externalise", locale)} className="underline">{t("DAF externalisé")}</Link> {t("définit les indicateurs, organise les contrôles et coordonne l’équipe comptable avec les intervenants techniques. Pour préparer l’échange, identifiez votre reporting actuel, les logiciels utilisés et la tâche qui consomme le plus de temps.")}</p>
          <Link locale={locale} href={parityHref("/contact#ia-finance", locale)} className="site-button site-button-primary inline-flex items-center gap-2 rounded-full bg-iter-violet px-6 py-3 font-semibold">{t("Échanger sur votre projet")}<ArrowRight size={16} aria-hidden /></Link>
        </aside>
      </div>
    </section>
  </PageLayout>;
}
