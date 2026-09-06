import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { DOCUMENTED_CASES, getDocumentedCase } from "@/lib/content/documented-cases";
import { getCmsNavigation } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

export const dynamicParams = false;
export function generateStaticParams() {
  return DOCUMENTED_CASES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const item = getDocumentedCase((await params).slug);
  if (!item) notFound();
  return buildMetadata({ locale: "fr", path: item.href, title: item.metaTitle, description: item.summary, disableHreflang: ["en", "es"] });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const item = getDocumentedCase((await params).slug);
  if (!item) notFound();
  const cmsNavigation = await getCmsNavigation("fr");
  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: item.title, description: item.summary, inLanguage: "fr",
    mainEntityOfPage: `https://www.iteradvisors.com${item.href}`,
    datePublished: item.published, dateModified: item.modified,
    author: { "@type": "Organization", name: "Iter Advisors", url: "https://www.iteradvisors.com/a-propos" },
    publisher: { "@id": "https://www.iteradvisors.com/#organization" },
  };
  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <article className="pt-28 sm:pt-32 pb-16">
        <div className="container max-w-4xl">
          <Breadcrumb locale="fr" items={[{ label: "Ressources", href: "/ressources" }, { label: "Cas clients", href: "/ressources/cas-clients" }, { label: item.company }]} />
          <p className="text-sm font-semibold text-iter-violet mt-8 mb-3">Cas client · {item.sectorTag}</p>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading leading-tight mb-6">{item.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{item.summary}</p>
          <p className="text-sm text-muted-foreground mt-4">Par <Link href="/a-propos" className="underline">Iter Advisors</Link> · Publié le <time dateTime={item.published}>5 septembre 2026</time></p>
          <div className="mt-10 space-y-10">
            <section><h2 className="text-2xl font-bold mb-4">La situation de départ</h2><p className="leading-relaxed text-muted-foreground">{item.description}</p></section>
            <section><h2 className="text-2xl font-bold mb-4">Le besoin du dirigeant</h2><p className="leading-relaxed text-muted-foreground">{item.challenge}</p></section>
            <section><h2 className="text-2xl font-bold mb-4">Le travail réalisé par Iter</h2><p className="leading-relaxed text-muted-foreground">{item.solution}</p></section>
            <section className="bg-muted/30 border border-border/50 rounded-2xl p-6"><h2 className="text-2xl font-bold mb-4">Les livrables de la mission</h2><ul className="list-disc pl-5 space-y-3">{item.deliverables.map(text => <li key={text}>{text}</li>)}</ul></section>
            <section><h2 className="text-2xl font-bold mb-4">Les résultats et leur portée</h2><ul className="list-disc pl-5 space-y-3 mb-5">{item.results.map(text => <li key={text}>{text}</li>)}</ul><p className="text-sm leading-relaxed text-muted-foreground">{item.limits}</p></section>
            {"source" in item && <section><h2 className="text-2xl font-bold mb-4">Le retour du client</h2><p className="text-muted-foreground mb-3">Consultez le témoignage de la direction sur la plateforme d’avis.</p><a href={item.source.href} className="text-iter-violet underline underline-offset-4">{item.source.label}</a></section>}
            <section className="border-t border-border pt-8"><h2 className="text-2xl font-bold mb-4">Un besoin comparable dans votre entreprise ?</h2><p className="text-muted-foreground leading-relaxed mb-5">Le premier échange sert à identifier vos priorités, les livrables utiles et le profil adapté. Le périmètre et le budget sont définis avant le démarrage.</p><div className="flex flex-wrap gap-4"><Link href={item.offer.href} className="text-iter-violet underline">{item.offer.label}</Link><Link href="/daf-externalise/tarifs" className="text-iter-violet underline">Tarifs et périmètres</Link></div><Link href={`/contact#cas-${item.slug}`} className="inline-flex mt-6 rounded-full bg-iter-chartreuse text-iter-dark px-6 py-3 font-semibold">Décrire mon besoin</Link></section>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
