import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/content/blog-posts";
import { transformArticleHtml } from "@/lib/blog-html-transform";
import { extractToc, injectHeadingIds } from "@/lib/blog-toc";
import { estimateReadMinutes } from "@/lib/blog-read-time";
import GuideFiscalPage from "@/components/pages/GuideFiscalPage";

/**
 * Pillar page of the "Fiscalité Espagne France" cocoon.
 * Created 2026-05-31 (ticket: complete fiscalite cocoon — pillars 2-5).
 *
 * SEO-03 (2026-08-30) — cette page rendait `bareme-irpf-espagne-2026`, une
 * entrée de 2 600 caractères, alors que `impot-revenu-espagne` en compte
 * 12 700 sur le même sujet. Les deux vivaient en parallèle au sitemap et se
 * disputaient la même requête. La page garde son URL — c'est elle qui tient
 * les 125 liens internes — et sert le contenu long ; l'ancienne URL de blog
 * redirige ici.
 *
 * REDESIGN-01 (2026-09-01) — rendu via GuideFiscalPage. La FAQ contenue
 * dans le htmlContent est extraite (transformArticleHtml) et fusionnée avec
 * celle de la page : une seule FAQ visible, un seul FAQPage JSON-LD. Au
 * passage, l'article a été aligné sur le pilier Beckham (sanctions Modelo
 * 720 post-CJUE 2022, règle des 25 %, autónomos depuis 2023) : il les
 * contredisait sur trois points.
 */

const SOURCE_SLUG = "impot-revenu-espagne";
const PATH = "/ressources/fiscalite/impot-revenu-espagne";
const PUBLISHED_DATE = "2026-05-31";
// Date réelle de la dernière révision de fond, jamais celle du build.
const MODIFIED_DATE = "2026-09-01";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  // B5 (W31c 2026-08-02) — le title ouvre sur "taux d'imposition en
  // Espagne", la formulation réellement tapée et de loin la plus grosse des
  // trois requêtes du hub (1 037 impressions, position 8,62, CTR 0,29 %)
  // contre "irpf" (379) et "irpf espagne" (255).
  title: "Impôt sur le revenu en Espagne : barème 2026 | Iter Advisors",
  description: "Barème IRPF 2026 : de 19 % à 47 % tranche par tranche, taux réels par région, comparaison avec la France et cas des résidents français.",
  path: PATH,
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn't crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* FAQ propre à la page ; les Q/R de l'article source s'y ajoutent au rendu. */
const FAQ = [
  {
    question: "Quel est le barème de l'IRPF en Espagne en 2026 ?",
    answer:
      "Le barème étatique général va de 19 % (jusqu'à 12 450 €) à 47 % (au-delà de 300 000 €). Tranches intermédiaires : 24 % de 12 450 à 20 200 €, 30 % de 20 200 à 35 200 €, 37 % de 35 200 à 60 000 €, 45 % de 60 000 à 300 000 €. Le taux final dépend en plus de la part autonome de votre région de résidence.",
  },
  {
    question: "Comment fonctionne la part autonome de l'IRPF ?",
    answer:
      "Chaque communauté autonome (Catalogne, Madrid, Andalousie, Communauté Valencienne…) applique ses propres barèmes et déductions, qui s'ajoutent à la part étatique. Madrid applique des taux autonomes plus bas que la moyenne nationale, tandis que la Catalogne ou la Communauté Valencienne appliquent des taux marginaux supérieurs (pouvant dépasser 50 %).",
  },
  {
    question: "Comment sont imposés les revenus de l'épargne en Espagne ?",
    answer:
      "Les revenus du capital (dividendes, plus-values) sont soumis à un barème distinct, allant de 19 % (jusqu'à 6 000 €) à 28 % (au-delà de 300 000 €). Ils ne suivent pas le barème progressif IRPF du travail.",
  },
];

