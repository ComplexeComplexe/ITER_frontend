'use client';

import PageLayout from '@/components/PageLayout';
import Breadcrumb from '@/components/Breadcrumb';
import { tools } from '@/data/tools';
import Link from 'next/link';
import Image from 'next/image';

/* Pas de BreadcrumbList écrit à la main ici : le composant <Breadcrumb>
   en émet déjà un, plus complet (il inclut la racine « Iter Advisors ») et
   cohérent site-wide. En déclarer deux donnait deux fils d'Ariane
   concurrents pour la même page (2026-08-02, même correctif que sur les
   5 pages du cocon fiscalité). */

const hubCollectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.iteradvisors.com/ressources/outils',
  name: 'Stack financier idéal pour startups et PME',
  description:
    'Guide complet des outils de finance (comptabilité, trésorerie, dépenses, paie) recommandés par nos DAF externalisés.',
  url: 'https://www.iteradvisors.com/ressources/outils',
  author: {
    '@type': 'Organization',
    name: 'Iter Advisors',
    url: 'https://www.iteradvisors.com',
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Comptabilité',
        url: 'https://www.iteradvisors.com/ressources/outils/logiciels-comptabilite',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Trésorerie & prévisionnel',
        url: 'https://www.iteradvisors.com/ressources/outils/logiciels-tresorerie',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Dépenses & cartes corporate',
        url: 'https://www.iteradvisors.com/ressources/outils/gestion-depenses',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Paie & RH',
        url: 'https://www.iteradvisors.com/ressources/outils/logiciels-paie',
      },
      // 2026-08-02 — alignés sur les 6 besoins affichés. Banque et Reporting
      // n'ont pas de page catégorie : on pointe la fiche outil de référence
      // (cf. commentaire sur `categories`).
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Banque & paiements',
        url: 'https://www.iteradvisors.com/ressources/outils/qonto',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Reporting & BI',
        url: 'https://www.iteradvisors.com/ressources/outils/power-bi',
      },
    ],
  },
};

/* FAQ — les réponses reprennent uniquement des éléments déjà présents et
   sourcés ailleurs sur la page (seuils de stade, budgets, arbitrages du
   tableau comparatif). Le texte visible et le JSON-LD sortent du même
   tableau, donc restent identiques (exigence Google). */
const FAQ = [
  {
    question: 'Quel outil choisir entre Pennylane et Sage ?',
    answer:
      "Pennylane convient aux startups et PME françaises qui veulent une comptabilité moderne, connectée et rapide à clôturer, avec un effort de mise en place faible à modéré. Sage devient pertinent quand la profondeur fonctionnelle prime sur l'expérience utilisateur : contextes industriels, multi-entités, groupes simples. L'effort de déploiement y est modéré à élevé.",
  },
  {
    question: "À partir de quand faut-il un outil de trésorerie dédié ?",
    answer:
      "En général à partir de 2 M€ de chiffre d'affaires, quand le cash devient un sujet de pilotage hebdomadaire et non plus seulement comptable. Les signaux concrets : les prévisions de trésorerie ne suffisent plus, les exports Excel se multiplient, les board packs deviennent trop manuels. En dessous, un suivi bancaire et comptable bien tenu suffit le plus souvent.",
  },
  {
    question: 'Qonto suffit-il pour une PME ?',
    answer:
      "Pour la majorité des startups et PME françaises, oui : Qonto couvre les opérations courantes, les cartes et s'intègre aux principaux outils de comptabilité et de gestion des dépenses. Il faut le compléter ou le challenger si l'entreprise a des besoins de cash pooling, de multi-entités avancé ou d'opérations internationales plus complexes.",
  },
  {
    question: 'Combien coûte une stack finance complète ?',
    answer:
      "Comptez 250 à 400 € HT par mois en seed, 800 à 1 500 € entre 2 et 10 M€ de CA, et 2 000 à 4 000 € au-delà de 10 M€. Ces montants sont des ordres de grandeur : ils varient selon le nombre d'utilisateurs, le volume de bulletins et les modules activés.",
  },
  {
    question: 'Faut-il tout déployer en même temps ?',
    answer:
      "Non. Dans nos déploiements, l'ordre le plus efficace est banque et comptabilité d'abord, puis dépenses, puis paie, et enfin trésorerie et reporting quand les flux amont sont fiables. Un outil de prévision branché sur des données incomplètes produit des prévisions fausses.",
  },
];

