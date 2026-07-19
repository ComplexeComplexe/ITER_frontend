# Hero illustrations — `public/images/illustrations/`

This folder holds the 5 photographic illustration slots used on Iter
Advisors' core pages. The committed `.svg` files are **placeholders**
(simple brand-coloured gradients) so each page still renders cleanly
until the real photo lands. To go live with the actual photos, you
either:

1. **Same path, same filename** — save your photo as SVG and overwrite
   the placeholder file, OR
2. **New extension** — drop your `.webp` (preferred) or `.jpg` at the
   same path, then change the file extension in the matching page
   reference. The page reference is one line per file, listed below.

Recommended source: 1200 × 630 px (16:9), `.webp` compressed at
quality 85. Add a meaningful `alt` only if you change the slot's
purpose — the current alt texts are already in the code and describe
the intended photo.

## The 5 slots

| File                          | Page                                                | Code reference                                              |
| ----------------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| `cfo-data-dashboards.svg`     | `/daf-externalise` hero                             | `components/pages/DafPage.tsx`                              |
| `accounting-handover.svg`     | `/services/comptabilite-externalisation` hero       | `components/pages/ComptabiliteExternalisationPage.tsx`      |
| `team-video-call.svg`         | `/daf-externalise/temps-partage` hero               | `app/daf-externalise/temps-partage/page.tsx` (heroImage prop) |
| `pricing-roi-tablet.svg`      | `/daf-externalise/tarifs` hero                      | `app/daf-externalise/tarifs/page.tsx` (heroImage prop)      |
| `business-handshake.svg`      | *unassigned* — earmarked for `/contact` or homepage | *(not yet referenced — wire it where it fits)*              |

## What each slot represents

The intended photo for each filename:

- **cfo-data-dashboards** — A finance professional in front of one or
  several screens showing dashboards, charts, KPIs. Conveys "CFO
  piloting in real time". Used as the right-hand hero illustration on
  the main `/daf-externalise` pillar page.

- **accounting-handover** — Two people across a desk, one handing
  documents to the other, a laptop with a spreadsheet visible.
  Conveys "passing the bookkeeping to your accountant". Top-of-page
  banner on the accounting outsourcing service.

- **team-video-call** — A person at a laptop with a multi-person video
  grid on a second screen. Conveys "remote / fractional teamwork".
  Right-hand hero on the fractional CFO page.

- **pricing-roi-tablet** — A person studying a tablet showing pricing
  tiers and a ROI / pie chart on the laptop next to it. Conveys
  "deciding which package fits". Right-hand hero on the pricing page.

- **business-handshake** — Two professionals shaking hands across a
  desk, a signed document and pen in foreground. Conveys "deal
  closed, partnership". Not yet wired into any page — drop the file
  here and add an `<Image src="/images/illustrations/business-handshake.svg"
  alt="…" />` wherever fits (typical candidate: `/contact` page
  between hero and form, or homepage "process" section).

## Regenerating the placeholders

If you delete the SVGs and want them back, run:

```bash
npx tsx scripts/generate-illustration-placeholders.ts
```

The generator lives at `scripts/generate-illustration-placeholders.ts`.
