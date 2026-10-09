import { describe, expect, it } from 'vitest';
import { tools } from '@/data/tools';
import { generateHowToSchema, generateToolArticleSchema, getToolAuthor } from '../schemas/toolSchemas';

describe('software guides without undocumented scores', () => {
  it('keeps the software subject, named author and dates without claiming a product rating', () => {
    for (const tool of tools) {
      const schema = generateToolArticleSchema(tool);
      expect(schema['@type']).toBe('Article');
      expect(schema.about).toMatchObject({ '@type': 'SoftwareApplication', name: tool.name, url: tool.website });
      expect(schema.author).toEqual({ '@id': `https://www.iteradvisors.com${getToolAuthor(tool).url}#person` });
      expect(schema.dateModified >= schema.datePublished).toBe(true);
      expect(schema).not.toHaveProperty('reviewRating');
      expect(schema).not.toHaveProperty('aggregateRating');
      expect(tool).not.toHaveProperty('rating');
    }
  });

  it('does not confuse a human implementation estimate with a machine-readable duration', () => {
    const steps = [{ step: 'Cadrer', detail: 'Définir le périmètre.' }];
    for (const duration of ['2 semaines', '1-3 semaines', undefined, 'P', 'PT']) {
      expect(generateHowToSchema('Outil', 'outil', steps, duration)).not.toHaveProperty('totalTime');
    }
    expect(generateHowToSchema('Outil', 'outil', steps, 'P2W').totalTime).toBe('P2W');
    expect(generateHowToSchema('Outil', 'outil', steps, 'PT30M').totalTime).toBe('PT30M');
  });
});
