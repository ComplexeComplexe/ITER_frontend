# Complete editorial locale parity

The French pages remain the source for structure, data tables, forms, authors and
case-study evidence. Newly complete English and Spanish editorial routes reuse
those original Server Components through `localized-editorial.tsx`. Native
commercial pages and approved partner biographies retain their locale-specific
copy and shared templates.

- `registry.json`: source paths, actual counterparts, source metadata and indexability.
- `paths.json`: minimal public route map imported by client navigation.
- `aliases.json` and `legacy-paths.json`: old addresses mapped to their final counterpart.
- `en.json`, `es.json`: versioned offline translations. No translation API runs on the site.
- `overrides.json`: editorial corrections, financial terminology and confirmed Pennylane facts.
- `assets.json`: translated vector covers with the original layout and branding.
- `landing.json`, `cads.json`: limited client dictionaries for forms and campaign pages.

When editing French content, update both dictionaries in the same PR. Preserve
names, evidence, measurement periods, amounts, source links and distinctions
between experience at Iter and documentation-based analysis. Translate UI and
validation states as well as paragraphs. Never infer a client's result or an
author's review from a translation.

Run `npm run test:unit`, `npm run lint` and `npm run build`. The build inspects
actual rendered HTML for indexability, reciprocal language links, section parity
and unchanged French sentences in translated pages. An HTTP crawl also checks
dynamically rendered pages. Manually review mobile navigation, terminology,
translated SVG labels and mocked form submission before publication.
