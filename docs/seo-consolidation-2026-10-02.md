# French content consolidation, second batch, 2 October 2026

Four overlapping French articles now transfer their useful material to a retained canonical destination:

| Source under /ressources/blog/ | Destination | Material retained |
| --- | --- | --- |
| cout-externalisation-comptable-2026 | /ressources/blog/externalisation-comptable | Comparable quotes, setup/recurring/options/tools, full first-year cost, explicit fictional worked example, FAQ |
| drh-externalise-quand-et-pourquoi | /drh-externalise | Need signals, internal/shared-time/specialist alternatives, responsibilities, selection questions and Borith Biv |
| daf-part-time-tarifs-missions-2026 | /daf-externalise/temps-partage | Illustrative meeting calendar, first-month inputs, responsibility split and evaluation |
| daf-externalise-barcelone-guide-startups-espagnoles | /daf-externalise-barcelone | France-Spain reporting, accountant/gestoria coordination, funding preparation, official resources and budget framing |

Each source responds 301 directly to a 200, self-canonical destination. The source entries are removed from the sitemap, catalog and author/listing resolution. Historical EN/ES aliases for the retired DRH and Barcelona articles skip the old French article. Real EN/ES accounting guides remain published with reciprocal hreflang. Existing source-fragment anchors are retained.

The accounting guide no longer presents unsourced market rates, automatic savings, universal headcount/revenue thresholds, or a guarantee of zero tax reassessment. Its only numeric cost illustration is explicitly fictional and distinguishes time valuation from cash savings. The service remains coordination/pilotage rather than an implicit promise to perform accounting production. Its budget link now leads to the accounting comparison grid rather than DAF retainer prices.

Barcelona no longer repeats unverified ecosystem rank, salary/cost comparisons, tax rules or claimed subsidy success rates. Official ENISA, ACCIO and Barcelona Activa resources were consulted on 2 October 2026. No funding eligibility or award is guaranteed. SolarMente links to the existing documented case and its limits. The FR changes do not rewrite the substantive EN/ES local copy.

The shared local template is now a Server Component: its static content does not require a client boundary. Other interactive components retain their existing boundaries. This affects rendering of local pages in all three languages; the full local HTTP crawl covers them. It is not a measured Core Web Vitals improvement.

## Validation

- Production build and indexability: 227 sitemap URLs, 252 built pages.
- 118 unit tests in 20 files; TypeScript and modified-file ESLint pass.
- Global HTTP audit: 227 pages, 237 distinct internal destinations, 666 hreflang, zero orphan pages or failures.
- FAQ/image audit: 407 questions, 158 images, no failures or FAQ answer differences.
- Navigation: 521 section links, 105 localized contact links, no failures.
- Redirect configuration: 337 rules, zero chains, loops or conflicting shadows.
- Consolidation audit: four FR 301s, four historical localized aliases, retained fragments, no incoming links to retired sources on the 227 pages.
- Independent HTML-parser pass: 230 pages including three confirmed open jobs, no duplicate BreadcrumbList, invalid schema or H1 errors. DAF pillar main text remains identical at 2,120 words.
- First-batch regressions remain green. The GitHub workflow now runs the consolidation, redirect and software-guide regression audits too.

Artifacts and source snapshots: ../../audits/iter-consolidation-lot2-2026-10-02/. Original versions remain recoverable from Git as well.

## Remaining decisions

The currently performing DAF pricing article is retained. Before deciding to move it, retrieve 12-month GSC query/page data, backlinks and conversions. Next content priorities are Paris evidence, the exclusive Fractional CFO/startup angle, transition mandates, and distinct software comparison intents. Gather publishable client roles, periods, baselines, results, methodology and permission before adding metrics or testimonials.

This branch is a draft PR, not production. Local HTTP and source checks do not verify mobile visual layout, actual menu/form interactions, field CWV, indexing, ranking, leads or AI citations. After merge/deployment, verify the deployed commit and repeat production checks before requesting recrawl of changed canonical pages. Measure comparable periods over four to eight weeks, without promising a ranking threshold.
