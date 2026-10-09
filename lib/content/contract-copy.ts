import type { Locale } from "@/lib/i18n";

/** EN/ES: do not republish withdrawn contractual promises in FAQs or JSON-LD. */
export function contractCopy(text: string, locale: Locale): string {
  if (locale === "fr") return text;
  const promise = /(?:no|without)\s+(?:a\s+)?minimum\s+(?:engagement|commitment|term|duration)|without\s+(?:a\s+)?minimum\s+(?:engagement|commitment)\s+(?:duration|period)|sin\s+(?:duraci[oó]n|permanencia|compromiso)\s+m[ií]nim[oa]|no\s+hay\s+(?:duraci[oó]n|permanencia|compromiso)\s+m[ií]nim[oa]|(?:30[- ]days?|thirty[- ]days?)[’'\s-]*(?:of\s+)?notice|notice\s+period\s+is\s+30\s+days|(?:preaviso|aviso)\s+(?:para\s+[^.]+?\s+)?(?:(?:es|de)\s+)*30\s+d[ií]as|30\s+d[ií]as\s+de\s+preaviso/i;
  if (!promise.test(text)) return text;
  const sentences = text.split(/(?<=[.!?])\s+/).filter(sentence => !promise.test(sentence));
  return sentences.join(" ") || (locale === "en" ? "Duration and handover terms are agreed in the contract." : "La duración y las condiciones de traspaso se acuerdan en el contrato.");
}

export function contractContent<T>(content: T, locale: Locale): T {
  if (locale === "fr") return content;
  function walk(value: unknown): unknown {
    if (typeof value === "string") return contractCopy(value, locale);
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, walk(item)]));
    return value;
  }
  return walk(content) as T;
}
