import { PEOPLE, personId } from "@/lib/company-facts";
import { getToolReviewTitle } from '@/data/toolReviews';
import { editorialPersonId } from "@/lib/content/finance-expert";
import { Tool } from '@/data/tools';
import { toolSelection } from '@/data/toolSelection';
import { PAGE_REVISIONS } from '@/lib/content/page-revisions';

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
export const PENNYLANE_REVIEWED_AT = '2026-10-09';
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
  sebastien: { name: PEOPLE.sebastien.name, url: `/a-propos/${PEOPLE.sebastien.slug}` },
  benjamin: { name: PEOPLE.benjamin.name, url: `/a-propos/${PEOPLE.benjamin.slug}` },
  florent: { name: PEOPLE.florent.name, url: `/a-propos/${PEOPLE.florent.slug}` },
} as const;

export function getToolAuthor(tool: Tool) {
  return tool.slug === 'pennylane' ? TOOL_AUTHORS.florent : TOOL_AUTHORS[tool.experts[0] ?? 'benjamin'];
}

/** An editorial guide, without an undocumented numerical product rating. */
export function generateToolArticleSchema(tool: Tool) {
  const author = getToolAuthor(tool);
  const url = `https://www.iteradvisors.com/ressources/outils/${tool.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: getToolReviewTitle(tool),
    description: `Points forts : ${tool.forWho.join(', ')}. Points de vigilance : ${tool.notForWho.join(', ')}.`,
    inLanguage: 'fr-FR',
    about: {
      '@type': 'SoftwareApplication',
      '@id': `${tool.website.replace(/\/$/, '')}#software`,
      name: tool.name,
      url: tool.website,
      applicationCategory: 'BusinessApplication', operatingSystem: 'Web', sameAs: [tool.website],
    },
    author: { '@id': editorialPersonId(author.url) },
    image: `https://www.iteradvisors.com${tool.logo}`,
    publisher: { '@id': 'https://www.iteradvisors.com/#organization' },
    mainEntityOfPage: { '@id': `${url}#webpage` },
    citation: toolSelection[tool.slug]?.source,
    dateModified: PAGE_REVISIONS[`/ressources/outils/${tool.slug}`] ?? TOOLS_REVIEW_DATE,
    datePublished: '2026-09-01',
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

/**
 * HowTo JSON-LD schema for tool implementation guides (TICKET 31).
 * Generates a schema.org/HowTo from a tool's implementationGuide steps,
 * keeping step references aligned with the visible guide.
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
    // schema.org expects an ISO 8601 duration, not a human label such as '2 semaines'.
    ...(/^P(?=\d|T\d)(?:\d+(?:\.\d+)?[YMWD])*(?:T(?:\d+(?:\.\d+)?[HMS])*)?$/.test(totalDuration ?? '') ? { totalTime: totalDuration } : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.step,
      text: s.detail,
      url: `https://www.iteradvisors.com/ressources/outils/${toolSlug}#step${i + 1}`,
    })),
  };
}

/** Page identity kept distinct from its editorial article and the third-party software. */
export function generateToolWebPageSchema(tool: Tool) {
  const article = generateToolArticleSchema(tool);
  return {
    '@context': 'https://schema.org', '@type': 'WebPage',
    '@id': `${article.url}#webpage`, url: article.url,
    name: article.headline, description: article.description, inLanguage: article.inLanguage,
    datePublished: article.datePublished, dateModified: article.dateModified,
    publisher: article.publisher, isPartOf: { '@id': 'https://www.iteradvisors.com/#website' },
    mainEntity: { '@id': article['@id'] },
    ...(tool.slug === 'pennylane' && { reviewedBy: { '@id': personId(PEOPLE.sebastien.slug) }, lastReviewed: PENNYLANE_REVIEWED_AT }),
  };
}
