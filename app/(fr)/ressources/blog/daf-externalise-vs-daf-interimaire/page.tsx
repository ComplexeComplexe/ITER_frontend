import { Metadata } from 'next';
import Link from 'next/link';
import BlogPostPageRefonte from '@/components/pages/BlogPostPageRefonte';
import { Callout, ProseTable } from '@/components/blog';
import MidArticleSoftCTA from '@/components/blog/MidArticleSoftCTA';
import { getDafOffer } from '@/lib/content/daf-offer';
import { MISSIONS_PONCTUELLES } from '@/lib/content/facts';

// COMP-01 (2026-07-24) — article comparatif ciblant la requête
// "DAF externalisé vs DAF intérimaire" + variantes (directeur financier
// interim vs externalise, CFO intérimaire prix).

const PAGE_URL =
  'https://www.iteradvisors.com/ressources/blog/daf-externalise-vs-daf-interimaire';

export const metadata: Metadata = {
  title:
    'DAF externalisé ou intérimaire : comparatif 2026',
  description:
    'Externalisé ou intérimaire : durée, coût, mission, engagement. Le comparatif complet pour choisir le bon modèle de direction financière.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      'DAF externalisé vs DAF intérimaire : lequel choisir en 2026 ?',
    description:
      'Externalisé ou intérimaire : durée, coût, mission, engagement. Le comparatif complet pour choisir le bon modèle de direction financière.',
    type: 'article',
    url: PAGE_URL,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: { index: true, follow: true },
};

const offer = getDafOffer('fr');
const transition = MISSIONS_PONCTUELLES.find(item => item.nom === 'DAF de transition')!;
const transitionPrice = `${transition.min.toLocaleString('fr-FR')} à ${transition.max.toLocaleString('fr-FR')} € HT par mois`;
const FAQ_ITEMS = [
  { question: 'Quelle est la différence principale entre DAF externalisé et DAF intérimaire ?', answer: 'Externalisé décrit le recours à un professionnel hors salariat. Une mission intérimaire ou de transition répond à un mandat temporaire ; le temps partagé répond à un besoin récurrent. La disponibilité, les responsabilités et la sortie de mission sont à préciser, sans déduire le format du seul chiffre d’affaires.' },
  { question: 'Quel est le coût d’un DAF intérimaire ?', answer: `Les propositions se comparent sur le mandat, la durée, la présence et les frais inclus. Iter présente ses missions de DAF de transition entre ${transitionPrice}, selon le périmètre. Cette fourchette est celle du cabinet, pas une moyenne du marché des intérimaires.` },
  { question: 'Dans quel cas choisir un DAF intérimaire ?', answer: 'Un départ, une absence, une transformation ou un relais pendant un recrutement peut justifier un mandat temporaire. Le niveau de présence et les pouvoirs nécessaires sont examinés avec la direction ; une urgence ne garantit pas la disponibilité immédiate d’un profil.' },
  { question: 'Le DAF externalisé peut-il remplacer définitivement un DAF salarié ?', answer: 'Un accompagnement récurrent peut convenir si sa disponibilité couvre les décisions et les échéances. Un besoin de management quotidien durable peut justifier un poste interne. Le budget seul ne permet pas de comparer deux niveaux de disponibilité différents.' },
  { question: 'Peut-on passer du DAF intérimaire au DAF externalisé ?', answer: 'Oui, un relais récurrent peut suivre une mission temporaire si le besoin évolue. Il faut préparer les hypothèses, les accès autorisés, les outils, les sujets ouverts et les personnes responsables de la reprise. Ce passage n’est pas automatique ni toujours préférable à un recrutement.' },
  { question: 'Quel modèle choisir pour une PME ?', answer: 'Listez les décisions, les équipes à encadrer, les échéances et la disponibilité nécessaire. Comparez ensuite mission ciblée, transition, temps partagé et poste salarié. Aucun seuil universel de chiffre d’affaires ne détermine le bon modèle.' },
];

