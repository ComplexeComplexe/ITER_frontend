import { Tool } from '@/data/tools';

/**
 * Date de la dernière revue éditoriale du corpus d'avis outils.
 *
 * SEO-DAF-13 (2026-08-09) — `datePublished` était calculé avec
 * `new Date()` : chaque build republiait l'avis « aujourd'hui ». Le balisage
 * annonçait donc une fraîcheur fabriquée, changeait à chaque déploiement et
 * rendait la sortie du build non déterministe.
 *
 * À remonter à la main quand les avis outils sont réellement revus.
 */
export const TOOLS_REVIEW_DATE = '2026-09-05';
export const TOOLS_REVIEW_DATE_LABEL = '5 septembre 2026';

/**
 * Signataire de l'avis, dérivé de `tool.experts` (le premier expert cité).
 *
 * REDESIGN-P3 (2026-09-01) — l'avis était signé « Iter Advisors » en
 * Organization : sur une requête « avis {outil} », un avis sans personne
 * derrière ne vaut pas grand-chose, ni pour un lecteur ni pour un moteur.
 * Attribution à valider par Guillaume.
 */
export const TOOL_AUTHORS = {
  sebastien: { name: 'Sébastien Doat', url: '/a-propos/sebastien-doat' },
  benjamin: { name: 'Benjamin Ziza', url: '/a-propos/benjamin-ziza' },
} as const;

export function getToolAuthor(tool: Tool) {
  return TOOL_AUTHORS[tool.experts[0] ?? 'benjamin'];
}

export function generateToolReviewSchema(tool: Tool) {
  const author = getToolAuthor(tool);
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `https://www.iteradvisors.com/ressources/outils/${tool.slug}`,
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: tool.name,
      url: tool.website,
      applicationCategory: 'BusinessApplication',
    },
    author: {
      '@type': 'Person',
      name: author.name,
      url: `https://www.iteradvisors.com${author.url}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Iter Advisors',
      url: 'https://www.iteradvisors.com',
    },
    dateModified: TOOLS_REVIEW_DATE,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: tool.rating,
      bestRating: '5',
      worstRating: '1',
    },
    // SEO-DAF-13 (2026-08-09) — le reviewBody reprenait le cadrage
    // « Adapté pour / Non-adapté pour », retiré des pages outils en juillet
    // au profit de « Points forts / Points de vigilance ». Le balisage
    // décrivait donc un contenu qui n'existe plus à l'écran. Reformulé sur
    // les mêmes données, avec le vocabulaire réellement affiché.
    reviewBody: `Avis expert sur ${tool.name} par nos DAF externalisés. Points forts : ${tool.forWho.join(', ')}. Points de vigilance : ${tool.notForWho.join(', ')}.`,
    datePublished: "2026-09-01",
  };
}

export function generateFAQSchema(
  toolName: string,
  faqItems: Array<{ question: string; answer: string }>,
  toolSlug: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `https://www.iteradvisors.com/ressources/outils/${toolSlug}#faq`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  toolName: string,
  toolSlug: string,
  categoryName: string,
  categorySlug: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `https://www.iteradvisors.com/ressources/outils/${toolSlug}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ressources',
        item: 'https://www.iteradvisors.com/ressources',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Outils',
        item: 'https://www.iteradvisors.com/ressources/outils',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: categoryName,
        item: `https://www.iteradvisors.com/ressources/outils/${categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: toolName,
        item: `https://www.iteradvisors.com/ressources/outils/${toolSlug}`,
      },
    ],
  };
}

export function generateSoftwareApplicationSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    url: tool.website,
    applicationCategory: 'BusinessApplication',
    // SEO-DAF-13 (2026-08-09) — deux corrections sur ce générateur, qui
    // n'est appelé nulle part aujourd'hui mais reste exporté :
    //  1. `offers.price` recevait `tool.priceRange` (« 39-199 €/mois »).
    //     `price` attend une valeur numérique unique ; une fourchette y est
    //     invalide. `offers` est retiré tant qu'aucun prix atomique n'existe
    //     dans data/tools.ts — la fourchette reste affichée en clair sur la
    //     fiche.
    //  2. `aggregateRating` agrégeait… un seul avis, le nôtre
    //     (`ratingCount: 1`). Un avis éditorial unique se balise en `Review`
    //     — c'est ce que fait generateToolReviewSchema ci-dessus. Un
    //     aggregateRating auto-déclaré n'est pas éligible au review snippet
    //     et expose à une action manuelle.
    author: {
      '@type': 'Organization',
      name: 'Iter Advisors',
      url: 'https://www.iteradvisors.com',
    },
  };
}

/**
 * HowTo JSON-LD schema for tool implementation guides (TICKET 31).
 * Generates a schema.org/HowTo from a tool's implementationGuide steps,
 * enabling rich-snippet "How to" eligibility in search results.
 */
export function generateHowToSchema(
  toolName: string,
  toolSlug: string,
  steps: Array<{ step: string; detail: string }>,
  totalDuration?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `https://www.iteradvisors.com/ressources/outils/${toolSlug}#howto`,
    name: `Comment implémenter ${toolName}`,
    description: `Guide d'implémentation de ${toolName} étape par étape, par les DAF externalisés d'Iter Advisors.`,
    ...(totalDuration ? { totalTime: totalDuration } : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.step,
      text: s.detail,
      url: `https://www.iteradvisors.com/ressources/outils/${toolSlug}#step${i + 1}`,
    })),
  };
}
