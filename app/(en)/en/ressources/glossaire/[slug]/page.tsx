import { Metadata } from "next";
import { notFound } from "next/navigation";
import GlossaryEntryPage from "@/components/pages/GlossaryEntryPage";
import { buildMetadata } from "@/lib/metadata";
import { getGlossaryEntryContent } from "@/lib/content/glossary-entries";
import { getCmsNavigation } from "@/lib/static-content";

/**
 * Fiches de glossaire en anglais.
 *
 * TRAFIC-01 (2026-08-31) — `/ressources/glossaire/cfo`, une page **française**,
 * se classait sur 19 requêtes anglophones totalisant 15 460 recherches
 * mensuelles : « cfo meaning » et « chief financial officer definition » en
 * position 16, « chief financial officer meaning » en 33, « cfo » en 52. Elle
 * n'en captait que 0,2 %, ce qui est le rendement attendu d'une page dans la
 * mauvaise langue.
 *
 * Le contenu anglais existait pourtant déjà dans `glossary-entries.ts` — il
 * n'avait simplement aucune route pour le servir. Trois entrées seulement sont
 * traduites : les lister explicitement évite de générer des pages anglaises
 * vides pour les dix autres slugs français.
 */
const SLUGS_TRADUITS = ["cfo", "bfr", "ebitda"] as const;

/**
 * Slug français canonique de chaque fiche anglaise. `bfr` est le cas croisé :
 * le contenu anglais vit sous cette clé, mais côté français
 * `/ressources/glossaire/bfr` redirige vers `besoin-fonds-roulement-bfr` —
 * déclarer `bfr` en alternate FR pointerait vers une redirection.
 */
const SLUG_FR: Record<string, string> = {
  cfo: "cfo",
  ebitda: "ebitda",
  bfr: "besoin-fonds-roulement-bfr",
};

export async function generateStaticParams() {
  return SLUGS_TRADUITS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getGlossaryEntryContent("en", slug);
  if (!content) return { title: "Not found" };

  return buildMetadata({
    locale: "en",
    title: content.meta.title,
    description: content.meta.description,
    path: `/ressources/glossaire/${slug}`,
    // La fiche existe en français et en anglais, jamais en espagnol.
    localizedPaths: {
      fr: `/ressources/glossaire/${SLUG_FR[slug] ?? slug}`,
      en: `/ressources/glossaire/${slug}`,
      es: `/ressources/glossaire/${slug}`,
    },
    disableHreflang: ["es"],
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getGlossaryEntryContent("en", slug);
  if (!content) notFound();

  const cmsNavigation = await getCmsNavigation("en");
  return <GlossaryEntryPage locale="en" content={content} cmsNavigation={cmsNavigation} slug={slug} />;
}
