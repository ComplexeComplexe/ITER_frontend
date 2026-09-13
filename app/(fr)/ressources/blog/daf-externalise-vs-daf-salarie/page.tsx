

import { Metadata } from 'next';
import Link from 'next/link';
import BlogPostPageRefonte from '@/components/pages/BlogPostPageRefonte';
import { InlineCta, ProseTable } from '@/components/blog';

import { getDafOffer } from '@/lib/content/daf-offer';
import { COUT_DAF_SALARIE } from '@/lib/content/facts';
const offer = getDafOffer('fr');

export const metadata: Metadata = {
  title: "DAF externalisé ou salarié : comparatif 2026",
  description: "DAF externalisé vs DAF salarié : comparaison chiffrée des coûts, des risques et des avantages. Quel modèle choisir selon votre stade de croissance ? Guide 2026.",
  alternates: {
    canonical: "https://www.iteradvisors.com/ressources/blog/daf-externalise-vs-daf-salarie",
    // SEO-AUD-0824 §2 — cet article a bien une version EN et une version ES,
    // qui désignaient toutes deux celle-ci comme leur traduction française.
    // La réciproque manquait : cette route a ses métadonnées écrites à la main
    // et ne passait pas par buildMetadata, qui les aurait déduites.
    languages: {
      "x-default": "https://www.iteradvisors.com/ressources/blog/daf-externalise-vs-daf-salarie",
      "fr-FR": "https://www.iteradvisors.com/ressources/blog/daf-externalise-vs-daf-salarie",
      "en-GB": "https://www.iteradvisors.com/en/ressources/blog/daf-externalise-vs-daf-salarie",
      "es-ES": "https://www.iteradvisors.com/es/recursos/blog/daf-externalise-vs-daf-salarie",
    },
  },
  openGraph: {
    title: "DAF externalisé vs DAF salarié | Iter Advisors",
    description: "Comparaison détaillée : DAF externalisé vs DAF salarié. Coûts, avantages, inconvénients et matrice de décision.",
    type: "article",
    images: [{ url: "/images/blog/daf-externalise-vs-daf-salarie.webp", width: 1200, height: 630 }],
  },
};

