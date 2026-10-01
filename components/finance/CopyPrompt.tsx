"use client";
import { useState } from "react";
export default function CopyPrompt({ text }: { text: string }) {
  const [message, setMessage] = useState("");
  return <div className="not-prose">
    <blockquote className="site-card rounded-xl border-l-4 border-iter-violet bg-muted/30 p-5 text-sm leading-relaxed">{text}</blockquote>
    <button type="button" className="mt-3 min-h-11 rounded-full border border-iter-violet px-5 py-2 text-sm font-semibold text-iter-violet" onClick={async () => { try { await navigator.clipboard.writeText(text); setMessage("Prompt copié."); } catch { setMessage("Copiez le texte ci-dessus en le sélectionnant."); } }}>Copier le prompt</button>
    <span role="status" className="ml-3 text-sm">{message}</span>
  </div>;
}
