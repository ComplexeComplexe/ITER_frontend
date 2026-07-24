import { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { getCmsNavigation } from "@/lib/strapi";
import { Callout, ProseTable } from "@/components/blog";
import { faqPageSchema, howToSchema, breadcrumbSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Loi Beckham Espagne 2026 : guide complet, taux 24% et conditions | Iter Advisors",
  description:
    "Guide complet sur la Loi Beckham en Espagne : taux fixe à 24%, conditions d'éligibilité 2026, calcul d'économie d'impôt, et démarches pas à pas. Profils expatriés et digital nomads.",
  alternates: {
    canonical: "https://www.iteradvisors.com/ressources/fiscalite/loi-beckham",
    languages: {
      "fr-FR": "https://www.iteradvisors.com/ressources/fiscalite/loi-beckham",

      "x-default": "https://www.iteradvisors.com/ressources/fiscalite/loi-beckham",
    },
  },
  openGraph: {
    title: "Loi Beckham Espagne 2026 : guide complet — taux 24 %, conditions et démarches",
    description:
      "Taux fixe 24 %, calcul d'économie réelle, guide étape par étape. Le guide complet pour expatriés et digital nomads.",
    type: "article",
    images: [
      {
        url: "/images/blog/loi-beckham-espagne.webp",
        alt: "Loi Beckham Espagne 2026 — guide complet Iter Advisors",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Quel est le taux d'imposition de la Loi Beckham ?",
    answer:
      "24 % fixe sur les revenus du travail de source espagnole jusqu'à 600 000 €. Au-delà de 600 000 €, le barème progressif s'applique jusqu'à 47 %.",
  },
  {
    question: "Combien de temps dure le régime Beckham ?",
    answer:
      "6 ans au total : l'année de votre arrivée en Espagne + les 5 années civiles suivantes. Après cette période, vous basculez dans le régime de résident fiscal classique (barème progressif IRPF).",
  },
  {
    question: "Qui peut bénéficier de la Loi Beckham en 2026 ?",
    answer:
      "Quatre profils : salariés en mutation intra-groupe, administrateurs de sociétés espagnoles, digital nomads avec visa adapté, et entrepreneurs créant une activité en Espagne. Condition commune : ne pas avoir été résident fiscal en Espagne depuis 5 ans.",
  },
  {
    question: "Dans quel délai faut-il faire la demande Beckham ?",
    answer:
      "6 mois maximum à compter de votre inscription à la Sécurité Sociale espagnole. Ce délai est strict et non négociable.",
  },
  {
    question: "Les digital nomads peuvent-ils bénéficier de la Loi Beckham ?",
    answer:
      "Oui, depuis la réforme de 2023. Les télétravailleurs disposant du Digital Nomad Visa sont éligibles, sous réserve de travailler principalement pour des employeurs ou clients étrangers.",
  },
  {
    question: "La Loi Beckham couvre-t-elle les dividendes et plus-values ?",
    answer:
      "Les revenus du capital (dividendes, intérêts, plus-values) de source étrangère ne sont pas imposés en Espagne. Ceux de source espagnole sont imposés selon les règles du non-résident, généralement à 24 %.",
  },
  {
    question: "Que se passe-t-il après les 6 ans de Loi Beckham ?",
    answer:
      "Vous basculez dans le régime de résident fiscal classique (barème progressif IRPF). Il est conseillé d'anticiper cette transition 12 à 18 mois à l'avance avec un fiscaliste.",
  },
  {
    question: "La Loi Beckham est-elle compatible avec la convention fiscale France-Espagne ?",
    answer:
      "Oui. La convention fiscale s'applique pour déterminer la résidence fiscale et éviter la double imposition. La Loi Beckham est un régime interne espagnol qui s'applique une fois la résidence fiscale établie en Espagne.",
  },
  {
    question: "Faut-il faire appel à un fiscaliste pour la Loi Beckham ?",
    answer:
      "Fortement recommandé. Les démarches sont complexes, le délai de 6 mois est strict, et les erreurs sont irréversibles. Un fiscaliste franco-espagnol vous accompagne sur la structuration, les déclarations, et la transition.",
  },
  {
    question: "Quel est le coût d'une consultation pour la Loi Beckham ?",
    answer:
      "Chez Iter Advisors, le premier diagnostic de 30 minutes est offert. Nos forfaits d'accompagnement fiscal franco-espagnol démarrent à 1 500 €.",
  },
];

const howToSteps = [
  {
    name: "Vérifiez votre éligibilité avant le départ",
    text: "Confirmez que vous n'avez pas été résident fiscal en Espagne les 5 dernières années. En cas de doute, consultez un fiscaliste ou demandez un diagnostic.",
  },
  {
    name: "Obtenez votre NIE (Número de Identificación de Extranjero)",
    text: "Le NIE est indispensable pour toute démarche fiscale en Espagne. Déposez votre demande auprès du consulat espagnol en France ou directement en Espagne.",
  },
  {
    name: "Inscrivez-vous à la Sécurité Sociale espagnole",
    text: "Votre employeur (ou vous-même en tant qu'auto-entrepreneur) vous inscrit à la Seguridad Social. Cette date d'inscription est le point de départ des 6 mois pour postuler.",
  },
  {
    name: "Remplissez le formulaire Modèle 149",
    text: "Ce formulaire, disponible sur le site de l'Agencia Tributaria, déclare votre choix d'être imposé selon le régime des non-résidents (IRNR) via la Loi Beckham.",
  },
  {
    name: "Déposez votre demande dans les 6 mois",
    text: "Le délai est strict : 6 mois à compter de votre inscription à la Sécurité Sociale. Au-delà, vous serez imposé selon le barème progressif classique.",
  },
  {
    name: "Attendez la validation de l'Agencia Tributaria",
    text: "Le délai de traitement est de 3 à 6 mois. Conservez l'accusé de réception de votre dépôt.",
  },
  {
    name: "Déclarez vos revenus selon le régime Beckham",
    text: "Une fois la validation obtenue, vos revenus du travail sont imposés au taux fixe de 24 %. Vous déposez votre déclaration annuelle via le Modèle 151.",
  },
];

export default async function LoiBeckhamPage() {
  const cmsNavigation = await getCmsNavigation("fr");

  const faqSchemaData = faqPageSchema(faqItems);
  const howToSchemaData = howToSchema({
    name: "Comment faire sa demande Loi Beckham en Espagne",
    description:
      "Guide étape par étape pour bénéficier du régime Beckham en Espagne : de la vérification d'éligibilité à la première déclaration fiscale.",
    steps: howToSteps,
    totalTime: "P6M",
  });
  const breadcrumbSchemaData = breadcrumbSchema([
    { name: "Accueil", url: "https://www.iteradvisors.com/" },
    { name: "Ressources", url: "https://www.iteradvisors.com/ressources" },
    { name: "Fiscalité", url: "https://www.iteradvisors.com/ressources/fiscalite-espagne-france" },
    { name: "Loi Beckham", url: "https://www.iteradvisors.com/ressources/fiscalite/loi-beckham" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }}
      />
      <BlogPostPageRefonte
        locale="fr"
        cmsNavigation={cmsNavigation}
        breadcrumbs={{
          resourcesLabel: "Ressources",
          resourcesHref: "/ressources",
          blogLabel: "Fiscalité",
          blogHref: "/ressources/fiscalite",
        }}
        slug="loi-beckham"
        category="Fiscalité internationale"
        title="Loi Beckham en Espagne 2026 : le guide complet pour les impatriés"
        dek="Taux fixe 24 %, conditions d'éligibilité, calcul d'économie d'impôt, démarches pas à pas et pièges à éviter. Le guide de référence pour les expatriés et digital nomads."
        author={{
          name: "Sébastien Doat",
          avatar: "/images/team/sebastien-doat.webp",
          jobTitle: "Partner, Iter Advisors",
        }}
        readingTime={18}
        dateModified="2026-07-20"
        heroImage="/images/blog/loi-beckham-espagne.webp"
        metaDescription="Guide complet sur la Loi Beckham en Espagne : taux fixe à 24%, conditions d'éligibilité 2026, calcul d'économie d'impôt, et démarches pas à pas."
        toc={[
          { id: "taux-imposition", label: "1. Taux 24 % vs barème progressif" },
          { id: "economies", label: "2. Combien vous économisez réellement ?" },
          { id: "profils-eligibles", label: "3. Qui peut en bénéficier ?" },
          { id: "conditions-2026", label: "4. Conditions d'éligibilité 2026" },
          { id: "reformes-2026", label: "5. Ce qui change en 2026" },
          { id: "comment-postuler", label: "6. Guide étape par étape" },
          { id: "pieges", label: "7. Pièges et limites" },
          { id: "digital-nomads", label: "8. Loi Beckham et digital nomads" },
          { id: "comparatif-france", label: "9. Comparatif France-Espagne" },
          { id: "faq", label: "10. FAQ" },
        ]}
        tldr="La Loi Beckham permet un taux fixe de 24 % sur les revenus du travail pendant 6 ans. Économie potentielle : 13 000 €/an à 100 000 € de revenus, 42 000 €/an à 200 000 €. Éligible si : pas de résidence espagnole depuis 5 ans + motif professionnel. Délai critique : 6 mois après l'inscription à la Sécurité Sociale pour déposer le Modèle 149."
        relatedArticles={[
          {
            url: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
            category: "Fiscalité",
            title: "Régimes fiscaux : France vs Espagne — Comparaison complète 2026",
          },
          {
            url: "/services/ley-beckham",
            category: "Service",
            title: "Accompagnement Loi Beckham — Iter Advisors",
          },
          {
            url: "/ressources/blog/checklist-due-diligence-levee-de-fonds",
            category: "Guide",
            title: "Checklist due diligence levée de fonds",
          },
        ]}
      >
        {/* ── INTRODUCTION ──────────────────────────────────────────────── */}
        <p>
          Le <strong>Régime Spécial des Travailleurs Déplacés</strong>, plus connu sous le nom de{" "}
          <strong>Loi Beckham</strong>, est le dispositif fiscal le plus attractif d&apos;Europe pour
          les expatriés qui s&apos;installent en Espagne. Créé en 2005 et réformé en 2023 par la loi
          sur les startups, ce régime permet aux nouveaux résidents d&apos;être imposés comme des
          non-résidents pendant 6 ans, avec un taux fixe de 24 % sur les revenus du travail — contre
          47 % au sommet du barème progressif espagnol.
        </p>
        <p>
          Ce régime tire son nom du footballeur David Beckham, qui en fut l&apos;un des premiers
          bénéficiaires en rejoignant le Real Madrid. Depuis, des milliers d&apos;expatriés — cadres
          dirigeants, entrepreneurs, digital nomads — l&apos;ont utilisé pour réduire
          significativement leur pression fiscale tout en profitant de la qualité de vie espagnole.
        </p>
        <p>
          En 2026, la Loi Beckham connaît une nouvelle audience avec l&apos;extension aux
          télétravailleurs internationaux (Digital Nomads Visa) et la réduction du délai
          d&apos;absence préalable de 10 à 5 ans. Ce guide vous explique tout : taux, conditions,
          calcul d&apos;économie, démarches, et pièges à éviter.
        </p>

        {/* ── H2 : TAUX D'IMPOSITION ────────────────────────────────────── */}
        <h2 id="taux-imposition">Taux d&apos;imposition : 24 % fixe contre barème progressif</h2>
        <p>
          <strong>Le cœur du régime Beckham : un taux fixe de 24 %</strong> sur les revenus du
          travail de source espagnole, jusqu&apos;à 600 000 € par an. Au-delà, le taux passe à 47 %
          — mais ce seuil concerne très peu de contribuables.
        </p>
        <p>
          <strong>Comparaison avec le barème progressif IRPF classique :</strong>
        </p>
        <ProseTable>
          <thead>
            <tr>
              <th>Tranche de revenus</th>
              <th>Barème IRPF classique</th>
              <th>Avec Loi Beckham</th>
              <th>Économie annuelle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>60 000 €/an</td>
              <td>~25 % (15 000 €)</td>
              <td>24 % (14 400 €)</td>
              <td>600 €</td>
            </tr>
            <tr>
              <td>100 000 €/an</td>
              <td>~37 % (37 000 €)</td>
              <td>24 % (24 000 €)</td>
              <td><strong>13 000 €</strong></td>
            </tr>
            <tr>
              <td>150 000 €/an</td>
              <td>~43 % (64 500 €)</td>
              <td>24 % (36 000 €)</td>
              <td><strong>28 500 €</strong></td>
            </tr>
            <tr>
              <td>200 000 €/an</td>
              <td>~45 % (90 000 €)</td>
              <td>24 % (48 000 €)</td>
              <td><strong>42 000 €</strong></td>
            </tr>
            <tr>
              <td>300 000 €/an</td>
              <td>~47 % (141 000 €)</td>
              <td>24 % (72 000 €)</td>
              <td><strong>69 000 €</strong></td>
            </tr>
            <tr>
              <td>600 000 €/an</td>
              <td>~47 % (282 000 €)</td>
              <td>24 % (144 000 €)</td>
              <td><strong>138 000 €</strong></td>
            </tr>
          </tbody>
        </ProseTable>
        <p>
          <em>
            Source : Barème IRPF Espagne 2026 (Agencia Tributaria). Calculs indicatifs pour un
            célibataire sans enfants, Communauté de Madrid.
          </em>
        </p>
        <p>
          <strong>Autres avantages fiscaux du régime Beckham :</strong>
        </p>
        <ul>
          <li>
            <strong>Revenus du capital étrangers non taxés :</strong> dividendes, intérêts,
            plus-values de source étrangère ne sont pas imposés en Espagne
          </li>
          <li>
            <strong>Pas d&apos;Impôt sur le Patrimoine</strong> sur les biens situés hors
            d&apos;Espagne
          </li>
          <li>
            <strong>Pas de déclaration Modèle 720</strong> (déclaration des biens à l&apos;étranger)
          </li>
          <li>
            <strong>Imposition uniquement sur les revenus de source espagnole</strong> pour les
            revenus du travail
          </li>
        </ul>
        <Callout type="info" title="Le regard du CFO">
          "La différence entre le barème progressif et la Loi Beckham n'est pas marginale — elle est
          transformative. Un cadre à 200 000 € économise 42 000 € par an. Sur 6 ans, c'est 252 000 €,
          soit l'équivalent d'un appartement à Barcelone. Mais attention : le régime ne couvre pas
          tous les revenus, et le délai de 6 mois pour postuler est impitoyable." —{" "}
          <em>Sébastien Doat, Partner Iter Advisors</em>
        </Callout>

        {/* ── H2 : ÉCONOMIES RÉELLES ────────────────────────────────────── */}
        <h2 id="economies">Combien vous économisez réellement ? Exemples de calcul</h2>

        <h3>Profil 1 : Cadre dirigeant en mutation intra-groupe</h3>
        <p>
          Sophie, 42 ans, directrice commerciale d&apos;un groupe tech, mutée de Paris à Barcelone.
          Revenus : 150 000 €/an.
        </p>
        <ProseTable>
          <thead>
            <tr>
              <th>Poste</th>
              <th>En France (IR)</th>
              <th>En Espagne (Beckham)</th>
              <th>Différence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Impôt sur le revenu</td>
              <td>~52 500 € (35 %)</td>
              <td>36 000 € (24 %)</td>
              <td><strong>-16 500 €</strong></td>
            </tr>
            <tr>
              <td>Charges sociales</td>
              <td>~12 000 €</td>
              <td>~10 500 €</td>
              <td>-1 500 €</td>
            </tr>
            <tr>
              <td><strong>Total fiscal</strong></td>
              <td><strong>~64 500 €</strong></td>
              <td><strong>~46 500 €</strong></td>
              <td><strong>-18 000 €/an</strong></td>
            </tr>
            <tr>
              <td><strong>Sur 6 ans</strong></td>
              <td></td>
              <td></td>
              <td><strong>-108 000 €</strong></td>
            </tr>
          </tbody>
        </ProseTable>

        <h3>Profil 2 : Entrepreneur startup (Digital Nomad Visa)</h3>
        <p>
          Marc, 35 ans, fondateur d&apos;une SaaS B2B, télétravailleur installé à Valence. Revenus :
          80 000 €/an (salaire + dividendes).
        </p>
        <ProseTable>
          <thead>
            <tr>
              <th>Poste</th>
              <th>France (micro + IR)</th>
              <th>Espagne (Beckham)</th>
              <th>Différence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Impôt sur le revenu</td>
              <td>~22 000 €</td>
              <td>19 200 € (24 %)</td>
              <td>-2 800 €</td>
            </tr>
            <tr>
              <td>Dividendes source FR</td>
              <td>30 % flat tax</td>
              <td>Non imposés en ES</td>
              <td><strong>Variable</strong></td>
            </tr>
            <tr>
              <td><strong>Économie annuelle</strong></td>
              <td></td>
              <td></td>
              <td><strong>-5 000 à 10 000 €</strong></td>
            </tr>
          </tbody>
        </ProseTable>

        <h3>Profil 3 : CEO scale-up avec stock-options</h3>
        <p>Karim, 38 ans, CEO d&apos;une HealthTech, réinstallé à Madrid. Salaire : 250 000 € + stock-options.</p>
        <ProseTable>
          <thead>
            <tr>
              <th>Poste</th>
              <th>France (IR + flat tax PE)</th>
              <th>Espagne (Beckham)</th>
              <th>Différence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IR sur salaire</td>
              <td>~110 000 € (45 %)</td>
              <td>60 000 € (24 %)</td>
              <td><strong>-50 000 €</strong></td>
            </tr>
            <tr>
              <td>Plus-value stock-options</td>
              <td>30 % flat tax</td>
              <td>24 % Beckham</td>
              <td>-6 %</td>
            </tr>
            <tr>
              <td><strong>Sur 6 ans</strong></td>
              <td></td>
              <td></td>
              <td><strong>&gt; 300 000 €</strong></td>
            </tr>
          </tbody>
        </ProseTable>
        <Callout type="warning" title="Important">
          Ces calculs sont indicatifs et dépendent de votre situation familiale, de votre Communauté
          Autonome, et de vos sources de revenus. Une simulation personnalisée est indispensable.{" "}
          <a href="/contact" className="underline">
            Contactez nos experts fiscalité
          </a>
          .
        </Callout>

        {/* ── H2 : PROFILS ÉLIGIBLES ────────────────────────────────────── */}
        <h2 id="profils-eligibles">Qui peut bénéficier de la Loi Beckham ? Les 4 profils éligibles</h2>
        <ProseTable>
          <thead>
            <tr>
              <th>Profil</th>
              <th>Conditions spécifiques</th>
              <th>Exemple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Salarié en mutation</strong></td>
              <td>Contrat de travail espagnol + pas de résidence ES depuis 5 ans</td>
              <td>Cadre muté d'une filiale française à Barcelone</td>
            </tr>
            <tr>
              <td><strong>Administrateur / Dirigeant</strong></td>
              <td>Statut d'administrateur dans une société espagnole + pas de résidence ES depuis 5 ans</td>
              <td>CEO nommé dans une startup espagnole</td>
            </tr>
            <tr>
              <td><strong>Digital Nomad</strong></td>
              <td>Visa nomade numérique + travail à distance pour employeur non-espagnol</td>
              <td>Développeur télétravaillant pour une boîte française depuis Malaga</td>
            </tr>
            <tr>
              <td><strong>Entrepreneur installé</strong></td>
              <td>Création d'activité économique en Espagne + pas de résidence ES depuis 5 ans</td>
              <td>Fondateur qui lance sa startup à Madrid</td>
            </tr>
          </tbody>
        </ProseTable>
        <p>
          <strong>Conditions communes à tous les profils :</strong>
        </p>
        <ol>
          <li>
            Ne pas avoir été résident fiscal en Espagne au cours des{" "}
            <strong>5 années fiscales précédentes</strong> (10 ans avant la réforme de 2023)
          </li>
          <li>
            Le déplacement doit être justifié par un motif professionnel (emploi, administration,
            entreprise)
          </li>
          <li>
            Ne pas percevoir de revenus via une société située dans un paradis fiscal (liste UE
            actualisée)
          </li>
          <li>
            La demande doit être déposée dans un délai de{" "}
            <strong>6 mois</strong> à compter de l&apos;inscription à la Sécurité Sociale espagnole
          </li>
        </ol>

        {/* ── H2 : CONDITIONS 2026 ──────────────────────────────────────── */}
        <h2 id="conditions-2026">Les conditions d&apos;éligibilité en 2026</h2>
        <p>
          Pour bénéficier de la Loi Beckham, vous devez remplir toutes ces conditions simultanément :
        </p>
        <ul>
          <li>
            <strong>Absence préalable de 5 ans :</strong> ne pas avoir été résident fiscal en
            Espagne au cours des 5 dernières années fiscales (décompte depuis l&apos;année précédant
            votre arrivée)
          </li>
          <li>
            <strong>Motif professionnel :</strong> votre déménagement en Espagne doit être justifié
            par un contrat de travail, un mandat d&apos;administrateur, une création d&apos;entreprise,
            ou un Digital Nomad Visa
          </li>
          <li>
            <strong>Résidence fiscale en Espagne :</strong> vous devez passer plus de 183 jours par
            an en Espagne
          </li>
          <li>
            <strong>Source de revenus hors paradis fiscaux :</strong> vos revenus ne doivent pas
            provenir d&apos;une société dans un pays listé par l&apos;UE comme non-coopératif
          </li>
          <li>
            <strong>Demande dans les 6 mois :</strong> le formulaire Modèle 149 doit être déposé
            dans les 6 mois suivant votre inscription à la Sécurité Sociale
          </li>
        </ul>

        {/* ── H2 : RÉFORMES 2026 ────────────────────────────────────────── */}
        <h2 id="reformes-2026">Ce qui change en 2026 — Les réformes récentes</h2>
        <p>
          <strong>Réforme 1 : Réduction du délai d&apos;absence de 10 à 5 ans (2023)</strong>
          <br />
          La loi sur les startups a réduit le délai d&apos;absence préalable de 10 à 5 ans. Plus
          d&apos;expatriés sont désormais éligibles — en particulier ceux ayant déjà séjourné en
          Espagne il y a moins de 10 ans.
        </p>
        <p>
          <strong>Réforme 2 : Extension aux Digital Nomads (2023)</strong>
          <br />
          Les télétravailleurs internationaux disposant du Digital Nomad Visa sont désormais
          éligibles au régime Beckham, sous réserve de travailler à distance pour un employeur
          étranger.
        </p>
        <p>
          <strong>Réforme 3 : Administrateurs de société (2023)</strong>
          <br />
          Les administrateurs de sociétés espagnoles peuvent désormais bénéficier du régime, même
          avec une participation au capital — la condition de détention inférieure à 25 % a été
          assouplie.
        </p>
        <p>
          <strong>Réforme 4 : Plafonnement à 600 000 € (inchangé)</strong>
          <br />
          Le seuil de 600 000 € pour le taux de 24 % est maintenu en 2026. Au-delà, le barème
          progressif s&apos;applique.
        </p>

        {/* ── H2 : GUIDE ÉTAPE PAR ÉTAPE ───────────────────────────────── */}
        <h2 id="comment-postuler">Comment faire votre demande Beckham : guide étape par étape</h2>
        <ol>
          <li>
            <strong>Étape 1 : Vérifiez votre éligibilité (avant le départ)</strong>
            <br />
            Confirmez que vous n&apos;avez pas été résident fiscal en Espagne les 5 dernières années.
            En cas de doute, consultez un fiscaliste ou{" "}
            <a href="/contact">demandez un diagnostic gratuit</a>.
          </li>
          <li>
            <strong>Étape 2 : Obtenez votre NIE (Número de Identificación de Extranjero)</strong>
            <br />
            Le NIE est indispensable pour toute démarche fiscale en Espagne. Déposez votre demande
            auprès du consulat espagnol en France ou directement en Espagne.
          </li>
          <li>
            <strong>Étape 3 : Inscrivez-vous à la Sécurité Sociale espagnole</strong>
            <br />
            Votre employeur (ou vous-même en tant qu&apos;auto-entrepreneur) doit vous inscrire à la
            Seguridad Social. Cette date d&apos;inscription est le point de départ des 6 mois pour
            postuler.
          </li>
          <li>
            <strong>Étape 4 : Remplissez le formulaire Modèle 149</strong>
            <br />
            Ce formulaire, disponible sur le site de l&apos;Agencia Tributaria, déclare votre choix
            d&apos;être imposé selon le régime des non-résidents (IRNR) via la Loi Beckham.
          </li>
          <li>
            <strong>Étape 5 : Déposez votre demande dans les 6 mois</strong>
            <br />
            Le délai est strict et non négociable. Au-delà, vous serez imposé selon le barème
            progressif classique pour toute la durée de votre séjour.
          </li>
          <li>
            <strong>Étape 6 : Attendez la validation de l&apos;Agencia Tributaria</strong>
            <br />
            Le délai de traitement est de 3 à 6 mois. Conservez l&apos;accusé de réception de
            votre dépôt.
          </li>
          <li>
            <strong>Étape 7 : Déclarez vos revenus selon le régime Beckham</strong>
            <br />
            Une fois la validation obtenue, vos revenus du travail sont imposés au taux fixe de
            24 %. Vous déposez votre déclaration annuelle via le Modèle 151.
          </li>
        </ol>
        <Callout type="info" title="Astuce">
          Commencez les démarches dès votre arrivée en Espagne. Le délai de 6 mois est impitoyable
          et non négociable. Nous recommandons de faire appel à un fiscaliste dès l'étape 1 pour
          éviter toute erreur irréversible.
        </Callout>

        {/* ── H2 : PIÈGES ET LIMITES ────────────────────────────────────── */}
        <h2 id="pieges">Les pièges et limites de la Loi Beckham</h2>
        <p>
          <strong>Piège 1 : Le délai de 6 mois est strict</strong>
          <br />
          Si vous manquez le délai de 6 mois pour déposer le Modèle 149, vous ne pourrez jamais
          bénéficier du régime pour cette période. Aucune possibilité de rattrapage.
        </p>
        <p>
          <strong>Piège 2 : Les revenus non-espagnols du travail</strong>
          <br />
          Si vous travaillez pour un employeur français tout en étant résident espagnol, ces revenus
          peuvent être imposés en France (convention fiscale France-Espagne). Le régime Beckham ne
          s&apos;applique qu&apos;aux revenus de source espagnole.
        </p>
        <p>
          <strong>Piège 3 : La Communauté Autonome</strong>
          <br />
          L&apos;IRPF est géré au niveau national, mais certaines Communautés Autonomes appliquent
          des abattements ou des majorations. Madrid est la plus favorable, la Catalogne l&apos;une
          des plus chères.
        </p>
        <p>
          <strong>Piège 4 : Les stock-options et BSPCE</strong>
          <br />
          Les plus-values sur stock-options peuvent être complexes selon leur source. Une analyse au
          cas par cas est nécessaire.
        </p>
        <p>
          <strong>Piège 5 : L&apos;exit fiscal français</strong>
          <br />
          Si vous quittez la France avec des actifs significatifs, vous pouvez être soumis à
          l&apos;exit tax française. Anticipez cette démarche avant votre départ.
        </p>
        <p>
          <strong>Piège 6 : Les conjoints</strong>
          <br />
          Le régime Beckham est individuel. Si votre conjoint travaille aussi, il doit remplir ses
          propres conditions pour en bénéficier.
        </p>

        {/* ── H2 : DIGITAL NOMADS ───────────────────────────────────────── */}
        <h2 id="digital-nomads">Loi Beckham et digital nomads : le combo parfait ?</h2>
        <p>
          Depuis la loi sur les startups de 2023, les télétravailleurs internationaux disposant du{" "}
          <strong>Digital Nomad Visa</strong> peuvent bénéficier du régime Beckham. Cette combinaison
          en fait l&apos;un des dispositifs fiscaux les plus attractifs au monde pour les travailleurs
          à distance.
        </p>
        <p>
          <strong>Conditions pour les digital nomads :</strong>
        </p>
        <ul>
          <li>Visa Digital Nomad valide</li>
          <li>
            Travail à distance pour un employeur étranger (ou clients étrangers à 80 % minimum)
          </li>
          <li>Pas de résidence fiscale en Espagne depuis 5 ans</li>
          <li>Déclaration comme non-résident via le Modèle 149</li>
        </ul>
        <p>
          <strong>Pourquoi c&apos;est attractif :</strong>
        </p>
        <ul>
          <li>Taux fixe de 24 % sur les revenus du travail</li>
          <li>Pas d&apos;imposition sur les revenus du capital étrangers</li>
          <li>Qualité de vie espagnole (climat, coût de la vie, culture)</li>
          <li>Accès à l&apos;assurance maladie espagnole via la Seguridad Social</li>
        </ul>

        {/* ── H2 : COMPARATIF FRANCE-ESPAGNE ───────────────────────────── */}
        <h2 id="comparatif-france">Comparatif : Loi Beckham vs résidence fiscale en France</h2>
        <ProseTable>
          <thead>
            <tr>
              <th>Critère</th>
              <th>France (résident fiscal)</th>
              <th>Espagne (Loi Beckham)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Taux max IR</td>
              <td>45 % (+ 4 % CEHR)</td>
              <td>24 % (jusqu'à 600K€)</td>
            </tr>
            <tr>
              <td>Flat tax PFU</td>
              <td>30 % (dividendes, plus-values)</td>
              <td>24 % Beckham / exonération revenus étrangers</td>
            </tr>
            <tr>
              <td>Exit tax</td>
              <td>Oui (si &gt; 800K€ d'actifs)</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td>IFI / Impôt Patrimoine</td>
              <td>Oui (si &gt; 1 300K€ d'immobilier)</td>
              <td>Non (sauf biens en Espagne)</td>
            </tr>
            <tr>
              <td>Déclaration biens étrangers</td>
              <td>N/A</td>
              <td>Non requis (Modèle 720 exonéré)</td>
            </tr>
            <tr>
              <td>Durée avantage</td>
              <td>Illimitée</td>
              <td>6 ans</td>
            </tr>
            <tr>
              <td>Couverture santé</td>
              <td>Sécurité Sociale française</td>
              <td>Seguridad Social espagnole</td>
            </tr>
          </tbody>
        </ProseTable>
        <p>
          Ce tableau confirme que le régime Beckham est significativement plus avantageux pour les
          hauts revenus (&gt; 100 000 €/an) sur une période de 6 ans. Au-delà, l&apos;avantage
          fiscal disparaît et la résidence fiscale espagnole classique s&apos;applique.
        </p>

        {/* ── H2 : FAQ ─────────────────────────────────────────────────── */}
        <h2 id="faq">Questions fréquentes sur la Loi Beckham</h2>
        {faqItems.map((item, i) => (
          <details key={i} className="border-b border-border py-4">
            <summary className="font-semibold cursor-pointer text-foreground hover:text-iter-violet transition-colors">
              {item.question}
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed">{item.answer}</p>
          </details>
        ))}

        {/* ── SECTION "POUR ALLER PLUS LOIN" ───────────────────────────── */}
        <h2>Pour aller plus loin</h2>
        <ul>
          <li>
            <a href="/ressources/blog/regimes-fiscaux-france-vs-espagne">
              Régimes fiscaux France vs Espagne — Guide complet 2026
            </a>
          </li>
          <li>
            <a href="/ressources/fiscalite/double-imposition-france-espagne">
              Double imposition France-Espagne
            </a>
          </li>
          <li>
            <a href="/ressources/fiscalite/impot-revenu-espagne">
              Impôt sur le revenu en Espagne (IRPF)
            </a>
          </li>
          <li>
            <a href="/services/ley-beckham">
              Notre service d&apos;accompagnement Loi Beckham
            </a>
          </li>
          <li>
            <a href="/contact">Demander un diagnostic fiscal offert (30 min)</a>
          </li>
        </ul>
      </BlogPostPageRefonte>
    </>
  );
}