export interface HubPageProps {
  locale: 'fr' | 'en' | 'es';
  cmsNavigation?: any;
}

/* Refonte 2026-08-02 — chaque stade suit désormais la même structure :
   profil, enjeu, stack ventilée PAR RÔLE (et non une liste à plat),
   budget, puis un « signal de bascule » qui dit quand changer de stack.
   La mention « vous avez probablement un CFO interne » a été retirée du
   stade mature : elle excluait de fait la cible du temps partagé. */
const stageRecommendations = {
  fr: [
    {
      id: 'seed',
      stage: 'Seed / Early stage',
      revenue: 'Moins de 2 M€ de CA, équipe de 5 à 15 personnes.',
      headline: 'Une stack simple, connectée et suffisante pour bien démarrer',
      description:
        "À ce stade, l'objectif n'est pas d'empiler des logiciels mais de fiabiliser les flux de base avec une stack simple, connectée et peu coûteuse. Le bon choix consiste à couvrir cinq besoins sans sur-outillage : banque, comptabilité, dépenses, paie et premiers tableaux de pilotage.",
      stack: [
        { role: 'Banque', tools: 'Qonto' },
        { role: 'Comptabilité', tools: 'Pennylane' },
        { role: 'Dépenses', tools: 'Spendesk ou Pleo selon le niveau de process' },
        { role: 'Paie', tools: 'Payfit' },
      ],
      budget: '250 à 400 € HT / mois',
      switchSignal:
        'Vous devez passer à une stack plus structurée lorsque les clôtures ralentissent, que plusieurs responsables valident des dépenses ou que la visibilité cash devient hebdomadaire au lieu d\'être quotidienne.',
    },
    {
      id: 'series-a-b',
      stage: 'Series A / B',
      revenue: 'Entre 2 et 10 M€ de CA, équipe de 15 à 50 personnes.',
      headline: 'Visibilité temps réel sur le cash et clôtures fiables',
      description:
        "Entre 2 et 10 M€ de chiffre d'affaires, la complexité opérationnelle augmente vite : plus de flux, plus de validations, plus d'exigence investisseurs. La priorité devient la visibilité en temps réel sur le cash, la qualité de clôture et la capacité à produire un reporting fiable sans mobiliser l'équipe pendant des jours.",
      stack: [
        { role: 'Banque', tools: 'Qonto ou Revolut Business si multi-devises' },
        { role: 'Comptabilité', tools: 'Pennylane' },
        { role: 'Trésorerie', tools: 'Agicap' },
        { role: 'Dépenses', tools: 'Spendesk' },
        { role: 'Paie', tools: 'Payfit' },
      ],
      budget: '800 à 1 500 € HT / mois',
      switchSignal:
        'Vous devez renforcer la stack lorsque les prévisions de trésorerie ne suffisent plus, que les exports Excel se multiplient ou que les board packs deviennent trop manuels.',
    },
    {
      id: 'scale-up',
      stage: 'Scale-up / PME mature',
      revenue: 'Entre 10 et 30 M€ de CA, équipe de 50 à 100 personnes.',
      headline: 'Orchestrer un système financier cohérent et multi-entités',
      description:
        "Entre 10 et 30 M€ de chiffre d'affaires, la question n'est plus seulement de choisir un bon logiciel, mais d'orchestrer un système financier cohérent, documenté et robuste. L'enjeu principal est la fiabilité multi-entités, le pilotage cash avancé, la maîtrise des workflows et un reporting exploitable par la direction et les investisseurs.",
      stack: [
        { role: 'Comptabilité', tools: 'Pennylane ou Sage selon complexité' },
        { role: 'Trésorerie', tools: 'Agicap' },
        { role: 'Dépenses', tools: 'Spendesk ou Payhawk' },
        { role: 'Paie', tools: 'Payfit ou Silae selon volumétrie' },
        { role: 'Reporting', tools: 'Power BI si dashboards finance consolidés' },
      ],
      budget: '2 000 à 4 000 € HT / mois',
      switchSignal:
        'Vous devez professionnaliser la stack quand le multi-entités, les filiales, les cut-offs ou le reporting de direction rendent les outils historiques trop limitants.',
    },
  ],
};

