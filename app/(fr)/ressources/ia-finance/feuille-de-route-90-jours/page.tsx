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
 * Page « action » de la section IA & Finance : le plan semaine par semaine
 * que la méthode du pilier reporting résume en quatre étapes.
 */

const PATH = "/ressources/ia-finance/feuille-de-route-90-jours";
const DATE = "2026-09-01";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Reporting automatisé : la feuille de route 90 jours",
  description:
    "Le plan d'action semaine par semaine pour passer d'un reporting manuel à un reporting automatisé avec l'IA : cadrage, données, outils, déploiement. Méthode éprouvée en mission.",
  path: PATH,
  disableHreflang: ["en", "es"],
});

const TOC: TocHeading[] = [
  { id: "s1-3", level: 2, label: "Semaines 1 à 3 — Cadrage et nettoyage" },
  { id: "s4-6", level: 2, label: "Semaines 4 à 6 — Connexion des données" },
  { id: "s7-10", level: 2, label: "Semaines 7 à 10 — Construction du tableau de bord" },
  { id: "s11-13", level: 2, label: "Semaines 11 à 13 — Industrialisation et IA" },
  { id: "derape", level: 2, label: "Les trois signes que le projet dérape" },
  { id: "pilote", level: 2, label: "Qui pilote ce projet" },
];

const FAQ = [
  {
    question: "Combien de temps faut-il pour automatiser un reporting financier ?",
    answer:
      "Treize semaines en quatre phases, pour une PME dont la comptabilité est tenue correctement et dont le dirigeant sponsorise le projet. Si la comptabilité est en retard ou le plan comptable incohérent, ajoutez quatre à six semaines à la première phase — c'est le nettoyage, pas l'outil, qui prend le temps.",
  },
  {
    question: "Par quoi commencer pour automatiser son reporting ?",
    answer:
      "Par chronométrer la production du reporting actuel, tâche par tâche, et lister les sources de données et leurs propriétaires. Puis solder les comptes d'attente, supprimer les comptes inutilisés et documenter le processus de clôture. Le livrable de cette première phase est un diagnostic d'une page et le périmètre exact de ce qui sera automatisé.",
  },
  {
    question: "Quels sont les signes qu'un projet d'automatisation du reporting dérape ?",
    answer:
      "Trois : le périmètre grandit en cours de route (« tant qu'on y est, automatisons aussi… »), le projet passe entre les mains de l'IT seul, le tableau de bord dépasse quinze indicateurs. Si l'un de ces signes apparaît, revenez au périmètre initial.",
  },
  {
    question: "Qui doit piloter un projet d'automatisation du reporting ?",
    answer:
      "Pas l'IT, pas le cabinet comptable, pas l'éditeur de l'outil : quelqu'un qui comprend une clôture et a l'autorité pour faire respecter le calendrier. En interne, c'est le DAF ou le contrôleur de gestion. Sans ce profil, c'est précisément le rôle d'un DAF externalisé.",
  },
];

