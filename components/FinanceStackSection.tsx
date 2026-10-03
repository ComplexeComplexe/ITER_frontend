import Image from 'next/image';
import type { Locale } from "@/lib/i18n";
import {
  FINANCE_STACK_LABELS,
  getFinanceStackCategories,
} from "@/lib/content/finance-stack";

export default function FinanceStackSection({ locale }: { locale: Locale }) {
  const labels = FINANCE_STACK_LABELS[locale];
  return (
    <section
      className="site-section bg-muted/20 py-16"
      aria-labelledby="finance-stack-heading"
    >
      <div className="container">
        <h2
          id="finance-stack-heading"
          className="text-3xl font-bold font-heading mb-4"
        >
          {labels.heading}
        </h2>
        <p className="site-copy text-muted-foreground max-w-3xl mb-8">
          {labels.intro}
        </p>
        <div className="space-y-8">
          {getFinanceStackCategories(locale).map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-semibold font-heading mb-4">
                {category.heading}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool) => (
                  <article
                    key={tool.name}
                    className="site-card rounded-2xl border border-border bg-background p-5"
                  >
                    {tool.logo && <div className={`h-10 flex items-center mb-4 ${tool.name === "Kyriba" ? "bg-iter-dark rounded-lg px-3 w-fit" : ""}`}><Image src={tool.logo} alt={`Logo ${tool.name}`} width={140} height={40} sizes="140px" className="h-10 w-35 object-contain object-left" /></div>}
                    <h4 className="font-semibold mb-3">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-iter-violet underline underline-offset-4"
                      >
                        {tool.name}
                      </a>
                    </h4>
                    <dl className="text-sm space-y-3">
                      <div>
                        <dt className="font-medium">{labels.usage}</dt>
                        <dd className="text-muted-foreground mt-1">
                          {tool.description}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium">{labels.profile}</dt>
                        <dd className="text-muted-foreground mt-1">
                          {tool.profile}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
