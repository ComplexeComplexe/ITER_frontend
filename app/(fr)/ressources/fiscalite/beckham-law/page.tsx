import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, AlertOctagon, Info } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import GuideFiscalPage from "@/components/pages/GuideFiscalPage";
import type { TocHeading } from "@/components/blog/ArticleTOC";

/**
 * Pillar page of the "Fiscalité Espagne France" cocoon.
 *
 * B-01/B-04 (2026-08-02) — page réécrite et DÉCOUPLÉE de blog-posts.ts.
 * Auparavant elle rendait `blogPosts.fr["loi-beckham-espagne-conditions-2026"]`,
 * c'est-à-dire exactement la même source que l'article servi à
 * /ressources/blog/loi-beckham-espagne-conditions-2026 : un seul contenu à
 * deux URLs, avec title et H1 identiques. D'où la cannibalisation qui
 * plafonnait la page en position 7-9 sur « loi beckham espagne ».
 * L'article clone part désormais en 301 (next.config.ts) et cette page
 * porte son propre contenu.
 *
 * Correction factuelle majeure : la version précédente affirmait que le
 * Modelo 720 est obligatoire sous régime Beckham. C'est l'inverse — la DGT
 * l'a tranché par consulta vinculante V0092/2014. Contenu YMYL : toute
 * modification des chiffres ou des références doit être re-sourcée.
 *
 * REDESIGN-02 (2026-09-01) — cette page était le modèle du gabarit
 * GuideFiscalPage ; elle passe dessus à son tour. Le texte est inchangé
 * (dateModified conservée), seul le balisage l'est : le corps est du HTML
 * sémantique dans la typographie `.prose-iter-blog`, les tableaux perdent
 * leurs classes utilitaires au profit de `.prose-table-wrapper`.
 */

const PATH = "/ressources/fiscalite/beckham-law";
const PUBLISHED_DATE = "2026-05-31";
const MODIFIED_DATE = "2026-08-02";

const HERO_IMG =
  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80";
const SIMU_IMG =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Loi Beckham Espagne : conditions et taux | Iter Advisors",
  description:
    "Loi Beckham : taux fixe de 24 % pendant 6 ans, conditions 2026, Modelo 149 et simulation de l'économie d'impôt. Le guide complet du régime des impatriés.",
  path: PATH,
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn't crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* Sommaire du corps — le gabarit ajoute « L'essentiel » et la FAQ. */
const TOC: TocHeading[] = [
  { id: "definition", level: 2, label: "Qu'est-ce que la loi Beckham ?" },
  { id: "taux", level: 2, label: "Le taux de 24 % : ce qui est taxé" },
  { id: "simulation", level: 2, label: "IRPF classique ou loi Beckham : le calcul" },
  { id: "conditions", level: 2, label: "Conditions d'éligibilité en 2026" },
  { id: "reforme-2023", level: 2, label: "Ce que la réforme 2023 a changé" },
  { id: "procedure", level: 2, label: "La demande étape par étape" },
  { id: "limites", level: 2, label: "Les limites du régime" },
  { id: "sortie", level: 2, label: "Après les 6 ans : la sortie de régime" },
  { id: "accompagnement", level: 2, label: "Structurer votre installation" },
];

/* FAQ — le texte visible et le FAQPage JSON-LD sont générés depuis ce
   même tableau, donc strictement identiques (exigence Google). */
