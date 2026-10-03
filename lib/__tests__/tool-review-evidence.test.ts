import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { tools } from '@/data/tools';
import { toolReviews, getToolReviewTitle } from '@/data/toolReviews';
import { toolSelection } from '@/data/toolSelection';
import { getToolDirectory } from '@/data/toolDirectory';
import { generateToolArticleSchema } from '@/lib/schemas/toolSchemas';
describe('tool review evidence and crawlable inventory', () => {
  it('has a distinct selection analysis, sources and existing alternatives for each published review', () => {
    for (const tool of tools) {
      const review = toolReviews[tool.slug];
      expect(review).toBeDefined();
      expect(review.verdict.length).toBeGreaterThan(100);
      expect(toolSelection[tool.slug].source).toMatch(/^https:\/\//);
      expect(getToolReviewTitle(tool).length).toBeLessThanOrEqual(60);
      expect(generateToolArticleSchema(tool).headline).toBe(getToolReviewTitle(tool));
      expect(review.alternatives.length).toBeLessThanOrEqual(3);
      for (const slug of review.alternatives) expect(tools.some(t => t.slug === slug && t.slug !== tool.slug)).toBe(true);
      expect(tool.logoAlt).toBe(`Logo ${tool.name}`);
      if (tool.logo) expect(existsSync(`public${tool.logo}`)).toBe(true);
    }
    expect(new Set(Object.values(toolReviews).map(review => review.verdict)).size).toBe(20);
  });
  it('shares the same review inventory in each hub without inventing translated review routes', () => {
    for (const locale of ['fr', 'en', 'es'] as const) expect(getToolDirectory(locale).map(tool => tool.slug)).toEqual(tools.map(tool => tool.slug));
    expect(toolReviews.pennylane.verdict).toContain('quatre ans');
    expect(toolReviews.pennylane.verdict).toContain('50 %');
    for (const review of Object.values(toolReviews)) {
      expect(review).not.toHaveProperty("rating");
      expect(review).not.toHaveProperty("reviewRating");
      expect(review.verdict).not.toContain("ROI constaté");
    }
  });
});
