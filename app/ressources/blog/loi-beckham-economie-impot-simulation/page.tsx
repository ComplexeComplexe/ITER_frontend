import { Metadata } from 'next';
import Link from 'next/link';
import BlogPostPageRefonte from '@/components/pages/BlogPostPageRefonte';
import { Callout, ProseTable } from '@/components/blog';

export const metadata: Metadata = {
  title: "Loi Beckham : combien d'impôt économisez-vous vraiment ? | Iter Advisors",
  description:
    "Taux fixe de 24 % vs barème progressif jusqu'à 47 % : simulation chiffrée de l'économie d'impôt avec le régime Beckham, par niveau de salaire.",
  alternates: {
    canonical:
      "https://www.iteradvisors.com/ressources/blog/loi-beckham-economie-impot-simulation",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Loi Beckham : combien d'impôt économisez-vous vraiment ? | Iter Advisors",
    description:
      "Taux fixe de 24 % vs barème progressif jusqu'à 47 % : simulation chiffrée de l'économie d'impôt avec le régime Beckham, par niveau de salaire.",
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
        alt: "Loi Beckham : simulation de l'économie d'impôt par niveau de salaire",
      },
    ],
  },
};

export default function Page() {
  return (
    <BlogPostPageRefonte
      locale="fr"
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="loi-beckham-economie-impot-simulation"
      category="Fiscalité Espagne"
      title="Loi Beckham : le calcul de l'économie d'impôt, salaire par salaire"
      dek="Barème progressif à 47 % contre taux fixe à 24 % : simulations réelles pour 30 000, 50 000, 80 000 et 120 000 € de salaire annuel."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Associé fondateur — CFO & Investisseur, Iter Advisors",
        url: "/a-propos/benjamin-ziza",
      }}
      readingTime={5}
      dateModified="2026-07-24"
      heroImage="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80"
      toc={[
        { id: "principe-calcul", label: "1. Comment fonctionne le calcul" },
        { id: "tableau-simulation", label: "2. Simulation salaire par salaire" },
        { id: "plafond-600k", label: "3. Le plafond à 600 000 €" },
        { id: "duree-6-ans", label: "4. La durée : 6 ans maximum" },
        { id: "comparaison-france", label: "5. Comparaison avec l'imposition française" },
      ]}
      tldr="La loi Beckham est avantageuse à partir de 55 000 € de salaire annuel. Pour 80 000 € : économie de ~3 800 €/an (22 800 € sur 6 ans). Pour 120 000 € : économie de ~13 200 €/an (79 200 € sur 6 ans)."
      faqItems={[
        {
          question: "À partir de quel salaire la loi Beckham est-elle intéressante ?",
          answer:
            "Le régime Beckham devient véritablement avantageux à partir de 55 000 à 60 000 € de salaire brut annuel. En dessous, le taux fixe de 24% peut être supérieur au taux effectif du barème progressif espagnol pour les tranches basses.",
        },
        {
          question: "Quel est le plafond du taux à 24% avec la loi Beckham ?",
          answer:
            "Le taux de 24% s'applique jusqu'à 600 000 € de revenus du travail. Au-delà, le taux de 47% s'applique sur la fraction excédentaire — exactement comme le barème classique.",
        },
        {
          question: "Peut-on cumuler Beckham avec des déductions fiscales espagnoles ?",
          answer:
            "Non. Le régime Beckham est un régime optionnel qui remplace intégralement le barème de droit commun. Vous ne pouvez pas déduire les charges familiales, intérêts d'emprunt ou autres déductions habituelles de l'IRPF.",
        },
        {
          question: "Comment se calcule l'impôt avec le régime Beckham ?",
          answer:
            "Tous les revenus du travail de source espagnole sont imposés à 24% flat rate (sans progressivité, sans tranches). Exemple : 80 000 € × 24% = 19 200 € d'IRPF annuel, versus ~23 000 € avec le barème classique.",
        },
        {
          question: "Peut-on sortir du régime Beckham si on réalise qu'il n'est pas avantageux ?",
          answer:
            "Oui, il est possible de renoncer au régime Beckham lors du dépôt de la déclaration annuelle. Attention : cette renonciation est définitive, vous ne pourrez pas y revenir pour les années suivantes.",
        },
      ]}
      relatedArticles={[
        {
          url: "/ressources/fiscalite/loi-beckham",
          category: "Fiscalité",
          title: "Guide complet de la loi Beckham en Espagne",
        },
        {
          url: "/ressources/blog/loi-beckham-espagne-conditions-eligibilite",
          category: "Fiscalité",
          title: "Loi Beckham : les conditions d'éligibilité en 2026",
        },
        {
          url: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          category: "Fiscalité",
          title: "Régimes fiscaux France vs Espagne",
        },
      ]}
    >
      <h2 id="principe-calcul">1. Comment fonctionne le calcul</h2>

      <p>
        En Espagne, les résidents fiscaux de droit commun sont soumis à l&apos;IRPF
        (Impuesto sobre la Renta de las Personas Físicas), un barème progressif dont le
        taux marginal atteint <strong>47 %</strong> au-delà de 300 000 € de revenus
        annuels. Pour un salarié à 80 000 €, le taux effectif réel avoisine 28-29 %.
      </p>

      <p>
        La <Link href="/ressources/fiscalite/loi-beckham">loi Beckham</Link> (régime
        spécial d&apos;imposition pour impatriés — article 93 de la Loi IRPF) remplace
        intégralement ce barème progressif par un <strong>taux fixe de 24 %</strong> sur
        l&apos;ensemble des revenus du travail de source espagnole, jusqu&apos;à
        600 000 € annuels.
      </p>

      <p>
        Le mécanisme est simple : au lieu de multiplier vos revenus par un taux croissant
        tranche par tranche, l&apos;administration espagnole applique directement 24 %
        sur la totalité. Ce taux flat est identique quelle que soit la hauteur du revenu
        (dans la limite du plafond). Plus votre salaire est élevé, plus l&apos;écart avec
        le barème progressif se creuse — et plus l&apos;économie est substantielle.
      </p>

      <Callout type="info" title="Taux effectif vs taux marginal">
        Ne confondez pas taux marginal et taux effectif. Un salarié à 80 000 € en
        Espagne voit son dernier euro taxé à 37-45 % (taux marginal), mais son impôt
        total représente environ 28-29 % de son revenu brut (taux effectif). Le régime
        Beckham impose quant à lui{" "}
        <strong>100 % du revenu à 24 %</strong>, ce qui devient avantageux à partir d&apos;une
        certaine seuil.
      </Callout>

      <h2 id="tableau-simulation">2. Simulation salaire par salaire</h2>

      <p>
        Le tableau ci-dessous compare l&apos;imposition IRPF classique et l&apos;imposition
        Beckham pour quatre niveaux de salaire brut annuel représentatifs. Les montants
        d&apos;impôt IRPF classique sont calculés sur la base du barème progressif
        combiné (national + régional) applicable en 2026 en Catalogne.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Salaire brut</th>
            <th>Impôt barème classique</th>
            <th>Impôt Beckham (24 %)</th>
            <th>Économie annuelle</th>
            <th>Économie sur 6 ans</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>30 000 €</td>
            <td>~5 400 €</td>
            <td>7 200 €</td>
            <td>
              <span style={{ color: "var(--color-error, #dc2626)" }}>−1 800 €</span>
            </td>
            <td>
              <span style={{ color: "var(--color-error, #dc2626)" }}>−10 800 €</span>
            </td>
          </tr>
          <tr>
            <td>50 000 €</td>
            <td>~11 000 €</td>
            <td>12 000 €</td>
            <td>
              <span style={{ color: "var(--color-error, #dc2626)" }}>−1 000 €</span>
            </td>
            <td>
              <span style={{ color: "var(--color-error, #dc2626)" }}>−6 000 €</span>
            </td>
          </tr>
          <tr>
            <td>80 000 €</td>
            <td>~23 000 €</td>
            <td>19 200 €</td>
            <td>
              <strong style={{ color: "var(--color-success, #16a34a)" }}>+3 800 €</strong>
            </td>
            <td>
              <strong style={{ color: "var(--color-success, #16a34a)" }}>+22 800 €</strong>
            </td>
          </tr>
          <tr>
            <td>120 000 €</td>
            <td>~42 000 €</td>
            <td>28 800 €</td>
            <td>
              <strong style={{ color: "var(--color-success, #16a34a)" }}>+13 200 €</strong>
            </td>
            <td>
              <strong style={{ color: "var(--color-success, #16a34a)" }}>+79 200 €</strong>
            </td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="warning" title="La loi Beckham n'est pas toujours avantageuse">
        Pour les salaires inférieurs à 55 000 €, le bénéfice est marginal voire nul. En
        dessous de ce seuil, le taux effectif du barème progressif espagnol reste
        inférieur à 24 % — le taux fixe de Beckham est alors plus pénalisant. Simulez
        votre situation précise avant d&apos;inclure ce régime dans votre décision
        d&apos;expatriation.
      </Callout>

      <p>
        Le point d&apos;indifférence — là où les deux régimes sont équivalents — se situe
        autour de <strong>55 000 à 60 000 € de revenu brut annuel</strong>. C&apos;est le
        seuil à partir duquel le taux effectif du barème classique dépasse 24 %. En
        deçà, la progressivité du barème joue en faveur du contribuable ordinaire.
      </p>

      <p>
        À noter que les chiffres du tableau représentent uniquement l&apos;IRPF
        (impôt sur le revenu). Les cotisations de sécurité sociale du salarié
        (environ 6,35 % du salaire brut) s&apos;appliquent identiquement dans les deux
        régimes et n&apos;entrent pas dans ce calcul.
      </p>

      <h2 id="plafond-600k">3. Le plafond à 600 000 €</h2>

      <p>
        Le taux préférentiel de 24 % s&apos;applique uniquement jusqu&apos;à{" "}
        <strong>600 000 € de revenus du travail annuels</strong>. Au-delà de ce seuil,
        la fraction excédentaire est imposée au taux de 47 % — soit le taux marginal le
        plus élevé du barème classique.
      </p>

      <p>
        Concrètement, pour un revenu de 700 000 € avec le régime Beckham :
      </p>

      <ul>
        <li>Premiers 600 000 € × 24 % = <strong>144 000 €</strong></li>
        <li>Tranche au-delà : 100 000 € × 47 % = <strong>47 000 €</strong></li>
        <li>IRPF total = <strong>191 000 €</strong> (taux effectif : 27,3 %)</li>
      </ul>

      <p>
        Pour comparaison, avec le barème classique, un revenu de 700 000 € serait
        intégralement soumis au taux marginal de 47 % sur la fraction haute, avec un
        impôt total avoisinant 300 000 €. Le régime Beckham reste donc très avantageux
        même pour les très hauts revenus — il n&apos;est jamais défavorable par rapport
        au barème classique, même au-delà du plafond.
      </p>

      <Callout type="info" title="Plafond et bonus variables">
        Si vous percevez des bonus ou une rémunération variable en plus de votre salaire
        fixe, l&apos;ensemble des revenus du travail s&apos;additionne pour apprécier le
        seuil de 600 000 €. Pour les profils à rémunération variable significative,
        il convient d&apos;estimer le revenu total annuel (fixe + variable + stock-options
        exercées) avant d&apos;opter pour le régime.
      </Callout>

      <h2 id="duree-6-ans">4. La durée : 6 ans maximum</h2>

      <p>
        Le régime Beckham s&apos;applique pour une durée maximale de{" "}
        <strong>6 ans</strong> : l&apos;année d&apos;arrivée en Espagne (année fiscale
        en cours) plus les 5 années civiles suivantes. Au terme de cette période, le
        contribuable bascule automatiquement dans le régime fiscal de droit commun.
      </p>

      <p>
        C&apos;est pourquoi <strong>l&apos;économie totale sur 6 ans</strong> est
        l&apos;indicateur décisionnel le plus pertinent plutôt que la seule économie
        annuelle. Un salarié à 120 000 € bénéficiant du régime Beckham accumule une
        économie de <strong>79 200 €</strong> sur la durée complète du régime. Cette
        somme représente un argument financier de poids dans une décision d&apos;expatriation.
      </p>

      <p>
        Quelques points importants sur la temporalité du régime :
      </p>

      <ul>
        <li>
          <strong>Demande dans les 6 mois :</strong> L&apos;option Beckham doit être
          demandée dans les 6 mois suivant votre inscription à la sécurité sociale
          espagnole. Passé ce délai, il n&apos;est plus possible d&apos;y accéder pour
          cette période d&apos;expatriation.
        </li>
        <li>
          <strong>Renonciation possible :</strong> Il est possible de renoncer au régime
          lors de la déclaration annuelle, mais cette renonciation est définitive pour
          les années restantes.
        </li>
        <li>
          <strong>Pas de reconduction :</strong> Une fois les 6 ans écoulés, ou en cas
          de renonciation, il n&apos;est pas possible de bénéficier à nouveau du régime
          pour une résidence ultérieure en Espagne.
        </li>
      </ul>

      <h2 id="comparaison-france">5. Comparaison avec l'imposition française</h2>

      <p>
        Pour les cadres et dirigeants qui partent d&apos;une situation fiscale française,
        la comparaison est encore plus marquante. En France en 2026, un salarié à
        120 000 € brut supporte :
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Régime</th>
            <th>Impôt sur 120 000 €</th>
            <th>Taux effectif estimé</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Barème IR français (2026)</td>
            <td>~36 000 €</td>
            <td>~30 %</td>
          </tr>
          <tr>
            <td>
              + Prélèvements sociaux FR
              <br />
              <small>(CSG/CRDS sur revenus d&apos;activité : 9,7 %)</small>
            </td>
            <td>~11 640 €</td>
            <td>+9,7 %</td>
          </tr>
          <tr>
            <td>
              <strong>Total France (IR + PS)</strong>
            </td>
            <td>
              <strong>~47 640 €</strong>
            </td>
            <td>
              <strong>~39,7 %</strong>
            </td>
          </tr>
          <tr>
            <td>IRPF classique Espagne</td>
            <td>~42 000 €</td>
            <td>~35 %</td>
          </tr>
          <tr>
            <td>
              <strong>Régime Beckham Espagne</strong>
            </td>
            <td>
              <strong>28 800 €</strong>
            </td>
            <td>
              <strong>24 %</strong>
            </td>
          </tr>
        </tbody>
      </ProseTable>

      <p>
        Pour le profil 120 000 €, la comparaison France vs Beckham fait apparaître une
        économie annuelle de l&apos;ordre de <strong>18 840 €</strong> (47 640 € − 28 800 €),
        soit <strong>plus de 113 000 € sur 6 ans</strong>. Au-delà de l&apos;argument
        fiscal pur, cette réalité chiffrée éclaire les décisions d&apos;implantation
        que prennent de nombreux dirigeants et cadres supérieurs.
      </p>

      <p>
        La comparaison reste néanmoins incomplète sans intégrer d&apos;autres paramètres :
        le coût de la vie (Barcelone vs Paris), les droits à retraite acquis dans chaque
        système, la couverture sociale, les cotisations salariales effectives, et la
        situation patrimoniale globale (IFI en France, Impuesto sobre el Patrimonio en
        Espagne). Une analyse de votre situation personnelle avec un expert fiscal
        franco-espagnol reste indispensable avant toute décision.
      </p>

      <Callout type="success" title="Beckham + Barcelone : l'équation gagnante pour les cadres seniors">
        Pour un cadre à 80 000 € ou plus envisageant une expatriation en Espagne, le
        régime Beckham représente une économie fiscale concrète et quantifiable : de
        22 800 € sur 6 ans pour 80 000 €/an à plus de 79 200 € pour 120 000 €/an.
        Ces chiffres ne tiennent pas compte des avantages liés à la non-imposition
        des revenus étrangers dans le cadre du régime, qui peuvent accroître encore
        le bénéfice pour certains profils patrimoniaux.
      </Callout>

      <div className="my-10 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-6 md:p-8">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          Simulez votre économie avec le régime Beckham
        </h3>
        <p className="mb-5 text-slate-700">
          Iter Advisors accompagne les expatriés français en Espagne dans leurs démarches
          fiscales — de la demande Beckham à la déclaration annuelle de l&apos;IRPF. Nos
          experts connaissent les deux systèmes fiscaux et optimisent votre situation
          globale.
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              <Link
                href="/ressources/fiscalite/loi-beckham"
                className="font-semibold text-iter-violet underline underline-offset-2 hover:no-underline"
              >
                Guide complet de la loi Beckham
              </Link>{" "}
              — conditions, démarches, délais et pièges à éviter.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Besoin d&apos;une simulation personnalisée ?{" "}
              <Link
                href="/contact"
                className="font-semibold text-iter-violet underline underline-offset-2 hover:no-underline"
              >
                Contactez nos experts fiscaux
              </Link>{" "}
              — premier échange gratuit et sans engagement.
            </span>
          </li>
        </ul>
      </div>
    </BlogPostPageRefonte>
  );
}