export default function Page() {
  return (
    <GuideFiscalPage
      hub={IA_FINANCE_HUB}
      path={PATH}
      breadcrumbLabel="Feuille de route 90 jours"
      h1="La feuille de route 90 jours pour automatiser votre reporting financier avec l'IA"
      description="Le plan d'action semaine par semaine pour passer d'un reporting manuel à un reporting automatisé avec l'IA : cadrage, données, outils, déploiement. Méthode éprouvée en mission."
      author={IA_FINANCE_AUTHOR}
      publishedDate={DATE}
      modifiedDate={DATE}
      modifiedLabel="1er septembre 2026"
      badge="Publié en septembre 2026"
      readMinutes={5}
      dek={
        <>
          Cette feuille de route est celle que nous appliquons en mission. Elle suppose une PME
          avec une comptabilité tenue correctement et un dirigeant qui sponsorise le projet. Si votre
          comptabilité est en retard ou votre plan comptable incohérent, ajoutez{" "}
          <strong className="text-foreground">4 à 6 semaines</strong> à la première phase — c&apos;est
          le nettoyage qui prend le temps, jamais l&apos;outil.
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        alt: "Planification d'un projet d'automatisation du reporting financier",
      }}
      kpis={[
        { value: "13", label: "semaines" },
        { value: "4", label: "phases, chacune avec son livrable" },
        { value: "12", label: "indicateurs au maximum" },
        { value: "J+5", label: "objectif de clôture en sortie" },
      ]}
      essentiel={{
        title: "L'essentiel en 4 points",
        items: [
          <>
            <strong className="text-foreground">Semaines 1 à 3</strong> — cadrer et nettoyer :
            chronométrer, lister les sources, solder les comptes d&apos;attente, documenter la
            clôture. Livrable : un diagnostic d&apos;une page et le périmètre exact.
          </>,
          <>
            <strong className="text-foreground">Semaines 4 à 6</strong> — connecter : le connecteur
            entre l&apos;outil comptable et le reporting, testé sur un mois réel en parallèle du
            manuel.
          </>,
          <>
            <strong className="text-foreground">Semaines 7 à 10</strong> — construire un tableau de
            bord unique de 12 indicateurs au plus, validé par le dirigeant.
          </>,
          <>
            <strong className="text-foreground">Semaines 11 à 13</strong> — industrialiser : LLM sur
            les commentaires de clôture, calendrier décalé vers J+5, deux clôtures consécutives dans
            les délais.
          </>,
        ],
      }}
      toc={TOC}
      faqTitle="Questions fréquentes sur la feuille de route"
      faq={FAQ}
      cta={{
        title: "Vous n'avez pas ce profil en interne ?",
        text:
          "Quelqu'un qui comprend une clôture et a l'autorité pour tenir le calendrier : c'est précisément le rôle d'un DAF externalisé. Un diagnostic d'une journée lance la phase 1.",
        footnote: (
          <>
            Découvrir le{" "}
            <Link href="/daf-externalise" className="underline hover:text-white">
              DAF externalisé
            </Link>
            .
          </>
        ),
      }}
      related={[
        {
          href: "/ressources/ia-finance/automatiser-reporting-financier",
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
          alt: "Automatiser le reporting financier",
          title: "Automatiser le reporting financier : ce qui marche, ce qui échoue, et par où commencer",
        },
        {
          href: "/ressources/blog/tableau-de-bord-financier-startup-12-kpis",
          img: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=600&q=80",
          alt: "Tableau de bord financier de startup",
          title: "Tableau de bord financier startup : les 12 KPIs que tout CFO doit suivre",
        },
      ]}
      references={getIaFinanceReferences("feuille-de-route-90-jours")}
    >
      <h2 id="s1-3">Semaines 1 à 3 — Cadrage et nettoyage</h2>
      <p>
        Chronométrez la production de votre reporting actuel, tâche par tâche. Listez les sources
        de données et leurs propriétaires. Soldez les comptes d&apos;attente, supprimez les comptes
        inutilisés, documentez le processus de clôture existant. Livrable de fin de phase : un
        diagnostic d&apos;une page et le périmètre exact de ce qui sera automatisé.
      </p>

      <h2 id="s4-6">Semaines 4 à 6 — Connexion des données</h2>
      <p>
        Choisissez le connecteur entre votre outil comptable et votre outil de reporting, en suivant
        les configurations décrites dans notre{" "}
        <Link href="/ressources/ia-finance/outils">comparatif d&apos;outils</Link>. Testez sur un
        mois de clôture réel, en parallèle du processus manuel. Livrable : les données arrivent dans
        l&apos;outil de reporting sans intervention manuelle.
      </p>

      <h2 id="s7-10">Semaines 7 à 10 — Construction du tableau de bord</h2>
      <p>
        Construisez un tableau de bord unique de 12 indicateurs maximum, validé par le dirigeant.
        Notre référence :{" "}
        <Link href="/ressources/blog/tableau-de-bord-financier-startup-12-kpis">
          les 12 KPIs du CFO de startup
        </Link>
        , à adapter à votre modèle économique. Livrable : le reporting du mois M est produit
        intégralement sur le nouveau dispositif.
      </p>

      <h2 id="s11-13">Semaines 11 à 13 — Industrialisation et IA</h2>
      <p>
        Intégrez le LLM sur la rédaction des commentaires de clôture, avec la charte
        d&apos;utilisation décrite dans notre{" "}
        <Link href="/ressources/ia-finance/chatgpt-finance">guide ChatGPT pour la finance</Link>.
        Décalez le calendrier de clôture : objectif J+5. Livrable : deux clôtures consécutives
        produites dans les délais, avec commentaires.
      </p>

      <h2 id="derape">Les trois signes que le projet dérape</h2>
      <p>
        Le périmètre grandit en cours de route (« tant qu&apos;on y est, automatisons aussi… »). Le
        projet passe entre les mains de l&apos;IT seul. Le tableau de bord dépasse 15 indicateurs. Si
        l&apos;un de ces signes apparaît, revenez au périmètre initial.
      </p>

      <h2 id="pilote">Qui pilote ce projet</h2>
      <p>
        Pas l&apos;IT, pas le cabinet comptable, pas l&apos;éditeur de l&apos;outil. Quelqu&apos;un
        qui comprend une clôture et qui a l&apos;autorité pour faire respecter le calendrier. En
        interne, c&apos;est le DAF ou le contrôleur de gestion. Si vous n&apos;avez pas ce profil,
        c&apos;est précisément le rôle d&apos;un <Link href="/daf-externalise">DAF externalisé</Link>{" "}
        : <Link href="/contact">prenez rendez-vous</Link> pour un diagnostic d&apos;une journée.
      </p>
    </GuideFiscalPage>
  );
}
