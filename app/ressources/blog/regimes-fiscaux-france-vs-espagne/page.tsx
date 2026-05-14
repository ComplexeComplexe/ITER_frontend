import { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { getCmsNavigation } from "@/lib/strapi";
import { Callout, StatGrid, ProseTable, InlineCTA } from "@/components/blog";

export const metadata: Metadata = {
  title: "Régimes Fiscaux | Iter Advisors",
  description:
    "Guide complet de la comparaison fiscale France-Espagne 2026. IS, TVA, cotisations, régimes spéciaux. Économisez jusqu'à 7 500 €/employé. Audit gratuit.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    images: [
      {
        url: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
        alt: "Régimes fiscaux : France vs Espagne — Comparaison complète 2026",
      },
    ],
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");

  return (
    <BlogPostPageRefonte
      locale="fr"
      cmsNavigation={cmsNavigation}
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="regimes-fiscaux-france-vs-espagne"
      category="Fiscalité internationale"
      title="Régimes fiscaux : France vs Espagne — Comparaison complète 2026"
      dek="IS, TVA, cotisations sociales, régimes spéciaux. Comment optimiser votre structure fiscale entre la France et l'Espagne."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Associé fondateur — CFO & Investisseur, Iter Advisors",
      }}
      readingTime={8}
      dateModified="2026-05-01T00:00:00Z"
      heroImage="/images/blog/regimes-fiscaux-france-vs-espagne.webp"
      toc={[
        { id: "impot-societes", label: "1. Impôt sur les sociétés (IS)" },
        { id: "tva", label: "2. TVA et numéro INTRA-communautaire" },
        { id: "cotisations", label: "3. Cotisations sociales et charges employeur" },
        { id: "regimes-speciaux", label: "4. Régimes spéciaux (micro, PVN, PAC)" },
        { id: "profil", label: "5. Quel régime pour votre profil ?" },
      ]}
      tldr={
        <>
          <p>
            <strong>France :</strong> IS 25,83% (taux réduit 15% jusqu'à 38k€), TVA
            20%, cotisations sociales élevées (~45% du salaire brut)
          </p>
          <p>
            <strong>Espagne :</strong> IS 25% (19% pour startups), TVA 21%, PVN et PAC
            pour petites structures avec cotisations réduites
          </p>
          <p>
            <strong>À retenir :</strong> La différence peut atteindre 7 500 €/employé/an.
            Consulter un expert fiscal avant changement de régime.
          </p>
        </>
      }
      relatedArticles={[
        {
          url: "/ressources/blog/impot-revenu-espagne",
          category: "Fiscalité internationale",
          title: "Impôt sur le revenu en Espagne — Guide complet 2026 (IRPF, Beckham)",
        },
        {
          url: "/ressources/blog/daf-externalise-barcelone-guide-startups-espagnoles",
          category: "DAF externalisé",
          title: "DAF externalisé à Barcelone : le guide pour les startups en Espagne",
        },
        {
          url: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
          category: "DAF externalisé",
          title: "Coût d'un DAF externalisé en 2026 : tarifs, grille de prix et ROI",
        },
        {
          url: "/ressources/blog/levee-de-fonds-guide",
          category: "Financement",
          title: "Lever des fonds : préparation fiscale, juridique et financière",
        },
      ]}
      metaDescription="Comparaison complète IS, TVA et cotisations France vs Espagne. Économies potentielles et régimes optimisés. Guide expert Iter Advisors 2026."
    >
      <h2 id="impot-societes">1. Impôt sur les sociétés (IS)</h2>

      <p>
        L'impôt sur les sociétés (IS) est l'une des principales différences entre la
        France et l'Espagne. Le taux, la base imposable et les régimes spéciaux
        varient significativement.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Critère</th>
            <th>France</th>
            <th>Espagne</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Taux standard IS</td>
            <td>25,83%</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>Taux réduit (startups/PME)</td>
            <td>15% jusqu'à 38 000 €</td>
            <td>19% (startups 1ère année)</td>
          </tr>
          <tr>
            <td>Imposition des plus-values</td>
            <td>IS + CSG</td>
            <td>IS seul</td>
          </tr>
          <tr>
            <td>Déduction des intérêts</td>
            <td>Limitée (EBITDA × 30%)</td>
            <td>Limitée (25% EBE)</td>
          </tr>
          <tr>
            <td>Reportable des déficits</td>
            <td>Illimité</td>
            <td>18 ans maximum</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="info" title="Point clé">
        <strong>France :</strong> Le taux baisse à 25% en 2026 pour les PME. L'abattement
        de 15% sur les 38 000 premiers euros de bénéfice diminue progressivement
        jusqu'à disparition en 2028.
      </Callout>

      <p>
        En France, le taux IS est progressivement ramené de 26,5% (2020) à 25% (2026)
        pour aligner avec les standards européens. Cependant, le calcul de l'IS français
        inclut une contribution sociale de 3,3%, portant le taux effectif à 25,83%.
      </p>

      <p>
        En Espagne, le taux IS de 25% s'applique uniformément. Les startups
        bénéficient d'un taux réduit de 19% l'année de création et l'année suivante.
        Les petites PME (chiffre d'affaires &lt; 600 000 €) peuvent opter pour le
        régime spécial du Impuesto sobre la Renta de las Personas Físicas (PVN).
      </p>

      <h2 id="tva">2. TVA et numéro INTRA-communautaire</h2>

      <p>
        La TVA est une taxe indirecte prélevée sur la valeur ajoutée à chaque stade de
        la production et distribution. Les taux varient entre la France et l'Espagne,
        avec implications majeures pour les entreprises B2B et B2C.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Type de TVA</th>
            <th>France</th>
            <th>Espagne</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Taux normal</td>
            <td>20%</td>
            <td>21%</td>
          </tr>
          <tr>
            <td>Taux réduit</td>
            <td>5,5% (alimentation, livres)</td>
            <td>10% (alimentation, livres)</td>
          </tr>
          <tr>
            <td>Taux super-réduit</td>
            <td>2,1% (presse, médicaments)</td>
            <td>4% (alimentation de base)</td>
          </tr>
          <tr>
            <td>Seuil d'assujettissement</td>
            <td>34 400 € CA</td>
            <td>Aucun (assujettissement obligatoire)</td>
          </tr>
          <tr>
            <td>Déduction TVA intracommunautaire</td>
            <td>Oui</td>
            <td>Oui</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="warning" title="Attention importants">
        En Espagne, l'assujettissement à la TVA est obligatoire dès le premier euro de
        chiffre d'affaires, contrairement à la France où un seuil de 34 400 € annuels
        s'applique. Cela affecte les petites structures.
      </Callout>

      <p>
        Les entreprises intra-communautaires doivent obtenir un numéro de TVA dans
        chaque pays où elles opèrent. En France : numéro de TVA intracommunautaire
        (format FR + 2 chiffres + 9 chiffres). En Espagne : NIF (format ES + lettre +
        8 chiffres).
      </p>

      <h2 id="cotisations">3. Cotisations sociales et charges employeur</h2>

      <p>
        Les cotisations sociales représentent la plus grande charge financière pour les
        entreprises. Elles couvrent la sécurité sociale, l'assurance-maladie, les
        retraites et autres prestations sociales.
      </p>

      <StatGrid
        items={[
          {
            label: "Charge patronale France",
            value: "~45%",
            sublabel: "du salaire brut (sécurité sociale, retraite, chômage)",
          },
          {
            label: "Charge patronale Espagne",
            value: "~30%",
            sublabel: "du salaire brut (CEPSS + cotisation chômage)",
          },
          {
            label: "Différence annuelle",
            value: "€7,500",
            sublabel: "par employé au SMIC (écart cumulé)",
          },
        ]}
        columns={3}
      />

      <ProseTable>
        <thead>
          <tr>
            <th>Cotisation</th>
            <th>France (%)</th>
            <th>Espagne (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sécurité sociale</td>
            <td>8,55%</td>
            <td>6,35%</td>
          </tr>
          <tr>
            <td>Retraite complémentaire</td>
            <td>3,60%</td>
            <td>Incluse</td>
          </tr>
          <tr>
            <td>Assurance-chômage</td>
            <td>4,05%</td>
            <td>5,50%</td>
          </tr>
          <tr>
            <td>Autres (mutuelle, AT/MP)</td>
            <td>~20%</td>
            <td>~18%</td>
          </tr>
          <tr>
            <td>Total estimé</td>
            <td>42-45%</td>
            <td>28-32%</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="success" title="Avantage Espagne">
        L'Espagne offre une charge sociale nettement inférieure, ce qui explique
        l'attrait croissant pour les structures binationales France-Espagne avec équipes
        en Espagne.
      </Callout>

      <h2 id="regimes-speciaux">4. Régimes spéciaux (micro, PVN, PAC)</h2>

      <p>
        Au-delà des régimes standard, la France et l'Espagne offrent des régimes
        simplifiés pour les petites structures, indépendants et auto-entrepreneurs.
      </p>

      <h3>France : Micro-entreprises</h3>

      <p>
        Le régime microentreprise (ex-auto-entrepreneur) s'applique aux CA annuels
        jusqu'à :
      </p>

      <ul>
        <li>176 200 € pour activités commerciales</li>
        <li>72 500 € pour prestations de services/professions libérales</li>
      </ul>

      <p>
        Avantages : comptabilité simplifiée, cotisations sociales réduites (~20-24% du
        CA), aucun IS. Inconvénient : pas de déduction des charges.
      </p>

      <h3>Espagne : PVN (Pequeño Volumen de Negocios) & PAC</h3>

      <p>
        <strong>PVN (Régime de Petit Volume d'Affaires) :</strong> Disponible pour CA &lt;
        €600,000. Permet régime TVA simplifié (trimestral au lieu de mensuellement).
      </p>

      <p>
        <strong>PAC (Régime d'Activités Économiques) :</strong> Pour travailleurs
        indépendants avec cotisations sociales réduites les 2 premières années (réduction
        de 80%).
      </p>

      <Callout type="info">
        En Espagne, les indépendants doivent cotiser à la Sécurité Sociale même avec
        revenu zéro (minimum €324/mois en 2026), ce qui crée une charge fixe.
      </Callout>

      <h2 id="profil">5. Quel régime pour votre profil ?</h2>

      <p>
        Le choix du régime fiscal dépend de votre structure, profitabilité, chiffre
        d'affaires et stratégie de croissance. Voici les cas types :
      </p>

      <h3>Cas 1 : Startup technologique (0-€500k CA)</h3>

      <p>
        <strong>Recommandation :</strong> Espagne (IS 19%) ou France (IS 15% + taux
        réduit).
      </p>

      <ul>
        <li>Taux réduit IS dans les deux pays</li>
        <li>Charge sociale moins élevée en Espagne</li>
        <li>France offre plus d'aides aux jeunes entreprises</li>
      </ul>

      <h3>Cas 2 : PME en croissance (€500k-€2M CA)</h3>

      <p>
        <strong>Recommandation :</strong> Optimisation binationale (France + Espagne).
      </p>

      <ul>
        <li>France : siège social + R&D (crédit impôt recherche)</li>
        <li>Espagne : opérations, support (charges sociales réduites)</li>
        <li>Potentiel d'économies : 10-15% de la masse salariale</li>
      </ul>

      <h3>Cas 3 : Holding ou groupe multinational</h3>

      <p>
        <strong>Recommandation :</strong> Structure avec entités dédiées.
      </p>

      <ul>
        <li>Optimisation du transfer pricing</li>
        <li>Exploitation des crédits d'impôt locaux</li>
        <li>Gestion centralisée de la trésorerie</li>
      </ul>

      <InlineCTA
        title="Besoin d'une optimisation fiscale sur mesure ?"
        body="Notre équipe d'experts analyse votre situation et identifie les gains potentiels. Audit 100% gratuit, sans engagement."
        ctaLabel="Demander un audit fiscal"
        ctaHref="/contact"
      />

      <h3>Fiche décisionnelle rapide</h3>

      <ProseTable>
        <thead>
          <tr>
            <th>Scénario</th>
            <th>Meilleur choix</th>
            <th>Économies potentielles</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Indépendant (0-€100k)</td>
            <td>Micro FR ou PVN ES</td>
            <td>€500-1500/an</td>
          </tr>
          <tr>
            <td>PME croissance (€500k-€2M)</td>
            <td>Holding binationale</td>
            <td>€10k-20k/an</td>
          </tr>
          <tr>
            <td>Startup (première année)</td>
            <td>ES (IS 19%) ou FR (IS 15%)</td>
            <td>€5k-10k sur IS</td>
          </tr>
          <tr>
            <td>Équipe importante (50+ salariés)</td>
            <td>Split FR-ES</td>
            <td>€7500/employé/an</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="warning" title="Mise en garde">
        L'optimisation fiscale comporte des risques légaux. Respectez la substance
        économique réelle de vos activités. Une optimisation «papier» peut être
        requalifiée par l'administration fiscale.
      </Callout>

      <h3>Points de vigilance</h3>

      <ul>
        <li>
          <strong>Prix de transfert :</strong> Les opérations intra-groupe doivent
          respecter le prix de marché
        </li>
        <li>
          <strong>Substance locale :</strong> Présence physique, équipe locale,
          décisions locales
        </li>
        <li>
          <strong>Accord préalable :</strong> Demander un accord APE avant
          restructuration importante
        </li>
        <li>
          <strong>Normes BEPS :</strong> Les deux pays appliquent les règles anti-abus
          OCDE
        </li>
      </ul>

      <h3>Prochaines étapes</h3>

      <p>
        Si vous envisagez une restructuration fiscale ou une optimisation, nos experts
        recommandent :
      </p>

      <ol>
        <li>Audit fiscal complet (situation actuelle, risques identifiés)</li>
        <li>Modélisation des scénarios (before/after)</li>
        <li>Validation légale (accords APE si nécessaire)</li>
        <li>Mise en œuvre et suivi (documentation, reporting)</li>
      </ol>

      <p>
        <strong>Durée moyenne :</strong> 3-6 mois de préparation + 2-4 semaines
        d'implémentation.
      </p>
    </BlogPostPageRefonte>
  );
}
