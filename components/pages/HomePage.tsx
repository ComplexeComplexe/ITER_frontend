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
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import { getHomeContent } from "@/lib/content/home";
import type { StrapiTeamMember } from "@/lib/strapi";
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

/* ─── Finance Services ─── */
const financeServices = [
  {
    icon: TrendingUp,
    title: "DAF externalisé",
    desc: "Un directeur financier dédié à temps partagé pour structurer et piloter votre fonction finance.",
  },
  {
    icon: PieChart,
    title: "Contrôle de gestion",
    desc: "Tableaux de bord, reporting et analyse de performance pour des décisions éclairées.",
  },
  {
    icon: Wallet,
    title: "Gestion de trésorerie",
    desc: "Prévisionnel de trésorerie, optimisation du BFR et pilotage de la liquidité.",
  },
  {
    icon: FileText,
    title: "Externalisation comptable",
    desc: "Une comptabilité aux plus hauts standards, libérant votre temps pour l'essentiel.",
  },
  {
    icon: BarChart3,
    title: "Levée de fonds",
    desc: "Accompagnement stratégique pour sécuriser vos financements et convaincre les investisseurs.",
  },
  {
    icon: Briefcase,
    title: "M&A & Due Diligence",
    desc: "Conseil en fusions-acquisitions et audits financiers pour sécuriser vos opérations.",
  },
];

/* ─── DAF Benefits ─── */
const dafBenefits = [
  "Opérationnel dès le 1er jour d'accompagnement",
  "Expertise sectorielle approfondie (startups, PME, scale-ups)",
  "Maîtrise des outils digitaux pour moderniser vos processus",
  "Interlocuteur dédié à votre dossier",
  "Flexibilité : quelques jours par semaine ou par mois",
];

/* ─── Process Steps ─── */
const steps = [
  {
    icon: Search,
    num: "01",
    title: "Diagnostic",
    desc: "Nous analysons votre situation financière actuelle, identifions les enjeux prioritaires et définissons un plan d'action adapté.",
  },
  {
    icon: Lightbulb,
    num: "02",
    title: "Stratégie",
    desc: "Nous co-construisons avec vous une feuille de route claire, avec des objectifs mesurables et des jalons concrets.",
  },
  {
    icon: Cog,
    num: "03",
    title: "Mise en oeuvre",
    desc: "Nos experts s'intègrent à votre équipe et déploient les solutions : outils, processus, reporting et pilotage opérationnel.",
  },
  {
    icon: Rocket,
    num: "04",
    title: "Pilotage continu",
    desc: "Nous assurons un suivi régulier, ajustons la stratégie et vous accompagnons dans la durée pour pérenniser vos acquis.",
  },
];

/* ─── Why Reasons ─── */
const reasons = [
  {
    icon: Zap,
    title: "Opérationnel immédiatement",
    desc: "Nos experts s'intègrent dès le premier jour, comme un membre de votre équipe. Pas de période d'adaptation longue.",
  },
  {
    icon: Globe,
    title: "Finance & RH au même endroit",
    desc: "Une proposition de valeur unique : couvrir vos fonctions Finance et RH avec une seule équipe.",
  },
  {
    icon: Clock,
    title: "Flexibilité totale",
    desc: "Quelques jours par semaine ou par mois, depuis vos bureaux ou à distance. Nous nous adaptons à vos besoins réels.",
  },
  {
    icon: Award,
    title: "Esprit entrepreneurial",
    desc: "Une expérience reconnue dans les secteurs de l'innovation, pour des startups et PME, souvent dans un contexte international.",
  },
];

/* ─── When Phases ─── */
const phases = [
  {
    icon: Rocket,
    label: "Lancement",
    desc: "Structurez vos fonctions finance dès le départ pour poser des bases solides.",
  },
  {
    icon: TrendingUp,
    label: "Croissance",
    desc: "Accompagnez votre scaling avec des processus financiers adaptés à votre rythme.",
  },
  {
    icon: AlertTriangle,
    label: "Gestion de crise",
    desc: "Stabilisez votre trésorerie dans les moments critiques.",
  },
  {
    icon: Banknote,
    label: "Levée de fonds",
    desc: "Préparez et sécurisez vos financements avec des données certifiées.",
  },
  {
    icon: BarChart3,
    label: "Post-levée",
    desc: "Structurez votre croissance post-financement avec rigueur et agilité.",
  },
];

