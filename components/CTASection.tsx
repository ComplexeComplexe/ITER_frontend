"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";

const ctaText: Record<Locale, { heading: string; paragraph: string; button: string; email: string }> = {
  fr: {
    heading: "Parlons de votre projet",
    paragraph: "Indiquez votre priorité, votre situation et votre échéance. Le premier échange permettra de préciser le périmètre utile et les prochaines étapes.",
    button: "Décrire mon besoin",
    email: "Nous écrire",
  },
  en: {
    heading: "Let's talk about your project",
    paragraph: "Tell us your priority, situation and timeline. The first conversation helps define the scope and next steps.",
    button: "Describe my needs",
    email: "Email us",
  },
  es: {
    heading: "Hablemos de su proyecto",
    paragraph: "Cuéntenos su prioridad, situación y plazo. La primera conversación permite definir el alcance y los próximos pasos.",
    button: "Describir mi necesidad",
    email: "Escríbenos",
  },
};

export default function CTASection({ locale, context }: { locale: Locale; context?: string }) {
  const t = ctaText[locale];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="site-section site-contact-band py-24 lg:py-32 bg-iter-chartreuse relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="site-decoration absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
          <circle cx="200" cy="300" r="300" stroke="#0A0A0A" strokeWidth="0.5" fill="none" />
          <circle cx="1200" cy="200" r="200" stroke="#0A0A0A" strokeWidth="0.5" fill="none" />
          <line x1="0" y1="100" x2="1440" y2="500" stroke="#0A0A0A" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* SEO-20: decorative heading — same visual weight, no semantic H2 duplication across pages */}
          <p className="site-cta-title text-3xl lg:text-5xl font-bold text-iter-dark leading-tight mb-6">
            {t.heading}
          </p>
          <p className="site-cta-copy text-lg text-iter-dark/70 leading-relaxed mb-10">
            {t.paragraph}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={getContactPath(locale) + (context ? `#${context}` : "")}
              className="site-button site-button-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-dark text-white font-semibold text-base hover:shadow-xl transition-all duration-300 group"
            >
              {t.button}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
