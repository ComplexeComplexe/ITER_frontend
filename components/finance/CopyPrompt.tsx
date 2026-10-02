"use client";
import type { Locale } from "@/lib/i18n";
import { useState } from "react";
export default function CopyPrompt({ text, locale = "fr" }: { text: string; locale?: Locale }) {
  const labels = { fr: ["Copier le prompt", "Prompt copié.", "Copiez le texte ci-dessus en le sélectionnant."], en: ["Copy the prompt", "Prompt copied.", "Select and copy the text above."], es: ["Copiar el prompt", "Prompt copiado.", "Selecciona y copia el texto anterior."] }[locale];
  const [message, setMessage] = useState("");
  return <div className="not-prose">
    <blockquote className="site-card rounded-xl border-l-4 border-iter-violet bg-muted/30 p-5 text-sm leading-relaxed">{text}</blockquote>
    <button type="button" className="mt-3 min-h-11 rounded-full border border-iter-violet px-5 py-2 text-sm font-semibold text-iter-violet" onClick={async () => { try { await navigator.clipboard.writeText(text); setMessage(labels[1]); } catch { setMessage(labels[2]); } }}>{labels[0]}</button>
    <span role="status" className="ml-3 text-sm">{message}</span>
  </div>;
}