/* ─── FAQs ─── */
const faqs = [
  {
    q: "Qu'est-ce qu'un DAF externalisé ?",
    a: "Un DAF externalisé est un directeur financier qui travaille à temps partiel ou sur une base contractuelle pour des entreprises qui n'ont pas besoin ou ne peuvent pas se permettre un poste à temps plein. Ils apportent leur expertise pour aider à la gestion stratégique et opérationnelle.",
  },
  {
    q: "Quels types d'entreprises ont besoin de ces services ?",
    a: "Nos services s'adressent principalement aux startups, PME et scale-ups en phase de lancement, croissance, restructuration ou levée de fonds. Toute entreprise qui souhaite structurer ses fonctions support sans recruter à temps plein peut bénéficier de notre accompagnement.",
  },
  {
    q: "Combien de temps un expert doit-il consacrer à mon entreprise ?",
    a: "Cela dépend de vos besoins. Nous proposons des interventions de quelques jours par semaine à quelques jours par mois. La flexibilité est au coeur de notre modèle pour s'adapter à votre réalité opérationnelle.",
  },
  {
    q: "Comment se passe la transition avec un expert externalisé ?",
    a: "Nos experts sont opérationnels dès le premier jour. Nous commençons par un diagnostic rapide de votre situation, puis nous mettons en place un plan d'action concret. L'intégration se fait naturellement, comme un membre de votre équipe.",
  },
  {
    q: "Quelle est la différence entre un DAF externalisé et un comptable ?",
    a: "Un comptable gère la tenue des comptes et les obligations déclaratives. Un DAF externalisé va bien au-delà : stratégie financière, pilotage de la performance, levée de fonds, relations investisseurs, optimisation des coûts et structuration de la croissance.",
  },
];

/* ─── Hero avatars (experts +15) ─── */
const HERO_AVATARS = [
  {
    initials: "SD",
    imageUrl:
      "https://www.iteradvisors.com/wp-content/uploads/2025/02/Sebastien-Doat.jpg",
  },
  {
    initials: "BZ",
    imageUrl:
      "https://www.iteradvisors.com/wp-content/uploads/2025/02/Benjamin-Ziza-1.jpg",
  },
  {
    initials: "GR",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4E03AQGgR2KbIfoKCw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1654078467159?e=1773273600&v=beta&t=8hcsomErfYQ2A3YhCbNXCkPukxjUmhkvn8wFbOdr240",
  },
  {
    initials: "QM",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4D03AQFIqGv0Fsti8Q/profile-displayphoto-shrink_800_800/B4DZWkDql6HYAg-/0/1742214179833?e=1773273600&v=beta&t=mApj3PPgDtL75V5I27El7Mo3_Yb37uMs8BN70L_a49g",
  },
  {
    initials: "DA",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/D4E03AQFdSVqXJcbnMg/profile-displayphoto-crop_800_800/B4EZqSdmfUKoAI-/0/1763393826063?e=1773273600&v=beta&t=0l230nbTC-dwqYTq-6KjM7k_FDIXd6upB1A-51JiXJw",
  }, // pas d'image fournie — remplacer par l'URL si disponible
];

/* ─── Team ─── */
const team = [
  { name: "Sébastien Doat", role: "Co-fondateur & CFO", initials: "SD" },
  { name: "Benjamin Ziza", role: "Co-fondateur & CFO", initials: "BZ" },
  { name: "Guillaume Rostand", role: "Founding Partner & CMO", initials: "GR" },
  { name: "Quico Montuenga Rios", role: "Fractional CFO", initials: "QM" },
  { name: "Deisy Arias Ramirez", role: "Fractional CFO", initials: "DA" },
  { name: "Florent Greth", role: "Fractional CFO", initials: "FG" },
  { name: "Ornella Salgado", role: "Finance Analyst", initials: "OS" },
  { name: "Tom Jaufre", role: "Finance CFO", initials: "TJ" },
  { name: "Arthur Soulages", role: "Fractional CFO", initials: "AS" },
  { name: "Rocio Montesano", role: "Finance Analyst", initials: "RM" },
  { name: "Augustin Louvet", role: "Finance Analyst", initials: "AL" },
  { name: "Christophe Hoarau", role: "Chief Data Officer", initials: "CH" },
  { name: "Pauline Mathieu", role: "Finance Analyst", initials: "PM" },
  { name: "Mélody Cadet", role: "Finance Analyst", initials: "MC" },
  { name: "Fabien Onolfo", role: "Finance Analyst", initials: "FO" },
];

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