const FAQ = [
  {
    question: "Quel est le taux d'imposition de la loi Beckham ?",
    answer:
      "Les revenus du travail de source espagnole sont taxés à un taux fixe de 24 % jusqu'à 600 000 € par an, puis à 47 % au-delà. Les revenus du capital de source espagnole suivent le barème de l'épargne des non-résidents (19 % à 28 %). Les revenus étrangers hors travail ne sont pas imposés en Espagne.",
  },
  {
    question: "Qui peut bénéficier de la loi Beckham en 2026 ?",
    answer:
      "Toute personne non résidente fiscale espagnole dans les 5 années précédentes qui s'installe en Espagne pour travailler : salarié sous contrat espagnol, détaché, administrateur de société, télétravailleur sous visa nomade digital, entrepreneur de startup certifiée ENISA ou professionnel hautement qualifié. Les autónomos classiques et les sportifs professionnels sont exclus.",
  },
  {
    question: "Un freelance peut-il bénéficier de la loi Beckham ?",
    answer:
      "Pas en tant qu'indépendant classique : la DGT exige une relation de subordination et rejette les autónomos qui facturent des clients espagnols. Depuis 2023, deux voies existent : le visa nomade digital pour les salariés d'entreprises étrangères, et la certification ENISA pour les entrepreneurs de startups innovantes.",
  },
  {
    question: "Quel est le délai pour demander le régime Beckham ?",
    answer:
      "Six mois à compter de l'inscription à la Sécurité sociale espagnole, pour déposer le Modelo 149 auprès de l'AEAT. Le délai est impératif : passé ce point, le régime est perdu pour toute la période.",
  },
  {
    question: "Combien de temps dure le régime Beckham ?",
    answer:
      "L'année fiscale d'arrivée plus les cinq années suivantes, soit 6 ans au total, sans renouvellement possible. Au terme, bascule automatique dans l'IRPF ordinaire. Le régime peut aussi se perdre en cours de route (départ, cessation du contrat justificatif).",
  },
  {
    question: "Faut-il déclarer le Modelo 720 sous la loi Beckham ?",
    answer:
      "Non pour le bénéficiaire principal (consulta vinculante DGT V0092/2014), car l'impatrié n'est pas imposé sur son revenu mondial. Le conjoint résident fiscal ordinaire reste tenu à l'obligation, et l'exemption cesse à la sortie du régime.",
  },
  {
    question: "À partir de quel salaire la loi Beckham est-elle avantageuse ?",
    answer:
      "Autour de 66 000 € de salaire brut annuel. En dessous, l'IRPF ordinaire coûte moins cher que le taux fixe de 24 %. À 80 000 €, l'économie est d'environ 2 000 € par an ; à 150 000 €, de l'ordre de 15 000 € par an selon la communauté autonome et la situation familiale.",
  },
  {
    question: "Que se passe-t-il si je quitte l'Espagne avant la fin des 6 ans ?",
    answer:
      "Le régime cesse à compter de l'année fiscale du départ, sans régularisation rétroactive des années écoulées. En cas de départ définitif, vous relevez ensuite du régime des non-résidents (IRNR) pour vos revenus de source espagnole éventuels.",
  },
];

const ELIGIBILITE: [string, boolean, string][] = [
  ["Salarié sous contrat espagnol ou détaché en Espagne", true, "Cas principal"],
  ["Administrateur de société espagnole", true, "Hors société patrimoniale détenue à 25 % ou plus"],
  ["Titulaire du visa nomade digital (salarié d'une entreprise étrangère)", true, "Depuis la loi Startups 2023"],
  ["Entrepreneur d'une startup certifiée ENISA", true, "Depuis 2023"],
  ["Professionnel hautement qualifié ou chercheur R&D (visas art. 71-72, loi 14/2013)", true, "Depuis 2023"],
  ["Conjoint et enfants de moins de 25 ans du bénéficiaire", true, "Installation simultanée, revenus inférieurs à ceux du bénéficiaire principal"],
  ["Autónomo « classique » (freelance facturant des clients espagnols)", false, "La DGT refuse systématiquement (consultas V2329-08, V2515-15, V1289-20) : il faut une relation de subordination"],
  ["Sportif professionnel", false, "Exclu depuis 2015"],
  ["Ancien résident fiscal espagnol (moins de 5 ans)", false, "Condition de non-résidence non remplie"],
];

