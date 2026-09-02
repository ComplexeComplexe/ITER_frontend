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
 * Pilier « llm finance » de la section IA & Finance (140/mois, CPC 9,64 €,
 * SERP tenue par des universités — LL.M. de droit — et des recherches
 * anglophones). Comparatif d'usage des trois modèles grand public, sans
 * sponsor ni affiliation ; les prix et politiques de données renvoient aux
 * pages éditeur vérifiées (lib/content/ia-finance-references.ts).
 */

const PATH = "/ressources/ia-finance/llm-finance";
const DATE = "2026-09-01";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "LLM en finance : ChatGPT, Claude, Gemini | Iter Advisors",
  description:
    "Analyse terrain des LLM appliqués à la finance d'entreprise : comparatif ChatGPT, Claude, Gemini, cas d'usage réels, risques et critères de choix pour une PME.",
  path: PATH,
  disableHreflang: ["en", "es"],
});

const TOC: TocHeading[] = [
  { id: "comparatif", level: 2, label: "Le comparatif des trois modèles grand public" },
  { id: "font-bien", level: 2, label: "Ce que les LLM font bien sur vos chiffres" },
  { id: "jamais", level: 2, label: "Ce qu'ils ne feront jamais" },
  { id: "confidentialite", level: 2, label: "La question de la confidentialité, tranchée" },
];

const FAQ = [
  {
    question: "Qu'est-ce qu'un LLM, et à quoi sert-il en finance ?",
    answer:
      "Un LLM (large language model, grand modèle de langage) est une machine à produire et transformer du texte. Une direction financière en produit beaucoup : commentaires de clôture, notes de synthèse, présentations de board, réponses aux auditeurs, documentation des processus. C'est là que les LLM créent de la valeur en finance — pas dans le calcul, qu'ils ne font pas.",
  },
  {
    question: "ChatGPT, Claude ou Gemini : lequel choisir pour une direction financière ?",
    answer:
      "Le choix dépend moins du modèle que de votre stack et de votre cas d'usage. Une équipe sur Google Workspace prendra Gemini, intégré à Sheets et Docs ; une équipe qui produit des synthèses de documents longs privilégiera un modèle à l'aise sur les longs dossiers ; une équipe qui veut des formules et des scripts Excel prendra ChatGPT. Dans les trois cas, l'offre professionnelle — pas la version gratuite.",
  },
  {
    question: "Un LLM peut-il faire une due diligence financière ?",
    answer:
      "Il l'accélère, il ne la fait pas. Un LLM parcourt un dossier de plusieurs centaines de pages et en extrait les points saillants en quelques minutes, là où un humain y passe une journée. Mais il ne sait pas qu'un écart de trésorerie est grave dans une PME et anecdotique dans un groupe : ce contexte est le métier du DAF. La checklist reste la référence sur le fond, le LLM accélère la revue documentaire.",
  },
  {
    question: "Quelles données peut-on confier à un LLM ?",
    answer:
      "Trois niveaux : données publiques ou anonymisées, n'importe quel modèle grand public convient ; données internes non sensibles (processus, documentation), offre professionnelle avec non-entraînement des données ; données sensibles (paie, clients, chiffres non publiés), modèle hébergé en environnement contrôlé — ou pas de LLM du tout. Cette gradation doit figurer noir sur blanc dans votre charte d'utilisation.",
  },
];

