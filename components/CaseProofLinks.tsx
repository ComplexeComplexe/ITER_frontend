import Link from "next/link";
import { DOCUMENTED_CASES } from "@/lib/content/documented-cases";

export default function CaseProofLinks({ slugs, heading = "Des missions documentées" }: { slugs?: string[]; heading?: string }) {
  const cases = DOCUMENTED_CASES.filter(item => !slugs || slugs.includes(item.slug));
  return (
    <section className="bg-muted/30 py-12 sm:py-16">
      <div className="container max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6">{heading}</h2>
        <div className={`grid gap-4 ${cases.length > 2 ? "md:grid-cols-3" : cases.length === 2 ? "md:grid-cols-2" : "max-w-3xl"}`}>
          {cases.map(item => (
            <article key={item.slug} className="bg-background rounded-2xl border border-border/50 p-6 flex flex-col">
              <p className="text-sm font-semibold text-iter-violet mb-2">{item.company}</p>
              <h3 className="text-lg font-semibold mb-3">{item.proof}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{item.summary}</p>
              <Link href={item.href} className="text-iter-violet font-medium text-sm mt-auto underline underline-offset-4">Lire le cas {item.company}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
