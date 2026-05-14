"use client";

/**
 * HomePage Hero section — extracted from components/pages/HomePage.tsx
 * (FINAL-03: split massive page components into smaller maintainable
 * chunks). Encapsulates the keyword rotator state and animation so the
 * parent HomePage shrinks below the audit's 1200-line ceiling.
 *
 * Behaviour identical to the original inline section: detects the finance
 * keyword inside `heroTitleRaw`, splits before/keyword/after, and
 * cross-fades between the keyword and its alt every 5 seconds.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";

const ROTATOR_MAP: Record<Locale, { keyword: string; alt: string }> = {
  fr: { keyword: "direction financière", alt: "direction des ressources humaines" },
  en: { keyword: "financial management", alt: "human resources management" },
  es: { keyword: "dirección financiera", alt: "dirección de recursos humanos" },
};

interface HeroSectionProps {
  locale: Locale;
  heroTitleRaw: string;
  heroSubtitle: string;
  heroCtaLabel: string;
  heroCtaUrl: string;
  discoverServicesLabel: string;
  trustfolioLabel: string;
}

export default function HeroSection({
  locale,
  heroTitleRaw,
  heroSubtitle,
  heroCtaLabel,
  heroCtaUrl,
  discoverServicesLabel,
  trustfolioLabel,
}: HeroSectionProps) {
  const rotator = ROTATOR_MAP[locale];
  const keywordIndex = heroTitleRaw.toLowerCase().indexOf(rotator.keyword.toLowerCase());
  const hasRotator = keywordIndex !== -1;

  const heroBefore = hasRotator ? heroTitleRaw.slice(0, keywordIndex) : "";
  const heroKeyword = hasRotator
    ? heroTitleRaw.slice(keywordIndex, keywordIndex + rotator.keyword.length)
    : "";
  const heroAfter = hasRotator ? heroTitleRaw.slice(keywordIndex + rotator.keyword.length) : "";

  const [heroHighlightIndex, setHeroHighlightIndex] = useState(0);
  useEffect(() => {
    if (!hasRotator) return;
    const interval = setInterval(() => {
      setHeroHighlightIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, [hasRotator]);

  const servicesPath = locale === "fr" ? "/services" : `/${locale}/services`;

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: "calc(100vh - 72px)" }}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/bg/bg-hero-3d.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          fetchPriority="high"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-iter-violet/90 via-iter-violet/80 to-iter-dark/90" />
      </div>

      {/* Geometric lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1440 900" fill="none">
          <line x1="0" y1="300" x2="1440" y2="100" stroke="white" strokeWidth="1" />
          <line x1="0" y1="600" x2="1440" y2="400" stroke="white" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="600" y2="900" stroke="white" strokeWidth="0.5" />
          <circle cx="700" cy="450" r="200" stroke="white" strokeWidth="0.5" fill="none" opacity="0.3" />
        </svg>
      </div>

      <div className="container relative z-10 pt-20 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-4xl animate-[fadeInUp_0.8s_ease-out_both]">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5 animate-[fadeInUp_0.7s_ease-out_0.2s_both]">
            {hasRotator ? (
              <>
                {heroBefore}
                <span
                  className="relative inline-block overflow-hidden align-bottom"
                  style={{ minHeight: "1.15em" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroHighlightIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                      style={{ color: heroHighlightIndex === 0 ? "#FFFFFF" : "#AAFF00" }}
                    >
                      {heroHighlightIndex === 0 ? heroKeyword : rotator.alt}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {heroAfter}
              </>
            ) : (
              heroTitleRaw
            )}
          </h1>

          <p className="text-lg lg:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed animate-[fadeInUp_0.7s_ease-out_0.35s_both]">
            {heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.7s_ease-out_0.5s_both]">
            <Link
              href={heroCtaUrl}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-base hover:brightness-105 hover:shadow-xl hover:shadow-iter-chartreuse/20 transition-all duration-300 group"
            >
              <Calendar size={18} />
              {heroCtaLabel}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href={servicesPath}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-all duration-300"
            >
              {discoverServicesLabel}
            </Link>
          </div>

          <a
            href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 animate-[fadeInUp_0.7s_ease-out_0.65s_both]"
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-5 h-5 text-iter-chartreuse fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-base leading-tight">
                5/5 {trustfolioLabel}
              </span>
              <span className="text-white/50 text-xs">Trustfolio</span>
            </div>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
