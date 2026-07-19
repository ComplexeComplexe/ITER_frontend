"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, X } from "lucide-react";
import type { ResourcesContent, ResourceCard } from "@/lib/content/resources";
import type { Locale } from "@/lib/i18n";

function ResourceImageCard({
  card,
  discover,
}: {
  card: ResourceCard;
  discover: string;
}) {
  return (
    <Link
      href={card.href}
      className="group block relative aspect-[3/4] overflow-hidden rounded-2xl bg-iter-dark"
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-iter-dark/90 via-iter-dark/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        {card.tag && (
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-2">
            {card.tag}
          </span>
        )}
        <h3 className="text-base font-bold text-white mb-3 leading-snug">{card.title}</h3>
        <span className="inline-flex items-center gap-2 text-[13px] font-medium text-iter-violet group-hover:text-white transition-colors">
          {discover}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function ResourcesHub({
  t,
}: {
  t: ResourcesContent;
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("popular");
  const [stickyNav, setStickyNav] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = navSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyNav(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const allCards: Array<ResourceCard & { sectionId: string }> = [
    ...t.fiscaliteSection.cards.map((c) => ({ ...c, sectionId: "fiscalite" })),
    ...t.categories.flatMap((cat) => cat.cards.map((c) => ({ ...c, sectionId: cat.id }))),
  ];

  const filteredCards =
    query.trim().length > 1
      ? allCards.filter(
          (c) =>
            c.title.toLowerCase().includes(query.toLowerCase()) ||
            (c.tag ?? "").toLowerCase().includes(query.toLowerCase())
        )
      : null;

  const navTabs = [
    { id: "popular", label: t.navLabels.popular, href: "#populaires" },
    { id: "fiscalite", label: t.navLabels.fiscalite, href: "#fiscalite" },
    { id: "cas-clients", label: t.navLabels.casClients, href: "#cas-clients" },
    { id: "blog", label: t.navLabels.blog, href: "#blog" },
    { id: "glossaire", label: t.navLabels.glossaire, href: "/ressources/glossaire" },
  ];

  function scrollToSection(id: string, href: string) {
    setActiveTab(id);
    if (href.startsWith("/")) return;
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      const offset = navRef.current?.offsetHeight ?? 64;
      const top = el.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <div>
      {/* Sentinel — marks where the nav should become sticky */}
      <div ref={navSentinelRef} aria-hidden="true" />

      {/* Sticky nav tabs */}
      <div
        ref={navRef}
        className={`z-30 bg-background/95 backdrop-blur-sm border-b border-border transition-shadow ${
          stickyNav ? "sticky top-0 shadow-sm" : ""
        }`}
      >
        <div className="container">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-3">
            {navTabs.map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={(e) => {
                  if (!tab.href.startsWith("/")) {
                    e.preventDefault();
                    scrollToSection(tab.id, tab.href);
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-iter-violet text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </Link>
            ))}

            {/* Search bar — right side */}
            <div className="ml-auto shrink-0 relative flex items-center">
              <Search size={15} className="absolute left-3 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-8 pr-8 py-2 rounded-full text-sm bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-iter-violet/40 w-44 sm:w-56 transition-all"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-muted-foreground hover:text-foreground"
                  aria-label="Effacer la recherche"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search results overlay */}
      {filteredCards !== null && (
        <section className="bg-background py-16">
          <div className="container">
            {filteredCards.length === 0 ? (
              <p className="text-muted-foreground">{t.searchNoResult}</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredCards.map((card, i) => (
                  <ResourceImageCard key={i} card={card} discover={t.discover} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {filteredCards === null && (
        <>
          {/* ── Popular resources ─────────────────────────────────── */}
          <section id="populaires" className="bg-background py-16 lg:py-20">
            <div className="container">
              <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-8">
                {t.popularSection.heading}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.popularSection.resources.map((res, i) => (
                  <Link
                    key={i}
                    href={res.href}
                    className="group flex flex-col gap-2 p-5 rounded-2xl border border-border bg-card hover:border-iter-violet/50 hover:bg-iter-violet/5 transition-all duration-200"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-iter-violet transition-colors leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{res.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-medium text-iter-violet">
                      {t.discover}
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ── Fiscalité France-Espagne ────────────────────────────── */}
          <section id={t.fiscaliteSection.id} className="bg-muted/30 py-16 lg:py-24">
            <div className="container">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 block">
                    {t.fiscaliteSection.heading}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold font-heading">
                    {t.fiscaliteSection.heading}
                  </h2>
                </div>
                <Link
                  href={t.fiscaliteSection.seeAllHref}
                  className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-iter-violet hover:text-white hover:border-iter-violet transition-all duration-300"
                >
                  {t.fiscaliteSection.seeAllLabel}
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.fiscaliteSection.cards.map((card, i) => (
                  <ResourceImageCard key={i} card={card} discover={t.discover} />
                ))}
              </div>
              <div className="mt-6 sm:hidden">
                <Link
                  href={t.fiscaliteSection.seeAllHref}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-iter-violet hover:text-white hover:border-iter-violet transition-all duration-300"
                >
                  {t.fiscaliteSection.seeAllLabel}
                </Link>
              </div>
            </div>
          </section>

          {/* ── Existing categories ────────────────────────────────── */}
          {t.categories.map((category, ci) => (
            <section
              key={ci}
              id={category.id}
              className={ci % 2 === 0 ? "bg-background py-16 lg:py-24" : "bg-muted/30 py-16 lg:py-24"}
            >
              <div className="container">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 block">
                      {category.heading}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold font-heading">{category.heading}</h2>
                  </div>
                  <Link
                    href={category.seeAllHref}
                    className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-iter-violet hover:text-white hover:border-iter-violet transition-all duration-300"
                  >
                    {category.seeAllLabel}
                    <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.cards.map((card, i) => (
                    <ResourceImageCard key={i} card={card} discover={t.discover} />
                  ))}
                </div>
                <div className="mt-6 sm:hidden">
                  <Link
                    href={category.seeAllHref}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-iter-violet hover:text-white hover:border-iter-violet transition-all duration-300"
                  >
                    {category.seeAllLabel}
                  </Link>
                </div>
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
