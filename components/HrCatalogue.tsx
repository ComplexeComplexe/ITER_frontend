import type { Locale } from '@/lib/i18n';
import { HR_CATALOGUE, HR_SERVICE_CATALOGUE_INDEX } from '@/lib/content/hr-catalogue';
import ServiceSection from '@/components/design/ServiceSection';

export default function HrCatalogue({ locale, service }: { locale: Locale; service?: string }) {
 const c = HR_CATALOGUE[locale];
 const index = service ? HR_SERVICE_CATALOGUE_INDEX[service] : undefined;
 const items = index === undefined ? c.items : [c.items[index]];
 return <ServiceSection id="catalogue-rh" title={c.title} tinted>
  <p className="site-copy text-muted-foreground max-w-4xl mt-5">{c.intro}</p>
  <div className={`grid ${service ? '' : 'md:grid-cols-2'} gap-5 mt-8`}>
   {items.map(([title, work, output]) => <article key={title} className="site-card p-6">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-muted-foreground leading-relaxed"><strong>{c.scope}: </strong>{work}</p>
    <p className="border-t border-border pt-4 mt-4 leading-relaxed"><strong>{c.output}: </strong>{output}</p>
   </article>)}
  </div>
  {!service && <><h3 className="text-xl font-semibold mt-8 mb-4">{c.separate}</h3><p className="site-copy text-muted-foreground max-w-4xl">{c.projects}</p></>}
  <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl mt-6">{c.limits}</p>
 </ServiceSection>;
}
