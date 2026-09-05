import { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { getCmsNavigation } from "@/lib/strapi";
import { Callout, StatGrid, ProseTable, InlineCTA } from "@/components/blog";

// SEO-05 (S31 2026-07-27) — page la plus lue du site (13 563 impressions,
// 339 clics, CTR 2,50%) mais un <title> générique et tronqué en SERP, sans
// "France", "Espagne" ni "comparatif" — alors que les requêtes qui amènent
// le trafic sont exactement "fiscalité espagne vs france", "taux
// imposition espagne vs france", "impôt société espagne vs france".
export const metadata: Metadata = {
  title: "Fiscalité France-Espagne : comparatif 2026",
  description:
    "Impôt sur le revenu, IS, TVA, cotisations sociales : toutes les différences fiscales entre la France et l'Espagne, avec les chiffres et seuils 2026.",
  alternates: {
    canonical: "https://www.iteradvisors.com/ressources/blog/regimes-fiscaux-france-vs-espagne",
    // The Spanish article is published; the English URL still redirects to FR.
    languages: {
      "fr-FR": "https://www.iteradvisors.com/ressources/blog/regimes-fiscaux-france-vs-espagne",
      "es-ES": "https://www.iteradvisors.com/es/recursos/blog/regimes-fiscaux-france-vs-espagne",
      "x-default": "https://www.iteradvisors.com/ressources/blog/regimes-fiscaux-france-vs-espagne",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    images: [
      {
        // Ahrefs T-404 (2026-06-08): .webp file doesn't exist in /public/images/blog/.
        // Until a dedicated cover ships, use the always-present og-default.
        url: "/images/og-logo.png",
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
      // TRAFIC-03 (2026-08-31) — cette page porte à elle seule 39 % du trafic
      // organique du site (8 mots-clés, dont « impots espagne » en P6). Son
      // auteur était déclaré sans `url` : pas de lien vers sa fiche, donc pas
      // de rel="author" ni de Person relié dans le schéma — sur la page où
      // l'E-E-A-T compte le plus.
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Associé fondateur — CFO & Investisseur, Iter Advisors",
        url: "/a-propos/benjamin-ziza",
      }}
      readingTime={8}
      dateModified="2026-08-31T00:00:00Z"
      heroImage="/images/blog/covers/regimes-fiscaux-france-vs-espagne.svg"
      toc={[
        { id: "impot-societes", label: "IS : 25,83 % FR vs 25 % ES" },
        { id: "tva", label: "TVA : 20 % vs 21 % intra-UE" },
        { id: "cotisations", label: "Cotisations : 45 % vs 30 %" },
        { id: "regimes-speciaux", label: "Régimes spéciaux et Beckham" },
        { id: "profil", label: "Choisir selon votre profil" },
        { id: "faq", label: "FAQ" },
        { id: "sources", label: "Sources officielles" },
      ]}
      faqItems={[
        {
          question: "Faut-il créer une holding pour opérer entre la France et l'Espagne ?",
          answer: "Pas nécessairement. Une holding est pertinente quand votre CA dépasse 2–3 M€ ou que vous gérez plusieurs entités. Pour les PME en phase de croissance, une structure binationale simple (SARL/SAS en France + SL en Espagne) suffit pour bénéficier des différences de charges sociales (~15 points d'écart). Un audit de structure avec un DAF externalisé permet d'identifier le schéma optimal avant tout changement.",
        },
        {
          question: "Comment éviter la double imposition entre la France et l'Espagne ?",
          answer: "La convention fiscale France-Espagne (signée en 1995, révisée en 2011) prévient la double imposition sur les revenus d'entreprise, les dividendes et les salaires. Concrètement : les bénéfices générés en Espagne sont imposés uniquement en Espagne si vous y avez un établissement stable permanent (local, salarié). Les dividendes versés par la filiale espagnole à la holding française bénéficient d'une retenue à la source réduite (5–15 %). Consultez un expert fiscal avant toute restructuration.",
        },
        {
          question: "La TVA espagnole est-elle récupérable par une société française ?",
          answer: "Oui, via la directive 2008/9/CE. Une société française assujettie à la TVA peut récupérer la TVA espagnole (IVA) payée sur ses achats professionnels en Espagne, à condition de déposer une demande de remboursement électronique avant le 30 septembre de l'année suivante. Le délai de remboursement est généralement de 4 à 6 mois. Le seuil minimum est 50 € pour une demande trimestrielle.",
        },
      ]}
      relatedArticles={[
        {
          url: "/ressources/fiscalite/impot-revenu-espagne",
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
      <h2 id="impot-societes">IS : 25,83 % en France, 25 % en Espagne — et les cas où l'écart se creuse</h2>

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

      <h2 id="tva">TVA : 20 % (France) vs 21 % (Espagne) — ce qui change pour vos opérations intra-UE</h2>

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

      <h2 id="cotisations">Cotisations sociales : 45 % en France vs 30 % en Espagne — jusqu'à 7 500 €/an d'écart par salarié</h2>

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

      <h2 id="regimes-speciaux">Régimes spéciaux : micro-entreprise, PVN, PAC et Beckham — lequel s'applique à votre situation ?</h2>

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

      <h3>Espagne : Régime Beckham (impatriés)</h3>

      <p>
        Les personnes physiques qui s&apos;installent en Espagne après avoir résidé hors du
        pays pendant au moins 5 ans peuvent bénéficier du{" "}
        <a
          href="/ressources/fiscalite/beckham-law"
          className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
        >
          régime Beckham
        </a>{" "}
        : un taux forfaitaire de 24 % sur les revenus de source espagnole jusqu'à
        600 000 €, pendant 6 ans. Un avantage considérable pour les dirigeants et
        cadres supérieurs qui rejoignent une filiale espagnole depuis l&apos;étranger.
        La condition de non-résidence s&apos;apprécie notamment via la règle des 183 jours — voir notre guide sur la{" "}
        <a
          href="/ressources/fiscalite/residence-fiscale-france-espagne"
          className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
        >
          résidence fiscale France-Espagne
        </a>.
      </p>

      <Callout type="success" title="Régime Beckham : jusqu'à 23 points d'économie">
        Un cadre imposé à 47 % en France passant au régime Beckham paie 24 % sur ses
        revenus espagnols — soit une économie pouvant dépasser 50 000 €/an pour un
        salaire de 150 000 €.{" "}
        <a href="/ressources/fiscalite/beckham-law" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
          Voir les conditions d&apos;éligibilité →
        </a>
      </Callout>

      <h2 id="profil">Quel régime fiscal choisir selon votre profil et votre CA ?</h2>

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
        <li>
          <strong>Modelo 720 :</strong> Les résidents fiscaux espagnols qui détiennent des biens en France (comptes bancaires, immobilier, assurance-vie) doivent les déclarer via le{" "}
          <a
            href="/ressources/fiscalite/modelo-720"
            className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
          >
            Modelo 720
          </a>{" "}
          — sanction lourde en cas d&apos;omission.
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

      {/* T6 (2026-06-07) — encart maillage interne. Cet article génère
          45 % des clics du site (1 776/an) mais ne poussait jusqu'ici aucun
          jus vers les pages business. Ancres exactes "DAF externalisé" et
          "externalisation comptable" pour matcher les requêtes cibles. */}
      <h2 id="faq">FAQ — Fiscalité France vs Espagne</h2>
      <h3>Faut-il créer une holding pour opérer entre la France et l&apos;Espagne ?</h3>
      <p>Pas nécessairement. Une holding est pertinente quand votre CA dépasse 2–3 M€ ou que vous gérez plusieurs entités. Pour les PME en phase de croissance, une structure binationale simple (SARL/SAS en France + SL en Espagne) suffit pour bénéficier des différences de charges sociales (~15 points d&apos;écart). Un audit de structure avec un <a href="/daf-externalise">DAF externalisé</a> permet d&apos;identifier le schéma optimal avant tout changement.</p>
      <h3>Comment éviter la double imposition entre la France et l&apos;Espagne ?</h3>
      <p>La convention fiscale France-Espagne (signée en 1995, révisée en 2011) prévient la double imposition sur les revenus d&apos;entreprise, les dividendes et les salaires. Concrètement : les bénéfices générés en Espagne sont imposés uniquement en Espagne si vous y avez un établissement stable permanent (local, salarié). Les dividendes versés par la filiale espagnole à la holding française bénéficient d&apos;une retenue à la source réduite (5–15 %). Consultez un expert fiscal avant toute restructuration.</p>
      <h3>La TVA espagnole est-elle récupérable par une société française ?</h3>
      <p>Oui, via la directive 2008/9/CE. Une société française assujettie à la TVA peut récupérer la TVA espagnole (IVA) payée sur ses achats professionnels en Espagne, à condition de déposer une demande de remboursement électronique avant le 30 septembre de l&apos;année suivante. Le délai de remboursement est généralement de 4 à 6 mois. Le seuil minimum est 50 € pour une demande trimestrielle.</p>

      <div className="my-10 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-6 md:p-8">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          Vous structurez votre activité entre la France et l&apos;Espagne ?
        </h3>
        <p className="mb-5 text-slate-700">
          Iter Advisors accompagne PME et scale-ups franco-espagnoles depuis Barcelone,
          Paris et Toulouse. Nos DAF externalisés connaissent les deux environnements
          fiscaux et comptables — IS / IRPF, TVA intra-UE, régime Beckham, conventions
          fiscales — et savent structurer une activité binationale sans risque de
          requalification.
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Découvrez notre offre de{" "}
              <a
                href="/daf-externalise"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                DAF externalisé
              </a>
              {" "}— direction financière complète à partir de 3 000 € HT/mois.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Pour la tenue des comptes et la fiscalité du quotidien, voir notre service
              d&apos;
              <a
                href="/services/comptabilite-externalisation"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                externalisation comptable
              </a>
              {" "}— Pennylane / Sage / QuickBooks au choix.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Besoin d&apos;une intervention urgente (vacance de poste, restructuration) ?
              Notre{" "}
              <a
                href="/daf-externalise/transition"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                DAF de transition
              </a>
              {" "}est opérationnel sous 7 à 10 jours.
            </span>
          </li>
        </ul>
      </div>

      {/* TRAFIC-03 (2026-08-31) — la page compare IS, TVA, cotisations et
          barèmes des deux pays sans citer une seule source officielle. Sur du
          contenu fiscal, c'est ce qui sépare une affirmation d'une référence —
          pour le lecteur comme pour les moteurs. URLs vérifiées une à une
          (voir lib/content/references.ts pour les constantes partagées). */}
      <h2 id="sources">Sources officielles</h2>
      <ul>
        <li>
          <a href="https://sede.agenciatributaria.gob.es/Sede/irpf.html" target="_blank" rel="noopener">
            Agencia Tributaria — IRPF, barèmes et obligations
          </a>
        </li>
        <li>
          <a href="https://www.boe.es/eli/es/l/2006/11/28/35/con" target="_blank" rel="noopener">
            Ley 35/2006 del IRPF, texte consolidé (BOE)
          </a>
        </li>
        <li>
          <a href="https://www.impots.gouv.fr/les-conventions-internationales" target="_blank" rel="noopener">
            impots.gouv.fr — conventions fiscales internationales
          </a>
        </li>
        <li>
          <a href="https://bofip.impots.gouv.fr/" target="_blank" rel="noopener">
            BOFiP-Impôts — doctrine fiscale opposable
          </a>
        </li>
      </ul>
    </BlogPostPageRefonte>
  );
}