const ETAPES = [
  {
    t: "Avant ou dès l'arrivée",
    d: "Obtenir le NIE, s'inscrire au censo fiscal (Modelo 030), puis à la Sécurité sociale espagnole. C'est cette dernière date qui fait courir le délai de 6 mois.",
  },
  {
    t: "Constituer le dossier",
    d: "Contrat de travail (ou lettre de détachement, visa, certification ENISA selon le cas), justificatif de non-résidence en Espagne sur les 5 années précédentes — en pratique, un certificat de résidence fiscale française délivré par la DGFiP fait foi.",
  },
  {
    t: "Déposer le Modelo 149",
    d: "Par voie électronique sur le site de l'AEAT. C'est le seul formulaire qui vaut option ; sans lui, vous êtes imposé au régime ordinaire même si vous remplissez toutes les conditions de fond.",
    badge: "Délai impératif — 6 mois",
  },
  {
    t: "Attendre la résolution",
    d: "L'AEAT dispose théoriquement de 10 jours ouvrés ; comptez plutôt 1 à 2 mois en pratique, et répondez vite à toute demande de complément.",
  },
  {
    t: "Une fois le régime accordé",
    d: "L'employeur applique une retenue à la source de 24 % sur la paie. Chaque année, vous déclarez via le Modelo 151 (campagne d'avril à juin) à la place du Modelo 100 des résidents ordinaires.",
  },
];

