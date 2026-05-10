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