export default async function Page() {
  const post = blogPosts.fr[SOURCE_SLUG];
  if (!post?.htmlContent) {
    // Fail fast in dev if the blog post is removed or renamed in
    // lib/content/blog-posts.ts so this pillar page doesn't silently render empty.
    throw new Error(`Missing blog post "${SOURCE_SLUG}" for pillar page ${PATH}`);
  }
  const withIds = injectHeadingIds(post.htmlContent);
  // La FAQ de l'article est retirée du corps et fusionnée avec celle de la
  // page : un seul bloc visible, un seul FAQPage. Le lien de sortie qui la
  // suivait est repris dans le CTA.
  const faqStart = withIds.search(/<h2[^>]*id=["']faq["']/i);
  const bodyOnly = faqStart >= 0 ? withIds.slice(0, faqStart) : withIds;
  const { html } = transformArticleHtml(bodyOnly);
  const { faqs: articleFaqs } = transformArticleHtml(withIds);
  const toc = extractToc(bodyOnly).filter((h) => h.level === 2);

  return (
    <GuideFiscalPage
      path={PATH}
      breadcrumbLabel="Impôt sur le revenu"
      h1={post.h1}
      description="Tout savoir sur l'IRPF en Espagne en 2026 : barème étatique 19-47 %, part autonome par région, déductions, revenus de l'épargne. Guide complet."
      author={{ name: "Sébastien Doat", url: "/a-propos/sebastien-doat" }}
      publishedDate={PUBLISHED_DATE}
      modifiedDate={MODIFIED_DATE}
      modifiedLabel="1er septembre 2026"
      badge="Mis à jour en septembre 2026"
      readMinutes={estimateReadMinutes(html)}
      dek={
        <>
          L&apos;IRPF — <em>Impuesto sobre la Renta de las Personas Físicas</em> — est l&apos;impôt
          progressif sur le revenu des résidents fiscaux espagnols. Son barème général va de{" "}
          <strong className="text-foreground">19 % à 47 %</strong>, mais la moitié du taux est fixée
          par la communauté autonome : à revenu égal, un contribuable paie sensiblement plus à
          Barcelone qu&apos;à Madrid. Ce guide détaille les tranches 2026, le régime des impatriés
          (loi Beckham), la déclaration annuelle et la comparaison poste par poste avec la France.
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
        alt: "Impôt sur le revenu en Espagne (IRPF) : barème 2026",
      }}
      kpis={[
        { value: "19–47 %", label: "barème général 2026, six tranches" },
        { value: "24 %", label: "taux fixe sous loi Beckham" },
        { value: "avril–juin", label: "campagne de la renta (Modelo 100)" },
        { value: "8–12 pts", label: "de charges patronales en moins qu'en France" },
      ]}
      essentiel={{
        title: "L'essentiel de l'IRPF en 5 points",
        items: [
          <>
            Un impôt <strong className="text-foreground">progressif en six tranches</strong>, de 19 %
            à 47 % au barème général — dont une moitié est fixée par la communauté autonome,
            d&apos;où des écarts marqués entre Madrid et la Catalogne.
          </>,
          <>
            Résident fiscal (183 jours, ou centre d&apos;intérêts économiques en Espagne) = imposé sur
            ses revenus mondiaux, avec une déclaration annuelle d&apos;avril à juin (Modelo 100).
          </>,
          <>
            Les revenus de l&apos;épargne — dividendes, plus-values — suivent un barème distinct, de
            19 % à 28 %.
          </>,
          <>
            <strong className="text-foreground">Loi Beckham</strong> : 24 % fixe pendant 6 ans sur
            les revenus du travail, sans abattement — avantageuse à partir d&apos;environ 66 à 70 000 €
            de salaire.
          </>,
          <>
            Face à la France, regarder le coût employeur total : les charges patronales sont 8 à 12
            points plus basses en Espagne, ce qui pèse souvent plus que l&apos;IRPF lui-même.
          </>,
        ],
      }}
      toc={toc}
      html={html}
      faqTitle="Questions fréquentes sur l'impôt sur le revenu en Espagne"
      faq={[...FAQ, ...articleFaqs]}
      cta={{
        title: "Vous installer — ou installer une équipe — en Espagne ?",
        text:
          "Barème, communauté autonome, loi Beckham, coût employeur : un diagnostic de 30 minutes suffit à chiffrer votre situation et à sécuriser le calendrier.",
        footnote: (
          <>
            Découvrir{" "}
            <Link href="/daf-externalise-barcelone" className="underline hover:text-white">
              nos DAF externalisés à Barcelone
            </Link>
            .
          </>
        ),
      }}
      related={[
        {
          href: "/ressources/fiscalite/beckham-law",
          img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80",
          alt: "Loi Beckham en Espagne : le régime des impatriés",
          title: "Loi Beckham : conditions 2026, simulation salaire par salaire et limites du régime",
        },
        {
          href: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
          alt: "Comparaison des régimes fiscaux France et Espagne",
          title: "Fiscalité France vs Espagne : IS, charges sociales, TVA — le comparatif complet",
        },
      ]}
      referencesKey="impot-revenu-espagne"
    />
  );
}
