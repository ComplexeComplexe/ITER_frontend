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
 * Pilier « automatisation reporting » de la section IA & Finance.
 * IA-FINANCE (2026-09-01) — requête cible « automatisation reporting »
 * (320/mois, CPC 167 €, SERP 100 % éditeurs anglo-saxons). Contenu issu de
 * l'audit du 2 septembre, relu : les gains et coûts « mesurés sur nos
 * missions » y figuraient sans validation d'un DAF — ils ne sont pas publiés.
 * Restent la méthode, les positions et les prix éditeur sourcés.
 */

const PATH = "/ressources/ia-finance/automatiser-reporting-financier";
const DATE = "2026-09-01";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Automatiser le reporting financier : méthode DAF 2026",
  description:
    "Méthode complète pour automatiser le reporting financier d'une PME : ce qui s'automatise, les outils, les coûts réels et les erreurs observées en mission par des DAF externalisés.",
  path: PATH,
  disableHreflang: ["en", "es"],
});

const TOC: TocHeading[] = [
  { id: "perimetre", level: 2, label: "Ce qui s'automatise bien, et ce qui ne s'automatise pas" },
  { id: "methode", level: 2, label: "La méthode en quatre étapes (90 jours)" },
  { id: "cout", level: 2, label: "Ce que cela coûte" },
  { id: "erreurs", level: 2, label: "Les trois erreurs que nous voyons le plus souvent" },
  { id: "commencer", level: 2, label: "Par où commencer cette semaine" },
];

const FAQ = [
  {
    question: "Qu'est-ce que l'automatisation du reporting financier ?",
    answer:
      "Ce n'est pas « le reporting » qu'on automatise, mais des tâches précises à l'intérieur de sa production : l'extraction des données comptables, les rapprochements et contrôles de cohérence, la mise en forme et la diffusion, et le premier jet des commentaires de variance. Le jugement sur les retraitements et la présentation au board restent humains.",
  },
  {
    question: "Combien de temps faut-il pour automatiser un reporting mensuel ?",
    answer:
      "Environ 90 jours, en quatre étapes : nettoyer les données et le plan comptable (semaines 1 à 3), connecter l'outil comptable à l'outil de reporting (4 à 6), construire un tableau de bord unique de 12 indicateurs au plus (7 à 10), industrialiser la clôture avec un objectif J+5 (11 à 13). Si la comptabilité est en retard ou le plan comptable incohérent, ajoutez 4 à 6 semaines à la première étape.",
  },
  {
    question: "Faut-il un outil d'IA pour automatiser son reporting ?",
    answer:
      "Non, pas au début. L'essentiel du gain vient du connecteur entre l'outil comptable et l'outil de reporting, et du nettoyage des données qui le précède. Le LLM intervient en fin de chaîne, sur la rédaction des commentaires de clôture — et toujours relu par le responsable financier.",
  },
  {
    question: "Qui doit piloter un projet d'automatisation du reporting ?",
    answer:
      "Quelqu'un qui comprend une clôture et a l'autorité pour faire respecter le calendrier : le DAF ou le contrôleur de gestion. L'IT est un partenaire indispensable sur la connexion des données, mais le cahier des charges fonctionnel doit venir de la direction financière. Sans ce profil en interne, c'est précisément le rôle d'un DAF externalisé.",
  },
];

