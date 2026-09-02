import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import GuideFiscalPage from "@/components/pages/GuideFiscalPage";
import type { TocHeading } from "@/components/blog/ArticleTOC";
import {
  IA_FINANCE_AUTHOR,
  IA_FINANCE_HUB,
  getIaFinanceReferences,
} from "@/lib/content/ia-finance-references";

/**
 * Comparatif d'outils de la section IA & Finance (« power bi finance »
 * 260/mois, « logiciel reporting financier »). Aucune commission, aucune
 * affiliation. Les prix cités sont ceux des grilles éditeur en sources ; les
 * coûts « observés sur nos missions » de l'audit ne sont pas repris.
 */

const PATH = "/ressources/ia-finance/outils";
const DATE = "2026-09-01";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Outils de reporting automatisé et IA | Iter Advisors",
  description:
    "Comparatif honnête des outils de reporting automatisé et d'IA pour PME : Power BI, connecteurs comptables, LLM. Prix éditeur, limites, et la stack recommandée par taille d'entreprise.",
  path: PATH,
  disableHreflang: ["en", "es"],
});

const TOC: TocHeading[] = [
  { id: "reporting", level: 2, label: "La couche reporting : Power BI et ses alternatives" },
  { id: "connecteur", level: 2, label: "La couche connecteur : le nerf de la guerre" },
  { id: "llm", level: 2, label: "La couche LLM : les offres professionnelles" },
  { id: "stack", level: 2, label: "La stack recommandée par taille" },
  { id: "regle", level: 2, label: "La règle d'or avant tout achat" },
];

const FAQ = [
  {
    question: "Quel outil de reporting financier choisir pour une PME ?",
    answer:
      "Power BI pour la plupart des PME : licence Pro facturée par utilisateur et par mois (grille Microsoft en sources), connexion à presque tout, mais 2 à 3 jours de prise en main. Looker Studio, gratuit, suffit si votre stack est Google. Les modules de reporting intégrés aux outils comptables nouvelle génération couvrent le reste pour les plus petites structures.",
  },
  {
    question: "Combien coûte la connexion entre l'outil comptable et l'outil de reporting ?",
    answer:
      "De rien du tout à un développement facturé. Trois configurations : le connecteur natif inclus dans l'abonnement (Pennylane vers Power BI ou Looker Studio par l'API), un connecteur du marché facturé à l'abonnement mensuel (Sage ou Cegid vers Power BI), et le développement spécifique pour un ERP ancien ou multi-sources — le seul cas où un devis se justifie. Exigez un chiffrage à la connexion, pas au projet global.",
  },
  {
    question: "Faut-il payer une offre professionnelle de LLM ?",
    answer:
      "Oui, dès que l'usage sort du test personnel. Les offres gratuites grand public sont à exclure pour une direction financière : les données peuvent servir à entraîner les modèles. ChatGPT Team ou Enterprise, Claude Team ou Enterprise, Gemini dans Google Workspace : quelques dizaines d'euros par utilisateur et par mois, grilles éditeur en sources.",
  },
  {
    question: "Un outil de reporting corrige-t-il une clôture trop lente ?",
    answer:
      "Non. Si votre clôture prend quinze jours parce que les pièces arrivent en retard, un outil de reporting automatisé affichera plus vite des chiffres incomplets. Traitez d'abord le processus, équipez ensuite — c'est l'ordre de notre méthode d'automatisation du reporting.",
  },
];