/* Refonte 2026-08-02 — 4 → 6 besoins métier. Banque et Reporting étaient
   absents de la navigation alors que Qonto, Revolut et Power BI figurent
   plus bas dans la page.
   Attention : seuls 4 slugs ont une vraie page de comparatif
   (cf. categoryMeta dans app/ressources/outils/[slug]/page.tsx). Il n'existe
   aucune page « banque » et /ressources/outils/reporting-dataviz 301 vers ce
   hub même (EC-05) — y renvoyer créerait une boucle. Les deux nouvelles
   cartes pointent donc vers la fiche outil de référence, et leur libellé de
   lien le dit ("Voir la fiche" au lieu de "Voir le comparatif"). */
const categories = {
  fr: [
    {
      href: '/ressources/outils/logiciels-comptabilite',
      name: 'Comptabilité',
      description:
        'Piloter une comptabilité fiable, plus rapide à clôturer et mieux connectée aux flux bancaires, aux ventes et aux achats.',
      icon: '📊',
      linkLabel: 'Voir le comparatif',
    },
    {
      href: '/ressources/outils/logiciels-tresorerie',
      name: 'Trésorerie & prévisionnel',
      description:
        'Sécuriser le cash, suivre les décalages d\'encaissement et produire des prévisions exploitables pour dirigeants et investisseurs.',
      icon: '💰',
      linkLabel: 'Voir le comparatif',
    },
    {
      href: '/ressources/outils/gestion-depenses',
      name: 'Dépenses & cartes corporate',
      description:
        'Contrôler les achats, les notes de frais et les circuits de validation sans ralentir les équipes.',
      icon: '💳',
      linkLabel: 'Voir le comparatif',
    },
    {
      href: '/ressources/outils/logiciels-paie',
      name: 'Paie & RH',
      description:
        'Industrialiser la production de paie et fiabiliser les processus RH sans dépendre d\'opérations manuelles fragiles.',
      icon: '👥',
      linkLabel: 'Voir le comparatif',
    },
    {
      href: '/ressources/outils/qonto',
      name: 'Banque & paiements',
      description:
        'Choisir la bonne infrastructure bancaire pour les opérations courantes, les cartes, les multi-devises et les intégrations finance.',
      icon: '🏦',
      linkLabel: 'Voir la fiche',
    },
    {
      href: '/ressources/outils/power-bi',
      name: 'Reporting & BI',
      description:
        'Transformer les données comptables et opérationnelles en tableaux de bord lisibles pour le management et le board.',
      icon: '📈',
      linkLabel: 'Voir la fiche',
    },
  ],
};

/* Refonte 2026-08-02 du tableau comparatif.
   Changements de fond :
   - colonnes « API compta / API banque » remplacées par « Effort de mise en
     place », qui répond à la vraie question du dirigeant (combien de
     friction ?) plutôt qu'à une case à cocher technique ;
   - formulations absolues retirées faute de source publique vérifiable :
     « précis à 95 % », « migration en 2 semaines », « best-in-class »,
     « API rich » ;
   - ajout de malibou, cohérent avec le reste de la page. */
