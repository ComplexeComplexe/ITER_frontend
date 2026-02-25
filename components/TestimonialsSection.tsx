"use client";

import { motion, useInView } from "framer-motion";
import Script from "next/script";
import { useRef } from "react";
import { Locale } from "@/lib/i18n";

const content: Record<
  Locale,
  { overline: string; heading: string; subtitle: string; widgetCta: string }
> = {
  fr: {
    overline: "Témoignages",
    heading: "Ils parlent de nous",
    subtitle:
      "Découvrez les retours de nos clients sur notre accompagnement en finance et ressources humaines.",
    widgetCta: "Découvrez les témoignages de nos clients",
  },
  en: {
    overline: "Testimonials",
    heading: "They talk about us",
    subtitle:
      "Discover our clients' feedback on our finance and human resources support.",
    widgetCta: "Discover our clients' testimonials",
  },
  es: {
    overline: "Testimonios",
    heading: "Hablan de nosotros",
    subtitle:
      "Descubra los comentarios de nuestros clientes sobre nuestro apoyo en finanzas y recursos humanos.",
    widgetCta: "Descubra los testimonios de nuestros clientes",
  },
};

const TRUSTFOLIO_SCRIPT_URL = "https://share.trustfolio.co/scripts/embed-v2.js";

export default function TestimonialsSection({ locale }: { locale: Locale }) {
  const t = content[locale];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <Script src={TRUSTFOLIO_SCRIPT_URL} strategy="afterInteractive" />
      <div className="container text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
            {t.overline}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t.heading}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            {t.subtitle}
          </p>

          <a
            className="trustfolio-widget"
            data-config-id="m8TYN2qByl3"
            data-mode="default"
            data-lazyload="true"
            data-initial-height="300"
            target="_blank"
            rel="noopener noreferrer"
            href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
          >
            {t.widgetCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
