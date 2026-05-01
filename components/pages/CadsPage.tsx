"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  TrendingUp,
  Wallet,
  Compass,
  BarChart3,
  ClipboardList,
  ShieldCheck,
  Phone,
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

export default function CadsPage() {
  const formRef = useRef<HTMLDivElement | null>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
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
  );
}

/* ──────────────────────────────────────────────────────────────────
   Minimal header — logo + phone CTA only, no nav
   ────────────────────────────────────────────────────────────────── */
function MinimalHeader({ onCtaClick }: { onCtaClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-iter-violet/95 backdrop-blur-md shadow-lg shadow-iter-violet/10"
          : "bg-iter-violet"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-[72px]">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logos/logo-hero.png"
            alt="Iter Advisors"
            width={140}
            height={16}
            priority
            className="brightness-0 invert"
          />
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:+33184886677"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Phone size={14} />
            <span>01 84 88 66 77</span>
          </a>
          <button
            onClick={onCtaClick}
            className="px-5 py-2.5 text-sm font-semibold rounded-full bg-iter-chartreuse text-iter-dark hover:brightness-105 transition-all duration-200 hover:shadow-lg hover:shadow-iter-chartreuse/30"
          >
            Parler à un CFO
          </button>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Hero — H1 keyword + sub + form visible above the fold
   ────────────────────────────────────────────────────────────────── */
function Hero({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <section className="relative bg-iter-violet text-white pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(0.91 0.22 120 / 0.15), transparent 40%), radial-gradient(circle at 80% 80%, oklch(1 0 0 / 0.08), transparent 50%)",
        }}
      />

      <div className="container relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left — pitch */}
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-5">
            CFO part-time / DAF externalisé
          </span>

          <h1 className="text-4xl lg:text-6xl font-bold font-heading leading-[1.05] mb-6">
            DAF externalisé pour <span className="text-iter-chartreuse">PME et startups</span>
          </h1>

          <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-4 max-w-xl">
            Pilotage financier, trésorerie, structuration de la croissance — un DAF
            expérimenté à vos côtés, à temps partiel, sans le coût d&apos;un temps plein.
          </p>

          <p className="text-base text-white/60 leading-relaxed mb-8 max-w-xl">
            Reprenez la main sur vos chiffres. Décidez vite, décidez juste.
          </p>

          {/* Bullets */}
          <ul className="space-y-3 mb-8 max-w-xl">
            {[
              "Visibilité cash à 13 semaines dès le 1er mois",
              "Reportings et KPI simples, partagés en CODIR",
              "Engagement modulable : 1 à 5 jours / mois",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/90">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-iter-chartreuse/20 flex items-center justify-center">
                  <Check size={12} className="text-iter-chartreuse" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
            <TrustItem value="60+" label="missions menées" />
            <TrustItem value="15 ans" label="d'expérience CFO" />
            <TrustItem value="Ex Big4" label="& scale-ups" />
          </div>
        </div>

        {/* Right — Form */}
        <div ref={formRef} id="form" className="lg:sticky lg:top-24">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function TrustItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-iter-chartreuse font-bold font-heading text-lg">{value}</span>
      <span className="text-white/60">{label}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Lead Form — short, embedded, with rassurance
   ────────────────────────────────────────────────────────────────── */
function LeadForm() {
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
      source: "cads",
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
        console.log("Cads form submission:", payload);
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
    return (
      <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-iter-violet/30 text-iter-dark">
        <div className="w-12 h-12 rounded-full bg-iter-chartreuse/30 flex items-center justify-center mb-5">
          <Check className="text-iter-violet" size={24} />
        </div>
        <h3 className="text-2xl font-bold font-heading mb-3">Message bien reçu.</h3>
        <p className="text-iter-gray leading-relaxed">
          Un CFO Iter Advisors vous recontacte sous 24h ouvrées pour planifier un
          premier échange de 30 minutes — sans engagement.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-2xl shadow-iter-violet/30 text-iter-dark">
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-bold font-heading mb-2">
          Échangez avec un CFO en 30 min
        </h2>
        <p className="text-sm text-iter-gray">
          Réponse sous 24h ouvrées. Sans engagement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot */}
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
          placeholder="En 1 phrase, votre besoin (optionnel)"
          rows={3}
          className="w-full bg-iter-light border border-border rounded-xl px-4 py-3 text-iter-dark placeholder:text-iter-gray/60 focus:outline-none focus:border-iter-violet/50 focus:ring-2 focus:ring-iter-violet/15 transition-all resize-none text-sm"
        />

        <button
          type="submit"
          disabled={pending}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-iter-violet text-white font-semibold hover:brightness-110 transition-all duration-200 disabled:opacity-50 hover:shadow-lg hover:shadow-iter-violet/30"
        >
          {pending ? "Envoi…" : "Demander un échange"}
          {!pending && <ArrowRight size={16} />}
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <p className="text-xs text-iter-gray/80 leading-relaxed pt-1">
          En envoyant ce formulaire, vous acceptez d&apos;être recontacté par Iter Advisors.
          Vos données ne sont pas partagées.
        </p>
      </form>
    </div>
  );
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
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full bg-iter-light border border-border rounded-xl px-4 py-3 text-iter-dark placeholder:text-iter-gray/60 focus:outline-none focus:border-iter-violet/50 focus:ring-2 focus:ring-iter-violet/15 transition-all text-sm"
    />
  );
}

/* ──────────────────────────────────────────────────────────────────
   Social proof bar — client logos
   ────────────────────────────────────────────────────────────────── */
function SocialProofBar() {
  return (
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
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Pains — section empathie
   ────────────────────────────────────────────────────────────────── */
function Pains({ onCtaClick }: { onCtaClick: () => void }) {
  const pains = [
    {
      icon: Wallet,
      title: "Vous pilotez votre cash à vue",
      text: "Pas de prévisionnel fiable, pas de visibilité au-delà de quelques semaines. Chaque échéance devient un stress.",
    },
    {
      icon: Compass,
      title: "Vous décidez à l'instinct",
      text: "Embaucher, investir, lever : vous tranchez sans données solides, faute de modèle financier exploitable.",
    },
    {
      icon: BarChart3,
      title: "Vos reportings sont opaques",
      text: "Tableurs éparpillés, chiffres qui ne tombent pas juste. Personne ne sait vraiment où en est l'entreprise.",
    },
    {
      icon: TrendingUp,
      title: "La croissance vous dépasse",
      text: "L'organisation a doublé, les outils n'ont pas suivi. Vos process financiers freinent au lieu de soutenir.",
    },
  ];

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            Ça vous parle ?
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold font-heading leading-tight">
            Vous dirigez. Mais sur les chiffres,
            <br />
            <span className="text-iter-violet">vous avancez en aveugle.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {pains.map((pain) => {
            const Icon = pain.icon;
            return (
              <div
                key={pain.title}
                className="border border-border rounded-2xl p-6 lg:p-7 hover:border-iter-violet/30 transition-colors bg-card"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-dark text-white font-semibold hover:bg-iter-violet transition-all duration-200"
          >
            Reprendre la main sur mes chiffres
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Solution — what is, how, benefits
   ────────────────────────────────────────────────────────────────── */
function Solution() {
  const benefits = [
    "Visibilité financière permanente",
    "Décisions éclairées et plus rapides",
    "Croissance structurée sans perte de contrôle",
    "Rentabilité optimisée mois après mois",
    "Crédibilité renforcée auprès des investisseurs",
  ];

  return (
    <section className="bg-iter-light py-20 lg:py-28">
      <div className="container max-w-5xl">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              Notre solution
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading leading-tight mb-6">
              Un DAF externalisé senior, intégré à votre équipe.
            </h2>
            <p className="text-iter-gray leading-relaxed mb-4">
              Le <strong className="text-iter-dark">DAF externalisé</strong> (ou CFO part-time)
              est un directeur financier expérimenté qui intervient à temps partiel dans
              votre entreprise. Vous bénéficiez d&apos;un profil senior — souvent inaccessible
              pour une PME ou une startup en interne — au coût d&apos;un mi-temps ou moins.
            </p>
            <p className="text-iter-gray leading-relaxed mb-8">
              Concrètement : <strong className="text-iter-dark">1 à 5 jours par mois</strong>,
              en présentiel ou en remote, avec des livrables clairs (reporting mensuel,
              prévisionnel de trésorerie, business plan, dashboards) et une présence
              en CODIR si besoin.
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

          <div className="lg:col-span-2 bg-iter-violet text-white rounded-3xl p-7 lg:p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-3 block">
              Engagement
            </span>
            <h3 className="text-2xl font-bold font-heading mb-5">Modulable, sans CDI.</h3>
            <ul className="space-y-4 text-white/90 text-sm">
              <li className="flex gap-3">
                <ShieldCheck size={18} className="text-iter-chartreuse flex-shrink-0 mt-0.5" />
                <span>Démarrage rapide, sans process de recrutement</span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={18} className="text-iter-chartreuse flex-shrink-0 mt-0.5" />
                <span>Intensité ajustable selon vos cycles (clôture, levée, M&A)</span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={18} className="text-iter-chartreuse flex-shrink-0 mt-0.5" />
                <span>Engagement au mois, sans surcoût de séparation</span>
              </li>
              <li className="flex gap-3">
                <ShieldCheck size={18} className="text-iter-chartreuse flex-shrink-0 mt-0.5" />
                <span>Transition possible vers un CFO interne quand vous êtes prêt</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Testimonials — short cases problem → action → result
   ────────────────────────────────────────────────────────────────── */
function Testimonials() {
  const cases = [
    {
      sector: "SaaS B2B • Série A",
      problem:
        "Visibilité cash à 4 semaines, équipe finance débordée à l'approche d'une levée.",
      action:
        "Mise en place d'un cash forecast 13 semaines, build du business plan et data room.",
      result: "Levée de 6 M€ closée en 4 mois.",
    },
    {
      sector: "PME industrielle • 12 M€ CA",
      problem:
        "Marge en baisse depuis 3 trimestres, dirigeant sans lecture claire des coûts.",
      action:
        "Refonte de la comptabilité analytique et reporting marge par produit.",
      result: "+3,2 pts de marge brute en 9 mois.",
    },
    {
      sector: "Scale-up DTC • 8 M€ CA",
      problem:
        "Croissance rapide, finances pilotées sur Excel, fondateur seul à bord.",
      action:
        "Implémentation d'un ERP léger, dashboards CODIR, prévisionnel glissant.",
      result: "Décisions hebdomadaires, BFR maîtrisé, cap des 10 M€ franchi.",
    },
  ];

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            Ce que ça change
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading leading-tight">
            Trois cas concrets de DAF externalisé.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cases.map((c) => (
            <div
              key={c.sector}
              className="border border-border rounded-2xl p-7 bg-card hover:border-iter-violet/40 hover:shadow-lg hover:shadow-iter-violet/5 transition-all"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-iter-violet mb-5">
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
                  <p className="text-iter-dark font-semibold leading-relaxed">{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Methodology — 4 steps
   ────────────────────────────────────────────────────────────────── */
function Methodology() {
  const steps = [
    {
      n: "01",
      title: "Diagnostic financier",
      text: "Audit en 2 semaines : trésorerie, marges, process, outils, organisation.",
    },
    {
      n: "02",
      title: "Mise en place des outils",
      text: "Reporting mensuel, prévisionnel cash 13 semaines, dashboards CODIR.",
    },
    {
      n: "03",
      title: "Suivi mensuel",
      text: "Clôture, analyse des écarts, point CODIR, alertes et recommandations.",
    },
    {
      n: "04",
      title: "Accompagnement stratégique",
      text: "Levées, M&A, recrutements clés, négociations bancaires, business plan.",
    },
  ];

  return (
    <section className="bg-iter-dark text-white py-20 lg:py-28 relative overflow-hidden">
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
            Une approche éprouvée, en 4 étapes.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="border border-white/10 rounded-2xl p-6 hover:border-iter-chartreuse/40 hover:bg-white/5 transition-all"
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
  );
}

/* ──────────────────────────────────────────────────────────────────
   Differentiation — why Iter Advisors
   ────────────────────────────────────────────────────────────────── */
function Differentiation() {
  const items = [
    {
      icon: ClipboardList,
      title: "Des CFO opérationnels, pas des consultants",
      text: "Nos intervenants ont tous été DAF en PME ou scale-up. Ils ont vécu vos sujets, pas seulement étudié.",
    },
    {
      icon: TrendingUp,
      title: "Pragmatique, jamais théorique",
      text: "Vous voulez des décisions, pas des slides. On livre des outils utilisables dès le 1er mois.",
    },
    {
      icon: Compass,
      title: "PME et startups",
      text: "On parle votre langue : croissance, cash, levées, BFR, scaling. Pas de jargon big corp.",
    },
    {
      icon: ShieldCheck,
      title: "Flexibilité totale",
      text: "1 jour par mois ou 4 jours par semaine. Vous ajustez selon les cycles, sans contrainte RH.",
    },
  ];

  return (
    <section className="bg-iter-light py-20 lg:py-28">
      <div className="container">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            Pourquoi Iter Advisors
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading leading-tight">
            Des DAF qui ont déjà fait le job.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white border border-border rounded-2xl p-7 hover:border-iter-violet/30 transition-colors"
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
  );
}

/* ──────────────────────────────────────────────────────────────────
   Final CTA
   ────────────────────────────────────────────────────────────────── */
function FinalCTA({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="bg-iter-violet text-white py-20 lg:py-28 relative overflow-hidden">
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
          Échangez avec un CFO expérimenté en 30 minutes.
        </h2>
        <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Premier appel offert, sans engagement. Vous repartez avec une lecture claire
          de vos enjeux financiers et un plan d&apos;action concret.
        </p>
        <button
          onClick={onCtaClick}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:brightness-105 transition-all duration-200 hover:shadow-lg hover:shadow-iter-chartreuse/30 text-base"
        >
          Demander un échange
          <ArrowRight size={18} />
        </button>
        <p className="text-sm text-white/60 mt-5">Réponse sous 24h ouvrées.</p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Minimal footer — legal links only
   ────────────────────────────────────────────────────────────────── */
function MinimalFooter() {
  return (
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
  );
}

/* ──────────────────────────────────────────────────────────────────
   Sticky mobile CTA
   ────────────────────────────────────────────────────────────────── */
function StickyMobileCTA({ onCtaClick }: { onCtaClick: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        onClick={onCtaClick}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-iter-violet text-white font-semibold hover:brightness-110 transition-all"
      >
        Parler à un CFO
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
