import { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import GuideFiscalPage from "@/components/pages/GuideFiscalPage";
import type { TocHeading } from "@/components/blog/ArticleTOC";

/**
 * Pillar 1 of the "Fiscalité Espagne France" cocoon (Résidence fiscale).
 * Created 2026-05-31 from contenus_piliers_fiscalite.pdf (full content
 * source). Targets the keyword "résidence fiscale espagne" (vol 10, KD 0).
 *
 * REDESIGN-01 (2026-09-01) — rendu via GuideFiscalPage. Le corps reste du
 * JSX (pas de htmlContent source) : il est posé en HTML sémantique simple
 * dans la typographie `.prose-iter-blog`, le sommaire est tenu à la main.
 */

const PATH = "/ressources/fiscalite/residence-fiscale-france-espagne";
const PUBLISHED_DATE = "2026-05-31";
// Date réelle de la dernière révision de fond, jamais celle du build.
const MODIFIED_DATE = "2026-09-01";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Résidence fiscale Espagne vs France 2026 | Iter Advisors",
  description:
    "Comment déterminer votre résidence fiscale entre la France et l'Espagne ? Règle des 183 jours, centre des intérêts économiques et foyer. Guide complet 2026.",
  path: PATH,
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn't crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

const TOC: TocHeading[] = [
  { id: "critere-1-183-jours", level: 2, label: "Critère 1 : la règle des 183 jours" },
  { id: "critere-2-interets-economiques", level: 2, label: "Critère 2 : le centre des intérêts économiques" },
  { id: "critere-3-foyer-familial", level: 2, label: "Critère 3 : le foyer familial" },
  { id: "conflit-residence", level: 2, label: "En cas de conflit de résidence" },
];

/* FAQ : le visible et le FAQPage JSON-LD sont générés depuis ce tableau. */
const FAQ = [
  {
    question: "Quels sont les 3 critères de résidence fiscale en Espagne ?",
    answer:
      "L'administration fiscale espagnole (Hacienda) applique trois critères stricts : (1) la règle des 183 jours de présence physique sur l'année civile, (2) le centre des intérêts économiques (lieu où s'exerce l'activité principale ou se situe la majorité du patrimoine), (3) le centre des intérêts vitaux, c'est-à-dire la résidence habituelle du conjoint non séparé légalement et/ou des enfants mineurs à charge. Il suffit de remplir un seul de ces critères pour être considéré comme résident fiscal en Espagne.",
  },
  {
    question: "Comment fonctionne la règle des 183 jours en Espagne ?",
    answer:
      "Si vous séjournez plus de 183 jours (consécutifs ou non) sur le territoire espagnol au cours d'une année civile (1er janvier au 31 décembre), vous êtes considéré comme résident fiscal espagnol. Les absences sporadiques (vacances, voyages d'affaires) sont comptabilisées comme du temps passé en Espagne, sauf si vous pouvez prouver votre résidence fiscale dans un autre pays via un certificat officiel.",
  },
  {
    question: "Qu'est-ce que le centre des intérêts économiques en fiscalité espagnole ?",
    answer:
      "Même si vous passez moins de 183 jours en Espagne, vous y serez résident fiscal si le centre principal ou la base de vos activités économiques s'y trouve. Concrètement : si la majorité de vos revenus proviennent d'une activité exercée en Espagne, ou si la majorité de votre patrimoine y est située.",
  },
  {
    question: "Le foyer familial peut-il déterminer la résidence fiscale espagnole ?",
    answer:
      "Oui. L'Espagne présume que vous êtes résident fiscal si votre conjoint non séparé légalement et/ou vos enfants mineurs à charge résident habituellement en Espagne. C'est une présomption qui peut être renversée, mais la charge de la preuve vous incombe.",
  },
  {
    question: "Comment résoudre un conflit de résidence fiscale entre la France et l'Espagne ?",
    answer:
      "Quand une personne remplit les critères de résidence fiscale dans les deux pays, les règles de départage (tie-breaker rules) de la convention fiscale franco-espagnole de 1995 s'appliquent dans l'ordre suivant : (1) foyer d'habitation permanent, (2) centre des intérêts vitaux (liens personnels et économiques les plus étroits), (3) séjour habituel, (4) nationalité.",
  },
];

export default function Page() {
  return (
    <GuideFiscalPage
      path={PATH}
      breadcrumbLabel="Résidence fiscale"
      h1="Résidence fiscale France Espagne : comment déterminer où payer ses impôts ?"
      description="Comment déterminer votre résidence fiscale entre la France et l'Espagne ? Règle des 183 jours, centre des intérêts économiques et foyer."
      author={{ name: "Sébastien Doat", url: "/a-propos/sebastien-doat" }}
      publishedDate={PUBLISHED_DATE}
      modifiedDate={MODIFIED_DATE}
      modifiedLabel="1er septembre 2026"
      badge="Mis à jour en septembre 2026"
      readMinutes={4}
      dek={
        <>
          La détermination de la résidence fiscale est la clé de voûte de votre imposition.
          Contrairement à une idée reçue, il ne suffit pas de s&apos;inscrire au consulat ou
          d&apos;obtenir un NIE pour devenir résident fiscal espagnol. L&apos;administration fiscale
          espagnole (<em>Hacienda</em>) applique trois critères stricts, et il suffit d&apos;en
          remplir <strong className="text-foreground">un seul</strong> pour être considéré comme
          résident fiscal en Espagne.
        </>
      }
      heroImage={{
        src: "https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=1200&q=80",
        alt: "Résidence fiscale France-Espagne : les trois critères qui décident où payer ses impôts",
      }}
      kpis={[
        { value: "183 jours", label: "de présence sur l'année civile" },
        { value: "3", label: "critères alternatifs" },
        { value: "1 seul", label: "critère suffit" },
        { value: "4", label: "règles de départage de la convention" },
      ]}
      essentiel={{
        title: "L'essentiel de la résidence fiscale en 4 points",
        items: [
          <>
            Trois critères <strong className="text-foreground">alternatifs</strong> : plus de 183
            jours de présence (consécutifs ou non), centre des intérêts économiques en Espagne, ou
            foyer familial en Espagne. Un seul suffit.
          </>,
          <>
            Les absences sporadiques comptent comme du temps passé en Espagne, sauf à produire un
            certificat de résidence fiscale d&apos;un autre pays.
          </>,
          <>
            NIE, inscription consulaire ou bail ne font pas la résidence fiscale : c&apos;est la
            situation réelle qui compte, et la charge de la preuve vous incombe.
          </>,
          <>
            Résident des deux côtés ? La convention franco-espagnole de 1995 départage, dans
            l&apos;ordre : foyer permanent, centre des intérêts vitaux, séjour habituel, nationalité.
          </>,
        ],
      }}
      toc={TOC}
      faqTitle="Questions fréquentes sur la résidence fiscale"
      faq={FAQ}
      cta={{
        title: "Un doute sur votre statut de résident fiscal ?",
        text:
          "Nos experts vous aident à clarifier votre situation pour éviter tout risque de redressement. Premier échange offert de 30 minutes.",
        footnote: "Nos DAF externalisés à Barcelone traitent ce sujet chaque semaine.",
      }}
      related={[
        {
          href: "/ressources/fiscalite/double-imposition-france-espagne",
          img: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&q=80",
          alt: "Convention fiscale France-Espagne : éviter la double imposition",
          title: "Convention fiscale France-Espagne : qui impose quoi une fois la résidence fixée",
        },
        {
          href: "/ressources/fiscalite/beckham-law",
          img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80",
          alt: "Loi Beckham en Espagne : le régime des impatriés",
          title: "Loi Beckham : devenir résident espagnol sans le barème progressif pendant 6 ans",
        },
      ]}
      referencesKey="residence-fiscale-france-espagne"
    >
      <h2 id="critere-1-183-jours">Critère 1 : la règle des 183 jours (permanence physique)</h2>
      <p>
        Si vous séjournez plus de <strong>183 jours</strong> (consécutifs ou non) sur le territoire
        espagnol au cours d&apos;une année civile (du 1<sup>er</sup> janvier au 31 décembre), vous
        êtes considéré comme résident fiscal espagnol. Les absences sporadiques (vacances, voyages
        d&apos;affaires) sont comptabilisées comme du temps passé en Espagne, sauf si vous pouvez
        prouver votre résidence fiscale dans un autre pays via un certificat officiel.
      </p>

      <h2 id="critere-2-interets-economiques">Critère 2 : le centre des intérêts économiques</h2>
      <p>
        Même si vous passez moins de 183 jours en Espagne, vous y serez résident fiscal si{" "}
        <strong>le centre principal ou la base de vos activités économiques</strong> s&apos;y trouve.
        Par exemple, si la majorité de vos revenus proviennent d&apos;une activité exercée en Espagne
        ou si la majorité de votre patrimoine y est située.
      </p>
      <p>
        C&apos;est précisément ce critère qui distingue un dirigeant{" "}
        <Link href="/daf-externalise-barcelone">installé en Espagne avec une structure française</Link>{" "}
        d&apos;un entrepreneur qui{" "}
        <Link href="/services/gestion-financiere-externalisee">
          pilote une filiale espagnole depuis la France
        </Link>
        : dans le premier cas la résidence fiscale bascule en Espagne, dans le second elle reste
        généralement française.
      </p>

      <h2 id="critere-3-foyer-familial">Critère 3 : le centre des intérêts vitaux (foyer familial)</h2>
      <p>
        L&apos;Espagne présume que vous êtes résident fiscal si{" "}
        <strong>
          votre conjoint(e) non séparé(e) légalement et/ou vos enfants mineurs à charge
        </strong>{" "}
        (votre <strong>foyer familial</strong>) résident habituellement en Espagne. C&apos;est une
        présomption qui peut être renversée, mais la charge de la preuve vous incombe.
      </p>

      <h2 id="conflit-residence">Que se passe-t-il en cas de conflit de résidence ?</h2>
      <p>
        Il arrive fréquemment qu&apos;une personne remplisse les critères de résidence fiscale dans
        les deux pays (par exemple, une famille en Espagne mais des revenus majoritairement en
        France). Dans ce cas, ce sont les « règles de départage » (<em>tie-breaker rules</em>) de la{" "}
        <Link href="/ressources/fiscalite/double-imposition-france-espagne">
          convention fiscale franco-espagnole de 1995
        </Link>{" "}
        qui s&apos;appliquent, dans un ordre précis :
      </p>
      <ol>
        <li>Foyer d&apos;habitation permanent.</li>
        <li>Centre des intérêts vitaux (liens personnels et économiques les plus étroits).</li>
        <li>Séjour habituel.</li>
        <li>Nationalité.</li>
      </ol>
      <p>
        Une fois la résidence espagnole établie, deux obligations suivent presque toujours pour un
        Français : la déclaration de ses biens restés en France via le{" "}
        <Link href="/ressources/fiscalite/modelo-720">Modelo 720</Link>, et l&apos;imposition de ses
        revenus mondiaux au{" "}
        <Link href="/ressources/fiscalite/impot-revenu-espagne">barème de l&apos;IRPF</Link> — sauf
        option pour le régime des impatriés.
      </p>
    </GuideFiscalPage>
  );
}