const comparisonRows = [
  {
    tool: 'Pennylane',
    href: '/ressources/outils/pennylane',
    use: 'Comptabilité et facturation connectées',
    size: 'Startups et PME françaises',
    effort: 'Faible à modéré',
    price: '49 à 149 € / mois',
    verdict:
      "Très bon choix pour structurer rapidement une fonction finance moderne, à condition de ne pas être dans un contexte ERP complexe.",
  },
  {
    tool: 'Sage',
    href: '/ressources/outils/sage',
    use: 'Comptabilité structurée, contextes industriels ou multi-entités',
    size: 'PME avancées et groupes simples',
    effort: 'Modéré à élevé',
    price: '30 à 250 € / mois',
    verdict:
      "Plus robuste que séduisant : pertinent quand la profondeur fonctionnelle compte davantage que l'UX.",
  },
  {
    tool: 'Agicap',
    href: '/ressources/outils/agicap',
    use: 'Prévisionnel et pilotage de trésorerie',
    size: 'PME en croissance',
    effort: 'Modéré',
    price: '79 à 249 € / mois',
    verdict:
      "Très utile quand le cash devient un sujet de pilotage hebdomadaire et non plus seulement comptable. La qualité des prévisions dépend de celle des flux amont.",
  },
  {
    tool: 'Spendesk',
    href: '/ressources/outils/spendesk',
    use: 'Dépenses, cartes et validations',
    size: 'PME structurées',
    effort: 'Modéré',
    price: '0 à 99 € / utilisateur',
    verdict:
      "Bon outil de gouvernance des dépenses, surtout s'il est bien connecté à la comptabilité.",
  },
  {
    tool: 'Qonto',
    href: '/ressources/outils/qonto',
    use: 'Banque opérationnelle et cartes',
    size: 'Startups et PME',
    effort: 'Faible',
    price: '9 à 99 € / mois',
    verdict:
      "Point d'entrée solide pour une stack finance française simple et connectée. À compléter si besoin de cash pooling ou de multi-entités avancé.",
  },
  {
    tool: 'PayFit',
    href: '/ressources/outils/payfit',
    use: 'Paie et RH en autonomie',
    size: "PME jusqu'à 100 salariés environ",
    effort: 'Faible à modéré',
    price: '39 à 99 € / mois + 12 € / bulletin',
    verdict:
      "Très bon compromis entre autonomie, UX et niveau de structuration pour une équipe finance légère.",
  },
  {
    tool: 'malibou',
    href: '/ressources/outils/malibou',
    use: 'Paie déléguée avec gestionnaire dédié',
    size: 'PME sans RH senior',
    effort: 'Modéré',
    price: 'À partir de 25 € / mois, tout inclus',
    verdict:
      "Option intéressante pour externaliser davantage la production de la paie, avec un recul produit encore à construire.",
  },
  {
    tool: 'Power BI',
    href: '/ressources/outils/power-bi',
    use: 'Reporting et dashboards',
    size: 'PME structurées, groupes, board reporting',
    effort: 'Modéré',
    price: '10 à 20 € / utilisateur',
    verdict:
      "Très bon choix pour industrialiser le reporting si les sources et la gouvernance data sont déjà en place. Alternative : Metabase.",
  },
];

const categoryLabels: Record<string, string> = {
  comptabilite: 'Comptabilité',
  tresorerie: 'Trésorerie',
  depenses: 'Dépenses & cartes',
  paie: 'Paie & RH',
  reporting: 'Reporting & BI',
  recouvrement: 'Recouvrement',
  sirh: 'SIRH & RH',
  equity: 'Equity / Cap table',
};

