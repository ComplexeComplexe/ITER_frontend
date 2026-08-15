
import { Metadata } from 'next';
import Link from 'next/link';
import BlogPostPageRefonte from '@/components/pages/BlogPostPageRefonte';
import { Callout, ProseTable } from '@/components/blog';
import MidArticleSoftCTA from '@/components/blog/MidArticleSoftCTA';

export const metadata: Metadata = {
  title: "DAF à temps partagé : tarifs et missions en 2026 | Iter Advisors",
  description: "Combien coûte un DAF à temps partagé ? Tarifs par jour et par mois, missions types, durée d'engagement. Le guide chiffré 2026.",
  alternates: {
    canonical: "https://www.iteradvisors.com/ressources/blog/daf-part-time-tarifs-missions-2026",
  },
  openGraph: {
    title: "DAF à temps partagé : tarifs et missions en 2026 | Iter Advisors",
    description: "Combien coûte un DAF à temps partagé ? Tarifs par jour et par mois, missions types, durée d'engagement. Le guide chiffré 2026.",
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function DafPartTimeTarifsMissions2026Page() {
  return (
    <BlogPostPageRefonte
      locale="fr"
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="daf-part-time-tarifs-missions-2026"
      category="DAF à temps partagé"
      title="DAF à temps partagé : combien ça coûte, ce que ça couvre"
      dek="Grille tarifaire complète du DAF à temps partagé en 2026 : tarif par jour, forfait mensuel, missions couvertes et comparatif avec le DAF salarié."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Associé fondateur — CFO & Investisseur, Iter Advisors",
        url: "/a-propos/benjamin-ziza",
      }}
      readingTime={7}
      dateModified="2026-07-24"
      heroImage="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80"
      toc={[
        { id: "definition", label: "1. Qu'est-ce qu'un DAF à temps partagé ?" },
        { id: "grille-tarifs", label: "2. Grille tarifaire 2026" },
        { id: "tableau-rythme", label: "3. Rythme × périmètre × prix" },
        { id: "missions", label: "4. Missions couvertes" },
        { id: "vs-salarie", label: "5. Comparatif vs DAF salarié" },
        { id: "qui-concerne", label: "6. À qui ça s'adresse ?" },
        { id: "faq", label: "FAQ" },
      ]}
      faqItems={[
        {
          question: "Quelle est la différence entre DAF à temps partagé et DAF externalisé ?",
          answer: "Ce sont deux termes pour le même modèle : un directeur financier qui travaille pour plusieurs entreprises simultanément, facturé au temps passé. 'À temps partagé' insiste sur la flexibilité du rythme, 'externalisé' sur le mode contractuel.",
        },
        {
          question: "Quel budget prévoir pour un DAF à temps partagé 1 jour par semaine ?",
          answer: "Pour un DAF sénior (7-10 ans d'expérience) à raison d'un jour par semaine (4-5 jours/mois), comptez entre 2 400 et 3 200 € par mois, soit 29 000 à 38 000 € par an.",
        },
        {
          question: "Le DAF à temps partagé peut-il évoluer vers un mi-temps ou un temps plein ?",
          answer: "Oui. C'est justement l'avantage du modèle : on démarre souvent à 1 jour/semaine et on augmente le rythme si les besoins évoluent (acquisition, levée de fonds, internationalisation), sans changer d'interlocuteur.",
        },
        {
          question: "Le DAF à temps partagé peut-il avoir délégation de signature bancaire ?",
          answer: "Oui. Dans de nombreuses entreprises, le DAF externalisé dispose d'une délégation de signature sur les comptes bancaires, ce qui lui permet de valider les paiements et d'agir comme un vrai directeur financier interne.",
        },
        {
          question: "Combien de temps dure généralement l'engagement avec un DAF à temps partagé ?",
          answer: "Les missions durent en moyenne 18 à 36 mois. Un minimum de 6 mois est généralement requis pour que la valeur produite dépasse le temps d'onboarding. Certaines collaborations durent 5 à 10 ans.",
        },
        {
          question: "Le DAF à temps partagé peut-il gérer une levée de fonds ?",
          answer: "Oui, c'est l'une de ses missions les plus valorisées. Il prépare la data room, valide les projections financières, pilote la due diligence et accompagne les négociations avec les investisseurs.",
        },
      ]}
      tldr="DAF à temps partagé : 2 400 à 6 400 €/mois pour 1 à 2 jours par semaine. Économie de 30 à 50 % vs DAF salarié. Idéal pour PME 2-15 M€ de CA et startups post-levée."
      relatedArticles={[
        {
          url: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
          category: "Tarifs",
          title: "Combien coûte un DAF externalisé en 2026 ?",
        },
        {
          url: "/daf-externalise/temps-partage",
          category: "Service",
          title: "Notre offre DAF à temps partagé",
        },
        {
          url: "/ressources/blog/daf-externalise-vs-daf-salarie",
          category: "Comparaison",
          title: "DAF externalisé vs DAF salarié",
        },
      ]}
    >
      <h2 id="definition">1. Qu'est-ce qu'un DAF à temps partagé ?</h2>
      <p>
        Un DAF à temps partagé — aussi appelé DAF externalisé — est un directeur financier qui intervient pour plusieurs entreprises simultanément, facturé au prorata du temps réellement passé. Vous bénéficiez d'une direction financière de plein exercice, sans supporter le coût d'un poste à temps plein.
      </p>
      <p>
        Concrètement, le DAF à temps partagé :
      </p>
      <ul>
        <li><strong>pilote</strong> la fonction finance (reporting, trésorerie, budget, clôtures) ;</li>
        <li><strong>représente</strong> la direction financière face aux banques, aux investisseurs et aux commissaires aux comptes ;</li>
        <li><strong>décide</strong> sur les sujets qui engagent l'entreprise financièrement.</li>
      </ul>

      <Callout type="info" title="DAF à temps partagé ≠ comptable">
        Le DAF à temps partagé n'est pas un comptable : il pilote, il décide, il représente votre direction financière. La comptabilité courante reste à votre expert-comptable.
      </Callout>

      <p>
        Le modèle repose sur une facturation proportionnelle : 1 jour par semaine, 2 jours par semaine, ou un rythme adapté à vos besoins du moment. Cette flexibilité est précisément ce qui le distingue d'un recrutement salarié.
      </p>

      <h2 id="grille-tarifs">2. Grille tarifaire 2026</h2>
      <p>
        Les tarifs pratiqués sur le marché français en 2026 varient selon le niveau d'expérience du DAF. Voici la grille de référence par TJM (taux journalier moyen) :
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Profil</th>
            <th>Expérience</th>
            <th>TJM</th>
            <th>Cas d'usage typique</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Junior DAF</strong></td>
            <td>3-5 ans</td>
            <td>400-500 €</td>
            <td>Startup pré-série A, reporting basique</td>
          </tr>
          <tr>
            <td><strong>Sénior DAF</strong></td>
            <td>7-10 ans</td>
            <td>600-750 €</td>
            <td>PME 2-15 M€ CA, périmètre complet</td>
          </tr>
          <tr>
            <td><strong>Expert DAF / CFO</strong></td>
            <td>12+ ans</td>
            <td>800-1 000 €</td>
            <td>Scale-up, groupe, opérations internationales</td>
          </tr>
        </tbody>
      </ProseTable>

      <p>
        Pour la grande majorité des PME et startups qui font appel à un DAF à temps partagé, le profil sénior (600-750 €/jour) constitue le bon équilibre entre expertise et coût. Le profil expert est sollicité pour des missions à forte complexité : levées significatives, opérations de M&A, reporting multi-entités.
      </p>

      <h2 id="tableau-rythme">3. Rythme × périmètre × prix</h2>
      <p>
        Le coût mensuel dépend directement du nombre de jours par semaine et du périmètre de mission confié. Voici la grille combinée :
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Rythme</th>
            <th>Périmètre couvert</th>
            <th>Fourchette mensuelle</th>
            <th>Profil type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1 jour/mois</strong></td>
            <td>Reporting basique, suivi indicateurs</td>
            <td>600-800 €/mois</td>
            <td>Très petite structure, 1er contact</td>
          </tr>
          <tr>
            <td><strong>1 jour/semaine</strong></td>
            <td>Clôture + reporting + trésorerie</td>
            <td>2 400-3 200 €/mois</td>
            <td>PME 2-5 M€ CA, startup post-amorçage</td>
          </tr>
          <tr>
            <td><strong>2 jours/semaine</strong></td>
            <td>Périmètre complet PME (budget, banques, contrôle de gestion)</td>
            <td>4 800-6 400 €/mois</td>
            <td>PME 5-15 M€ CA en croissance</td>
          </tr>
          <tr>
            <td><strong>3 jours/semaine</strong></td>
            <td>Direction financière scale-up (levée, multi-entités)</td>
            <td>7 200-9 600 €/mois</td>
            <td>Scale-up post-série A/B</td>
          </tr>
          <tr>
            <td><strong>4 jours/semaine</strong></td>
            <td>Groupe ou dimension internationale</td>
            <td>9 600-12 800 €/mois</td>
            <td>Groupe, présence multi-pays</td>
          </tr>
        </tbody>
      </ProseTable>

      <p>
        Le rythme le plus fréquent pour une PME de 5 à 15 M€ de CA est <strong>2 jours par semaine</strong>, soit un investissement de 4 800 à 6 400 € par mois — bien en deçà du coût d'un DAF salarié à temps plein.
      </p>

      {/* Soft CTA mid-article — le lecteur a vu la grille tarifaire, il est
          en phase de comparaison. On plante l'invitation à échanger avant
          d'entrer dans le détail des missions. */}
      <MidArticleSoftCTA locale="fr" />

      <h2 id="missions">4. Missions couvertes</h2>
      <p>
        Le périmètre d'un DAF à temps partagé couvre l'ensemble des attributions d'une direction financière classique, calibré au volume de jours engagés :
      </p>

      <h3>Missions récurrentes (opérationnelles)</h3>
      <ul>
        <li><strong>Clôtures mensuelles et trimestrielles</strong> : supervision de la liasse, révision des comptes, arrêtés comptables.</li>
        <li><strong>Reporting de gestion</strong> : tableau de bord P&amp;L, KPIs financiers, présentation à la direction et aux actionnaires.</li>
        <li><strong>Trésorerie</strong> : suivi des flux, plan de trésorerie glissant à 13 semaines, gestion des lignes de crédit.</li>
        <li><strong>Budget et prévisionnel</strong> : construction du budget annuel, révisions trimestrielles, analyse des écarts.</li>
        <li><strong>Relations bancaires</strong> : négociation des conditions, renouvellement des lignes, covenant reporting.</li>
        <li><strong>Contrôle de gestion</strong> : comptabilité analytique, suivi des marges par activité ou par client.</li>
      </ul>

      <h3>Missions ponctuelles (projets)</h3>
      <ul>
        <li><strong>Accompagnement levée de fonds</strong> : data room, modèle financier, due diligence investisseurs.</li>
        <li><strong>Restructuration financière</strong> : optimisation du BFR, rééchelonnement de dettes, plan de retournement.</li>
        <li><strong>Mise en place d'outils</strong> : déploiement d'un outil de reporting, d'un ERP finance, d'un outil de consolidation.</li>
        <li><strong>DRH partiel</strong> : dans certaines configurations, le DAF pilote également la masse salariale, les provisions sociales et les sujets RH à portée financière.</li>
      </ul>

      <Callout type="success" title="Délégation de signature">
        Le DAF à temps partagé peut disposer d'une délégation de signature bancaire et agir à tous égards comme un directeur financier interne, avec les mêmes responsabilités opérationnelles.
      </Callout>

      <h2 id="vs-salarie">5. Comparatif vs DAF salarié</h2>
      <p>
        La question revient systématiquement : combien économise-t-on réellement en optant pour un DAF à temps partagé plutôt qu'un DAF salarié ? Voici la comparaison pour un profil équivalent (DAF sénior, périmètre PME standard) :
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Élément de coût</th>
            <th>DAF à temps partagé (2 j/sem)</th>
            <th>DAF salarié (temps plein)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Coût mensuel</strong></td>
            <td>4 800-6 400 €</td>
            <td>7 500-10 000 € (salaire + charges)</td>
          </tr>
          <tr>
            <td><strong>Coût annuel</strong></td>
            <td>57 600-76 800 €</td>
            <td>90 000-120 000 €</td>
          </tr>
          <tr>
            <td><strong>Frais de recrutement</strong></td>
            <td>0 €</td>
            <td>5 000-15 000 € (cabinet)</td>
          </tr>
          <tr>
            <td><strong>Risque départ / remplacement</strong></td>
            <td>Nul (pris en charge)</td>
            <td>Délai 2-3 mois, coût recrutement</td>
          </tr>
          <tr>
            <td><strong>Flexibilité</strong></td>
            <td>Ajustable en 30 jours</td>
            <td>Préavis contractuel (1-3 mois)</td>
          </tr>
          <tr>
            <td><strong>Séniorité accessible</strong></td>
            <td>12-20 ans pour le même budget</td>
            <td>5-10 ans au même niveau salarial</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}><strong>Économie estimée</strong></td>
            <td colSpan={2} style={{ textAlign: 'center', fontWeight: 'bold' }}>30 à 50 % sur le coût annuel total</td>
          </tr>
        </tbody>
      </ProseTable>

      <p>
        L'économie de 30 à 60 % s'explique par deux facteurs : l'absence de charges sociales patronales et la facturation proportionnelle au temps réellement nécessaire, sans coût fixe les semaines de faible activité.
      </p>

      <Callout type="info" title="Ce que le comparatif ne montre pas">
        Le DAF salarié à temps plein est plus adapté si vous avez une équipe comptable de 3 personnes à encadrer en permanence, ou une complexité opérationnelle quotidienne très élevée. Le DAF à temps partagé couvre 80 % des besoins d'une PME de 2 à 15 M€ de CA avec 1 à 2 jours par semaine.
      </Callout>

      <h2 id="qui-concerne">6. À qui ça s'adresse ?</h2>
      <p>
        Le modèle DAF à temps partagé est particulièrement adapté aux profils suivants :
      </p>

      <h3>PME entre 2 et 15 M€ de CA</h3>
      <p>
        C'est le coeur de cible historique. À ce niveau de CA, l'entreprise a besoin d'une direction financière structurée — reporting fiable, trésorerie pilotée, relations bancaires gérées — mais pas nécessairement d'une présence quotidienne. Un rythme de 1 à 2 jours par semaine suffit dans la grande majorité des cas.
      </p>

      <h3>Startups post-premier tour de table</h3>
      <p>
        Après une levée de fonds en amorçage ou en série A, les fondateurs font face à des exigences financières nouvelles : reporting investisseurs, plan de trésorerie à 18 mois, préparation du prochain tour. Un DAF à temps partagé structure rapidement cette fonction, sans immobiliser 100 000 € dans un CDI.
      </p>

      <h3>Entreprises sans DAF à temps plein</h3>
      <p>
        Beaucoup d'entreprises atteignent 5, 8, voire 12 M€ de CA sans avoir de DAF en interne : le dirigeant ou l'expert-comptable assure l'essentiel. Le DAF à temps partagé comble ce manque sans rupture : il s'intègre à l'organisation existante, travaille avec l'expert-comptable en place, et monte en charge progressivement.
      </p>

      <p>
        Pour explorer comment notre offre se structure concrètement, consultez{' '}
        <Link href="/daf-externalise">notre service de DAF externalisé</Link> — trois formules
        disponibles dès 3 000 € HT/mois avec un DAF senior opérationnel sous deux semaines.
        Vous pouvez également découvrir en détail{' '}
        <Link href="/daf-externalise/temps-partage">notre offre DAF à temps partagé</Link>{' '}
        et les modalités d'engagement.
      </p>

      <h2 id="faq">FAQ — DAF à temps partagé : tarifs et missions</h2>

      <h3>Quelle est la différence entre DAF à temps partagé et DAF externalisé ?</h3>
      <p>
        Ce sont deux termes pour le même modèle : un directeur financier qui travaille pour plusieurs entreprises simultanément, facturé au temps passé. "À temps partagé" insiste sur la flexibilité du rythme, "externalisé" sur le mode contractuel.
      </p>

      <h3>Quel budget prévoir pour un DAF à temps partagé 1 jour par semaine ?</h3>
      <p>
        Pour un DAF sénior (7-10 ans d'expérience) à raison d'un jour par semaine (4-5 jours/mois), comptez entre 2 400 et 3 200 € par mois, soit 29 000 à 38 000 € par an.
      </p>

      <h3>Le DAF à temps partagé peut-il évoluer vers un mi-temps ou un temps plein ?</h3>
      <p>
        Oui. C'est justement l'avantage du modèle : on démarre souvent à 1 jour/semaine et on augmente le rythme si les besoins évoluent (acquisition, levée de fonds, internationalisation), sans changer d'interlocuteur.
      </p>

      <h3>Le DAF à temps partagé peut-il avoir délégation de signature bancaire ?</h3>
      <p>
        Oui. Dans de nombreuses entreprises, le DAF externalisé dispose d'une délégation de signature sur les comptes bancaires, ce qui lui permet de valider les paiements et d'agir comme un vrai directeur financier interne.
      </p>

      <h3>Combien de temps dure généralement l'engagement avec un DAF à temps partagé ?</h3>
      <p>
        Les missions durent en moyenne 18 à 36 mois. Un minimum de 6 mois est généralement requis pour que la valeur produite dépasse le temps d'onboarding. Certaines collaborations durent 5 à 10 ans.
      </p>

      <h3>Le DAF à temps partagé peut-il gérer une levée de fonds ?</h3>
      <p>
        Oui, c'est l'une de ses missions les plus valorisées. Il prépare la data room, valide les projections financières, pilote la due diligence et accompagne les négociations avec les investisseurs.
      </p>
    </BlogPostPageRefonte>
  );
}