export default function Page() {
  return (
    <GuideFiscalPage
      hub={IA_FINANCE_HUB}
      path={PATH}
      breadcrumbLabel="Les LLM en finance"
      h1="LLM en finance : ce que les grands modèles de langage peuvent faire pour vos chiffres, et ce qu'ils ne feront jamais"
      description="Analyse terrain des LLM appliqués à la finance d'entreprise : comparatif ChatGPT, Claude, Gemini, cas d'usage réels, risques et critères de choix pour une PME."
      author={IA_FINANCE_AUTHOR}
      publishedDate={DATE}
      modifiedDate={DATE}
      modifiedLabel="1er septembre 2026"
      badge="Publié en septembre 2026"
      readMinutes={6}
      dek={
        <>
          Derrière le sigle LLM — <em>large language model</em>, grand modèle de langage — il y a une
          réalité simple : ces outils sont des machines à produire et à transformer du texte. Or une
          direction financière produit énormément de texte : commentaires de clôture, notes de
          synthèse, présentations de board, réponses aux auditeurs, documentation des processus.
          C&apos;est là que les LLM créent de la valeur en finance.{" "}
          <strong className="text-foreground">Pas dans le calcul.</strong>
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
        alt: "Grands modèles de langage appliqués à la finance d'entreprise",
      }}
      kpis={[
        { value: "3", label: "modèles grand public comparés" },
        { value: "3", label: "niveaux d'exposition des données" },
        { value: "0", label: "calcul à déléguer au modèle" },
        { value: "1", label: "charte d'utilisation, signée par l'équipe" },
      ]}
      essentiel={{
        title: "L'essentiel en 5 points",
        items: [
          <>
            Un LLM <strong className="text-foreground">manipule vos chiffres comme du texte</strong>.
            Il lit vite, rédige des premiers jets corrects, traduit d&apos;un langage à l&apos;autre —
            et ne comprend pas ce qu&apos;un écart signifie pour votre entreprise.
          </>,
          <>
            Le choix entre ChatGPT, Claude et Gemini dépend de votre stack et de votre cas
            d&apos;usage, pas d&apos;un classement : intégration Google, documents longs, formules et
            scripts.
          </>,
          <>
            Dans les trois cas, l&apos;offre professionnelle : c&apos;est la condition pour que vos
            données ne servent pas à entraîner les modèles — chaque éditeur le documente (sources en
            bas de page).
          </>,
          <>
            Trois niveaux d&apos;exposition, trois réponses : public ou anonymisé, interne non
            sensible, sensible. La gradation figure dans la charte, noir sur blanc.
          </>,
          <>
            Le LLM accélère la revue documentaire d&apos;une due diligence ; il ne remplace ni la
            checklist ni le jugement de celui qui sait ce qui est grave.
          </>,
        ],
      }}
      toc={TOC}
      faqTitle="Questions fréquentes sur les LLM en finance"
      faq={FAQ}
      cta={{
        title: "Choisir et cadrer un LLM pour votre équipe finance",
        text:
          "Stack, cas d'usage, niveau d'exposition des données, offre professionnelle : un diagnostic d'une journée tranche le choix et écrit la charte avec votre équipe.",
        footnote: (
          <>
            Un{" "}
            <Link href="/daf-externalise" className="underline hover:text-white">
              DAF externalisé
            </Link>{" "}
            pilote ce cadrage en mission.
          </>
        ),
      }}
      related={[
        {
          href: "/ressources/ia-finance/chatgpt-finance",
          img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
          alt: "ChatGPT appliqué à la finance d'entreprise",
          title: "ChatGPT pour la finance : les cas d'usage qui marchent, et les trois à proscrire",
        },
        {
          href: "/ressources/ia-finance/outils",
          img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
          alt: "Outils de reporting automatisé et d'IA pour la finance",
          title: "Les outils de reporting automatisé et d'IA : la stack recommandée par taille d'entreprise",
        },
      ]}
      references={getIaFinanceReferences("llm-finance")}
    >
      <h2 id="comparatif">Le comparatif des trois modèles grand public</h2>
      <p>
        Nous utilisons les trois principaux modèles en mission. Voici ce que nous en avons retenu,
        sans sponsor ni affiliation — et sans classement : le bon modèle est celui qui colle à votre
        usage.
      </p>
      <p>
        <strong>ChatGPT (OpenAI).</strong> Le plus connu et le plus recherché, et très à l&apos;aise
        sur la génération de formules Excel et de scripts courts. Son point faible : une tendance à
        répondre avec assurance même quand il se trompe, ce qui impose une relecture rigoureuse de
        tout ce qui ressemble à un chiffre.
      </p>
      <p>
        <strong>Claude (Anthropic).</strong> À l&apos;aise sur les documents longs : un reporting de
        plusieurs dizaines de pages, une documentation de processus, un dossier de due diligence, dont
        il produit une synthèse fidèle. C&apos;est l&apos;usage sur lequel nous le mobilisons le plus.
      </p>
      <p>
        <strong>Gemini (Google).</strong> Le mieux intégré à l&apos;écosystème Google — Sheets, Docs,
        Drive — ce qui compte si votre reporting vit dans Google Workspace. La question du choix ne se
        pose presque plus pour une équipe déjà équipée là.
      </p>
      <p>
        Le choix dépend donc moins du modèle que de votre stack et de votre cas d&apos;usage. Une
        équipe sur Google Workspace prendra Gemini. Une équipe qui produit des synthèses de documents
        longs regardera Claude. Une équipe qui veut automatiser des formules Excel prendra ChatGPT.
        Dans les trois cas, prenez l&apos;offre professionnelle : c&apos;est la condition pour que vos
        données ne servent pas à entraîner les modèles — les trois éditeurs documentent ce point, les
        liens sont en sources.
      </p>

      <h2 id="font-bien">Ce que les LLM font bien sur vos chiffres</h2>
      <p>
        <strong>Ils lisent vite et sans fatigue.</strong> Un LLM parcourt un dossier de plusieurs
        centaines de pages et en extrait les points saillants en quelques minutes, ce qui prend une
        journée à un humain. En due diligence financière, cela change le rythme de travail : notre{" "}
        <Link href="/ressources/blog/checklist-due-diligence-levee-de-fonds">
          checklist due diligence
        </Link>{" "}
        reste la référence sur le fond, le LLM accélère la revue documentaire.
      </p>
      <p>
        <strong>Ils rédigent des premiers jets corrects.</strong> Commentaires de variance, notes de
        synthèse, comptes rendus : le premier jet d&apos;un LLM bien cadré fait gagner l&apos;essentiel
        du temps de rédaction — la relecture, elle, ne se délègue pas.
      </p>
      <p>
        <strong>Ils traduisent entre les langages.</strong> Du comptable vers le managérial, du
        français vers l&apos;anglais pour un board international, du technique vers le commercial :
        c&apos;est un usage sous-estimé et très fiable.
      </p>

      <h2 id="jamais">Ce qu&apos;ils ne feront jamais</h2>
      <p>
        Un LLM ne comprend pas vos chiffres, il les manipule comme du texte. Il ne sait pas
        qu&apos;un écart de trésorerie de 200 000 € est grave dans une PME de 3 millions de chiffre
        d&apos;affaires et anecdotique dans un groupe de 300 millions. Ce contexte, c&apos;est le
        métier du DAF. C&apos;est aussi pourquoi nous écrivons dans notre{" "}
        <Link href="/ressources/blog/ia-finance-automatisation-direction-financiere">
          guide de la direction financière augmentée
        </Link>{" "}
        que l&apos;IA augmente le DAF au lieu de le remplacer : elle le débarrasse de la production
        pour qu&apos;il se consacre au jugement.
      </p>

      <h2 id="confidentialite">La question de la confidentialité, tranchée</h2>
      <p>
        Trois niveaux d&apos;exposition, trois réponses. Données publiques ou anonymisées :
        n&apos;importe quel modèle grand public convient. Données internes non sensibles (processus,
        documentation) : offre professionnelle avec non-entraînement des données. Données sensibles
        (paie, clients, chiffres non publiés) : modèle hébergé en environnement contrôlé, ou pas de
        LLM du tout. Cette gradation doit figurer noir sur blanc dans votre charte d&apos;utilisation
        — la méthode complète est dans notre{" "}
        <Link href="/ressources/ia-finance/chatgpt-finance">guide ChatGPT pour la finance</Link>, et
        le cadre juridique dans les fiches pratiques IA de la CNIL (en sources).
      </p>
    </GuideFiscalPage>
  );
}
