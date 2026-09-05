import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import ArticleTOC, { type TocHeading } from "./ArticleTOC";

/** Shared reading width, spacing and responsive contents for every article source. */
export default function ArticleBodyLayout({ locale, headings, children }: {
  locale: Locale;
  headings: TocHeading[];
  children: ReactNode;
}) {
  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="container">
        <div className={`flex flex-col max-w-6xl mx-auto ${headings.length ? "xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12" : ""}`}>
          {headings.length > 0 && <div className="order-1 xl:order-none xl:col-start-2 xl:row-start-1"><ArticleTOC locale={locale} headings={headings} /></div>}
          <div data-article-body className="prose-iter-blog w-full min-w-0 max-w-[72ch] mx-auto xl:mx-0 order-2 xl:order-none xl:col-start-1 xl:row-start-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
