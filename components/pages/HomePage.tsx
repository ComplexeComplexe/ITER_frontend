"use client";

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  TrendingUp,
  PieChart,
  Wallet,
  FileText,
  BarChart3,
  Briefcase,
  Search,
  Lightbulb,
  Cog,
  Rocket,
  Zap,
  Globe,
  Clock,
  Award,
  AlertTriangle,
  Banknote,
  ChevronDown,
  Mail,
  Users,
  UserPlus,
  CreditCard,
  GraduationCap,
  Handshake,
  Heart,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath, BOOKING_URL } from "@/lib/navigation";
import { getHomeContent } from "@/lib/content/home";
import { faqPageSchema, financialServiceSchema } from "@/lib/schemas";
import { fallbackTeamMembers } from "@/lib/content/team";
import type { StrapiTeamMember, CmsNavItem, StrapiHomepage } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";

/* ─── Animated Counter Hook ─── */
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Client Logos ─── */
const clientLogos = [
  { src: "/images/logos/logo-happyscribe.jpg", alt: "Happy Scribe" },
  { src: "/images/logos/logo-impact.jpg", alt: "IMPACT+" },
  { src: "/images/logos/logo-mitiga.jpg", alt: "Mitiga Solutions" },
  { src: "/images/logos/logo-neat.jpg", alt: "Neat" },
  { src: "/images/logos/logo-nuubb.jpg", alt: "NuuBB" },
  { src: "/images/logos/logo-opitdigital.jpg", alt: "OptiDigital" },
  { src: "/images/logos/logo-seasonly.jpg", alt: "Seasonly" },
  { src: "/images/logos/logo-solamente.jpg", alt: "Solamente" },
  { src: "/images/logos/logo-surfe.jpg", alt: "Surfe" },
  { src: "/images/logos/logo-ukio.jpg", alt: "Ukio" },
  { src: "/images/logos/logo-yego.jpg", alt: "Yego" },
];

/* ─── Icons for service cards ─── */
const serviceIcons = [TrendingUp, PieChart, Wallet, FileText, BarChart3, Briefcase];
const hrServiceIcons = [Users, UserPlus, CreditCard, GraduationCap, Handshake, Heart];
const stepIcons = [Search, Lightbulb, Cog, Rocket];
const phaseIcons = [Rocket, TrendingUp, AlertTriangle, Banknote, BarChart3];
const whyIcons = [Zap, Globe, Clock, Award];

/* ─── Hero avatars: driven by Team Member showInHero boolean ─── */

/* ─── Service Card ─── */
function ServiceCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: typeof TrendingUp;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-transparent hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-iter-violet/5 to-transparent" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-iter-violet/10 text-iter-violet">
          <Icon size={22} />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium text-foreground pr-4 group-hover:text-iter-violet transition-colors">
          {q}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-muted-foreground leading-relaxed pr-8">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*                        HOME PAGE                           */
/* ═══════════════════════════════════════════════════════════ */

