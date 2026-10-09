import Link from "next/link";
import { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { Callout, ProseTable } from "@/components/blog";

// T#5 (2026-07-13) — Article hub comparatif ciblant les requêtes GSC
// "alternative recrutement daf" (pos 14,7), "daf externalisé ou salarié",
// "daf vs expert comptable". Consolide 4 comparaisons en une page :
// DAF externalisé vs DAF salarié, vs expert-comptable, vs contrôleur
// de gestion, vs fractional CFO. Cross-link avec l'article dédié
// /daf-externalise-vs-daf-salarie pour le deep-dive.

const PAGE_URL = "https://www.iteradvisors.com/ressources/blog/daf-externalise-vs-alternatives";

export const metadata: Metadata = {
  title: "DAF externalisé vs alternatives : le comparatif complet 2026 | Iter Advisors",
  description:
    "DAF externalisé vs DAF salarié, expert-comptable, contrôleur de gestion, fractional CFO : le guide comparatif complet 2026. Coûts, périmètres, quand choisir quoi.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "DAF externalisé vs alternatives : le comparatif complet 2026",
    description:
      "Le guide comparatif complet pour choisir entre DAF externalisé, salarié, expert-comptable, contrôleur de gestion et fractional CFO. Tarifs, périmètres, matrice de décision.",
    type: "article",
    url: PAGE_URL,
    images: [{ url: "/images/logos/iter-advisors-brand.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "DAF externalisé ou DAF salarié : quelle est la différence de coût ?",
    answer:
      "Établissez le coût employeur du recrutement réel : salaire, cotisations patronales, variable et avantages. Comparez-le aux honoraires de la proposition, à séniorité, périmètre et disponibilité explicités. Les fourchettes Iter ne constituent pas une étude salariale ni une garantie d’économie.",
  },
  {
    question: "DAF externalisé ou expert-comptable : quelle est la vraie différence ?",
    answer:
      "L'expert-comptable et le DAF externalisé sont complémentaires — pas concurrents. L'expert-comptable certifie la conformité légale et fiscale (bilan annuel, liasse fiscale, déclarations TVA, paie). Le DAF externalisé pilote la performance financière au quotidien : prévisionnel de trésorerie, reporting de gestion, préparation de levée de fonds, négociation bancaire. L'un boucle la photo annuelle, l'autre filme le trimestre en cours et projette les 12 prochains mois. Une PME structurée a typiquement les deux.",
  },
  {
    question: "DAF externalisé ou contrôleur de gestion : lequel choisir ?",
    answer:
      "Le contrôleur de gestion prépare budgets, tableaux de bord et analyses de marge. La direction financière peut aussi coordonner trésorerie, financement et gouvernance. La répartition dépend du travail à accomplir et de l’équipe, sans seuil universel d’effectif.",
  },
  {
    question: "DAF externalisé et fractional CFO : est-ce la même chose ?",
    answer:
      "Oui, ce sont les deux faces d'une même pièce. « DAF externalisé » est le terme français historique, « fractional CFO » (ou « part-time CFO ») est la terminologie anglo-saxonne plébiscitée par les startups VC-backed. Le format est identique : un directeur financier senior qui partage son temps entre plusieurs entreprises. Chez Iter Advisors nous couvrons les deux appellations avec le même profil : voir aussi notre offre Fractional CFO pour Startups.",
  },
  {
    question: "Quand faut-il basculer d'un DAF externalisé vers un DAF salarié ?",
    answer:
      "Un poste interne peut se justifier par un besoin quotidien durable de management et de décision financière. Évaluez la charge, la séniorité et la continuité nécessaire. Un accompagnement externe peut contribuer à la définition du poste et à la passation selon le mandat convenu.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((it) => ({
    "@type": "Question",
    name: it.question,
    acceptedAnswer: { "@type": "Answer", text: it.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  headline: "DAF externalisé vs alternatives : le comparatif complet 2026",
  description:
    "Le guide comparatif complet pour choisir entre DAF externalisé, salarié, expert-comptable, contrôleur de gestion et fractional CFO.",
  author: { "@id": "https://www.iteradvisors.com/a-propos/sebastien-doat#person" },
  datePublished: "2026-07-13",
  dateModified: "2026-10-09",
  mainEntityOfPage: PAGE_URL,
  publisher: { "@id": "https://www.iteradvisors.com/#organization" },
};

export default function DafExternaliseVsAlternativesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostPageRefonte
        locale="fr"
        breadcrumbs={{
          resourcesLabel: "Ressources",
          resourcesHref: "/ressources",
          blogLabel: "Blog",
          blogHref: "/ressources/blog",
        }}
        slug="daf-externalise-vs-alternatives"
        category="Comparaisons"
        title="DAF externalisé vs alternatives : le comparatif complet 2026"
        dek="Faut-il recruter un DAF salarié, externaliser, faire appel à un expert-comptable, un contrôleur de gestion ou un fractional CFO ? Le guide de référence pour trancher — avec matrices de décision, tarifs et scénarios concrets."
        author={{
          name: "Sébastien Doat",
          avatar: "/images/team/sebastien-doat.webp",
          jobTitle: "Associé fondateur — DAF externalisé & CFO",
          url: "/a-propos/sebastien-doat",
        }}
        readingTime={11}
        dateModified="2026-10-09"
        toc={[
          { id: "vs-salarie", label: "1. DAF externalisé vs DAF salarié" },
          { id: "vs-expert-comptable", label: "2. DAF externalisé vs expert-comptable" },
          { id: "vs-controleur", label: "3. DAF externalisé vs contrôleur de gestion" },
          { id: "vs-fractional-cfo", label: "4. DAF externalisé vs fractional CFO" },
          { id: "matrice", label: "5. Matrice de décision : quelle solution pour votre stade" },
          { id: "faq", label: "6. FAQ" },
        ]}
        tldr="Comparez les modèles selon les responsabilités, la disponibilité et le coût total à périmètre explicite. Le DAF et l’expert-comptable sont complémentaires. Aucun seuil d’effectif ni pourcentage d’économie universel ne détermine le choix."
        relatedArticles={[
          {
            url: "/ressources/blog/daf-externalise-vs-daf-salarie",
            category: "Comparaisons",
            title: "DAF externalisé vs DAF salarié : le comparatif détaillé",
          },
          {
            url: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
            category: "Tarifs",
            title: "Combien coûte un DAF externalisé en 2026 ?",
          },
          {
            url: "/ressources/blog/externalisation-comptable",
            category: "Tarifs",
            title: "Coût de l'externalisation comptable en 2026",
          },
        ]}
      >
        <h2 id="vs-salarie">1. DAF externalisé vs DAF salarié</h2>
        <p>{"Le format doit répondre au besoin réel : direction financière quotidienne, intervention régulière ou appui ponctuel. La taille de l’entreprise ne suffit pas à imposer une solution."}</p>
        <ProseTable><thead><tr><th>Critère</th><th>DAF salarié</th><th>DAF externalisé</th></tr></thead><tbody>
          <tr><td>{"Budget à comparer"}</td><td>{"Coût employeur du recrutement envisagé"}</td><td>{"Fourchettes et devis selon le périmètre"}</td></tr>
          <tr><td>{"Disponibilité"}</td><td>{"Selon le contrat et l’organisation"}</td><td>{"Rythme et échanges convenus dans la proposition"}</td></tr>
          <tr><td>{"Expérience"}</td><td>{"Parcours du candidat à vérifier"}</td><td>{"Parcours du professionnel affecté à vérifier"}</td></tr>
        </tbody></ProseTable>
        <p><Link href="/ressources/blog/daf-externalise-vs-daf-salarie">DAF externalisé vs DAF salarié : le comparatif détaillé</Link></p>

        <h2 id="vs-expert-comptable">2. DAF externalisé vs expert-comptable</h2>
        <p>
          <strong>La confusion la plus fréquente.</strong> Beaucoup de dirigeants pensent que leur
          expert-comptable fait « tout le financier ». C&apos;est faux — l&apos;expert-comptable et
          le DAF externalisé ont des rôles complémentaires, pas concurrents.
        </p>
        <ProseTable>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Expert-comptable</th>
              <th>DAF externalisé</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rôle principal</td>
              <td>Conformité légale et fiscale</td>
              <td>Pilotage stratégique et financier</td>
            </tr>
            <tr>
              <td>Livrables clés</td>
              <td>Bilan annuel, liasse fiscale, TVA, paie</td>
              <td>Prévisionnel de tréso, reporting gestion, business plan</td>
            </tr>
            <tr>
              <td>Horizon</td>
              <td>Passé (photo annuelle)</td>
              <td>Présent + 12 mois à venir</td>
            </tr>
            <tr>
              <td>Fréquence</td>
              <td>Mensuelle (paie) + annuelle (bilan)</td>
              <td>2 à 8 jours/mois en présentiel</td>
            </tr>
            <tr>
              <td>Coût annuel typique (PME 20 sal.)</td>
              <td>8 000 - 15 000 € HT</td>
              <td>24 000 - 48 000 € HT</td>
            </tr>
            <tr>
              <td>Contribution aux décisions</td>
              <td>Régularité, alerte conformité</td>
              <td>Choix d&apos;investissement, levée, pricing</td>
            </tr>
          </tbody>
        </ProseTable>
        <Callout type="info" title="Bon à savoir">
          Une PME structurée a typiquement <strong>les deux</strong>. L&apos;expert-comptable
          produit le grand livre, le DAF externalisé en tire un tableau de bord de pilotage pour
          votre CODIR. Ils se parlent régulièrement — chez Iter Advisors nous animons souvent le
          trio dirigeant / DAF externalisé / expert-comptable en réunion trimestrielle.
        </Callout>

        <h2 id="vs-controleur">3. DAF externalisé vs contrôleur de gestion</h2>
        <p>
          Le contrôleur de gestion (CDG) est un profil junior à middle-senior, spécialisé dans
          le <strong>reporting opérationnel</strong> : construction de tableaux de bord, analyse
          de marges par produit ou par ligne, suivi budgétaire par unité, indicateurs KPIs
          commerciaux et industriels. Il ne pilote ni la trésorerie, ni les relations bancaires,
          ni la stratégie financière.
        </p>
        <ProseTable>
          <thead>
            <tr>
              <th>Périmètre</th>
              <th>Contrôleur de gestion</th>
              <th>DAF externalisé</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tableaux de bord opérationnels</td>
              <td>✅ Cœur du poste</td>
              <td>✅ Supervise / valide</td>
            </tr>
            <tr>
              <td>Analyse de marges, coûts</td>
              <td>✅ Cœur du poste</td>
              <td>✅ Supervise / valide</td>
            </tr>
            <tr>
              <td>Prévisionnel de trésorerie</td>
              <td>Partiellement</td>
              <td>✅ Cœur du poste</td>
            </tr>
            <tr>
              <td>Relations bancaires</td>
              <td>❌</td>
              <td>✅ Négociation direct</td>
            </tr>
            <tr>
              <td>Préparation de levée de fonds</td>
              <td>❌</td>
              <td>✅ Data room, modèle financier</td>
            </tr>
            <tr>
              <td>Reporting au board</td>
              <td>Alimente</td>
              <td>✅ Anime</td>
            </tr>
            <tr>
              <td>Stratégie financière</td>
              <td>❌</td>
              <td>✅ Co-pilote avec dirigeant</td>
            </tr>

          </tbody>
        </ProseTable>
        <p>{"Définissez les responsabilités du contrôleur de gestion et du DAF selon la production des données, les analyses et les décisions à préparer. Les deux fonctions peuvent travailler ensemble dans une organisation de toute taille."}</p>

        <h2 id="vs-fractional-cfo">4. DAF externalisé vs fractional CFO</h2>
        <p>
          <strong>La question la plus courte.</strong> Ce sont les deux faces d&apos;une même
          réalité. « DAF externalisé » est le terme français historique (utilisé depuis les années
          2000 par les cabinets de conseil financier), « fractional CFO » (ou « part-time CFO »)
          est la terminologie anglo-saxonne plébiscitée par les startups VC-backed depuis 2015
          via l&apos;écosystème américain (Y Combinator, Sequoia, Andreessen Horowitz).
        </p>
        <ProseTable>
          <thead>
            <tr>
              <th>Aspect</th>
              <th>DAF externalisé</th>
              <th>Fractional CFO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Origine du terme</td>
              <td>France, années 2000</td>
              <td>USA, années 2010</td>
            </tr>
            <tr>
              <td>Contexte typique</td>
              <td>PME, ETI, industrie, services</td>
              <td>Startups VC-backed, SaaS, deep tech</td>
            </tr>
            <tr>
              <td>Profil</td>
              <td>Ex-CFO groupe, 15-25 ans d&apos;XP</td>
              <td>Ex-CFO scale-up, 10-20 ans d&apos;XP</td>
            </tr>
            <tr>
              <td>Format d&apos;intervention</td>
              <td>2 à 8 jours/mois</td>
              <td>2 à 8 jours/mois (identique)</td>
            </tr>
            <tr>
              <td>Focus</td>
              <td>Structuration, board, banque</td>
              <td>Runway, levée, board investisseurs</td>
            </tr>
            <tr>
              <td>Tarif indicatif</td>
              <td>2 000 - 8 000 €/mois</td>
              <td>3 000 - 10 000 €/mois (US-influenced)</td>
            </tr>
          </tbody>
        </ProseTable>
        <p>
          <strong>Iter Advisors couvre les deux appellations</strong> avec des profils qui
          maîtrisent à la fois le vocabulaire français traditionnel et anglo-saxon. Pour votre
          startup VC-backed, voir notre offre dédiée :{" "}
          <a href="/fractional-cfo-startups">Fractional CFO pour Startups</a>.
        </p>

        <h2 id="matrice">5. Matrice de décision : quelle solution pour votre stade</h2>
        <p>
          Voici la matrice que nous utilisons chez Iter Advisors pour orienter nos prospects vers
          la bonne combinaison de ressources financières :
        </p>
        <p>{"Listez les livrables manquants, les décisions à prendre chaque semaine, les personnes à encadrer et les échéances. Faites préciser pour chaque proposition le responsable, la disponibilité, la continuité, les exclusions et le budget total."}</p>
        <Callout type="success" title="Note importante">
          Cette matrice est un point de départ, pas une prescription. Chaque entreprise a un
          contexte unique (secteur, capital, ambitions M&A, complexité fiscale). Chez Iter
          Advisors nous commençons toujours par un <strong>diagnostic gratuit de 30 minutes</strong>
          pour valider la configuration adaptée à votre situation.
        </Callout>

        <h2 id="faq">6. FAQ — Choisir entre les alternatives</h2>
        {FAQ_ITEMS.map((item, i) => (
          <details key={i} className="site-card my-3 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-4">
            <summary className="cursor-pointer font-semibold text-foreground">
              {item.question}
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}

        <div className="site-card my-10 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-6 md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Encore hésitant sur la bonne configuration ?
          </h3>
          <p className="mb-5 text-slate-700">
            30 minutes avec un associé Iter Advisors pour cadrer la solution adaptée à votre
            contexte — sans engagement. Voir notre offre de{" "}
            <a
              href="/daf-externalise"
              className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
            >
              DAF externalisé
            </a>
            {" "}pour les tarifs détaillés, ou{" "}
            <a
              href="/contact"
              className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
            >
              prenez rendez-vous
            </a>
            {" "}pour un diagnostic personnalisé.
          </p>
        </div>
      </BlogPostPageRefonte>
    </>
  );
}
