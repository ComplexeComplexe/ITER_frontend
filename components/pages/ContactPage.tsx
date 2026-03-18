"use client";

import { useState, FormEvent, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  Linkedin,
  Calendar,
  Star,
  Send,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactContent, ContactFormField } from "@/lib/content/contact";
import { BOOKING_URL } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

/* ─── i18n content for the new sections ─── */
const contactPageText = {
  fr: {
    badge: "Parlons de votre projet",
    h1: "Contactez nos experts financiers",
    subtitle:
      "Échangez avec un DAF expérimenté pour identifier les leviers de croissance de votre entreprise. Premier échange gratuit et sans engagement.",
    trustBadge: "+85 entreprises accompagnées",
    ratingLabel: "5/5 sur Trustfolio",
    formTitle: "Envoyez-nous un message",
    formSubtitle: "Nous vous répondons sous 24h.",
    infoTitle: "Autres moyens de nous contacter",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    hoursLabel: "Horaires",
    hoursValue: "Lun – Ven, 9h – 18h",
    calendlyLabel: "Réserver un créneau",
    calendlyDesc: "Planifiez un appel de 30 min avec un expert",
    officesTitle: "Nos bureaux",
    offices: [
      { city: "Barcelone", country: "Espagne", flag: "🇪🇸" },
      { city: "Paris", country: "France", flag: "🇫🇷" },
      { city: "Toulouse", country: "France", flag: "🇫🇷" },
    ],
    clientsTitle: "Ils nous font confiance",
    successMessage: "Merci\u00A0! Votre message a bien été envoyé. Nous vous répondons sous 24h.",
  },
  en: {
    badge: "Let's talk about your project",
    h1: "Contact our financial experts",
    subtitle:
      "Talk with an experienced CFO to identify growth levers for your business. First call is free, no commitment.",
    trustBadge: "+85 companies supported",
    ratingLabel: "5/5 on Trustfolio",
    formTitle: "Send us a message",
    formSubtitle: "We reply within 24 hours.",
    infoTitle: "Other ways to reach us",
    emailLabel: "Email",
    phoneLabel: "Phone",
    hoursLabel: "Hours",
    hoursValue: "Mon – Fri, 9am – 6pm",
    calendlyLabel: "Book a slot",
    calendlyDesc: "Schedule a 30-min call with an expert",
    officesTitle: "Our offices",
    offices: [
      { city: "Barcelona", country: "Spain", flag: "🇪🇸" },
      { city: "Paris", country: "France", flag: "🇫🇷" },
      { city: "Toulouse", country: "France", flag: "🇫🇷" },
    ],
    clientsTitle: "They trust us",
    successMessage: "Thank you! Your message has been sent. We'll reply within 24 hours.",
  },
  es: {
    badge: "Hablemos de su proyecto",
    h1: "Contacte con nuestros expertos financieros",
    subtitle:
      "Hable con un CFO experimentado para identificar las palancas de crecimiento de su empresa. Primera llamada gratuita y sin compromiso.",
    trustBadge: "+85 empresas acompañadas",
    ratingLabel: "5/5 en Trustfolio",
    formTitle: "Envíenos un mensaje",
    formSubtitle: "Le respondemos en 24 horas.",
    infoTitle: "Otras formas de contactarnos",
    emailLabel: "Email",
    phoneLabel: "Teléfono",
    hoursLabel: "Horario",
    hoursValue: "Lun – Vie, 9h – 18h",
    calendlyLabel: "Reservar una cita",
    calendlyDesc: "Programe una llamada de 30 min con un experto",
    officesTitle: "Nuestras oficinas",
    offices: [
      { city: "Barcelona", country: "España", flag: "🇪🇸" },
      { city: "París", country: "Francia", flag: "🇫🇷" },
      { city: "Toulouse", country: "Francia", flag: "🇫🇷" },
    ],
    clientsTitle: "Confían en nosotros",
    successMessage: "Gracias. Su mensaje ha sido enviado. Le responderemos en 24 horas.",
  },
} as const;

const clientLogos = [
  { src: "/images/logos/logo-happyscribe.jpg", alt: "Happy Scribe" },
  { src: "/images/logos/logo-surfe.jpg", alt: "Surfe" },
  { src: "/images/logos/logo-ukio.jpg", alt: "Ukio" },
  { src: "/images/logos/logo-yego.jpg", alt: "Yego" },
  { src: "/images/logos/logo-neat.jpg", alt: "Neat" },
  { src: "/images/logos/logo-seasonly.jpg", alt: "Seasonly" },
];