export default function DafExternalisVsDafInterimairePage() {
  return <BlogPostPageRefonte locale="fr"
    breadcrumbs={{ resourcesLabel: 'Ressources', resourcesHref: '/ressources', blogLabel: 'Blog', blogHref: '/ressources/blog' }}
    slug="daf-externalise-vs-daf-interimaire" category="Comparaison"
    title="DAF externalisé ou DAF intérimaire : que choisir ?"
    dek="Durée, disponibilité, responsabilités et budget : comparer un mandat temporaire et une direction financière à temps partagé."
    author={{ name: 'Benjamin Ziza', avatar: '/images/team/benjamin-ziza.webp', jobTitle: 'Associé fondateur et CFO, Iter Advisors', url: '/a-propos/benjamin-ziza' }}
    readingTime={6} datePublished="2026-07-24" dateModified="2026-10-02"
    heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    toc={[{ id: 'differences-fondamentales', label: '1. Différences fondamentales' }, { id: 'tableau-comparatif', label: '2. Tableau comparatif' }, { id: 'cout-tjm', label: '3. Comparer les budgets' }, { id: 'quand-choisir', label: '4. Quand choisir lequel ?' }, { id: 'cas-usage', label: '5. Scénarios illustratifs' }, { id: 'conclusion', label: '6. Préparer votre décision' }]}
    tldr="Le mandat temporaire précise un relais et sa sortie. Le temps partagé organise un suivi récurrent. Comparez la disponibilité et les responsabilités avant le prix ; un statut externe ne garantit ni un délai ni une économie."
    faqItems={FAQ_ITEMS}
    relatedArticles={[{ url: '/ressources/blog/daf-externalise-vs-daf-salarie', category: 'Comparaison', title: 'DAF salarié ou externalisé : les critères de choix' }, { url: '/ressources/blog/choisir-cabinet-daf-externalise', category: 'Sélection', title: 'Choisir un cabinet : les questions à poser' }, { url: '/ressources/blog/cout-daf-externalise-tarifs-prix-2026', category: 'Budget', title: 'Comparer les budgets d’une mission DAF' }]}>
    <p>Le terme <Link href="/daf-externalise">DAF externalisé</Link> désigne le recours à une direction financière hors salariat. Pour comparer les offres, distinguez surtout le mandat temporaire, souvent appelé intérim ou transition, du suivi récurrent à temps partagé. Les mots employés par un prestataire ne suffisent pas à connaître sa disponibilité ou ses responsabilités.</p>
    <h2 id="differences-fondamentales">1. Différences fondamentales</h2>
    <h3>Un mandat temporaire avec une sortie définie</h3>
    <p>Un départ, une absence, une transformation ou un recrutement en cours peut nécessiter un relais de direction financière. La mission identifie les échéances, les pouvoirs nécessaires, les personnes à encadrer et les conditions de passation. Une présence importante peut être requise, mais elle ne découle pas automatiquement du mot « intérimaire ».</p>
    <p>Précisez aussi le cadre d’intervention : la qualification du contrat, la délégation de signature et les accès bancaires doivent être examinés avec les professionnels compétents. Le DAF coordonne les travaux dans son mandat ; les responsabilités des autres conseils et du dirigeant restent explicites.</p>
    <h3>Un suivi récurrent à temps partagé</h3>
    <p>Le temps partagé organise le reporting, le budget, les scénarios de trésorerie et les décisions avec la direction. Le rythme dépend des travaux, des données et de l’équipe. Une intervention planifiée peut suffire à certains besoins ; un management quotidien durable appelle une autre organisation.</p>
    <p>Il ne s’agit pas d’opposer une solution réservée à la crise à une solution réservée à la croissance. Une transformation peut être préparée dans la durée ; une entreprise en croissance peut avoir besoin d’un relais temporaire. Le périmètre et les disponibilités déterminent la réponse.</p>
    <h2 id="tableau-comparatif">2. Tableau comparatif</h2>
    <ProseTable><caption>Deux formats à comparer sur votre besoin réel</caption><thead><tr><th scope="col">Critère</th><th scope="col">Mandat temporaire / transition</th><th scope="col">Temps partagé récurrent</th></tr></thead><tbody>
      <tr><th scope="row">Objectif</th><td>Relais, continuité ou chantier avec conditions de sortie</td><td>Pilotage régulier et revue des décisions</td></tr>
      <tr><th scope="row">Durée</th><td>Fixée au mandat, avec modalités de prolongation</td><td>{offer.commitment}</td></tr>
      <tr><th scope="row">Présence</th><td>Définie selon la charge et les échéances</td><td>{offer.volume} mensuels indicatifs observés chez Iter, sans forfait de jours</td></tr>
      <tr><th scope="row">Budget Iter</th><td>{transitionPrice}, selon mandat</td><td>{offer.price}, selon périmètre et profil</td></tr>
      <tr><th scope="row">Responsabilités</th><td>Mandat et délégations écrites à préciser</td><td>Travaux, validations et relais à préciser</td></tr>
      <tr><th scope="row">Transmission</th><td>Prévue dès le cadrage avec le successeur</td><td>Documents et accès organisés pour assurer la continuité</td></tr>
    </tbody></ProseTable>
    <h2 id="cout-tjm">3. Coûts et TJM : comparer ce qui est inclus</h2>
    <p>Un tarif journalier et un forfait mensuel ne couvrent pas forcément le même travail. Demandez la durée envisagée, les disponibilités, les livrables, les frais de déplacement et le traitement d’une prolongation. Comparez aussi la production comptable, les logiciels et le travail conservé en interne.</p>
    <p>Exemple de calcul fictif, sans référence à un prix de marché : une proposition à 1 000 € HT par jour pour 20 jours représente 20 000 € HT avant les éventuels frais explicités au devis. Une proposition forfaitaire s’examine sur ses livrables et ses exclusions. Ce calcul ne prouve ni équivalence de service ni économie.</p>
    <p>Chez Iter, le suivi récurrent couvre un périmètre de travail et une séniorité. {offer.billing} Consultez les <Link href="/daf-externalise/tarifs">tarifs DAF externalisé</Link> et demandez un mandat distinct pour la transition. Aucune moyenne de TJM ou commission de cabinet n’est présentée ici comme une donnée de marché vérifiée.</p>
    <MidArticleSoftCTA locale="fr" />
    <h2 id="quand-choisir">4. Quand choisir lequel ?</h2>
    <Callout type="info" title="Examiner un relais temporaire"><ul><li>Un départ ou une absence laisse des échéances à tenir.</li><li>Un chantier demande une présence et des responsabilités dédiées.</li><li>Un recrutement est engagé et une passation doit être organisée.</li></ul></Callout>
    <Callout type="info" title="Examiner le temps partagé"><ul><li>La direction a besoin d’un reporting et de prévisions régulières.</li><li>L’équipe et le cabinet comptable produisent les données, mais les arbitrages restent à préparer.</li><li>Le rythme convenu couvre les décisions sans nécessiter de présence quotidienne permanente.</li></ul></Callout>
    <p>Listez les décisions et les personnes à encadrer, puis comparez les disponibilités proposées. Une acquisition, une levée ou une difficulté de trésorerie n’impose pas automatiquement un format unique. Les conseils juridiques, fiscaux et spécialisés restent mobilisés selon la situation.</p>
    <h2 id="cas-usage">5. Trois scénarios illustratifs, pas des cas clients</h2>
    <p>Les situations suivantes sont fictives. Elles décrivent des critères de choix, sans résultat mesuré, budget réel ni référence client.</p>
    <h3>Départ pendant une négociation bancaire</h3><p>Le dirigeant identifie les échéances et les documents, puis examine un relais temporaire avec responsabilités définies. Le mandat prévoit la continuité et la passation au successeur. L’acceptation d’un financement reste une décision des parties concernées.</p>
    <h3>SaaS avec des indicateurs dispersés</h3><p>Les contrats, la facturation et le reporting utilisent des définitions différentes du revenu récurrent. Une mission ciblée peut rapprocher les données ; un suivi à temps partagé peut ensuite préparer les revues investisseurs. L’offre <Link href="/fractional-cfo-startups">Fractional CFO pour startups et SaaS</Link> détaille ces travaux.</p>
    <h3>Passage d’un relais à une organisation durable</h3><p>Une mission temporaire se termine. L’équipe prépare les procédures, les hypothèses et les sujets ouverts. Selon la charge, la suite peut être un recrutement, un temps partagé ou une reprise complète en interne. Aucun passage de relais n’est présenté comme systématiquement plus efficace.</p>
    <h2 id="conclusion">6. Préparer votre décision</h2>
    <p>Définissez d’abord le besoin : échéances, disponibilité, responsabilités et sortie. La <Link href="/daf-externalise/transition">DAF de transition</Link> organise un mandat temporaire ; le <Link href="/daf-externalise/temps-partage">DAF à temps partagé</Link> organise le suivi récurrent. Iter présente les deux formats, sous réserve d’un cadrage et de la disponibilité des profils.</p>
    <p>Demandez qui intervient, quels accès sont nécessaires, qui valide les engagements et comment la transmission se fera. Le <Link href="/ressources/cas-clients/opti-digital-structuration-financement">cas documenté Opti Digital</Link> illustre une structuration dans la durée ; il n’est pas présenté comme une mission de transition ni un résultat reproductible.</p>
    <h2 id="faq">FAQ : DAF externalisé et DAF intérimaire</h2>
    {FAQ_ITEMS.map(item => <details key={item.question} className="site-card my-3 rounded-lg border border-border p-4"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.answer}</p></details>)}
    <p>Présentez votre organisation, vos échéances et le besoin de présence. Le premier échange sert à qualifier le mandat ; aucun délai de proposition ou de démarrage n’est garanti avant cadrage. <Link href="/contact#transition">Décrire mon besoin de relais finance</Link>.</p>
  </BlogPostPageRefonte>;
}