export default function HubPage({ locale = 'fr', cmsNavigation }: HubPageProps) {
  const stageData = locale === 'fr' ? stageRecommendations.fr : stageRecommendations.fr;
  const categoryData = locale === 'fr' ? categories.fr : categories.fr;

  /* Les champs affichés sont dérivés de data/tools.ts (forWho, notForWho,
     shortDescription, implementationTime) : pas de copy inventée par carte.
     Le badge porte le délai de déploiement réel plutôt qu'un slogan. */
  const featuredTools = [
    ...tools
      .filter((t) => t.phase === 1 && t.slug !== 'payfit')
      .map((t) => ({
        slug: t.slug,
        name: t.name,
        logo: t.logo,
        logoAlt: t.logoAlt,
        categoryLabel: categoryLabels[t.category] ?? t.category,
        badge: `Déploiement ${t.implementationTime}`,
        idealFor: t.forWho[0],
        why: t.shortDescription,
        watchOut: t.notForWho[0],
      })),
    {
      slug: 'malibou',
      name: 'malibou',
      logo: '',
      logoAlt: '',
      categoryLabel: 'Paie & RH',
      badge: 'Nouveau sur notre radar',
      idealFor: 'Startups et PME de 5 à 80 salariés sans RH senior en interne.',
      why: 'SIRH complet (paie, absences, planning, frais, temps, entretiens, onboarding) couplé à un gestionnaire de paie dédié qui produit les bulletins sur la technologie Silae, en plan unique tout inclus.',
      watchOut:
        'Solution récente : recul produit et parc installé encore inférieurs aux acteurs historiques.',
    },
  ];

  return (
    <PageLayout locale={locale}>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hubCollectionSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map((q) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: { '@type': 'Answer', text: q.answer },
            })),
          }),
        }}
      />

      {/* Hero section */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: 'Ressources', href: '/ressources' },
              { label: 'Outils' },
            ]}
          />

          {/* Refonte 2026-08-02 — le hero portait des `\'` littéraux
              (« n\'est pas »), visibles en production : c'est du JSX, pas une
              chaîne JS, donc l'échappement s'affichait tel quel. */}
          <div className="max-w-[70ch] mt-8">
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6">
              La stack financière adaptée à votre stade de croissance
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Startup en seed, PME en structuration ou société multi-entités : découvrez les
              outils que nos CFO à temps partagé recommandent, déploient et connectent sur le
              terrain pour fiabiliser la comptabilité, la trésorerie, les dépenses, la paie et le
              reporting.
            </p>
            <p className="text-base text-foreground/70 leading-relaxed mb-8">
              Cette sélection s&apos;appuie sur plus de 80 déploiements menés chez des startups et
              PME au cours des trois dernières années, avec un retour d&apos;expérience cabinet —
              pas un simple comparatif d&apos;éditeurs.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-all duration-300"
              >
                Auditer ma stack finance
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="#recommandation-stade"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                Voir notre recommandation par stade
              </Link>
            </div>

            <nav aria-label="Accès rapide par profil" className="flex flex-wrap gap-2.5">
              {[
                { href: '#seed', label: 'Moins de 2 M€ de CA' },
                { href: '#series-a-b', label: '2 à 10 M€ de CA' },
                { href: '#scale-up', label: 'Plus de 10 M€ de CA' },
                { href: '#categories', label: 'Par besoin métier' },
              ].map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-4 py-2 text-sm font-medium text-foreground hover:border-iter-violet hover:text-iter-violet transition-all"
                >
                  {a.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* Stage-based recommendations */}
      <section id="recommandation-stade" className="bg-muted/20 py-16 scroll-mt-24">
        <div className="container">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-3">
            Notre recommandation par stade de croissance
          </h2>
          <p className="text-muted-foreground max-w-[70ch] mb-12">
            Trois profils, la même grille de lecture : ce que vous devez couvrir, avec quels
            outils, pour quel budget — et le signal qui indique qu&apos;il est temps de changer
            de stack.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {stageData.map((stage) => (
              <article
                key={stage.id}
                id={stage.id}
                className="flex flex-col bg-background border border-gray-200 rounded-2xl p-6 scroll-mt-24"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2">
                  {stage.stage}
                </p>
                <h3 className="text-lg font-bold font-heading text-foreground mb-2 leading-snug">
                  {stage.headline}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{stage.revenue}</p>
                <p className="text-sm text-gray-700 leading-relaxed mb-5">{stage.description}</p>

                <div className="mb-5">
                  <p className="text-xs font-semibold text-muted-foreground mb-2.5">
                    STACK RECOMMANDÉE
                  </p>
                  <ul className="space-y-1.5">
                    {stage.stack.map((s) => (
                      <li key={s.role} className="text-sm text-gray-700 flex gap-2">
                        <span className="font-semibold text-foreground shrink-0">{s.role} :</span>
                        <span>{s.tools}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm font-semibold text-foreground mb-4">
                  Budget cible : {stage.budget}
                </p>

                <div className="mt-auto pt-4 border-t border-border/60">
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                    SIGNAL DE BASCULE
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">{stage.switchSignal}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-all duration-300"
            >
              Auditer ma stack finance
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category overview */}
      <section id="categories" className="bg-background py-16 scroll-mt-24">
        <div className="container">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-3">
            Choisir un outil par besoin métier
          </h2>
          <p className="text-muted-foreground max-w-[70ch] mb-12">
            Chaque catégorie ci-dessous renvoie vers une analyse rédigée avec un prisme CFO : cas
            d&apos;usage, limites, intégrations utiles et niveau de maturité recommandé.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group h-full flex flex-col p-6 bg-muted/20 rounded-2xl border border-gray-200 hover:border-iter-violet/50 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 pt-4 inline-flex items-center gap-1 text-iter-violet font-semibold text-sm group-hover:gap-2 transition-all">
                  {category.linkLabel}
                  <span aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured tools — refonte 2026-08-02.
          Le label « Phase 1 » ne disait ni priorité, ni maturité, ni ordre de
          déploiement : retiré. Les notes sur 5 aussi — elles tiraient la page
          vers le comparateur grand public alors que le différenciant est le
          jugement de cabinet, et aucune méthodologie de notation n'est
          publiée. Chaque carte suit désormais le même gabarit décisionnel
          (idéal pour / pourquoi / point de vigilance), alimenté par les
          données existantes de data/tools.ts — rien n'est inventé ici. */}
      <section className="bg-muted/20 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-3">
            Les outils que nous déployons le plus
          </h2>
          <p className="text-muted-foreground max-w-[70ch] mb-12">
            Pour chacun : à qui il convient, pourquoi nous le recommandons, et le point à
            vérifier avant de vous engager.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((t) => (
              <Link
                key={t.slug}
                href={`/ressources/outils/${t.slug}`}
                className="group flex flex-col h-full p-6 bg-background border border-gray-200 rounded-2xl hover:border-iter-violet/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-muted/40 rounded-lg flex items-center justify-center p-2">
                    {t.logo ? (
                      <Image
                        src={t.logo}
                        alt={t.logoAlt}
                        width={100}
                        height={40}
                        sizes="100px"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-iter-violet font-bold text-xl">m</span>
                    )}
                  </div>
                  {t.badge && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-iter-violet/10 text-iter-violet">
                      {t.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-0.5">{t.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t.categoryLabel}</p>

                <dl className="space-y-2.5 text-sm flex-grow">
                  <div>
                    <dt className="font-semibold text-foreground">Idéal pour</dt>
                    <dd className="text-gray-700">{t.idealFor}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Pourquoi nous le recommandons</dt>
                    <dd className="text-gray-700">{t.why}</dd>
                  </div>
                  {t.watchOut && (
                    <div>
                      <dt className="font-semibold text-foreground">Point de vigilance</dt>
                      <dd className="text-gray-700">{t.watchOut}</dd>
                    </div>
                  )}
                </dl>

                <div className="mt-5 pt-4 border-t border-border/60 inline-flex items-center gap-1 text-iter-violet font-semibold text-sm group-hover:gap-2 transition-all">
                  Voir l&apos;analyse détaillée
                  <span aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GEO-08 (2026-07-17) — Comparison table "Notre verdict Iter Advisors"
          par catégorie. Information gain : la colonne "Avis Iter Advisors"
          contient des verdicts personnalisés issus de l'expérience réelle
          des CFO Iter Advisors, pas des descriptions marketing. Format
          preferred by LLMs (comparison tables — cf. TICKET-GEO §2). */}
      <section className="bg-background py-16">
        <div className="container max-w-5xl">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-4">
            Comparatif outils CFO 2026 : notre verdict par catégorie
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed max-w-[75ch]">
            Voici le verdict cabinet par grand outil, avec un angle d&apos;usage concret : à quel
            moment il devient pertinent, quel niveau d&apos;effort il demande et dans quel
            contexte il crée le plus de valeur.
          </p>

          <div className="overflow-x-auto mb-4 rounded-2xl border border-border/60">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-muted/40">
                <tr>
                  <th scope="col" className="text-left p-3 font-semibold border-b border-border/60">Outil</th>
                  <th scope="col" className="text-left p-3 font-semibold border-b border-border/60">Meilleur usage</th>
                  <th scope="col" className="text-left p-3 font-semibold border-b border-border/60">Taille recommandée</th>
                  <th scope="col" className="text-left p-3 font-semibold border-b border-border/60">Effort de mise en place</th>
                  <th scope="col" className="text-left p-3 font-semibold border-b border-border/60">Budget indicatif</th>
                  <th scope="col" className="text-left p-3 font-semibold border-b border-border/60">Avis cabinet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {comparisonRows.map((r) => (
                  <tr key={r.tool}>
                    <td className="p-3 align-top">
                      {r.href ? (
                        <Link href={r.href} className="font-semibold text-iter-violet hover:underline">
                          {r.tool}
                        </Link>
                      ) : (
                        <strong>{r.tool}</strong>
                      )}
                    </td>
                    <td className="p-3 align-top text-muted-foreground">{r.use}</td>
                    <td className="p-3 align-top text-muted-foreground">{r.size}</td>
                    <td className="p-3 align-top text-muted-foreground">{r.effort}</td>
                    <td className="p-3 align-top text-muted-foreground">{r.price}</td>
                    <td className="p-3 align-top text-muted-foreground">{r.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground italic mb-8">
            Les prix sont donnés à titre indicatif pour une PME et peuvent varier selon le
            volume, le nombre d&apos;utilisateurs, les modules activés et le niveau
            d&apos;accompagnement attendu. Verdicts issus du retour d&apos;expérience de nos DAF
            externalisés — pas des descriptions marketing des éditeurs. Dernière vérification :
            août 2026.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-all duration-300"
          >
            Demander une recommandation de stack
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* FAQ — visible + FAQPage JSON-LD depuis le même tableau */}
      <section className="bg-muted/20 py-16">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-foreground mb-8">
            Questions fréquentes sur le choix des outils
          </h2>
          <div className="space-y-3">
            {FAQ.map((q) => (
              <details
                key={q.question}
                className="group rounded-lg border border-border/60 bg-background"
              >
                <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                  <h3 className="text-base sm:text-lg font-heading m-0">{q.question}</h3>
                  <span
                    aria-hidden
                    className="text-iter-violet shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <p>{q.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final — spécifique au sujet de la page (arbitrage de stack)
          plutôt que le bloc générique « Faites les bons choix », qui pouvait
          figurer sur n'importe quelle page du cabinet et n'indiquait pas ce
          qu'on obtient après le clic. Le CTA générique reste disponible plus
          bas via CTASection sur les autres pages. */}
      <section className="bg-background pb-16">
        <div className="container max-w-5xl">
          <div className="rounded-3xl bg-iter-dark p-8 sm:p-10 text-white">
            <p className="font-heading text-2xl sm:text-3xl font-semibold mb-3">
              Faites auditer votre stack finance
            </p>
            <p className="text-white/70 max-w-2xl leading-relaxed mb-6">
              Vous hésitez entre plusieurs outils, vous subissez une stack devenue trop
              artisanale ou vous préparez un changement d&apos;échelle ? Un échange avec un CFO
              Iter Advisors permet d&apos;identifier les briques à conserver, celles à remplacer
              et l&apos;ordre de déploiement le plus pertinent pour votre entreprise.
            </p>
            <ul className="text-white/70 text-sm space-y-1.5 mb-6 list-disc pl-5 marker:text-iter-chartreuse">
              <li>Votre stade de croissance et vos contraintes</li>
              <li>Les outils déjà en place et ce qu&apos;ils coûtent réellement</li>
              <li>Le besoin prioritaire : clôture, cash, dépenses, paie ou reporting</li>
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-iter-violet px-6 py-3 font-heading font-semibold text-white hover:bg-iter-violet/90 transition-all duration-300"
            >
              Auditer ma stack finance
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-4 text-sm text-white/50">
              80+ déploiements menés chez des startups et PME ces trois dernières années.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
