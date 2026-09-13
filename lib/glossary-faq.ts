import type { GlossaryEntryContent } from "@/lib/content/glossary-entries";
import type { FaqItemSchema } from "@/lib/schemas";

/** Schema follows the FAQ actually displayed by GlossaryEntryPage. */
export function glossaryFaqItems(content: GlossaryEntryContent): FaqItemSchema[] {
  return content.sections
    .filter(section => /^FAQ(?:\s|$)/i.test(section.heading ?? ""))
    .flatMap(section => section.content.flatMap(paragraph => {
      const match = paragraph.match(/^\*\*([^*]+)\*\*\s*([\s\S]+)$/);
      if (!match) return [];
      const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "").trim();
      return [{ question: plain(match[1]), answer: plain(match[2]) }];
    }));
}
