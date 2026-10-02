# SEO cleanup, 2 October 2026

## Scope and decisions

This is the first implementation batch from the supplied 33-ticket plan, with its unsupported assumptions corrected. It does not claim completion of all tickets, production deployment, recovered rankings, Google reindexing or visual browser verification.

- The French commercial navigation now points to `/daf-externalise`. The role definition remains accessible as “Le métier de DAF” under Resources. The services hub and organisation page link contextually to the commercial pillar.
- The role page introduces the commercial offer through “directeur financier externalisé”; its definition-focused title and H1 remain unchanged.
- The management-control page title specifies PME, budget and margins; three headings describe the need, deliverables and follow-up. Service dates now come from the per-page revision register, matching the sitemap.
- Two English legacy routes now lead directly to the relevant English CFO pages, including two malformed URL aliases. Existing French routes are retained.
- Duplicate breadcrumb generators are removed from 20 software guides, four software categories and two resource hubs. The shared visible breadcrumb remains the source of their structured trail.
- The 20 numerical software scores have no documented scoring grid in the repository. They are removed from the data, visible headers, comparisons and descriptions, while qualitative strengths, limitations, authorship and publisher links remain. Software guides use `Article` with `about: SoftwareApplication`, rather than advertising unsubstantiated ratings. The earlier plan's assertion that these were reviews of Iter itself was incorrect.
- The software hub's undocumented claim of “80 deployments in three years” is replaced with concrete selection criteria. Other claims about observed time savings or client experiences still require a separate evidence review.
- Human estimates such as “2 semaines” are no longer emitted as `HowTo.totalTime`, which expects an ISO 8601 duration. They remain visible as estimates.
- A reusable tool-card component no longer nests category links inside its enclosing link. This is a component safeguard; the current hub has its own card rendering.
- All three jobs are open, as confirmed by Guillaume on 2 October. They remain published and linked from `/jobs`. A sitemap-only crawl did not include that noindex hub, which explains the earlier orphan diagnosis.

## Historical investigation

Compared commits `27b7f7f` (PR146, 12 September), `fb3a071` (PR147, 12 September) and `dc7a0e8` (PR148, 13 September).

PR146 added monthly deliverables and an Opti Digital example to the DAF pillar and updated its modification date. It did not remove the definition, missions or budget, or change its title or H1. PR147 changed a localized mobile menu label. PR148 changed related articles, glossary content, facts, consent handling and sitemap revision handling; its relevant diff did not replace the pillar content or add the glossary DAF redirect.

These comparisons do not establish the cause of the reported ranking decline. The pillar's current main text remains exactly unchanged at 2,120 words against the production crawl captured on 2 October. No automatic restoration to 3,500 words is justified by this evidence.

## Validation

- Production build and indexability check: 231 sitemap URLs, 256 built pages.
- Unit tests: 115 passing tests in 19 files.
- SEO HTTP crawl: 231 pages, 670 hreflang tags checked, no failed check or title over the repository's 60-character threshold. Character count is an internal guard, not a Google requirement.
- Navigation audit: 565 section links and 105 localized contact links, no failure.
- Structured-data audit: 411 questions and 163 images, no mismatch or failed asset response.
- Cleanup-specific HTTP checks: 26 corrected breadcrumb pages, zero pages with duplicated breadcrumb lists, 20 software articles with named authors, preserved jobs accessible from their hub.
- Redirect configuration: 333 rules, no chain, loop or conflicting shadowed rule. Ten changed or protected legacy routes are checked over HTTP with a permanent redirect and a final 200 response.
- TypeScript, changed-file ESLint and diff whitespace checks pass. ESLint reports only an outdated Browserslist data advisory.

Browser access remains unavailable following the platform's security restriction. Mobile appearance, menu behavior in a real browser, Core Web Vitals and conversion performance are not verified by these HTTP checks. The existing consent and conversion unit tests pass, but no advertising or analytics configuration was changed.

Reproduce the rendered checks with a production server:

```sh
npm run build
npx next start --hostname 127.0.0.1 --port 4043
node scripts/audit-seo.mjs http://127.0.0.1:4043
node scripts/audit-navigation.mjs http://127.0.0.1:4043
node scripts/audit-structured-data.mjs http://127.0.0.1:4043
node scripts/audit-seo-cleanup.mjs http://127.0.0.1:4043
node scripts/audit-redirects.mjs
```

## Next batch and prerequisites

No French article or software page has been redirected or removed in this batch.

1. Accounting cost article: preserve its comparable-devis checklist, onboarding costs and total-cost methodology in the accounting guide. Audit that guide's remaining market prices against documented sources before consolidating.
2. HR article: preserve signals, role distinctions and selection questions in the offer page. Retain the actual HR expert; do not attribute RH delivery to a finance author or invent budgets and results.
3. Shared-time article: its first-month calendar and responsibility split can reinforce the service page. Verify whether its onboarding intent warrants keeping a distinct guide; the supplied report itself finds no cannibalization on the exact shared-time queries.
4. Barcelona article: preserve only substantiated local information. Validate ecosystem, subsidies and regulatory claims before incorporating them into the local service page.
5. DAF pricing article: obtain 12-month page/query, backlink and conversion data before moving a currently performing article into the weaker pricing URL. Preserve valuable sections and update all internal links and sitemap entries in the same redirect batch.
6. CFO-role, fiscal and software consolidations: decide against query intent and retained information, not solely a five-click threshold or a word-count quota. Malibou is a payroll product, not cap-table software.

The 1 October export covers 28 days versus the previous 28 days. It reports 534 impressions, zero clicks and position 29.93 on “daf externalisé”, before this implementation. The document's three-month figures cover a different period. Neither is a measurement of this branch's impact.

After production approval: verify the deployed commit, repeat HTTP checks on production, then request recrawling only for materially changed canonical pages. Compare equivalent periods, countries and devices over 4 to 8 weeks; do not present a guaranteed ranking threshold as technical acceptance.
