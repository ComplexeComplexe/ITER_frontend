import Image from 'next/image';
import experience from '@/data/pennylaneExperience.json';

/** Firsthand process; the illustration contains synthetic data only. */
export default function PennylanePractice() {
  const t = experience.fr;
  return <section id="pratique-pennylane" className="scroll-mt-28 border-b border-border py-10">
    <h2 className="text-2xl font-bold font-heading mb-5">{t.labels.workflow}</h2>
    <ol className="list-decimal pl-6 space-y-3 text-muted-foreground leading-relaxed">
      {t.workflow.map(step => <li key={step}>{step}</li>)}
    </ol>
    <h3 className="font-bold text-lg mt-7 mb-3">{t.labels.reporting}</h3>
    <p className="site-copy text-muted-foreground leading-relaxed">{t.reporting}</p>
    <p className="text-sm text-muted-foreground leading-relaxed mt-4">{t.labels.official}</p>
    <ul className="list-disc pl-5 text-sm space-y-2 mt-3">
      <li><a href="https://help.pennylane.com/fr/articles/85672-optimiser-ses-analyses-avec-les-rapports-analytiques" className="text-iter-violet underline">{t.labels.reportsLink}</a></li>
      <li><a href="https://help.pennylane.com/fr/articles/43690-comprendre-le-tableau-de-bord-analytique" className="text-iter-violet underline">{t.labels.dashboardLink}</a></li>
    </ul>
    <figure className="mt-7">
      <Image src="/images/blog/covers/pennylane-reporting-fictif.svg" alt={t.labels.figureAlt} width={1600} height={1170} sizes="(max-width: 768px) 100vw, 896px" className="w-full h-auto rounded-2xl border border-border" />
      <figcaption className="text-sm text-muted-foreground leading-relaxed mt-3">{t.labels.figureCaption}</figcaption>
    </figure>
  </section>;
}
