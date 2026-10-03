import type { ReactNode } from "react";

/** Native disclosure: answers remain in server HTML, with no client bundle. */
export default function ServiceFaq({ items }: { items: ReadonlyArray<{ question: string; answer: ReactNode }> }) {
  return <div>{items.map(item => <details key={item.question} className="group border-b border-border">
    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5">
      <h3 className="font-semibold text-foreground">{item.question}</h3>
      <span aria-hidden="true" className="shrink-0 text-iter-violet group-open:rotate-45">+</span>
    </summary>
    <p className="text-base text-muted-foreground leading-relaxed pb-5">{item.answer}</p>
  </details>)}</div>;
}
