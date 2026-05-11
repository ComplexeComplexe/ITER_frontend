import { Tool } from '@/data/tools';

export function generateToolReviewSchema(tool: Tool) {
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
      '@type': 'Organization',
      name: 'Iter Advisors',
      url: 'https://www.iteradvisors.com',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: tool.rating,
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: `Avis expert sur ${tool.name} par nos DAF externalisés. Adapté pour ${tool.forWho.join(', ')}. Non-adapté pour ${tool.notForWho.join(', ')}.`,
    datePublished: new Date().toISOString().split('T')[0],
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
    offers: {
      '@type': 'Offer',
      price: tool.priceRange,
      priceCurrency: 'EUR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: 1,
    },
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