export default function Page() {
  return (
    <GuideFiscalPage
      hub={IA_FINANCE_HUB}
      path={PATH}
      breadcrumbLabel="Les outils"
      h1="Les outils de reporting automatisé et d'IA pour la finance : ce que nous recommandons après usage réel"
      description="Comparatif honnête des outils de reporting automatisé et d'IA pour PME : Power BI, connecteurs comptables, LLM. Prix éditeur, limites, et la stack recommandée par taille d'entreprise."
      author={IA_FINANCE_AUTHOR}
      publishedDate={DATE}
      modifiedDate={DATE}
      modifiedLabel="1er septembre 2026"
      badge="Publié en septembre 2026"
      readMinutes={6}
      dek={
        <>
          Cette page ne ressemble pas aux comparatifs d&apos;éditeurs. Nous ne vendons aucun de ces
          outils, nous ne touchons aucune commission, et nous les avons déployés ou vus déployés
          chez nos clients. Quand un outil ne vaut pas son prix, nous le disons. Trois couches à
          distinguer : <strong className="text-foreground">le reporting, le connecteur, le LLM</strong>
          — et une stack par taille d&apos;entreprise.
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        alt: "Outils de reporting et d'analyse financière sur ordinateur portable",
      }}
      kpis={[
        { value: "3", label: "couches : reporting, connecteur, LLM" },
        { value: "0 €", label: "Looker Studio, si votre stack est Google" },
        { value: "3", label: "configurations de connexion" },
        { value: "12", label: "indicateurs, pas un portail de 40 pages" },
      ]}
      essentiel={{
        title: "L'essentiel en 5 points",
        items: [
          <>
            <strong className="text-foreground">Reporting</strong> : Power BI domine, pour une raison
            simple — il se connecte à presque tout, à un prix par utilisateur (grille Microsoft en
            sources). Looker Studio, gratuit, suffit sur une stack Google.
          </>,
          <>
            <strong className="text-foreground">Connecteur</strong> : c&apos;est lui qui fait ou défait
            le projet. Natif et inclus, du marché à l&apos;abonnement, ou développé — et seul ce
            dernier cas justifie un devis, chiffré à la connexion.
          </>,
          <>
            <strong className="text-foreground">LLM</strong> : offres professionnelles uniquement
            (ChatGPT Team, Claude Team, Gemini dans Workspace), pour que vos données n&apos;entraînent
            pas les modèles.
          </>,
          <>
            Trois stacks par taille : startup en amorçage, PME en croissance, ETI multi-entités — la
            complexité de l&apos;outillage suit celle de l&apos;organisation, pas l&apos;inverse.
          </>,
          <>
            Aucun outil ne corrige un processus défaillant : traitez d&apos;abord la clôture, équipez
            ensuite.
          </>,
        ],
      }}
      toc={TOC}
      faqTitle="Questions fréquentes sur les outils de reporting et d'IA"
      faq={FAQ}
      cta={{
        title: "Choisir la bonne stack, à la bonne taille",
        text:
          "Outil comptable, reporting, connecteur, LLM : un diagnostic d'une journée arrête la configuration adaptée à votre organisation — et écarte ce dont vous n'avez pas besoin.",
        footnote: (
          <>
            C&apos;est la configuration que nos{" "}
            <Link href="/daf-externalise" className="underline hover:text-white">
              DAF externalisés
            </Link>{" "}
            déploient en mission.
          </>
        ),
      }}
      related={[
        {
          href: "/ressources/ia-finance/automatiser-reporting-financier",
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
          alt: "Automatiser le reporting financier",
          title: "Automatiser le reporting financier : la méthode en quatre étapes et 90 jours",
        },
        {
          href: "/ressources/blog/stack-financier-saas-series-a",
          img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
          alt: "Stack financier d'une startup SaaS",
          title: "Le stack financier d'une SaaS en série A — et la stack selon le stade, de la pré-seed à la série B",
        },
      ]}
      references={getIaFinanceReferences("outils")}
    >
      <h2 id="reporting">La couche reporting : Power BI et ses alternatives</h2>
      <p>
        Power BI domine nos missions pour une raison simple : la licence Pro se facture par
        utilisateur et par mois — la grille Microsoft est en sources — et l&apos;outil se connecte à
        presque tout. Ses limites sont réelles : la prise en main demande deux à trois jours de
        formation, et les tableaux de bord mal conçus deviennent vite illisibles. Notre conseil :
        commencez avec un seul tableau de bord de 12 indicateurs, pas un portail de 40 pages.
      </p>
      <p>
        Les alternatives crédibles pour une PME : Looker Studio (gratuit, suffisant si votre stack est
        Google), et les modules de reporting intégrés aux outils comptables nouvelle génération. Sur
        ce dernier point, notre{" "}
        <Link href="/ressources/outils/pennylane">analyse de Pennylane</Link> détaille ce que le
        reporting intégré couvre, et où il s&apos;arrête.
      </p>

      <h2 id="connecteur">La couche connecteur : le nerf de la guerre</h2>
      <p>
        L&apos;outil de reporting ne vaut rien sans la donnée qui l&apos;alimente. Trois
        configurations couvrent la plupart des situations que nous rencontrons. Pennylane vers Power
        BI ou Looker Studio par l&apos;API native : la plus simple, incluse dans l&apos;abonnement,
        celle que nous recommandons aux startups et aux PME. Sage ou Cegid vers Power BI par un
        connecteur du marché : facturé à l&apos;abonnement mensuel. ERP ancien ou multi-sources :
        c&apos;est le seul cas où un développement spécifique se justifie, et c&apos;est là que les
        devis dérapent. Exigez un chiffrage à la connexion, pas au projet global.
      </p>

      <h2 id="llm">La couche LLM : les offres professionnelles</h2>
      <p>
        Pour un usage en direction financière, les offres grand public gratuites sont à exclure :
        vos données peuvent entraîner les modèles. Les offres professionnelles de référence —
        ChatGPT Team ou Enterprise, Claude Team ou Enterprise, Gemini dans Google Workspace — se
        facturent par utilisateur et par mois (grilles éditeur en sources) et documentent le
        non-entraînement des données. Le détail des cas d&apos;usage est dans notre{" "}
        <Link href="/ressources/ia-finance/llm-finance">comparatif des LLM en finance</Link>.
      </p>

      <h2 id="stack">La stack recommandée par taille</h2>
      <p>
        <strong>Startup en amorçage.</strong> Pennylane pour la comptabilité et la facturation,
        Looker Studio pour le reporting, une offre LLM professionnelle pour la rédaction. Le
        reporting tient dans un tableau de bord unique de 12 indicateurs. La stack complète de la
        pré-seed à la série A — Qonto, puis Agicap, Spendesk et PayFit au fur et à mesure — est
        détaillée dans notre{" "}
        <Link href="/ressources/blog/stack-financier-saas-series-a">article sur le stack financier</Link>.
      </p>
      <p>
        <strong>PME en croissance.</strong> Outil comptable connecté, Power BI, offre LLM
        professionnelle. C&apos;est la configuration que nous déployons le plus souvent, y compris
        dans le cadre de nos missions de <Link href="/daf-externalise">DAF externalisé</Link>.
      </p>
      <p>
        <strong>ETI ou groupe multi-entités.</strong> ERP, connecteur dédié, Power BI ou équivalent,
        offre LLM entreprise avec hébergement contrôlé. Coût sur devis — mais refusez tout chiffrage
        global pour ce qui n&apos;est que la connexion des données.
      </p>

      <h2 id="regle">La règle d&apos;or avant tout achat</h2>
      <p>
        Aucun outil ne corrige un processus défaillant. Si votre clôture prend quinze jours parce
        que les pièces arrivent en retard, un outil de reporting automatisé ne changera rien : il
        affichera plus vite des chiffres incomplets. Traitez d&apos;abord le processus, équipez
        ensuite. C&apos;est l&apos;ordre que nous suivons dans notre{" "}
        <Link href="/ressources/ia-finance/automatiser-reporting-financier">
          méthode d&apos;automatisation du reporting
        </Link>
        , et c&apos;est ce qui explique que nos projets aboutissent là où d&apos;autres échouent.
      </p>
    </GuideFiscalPage>
  );
}
