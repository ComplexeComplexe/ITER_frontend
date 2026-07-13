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
    images: [{ url: "/images/og-default.webp", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "DAF externalisé ou DAF salarié : quelle est la différence de coût ?",
    answer:
      "Un DAF salarié senior coûte 100 000 à 213 000 € chargés par an (fourchette selon la région et la taille de l'entreprise, charges patronales incluses à ~45 %). Un DAF externalisé coûte 24 000 à 96 000 € HT/an selon la formule (2 à 8 jours par mois à 2 000-8 000 €/mois). Économie moyenne : 60 à 75 % pour un périmètre équivalent. À noter : le DAF externalisé est facturé en prestation de services, sans charges sociales et déductible du résultat.",
  },
  {
    question: "DAF externalisé ou expert-comptable : quelle est la vraie différence ?",
    answer:
      "L'expert-comptable et le DAF externalisé sont complémentaires — pas concurrents. L'expert-comptable certifie la conformité légale et fiscale (bilan annuel, liasse fiscale, déclarations TVA, paie). Le DAF externalisé pilote la performance financière au quotidien : prévisionnel de trésorerie, reporting de gestion, préparation de levée de fonds, négociation bancaire. L'un boucle la photo annuelle, l'autre filme le trimestre en cours et projette les 12 prochains mois. Une PME structurée a typiquement les deux.",
  },
  {
    question: "DAF externalisé ou contrôleur de gestion : lequel choisir ?",
    answer:
      "Un contrôleur de gestion pilote les tableaux de bord opérationnels (marges par produit, KPIs commerciaux, budgets) mais n'a pas la vision stratégique du DAF. Un DAF externalisé englobe le contrôle de gestion PLUS la trésorerie, le reporting board, les relations investisseurs et la stratégie financière. Pour une PME de moins de 50 salariés, un DAF externalisé couvre tout. Au-delà de 50 salariés, un contrôleur de gestion interne épaule le DAF externalisé sur l'opérationnel.",
  },
  {
    question: "DAF externalisé et fractional CFO : est-ce la même chose ?",
    answer:
      "Oui, ce sont les deux faces d'une même pièce. « DAF externalisé » est le terme français historique, « fractional CFO » (ou « part-time CFO ») est la terminologie anglo-saxonne plébiscitée par les startups VC-backed. Le format est identique : un directeur financier senior qui partage son temps entre plusieurs entreprises. Chez Iter Advisors nous couvrons les deux appellations avec le même profil : voir aussi notre offre Fractional CFO pour Startups.",
  },
  {
    question: "Quand faut-il basculer d'un DAF externalisé vers un DAF salarié ?",
    answer:
      "Le déclencheur classique est atteindre 50-80 salariés OU 10-15 M€ de chiffre d'affaires OU une complexité qui nécessite une présence quotidienne (multi-entités, groupes internationaux, opérations M&A régulières). Chez Iter Advisors, nous préparons souvent nos clients à cette transition : nous rédigeons la fiche de poste, participons aux entretiens et assurons la passation avec le DAF recruté. Cette continuité évite les 3-6 mois classiques d'absence de pilotage financier lors d'un recrutement direct.",
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
  author: {
    "@type": "Person",
    name: "Sébastien Doat",
    jobTitle: "Associé fondateur — DAF externalisé & CFO",
    url: "https://www.iteradvisors.com/a-propos",
  },
  datePublished: "2026-07-13",
  dateModified: "2026-07-13",
  mainEntityOfPage: PAGE_URL,
  publisher: {
    "@type": "Organization",
    "@id": "https://www.iteradvisors.com/#organization",
    name: "Iter Advisors",
  },
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
        dateModified="2026-07-13"
        toc={[
          { id: "vs-salarie", label: "1. DAF externalisé vs DAF salarié" },
          { id: "vs-expert-comptable", label: "2. DAF externalisé vs expert-comptable" },
          { id: "vs-controleur", label: "3. DAF externalisé vs contrôleur de gestion" },
          { id: "vs-fractional-cfo", label: "4. DAF externalisé vs fractional CFO" },
          { id: "matrice", label: "5. Matrice de décision : quelle solution pour votre stade" },
          { id: "faq", label: "6. FAQ" },
        ]}
        tldr="Le DAF externalisé n'a pas UN concurrent mais 4 alternatives distinctes selon votre besoin. Vs DAF salarié : 60-75 % moins cher, mais moins présent. Vs expert-comptable : complémentaire, pas concurrent (pilotage vs conformité). Vs contrôleur de gestion : le DAF englobe et dépasse le rôle. Vs fractional CFO : même chose, terminologie différente (FR vs anglo-saxonne). Matrice de décision en fin d'article."
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
            url: "/ressources/blog/cout-externalisation-comptable-2026",
            category: "Tarifs",
            title: "Coût de l'externalisation comptable en 2026",
          },
        ]}
      >
        <h2 id="vs-salarie">1. DAF externalisé vs DAF salarié</h2>
        <p>
          C&apos;est la comparaison la plus fréquente. Le débat n&apos;est plus « faut-il un DAF ? »
          (la réponse est oui dès 20-30 salariés ou 3 M€ de CA) mais <strong>« quel format ? »</strong>.
          Le recrutement d&apos;un DAF salarié senior coûte cher, prend 3 à 6 mois et engage
          l&apos;entreprise sur du long terme. L&apos;externalisation offre un point d&apos;entrée
          progressif.
        </p>
        <ProseTable>
          <thead>
            <tr>
              <th>Critère</th>
              <th>DAF salarié senior</th>
              <th>DAF externalisé (Iter Advisors)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Coût annuel</td>
              <td>100 000 - 213 000 € chargés</td>
              <td>24 000 - 96 000 € HT (2 à 8 j/mois)</td>
            </tr>
            <tr>
              <td>Délai de mise en poste</td>
              <td>3 à 6 mois (recrutement + préavis)</td>
              <td>48 h à 2 semaines</td>
            </tr>
            <tr>
              <td>Présence</td>
              <td>Temps plein sur site</td>
              <td>2 à 8 jours/mois, hybride</td>
            </tr>
            <tr>
              <td>Expérience typique</td>
              <td>Souvent 1 secteur, 3-5 employeurs</td>
              <td>Multi-sectorielle, 20-50 missions</td>
            </tr>
            <tr>
              <td>Charges sociales</td>
              <td>+45 % du brut</td>
              <td>Aucune (prestation de services)</td>
            </tr>
            <tr>
              <td>Engagement</td>
              <td>CDI, préavis 3 mois</td>
              <td>Préavis 30 jours</td>
            </tr>
            <tr>
              <td>Vision stratégique</td>
              <td>Approfondie sur votre business</td>
              <td>Cross-fertilisation multi-clients</td>
            </tr>
          </tbody>
        </ProseTable>
        <p>
          <strong>Verdict.</strong> Le DAF externalisé bat le DAF salarié sur 5 des 7 critères pour
          une PME de moins de 50 salariés. Au-delà, le DAF salarié devient pertinent — souvent en
          continuant avec le DAF externalisé en rôle d&apos;advisor board. Pour une analyse
          détaillée cas par cas, voir notre article dédié :{" "}
          <a href="/ressources/blog/daf-externalise-vs-daf-salarie">
            DAF externalisé vs DAF salarié : le comparatif détaillé
          </a>.
        </p>

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
            <tr>
              <td>Coût annuel (profil senior)</td>
              <td>45 000 - 60 000 € chargés</td>
              <td>24 000 - 96 000 € HT</td>
            </tr>
          </tbody>
        </ProseTable>
        <p>
          <strong>Verdict.</strong> Pour une PME de moins de 50 salariés, un DAF externalisé couvre
          le périmètre du CDG et va bien au-delà. Au-delà de 50 salariés, le duo{" "}
          <strong>DAF externalisé + CDG interne</strong> est optimal : le CDG produit la data
          opérationnelle au quotidien, le DAF pilote la stratégie et le board.
        </p>

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
          <a href="/jobs/fractional-cfo-startups">Fractional CFO pour Startups</a>.
        </p>

        <h2 id="matrice">5. Matrice de décision : quelle solution pour votre stade</h2>
        <p>
          Voici la matrice que nous utilisons chez Iter Advisors pour orienter nos prospects vers
          la bonne combinaison de ressources financières :
        </p>
        <ProseTable>
          <thead>
            <tr>
              <th>Stade / Contexte</th>
              <th>Configuration recommandée</th>
              <th>Budget financier annuel typique</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TPE 1-10 salariés, mono-activité</td>
              <td>Expert-comptable seul</td>
              <td>4 000 - 10 000 € HT</td>
            </tr>
            <tr>
              <td>PME 10-30 salariés, croissance</td>
              <td>Expert-comptable + DAF externalisé Essentiel (2-3 j/mois)</td>
              <td>28 000 - 48 000 € HT</td>
            </tr>
            <tr>
              <td>Startup pré-Série A, VC-backed</td>
              <td>Expert-comptable + Fractional CFO (2-4 j/mois)</td>
              <td>32 000 - 60 000 € HT</td>
            </tr>
            <tr>
              <td>PME 30-50 salariés, structurée</td>
              <td>Expert-comptable + DAF externalisé Croissance (4-6 j/mois)</td>
              <td>52 000 - 80 000 € HT</td>
            </tr>
            <tr>
              <td>Scale-up 50-100 salariés, levée</td>
              <td>Expert-comptable + DAF externalisé Premium + Fractional CFO advisor</td>
              <td>85 000 - 130 000 € HT</td>
            </tr>
            <tr>
              <td>ETI 100+ salariés, multi-entités</td>
              <td>DAF salarié + CDG interne + DAF externalisé advisor</td>
              <td>150 000 - 250 000 €</td>
            </tr>
            <tr>
              <td>Situation d&apos;urgence (départ DAF, crise, cession)</td>
              <td>DAF de transition (temps plein 3-12 mois)</td>
              <td>18 000 - 30 000 €/mois</td>
            </tr>
          </tbody>
        </ProseTable>
        <Callout type="success" title="Note importante">
          Cette matrice est un point de départ, pas une prescription. Chaque entreprise a un
          contexte unique (secteur, capital, ambitions M&A, complexité fiscale). Chez Iter
          Advisors nous commençons toujours par un <strong>diagnostic gratuit de 30 minutes</strong>
          pour valider la configuration adaptée à votre situation.
        </Callout>

        <h2 id="faq">6. FAQ — Choisir entre les alternatives</h2>
        {FAQ_ITEMS.map((item, i) => (
          <details key={i} className="my-3 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-4">
            <summary className="cursor-pointer font-semibold text-foreground">
              {item.question}
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}

        <div className="my-10 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-6 md:p-8">
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