export default function Page() {
  return (
    <GuideFiscalPage
      hub={IA_FINANCE_HUB}
      path={PATH}
      breadcrumbLabel="Automatiser le reporting"
      h1="Automatiser le reporting financier : ce qui marche, ce qui échoue, et par où commencer"
      description="Méthode complète pour automatiser le reporting financier d'une PME : ce qui s'automatise, les outils, les coûts réels et les erreurs observées en mission par des DAF externalisés."
      author={IA_FINANCE_AUTHOR}
      publishedDate={DATE}
      modifiedDate={DATE}
      modifiedLabel="1er septembre 2026"
      badge="Publié en septembre 2026"
      readMinutes={7}
      dek={
        <>
          Un reporting financier mensuel produit à la main — extraction des balances,
          rapprochements, retraitements, mise en forme Excel, rédaction des commentaires, envoi —
          mobilise plusieurs jours par mois dans une PME. C&apos;est ce constat, répété de mission
          en mission, qui justifie l&apos;automatisation. Pas la mode de l&apos;IA. Ce guide décrit
          la méthode que nous appliquons chez nos clients : elle tient en{" "}
          <strong className="text-foreground">quatre étapes et environ 90 jours</strong>.
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        alt: "Tableau de bord financier automatisé sur écran",
      }}
      kpis={[
        { value: "4", label: "étapes, dans cet ordre" },
        { value: "13", label: "semaines de la méthode" },
        { value: "12", label: "indicateurs au maximum" },
        { value: "J+5", label: "objectif de clôture" },
      ]}
      essentiel={{
        title: "L'essentiel en 5 points",
        items: [
          <>
            On n&apos;automatise pas « le reporting » : on automatise des{" "}
            <strong className="text-foreground">tâches précises</strong> de sa production —
            extraction, rapprochements, mise en forme, premier jet des commentaires.
          </>,
          <>
            Le jugement sur les retraitements et la présentation au board ne s&apos;automatisent
            pas, et ne s&apos;automatiseront pas de sitôt.
          </>,
          <>
            <strong className="text-foreground">Nettoyer avant d&apos;automatiser</strong> : plan
            comptable cohérent, comptes d&apos;attente soldés, clôture documentée. Sinon,
            l&apos;automatisation produit des erreurs plus vite.
          </>,
          <>
            Un seul tableau de bord, 12 indicateurs au plus, validé par le dirigeant — pas les 40
            que l&apos;outil permet d&apos;afficher.
          </>,
          <>
            Le vrai bénéfice n&apos;est pas le temps gagné : c&apos;est une clôture qui passe de J+10
            à J+5, et des décisions prises sur des chiffres récents.
          </>,
        ],
      }}
      toc={TOC}
      faqTitle="Questions fréquentes sur l'automatisation du reporting"
      faq={FAQ}
      cta={{
        title: "Chronométrez votre prochain reporting",
        text:
          "Si sa production dépasse trois jours, l'automatisation est rentable chez vous. Un diagnostic d'une journée suffit à le cadrer — ce qui s'automatise, dans quel ordre, avec quels outils.",
        footnote: (
          <>
            C&apos;est exactement le type de diagnostic qu&apos;un{" "}
            <Link href="/daf-externalise" className="underline hover:text-white">
              DAF externalisé
            </Link>{" "}
            réalise en mission.
          </>
        ),
      }}
      related={[
        {
          href: "/ressources/ia-finance/chatgpt-finance",
          img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
          alt: "ChatGPT appliqué à la finance d'entreprise",
          title: "ChatGPT pour la finance : ce qu'un DAF en fait réellement, et les limites à connaître",
        },
        {
          href: "/ressources/ia-finance/outils",
          img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
          alt: "Outils de reporting automatisé et d'IA pour la finance",
          title: "Les outils de reporting automatisé et d'IA : ce que nous recommandons après usage réel",
        },
      ]}
      references={getIaFinanceReferences("automatiser-reporting-financier")}
    >
      <h2 id="perimetre">Ce qui s&apos;automatise bien, et ce qui ne s&apos;automatise pas</h2>
      <p>
        Commençons par tuer une idée reçue : on n&apos;automatise pas « le reporting », on automatise
        des tâches précises à l&apos;intérieur du processus de production du reporting. La
        distinction compte, parce que c&apos;est elle qui détermine le retour sur investissement.
      </p>
      <h3>Ce qui s&apos;automatise bien</h3>
      <p>
        <strong>L&apos;extraction des données comptables.</strong> Un connecteur direct entre votre
        outil comptable (Pennylane, Sage, Cegid, SAP) et votre outil de reporting supprime
        l&apos;export manuel des balances. C&apos;est le premier poste de temps qui disparaît.
      </p>
      <p>
        <strong>Les rapprochements et contrôles de cohérence.</strong> Les écarts entre la
        comptabilité et la trésorerie, les doublons de factures, les comptes d&apos;attente non
        soldés : ce sont des règles, donc automatisables. Les outils les appliquent mieux
        qu&apos;un humain fatigué un vendredi soir — et surtout, les erreurs cessent d&apos;être
        découvertes trois mois plus tard.
      </p>
      <p>
        <strong>La mise en forme et la diffusion.</strong> Un tableau de bord connecté (Power BI,
        Looker Studio, ou le module de reporting de votre stack) remplace le copier-coller mensuel
        dans un modèle PowerPoint.
      </p>
      <p>
        <strong>La rédaction des commentaires de variance.</strong> C&apos;est le cas d&apos;usage où
        les LLM apportent quelque chose de réel : à partir d&apos;un tableau d&apos;écarts, un modèle
        bien cadré rédige un premier jet de commentaire qu&apos;un DAF relit et corrige. Nous
        détaillons ce point dans notre{" "}
        <Link href="/ressources/ia-finance/chatgpt-finance">guide ChatGPT pour la finance</Link>.
      </p>
      <h3>Ce qui ne s&apos;automatise pas, et ne s&apos;automatisera pas de sitôt</h3>
      <p>
        <strong>Le jugement sur les retraitements.</strong> Provisionner ou non une créance
        douteuse, décider d&apos;un cut-off, arbitrer un traitement comptable : ce sont des décisions
        qui engagent la responsabilité du dirigeant et du commissaire aux comptes. Aucun outil ne
        les prend à votre place.
      </p>
      <p>
        <strong>La présentation au board.</strong> Un chiffre ne parle jamais seul. L&apos;ordre des
        slides, le choix de ce qu&apos;on met en avant, la réponse aux questions : c&apos;est le cœur
        du métier de DAF, et c&apos;est précisément ce que vous payez quand vous faites appel à un{" "}
        <Link href="/daf-externalise">DAF externalisé</Link>.
      </p>

      <h2 id="methode">La méthode en quatre étapes (90 jours)</h2>
      <p>
        <strong>Semaines 1 à 3 — Nettoyer avant d&apos;automatiser.</strong> C&apos;est l&apos;étape que
        tout le monde veut sauter, et c&apos;est celle qui conditionne tout le reste. Un plan
        comptable cohérent, des comptes d&apos;attente soldés, un processus de clôture documenté :
        sans cela, l&apos;automatisation ne fait que produire des erreurs plus vite. Un plan
        comptable qui a accumulé des dizaines de comptes inutilisés au fil des ans est fréquent, et
        il rallonge cette phase de plusieurs semaines.
      </p>
      <p>
        <strong>Semaines 4 à 6 — Connecter les sources.</strong> Mise en place du connecteur entre
        l&apos;outil comptable et l&apos;outil de reporting. Trois configurations couvrent la
        plupart des situations : le connecteur natif inclus dans l&apos;abonnement (Pennylane vers
        Power BI ou Looker Studio par l&apos;API), un connecteur du marché facturé à l&apos;abonnement
        (Sage ou Cegid vers Power BI), et le développement spécifique — le seul cas où un devis se
        justifie, réservé aux ERP anciens ou multi-sources. Exigez un chiffrage à la connexion,
        jamais au « projet global » : c&apos;est là que les devis dérapent.
      </p>
      <p>
        <strong>Semaines 7 à 10 — Construire le tableau de bord.</strong> Un seul tableau de bord,
        pas cinq. Les 12 indicateurs qui comptent pour votre dirigeant et votre board, pas les 40
        que l&apos;outil permet d&apos;afficher. Notre référence sur ce point :{" "}
        <Link href="/ressources/blog/tableau-de-bord-financier-startup-12-kpis">
          les 12 KPIs que tout CFO de startup doit suivre
        </Link>
        .
      </p>
      <p>
        <strong>Semaines 11 à 13 — Industrialiser la clôture.</strong> Le reporting automatisé
        change le calendrier : la clôture passe de J+10 à J+4 ou J+5, parce que les données
        arrivent en continu au lieu d&apos;arriver en fin de mois. C&apos;est le vrai bénéfice, plus
        que le gain de temps : des décisions prises sur des chiffres récents.
      </p>

      <h2 id="cout">Ce que cela coûte</h2>
      <p>
        Trois postes, et pas davantage : l&apos;abonnement à l&apos;outil de reporting (Looker Studio
        est gratuit, Power BI Pro se facture par utilisateur et par mois — grille Microsoft en
        sources), le connecteur (inclus, à l&apos;abonnement, ou développé — voir plus haut), et
        l&apos;accompagnement de la mise en place. Le retour sur investissement se calcule
        simplement : le nombre de jours de production économisés chaque mois, au coût de la personne
        qui produisait le reporting. Chronométrez avant, chronométrez après ; c&apos;est la seule
        mesure honnête.
      </p>

      <h2 id="erreurs">Les trois erreurs que nous voyons le plus souvent</h2>
      <p>
        <strong>Acheter l&apos;outil avant de nettoyer les données.</strong> C&apos;est l&apos;erreur
        numéro un, et elle coûte cher : l&apos;outil est payé, jamais déployé, et le reporting reste
        manuel.
      </p>
      <p>
        <strong>Automatiser un mauvais reporting.</strong> Si votre reporting actuel ne répond pas
        aux questions du dirigeant, l&apos;automatiser ne fera que produire plus vite un document
        inutile. Refaites d&apos;abord le contenu, automatisez ensuite.
      </p>
      <p>
        <strong>Confier le projet à l&apos;IT seul.</strong> L&apos;automatisation du reporting est un
        projet de direction financière, pas un projet informatique. L&apos;IT est un partenaire
        indispensable sur la connexion des données, mais le cahier des charges fonctionnel doit venir
        de quelqu&apos;un qui sait ce qu&apos;est une clôture.
      </p>

      <h2 id="commencer">Par où commencer cette semaine</h2>
      <p>
        Chronométrez la production de votre prochain reporting mensuel, tâche par tâche. C&apos;est
        la seule donnée dont vous avez besoin pour décider : si la production dépasse trois jours,
        l&apos;automatisation est rentable chez vous. Le plan d&apos;action détaillé, semaine par
        semaine, est dans notre{" "}
        <Link href="/ressources/ia-finance/feuille-de-route-90-jours">feuille de route 90 jours</Link>
        . Et si vous voulez un regard extérieur sur votre processus, c&apos;est exactement le type de
        diagnostic qu&apos;un <Link href="/daf-externalise">DAF externalisé</Link> réalise en une
        journée : <Link href="/contact">prenez rendez-vous</Link>.
      </p>
    </GuideFiscalPage>
  );
}
