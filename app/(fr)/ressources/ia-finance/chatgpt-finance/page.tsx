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
 * Pilier « chatgpt finance » de la section IA & Finance.
 * IA-FINANCE (2026-09-01) — la plus grosse requête du champ (1 900/mois,
 * CPC 14,88 €) : SERP tenue par OpenAI et des fintechs anglo-saxonnes, aucun
 * contenu français orienté direction financière. Contenu de l'audit relu :
 * la mention « 18 mois d'utilisation encadrée » et les gains horaires non
 * validés ne sont pas publiés ; la charte et les usages le sont.
 */

const PATH = "/ressources/ia-finance/chatgpt-finance";
const DATE = "2026-09-01";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "ChatGPT en finance : usages et limites | Iter Advisors",
  description:
    "Cas d'usage réels de ChatGPT dans une direction financière : commentaires de clôture, analyse de variance, préparation de board. Limites, confidentialité et méthode, par des DAF en mission.",
  path: PATH,
  disableHreflang: ["en", "es"],
});

const TOC: TocHeading[] = [
  { id: "cas-usage", level: 2, label: "Les quatre cas d'usage qui fonctionnent" },
  { id: "proscrire", level: 2, label: "Les trois usages à proscrire" },
  { id: "charte", level: 2, label: "La méthode que nous posons en mission" },
  { id: "offres", level: 2, label: "Version grand public ou offre professionnelle ?" },
];

const FAQ = [
  {
    question: "Peut-on utiliser ChatGPT pour faire sa comptabilité ?",
    answer:
      "Non. Un LLM ne calcule pas, il prédit du texte : il peut écrire une formule Excel correcte mais répondre un nombre faux avec assurance. La tenue des comptes, les déclarations et la conformité restent du ressort de l'outil comptable et de l'expert-comptable. ChatGPT sert à rédiger et à structurer, jamais à produire un chiffre.",
  },
  {
    question: "Quels sont les bons usages de ChatGPT en direction financière ?",
    answer:
      "Quatre reviennent en mission : rédiger le premier jet des commentaires de clôture à partir d'un tableau d'écarts anonymisé ; préparer les questions qu'un board ou un investisseur posera ; structurer une analyse ponctuelle (comparaison de scénarios, note d'impact) ; traduire la finance pour des non-financiers. Dans tous les cas, un responsable financier relit et signe.",
  },
  {
    question: "Peut-on mettre des données de l'entreprise dans ChatGPT ?",
    answer:
      "Pas dans la version grand public : ni salaires, ni données clients, ni chiffres non publiés. Pour un usage récurrent, il faut une offre professionnelle (Team ou Enterprise) dont les données ne servent pas à entraîner les modèles — OpenAI le documente — ou un modèle hébergé. C'est la première règle de la charte que nous posons en mission.",
  },
  {
    question: "ChatGPT est-il fiable sur la fiscalité ?",
    answer:
      "Non. Le modèle mélange les régimes, les pays et les millésimes ; sur la TVA, les règles fiscales ou les normes comptables, une erreur coûte plus cher que le temps gagné. Pour la fiscalité France-Espagne par exemple, nos guides sont vérifiés et sourcés — ce qu'aucun LLM ne garantit.",
  },
];

