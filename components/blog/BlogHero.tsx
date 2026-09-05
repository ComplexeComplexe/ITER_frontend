import Image from 'next/image';
import AuthorByline from './AuthorByline';
import ArticleMeta from './ArticleMeta';
import type { AuthorInfo } from './BlogPostLayout';
import type { Locale } from '@/lib/i18n';

interface BlogHeroProps {
  image?: string;
  imageAlt?: string;
  category?: string;
  title: string;
  dek?: string;
  author: AuthorInfo;
  readingTime?: number;
  dateModified?: string;
  locale: Locale;
  articleUrl: string;
}

/** Shared editorial heading; image only when the caller supplies a verified asset. */
export default function BlogHero({ image, imageAlt, category, title, dek, author, readingTime, dateModified, locale, articleUrl }: BlogHeroProps) {
  return (
    <section className="bg-background pt-6 pb-8 lg:pb-12">
      <div className="container max-w-6xl">
        <div className="max-w-3xl">
          {category && <span className="mb-4 inline-flex rounded-full bg-iter-violet/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-iter-violet">{category}</span>}
          <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight text-foreground">{title}</h1>
          {dek && <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{dek}</p>}
          <ArticleMeta locale={locale} date={dateModified} readMinutes={readingTime} shareUrl={articleUrl} shareTitle={title} />
          <div className="border-t border-border/50 pt-5"><AuthorByline author={author} /></div>
          {image && <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-muted"><Image src={image} alt={imageAlt || title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority /></div>}
        </div>
      </div>
    </section>
  );
}
