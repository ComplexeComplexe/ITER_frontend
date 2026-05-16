import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

/**
 * Hero slot for the blog index — visually elevates the most recent
 * article. SEO contract: the target URL is the same as the article's
 * canonical URL, so no duplicate is created. We are styling the card,
 * not minting a new page.
 */
export interface BlogFeaturedData {
  title: string;
  href: string;
  image: string;
  alt: string;
  category: string | null;
  date: string | null;
  readMinutes: number | undefined;
  excerpt: string;
}

interface BlogFeaturedCardProps {
  data: BlogFeaturedData;
  /** Localised CTA on the featured card. */
  cta: string;
  /** Localised eyebrow label above the title ("À la une", "Featured", "Destacado"). */
  eyebrow: string;
  /** Localised suffix for read time. */
  readTimeSuffix: string;
}

export default function BlogFeaturedCard({
  data,
  cta,
  eyebrow,
  readTimeSuffix,
}: BlogFeaturedCardProps) {
  return (
    <Link
      href={data.href}
      className="group block mb-12 lg:mb-16 overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-iter-violet/10"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-muted">
          <Image
            src={data.image}
            alt={data.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-iter-chartreuse bg-iter-violet px-2.5 py-1 rounded-full">
              {eyebrow}
            </span>
            {data.category && (
              <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet">
                {data.category}
              </span>
            )}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground leading-tight mb-4 group-hover:text-iter-violet transition-colors">
            {data.title}
          </h2>
          {data.excerpt && (
            <p className="text-base text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {data.excerpt}
            </p>
          )}
          {(data.date || data.readMinutes) && (
            <p className="mb-6 text-xs text-foreground/55 font-medium">
              {data.date}
              {data.date && data.readMinutes ? " · " : ""}
              {data.readMinutes ? `${data.readMinutes} ${readTimeSuffix}` : ""}
            </p>
          )}
          <span className="inline-flex items-center gap-2 text-sm font-medium text-iter-violet">
            {cta}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