export default function HomePage({
  locale,
  teamMembers: strapiTeam = [],
  cmsNavigation,
  homepage,
}: {
  locale: Locale;
  teamMembers?: StrapiTeamMember[];
  cmsNavigation?: CmsNavItem[];
  homepage?: StrapiHomepage | null;
}) {
  const t = getHomeContent(locale);
  const contactPath = getContactPath(locale);

  const heroTitle = homepage?.heroTitle || `${t.hero.h1.before}${t.hero.h1.highlight}${t.hero.h1.after}`;
  const heroSubtitle = homepage?.heroSubtitle || t.hero.h2;
  const heroCtaLabel = t.hero.cta;
  const heroCtaUrl = BOOKING_URL;

  const cmsValueProps = homepage?.valuePropositions && homepage.valuePropositions.length > 0
    ? homepage.valuePropositions
    : null;
  const rawCmsStats = homepage?.statistics && homepage.statistics.length > 0
    ? homepage.statistics
    : null;
  // Filter out CMS stats with empty or "0" values (incomplete CMS data)
  const cmsStats = rawCmsStats
    ? rawCmsStats.filter((s) => {
        const val = s.value?.trim() ?? "";
        return val !== "" && val !== "0";
      })
    : null;
  // If all CMS stats were filtered out, fall back to static
  const effectiveCmsStats = cmsStats && cmsStats.length > 0 ? cmsStats : null;
  const cmsWhyChoose = homepage?.whyChooseItems && homepage.whyChooseItems.length > 0
    ? homepage.whyChooseItems
    : null;

  const team = strapiTeam.length > 0 ? strapiTeam : fallbackTeamMembers;
  const heroAvatars = team
    .filter((m) => m.showInHero && m.photo)
    .map((m) => ({
      initials: `${m.firstName?.[0] ?? ""}${m.lastName?.[0] ?? ""}`.toUpperCase(),
      imageUrl: strapiMediaUrl(m.photo),
      name: `${m.firstName} ${m.lastName}`.trim(),
    }));

  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesInView = useInView(servicesRef, {
    once: true,
    margin: "-80px",
  });

  const dafRef = useRef<HTMLDivElement>(null);
  const dafInView = useInView(dafRef, { once: true, margin: "-80px" });

  const processRef = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { once: true, margin: "-80px" });

  const whyRef = useRef<HTMLDivElement>(null);
  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });

  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });

  const successRef = useRef<HTMLDivElement>(null);
  const successInView = useInView(successRef, { once: true, margin: "-80px" });

  const whenRef = useRef<HTMLDivElement>(null);
  const whenInView = useInView(whenRef, { once: true, margin: "-80px" });

  const contactRef = useRef<HTMLDivElement>(null);
  const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* ═══ JSON-LD Schemas ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialServiceSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageSchema(t.faqs.map((faq) => ({ question: faq.q, answer: faq.a })))
          ),
        }}
      />

      {/* ═══ HERO ═══ */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 72px)" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/bg/bg-hero-3d.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-iter-violet/90 via-iter-violet/80 to-iter-dark/90" />
        </div>

        {/* Geometric lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute w-full h-full opacity-10"
            viewBox="0 0 1440 900"
            fill="none"
          >
            <line
              x1="0"
              y1="300"
              x2="1440"
              y2="100"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="600"
              x2="1440"
              y2="400"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="200"
              y1="0"
              x2="600"
              y2="900"
              stroke="white"
              strokeWidth="0.5"
            />
            <circle
              cx="700"
              cy="450"
              r="200"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>

        <div className="container relative z-10 pt-20 pb-12 lg:pt-24 lg:pb-16">
          <div className="max-w-4xl animate-[fadeInUp_0.8s_ease-out_both]">

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5 animate-[fadeInUp_0.7s_ease-out_0.2s_both]">
              {homepage?.heroTitle ? (
                heroTitle
              ) : (
                <>
                  {t.hero.h1.before}
                  <span className="text-iter-chartreuse">
                    {t.hero.h1.highlight}
                  </span>
                  {t.hero.h1.after}
                </>
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
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-all duration-300"
              >
                {t.discoverServices}
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-8 animate-[fadeInUp_0.7s_ease-out_0.65s_both]">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-iter-chartreuse fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/60 text-sm">
                  5/5 {t.trustfolioLabel}{" "}
                  <a
                    href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc/reviews"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline transition-colors"
                  >
                    Trustfolio
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ═══ CLIENT LOGOS ═══ */}
      <section className="py-16 bg-background border-b border-border/50">
        <div className="container mb-8">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
            {t.clientsLabel}
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-16 items-center animate-marquee">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={i}
                className="shrink-0 w-28 h-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={100}
                  height={40}
                  className="object-contain max-h-8"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW ═══ */}
      <section id="services" className="py-24 lg:py-32 bg-background">
        <div className="container">
          <motion.div
            ref={servicesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-20"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
              {locale === "fr" ? "Nos services" : locale === "en" ? "Our services" : "Nuestros servicios"}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {t.servicesHeading}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.servicesSubtitle}
            </p>
          </motion.div>

          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-iter-violet text-white text-sm font-semibold">
                Finance
              </span>
              <div className="h-px flex-1 bg-iter-violet/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.financeServices.map((s, i) => (
                <ServiceCard key={s.title} icon={serviceIcons[i] ?? TrendingUp} title={s.title} desc={s.desc} index={i} />
              ))}
            </div>
          </div>

          <div className="mb-0">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-iter-violet text-white text-sm font-semibold">
                {locale === "fr" ? "Ressources humaines" : locale === "en" ? "Human Resources" : "Recursos humanos"}
              </span>
              <div className="h-px flex-1 bg-iter-violet/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {t.hrServices.map((s, i) => (
                <ServiceCard key={s.title} icon={hrServiceIcons[i] ?? Users} title={s.title} desc={s.desc} index={i + 6} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DAF SECTION ═══ */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container">
          <div
            ref={dafRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={dafInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-iter-violet/10">
                <Image
                  src="/images/bg/daf-section.jpg"
                  alt="Consultants financiers collaborant dans un bureau moderne"
                  width={600}
                  height={520}
                  className="w-full h-[400px] lg:h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-iter-dark/40 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={dafInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -right-4 lg:right-8 bg-white rounded-2xl shadow-xl p-5 border border-border/50"
              >
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-iter-violet">
                      <AnimatedCounter target={15} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Experts CFO
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-iter-violet">
                      <AnimatedCounter target={100} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Clients
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-iter-violet">
                      5/5
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Trustfolio
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={dafInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-iter-violet text-white text-xs font-semibold uppercase tracking-widest mb-4">
                Finance
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
                {t.dafSection.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t.dafSection.paragraph}
              </p>
              <div className="space-y-3 mb-8">
                {t.dafSection.benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={dafInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-iter-violet mt-0.5 shrink-0"
                    />
                    <span className="text-sm text-foreground/80">{b}</span>
                  </motion.div>
                ))}
              </div>
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-iter-violet text-white font-semibold hover:shadow-lg hover:shadow-iter-violet/20 transition-all duration-300"
              >
                {t.dafSection.cta}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS SECTION ═══ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/bg/bg-3d.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-background/90" />

        <div className="container relative z-10" ref={processRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
              {locale === "fr" ? "Notre méthode" : locale === "en" ? "Our method" : "Nuestro método"}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {t.processHeading}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.processSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {t.steps.map((step, i) => {
              const StepIcon = stepIcons[i] ?? Search;
              const num = String(i + 1).padStart(2, "0");
              return (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="relative"
                >
                  {i < t.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[calc(50%+32px)] right-0 h-px bg-gradient-to-r from-iter-violet/30 to-iter-violet/5 z-0" />
                  )}
                  <div className="relative z-10 p-6 rounded-2xl bg-card border border-border/50 hover:border-iter-violet/30 hover:shadow-xl transition-all duration-300 group h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-iter-violet/10 flex items-center justify-center group-hover:bg-iter-violet group-hover:text-white transition-all duration-300">
                        <StepIcon size={24} className="text-iter-violet group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-3xl font-bold text-iter-violet/20 group-hover:text-iter-violet/40 transition-colors">
                        {num}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WHY SECTION ═══ */}
      <section className="relative py-24 lg:py-32 bg-iter-violet overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
            <line
              x1="0"
              y1="200"
              x2="1440"
              y2="100"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="400"
              x2="1440"
              y2="300"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="600"
              x2="1440"
              y2="500"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="300"
              y1="0"
              x2="500"
              y2="800"
              stroke="white"
              strokeWidth="0.5"
            />
            <line
              x1="900"
              y1="0"
              x2="1100"
              y2="800"
              stroke="white"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        <div className="container relative z-10" ref={whyRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {t.whyChoose.heading}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              {t.whySubtitle}
            </p>
          </motion.div>

          {effectiveCmsStats ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {effectiveCmsStats.map((stat, i) => {
                const val = stat.value ?? "";
                const numMatch = val.match(/(\d+)/);
                const numVal = numMatch ? parseInt(numMatch[1], 10) : 0;
                const prefix = val.replace(/\d+.*/, "");
                const suffix = val.replace(/.*?\d+/, "");
                return (
                  <div
                    key={stat.id ?? i}
                    className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-iter-chartreuse mb-2">
                      {prefix}<AnimatedCounter target={numVal} suffix={suffix} />
                    </div>
                    <div className="text-sm text-white/60">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {t.stats.map((stat, i) => {
                const val = stat.value ?? "";
                const numMatch = val.match(/(\d+)/);
                const numVal = numMatch ? parseInt(numMatch[1], 10) : 0;
                const suffix = val.replace(/.*?\d+/, "");
                return (
                  <div
                    key={i}
                    className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <div className="text-4xl lg:text-5xl font-bold text-iter-chartreuse mb-2">
                      <AnimatedCounter target={numVal} suffix={suffix} />
                    </div>
                    <div className="text-sm text-white/60">
                      <strong>{stat.bold}</strong>{stat.rest}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(cmsWhyChoose ?? t.whyChoose.features).map((r, i) => {
              const WhyIcon = whyIcons[i % whyIcons.length];
              return (
                <motion.div
                  key={r.title + i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="p-7 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-iter-chartreuse/20 flex items-center justify-center mb-4 group-hover:bg-iter-chartreuse/30 transition-colors">
                    <WhyIcon size={22} className="text-iter-chartreuse" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {r.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm">
                    {r.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TEAM SECTION ═══ */}
      <section id="about" className="py-24 lg:py-32 bg-muted/30">
        <div className="container" ref={teamRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
                {locale === "fr" ? "À propos" : locale === "en" ? "About" : "Sobre nosotros"}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
                {t.aboutTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.aboutP1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.aboutP2}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={teamInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/bg/bg-hero-3d.jpg"
                alt="Iter Advisors team"
                width={600}
                height={420}
                className="w-full h-[350px] lg:h-[420px] object-cover"
              />
            </motion.div>
          </div>

          <div id="team">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                {t.teamHeading}
              </h3>
              <p className="text-muted-foreground max-w-2xl">
                {t.teamSubtitle}
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {team.map((member, i) => {
                const name = `${member.firstName} ${member.lastName}`.trim();
                const photoUrl = strapiMediaUrl(member.photo);
                const initials = `${member.firstName?.[0] ?? ""}${member.lastName?.[0] ?? ""}`.toUpperCase();
                const linkedin = member.linkedIn || "#";

                return (
                  <motion.a
                    key={member.id}
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={teamInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
                    className="group text-center w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.2rem)]"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-2xl bg-iter-violet overflow-hidden group-hover:shadow-lg group-hover:shadow-iter-violet/20 transition-all duration-300">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg md:text-xl">
                            {initials}
                          </span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm group-hover:text-iter-violet transition-colors">
                      {name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {member.role}
                    </p>
                    {linkedin !== "#" && (
                      <div className="mt-1.5 flex justify-center">
                        <svg
                          className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-iter-violet transition-colors"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SUCCESS STORIES ═══ */}
      <section className="py-24 lg:py-32 bg-background">
        <Script
          src="https://share.trustfolio.co/scripts/embed-v2.js"
          strategy="afterInteractive"
        />
        <div className="container text-center" ref={successRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={successInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
              {locale === "fr"
                ? "Success Stories"
                : locale === "en"
                  ? "Success Stories"
                  : "Success Stories"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-10">
              {t.successHeading}
            </h2>
            <a
              className="trustfolio-widget"
              data-config-id="d_TvhPTQ1j3"
              data-mode="default"
              data-lazyload="true"
              data-initial-height="200"
              target="_blank"
              rel="noopener noreferrer"
              href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
            >
              {t.successHeading}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHEN + FAQ SECTION ═══ */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container" ref={whenRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
              {locale === "fr" ? "Accompagnement" : locale === "en" ? "Support" : "Acompañamiento"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              {t.whenHeading}
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              {t.whenSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {t.phases.map((phase, i) => {
                const PhaseIcon = phaseIcons[i] ?? Rocket;
                return (
                  <motion.div
                    key={phase.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={whenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="relative p-5 rounded-2xl bg-muted/50 border border-border/50 hover:border-iter-violet/30 hover:bg-iter-violet/5 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-iter-violet/10 flex items-center justify-center mb-3 group-hover:bg-iter-violet/20 transition-colors">
                      <PhaseIcon size={18} className="text-iter-violet" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{phase.label}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{phase.desc}</p>
                    {i < t.phases.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-iter-violet/20" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
              {t.faqHeading}
            </h3>
            <div className="bg-card rounded-2xl border border-border/50 p-6 lg:p-8">
              {t.faqs.map((faq) => (
                <FAQItem key={faq.q} {...faq} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ BLOG ═══ */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div className="max-w-lg">
              <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
                Blog
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {t.latestContent.heading}
              </h2>
            </div>
            <Link
              href={t.latestContent.resourcesHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-iter-violet hover:text-white hover:border-iter-violet transition-all duration-300 self-start lg:self-auto"
            >
              {t.latestContent.cta}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.blogCards.map((card, i) => (
              <Link key={i} href={card.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-5 rounded-2xl bg-muted">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2">
                  {t.discover}
                </p>
                <h3 className="text-lg font-semibold group-hover:text-iter-violet transition-colors leading-snug">
                  {card.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT CTA ═══ */}
      <section
        id="contact"
        className="py-24 lg:py-32 bg-iter-chartreuse relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
            <circle
              cx="200"
              cy="300"
              r="300"
              stroke="#0A0A0A"
              strokeWidth="0.5"
              fill="none"
            />
            <circle
              cx="1200"
              cy="200"
              r="200"
              stroke="#0A0A0A"
              strokeWidth="0.5"
              fill="none"
            />
            <line
              x1="0"
              y1="100"
              x2="1440"
              y2="500"
              stroke="#0A0A0A"
              strokeWidth="0.3"
            />
          </svg>
        </div>

        <div className="container relative z-10" ref={contactRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-iter-dark leading-tight mb-6">
              {t.contactHeading}
            </h2>
            <p className="text-lg text-iter-dark/70 leading-relaxed mb-10">
              {t.contactSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-dark text-white font-semibold text-base hover:shadow-xl transition-all duration-300 group"
              >
                {t.hero.cta}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
