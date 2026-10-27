import type { Metadata } from "next";
import Link from "next/link";
import styles from "./presentations.module.css";

export const metadata: Metadata = {
  title: "Présentations | Iter Advisors",
  description: "Les présentations Iter Advisors : CFO Tech, CFO PME et direction RH à temps partagé, en français, anglais et espagnol.",
  alternates: { canonical: "https://www.iteradvisors.com/presentations" },
  robots: { index: false, follow: false, noarchive: true },
};

const languages = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
  { code: "es", label: "Español", short: "ES" },
] as const;

type Language = (typeof languages)[number]["code"];
type Document = { file: string; size: string };
type Presentation = {
  title: string;
  audience: string;
  description: string;
  documents: Partial<Record<Language, Document>>;
};

const presentations: Presentation[] = [
  {
    title: "CFO Tech",
    audience: "Startups & scale-ups",
    description: "Direction financière, business plan, trésorerie, levée de fonds et accompagnement de la croissance.",
    documents: {
      fr: { file: "iter-advisors-cfo-tech-fr.pdf", size: "2,3 Mo" },
      en: { file: "iter-advisors-cfo-tech-en.pdf", size: "2,2 Mo" },
      es: { file: "iter-advisors-cfo-tech-es.pdf", size: "2,3 Mo" },
    },
  },
  {
    title: "CFO PME",
    audience: "PME · SMBs · PYMEs",
    description: "Pilotage financier, contrôle de gestion, comptabilité, fiscalité et coordination des fonctions de l’entreprise.",
    documents: {
      fr: { file: "iter-advisors-cfo-pme-fr.pdf", size: "2,4 Mo" },
      en: { file: "iter-advisors-cfo-smbs-en.pdf", size: "2,2 Mo" },
      es: { file: "iter-advisors-cfo-pymes-es.pdf", size: "2,4 Mo" },
    },
  },
  {
    title: "Direction RH",
    audience: "Fractional HR",
    description: "Structuration RH, recrutement, rémunération, développement des équipes et organisation.",
    documents: {
      en: { file: "iter-advisors-hr-en.pdf", size: "2,3 Mo" },
      es: { file: "iter-advisors-hr-es.pdf", size: "2,5 Mo" },
    },
  },
];

export default function PresentationsPage() {
  return (
    <main className="min-h-screen bg-[#faf9fd] text-[#17112c]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <Link href="/" prefetch={false} className="inline-block rounded bg-[#6038ec] px-4 py-3 text-sm font-bold tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6038ec]">
          ITER ADVISORS
        </Link>
        <header className="mb-10 mt-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.16em] text-[#6038ec]">Finance & Ressources humaines</p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">Nos présentations</h1>
          <p className="mt-5 text-lg leading-relaxed text-[#61596e]">Choisissez votre offre et votre langue. Chaque présentation est disponible au format PDF, en trois pages.</p>
        </header>
        <div className="grid gap-5 lg:grid-cols-3">
          {presentations.map((presentation) => (
            <section key={presentation.title} className="flex flex-col rounded-2xl border border-[#e4dff0] bg-white p-6 sm:p-7">
              <p className="text-sm font-medium text-[#6038ec]">{presentation.audience}</p>
              <h2 className="mt-2 font-heading text-2xl font-bold">{presentation.title}</h2>
              <p className="mb-7 mt-3 flex-1 leading-relaxed text-[#61596e]">{presentation.description}</p>
              <ul className="space-y-2">
                {languages.map((language) => {
                  const document = presentation.documents[language.code];
                  return (
                    <li key={language.code}>
                      {document ? (
                        <a href={`/presentations/${document.file}`} hrefLang={language.code} data-language={language.code} type="application/pdf" className={`${styles.languageLink} flex min-h-14 items-center justify-between gap-3 rounded-lg px-4 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6038ec]`} aria-label={`${presentation.title} : ouvrir le PDF en ${language.label}, ${document.size}`}>
                          <span lang={language.code} className="font-medium">{language.label}</span>
                          <span className="whitespace-nowrap text-sm text-[#61596e]">PDF · {document.size} <span aria-hidden="true">↗</span></span>
                        </a>
                      ) : (
                        <div className="flex min-h-14 items-center justify-between gap-3 rounded-lg bg-[#f8f7fa] px-4 py-3 text-[#6e6679]">
                          <span>{language.label}</span><span className="text-sm">Non disponible</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <section className="mt-6 rounded-2xl border border-[#e4dff0] bg-white p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-7" aria-labelledby="partners-title">
          <div>
            <h2 id="partners-title" className="font-heading text-xl font-bold">Présentation partenaires</h2>
            <p className="mt-2 text-[#61596e]">Une présentation de l’offre finance, des références et des missions pour les partenaires d’Iter Advisors.</p>
          </div>
          <a href="/presentations/iter-advisors-partenaires-fr.pdf" hrefLang="fr" data-language="fr" type="application/pdf" className={`${styles.languageLink} mt-5 inline-flex min-h-12 shrink-0 items-center rounded-lg px-5 py-3 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6038ec] sm:mt-0`}>Français · PDF <span className="ml-3" aria-hidden="true">↗</span></a>
        </section>
        <p className="mt-8 text-sm text-[#61596e]">Iter Advisors · Finance & RH · France et Espagne</p>
      </div>
    </main>
  );
}
