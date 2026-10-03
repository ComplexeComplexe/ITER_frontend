import type { ReactNode } from "react";

/** Commercial reading column shared with the CFO pillar. */
export default function ServiceSection({ id, title, children, tinted = false }: {
  id: string;
  title: string;
  children: ReactNode;
  tinted?: boolean;
}) {
  return <section id={id} data-block-key={id} data-page-block={id} className={`site-section relative scroll-mt-24 ${tinted ? "bg-muted/30" : "bg-background"}`}>
    <div className="container max-w-4xl">
      <h2 className="font-heading font-bold text-foreground text-balance">{title}</h2>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  </section>;
}
