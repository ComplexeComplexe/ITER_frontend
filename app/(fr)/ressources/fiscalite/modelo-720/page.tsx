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
 * "modelo-720-declaration-biens-etranger" in lib/content/blog-posts.ts so the
 * pillar and the corresponding /ressources/blog/<slug> article stay in
 * lockstep without duplicating the htmlContent in two places.
 *
 * REDESIGN-01 (2026-09-01) — rendu via GuideFiscalPage (voir ce composant
 * pour le pourquoi). Le corps garde sa source unique ; le gabarit ajoute
 * chapô, image, chiffres clés, « L'essentiel », sommaire et articles liés.
 */

const SOURCE_SLUG = "modelo-720-declaration-biens-etranger";
const PATH = "/ressources/fiscalite/modelo-720";
const PUBLISHED_DATE = "2026-05-31";
// Date réelle de la dernière révision de fond (chiffres clés + essentiel),
// jamais celle du build.
const MODIFIED_DATE = "2026-09-01";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Modelo 720 Espagne : biens à l'étranger | Iter Advisors",
  description: "Résident fiscal en Espagne ? Déclarez vos comptes, assurances-vie et biens immobiliers situés en France via le Modelo 720 si leur valeur dépasse 50 000 €.",
  path: PATH,
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn't crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* FAQ : le visible et le FAQPage JSON-LD sont générés depuis ce tableau. */
const FAQ = [
  {
    question: "Qui doit déclarer le Modelo 720 en Espagne ?",
    answer:
      "Tout résident fiscal en Espagne possédant des biens ou des droits situés à l'étranger dont la valeur totale dépasse 50 000 € dans l'une des trois catégories (comptes bancaires, valeurs/assurances-vie, immobilier). Le seuil s'apprécie par catégorie distincte.",
  },
  {
    question: "Quel est le délai pour déposer le Modelo 720 ?",
    answer:
      "La déclaration doit être effectuée par voie télématique auprès de l'Agencia Tributaria (AEAT) entre le 1er janvier et le 31 mars de l'année suivant l'exercice concerné (par exemple, avant le 31 mars 2026 pour l'exercice 2025).",
  },
  {
    question: "Quelles sont les sanctions Modelo 720 en 2026 ?",
    answer:
      "Suite à la condamnation par la CJUE jugeant les sanctions initiales \"disproportionnées\", les amendes forfaitaires fixes extrêmement lourdes ont été supprimées. Le régime général des sanctions fiscales s'applique désormais, mais l'obligation déclarative reste strictement en vigueur.",
  },
  {
    question: "Faut-il redéposer le Modelo 720 chaque année ?",
    answer:
      "Non. Une fois la première déclaration déposée, une catégorie n'est à redéclarer que si sa valeur augmente de plus de 20 000 € par rapport à la dernière déclaration, ou si vous cessez d'être titulaire d'un bien déclaré.",
  },
  {
    question: "Le Modelo 720 est-il dû sous la loi Beckham ?",
    answer:
      "Non pour le bénéficiaire du régime des impatriés (consulta vinculante DGT V0092/2014), qui n'est pas imposé sur son revenu mondial. Le conjoint résident fiscal ordinaire reste tenu à l'obligation, et l'exemption cesse à la sortie du régime.",
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
  const toc = extractToc(withIds);

  return (
    <GuideFiscalPage
      path={PATH}
      breadcrumbLabel="Modelo 720"
      h1={post.h1}
      description="Résident fiscal en Espagne ? Déclarez vos comptes, assurances-vie et biens immobiliers situés en France via le Modelo 720 si leur valeur dépasse 50 000 €."
      author={{ name: "Florent Greth", url: "/a-propos/florent-greth" }}
      publishedDate={PUBLISHED_DATE}
      modifiedDate={MODIFIED_DATE}
      modifiedLabel="1er septembre 2026"
      badge="Mis à jour en septembre 2026"
      readMinutes={estimateReadMinutes(html)}
      dek={
        <>
          Le Modelo 720 est la déclaration informative que tout résident fiscal espagnol doit
          déposer lorsque ses biens situés hors d&apos;Espagne dépassent{" "}
          <strong className="text-foreground">50 000 €</strong> dans l&apos;une de trois
          catégories : comptes bancaires, valeurs et assurances-vie, immobilier. Aucun impôt
          n&apos;en découle — mais l&apos;obligation est contrôlée, et c&apos;est celle que les
          dirigeants français installés en Espagne oublient le plus souvent.
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1200&q=80",
        alt: "Modelo 720 : déclarer ses biens à l'étranger en Espagne",
      }}
      kpis={[
        { value: "50 000 €", label: "seuil, par catégorie de biens" },
        { value: "3", label: "catégories appréciées séparément" },
        { value: "31 mars", label: "date limite de dépôt" },
        { value: "20 000 €", label: "hausse qui oblige à redéclarer" },
      ]}
      essentiel={{
        title: "L'essentiel du Modelo 720 en 5 points",
        items: [
          <>
            Une <strong className="text-foreground">déclaration informative</strong>, pas un
            impôt : rien à payer, mais le défaut de dépôt reste sanctionné.
          </>,
          <>
            Concerne tout résident fiscal espagnol dont les biens à l&apos;étranger dépassent{" "}
            <strong className="text-foreground">50 000 €</strong> dans l&apos;une des trois
            catégories — comptes, valeurs et assurances-vie, immobilier — appréciées séparément.
          </>,
          <>
            Dépôt <strong className="text-foreground">en ligne uniquement</strong>, sur le site de
            l&apos;AEAT, entre le 1<sup>er</sup> janvier et le 31 mars.
          </>,
          <>
            Depuis l&apos;arrêt de la CJUE de 2022, les amendes forfaitaires ont disparu ; c&apos;est
            le régime général des sanctions fiscales qui s&apos;applique.
          </>,
          <>
            Les grands oubliés : les néobanques (N26, Revolut), l&apos;assurance-vie française, et
            tous les biens restés en France une fois la résidence espagnole acquise.
          </>,
        ],
      }}
      toc={toc}
      html={html}
      faqTitle="Questions fréquentes sur le Modelo 720"
      faq={FAQ}
      cta={{
        title: "Une question fiscale franco-espagnole ?",
        text:
          "Comptes, assurance-vie, immobilier resté en France : un diagnostic de 30 minutes suffit à cadrer votre périmètre déclaratif et à sécuriser votre calendrier.",
        footnote: "Nos DAF externalisés à Barcelone traitent ce sujet chaque semaine.",
      }}
      related={[
        {
          href: "/ressources/fiscalite/double-imposition-france-espagne",
          img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80",
          alt: "Convention fiscale France-Espagne : éviter la double imposition",
          title: "Convention fiscale France-Espagne : qui impose quoi, et comment éviter la double imposition",
        },
        {
          href: "/ressources/fiscalite/beckham-law",
          img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80",
          alt: "Loi Beckham en Espagne : le régime des impatriés",
          title: "Loi Beckham : le régime des impatriés — et pourquoi il dispense du Modelo 720",
        },
      ]}
      referencesKey="modelo-720"
    />
  );
}