export default function Page() {
  return (
    <GuideFiscalPage
      path={PATH}
      breadcrumbLabel="Loi Beckham"
      h1="Loi Beckham en Espagne 2026 : le régime fiscal des impatriés à taux fixe"
      description="Loi Beckham : taux fixe de 24 % pendant 6 ans, conditions 2026, Modelo 149 et simulation de l'économie d'impôt. Le guide complet du régime des impatriés."
      author={{ name: "Sébastien Doat", url: "/a-propos/sebastien-doat" }}
      publishedDate={PUBLISHED_DATE}
      modifiedDate={MODIFIED_DATE}
      modifiedLabel="2 août 2026"
      badge="Mis à jour en août 2026"
      readMinutes={14}
      dek={
        <>
          La loi Beckham est le surnom du régime fiscal espagnol des impatriés — officiellement, le
          « régimen especial » de l&apos;article 93 de la loi sur l&apos;IRPF. Son principe : pendant{" "}
          <strong className="text-foreground">6 ans</strong>, un nouveau résident espagnol est imposé
          selon les règles des non-résidents, à un{" "}
          <strong className="text-foreground">taux fixe de 24 %</strong> sur ses revenus du travail de
          source espagnole, au lieu du barème progressif qui culmine à 47 %. Ses revenus de source
          étrangère restent, pour l&apos;essentiel, hors du champ de l&apos;impôt espagnol. Ce guide
          détaille les conditions en vigueur en 2026, la procédure de demande, les simulations
          chiffrées et les limites du régime.
        </>
      }
      heroImage={{
        src: HERO_IMG,
        alt: "Loi Beckham en Espagne : le régime fiscal des impatriés à taux fixe de 24 %",
      }}
      kpis={[
        { value: "24 %", label: "taux fixe IRPF" },
        { value: "6 ans", label: "durée du régime" },
        { value: "600 k€", label: "plafond au taux de 24 %" },
        { value: "6 mois", label: "délai Modelo 149" },
      ]}
      essentiel={{
        title: "L'essentiel de la loi Beckham en 6 points",
        items: [
          <>
            Taux fixe de <strong className="text-foreground">24 %</strong> sur les revenus du travail
            jusqu&apos;à <strong className="text-foreground">600 000 €</strong> par an, 47 % au-delà.
          </>,
          <>
            Durée : l&apos;année d&apos;arrivée + les 5 années suivantes, soit 6 ans, sans
            renouvellement possible.
          </>,
          <>
            Revenus étrangers (dividendes, plus-values, loyers perçus hors d&apos;Espagne) : non
            imposés en Espagne pendant toute la durée du régime.
          </>,
          <>
            Condition principale : ne pas avoir été résident fiscal espagnol au cours des{" "}
            <strong className="text-foreground">5 années</strong> précédant l&apos;installation.
          </>,
          <>
            Demande obligatoire via le <strong className="text-foreground">Modelo 149</strong>, dans
            les <strong className="text-foreground">6 mois</strong> suivant l&apos;inscription à la
            Sécurité sociale espagnole. Aucun délai supplémentaire n&apos;est accordé.
          </>,
          <>
            Depuis la réforme de 2023 (loi Startups), le régime s&apos;ouvre aux télétravailleurs
            internationaux, aux entrepreneurs et, sous conditions, au conjoint et aux enfants.
          </>,
        ],
      }}
      toc={TOC}
      faqTitle="Questions fréquentes sur la loi Beckham"
      faq={FAQ}
      cta={{
        title: "Structurer votre installation en Espagne",
        text:
          "Résidence fiscale, statut d'administrateur, Modelo 149, convention franco-espagnole : un diagnostic de 30 minutes suffit à trancher l'option et à sécuriser le calendrier.",
        footnote: "Nos DAF externalisés à Barcelone traitent ce sujet chaque semaine.",
      }}
      related={[
        {
          href: "/ressources/blog/loi-beckham-economie-impot-simulation",
          img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
          alt: "Calculatrice et documents financiers — simulation de l'économie d'impôt sous la loi Beckham",
          title: "Loi Beckham : le calcul de l'économie d'impôt, salaire par salaire",
        },
        {
          href: "/ressources/blog/loi-beckham-espagne-conditions-eligibilite",
          img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80",
          alt: "Vue de Madrid — conditions d'éligibilité au régime des impatriés en Espagne",
          title: "Loi Beckham : êtes-vous éligible au régime des impatriés ?",
        },
      ]}
      referencesKey="beckham-law"
    >
      {/* ── Définition ── */}
      <h2 id="definition">Qu&apos;est-ce que la loi Beckham ?</h2>
      <p>
        Le régime a été créé en 2004 pour attirer les cadres internationaux. Il doit son surnom à
        David Beckham, l&apos;un de ses premiers bénéficiaires célèbres lors de son arrivée au Real
        Madrid — les sportifs professionnels en sont depuis exclus, mais le nom est resté.
      </p>
      <p>
        Juridiquement, le mécanisme est subtil : le bénéficiaire reste contribuable de l&apos;IRPF
        (l&apos;impôt espagnol sur le revenu des personnes physiques), mais il est taxé{" "}
        <em>selon les règles de l&apos;impôt des non-résidents</em> (IRNR). Deux conséquences
        concrètes découlent de ce statut hybride.
      </p>
      <p>
        Première conséquence : l&apos;intégralité des revenus du travail est réputée de source
        espagnole, même la partie éventuellement réalisée à l&apos;étranger. Ils sont taxés au taux
        fixe, point. Deuxième conséquence : tout ce qui n&apos;est pas du revenu du travail et qui
        provient de l&apos;étranger — dividendes de vos participations françaises, intérêts, loyers
        d&apos;un bien resté en France, plus-values mobilières — n&apos;est pas imposé en Espagne.
        C&apos;est là que se joue l&apos;essentiel de l&apos;économie pour un dirigeant qui conserve
        des actifs en France.
      </p>
      <p>
        La réforme entrée en vigueur en janvier 2023 (loi 28/2022, dite « loi Startups », complétée
        par le décret RD 1008/2023) a élargi le dispositif, renommé pour l&apos;occasion « régime des
        travailleurs, professionnels, entrepreneurs et investisseurs déplacés ». Nous y revenons plus
        bas.
      </p>

      {/* ── Taux ── */}
      <h2 id="taux">Le taux de 24 % : ce qui est taxé, ce qui ne l&apos;est pas</h2>
      <div className="prose-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Type de revenu</th>
              <th scope="col">Sous la loi Beckham</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salaires et revenus du travail (source espagnole)</td>
              <td>
                <strong>24 %</strong> jusqu&apos;à <strong>600 000 €</strong>, 47 % au-delà
              </td>
            </tr>
            <tr>
              <td>Revenus du capital de source espagnole (dividendes, intérêts, plus-values)</td>
              <td>Barème de l&apos;épargne des non-résidents : 19 % à 28 % selon les tranches</td>
            </tr>
            <tr>
              <td>Revenus de source étrangère (hors travail)</td>
              <td>Non imposés en Espagne</td>
            </tr>
            <tr>
              <td>Impôt sur le patrimoine</td>
              <td>Uniquement sur les biens situés en Espagne</td>
            </tr>
            <tr>
              <td>Modelo 720 (déclaration des biens à l&apos;étranger)</td>
              <td>Non obligatoire pour le bénéficiaire (consulta DGT V0092/2014)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Deux points de cette table méritent un éclairage, car ils sont mal traités dans la plupart
        des publications en ligne.
      </p>

      {/* Callout « bon à savoir » — Modelo 720 */}
      <div className="my-6 rounded-xl border-l-4 border-iter-violet bg-iter-violet/5 p-4 sm:p-5">
        <div className="flex items-center gap-2 font-semibold text-foreground mb-2">
          <Info size={18} className="text-iter-violet shrink-0" aria-hidden />
          Le Modelo 720 n&apos;est pas dû sous régime Beckham
        </div>
        <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Contrairement à une idée répandue — y compris sur certains sites de conseil — le
          bénéficiaire du régime n&apos;est pas tenu de déclarer ses biens à l&apos;étranger via le{" "}
          <Link href="/ressources/fiscalite/modelo-720">Modelo 720</Link>. La Direction générale des
          impôts l&apos;a confirmé par consultation contraignante (V0092/2014) : l&apos;obligation ne
          vise que les contribuables imposés sur leur revenu mondial, ce qui n&apos;est pas le cas des
          impatriés. Attention toutefois : le conjoint installé en Espagne comme résident fiscal
          classique, lui, reste soumis à l&apos;obligation. Et l&apos;exemption cesse dès la sortie
          du régime.
        </div>
      </div>

      <p>
        Sur les revenus du travail : le taux de 24 % s&apos;applique sans abattements ni réductions.
        Le régime ordinaire, lui, prévoit un minimum personnel et familial et diverses réductions —
        c&apos;est pourquoi le Beckham n&apos;est pas avantageux à tous les niveaux de revenus, comme
        le montre la simulation ci-dessous.
      </p>

      {/* ── Simulation ── */}
      <h2 id="simulation">IRPF classique ou loi Beckham : le calcul, salaire par salaire</h2>
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted my-6">
        <Image
          src={SIMU_IMG}
          alt="Simulation d'impôt sous la loi Beckham : taux fixe de 24 % contre barème progressif de l'IRPF"
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <p>
        En régime ordinaire, le{" "}
        <Link href="/ressources/fiscalite/impot-revenu-espagne">barème de l&apos;IRPF espagnol</Link>{" "}
        est progressif : 19 % sur les premiers euros, puis 24 %, 30 %, 37 %, 45 %, et 47 % au-delà de
        300 000 € (tranche étatique + autonomique). Sous Beckham, chaque euro de salaire est taxé à
        24 %, dès le premier euro.
      </p>
      <p>
        Le point d&apos;équilibre se situe autour de <strong>66 000 €</strong> de salaire brut annuel.
        En dessous, le taux effectif de l&apos;IRPF ordinaire est inférieur à 24 % : le régime spécial
        vous coûterait plus cher qu&apos;il ne vous fait économiser. Au-dessus, l&apos;écart se creuse
        vite :
      </p>
      <div className="prose-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Salaire brut annuel</th>
              <th scope="col">IRPF ordinaire (estimation)</th>
              <th scope="col">Loi Beckham</th>
              <th scope="col">Économie annuelle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>60 000 €</td>
              <td>~14 500 €</td>
              <td>14 400 €</td>
              <td>≈ 0 € (point mort)</td>
            </tr>
            <tr>
              <td>80 000 €</td>
              <td>~21 000 €</td>
              <td>19 200 €</td>
              <td className="font-semibold text-emerald-600">~2 000 €</td>
            </tr>
            <tr>
              <td>120 000 €</td>
              <td>~36 000 €</td>
              <td>28 800 €</td>
              <td className="font-semibold text-emerald-600">~7 000 €</td>
            </tr>
            <tr style={{ background: "rgb(16 185 129 / 0.10)" }}>
              <td>
                <strong>150 000 €</strong>
              </td>
              <td>~51 000 €</td>
              <td>36 000 €</td>
              <td className="font-semibold text-emerald-600">~15 000 €</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Ces montants sont des ordres de grandeur calculés pour un célibataire sans enfant, hors
        cotisations sociales (qui restent identiques dans les deux régimes : environ 6,35 % côté
        salarié). Le résultat exact dépend de votre communauté autonome et de votre situation
        familiale. Pour un calcul appliqué à votre propre salaire, consultez notre article dédié :{" "}
        <Link href="/ressources/blog/loi-beckham-economie-impot-simulation">
          la simulation de l&apos;économie d&apos;impôt sous la loi Beckham, salaire par salaire
        </Link>
        .
      </p>
      <p>
        L&apos;économie ne se limite d&apos;ailleurs pas au salaire : pour un dirigeant qui perçoit
        des dividendes ou des plus-values de source française, l&apos;exonération espagnole des
        revenus étrangers pèse souvent plus lourd que le taux fixe lui-même. C&apos;est aussi ce qui
        rend le régime incompatible avec certaines situations — voir les limites plus bas.
      </p>

      {/* ── Conditions ── */}
      <h2 id="conditions">Conditions d&apos;éligibilité en 2026</h2>
      <p>Trois conditions cumulatives, sans exception :</p>
      <ol>
        <li>
          <strong>Non-résidence préalable.</strong> Vous ne devez pas avoir été{" "}
          <Link href="/ressources/fiscalite/residence-fiscale-france-espagne">
            résident fiscal en Espagne
          </Link>{" "}
          au cours des 5 années fiscales précédant votre installation. Ce délai était de 10 ans avant
          la réforme de 2023. Pour un Français qui n&apos;a jamais vécu en Espagne, la condition est
          remplie par défaut — mais un séjour espagnol ancien, même court, peut tout bloquer.
        </li>
        <li>
          <strong>Un motif professionnel admis.</strong> Contrat de travail avec une entreprise
          espagnole, mutation intra-groupe, nomination comme administrateur d&apos;une société
          espagnole (hors société patrimoniale détenue à 25 % ou plus), télétravail international
          sous visa nomade digital, ou entrepreneuriat dans une startup certifiée.
        </li>
        <li>
          <strong>Une demande dans les délais.</strong> L&apos;option doit être exercée via le Modelo
          149 dans les 6 mois suivant l&apos;inscription à la Sécurité sociale espagnole (ou le début
          effectif de l&apos;activité). Ce délai est impératif : passé ce point, le régime est perdu
          pour toute la période concernée.
        </li>
      </ol>

      <p>Qui est éligible, qui ne l&apos;est pas — l&apos;état du droit en 2026 :</p>
      <div className="prose-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Profil</th>
              <th scope="col">Éligible ?</th>
            </tr>
          </thead>
          <tbody>
            {ELIGIBILITE.map(([profil, ok, note]) => (
              <tr key={profil}>
                <td>{profil}</td>
                <td>
                  <span
                    className={
                      ok
                        ? "inline-block rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700"
                        : "inline-block rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700"
                    }
                  >
                    {ok ? "Éligible" : "Exclu"}
                  </span>
                  <span className="block mt-1.5 text-xs sm:text-sm text-muted-foreground">{note}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Le cas des freelances mérite un mot de prudence : la tentation est grande de se structurer en
        « faux salarié » pour entrer dans le régime. L&apos;administration et les tribunaux espagnols
        regardent la réalité de la relation — qui fixe les horaires, qui fournit les outils, qui porte
        le risque économique — et requalifient sans ménagement. Si vous êtes indépendant, les voies
        légitimes sont la certification ENISA ou le visa nomade digital, pas le montage contractuel.
      </p>
      <p>
        Pour tester votre situation point par point, nous avons publié une checklist complète :{" "}
        <Link href="/ressources/blog/loi-beckham-espagne-conditions-eligibilite">
          les conditions d&apos;éligibilité à la loi Beckham
        </Link>
        .
      </p>

      {/* ── Réforme 2023 ── */}
      <h2 id="reforme-2023">Ce que la réforme 2023 a changé</h2>
      <p>
        La loi 28/2022 de promotion de l&apos;écosystème des entreprises émergentes — la « loi
        Startups » — a modernisé le régime sur quatre points :
      </p>
      <ul>
        <li>
          <strong>Le délai de non-résidence passe de 10 à 5 ans.</strong> C&apos;est le changement le
          plus concret pour les Français : un ancien séjour en Espagne est désormais « effacé » au bout
          de 5 ans.
        </li>
        <li>
          <strong>Les télétravailleurs internationaux entrent dans le dispositif</strong>, via le visa
          nomade digital. Conditions principales : travailler pour une entreprise étrangère, justifier
          d&apos;environ 2 600 € de revenus mensuels (200 % du salaire minimum interprofessionnel) ;
          une activité pour des clients espagnols est tolérée dans la limite de 20 % du total.
        </li>
        <li>
          <strong>Les entrepreneurs et professionnels qualifiés</strong> (startup certifiée ENISA,
          R&amp;D, visas des articles 71 et 72 de la loi 14/2013) deviennent éligibles, y compris sans
          contrat de travail classique.
        </li>
        <li>
          <strong>Le régime s&apos;étend à la famille</strong> : le conjoint et les enfants de moins
          de 25 ans (ou en situation de handicap, sans limite d&apos;âge) peuvent opter pour le régime
          s&apos;ils s&apos;installent en même temps que le bénéficiaire principal ou avant la fin de
          la première année fiscale, et si leurs revenus restent inférieurs aux siens. Ils bénéficient
          alors des mêmes règles, exonération du Modelo 720 comprise.
        </li>
      </ul>

      {/* ── Procédure : timeline ── */}
      <h2 id="procedure">La demande étape par étape (Modelo 149, Modelo 151)</h2>
      <p>
        La procédure se déroule entièrement auprès de l&apos;AEAT, l&apos;agence fiscale espagnole.
        Elle supporte mal l&apos;approximation : une erreur de délai ou de pièce ne se répare pas.
      </p>
      <ol
        className="relative my-8 space-y-6 border-l-2 border-iter-violet/20"
        style={{ listStyle: "none", paddingLeft: "2rem" }}
      >
        {ETAPES.map((step, i) => (
          <li key={step.t} className="relative">
            <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-iter-violet font-heading text-xs font-bold text-white">
              {i + 1}
            </span>
            <div className="font-semibold text-foreground">{step.t}</div>
            {step.badge && (
              <span className="inline-flex items-center gap-1.5 my-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                <AlertTriangle size={13} aria-hidden />
                {step.badge}
              </span>
            )}
            <div className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
              {step.d}
            </div>
          </li>
        ))}
      </ol>

      <div className="prose-table-wrapper">
        <table>
          <thead>
            <tr>
              <th scope="col">Formulaire</th>
              <th scope="col">Objet</th>
              <th scope="col">Échéance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Modelo 030</td>
              <td>Inscription au censo fiscal</td>
              <td>À l&apos;arrivée</td>
            </tr>
            <tr>
              <td>
                <strong>Modelo 149</strong>
              </td>
              <td>Option pour le régime</td>
              <td>Sous 6 mois — impératif</td>
            </tr>
            <tr>
              <td>
                <strong>Modelo 151</strong>
              </td>
              <td>Déclaration annuelle</td>
              <td>Avril-juin, chaque année du régime</td>
            </tr>
            <tr>
              <td>Modelo 720</td>
              <td>Biens à l&apos;étranger</td>
              <td>Non applicable au bénéficiaire (voir plus haut)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Limites ── */}
      <h2 id="limites">Les limites du régime — ce que la loi Beckham ne permet pas</h2>
      <div className="my-6 rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4 sm:p-5">
        <div className="flex items-center gap-2 font-semibold text-amber-900 mb-2">
          <AlertTriangle size={18} className="shrink-0" aria-hidden />
          L&apos;option est irrévocable
        </div>
        <div className="text-sm sm:text-base text-amber-900/80 leading-relaxed">
          Une fois accordée — ou refusée — impossible de revenir en arrière pour la même période. Le
          taux fixe fait rêver, mais le régime a un revers qu&apos;il faut mesurer avant d&apos;opter.
        </div>
      </div>
      <ul>
        <li>
          <strong>Aucune déduction ni réduction de l&apos;IRPF ordinaire</strong> : ni minimum
          personnel et familial, ni réduction pour cotisations retraite, ni abattements autonomiques.
          C&apos;est la contrepartie du taux fixe, et la raison pour laquelle le régime est perdant
          sous ~66 000 € de revenus.
        </li>
        <li>
          <strong>Pas de protection conventionnelle.</strong> Pendant la durée du régime, vous
          n&apos;êtes pas considéré comme résident fiscal espagnol au sens des conventions fiscales
          internationales. Si l&apos;autre État vous taxe aussi, vous ne pouvez pas invoquer la{" "}
          <Link href="/ressources/fiscalite/double-imposition-france-espagne">
            convention franco-espagnole contre les doubles impositions
          </Link>{" "}
          pour vous en dégager. Sur les revenus du travail détaché ou les pensions, cette absence de
          filet peut créer de vraies doubles impositions — à analyser avant de signer.
        </li>
        <li>
          <strong>Les indemnités de licenciement ne sont pas exonérées</strong>, contrairement au
          régime ordinaire qui les exonère dans certaines limites.
        </li>
        <li>
          <strong>L&apos;impôt sur le patrimoine reste dû sur les biens espagnols</strong> (seul le
          patrimoine étranger est hors champ), et l&apos;impôt sur les successions et donations
          n&apos;est pas concerné par le régime.
        </li>
      </ul>
      <div className="my-6 rounded-xl border-l-4 border-red-600 bg-red-50 p-4 sm:p-5">
        <div className="flex items-center gap-2 font-semibold text-red-900 mb-2">
          <AlertOctagon size={18} className="shrink-0" aria-hidden />
          Le régime se perd
        </div>
        <div className="text-sm sm:text-base text-red-900/80 leading-relaxed">
          Départ d&apos;Espagne avant la fin des 6 ans, cessation du contrat qui a justifié
          l&apos;option, non-respect d&apos;une condition en cours de période : le régime cesse à
          partir de l&apos;année du fait générateur. Les années passées ne sont pas remises en cause,
          mais la sortie anticipée gâche souvent la stratégie patrimoniale construite autour.
        </div>
      </div>

      {/* ── Sortie ── */}
      <h2 id="sortie">Après les 6 ans : anticiper la sortie de régime</h2>
      <p>
        Au terme de la sixième année fiscale, vous basculez automatiquement dans l&apos;IRPF
        ordinaire, sans formalité ni possibilité de renouvellement. La bascule est brutale pour les
        hauts revenus : retour au barème progressif, imposition des revenus mondiaux, obligation du
        Modelo 720, déductions à reconstruire.
      </p>
      <p>
        La bonne pratique consiste à préparer cette sortie dès la quatrième année : restructuration
        éventuelle des revenus du capital, utilisation des enveloppes de réduction (plans de pension,
        dans leurs limites), arbitrage sur la résidence si votre situation professionnelle a changé.
        Vos droits sociaux accumulés pendant la période — retraite, chômage, santé — restent
        intégralement acquis ; seul le mode d&apos;imposition change.
      </p>

      {/* ── Accompagnement ── */}
      <h2 id="accompagnement">Structurer votre installation : l&apos;accompagnement Iter Advisors</h2>
      <p>
        La loi Beckham ne se décide pas sur un taux affiché : elle s&apos;arbitre en fonction de vos
        revenus français conservés, de votre statut (salarié, administrateur, entrepreneur), de la
        convention fiscale et du calendrier de votre installation. C&apos;est exactement le type de
        structuration fiscale et sociale que nos{" "}
        <Link href="/daf-externalise-barcelone">DAF externalisés à Barcelone</Link> pilotent pour les
        dirigeants français qui s&apos;installent en Espagne — en coordination avec les fiscalistes
        locaux lorsque le dossier le demande.
      </p>
      <p>
        Pour aller plus loin sur la fiscalité franco-espagnole :{" "}
        <Link href="/ressources/fiscalite-espagne-france">le hub Fiscalité Espagne-France</Link> —
        résidence fiscale, IRPF, double imposition, Modelo 720.
      </p>
    </GuideFiscalPage>
  );
}
