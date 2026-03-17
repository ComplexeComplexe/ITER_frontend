"use client";

import { useState, FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactContent, ContactFormField } from "@/lib/content/contact";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

export default function ContactPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getContactContent(locale);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

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
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.h1 }]} />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">{t.h1}</h1>
          {t.paragraphs.map((p, i) => (
            <p key={i} className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="bg-iter-dark py-24 lg:py-32">
        <div className="container max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">
                Website
                <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {renderFields(t.form.fields)}

            <div className="pt-4">
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 w-full sm:w-auto justify-center"
              >
                {pending ? "..." : t.form.submit}
                {!pending && <ArrowRight size={16} />}
              </button>
            </div>

            {success && (
              <p className="text-iter-chartreuse text-lg mt-4">
                {locale === "fr"
                  ? "Merci\u00A0! Votre message a bien été envoyé."
                  : locale === "es"
                    ? "Gracias. Su mensaje ha sido enviado."
                    : "Thank you! Your message has been sent."}
              </p>
            )}
          </form>
        </div>
      </section>
    </PageLayout>
  );
}

function renderFields(fields: readonly ContactFormField[]) {
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < fields.length) {
    const field = fields[i];

    if (field.half && i + 1 < fields.length && fields[i + 1].half) {
      const next = fields[i + 1];
      elements.push(
        <div key={field.name} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  const placeholder = field.label + (field.required ? "*" : "");
  const baseClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-iter-chartreuse/50 focus:ring-1 focus:ring-iter-chartreuse/30 transition-colors";

  if (field.type === "textarea") {
    return (
      <textarea
        name={field.name}
        placeholder={placeholder}
        required={field.required}
        rows={6}
        className={baseClasses + " resize-none"}
      />
    );
  }

  return (
    <input
      type={field.type}
      name={field.name}
      placeholder={placeholder}
      required={field.required}
      className={baseClasses}
    />
  );
}
