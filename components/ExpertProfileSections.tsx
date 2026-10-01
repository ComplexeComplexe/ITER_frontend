import Link from "next/link";
import { FINANCE_EXPERT as expert } from "@/lib/content/finance-expert";

export default function ExpertProfileSections() {
  return <div className="container max-w-4xl py-12 space-y-14">
    <section id="expertise" className="scroll-mt-28">
      <p className="site-eyebrow">L’accompagnement financier</p><h2 className="mb-5">Sur quels sujets échanger avec Sébastien ?</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {title:"Direction financière à temps partagé",text:"Définir les priorités, organiser le pilotage et préparer les décisions avec le dirigeant.",href:"/daf-externalise"},
          {title:"Trésorerie et reporting",text:"Relier les encaissements, les dépenses et les indicateurs aux échéances de l’entreprise.",href:"/services/previsionnel-tresorerie"},
          {title:"Financement et acquisitions",text:"Préparer le modèle financier, les documents investisseurs et les analyses nécessaires à une opération.",href:"/services/accompagnement-levee-de-fond"},
          {title:"Outils, automatisation et IA en finance",text:"Partir d’un besoin métier, définir les contrôles et évaluer l’intérêt d’un pilote avec l’équipe finance.",href:"/ressources/ia-finance"},
        ].map(item=><Link key={item.href} href={item.href} className="site-card rounded-2xl border border-border p-6 hover:border-iter-violet"><h3 className="mb-3">{item.title}</h3><p className="text-muted-foreground leading-relaxed">{item.text}</p><span className="block mt-4 text-iter-violet text-sm underline">Découvrir le sujet</span></Link>)}
      </div>
      <p className="mt-5 text-muted-foreground leading-relaxed">Pour l’IA, le rôle du DAF porte sur les données, les indicateurs et la validation des résultats. Les guides distinguent les cas publics, les exercices pédagogiques et les missions du cabinet. Ils ne remplacent pas l’analyse de votre situation.</p>
    </section>
    <section id="parcours" className="scroll-mt-28">
      <p className="site-eyebrow">Expérience opérationnelle</p><h2 className="mb-5">Un parcours de direction financière</h2>
      <ul className="divide-y divide-border">
        <li className="py-4"><h3>Iter Advisors</h3><p className="text-muted-foreground mt-2">Associé fondateur et CFO depuis novembre 2020. Accompagnement des dirigeants sur la structuration financière et les financements.</p></li>
        <li className="py-4"><h3>Carts Guru et Terres de Café</h3><p className="text-muted-foreground mt-2">Des fonctions de direction financière avant Iter Advisors, dans des entreprises en développement.</p></li>
        <li className="py-4"><h3>Happy Scribe et SolarMente</h3><p className="text-muted-foreground mt-2">Des missions de CFO à temps partagé présentées dans son parcours professionnel public.</p></li>
      </ul>
      <p className="mt-4 text-sm text-muted-foreground">Parcours à consulter sur <a href={expert.linkedin} className="text-iter-violet underline">LinkedIn</a> et <a href={expert.malt} className="text-iter-violet underline">Malt</a>. Les périmètres et résultats des missions du cabinet sont présentés séparément dans nos <Link href="/ressources/cas-clients" className="text-iter-violet underline">cas clients</Link>.</p>
    </section>
    <section id="interventions" className="scroll-mt-28">
      <p className="site-eyebrow">Prise de parole publique</p><h2 className="mb-5">Sébastien dans Le Nerf de la Guerre</h2>
      <article className="site-card rounded-2xl bg-iter-violet/5 p-6 sm:p-8"><p className="text-sm text-muted-foreground mb-3">Podcast · épisode 12 · <time dateTime={expert.podcast.date}>7 février 2025</time></p><h3 className="mb-4">{expert.podcast.title}</h3><p className="leading-relaxed text-muted-foreground">Dans cet entretien, Sébastien revient sur son parcours et son expérience des acquisitions de filiales. Une intervention pour découvrir sa pratique de la direction financière et les sujets qu’il rencontre en entreprise.</p><a href={expert.podcast.href} className="site-button site-button-primary mt-5">Écouter l’entretien sur Ausha</a></article>
    </section>
    <section id="ressources" className="scroll-mt-28"><h2 className="mb-5">Préparer un échange avec Sébastien</h2><p className="text-muted-foreground leading-relaxed mb-5">Décrivez votre activité, votre organisation financière et la décision à préparer. Un échéancier de trésorerie, un exemple de reporting ou la liste de vos outils permettent de rendre le premier échange concret.</p><div className="flex flex-wrap gap-4"><Link href="/contact#sebastien-doat" className="site-button site-button-primary">Présenter ma situation</Link><Link href="/daf-externalise/tarifs" className="site-button site-button-secondary">Périmètres et tarifs DAF</Link></div></section>
  </div>;
}
