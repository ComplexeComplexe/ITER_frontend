import { Metadata } from "next";
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
 * Body content is sourced from the validated blog post at slug
 * "double-imposition-france-espagne-convention" in lib/content/blog-posts.ts
 * so the pillar and the article stay in lockstep.
 *
 * REDESIGN-01 (2026-09-01) — rendu via GuideFiscalPage. C'est la page la
 * plus vue du site en organique (14 000 impressions / 90 j, position 7) :
 * elle se rendait sans hiérarchie de titres ni tableau lisible.
 */

const SOURCE_SLUG = "double-imposition-france-espagne-convention";
const PATH = "/ressources/fiscalite/double-imposition-france-espagne";
const PUBLISHED_DATE = "2026-05-31";
// Date réelle de la dernière révision de fond, jamais celle du build.
const MODIFIED_DATE = "2026-09-01";

// SEO-04 (S31 2026-07-27) — le champ sémantique dominant côté requêtes est
// "convention fiscale", pas "double imposition" : "retraite espagne
// convention" (2 173 impressions, position 17,34, 0 clic) et "convention
// fiscale france espagne" (388, 9,54, 0 clic) ne sont pas servies par
// l'ancien title.
export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Convention fiscale France-Espagne 2026",
  description: "Double imposition, résidence fiscale, retraites, dividendes, plus-values : ce que prévoit la convention France Espagne et comment l'appliquer en 2026.",
  path: PATH,
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn't crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* FAQ : le visible et le FAQPage JSON-LD sont générés depuis ce tableau. */
const FAQ = [
  {
    question: "Comment fonctionne la convention fiscale franco-espagnole ?",
    answer:
      "La France et l'Espagne ont signé une convention fiscale bilatérale le 10 octobre 1995. Elle établit que c'est la résidence fiscale qui détermine quel État a le droit d'imposer vos revenus mondiaux. Si vous êtes résident fiscal en Espagne, vous devez déclarer l'ensemble de vos revenus (français et espagnols) à l'Hacienda.",
  },
  {
    question: "Qu'est-ce que la méthode du crédit d'impôt ?",
    answer:
      "C'est la méthode la plus courante (applicable notamment aux dividendes, intérêts et redevances). L'Espagne calcule l'impôt sur votre revenu global, puis déduit de cet impôt le montant que vous avez déjà payé en France, dans la limite de l'impôt espagnol correspondant à ce revenu.",
  },
  {
    question: "Qu'est-ce que la méthode de l'exemption avec progressivité ?",
    answer:
      "Applicable notamment aux revenus immobiliers de source française ou aux pensions de retraite de la fonction publique française. Ces revenus ne sont imposables qu'en France, mais l'Espagne exige que vous les déclariez : ils sont pris en compte pour déterminer le taux d'imposition applicable à vos autres revenus espagnols (taux effectif).",
  },
  {
    question: "Comment sont imposées les pensions de retraite françaises d'un résident espagnol ?",
    answer:
      "Les pensions publiques françaises (fonction publique) restent imposables uniquement en France, avec exemption à progressivité côté espagnol. Les autres revenus d'un résident fiscal espagnol sont déclarés en Espagne, l'impôt éventuellement payé en France étant neutralisé par le crédit d'impôt prévu par la convention.",
  },
  {
    question: "Quel formulaire utiliser côté français pour éviter la double imposition ?",
    answer:
      "Côté français, pour déclarer des revenus de source étrangère tout en évitant la double imposition, il faut utiliser le formulaire spécifique 2047 en complément de la déclaration classique 2042.",
  },
  {
    question: "Les expatriés qui s'installent en Espagne peuvent-ils bénéficier de la loi Beckham ?",
    answer:
      "Oui. La loi Beckham (régime impatrié espagnol) permet aux personnes qui s'installent en Espagne après 5 ans de résidence à l'étranger d'être imposées à un taux forfaitaire de 24 % sur leurs revenus de source espagnole (jusqu'à 600 000 €), pendant 6 ans — au lieu du barème progressif de l'IRPF (jusqu'à 47 %). Ce régime spécial est totalement distinct de la convention de double imposition franco-espagnole, mais les deux s'articulent : les revenus de source française restent imposables en France, les revenus de source espagnole à 24 % sous Beckham.",
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
  const { html } = transformArticleHtml(withIds);
  const toc = extractToc(withIds).filter((h) => h.level === 2);

  return (
    <GuideFiscalPage
      path={PATH}
      breadcrumbLabel="Convention fiscale"
      h1={post.h1}
      description="Comment fonctionne la convention fiscale franco-espagnole de 1995 ? Méthodes du crédit d'impôt et de l'exemption avec progressivité pour éviter la double imposition."
      author={{ name: "Florent Greth", url: "/a-propos/florent-greth" }}
      publishedDate={PUBLISHED_DATE}
      modifiedDate={MODIFIED_DATE}
      modifiedLabel="1er septembre 2026"
      badge="Mis à jour en septembre 2026"
      readMinutes={estimateReadMinutes(html)}
      dek={
        <>
          Signée le 10 octobre 1995, la convention fiscale entre la France et l&apos;Espagne
          détermine, catégorie de revenu par catégorie, lequel des deux États peut imposer — et
          neutralise la double imposition par deux mécanismes :{" "}
          <strong className="text-foreground">le crédit d&apos;impôt</strong> et{" "}
          <strong className="text-foreground">l&apos;exemption avec progressivité</strong>. Ce guide
          détaille son application aux salaires, dividendes, loyers et pensions, les formulaires des
          deux côtés, et son articulation avec le Modelo 720 et la loi Beckham.
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80",
        alt: "Convention fiscale France-Espagne : éviter la double imposition en 2026",
      }}
      kpis={[
        { value: "1995", label: "convention signée le 10 octobre" },
        { value: "15 %", label: "retenue max. sur les dividendes" },
        { value: "10 %", label: "retenue max. sur les intérêts" },
        { value: "2", label: "méthodes : crédit d'impôt, exemption" },
      ]}
      essentiel={{
        title: "L'essentiel de la convention en 5 points",
        items: [
          <>
            <strong className="text-foreground">La résidence fiscale décide</strong> : l&apos;État de
            résidence impose les revenus mondiaux, l&apos;autre ne conserve qu&apos;un droit limité sur
            les revenus qui prennent leur source chez lui.
          </>,
          <>
            <strong className="text-foreground">Crédit d&apos;impôt</strong> pour les dividendes,
            intérêts et redevances : l&apos;impôt payé en France se déduit de l&apos;impôt espagnol
            correspondant.
          </>,
          <>
            <strong className="text-foreground">Exemption avec progressivité</strong> pour les
            revenus immobiliers français et les pensions publiques : imposés en France seulement,
            mais comptés pour fixer le taux espagnol.
          </>,
          <>
            Retenues à la source plafonnées : 15 % sur les dividendes (5 % au-delà de 25 % de
            participation), 10 % sur les intérêts, 5 % sur les redevances.
          </>,
          <>
            Formulaires : 2047 + 2042 côté français, Modelo 100 côté espagnol — et Modelo 720 dès
            50 000 € de biens conservés en France.
          </>,
        ],
      }}
      toc={toc}
      html={html}
      faqTitle="Questions fréquentes sur la convention France-Espagne"
      faq={FAQ}
      cta={{
        title: "Une situation transfrontalière à structurer ?",
        text:
          "Salaires, dividendes, loyers, pensions : un diagnostic de 30 minutes suffit à identifier quel État impose quoi et à sécuriser vos déclarations des deux côtés.",
        footnote: "Nos DAF externalisés à Barcelone accompagnent ces dossiers chaque semaine.",
      }}
      related={[
        {
          href: "/ressources/fiscalite/residence-fiscale-france-espagne",
          img: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=600&q=80",
          alt: "Résidence fiscale France-Espagne : les trois critères",
          title: "Résidence fiscale France-Espagne : les 3 critères qui décident où vous payez vos impôts",
        },
        {
          href: "/ressources/fiscalite/modelo-720",
          img: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=600&q=80",
          alt: "Modelo 720 : déclarer ses biens à l'étranger en Espagne",
          title: "Modelo 720 : l'obligation déclarative des biens conservés en France",
        },
      ]}
      referencesKey="double-imposition-france-espagne"
    />
  );
}
