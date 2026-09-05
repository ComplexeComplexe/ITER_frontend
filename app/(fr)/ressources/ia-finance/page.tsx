import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { IA_GUIDES } from "@/lib/content/ia-finance-guides";
import { IA_FINANCE_AUTHOR, IA_FINANCE_HUB } from "@/lib/content/ia-finance-references";

const title = "IA et finance : cas réels et guides pratiques pour les PME";
const description = "Reporting automatisé, ChatGPT, choix des outils et cas documentés : une méthode pour appliquer l’IA à la finance d’une PME avec des résultats vérifiables.";
export const metadata = buildMetadata({locale:"fr", title, description, path:IA_FINANCE_HUB.href, disableHreflang:["en","es"]});
const paths = ["automatiser-reporting-financier","chatgpt-finance","llm-finance","outils","retours-experience","feuille-de-route-90-jours"];
const intents = [
  {need:"Mon reporting prend trop de temps",slug:"automatiser-reporting-financier",label:"Cartographier les tâches et calculer le ROI"},
  {need:"Je veux tester l’IA sur une tâche précise",slug:"chatgpt-finance",label:"Essayer les prompts sur des données fictives"},
  {need:"Je cherche des preuves avant d’investir",slug:"retours-experience",label:"Lire les cas publics et leurs limites"},
  {need:"Je dois organiser le déploiement",slug:"feuille-de-route-90-jours",label:"Définir le pilote et les critères de validation"},
];
export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const structuredData = {"@context":"https://schema.org", "@type":"CollectionPage", "@id":`https://www.iteradvisors.com${IA_FINANCE_HUB.href}#collection`, url:`https://www.iteradvisors.com${IA_FINANCE_HUB.href}`, name:title, description, inLanguage:"fr-FR", dateModified:"2026-09-05", isPartOf:{"@id":"https://www.iteradvisors.com/#website"}, hasPart:paths.map(slug => ({"@type":"Article", url:`https://www.iteradvisors.com${IA_FINANCE_HUB.href}/${slug}`, name:IA_GUIDES[slug].title}))};
  return <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}} />
    <section className="bg-background pt-32 pb-12">
      <div className="container max-w-5xl">
        <Breadcrumb locale="fr" items={[{label:"Ressources",href:"/ressources"},{label:"IA & Finance"}]} />
        <h1 className="mt-6 mb-6 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">{title}</h1>
        <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">L’IA peut aider une équipe finance à préparer des commentaires, traiter des documents et repérer des écarts. Les connexions et les règles de calcul restent les fondations du reporting. Ces guides vous aident à choisir un premier usage, le tester et vérifier son intérêt avant de l’étendre.</p>
        <p className="mt-5 text-sm text-muted-foreground">Par <Link href={IA_FINANCE_AUTHOR.url} rel="author" className="text-iter-violet underline">{IA_FINANCE_AUTHOR.name}</Link> · Mise à jour du <time dateTime="2026-09-05">5 septembre 2026</time></p>
        <nav aria-label="Sommaire IA et finance" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-iter-violet">
          <a href="#commencer" className="underline">Par où commencer</a><a href="#guides" className="underline">Les six guides</a><a href="#preuves" className="underline">Cas et méthode</a><a href="#accompagnement" className="underline">Accompagnement DAF</a>
        </nav>
      </div>
    </section>
    <section className="bg-background pb-16">
      <div className="container max-w-5xl space-y-14">
        <div id="commencer" className="scroll-mt-24">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-5">Quel est votre point de départ ?</h2>
          <div className="grid sm:grid-cols-2 gap-4">{intents.map(item => <Link key={item.slug} href={`${IA_FINANCE_HUB.href}/${item.slug}`} className="rounded-2xl border border-border p-6 hover:border-iter-violet focus-visible:outline-2 focus-visible:outline-iter-violet">
            <h3 className="font-semibold text-lg mb-2">{item.need}</h3><p className="text-iter-violet text-sm flex items-center gap-2">{item.label}<ArrowRight size={16} aria-hidden /></p>
          </Link>)}</div>
        </div>
        <div id="guides" className="scroll-mt-24">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-5">Six guides pour passer du besoin au pilote</h2>
          <div className="grid sm:grid-cols-2 gap-5">{paths.map((slug,i) => <div key={slug} className="rounded-2xl bg-iter-violet/5 p-6">
            <p className="text-sm text-iter-violet font-semibold mb-2">Guide {i+1}</p>
            <h3 className="font-heading font-semibold text-xl mb-3"><Link className="hover:underline" href={`${IA_FINANCE_HUB.href}/${slug}`}>{IA_GUIDES[slug].label}</Link></h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{IA_GUIDES[slug].description}</p>
          </div>)}</div>
        </div>
        <div id="preuves" className="scroll-mt-24 prose-iter-blog max-w-none">
          <h2>Quelles preuves trouverez-vous dans cette section ?</h2>
          <p>Les <Link href={`${IA_FINANCE_HUB.href}/retours-experience`}>cas publics U.S. Venture, Armanino et Hebbia</Link> sont attribués à Microsoft ou Anthropic. La lecture indique les tâches concernées et distingue les résultats rapportés des bénéfices estimés. Ces entreprises ne sont pas présentées comme des clients Iter.</p>
          <p>Nos <Link href="/ressources/cas-clients/opti-digital-structuration-financement">travaux documentés chez Opti Digital</Link> illustrent la structuration ERP, reporting et clôture. Aucun gain IA ne leur est attribué. Les prompts et le calcul de ROI proposés dans les guides sont des exercices fictifs, identifiés comme tels.</p>
          <h2>Automatisation, IA et responsabilité : qui fait quoi ?</h2>
          <p>Un connecteur récupère les données. Des règles calculent les indicateurs. Un assistant peut préparer une analyse ou un commentaire. Le responsable financier contrôle les résultats et valide les décisions. Décrivez ces étapes séparément pour identifier les erreurs et mesurer le gain net de temps.</p>
          <p>Pour comprendre les choix d’organisation, lisez <Link href="/ressources/blog/ia-finance-automatisation-direction-financiere">le rôle du DAF dans une finance assistée par IA</Link>. Pour sélectionner les premières tâches, utilisez <Link href="/ressources/blog/ia-et-automatisation-des-taches-repetitives">la grille de priorisation des tâches répétitives</Link>.</p>
        </div>
        <aside id="accompagnement" className="scroll-mt-24 rounded-3xl bg-iter-dark text-white p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold mb-3">Un DAF pour cadrer et piloter le chantier</h2>
          <p className="text-white/80 leading-relaxed mb-4">Le <Link href="/daf-externalise" className="underline">DAF externalisé</Link> définit les indicateurs, organise les contrôles et coordonne l’équipe comptable avec les intervenants techniques. Pour préparer l’échange, identifiez votre reporting actuel, les logiciels utilisés et la tâche qui consomme le plus de temps.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-iter-violet px-6 py-3 font-semibold">Échanger sur votre projet<ArrowRight size={16} aria-hidden /></Link>
        </aside>
      </div>
    </section>
  </PageLayout>;
}
