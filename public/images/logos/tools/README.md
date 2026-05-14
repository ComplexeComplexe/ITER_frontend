# Tool logos — `public/images/logos/tools/`

These files are referenced from:

- `data/tools.ts` (each tool's `logo` field — controls the comparatives,
  fiches outils and category hub pages)
- `components/Outils/ToolPage.tsx` (the "Autres outils" sidebar)
- `components/Outils/ToolHeader.tsx` (display layer — renders the logo
  inside a 96-128 px rounded box with a `bg-gray-50` backdrop)

## Required filenames

The code reads logos by their slug (no extension fallback — the path
must match exactly):

| Slug         | File                                      |
| ------------ | ----------------------------------------- |
| `agicap`     | `public/images/logos/tools/agicap.svg`    |
| `cegid-loop` | `public/images/logos/tools/cegid-loop.png`|
| `fygr`       | `public/images/logos/tools/fygr.png`      |
| `lucca`      | `public/images/logos/tools/lucca.png`     |
| `payfit`     | `public/images/logos/tools/payfit.svg`    |
| `payhawk`    | `public/images/logos/tools/payhawk.png`   |
| `pennylane`  | `public/images/logos/tools/pennylane.svg` |
| `pleo`       | `public/images/logos/tools/pleo.png`      |
| `qonto`      | `public/images/logos/tools/qonto.png`     |
| `revolut-business` | `public/images/logos/tools/revolut-business.png` |
| `sage`       | `public/images/logos/tools/sage.png`      |
| `silae`      | `public/images/logos/tools/silae.png`     |
| `spendesk`   | `public/images/logos/tools/spendesk.svg`  |

## How to update a logo

The current `.svg` files for **agicap**, **payfit**, **pennylane** and
**spendesk** are *placeholders* — small hand-drawn shapes intended to be
swapped out for the official brand assets.

For each vendor, download the official horizontal colour logo on a
white/transparent background from their brand or press kit, then drop
it in this folder under the filename listed above (overwriting the
placeholder). SVG is preferred (scales without artefacts); PNG at
≥ 480 px wide is fine too.

Brand-asset pages (verify the URL is still current at download time):

- PayFit — <https://payfit.com/uk/about-us/press/>
- Agicap — <https://agicap.com/fr/presse/>
- Spendesk — <https://www.spendesk.com/about/> (Press kit)
- Pennylane — <https://www.pennylane.com/fr/presse/>

## After replacing the files

Nothing else to do — `data/tools.ts` already references each file at
the right path, and the page routes pick the data up automatically.
Just commit the new asset(s) and push; Vercel rebuilds on `main` push.