/* ─── Main Component ─── */
export default function ContactPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getContactContent(locale);
  const tx = contactPageText[locale];
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-40px" });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-60px" });
  const officesRef = useRef<HTMLDivElement>(null);
  const officesInView = useInView(officesRef, { once: true, margin: "-60px" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) {
      setPending(false);
      return;
    }

    const payload = Object.fromEntries(data.entries());
    delete payload.website;

    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Webhook error:", err);
      }
    } else {
      console.log("Contact form submission:", payload);
    }

    setPending(false);
    setSuccess(true);
    form.reset();
  }

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* ═══ HERO ═══ */}
      <section className="relative bg-gradient-to-br from-iter-violet via-iter-violet to-iter-dark pt-32 pb-20 overflow-hidden">
        {/* Geometric background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full opacity-[0.06]" viewBox="0 0 1440 600" fill="none">
            <circle cx="1200" cy="100" r="400" stroke="white" strokeWidth="0.5" />
            <circle cx="200" cy="500" r="300" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="1440" y2="600" stroke="white" strokeWidth="0.3" />
            <line x1="1440" y1="0" x2="0" y2="600" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>

        <div className="container relative z-10" ref={heroRef}>
          <Breadcrumb
            locale={locale}
            items={[{ label: t.h1 }]}
            variant="dark"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium tracking-wide mb-6 backdrop-blur-sm">
              <Phone size={12} />
              {tx.badge}
            </span>

            <h1 className="text-4xl lg:text-6xl font-bold font-heading text-white leading-[1.1] mb-6">
              {tx.h1}
            </h1>

            <p className="text-lg lg:text-xl text-white/70 leading-relaxed max-w-2xl mb-8">
              {tx.subtitle}
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} className="text-iter-chartreuse fill-iter-chartreuse" />
                  ))}
                </div>
                <span className="text-white/60 text-sm">{tx.ratingLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-iter-chartreuse" />
                <span className="text-white/60 text-sm">{tx.trustBadge}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FORM + CONTACT INFO ═══ */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container" ref={formRef}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* ── Form (3/5) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl border border-border/50 shadow-xl shadow-black/[0.03] p-8 lg:p-10">
                <h2 className="text-2xl font-bold font-heading text-foreground mb-1">
                  {tx.formTitle}
                </h2>
                <p className="text-muted-foreground text-sm mb-8">
                  {tx.formSubtitle}
                </p>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-iter-chartreuse/20 flex items-center justify-center mb-6">
                      <CheckCircle2 size={32} className="text-iter-violet" />
                    </div>
                    <p className="text-lg font-semibold text-foreground mb-2">
                      {tx.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot */}
                    <div className="absolute -left-[9999px]" aria-hidden="true">
                      <label htmlFor="website">
                        Website
                        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>

                    {renderFields(t.form.fields)}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={pending}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-iter-violet text-white font-semibold text-base hover:bg-iter-violet/90 hover:shadow-lg hover:shadow-iter-violet/20 transition-all duration-300 disabled:opacity-50 w-full sm:w-auto justify-center"
                      >
                        {pending ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t.form.submit}...
                          </span>
                        ) : (
                          <>
                            <Send size={16} />
                            {t.form.submit}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* ── Contact Info (2/5) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {tx.infoTitle}
              </h3>

              {/* Email */}
              <a
                href="mailto:arnaud@unplexed.com"
                className="group flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-white hover:border-iter-violet/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0 group-hover:bg-iter-violet/20 transition-colors">
                  <Mail size={18} className="text-iter-violet" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.emailLabel}</p>
                  <p className="text-sm text-muted-foreground">arnaud@unplexed.com</p>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-white">
                <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-iter-violet" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.hoursLabel}</p>
                  <p className="text-sm text-muted-foreground">{tx.hoursValue}</p>
                </div>
              </div>

              {/* Calendly CTA */}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 rounded-2xl border-2 border-iter-chartreuse/50 bg-iter-chartreuse/5 hover:bg-iter-chartreuse/10 hover:border-iter-chartreuse transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-iter-chartreuse/20 flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-iter-dark" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    {tx.calendlyLabel}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </p>
                  <p className="text-sm text-muted-foreground">{tx.calendlyDesc}</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/iter-advisors/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-white hover:border-[#0A66C2]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0A66C2]/20 transition-colors">
                  <Linkedin size={18} className="text-[#0A66C2]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">Iter Advisors</p>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ OFFICES ═══ */}
      <section className="bg-muted/30 py-20 lg:py-24">
        <div className="container" ref={officesRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={officesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground">
              {tx.officesTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tx.offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                animate={officesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white rounded-2xl border border-border/50 p-8 text-center hover:shadow-lg hover:border-iter-violet/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{office.flag}</div>
                <h3 className="text-lg font-bold text-foreground mb-1">{office.city}</h3>
                <p className="text-sm text-muted-foreground">{office.country}</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-iter-violet rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CLIENT LOGOS ═══ */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">
            {tx.clientsTitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14 opacity-60">
            {clientLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={40}
                className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

/* ─── Form field rendering ─── */
function renderFields(fields: readonly ContactFormField[]) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < fields.length) {
    const field = fields[i];

    if (field.half && i + 1 < fields.length && fields[i + 1].half) {
      const next = fields[i + 1];
      elements.push(
        <div key={field.name} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldInput field={field} />
          <FieldInput field={next} />
        </div>
      );
      i += 2;
    } else {
      elements.push(<FieldInput key={field.name} field={field} />);
      i += 1;
    }
  }

  return elements;
}

function FieldInput({ field }: { field: ContactFormField }) {
  const baseClasses =
    "w-full bg-muted/50 border border-border/80 rounded-xl px-5 py-3.5 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-iter-violet/50 focus:ring-2 focus:ring-iter-violet/10 focus:bg-white transition-all duration-200";

  if (field.type === "textarea") {
    return (
      <div>
        <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-1.5">
          {field.label}
          {field.required && <span className="text-iter-violet ml-0.5">*</span>}
        </label>
        <textarea
          id={field.name}
          name={field.name}
          required={field.required}
          rows={5}
          className={baseClasses + " resize-none"}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={field.name} className="block text-sm font-medium text-foreground mb-1.5">
        {field.label}
        {field.required && <span className="text-iter-violet ml-0.5">*</span>}
      </label>
      <input
        id={field.name}
        type={field.type}
        name={field.name}
        required={field.required}
        className={baseClasses}
      />
    </div>
  );
}
