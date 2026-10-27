import Image from "next/image";
import Link from "next/link";
import {
  presentationCatalog, presentationCopy, presentationLabels,
  presentationLocales, presentationPath,
  type PresentationLocale, type PresentationOffer,
} from "@/lib/presentations";

export default function PresentationDownloadPage({ offer, locale }: {
  offer: PresentationOffer;
  locale: PresentationLocale;
}) {
  const document = presentationCatalog[offer][locale];
  const copy = presentationCopy[locale];
  return (
    <main className="min-h-screen bg-[#faf9fd] text-[#17112c]">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <Link href="/presentations" prefetch={false} aria-label={`Iter Advisors · ${copy.back}`} className="rounded bg-[#6038ec] px-4 py-3 text-sm font-bold tracking-wide text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6038ec]">ITER ADVISORS</Link>
          <nav aria-label={copy.language} className="flex flex-wrap gap-1 rounded-xl border border-[#e4dff0] bg-white p-1">
            {presentationLocales.map((language) => (
              <Link key={language} href={presentationPath(offer, language)} prefetch={false} hrefLang={language} lang={language} aria-current={language === locale ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6038ec] ${language === locale ? "bg-[#eee8ff] text-[#4e2dc4]" : "text-[#61596e] hover:bg-[#f7f4ff]"}`}>
                {presentationLabels[language]}
              </Link>
            ))}
          </nav>
        </header>
        <div className="mb-8 mt-12 max-w-2xl sm:mt-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-[#6038ec]">{document.audience}</p>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">{document.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-[#61596e]">{document.description}</p>
        </div>
        <section aria-label={`${copy.preview} ${document.title}`} className="grid items-center gap-8 rounded-2xl border border-[#e4dff0] bg-white p-5 sm:p-8 md:grid-cols-2 md:gap-12">
          <div className="order-1 md:order-2">
            <p className="text-sm font-medium uppercase tracking-wide text-[#6038ec]">PDF · {copy.pages} · {document.size}</p>
            <p className="my-5 text-lg leading-relaxed text-[#61596e]">{copy.help}</p>
            <a href={`/presentations/${document.file}`} download={document.file} type="application/pdf" className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#6038ec] px-5 py-4 text-center font-medium text-white transition-colors hover:bg-[#4e2dc4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6038ec] motion-reduce:transition-none">
              {copy.download}<span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="order-2 mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-[#e4dff0] bg-[#faf9fd] md:order-1">
            <Image src={`/presentations/previews/${offer}/${locale}/page-1.webp`} alt={`${copy.cover} ${document.title} · ${presentationLabels[locale]}`} width={1600} height={2263} unoptimized className="h-auto w-full" />
          </div>
        </section>
      </div>
    </main>
  );
}