export default function DafExternaliseVsSalariePage() {
  return (
    <BlogPostPageRefonte
      locale="fr"
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="daf-externalise-vs-daf-salarie"
      category="DAF externalisé"
      title="DAF externalisé vs DAF salarié : quelle option choisir ?"
      dek="Comparez les deux modèles : coûts, avantages, inconvénients. Analyse détaillée pour PME et scale-ups. Matrice de décision et recommandations."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Associé fondateur — CFO & Investisseur, Iter Advisors",
      }}
      readingTime={6}
      datePublished="2026-05-01"
      dateModified="2026-09-13"
      heroImage="/images/blog/covers/daf-externalise-vs-daf-salarie.svg"
      toc={[
        { id: "contexte", label: "1. Contexte : pourquoi cette question ?" },
        { id: "cout-total", label: "2. Comparaison des coûts" },
        { id: "daf-salarie", label: "3. DAF salarié : avantages et inconvénients" },
        { id: "daf-externalise", label: "4. DAF externalisé : avantages et inconvénients" },
        { id: "comparaison-directe", label: "5. Comparaison directe (tableau)" },
        { id: "matrice-decision", label: "6. Matrice de décision" },
      ]}
      tldr="Choisissez selon la disponibilité nécessaire, les livrables et le budget total. Un DAF externalisé intervient sur un périmètre convenu ; un poste salarié répond à un besoin de présence quotidienne durable."
      relatedArticles={[
        {
          url: "/ressources/blog/organiser-sa-direction-financiere",
          category: "Organisation",
          title: "Comment organiser sa direction financière en 2026 ?",
        },
        {
          url: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
          category: "Tarifs",
          title: "Combien coûte un DAF externalisé en 2026 ? Tarifs et ROI",
        },
        {
          url: "/ressources/blog/daf-drh-externalises-synergie",
          category: "Stratégie",
          title: "DAF + DRH externalisés : la synergie qui change tout",
        },
        {
          url: "/ressources/blog/les-10-outils-pour-cfos-startup",
          category: "Tech",
          title: "Les 10 outils incontournables pour les CFOs en startup",
        },
      ]}
    >
      <h2 id="contexte">1. Choisir selon le travail à accomplir</h2>
      <p>Un DAF salarié et un DAF externalisé peuvent tous deux piloter un budget, la trésorerie et le reporting. La différence tient à leur disponibilité, à leur intégration dans l’équipe et au périmètre confié. Le nombre de salariés ou le chiffre d’affaires ne suffit pas à imposer un modèle.</p>
      <p>Listez les décisions financières prises chaque semaine, les personnes à encadrer, les échéances et les livrables manquants. Si la direction financière requiert une présence quotidienne durable, le recrutement peut être pertinent. Si le besoin peut être cadré en missions et rendez-vous réguliers, étudiez l’externalisation.</p>
      <h2 id="cout-total">2. Comparer des budgets de même périmètre</h2>
      <ProseTable>
        <thead><tr><th>Base</th><th>DAF salarié</th><th>DAF externalisé Iter</th></tr></thead>
        <tbody>
          <tr><td>Budget annuel de référence</td><td>{offer.salary} € de coût employeur chargé</td><td>{offer.annualPrice} € HT pour douze mois</td></tr>
          <tr><td>Prix mensuel</td><td>Selon le contrat de travail</td><td>{offer.price}</td></tr>
          <tr><td>Disponibilité</td><td>Présence quotidienne selon le contrat</td><td>Périmètre convenu, {offer.volume} par mois en moyenne observée</td></tr>
          <tr><td>Comptabilité et logiciels</td><td>À budgéter selon l’organisation</td><td>À budgéter selon l’organisation</td></tr>
        </tbody>
      </ProseTable>
      <p>La référence salariale est le coût employeur complet d’un profil de séniorité équivalente, avec une médiane de {COUT_DAF_SALARIE.median.toLocaleString('fr-FR')} € par an. Cette base interne de comparaison ne constitue pas un devis de recrutement. Le budget externalisé correspond aux formules Iter annualisées, hors missions ponctuelles.</p>
      <p>La comparaison ne suppose pas une disponibilité identique : une mission à temps partagé ne remplace pas automatiquement un poste à plein temps. Au bas de la référence salariale, l’écart avec une formule Premium peut être limité. Ajoutez dans les deux scénarios les mêmes besoins de comptabilité, logiciels et support, puis comparez les livrables.</p>
      <p>{offer.billing} Retrouvez les inclusions et les exclusions dans la <Link href="/daf-externalise/tarifs">grille des tarifs du DAF externalisé</Link>.</p>
      <h2 id="daf-salarie">3. Quand recruter un DAF salarié ?</h2>
      <p>Le recrutement répond à un besoin de direction financière continue : management d’une équipe importante, décisions quotidiennes, coordination opérationnelle ou gouvernance exigeant un interlocuteur permanent. Un salarié construit sa connaissance de l’entreprise dans la durée.</p>
      <p>Évaluez la charge réelle et la séniorité nécessaire. Prévoyez le recrutement, la passation et la continuité en cas d’absence. Un poste interne n’exclut pas un appui externe ponctuel pour une acquisition, un financement ou un changement d’outil.</p>
      <h2 id="daf-externalise">4. Quand choisir un DAF externalisé ?</h2>
      <p>L’externalisation est adaptée lorsque les besoins peuvent être organisés dans un périmètre explicite : reporting, prévisionnel de trésorerie, budget, préparation des décisions et échanges réguliers avec le dirigeant. La disponibilité proposée doit couvrir les échéances et les périodes de charge.</p>
      <p>Chez Iter Advisors, le démarrage récurrent est envisagé en {offer.start}, selon le profil disponible et la complexité du dossier. {offer.commitment} Les évolutions du périmètre sont convenues par avenant. L’expert-comptable conserve ses responsabilités ; le DAF utilise les comptes pour piloter l’activité.</p>
      <p>Demandez le nom du responsable de mission, des exemples de livrables et les modalités de relais. Un <Link href="/ressources/cas-clients/opti-digital-structuration-financement">cas documenté de structuration financière chez Opti Digital</Link> illustre un contexte d’intervention, sans garantir le même résultat dans votre entreprise.</p>
      <h2 id="comparaison-directe">5. Comparer l’organisation proposée</h2>
      <ProseTable>
        <thead><tr><th>Question</th><th>Point à valider dans les deux modèles</th></tr></thead>
        <tbody>
          <tr><td>Qui décide ?</td><td>Délégations, arbitrages du dirigeant et préparation des décisions</td></tr>
          <tr><td>Qui produit ?</td><td>Répartition entre comptabilité, contrôle de gestion et direction financière</td></tr>
          <tr><td>Qui répond en urgence ?</td><td>Disponibilité, canal de contact et organisation des absences</td></tr>
          <tr><td>Comment mesurer l’utilité ?</td><td>Fiabilité des données, respect des échéances et décisions rendues possibles</td></tr>
          <tr><td>Comment transmettre ?</td><td>Documentation, accès aux outils et reprise des dossiers</td></tr>
        </tbody>
      </ProseTable>
      <h2 id="matrice-decision">6. Une décision à partir de votre besoin</h2>
      <p>Exemple fictif : une PME dispose d’un comptable interne et d’un cabinet d’expertise comptable, mais aucun responsable ne tient le prévisionnel ni n’explique les écarts de marge. Une mission externalisée peut compléter cette organisation si la charge reste compatible avec les disponibilités proposées.</p>
      <p>À l’inverse, si plusieurs équipes attendent chaque jour des arbitrages financiers et un management de proximité, un poste interne peut être plus adapté. Le modèle hybride conserve une équipe opérationnelle interne et ajoute une expertise externe sur un périmètre défini.</p>
      <p>Un départ imprévu ou une réorganisation peut appeler une <Link href="/daf-externalise/transition">mission de DAF de transition</Link>. Pour une présence récurrente, comparez le fonctionnement d’un <Link href="/daf-externalise/temps-partage">DAF à temps partagé</Link> et celui du recrutement envisagé.</p>
      <InlineCta title="Cadrer votre organisation financière" body="Identifions les livrables, la disponibilité et le budget nécessaires à votre entreprise." ctaLabel="Demander un diagnostic" ctaHref="/contact" />
    </BlogPostPageRefonte>
  );
}