function toDisplayMember(m: StrapiTeamMember) {
  return {
    name: `${m.firstName} ${m.lastName}`.trim(),
    role: m.role,
    linkedin: m.linkedIn || "#",
  };
}

export default function HomePage({
  locale,
  teamMembers: strapiTeam = [],
}: {
  locale: Locale;
  teamMembers?: StrapiTeamMember[];
}) {
  const t = getHomeContent(locale);
  const contactPath = getContactPath(locale);
  const teamDisplay =
    strapiTeam.length > 0
      ? strapiTeam.map(toDisplayMember)
      : team.map((m) => ({
          name: m.name,
          role: m.role,
          linkedin: "#" as string,
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
    <PageLayout locale={locale}>
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
            <div className="mb-6 animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-iter-chartreuse animate-pulse" />
                Barcelone &middot; Paris &middot; Toulouse
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5 animate-[fadeInUp_0.7s_ease-out_0.2s_both]">
              {t.hero.h1.before}
              <span className="text-iter-chartreuse">
                {t.hero.h1.highlight}
              </span>
              {t.hero.h1.after}
            </h1>

            <p className="text-lg lg:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed animate-[fadeInUp_0.7s_ease-out_0.35s_both]">
              {t.hero.h2}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-[fadeInUp_0.7s_ease-out_0.5s_both]">
              <Link
                href={contactPath}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-base hover:brightness-105 hover:shadow-xl hover:shadow-iter-chartreuse/20 transition-all duration-300 group"
              >
                <Calendar size={18} />
                {t.hero.cta}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-medium text-base hover:bg-white/10 transition-all duration-300"
              >
                {locale === "fr"
                  ? "Découvrir nos services"
                  : locale === "en"
                    ? "Discover our services"
                    : "Descubrir nuestros servicios"}
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-8 animate-[fadeInUp_0.7s_ease-out_0.65s_both]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {HERO_AVATARS.map((avatar) => (
                    <div
                      key={avatar.initials}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-iter-violet flex items-center justify-center overflow-hidden shrink-0"
                    >
                      {avatar.imageUrl ? (
                        <Image
                          src={avatar.imageUrl}
                          alt={avatar.initials}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xs text-white font-bold">
                          {avatar.initials}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-white/60 text-sm">+15 experts</span>
              </div>
              <div className="h-8 w-px bg-white/20 hidden sm:block" />
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
                  5/5 sur{" "}
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
            {locale === "fr"
              ? "Ils nous font confiance"
              : locale === "en"
                ? "They trust us"
                : "Confían en nosotros"}
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
              {locale === "fr"
                ? "Nos services"
                : locale === "en"
                  ? "Our services"
                  : "Nuestros servicios"}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {locale === "fr" ? (
                <>
                  Deux pôles d&apos;expertise pour{" "}
                  <span className="text-iter-violet">structurer</span> et{" "}
                  <span className="text-iter-violet">accélérer</span> votre
                  croissance
                </>
              ) : locale === "en" ? (
                <>
                  Two areas of expertise to{" "}
                  <span className="text-iter-violet">structure</span> and{" "}
                  <span className="text-iter-violet">accelerate</span> your
                  growth
                </>
              ) : (
                <>
                  Dos áreas de experiencia para{" "}
                  <span className="text-iter-violet">estructurar</span> y{" "}
                  <span className="text-iter-violet">acelerar</span> su
                  crecimiento
                </>
              )}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === "fr"
                ? "Nous accompagnons les entreprises à chaque étape de leur développement avec des solutions sur-mesure en finance et ressources humaines."
                : locale === "en"
                  ? "We support businesses at every stage of their development with tailor-made finance and human resources solutions."
                  : "Acompañamos a las empresas en cada etapa de su desarrollo con soluciones a medida en finanzas y recursos humanos."}
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
              {financeServices.map((s, i) => (
                <ServiceCard key={s.title} {...s} index={i} />
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
                  src="/images/bg/bg-3d.jpg"
                  alt="Bureau financier"
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
                DAF externalisé & CFO à temps partagé
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Chez Iter Advisors, nos CFO part-time apportent une expertise
                sectorielle approfondie et une maîtrise des outils digitaux pour
                moderniser vos processus financiers. Fort de notre culture
                entrepreneuriale, nous accompagnons efficacement les entreprises
                dans différentes phases clés de leur développement.
              </p>
              <div className="space-y-3 mb-8">
                {dafBenefits.map((b, i) => (
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
                href={contactPath}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-iter-violet text-white font-semibold hover:shadow-lg hover:shadow-iter-violet/20 transition-all duration-300"
              >
                {locale === "fr"
                  ? "Parler à un expert Finance"
                  : locale === "en"
                    ? "Talk to a Finance expert"
                    : "Hablar con un experto en Finanzas"}
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
              {locale === "fr"
                ? "Notre méthode"
                : locale === "en"
                  ? "Our method"
                  : "Nuestro método"}
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
              {locale === "fr"
                ? "Un accompagnement structuré en 4 étapes"
                : locale === "en"
                  ? "A structured support in 4 steps"
                  : "Un acompañamiento estructurado en 4 pasos"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === "fr"
                ? "De l'audit initial au pilotage continu, nous construisons avec vous une trajectoire claire et mesurable."
                : locale === "en"
                  ? "From initial audit to continuous management, we build a clear and measurable trajectory with you."
                  : "Desde la auditoría inicial hasta la gestión continua, construimos con usted una trayectoria clara y medible."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[calc(50%+32px)] right-0 h-px bg-gradient-to-r from-iter-violet/30 to-iter-violet/5 z-0" />
                )}
                <div className="relative z-10 p-6 rounded-2xl bg-card border border-border/50 hover:border-iter-violet/30 hover:shadow-xl transition-all duration-300 group h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-iter-violet/10 flex items-center justify-center group-hover:bg-iter-violet group-hover:text-white transition-all duration-300">
                      <step.icon
                        size={24}
                        className="text-iter-violet group-hover:text-white transition-colors"
                      />
                    </div>
                    <span className="text-3xl font-bold text-iter-violet/20 group-hover:text-iter-violet/40 transition-colors">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
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
              {locale === "fr"
                ? "Nous avons pratiqué les métiers de DAF au quotidien. C'est la raison pour laquelle nous comprenons si bien vos besoins."
                : locale === "en"
                  ? "We have practiced CFO roles on a daily basis. That's why we understand your needs so well."
                  : "Hemos practicado el rol de CFO a diario. Por eso entendemos tan bien sus necesidades."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              {
                value: 100,
                suffix: "+",
                label:
                  locale === "fr"
                    ? "Clients accompagnés"
                    : locale === "en"
                      ? "Clients supported"
                      : "Clientes acompañados",
              },
              {
                value: 15,
                suffix: "+",
                label:
                  locale === "fr"
                    ? "Experts Finance"
                    : locale === "en"
                      ? "Finance Experts"
                      : "Expertos en Finanzas",
              },
              { value: 3, suffix: "", label: "BCN, Paris, TLS" },
              { value: 5, suffix: "/5", label: "Trustfolio" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="text-4xl lg:text-5xl font-bold text-iter-chartreuse mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="p-7 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-iter-chartreuse/20 flex items-center justify-center mb-4 group-hover:bg-iter-chartreuse/30 transition-colors">
                  <r.icon size={22} className="text-iter-chartreuse" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {r.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {r.desc}
                </p>
              </motion.div>
            ))}
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
                {locale === "fr"
                  ? "À propos"
                  : locale === "en"
                    ? "About"
                    : "Sobre nosotros"}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
                {locale === "fr"
                  ? "Un cabinet né de l'entrepreneuriat, au service des entrepreneurs"
                  : locale === "en"
                    ? "A firm born from entrepreneurship, at the service of entrepreneurs"
                    : "Una firma nacida del emprendimiento, al servicio de los emprendedores"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {locale === "fr"
                  ? "À l'origine d'Iter Advisors, un constat : trop de projets porteurs échouent à cause d'une mauvaise gestion de leurs données financières. Nous souhaitons y remédier en donnant à nos clients toutes les clés pour faire de leur entreprise un succès."
                  : locale === "en"
                    ? "At the origin of Iter Advisors, an observation: too many promising projects fail due to poor management of their financial data. We want to remedy this by giving our clients all the keys to make their business a success."
                    : "En el origen de Iter Advisors, una observación: demasiados proyectos prometedores fracasan por una mala gestión de sus datos financieros. Queremos remediarlo dando a nuestros clientes todas las claves para hacer de su empresa un éxito."}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {locale === "fr"
                  ? "Notre équipe combine des parcours diversifiés : toutes tailles d'entreprise, tous secteurs, toutes industries. Nous adaptons nos services à chaque client avec un interlocuteur dédié et des outils performants."
                  : locale === "en"
                    ? "Our team combines diverse backgrounds: all company sizes, all sectors, all industries. We tailor our services to each client with a dedicated contact and high-performance tools."
                    : "Nuestro equipo combina trayectorias diversificadas: todos los tamaños de empresa, todos los sectores, todas las industrias. Adaptamos nuestros servicios a cada cliente con un interlocutor dedicado y herramientas eficientes."}
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
                {locale === "fr"
                  ? "Notre équipe"
                  : locale === "en"
                    ? "Our team"
                    : "Nuestro equipo"}
              </h3>
              <p className="text-muted-foreground max-w-2xl">
                {locale === "fr"
                  ? "Un interlocuteur dédié à votre dossier, des outils performants adaptés à votre activité pour optimiser vos opérations au quotidien."
                  : locale === "en"
                    ? "A dedicated contact for your project, high-performance tools adapted to your activity to optimize your daily operations."
                    : "Un interlocutor dedicado a su proyecto, herramientas eficientes adaptadas a su actividad para optimizar sus operaciones diarias."}
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {teamDisplay.map((member, i) => (
                <motion.a
                  key={member.name}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
                  className="group text-center w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.2rem)]"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-2xl bg-iter-violet flex items-center justify-center group-hover:bg-iter-violet/80 transition-colors">
                    <span className="text-white font-bold text-lg md:text-xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm group-hover:text-iter-violet transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {member.role}
                  </p>
                  <div className="mt-1.5 flex justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-iter-violet transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </motion.a>
              ))}
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
              {locale === "fr"
                ? "Découvrez les témoignages de nos clients"
                : locale === "en"
                  ? "Discover our clients' testimonials"
                  : "Descubra los testimonios de nuestros clientes"}
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
              {locale === "fr"
                ? "Découvrez les témoignages de nos clients"
                : locale === "en"
                  ? "Discover our clients' testimonials"
                  : "Descubra los testimonios de nuestros clientes"}
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
              {locale === "fr"
                ? "Accompagnement"
                : locale === "en"
                  ? "Support"
                  : "Acompañamiento"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-6">
              {locale === "fr"
                ? "Quand faire appel à Iter Advisors ?"
                : locale === "en"
                  ? "When should you call Iter Advisors?"
                  : "¿Cuándo llamar a Iter Advisors?"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              {locale === "fr"
                ? "Nous nous intégrons à chaque étape de la vie de votre entreprise, en devenant le partenaire de confiance pour assurer et certifier votre gestion."
                : locale === "en"
                  ? "We integrate at every stage of your company's life, becoming the trusted partner to ensure and certify your management."
                  : "Nos integramos en cada etapa de la vida de su empresa, convirtiéndonos en el socio de confianza para asegurar y certificar su gestión."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={whenInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="relative p-5 rounded-2xl bg-muted/50 border border-border/50 hover:border-iter-violet/30 hover:bg-iter-violet/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-iter-violet/10 flex items-center justify-center mb-3 group-hover:bg-iter-violet/20 transition-colors">
                    <phase.icon size={18} className="text-iter-violet" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {phase.label}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {phase.desc}
                  </p>
                  {i < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-iter-violet/20" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
              {locale === "fr"
                ? "Questions fréquentes"
                : locale === "en"
                  ? "Frequently asked questions"
                  : "Preguntas frecuentes"}
            </h3>
            <div className="bg-card rounded-2xl border border-border/50 p-6 lg:p-8">
              {faqs.map((faq) => (
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
              {locale === "fr"
                ? "Parlons de votre projet"
                : locale === "en"
                  ? "Let's talk about your project"
                  : "Hablemos de su proyecto"}
            </h2>
            <p className="text-lg text-iter-dark/70 leading-relaxed mb-10">
              {locale === "fr"
                ? "Faites les bons choix. Maintenant. Dites non au statu quo et faites le choix de la proximité, de l'efficacité et de la flexibilité avec Iter Advisors."
                : locale === "en"
                  ? "Make the right choices. Now. Say no to the status quo and choose proximity, efficiency and flexibility with Iter Advisors."
                  : "Tome las decisiones correctas. Ahora. Diga no al statu quo y elija la proximidad, la eficiencia y la flexibilidad con Iter Advisors."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={contactPath}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-dark text-white font-semibold text-base hover:shadow-xl transition-all duration-300 group"
              >
                {t.hero.cta}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <a
                href="mailto:contact@iteradvisors.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-iter-dark/30 text-iter-dark font-medium text-base hover:bg-iter-dark/5 transition-all duration-300"
              >
                <Mail size={18} />
                {locale === "fr"
                  ? "Nous écrire"
                  : locale === "en"
                    ? "Email us"
                    : "Escríbenos"}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
