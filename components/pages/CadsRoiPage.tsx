"use client";
import FooterLanguages from "@/components/FooterLanguages";
import type { Locale } from "@/lib/i18n";
import { CadsLocale, useCadsLocale, cadsElement } from "@/lib/content/cads-copy";
import { CLIENTS_ACCOMPAGNES } from "@/lib/content/facts";

import { useState, useEffect, FormEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  TrendingUp,
  Wallet,
  Target,
  AlertTriangle,
  LineChart,
  Zap,
  ShieldCheck,
} from "lucide-react";

const CLIENT_LOGOS = [
  "logo-happyscribe.jpg",
  "logo-impact.jpg",
  "logo-mitiga.jpg",
  "logo-neat.jpg",
  "logo-nuubb.jpg",
  "logo-opitdigital.jpg",
  "logo-seasonly.jpg",
  "logo-solamente.jpg",
  "logo-surfe.jpg",
  "logo-ukio.jpg",
  "logo-yego.jpg",
];

function CadsRoiPageContent() {
  const locale = useCadsLocale();
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return cadsElement((
    <main className="bg-background text-foreground">
      <MinimalHeader onCtaClick={scrollToForm} />

      <Hero formRef={formRef} />

      <SocialProofBar />

      <Pains onCtaClick={scrollToForm} />

      <Solution />

      <Testimonials />

      <Methodology />

      <Differentiation />

      <FinalCTA onCtaClick={scrollToForm} />

      <MinimalFooter />

      <StickyMobileCTA onCtaClick={scrollToForm} />
    </main>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Minimal header
   ────────────────────────────────────────────────────────────────── */
function MinimalHeader({ onCtaClick }: { onCtaClick: () => void }) {
  const locale = useCadsLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return cadsElement((
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-iter-violet/95 backdrop-blur-md shadow-lg shadow-iter-violet/10"
          : "bg-iter-violet"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-[72px]">
        <Link href="/" aria-label="Iter Advisors — accueil" className="flex items-center gap-2">
          <Image
            src="/images/logos/logo-hero.png"
            alt="Iter Advisors"
            width={140}
            height={16}
            priority
            className="brightness-0 invert"
          />
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={onCtaClick}
            className="px-5 py-2.5 text-sm font-semibold rounded-full bg-iter-chartreuse text-iter-dark hover:brightness-105 transition-all duration-200 hover:shadow-lg hover:shadow-iter-chartreuse/30"
          >
            Présenter mon besoin
          </button>
        </div>
      </div>
    </header>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Hero — ROI angle
   ────────────────────────────────────────────────────────────────── */
function Hero({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const locale = useCadsLocale();
  return cadsElement((
    <section className="site-hero site-hero--inverse relative bg-iter-violet text-white pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.91 0.22 120 / 0.15), transparent 40%), radial-gradient(circle at 80% 80%, oklch(1 0 0 / 0.08), transparent 50%)",
        }}
      />

      <div className="container relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-5">
            CFO part-time • Impact mesurable
          </span>

          <h1 className="text-4xl lg:text-6xl font-bold font-heading leading-[1.05] mb-6">
            DAF externalisé pour <span className="text-iter-chartreuse">PME et startups</span>
          </h1>

          <p className="text-lg lg:text-xl text-white/85 leading-relaxed mb-4 max-w-xl">
            Une direction financière pour comprendre vos marges, anticiper votre
            trésorerie et préparer vos décisions avec un interlocuteur dédié.
          </p>

          <p className="text-base text-white/60 leading-relaxed mb-8 max-w-xl">
            Un périmètre, des livrables et des responsabilités définis ensemble.
          </p>

          <ul className="space-y-3 mb-8 max-w-xl">
            {[
              "Diagnostic et calendrier définis après examen des données",
              "KPI et marge par produit pilotés au mois",
              "Résultats examinés selon une période et une base de comparaison explicites",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/90">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-iter-chartreuse/20 flex items-center justify-center">
                  <Check size={12} className="text-iter-chartreuse" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
            <TrustItem value="13 semaines" label="horizon indicatif du prévisionnel" />
            <TrustItem value={`${CLIENTS_ACCOMPAGNES}`} label="entreprises accompagnées" />
            <TrustItem value="30 jours" label="préavis de fin de mission récurrente" />
          </div>
        </div>

        <div ref={formRef} id="form" className="lg:sticky lg:top-24">
          <LeadForm />
        </div>
      </div>
    </section>
  ), locale);
}

function TrustItem({ value, label }: { value: string; label: string }) {
  const locale = useCadsLocale();
  return cadsElement((
    <div className="flex items-baseline gap-2">
      <span className="text-iter-chartreuse font-bold font-heading text-lg">{value}</span>
      <span className="text-white/60">{label}</span>
    </div>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Lead Form
   ────────────────────────────────────────────────────────────────── */
export function LeadForm() {
  const locale = useCadsLocale();
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) {
      setPending(false);
      return;
    }

    const payload = {
      ...Object.fromEntries(data.entries()),
      source: "cads-roi",
      submittedAt: new Date().toISOString(),
    };
    delete (payload as Record<string, unknown>).website;

    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Erreur d'envoi");
      } else {
        throw new Error("Lead delivery is not configured");
      }
      setSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);
      setError(
        "Une erreur est survenue. Merci de réessayer ou de nous écrire à contact@iteradvisors.com."
      );
    } finally {
      setPending(false);
    }
  }

  if (success) {
    return cadsElement((
      <div className="site-card bg-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-iter-violet/30 text-iter-dark">
        <div className="w-12 h-12 rounded-full bg-iter-chartreuse/30 flex items-center justify-center mb-5">
          <Check className="text-iter-violet" size={24} />
        </div>
        <h3 className="text-2xl font-bold font-heading mb-3">Demande reçue.</h3>
        <p className="text-iter-gray leading-relaxed">
          Un membre de l’équipe vous recontactera pour préciser votre besoin
          et convenir d’un échange.
        </p>
      </div>
    ), locale);
  }

  return cadsElement((
    <div className="site-card bg-white rounded-3xl p-6 lg:p-8 shadow-2xl shadow-iter-violet/30 text-iter-dark">
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-bold font-heading mb-2">
          Présenter mon besoin financier
        </h2>
        <p className="text-sm text-iter-gray">
          Présentez votre besoin et votre calendrier. Le périmètre sera défini après un premier échange.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">
            Website
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField name="firstName" placeholder="Prénom*" required />
          <FormField name="lastName" placeholder="Nom*" required />
        </div>

        <FormField name="company" placeholder="Entreprise*" required />
        <FormField name="email" type="email" placeholder="E-mail pro*" required />
        <FormField name="phone" type="tel" placeholder="Téléphone (optionnel)" />

        <textarea
          name="message"
          placeholder="Votre CA et enjeu prioritaire (optionnel)"
          rows={3}
          className="w-full bg-iter-light border border-border rounded-xl px-4 py-3 text-iter-dark placeholder:text-iter-gray/60 focus:outline-none focus:border-iter-violet/50 focus:ring-2 focus:ring-iter-violet/15 transition-all resize-none text-sm"
        />

        <button
          type="submit"
          disabled={pending}
          className="site-button site-button-primary w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-iter-violet text-white font-semibold hover:brightness-110 transition-all duration-200 disabled:opacity-50 hover:shadow-lg hover:shadow-iter-violet/30"
        >
          {pending ? "Envoi…" : "Demander un audit financier"}
          {!pending && <ArrowRight size={16} />}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-xs text-iter-gray/80 leading-relaxed pt-1">
          En envoyant ce formulaire, vous acceptez d&apos;être recontacté par Iter Advisors.
          Vos données ne sont pas partagées.
        </p>
      </form>
    </div>
  ), locale);
}

function FormField({
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  const locale = useCadsLocale();
  return cadsElement((
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full bg-iter-light border border-border rounded-xl px-4 py-3 text-iter-dark placeholder:text-iter-gray/60 focus:outline-none focus:border-iter-violet/50 focus:ring-2 focus:ring-iter-violet/15 transition-all text-sm"
    />
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Social proof bar
   ────────────────────────────────────────────────────────────────── */
function SocialProofBar() {
  const locale = useCadsLocale();
  return cadsElement((
    <section className="bg-background border-y border-border py-10">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-widest text-iter-gray mb-6">
          Ils nous font confiance
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {CLIENT_LOGOS.slice(0, 8).map((logo) => (
            <div key={logo} className="relative h-8 w-24 grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all">
              <Image
                src={`/images/logos/${logo}`}
                alt=""
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Pains — coûts cachés / ROI angle
   ────────────────────────────────────────────────────────────────── */
function Pains({ onCtaClick }: { onCtaClick: () => void }) {
  const locale = useCadsLocale();
  const pains = [
    {
      icon: TrendingUp,
      title: "Une marge difficile à expliquer",
      text: "Une analyse par produit ou canal aide à comprendre la contribution de chaque activité. Le travail commence par vérifier les données et les règles de calcul.",
    },
    {
      icon: Wallet,
      title: "Des stocks et des délais qui mobilisent la trésorerie",
      text: "Délais de paiement non négociés, stocks mal calibrés : votre cash dort dans le bilan au lieu de financer la croissance.",
    },
    {
      icon: AlertTriangle,
      title: "Des coûts qui demandent une revue",
      text: "Les contrats, abonnements et dépenses méritent d’être examinés avec leurs responsables. Les économies éventuelles doivent être mesurées, pas présumées.",
    },
    {
      icon: Target,
      title: "Vos investisseurs réclament des chiffres que vous n'avez pas",
      text: "Des définitions partagées des indicateurs, un prévisionnel et des hypothèses documentées facilitent les échanges. Ils ne garantissent pas une levée.",
    },
  ];

  return cadsElement((
    <section className="site-section bg-background py-20 lg:py-28">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            Les coûts cachés
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold font-heading leading-tight">
            Combien vous coûte chaque mois
            <br />
            <span className="text-iter-violet">sans CFO ?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {pains.map((pain) => {
            const Icon = pain.icon;
            return (
              <div
                key={pain.title}
                className="site-card border border-border rounded-2xl p-6 lg:p-7 hover:border-iter-violet/30 transition-colors bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-iter-violet/10 flex items-center justify-center mb-4">
                  <Icon className="text-iter-violet" size={20} />
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2">{pain.title}</h3>
                <p className="text-iter-gray leading-relaxed text-[15px]">{pain.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <button
            onClick={onCtaClick}
            className="site-button site-button-primary inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-dark text-white font-semibold hover:bg-iter-violet transition-all duration-200"
          >
            Chiffrer mes gains accessibles
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Solution — ROI angle
   ────────────────────────────────────────────────────────────────── */
function Solution() {
  const locale = useCadsLocale();
  const benefits = [
    "Analyse des marges et des écarts au budget",
    "Prévisionnel de trésorerie à 13 semaines, avec hypothèses",
    "Scénarios documentés pour préparer les investissements",
    "Coûts et anomalies à examiner avec les responsables",
    "Data room et business plan pour préparer les échanges investisseurs",
  ];

  return cadsElement((
    <section className="site-section bg-iter-light py-20 lg:py-28">
      <div className="container max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              Notre solution
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading leading-tight mb-6">
              Un DAF externalisé qui livre des chiffres, pas des slides.
            </h2>
            <p className="text-iter-gray leading-relaxed mb-4">
              Le <strong className="text-iter-dark">DAF externalisé</strong> (ou CFO part-time)
              est un directeur financier expérimenté qui intervient à temps partiel sur
              vos sujets à plus fort impact. Vous bénéficiez d&apos;un profil senior, focalisé
              sur la création de valeur — pas sur la production de tableurs.
            </p>
            <p className="text-iter-gray leading-relaxed mb-8">
              Concrètement : <strong className="text-iter-dark">1 à 8 jours par mois, à titre indicatif</strong>,
              avec des objectifs chiffrés posés dès le départ
              (marge, BFR, cash, valorisation) et un suivi mensuel des résultats.
            </p>

            <div className="space-y-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-iter-chartreuse flex items-center justify-center">
                    <Check size={12} className="text-iter-dark" strokeWidth={3} />
                  </span>
                  <span className="text-iter-dark font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="site-card lg:col-span-2 bg-iter-violet text-white rounded-3xl p-7 lg:p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-3 block">
              Un périmètre à convenir
            </span>
            <h3 className="text-2xl font-bold font-heading mb-5">Des décisions mieux préparées.</h3>
            <ul className="space-y-4 text-white/90 text-sm">
              <li className="flex gap-3">
                <ShieldCheck size={18} className="text-iter-chartreuse flex-shrink-0 mt-0.5" />
                <span>Travaux et calendrier confirmés au cadrage</span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={18} className="text-iter-chartreuse flex-shrink-0 mt-0.5" />
                <span>Engagement modulable selon les jalons (clôture, levée, M&A)</span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={18} className="text-iter-chartreuse flex-shrink-0 mt-0.5" />
                <span>Mission récurrente sans durée minimale, préavis de 30 jours</span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={18} className="text-iter-chartreuse flex-shrink-0 mt-0.5" />
                <span>Passation à un CFO interne si ce format répond au besoin</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Testimonials — chiffres mis en avant
   ────────────────────────────────────────────────────────────────── */
function Testimonials() {
  const locale = useCadsLocale();
  const cases = [
    { sector: "Opti Digital · adtech", problem: "Structurer la fonction finance dans la durée.", action: "Reporting mensuel, procédures de clôture, migration ERP et accompagnement au financement non dilutif.", result: "Résultats qualitatifs : aucun montant de financement ni gain de productivité chiffré n’est publié.", kpi: "Mission documentée", href: "/ressources/cas-clients/opti-digital-structuration-financement" },
    { sector: "Seasonly · beauté multi-canal", problem: "Comprendre les marges par canal et les besoins de financement du stock.", action: "P&L par canal, suivi des stocks, plan de financement du BFR et reporting hebdomadaire.", result: "Le cas décrit le périmètre, la méthode de comparaison et ses limites. Il ne prédit pas les résultats d’une autre entreprise.", kpi: "Mission documentée", href: "/ressources/cas-clients/seasonly-marge-par-canal-bfr" },
    { sector: "SolarMente · cleantech", problem: "Préparer les finances d’une levée et d’une acquisition entre 2022 et 2024.", action: "Modèle multi-scénarios, data room, reporting au conseil et intégration financière d’Eltex en 2024.", result: "Dirigeants, investisseurs et conseils ont contribué aux opérations ; leur réussite n’est pas attribuée au seul accompagnement d’Iter.", kpi: "2022 à 2024", href: "/ressources/cas-clients/solarmente-serie-b-cleantech" },
  ];

  return cadsElement((
    <section className="site-section bg-background py-20 lg:py-28">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            Des missions documentées
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading leading-tight">
            Trois missions avec un périmètre documenté.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c) => (
            <div
              key={c.sector}
              className="site-card border border-border rounded-2xl p-7 bg-card hover:border-iter-violet/40 hover:shadow-lg hover:shadow-iter-violet/5 transition-all relative overflow-hidden"
            >
              <div className="absolute top-5 right-5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-iter-chartreuse text-iter-dark text-xs font-bold font-heading">
                  {c.kpi}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-iter-violet mb-5 pr-20">
                {c.sector}
              </p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-iter-gray font-semibold mb-1 text-xs uppercase tracking-wider">
                    Problème
                  </p>
                  <p className="text-iter-dark leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <p className="text-iter-gray font-semibold mb-1 text-xs uppercase tracking-wider">
                    Intervention
                  </p>
                  <p className="text-iter-dark leading-relaxed">{c.action}</p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-iter-gray font-semibold mb-1 text-xs uppercase tracking-wider">
                    Résultat
                  </p>
                  <p className="text-iter-dark font-semibold leading-relaxed">{c.result}</p><a href={c.href} className="text-iter-violet underline">Lire le cas et ses limites</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Methodology — ROI angle
   ────────────────────────────────────────────────────────────────── */
function Methodology() {
  const locale = useCadsLocale();
  const steps = [
    {
      n: "01",
      title: "Audit financier",
      text: "Examen des données, des échéances et des priorités. Le calendrier est convenu après cadrage.",
    },
    {
      n: "02",
      title: "Plan d'action",
      text: "Livrables, sources, responsables et calendrier définis selon vos besoins.",
    },
    {
      n: "03",
      title: "Pilotage mensuel",
      text: "Suivi des KPI vs objectifs. Arbitrages investissement, négociations, recrutements clés.",
    },
    {
      n: "04",
      title: "Création de valeur",
      text: "Levées, M&A, optimisation rentabilité. Vous valorisez l'entreprise — on tient les chiffres.",
    },
  ];

  return cadsElement((
    <section className="site-section bg-iter-dark text-white py-20 lg:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, oklch(0.42 0.28 275 / 0.4), transparent 50%)",
        }}
      />
      <div className="container relative">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-3 block">
            Méthode
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading leading-tight">
            Du cadrage au suivi, en 4 étapes.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="site-card border border-white/10 rounded-2xl p-6 hover:border-iter-chartreuse/40 hover:bg-white/5 transition-all"
            >
              <span className="text-iter-chartreuse font-bold font-heading text-sm tracking-widest">
                {s.n}
              </span>
              <h3 className="text-lg font-semibold font-heading mt-3 mb-2">{s.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Differentiation — ROI angle
   ────────────────────────────────────────────────────────────────── */
function Differentiation() {
  const locale = useCadsLocale();
  const items = [
    {
      icon: Zap,
      title: "Résultats, pas livrables",
      text: "Nous convenons des livrables, des indicateurs et de leur suivi. Un gain éventuel se mesure sans être garanti.",
    },
    {
      icon: LineChart,
      title: "Des CFO opérateurs",
      text: "Le profil et l’expérience mobilisés sont précisés au cadrage selon votre équipe et vos sujets.",
    },
    {
      icon: Target,
      title: "PME et startups",
      text: "On parle votre langue : croissance, cash, levées, BFR, scaling. Pas de jargon big corp.",
    },
    {
      icon: ShieldCheck,
      title: "Engagement modulable",
      text: "Les volumes mensuels sont indicatifs. Le contrat précise le périmètre et le préavis de 30 jours, sans durée minimale pour le suivi récurrent.",
    },
  ];

  return cadsElement((
    <section className="site-section bg-iter-light py-20 lg:py-28">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            Pourquoi Iter Advisors
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading leading-tight">
            Des DAF qui ont déjà fait le job — et les chiffres.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="site-card bg-white border border-border rounded-2xl p-7 hover:border-iter-violet/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-iter-violet/10 flex items-center justify-center mb-4">
                  <Icon className="text-iter-violet" size={20} />
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2">{item.title}</h3>
                <p className="text-iter-gray leading-relaxed text-[15px]">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Final CTA — ROI angle
   ────────────────────────────────────────────────────────────────── */
function FinalCTA({ onCtaClick }: { onCtaClick: () => void }) {
  const locale = useCadsLocale();
  return cadsElement((
    <section className="site-section bg-iter-violet text-white py-20 lg:py-28 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, oklch(0.91 0.22 120 / 0.25), transparent 60%)",
        }}
      />
      <div className="container relative max-w-3xl text-center">
        <h2 className="text-3xl lg:text-5xl font-bold font-heading leading-tight mb-6">
          Combien vous coûte chaque mois sans CFO ?
        </h2>
        <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Un premier échange pour préciser votre situation, votre organisation et
          les travaux utiles. Un devis définit ensuite le périmètre et le calendrier.
        </p>
        <button
          onClick={onCtaClick}
          className="site-button site-button-primary inline-flex items-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:brightness-105 transition-all duration-200 hover:shadow-lg hover:shadow-iter-chartreuse/30 text-base"
        >
          Présenter mon besoin
          <ArrowRight size={18} />
        </button>
        <p className="text-sm text-white/60 mt-5">Le premier échange sert à qualifier votre besoin ; ce n’est pas un audit financier.</p>
      </div>
    </section>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Minimal footer
   ────────────────────────────────────────────────────────────────── */
function MinimalFooter() {
  const locale = useCadsLocale();
  return cadsElement((
    <footer className="bg-iter-dark text-white/50 py-8 text-sm">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logos/logo-hero.png"
            alt="Iter Advisors"
            width={100}
            height={12}
            className="brightness-0 invert opacity-70"
          />
          <span className="text-white/40">© {new Date().getFullYear()}</span>
        </div>
        <div><FooterLanguages locale={locale} /></div>
        <div className="flex items-center gap-5">
          <Link href="/mentions-legales" className="hover:text-white transition-colors">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">
            Confidentialité
          </Link>
          <a href="mailto:contact@iteradvisors.com" className="hover:text-white transition-colors">
            contact@iteradvisors.com
          </a>
        </div>
      </div>
    </footer>
  ), locale);
}

/* ──────────────────────────────────────────────────────────────────
   Sticky mobile CTA
   ────────────────────────────────────────────────────────────────── */
function StickyMobileCTA({ onCtaClick }: { onCtaClick: () => void }) {
  const locale = useCadsLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return cadsElement((
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        onClick={onCtaClick}
        className="site-button site-button-primary w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-iter-violet text-white font-semibold hover:brightness-110 transition-all"
      >
        Présenter mon besoin
        <ArrowRight size={16} />
      </button>
    </div>
  ), locale);
}

export default function CadsRoiPage({ locale = 'fr' }: { locale?: Locale }) { return <CadsLocale.Provider value={locale}><CadsRoiPageContent /></CadsLocale.Provider>; }