export default function Page() {
  return (
    <GuideFiscalPage
      hub={IA_FINANCE_HUB}
      path={PATH}
      breadcrumbLabel="ChatGPT pour la finance"
      h1="ChatGPT pour la finance : ce qu'un DAF en fait réellement, et les limites à connaître"
      description="Cas d'usage réels de ChatGPT dans une direction financière : commentaires de clôture, analyse de variance, préparation de board. Limites, confidentialité et méthode, par des DAF en mission."
      author={IA_FINANCE_AUTHOR}
      publishedDate={DATE}
      modifiedDate={DATE}
      modifiedLabel="1er septembre 2026"
      badge="Publié en septembre 2026"
      readMinutes={6}
      dek={
        <>
          « ChatGPT finance » est l&apos;une des requêtes les plus tapées par les directions
          financières françaises. Derrière, des DAF, des contrôleurs de gestion et des dirigeants
          qui se posent tous la même question : est-ce que je peux utiliser cet outil sur mes
          chiffres, et pour quoi faire exactement ? Voici la réponse que nous donnons à nos
          clients, fondée sur l&apos;usage encadré que nous en faisons en mission :{" "}
          <strong className="text-foreground">un assistant de rédaction, pas un oracle financier</strong>
          .
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
        alt: "Intelligence artificielle appliquée à la finance d'entreprise",
      }}
      kpis={[
        { value: "4", label: "cas d'usage qui fonctionnent" },
        { value: "3", label: "usages à proscrire" },
        { value: "4", label: "règles dans la charte d'équipe" },
        { value: "0", label: "chiffre produit par le modèle" },
      ]}
      essentiel={{
        title: "L'essentiel en 5 points",
        items: [
          <>
            ChatGPT rédige et structure ; il{" "}
            <strong className="text-foreground">ne calcule pas</strong>. Tout chiffre qu&apos;il
            produit ou cite doit être recalculé.
          </>,
          <>
            Quatre usages qui fonctionnent : premier jet des commentaires de clôture, questions de
            board, structuration d&apos;analyses ponctuelles, vulgarisation pour les non-financiers.
          </>,
          <>
            Trois usages à proscrire : y mettre des données nominatives ou confidentielles, lui faire
            produire un chiffre, l&apos;utiliser pour de la conformité (TVA, fiscalité, normes).
          </>,
          <>
            Pour un usage récurrent, une <strong className="text-foreground">offre professionnelle</strong>{" "}
            dont les données ne servent pas à entraîner les modèles — la version grand public ne
            convient pas.
          </>,
          <>
            Une charte d&apos;une page, signée par l&apos;équipe finance : données anonymisées,
            rédaction seulement, relecture systématique, offre pro dès que l&apos;usage devient
            hebdomadaire.
          </>,
        ],
      }}
      toc={TOC}
      faqTitle="Questions fréquentes sur ChatGPT en finance"
      faq={FAQ}
      cta={{
        title: "Cadrer l'usage de l'IA dans votre équipe finance",
        text:
          "Charte, offre professionnelle, cas d'usage priorisés : un diagnostic d'une journée pose le cadre et identifie ce que votre équipe peut automatiser sans risque.",
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
          href: "/ressources/ia-finance/llm-finance",
          img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
          alt: "Les grands modèles de langage appliqués à la finance",
          title: "LLM en finance : ce que ChatGPT, Claude et Gemini peuvent faire pour vos chiffres — et ce qu'ils ne feront jamais",
        },
        {
          href: "/ressources/ia-finance/automatiser-reporting-financier",
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
          alt: "Automatiser le reporting financier",
          title: "Automatiser le reporting financier : ce qui marche, ce qui échoue, et par où commencer",
        },
      ]}
      references={getIaFinanceReferences("chatgpt-finance")}
    >
      <h2 id="cas-usage">Les quatre cas d&apos;usage qui fonctionnent</h2>
      <p>
        <strong>Rédiger les commentaires de clôture.</strong> Vous fournissez au modèle un tableau
        d&apos;écarts (budget contre réel, N contre N-1) anonymisé, et il produit un premier jet de
        commentaire structuré. Le DAF relit, corrige les erreurs d&apos;interprétation, ajoute le
        contexte que le modèle ne peut pas avoir. Le commentaire final reste signé par un humain qui
        en assume la responsabilité.
      </p>
      <p>
        <strong>Préparer les questions de board.</strong> À partir d&apos;un reporting finalisé, le
        modèle génère la liste des questions qu&apos;un administrateur ou un investisseur est
        susceptible de poser. C&apos;est un excellent exercice de préparation, parce que le modèle ne
        connaît pas vos angles morts — et pose parfois la question que vous espériez éviter.
      </p>
      <p>
        <strong>Structurer des analyses ponctuelles.</strong> Comparer deux scénarios de budget,
        rédiger une note sur l&apos;impact d&apos;une hausse de prix, préparer un plan de trésorerie
        à 13 semaines : le modèle produit une structure et des hypothèses à challenger, ce qui fait
        gagner du temps sur la page blanche.
      </p>
      <p>
        <strong>Traduire la finance pour les non-financiers.</strong> Expliquer le BFR à un
        directeur commercial, ou la différence entre EBITDA et trésorerie à un fondateur technique :
        le modèle est bon vulgarisateur, à condition de vérifier chaque chiffre qu&apos;il cite.
        Notre <Link href="/ressources/glossaire">glossaire finance</Link> fait le même travail,
        sans risque d&apos;erreur.
      </p>

      <h2 id="proscrire">Les trois usages à proscrire</h2>
      <p>
        <strong>Ne jamais y mettre de données nominatives ou confidentielles.</strong> Ni les
        salaires, ni les données clients, ni les chiffres non publiés de l&apos;entreprise dans la
        version grand public de l&apos;outil. Si votre entreprise veut un usage récurrent, il faut
        une offre professionnelle avec engagement de non-entraînement des données, ou un modèle
        hébergé. C&apos;est non négociable, et c&apos;est la première règle que nous posons en
        mission.
      </p>
      <p>
        <strong>Ne jamais lui faire produire un chiffre.</strong> Un LLM ne calcule pas, il prédit
        du texte. Il peut vous écrire une formule Excel correcte, mais si vous lui demandez le
        résultat d&apos;un calcul, il peut répondre un nombre faux avec un ton parfaitement assuré.
        Tout chiffre produit ou cité par le modèle doit être recalculé.
      </p>
      <p>
        <strong>Ne jamais l&apos;utiliser pour de la conformité.</strong> TVA, règles fiscales,
        normes comptables : le modèle mélange les régimes, les pays et les millésimes. Sur ces
        sujets, une erreur coûte plus cher que le temps gagné. Pour la fiscalité France-Espagne par
        exemple, nos{" "}
        <Link href="/ressources/fiscalite-espagne-france">guides fiscaux</Link> sont vérifiés et
        sourcés, ce qu&apos;aucun LLM ne garantit.
      </p>

      <h2 id="charte">La méthode que nous posons en mission</h2>
      <p>
        Quatre règles, écrites dans une charte d&apos;une page que signe l&apos;équipe finance : des
        données anonymisées ou agrégées uniquement ; un usage limité à la rédaction et à la
        structuration, jamais au calcul ; une relecture systématique par le responsable financier ;
        et une offre professionnelle dès que l&apos;usage devient hebdomadaire. Les fiches pratiques
        de la CNIL sur l&apos;IA (en sources) donnent le cadre juridique de cette charte.
      </p>
      <p>
        Avec ce cadre, ChatGPT devient ce qu&apos;il doit être : un assistant de rédaction rapide,
        pas un oracle financier. Le jugement reste du côté du DAF. C&apos;est d&apos;ailleurs
        l&apos;un des sujets que nous abordons dans notre guide sur{" "}
        <Link href="/ressources/ia-finance/automatiser-reporting-financier">
          l&apos;automatisation du reporting financier
        </Link>
        , où le LLM intervient en fin de chaîne, sur la rédaction des commentaires.
      </p>

      <h2 id="offres">Version grand public ou offre professionnelle ?</h2>
      <p>
        La différence n&apos;est pas la qualité des réponses, c&apos;est le sort de vos données.
        OpenAI documente que les conversations de la version grand public peuvent servir à
        améliorer les modèles, sauf désactivation ; les offres Team et Enterprise excluent cet
        usage par défaut (liens en sources). Pour une direction financière, la question est donc
        tranchée avant même de parler de prix : dès que l&apos;usage sort du test personnel,
        c&apos;est l&apos;offre professionnelle. Le comparatif des trois grands modèles et de leurs
        offres pro est dans notre{" "}
        <Link href="/ressources/ia-finance/llm-finance">analyse des LLM en finance</Link>.
      </p>
    </GuideFiscalPage>
  );
}
