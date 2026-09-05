import { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { getCmsNavigation } from "@/lib/static-content";
import { Callout, ProseTable, InlineCTA } from "@/components/blog";

export const metadata: Metadata = {
  title: "Guide Levée Fonds | Iter Advisors",
  description:
    "Guide complet levée de fonds. Préparation comptable, due diligence, documentation, valorisation. Iter Advisors a assisté startups à lever +100M€.",
  alternates: {
    canonical: "https://www.iteradvisors.com/ressources/blog/levee-de-fonds-guide",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    images: [
      {
        url: "/images/blog/levee-de-fonds.webp",
        alt: "Levée de fonds : préparation financière et juridique 2026",
      },
    ],
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");

  return (
    <BlogPostPageRefonte
      locale="fr"
      cmsNavigation={cmsNavigation}
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="levee-de-fonds-guide"
      category="Financement"
      title="Levée de fonds : préparation financière et juridique 2026"
      dek="Comment préparer votre levée de fonds ? Due diligence financière, documentations requises, valorisation. Guide avec checklist."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Associé fondateur — CFO & Investisseur, Iter Advisors",
      }}
      readingTime={11}
      // DONNÉE (2026-08-31, Guillaume Rostand) — durée réelle et signaux de
      // due diligence observés sur les levées accompagnées. Le TL;DR annonçait
      // encore « succès 90 % plus probable » et « +15-30 % de valorisation »,
      // deux statistiques sans source que le corps avait déjà retirées.
      dateModified="2026-09-01"
      heroImage="/images/blog/covers/levee-de-fonds-guide.svg"
      toc={[
        { id: "pourquoi", label: "Pourquoi la préparation fait la différence" },
        { id: "duree", label: "Combien de temps dure vraiment une levée" },
        { id: "timeline", label: "Timeline en 7 étapes" },
        { id: "preparation", label: "Préparation financière" },
        { id: "due-diligence", label: "Due diligence financière" },
        { id: "signaux", label: "Les 4 signaux qui font douter un investisseur" },
        { id: "checklist", label: "Checklist 30 points" },
      ]}
      tldr={
        <>
          <p>
            <strong>Une levée dure 6 à 9 mois</strong> entre le début de la préparation et
            le closing, sur les levées que nous accompagnons. Les investisseurs jugent
            d&apos;abord la traction et le marché ; la préparation financière décide de
            ce qui ne déraille pas ensuite.
          </p>
          <p>
            <strong>Préparation minimale :</strong> 2 à 3 mois avant le premier pitch.
            Comptes à jour, data room, modèle financier, cap table propre.
          </p>
          <p>
            <strong>Ce qui fait échouer une due diligence :</strong> des documents mal
            préparés, une trésorerie réelle non signalée, une propriété intellectuelle
            pas ficelée, des clients présentés sans leur risque de churn.
          </p>
        </>
      }
      faqItems={[
        {
          question: "Combien de temps dure une levée de fonds ?",
          answer:
            "Sur les levées que nous accompagnons, 6 à 9 mois entre le début de la préparation et le closing : 2 à 3 mois de préparation (comptes, data room, modèle financier), puis 4 à 6 mois de phase investisseurs, de la prise de contact à la signature. Une préparation incomplète allonge la due diligence, pas l'inverse.",
        },
        {
          question: "Qu'est-ce qui fait échouer une due diligence financière ?",
          answer:
            "Quatre signaux reviennent sur nos missions : des documents mal préparés ou incohérents entre eux, une trésorerie réelle non signalée (runway plus court que présenté), une propriété intellectuelle pas ficelée (cessions de droits des salariés et freelances manquantes), et des clients présentés sans leur potentiel de churn.",
        },
        {
          question: "Combien de temps faut-il pour préparer une levée ?",
          answer:
            "Comptez 2 à 3 mois si la comptabilité est à jour, davantage si les comptes N-1 ne sont pas clos ou si la cap table n'est pas documentée. La préparation est la seule phase que vous maîtrisez entièrement : c'est celle qu'un DAF externalisé compresse.",
        },
      ]}
      relatedArticles={[
        {
          url: "/daf-externalise",
          category: "DAF externalisé",
          title: "Externaliser sa direction financière : l'offre, les tarifs et la méthode",
        },
        {
          url: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          category: "Fiscalité",
          title: "Régimes fiscaux France vs Espagne : optimisation",
        },
      ]}
      metaDescription="Levée de fonds : préparation financière et juridique. Due diligence, checklist, valorisation. Iter Advisors a aidé startups à lever 100M€+."
    >
      <h2 id="pourquoi">Pourquoi la préparation fait la différence entre un closing en 4 mois et 18 mois</h2>

      <p>
        Une levée de fonds bien préparée multiplie vos chances de succès. Les données
        montrent que :
      </p>

      {/* SEO-AUD-0824 §1 — trois statistiques présentées comme des moyennes
          (« 90 % de succès contre 40 % », « +25 % de valorisation », « -60 % de
          durée ») sans source, échantillon ni période. Une valorisation et un
          délai de closing dépendent d'abord du marché et de la traction : les
          attribuer à la préparation financière n'est pas démontrable. */}
      <p>
        Une levée se joue sur la traction et le marché ; la préparation financière ne
        les remplace pas. Ce qu'elle change est plus circonscrit, et c'est déjà
        beaucoup : une due diligence qui ne déterre pas de surprise, un prévisionnel
        dont les hypothèses tiennent à l'interrogatoire, et des délais qui ne dérapent
        pas faute de pièces. Les dossiers qui échouent en due diligence échouent
        rarement sur le fond — ils échouent sur ce qui n'avait pas été préparé.
      </p>

      <Callout type="info" title="Réalité des investisseurs">
        Les investisseurs consacrent 30% du temps de due diligence sur finances, 20%
        sur juridique, 50% sur marché/équipe/traction. Négliger les finances = risque
        immédiat.
      </Callout>

      <p>
        Une bonne préparation signale aussi votre maturité. Les investisseurs aiment les
        founders qui comprennent leurs finances, pilotent le cash, projettent
        intelligemment.
      </p>

      <h2 id="duree">Combien de temps dure vraiment une levée de fonds</h2>

      <p>
        Sur les levées que nous avons accompagnées, le délai réel entre le début de la
        préparation et le virement des fonds se situe entre <strong>6 et 9 mois</strong>.
        Les récits de levée bouclée en huit semaines existent ; ils concernent des
        tours relais menés avec des investisseurs déjà au capital, pas une première
        levée institutionnelle.
      </p>
      <p>
        Le temps se répartit en deux blocs très différents. La préparation — comptes à
        jour, data room, modèle financier, cap table — prend 2 à 3 mois, et c&apos;est le
        seul bloc que vous maîtrisez entièrement. La phase investisseurs, de la première
        prise de contact à la signature, prend 4 à 6 mois : elle dépend du calendrier des
        fonds, de leurs comités et de la due diligence. Une préparation incomplète ne
        raccourcit pas ce second bloc, elle l&apos;allonge : chaque pièce manquante devient
        une question, chaque question une semaine.
      </p>

      <h2 id="timeline">Timeline d'une levée de fonds : de l'amorçage au closing en 7 étapes</h2>

      <p>
        Une levée se déroule sur 6 à 9 mois. Voici le calendrier recommandé :
      </p>

      <h3>T-6 mois : Discovery et diagnostic</h3>

      <ul>
        <li>Audit financier interne : historique 2-3 ans, identifier holes</li>
        <li>Audit juridique : statuts, cap table, contrats salariés/fournisseurs</li>
        <li>Audit fiscal : structures, expositions, crédits d'impôt</li>
        <li>Construction du data room (centralisé et versionnée)</li>
      </ul>

      <h3>T-4 mois : Nettoyage</h3>

      <ul>
        <li>Corriger cap table (actions de complaisance, BSPCE non documentés)</li>
        <li>Mettre à jour statuts et registre d'actionnaires</li>
        <li>Signer les documents manquants (contrats d'emploi, NDA)</li>
        <li>Clôturer comptes N-2, N-1 complètement</li>
      </ul>

      <h3>T-3 mois : Préparation financière</h3>

      <ul>
        <li>Projections financières 3-5 ans (revenue, EBITDA, burn rate)</li>
        <li>Modèle de valorisation DCF (discounted cash flow)</li>
        <li>Budget d'utilisation des fonds (use of proceeds)</li>
        <li>Pitch deck financier (10-15 slides avec métriques)</li>
      </ul>

      <h3>T-2 mois : Outreach & pitch</h3>

      <ul>
        <li>Lister 30-50 investisseurs cibles (VCs, BA, corporate, family offices)</li>
        <li>Pitch meetings (format 20-30 min, deck + démo)</li>
        <li>Term sheet négociation (premiers intéressés)</li>
      </ul>

      <h3>T-1 mois : Due diligence</h3>

      <ul>
        <li>
          Répondre questions financières détaillées (cohort analysis, unit economics,
          CAC/LTV)
        </li>
        <li>Accès data room aux avocats/auditeurs de l'investisseur</li>
        <li>Appels référence clients, partenaires, clients</li>
      </ul>

      <h3>T-0 : Closing</h3>

      <ul>
        <li>Signature documents légaux et financiers</li>
        <li>Virement des fonds</li>
        <li>Enregistrement cap table + governance</li>
      </ul>

      <ProseTable>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Durée</th>
            <th>Acteurs clés</th>
            <th>Livrables</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discovery</td>
            <td>6-8 sem</td>
            <td>CFO, avocat, auditeur</td>
            <td>Audit complet, diagnostique</td>
          </tr>
          <tr>
            <td>Nettoyage</td>
            <td>4-6 sem</td>
            <td>CFO, généraliste</td>
            <td>Cap table clean, docs signés</td>
          </tr>
          <tr>
            <td>Préparation</td>
            <td>4-8 sem</td>
            <td>CFO, founder</td>
            <td>Business plan, pitch deck, data room</td>
          </tr>
          <tr>
            <td>Outreach</td>
            <td>6-12 sem</td>
            <td>Founder, sponsor</td>
            <td>Term sheet</td>
          </tr>
          <tr>
            <td>Due diligence</td>
            <td>4-8 sem</td>
            <td>CFO, avocat, auditeur</td>
            <td>Reports financiers/légaux</td>
          </tr>
          <tr>
            <td>Closing</td>
            <td>2-4 sem</td>
            <td>Avocat, CFO</td>
            <td>Financement reçu</td>
          </tr>
        </tbody>
      </ProseTable>

      <h2 id="preparation">Préparation financière : les documents et modèles attendus par les investisseurs</h2>

      <p>
        La préparation financière est le fondement. Elle couvre 4 piliers :
      </p>

      <h3>Pilier 1 : Historique financier solide</h3>

      <p>
        Les investisseurs veulent voir une comptabilité propre sur 2-3 ans minimum.
        Cela signifie :
      </p>

      <ul>
        <li>Comptes annuels certifiés (non certifiés = red flag)</li>
        <li>Compte de résultat détaillé (par produit, par canal d'acquisition)</li>
        <li>Bilan consolidant tous les actifs/passifs</li>
        <li>Cash flow statement (SG&A vs dépenses croissance)</li>
      </ul>

      <Callout type="warning" title="Erreur courante">
        Beaucoup de startups ont comptabilité non à jour ou incohérente (décalage
        factures/encaissements). Prévoir 2-3 mois pour régulariser.
      </Callout>

      <h3>Pilier 2 : Métriques et KPIs</h3>

      <p>
        Les investisseurs veulent des SaaS-like metrics même pour non-SaaS :
      </p>

      <ul>
        <li>
          <strong>SaaS :</strong> MRR, ARR, churn, LTV, CAC, payback period
        </li>
        <li>
          <strong>E-commerce :</strong> AOV, CAC, LTV, repeat rate, gross margin
        </li>
        <li>
          <strong>Marketplace :</strong> GMV, take rate, seller NPS, liquidity
        </li>
      </ul>

      <p>
        Ces métriques doivent être en croissance stable (trajectoire prévisible).
      </p>

      <h3>Pilier 3 : Projections crédibles</h3>

      <p>
        Les projections 3-5 ans doivent être :
      </p>

      <ul>
        <li>
          <strong>Détaillées :</strong> Par ligne (revenue, COGS, SG&A, opex, capex)
        </li>
        <li>
          <strong>Conservatrices :</strong> Ne pas projeter 200% croissance sans traction
        </li>
        <li>
          <strong>Sensibles :</strong> Scénarios base/bull/bear avec hypothèses claires
        </li>
        <li>
          <strong>Justifiées :</strong> Benchmarks industrie, études marché, retours
          clients
        </li>
      </ul>

      <p>
        Exemple : "Hypothèse CAC $500, LTV $5k, payback 2 mois = croissance 120%/an"
        (cohérent). vs "Projection 500% croissance" (non crédible).
      </p>

      <h3>Pilier 4 : Budget use of proceeds</h3>

      <p>
        Les investisseurs exigent un budget détaillé d'utilisation des fonds. Exemple
        pour levée €2M :
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Poste</th>
            <th>%</th>
            <th>Montant</th>
            <th>Justification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Équipe (2 eng + 1 product)</td>
            <td>50%</td>
            <td>€1,000k</td>
            <td>Salaires + charges 18 mois</td>
          </tr>
          <tr>
            <td>Marketing & acquisition</td>
            <td>20%</td>
            <td>€400k</td>
            <td>CAC payback strategy</td>
          </tr>
          <tr>
            <td>Infrastructure & ops</td>
            <td>15%</td>
            <td>€300k</td>
            <td>Cloud, outils, support</td>
          </tr>
          <tr>
            <td>Working capital</td>
            <td>10%</td>
            <td>€200k</td>
            <td>Buffer trésorerie 3 mois</td>
          </tr>
          <tr>
            <td>Réserve</td>
            <td>5%</td>
            <td>€100k</td>
            <td>Flexibilité</td>
          </tr>
        </tbody>
      </ProseTable>

      <h2 id="due-diligence">Due diligence financière : ce que les VCs vérifient en premier</h2>

      <p>
        La due diligence est le processus par lequel l'investisseur audite votre
        entreprise. Financièrement, cela inclut :
      </p>

      <h3>Phase 1 : Desk review (2 sem)</h3>

      <p>
        L'investisseur examine documents sans rencontres. Il vérifie :
      </p>

      <ul>
        <li>Comptes annuels, bilans, P&L</li>
        <li>Contrats clés (clients, fournisseurs, partenariats)</li>
        <li>Cap table et structure actionnariale</li>
        <li>Brevets, propriété intellectuelle, licences</li>
      </ul>

      <h3>Phase 2 : Management meetings (3-4 sem)</h3>

      <p>
        L'investisseur rencontre équipe et demande clarifications. Questions typiques :
      </p>

      <ul>
        <li>"Pourquoi churn a augmenté T2?" (analyse par cohorte)</li>
        <li>"Quels sont les clients &gt;10% de revenue?" (concentration risk)</li>
        <li>"Burn rate ? Runway ?" (projections de trésorerie)</li>
        <li>"Unit economics par segment ?" (profitabilité granulaire)</li>
      </ul>

      <h3>Phase 3 : Audit externe (4-6 sem)</h3>

      <p>
        L'investisseur fait auditer par cabinet indépendant :
      </p>

      <ul>
        <li>
          <strong>Audit financier :</strong> Vérification comptes (validité chiffres,
          provisions, conformité IFRS)
        </li>
        <li>
          <strong>Audit légal :</strong> Structure, litigations, conformité (AVA, data,
          employeurs)
        </li>
        <li>
          <strong>Audit fiscal :</strong> Exposition fiscale, crédits d'impôt,
          restructuration
        </li>
      </ul>

      <h2 id="signaux">Les 4 signaux qui font douter un investisseur en due diligence</h2>

      <p>
        Les due diligences qui déraillent sur nos missions ne déraillent presque jamais
        sur le fond du business. Elles déraillent sur quatre points, toujours les mêmes,
        et tous évitables en amont.
      </p>

      <ul>
        <li>
          <strong>Des documents mal préparés.</strong> Fichiers incomplets, versions
          contradictoires, un chiffre d&apos;affaires qui diffère entre le bilan, le
          pitch et le prévisionnel. L&apos;investisseur n&apos;y lit pas une erreur, il y
          lit un pilotage approximatif — et il rallonge la due diligence pour tout
          recompter.
        </li>
        <li>
          <strong>La vraie trésorerie non signalée.</strong> Un runway plus court que
          celui présenté, des dettes fournisseurs ou fiscales qui n&apos;apparaissent que
          dans les relevés. C&apos;est le signal le plus destructeur : il touche à la
          confiance, et il déplace immédiatement la négociation vers les conditions,
          pas la valorisation.
        </li>
        <li>
          <strong>Une propriété intellectuelle pas ficelée.</strong> Code écrit par un
          freelance sans cession de droits, marque non déposée, clauses de propriété
          absentes des contrats de travail. Aucun fonds n&apos;investit dans une société qui
          ne possède pas ce qu&apos;elle vend ; la régularisation prend des semaines et se
          fait sous pression.
        </li>
        <li>
          <strong>Des clients mal présentés.</strong> Une liste de logos sans le risque de
          churn qui va avec : contrats à échéance, dépendance à un ou deux comptes,
          usage réel en baisse. L&apos;investisseur le découvrira dans les appels de
          référence ; mieux vaut qu&apos;il l&apos;apprenne de vous, avec le plan pour y
          répondre.
        </li>
      </ul>

      <p>
        Les quatre relèvent de la préparation, pas de la chance. C&apos;est précisément ce
        que couvre notre{" "}
        <a href="/ressources/blog/checklist-due-diligence-levee-de-fonds">
          checklist de due diligence
        </a>
        , document par document.
      </p>

      <InlineCTA
        title="Due diligence financière intimidée ?"
        body="Nos CFOs externalisés préparent vos équipes, organisent data room, répondent questions investisseurs."
        ctaLabel="Assistance levée de fonds"
        ctaHref="/contact"
      />

      <h2 id="checklist">Checklist de préparation à la levée : 30 points de contrôle avant le premier RDV</h2>

      <h3>Comptabilité & Finance</h3>

      <ul>
        <li>☐ Comptes annuels N-1 et N-2 certifiés par expert-comptable</li>
        <li>☐ Comptes N-3 mois à jour (pas de décalage &gt; 1 mois)</li>
        <li>☐ Cash flow statement 24 mois avec forecast 36 mois</li>
        <li>☐ Détail revenue par produit/segment/canal sur 24 mois</li>
        <li>☐ Dashboard KPIs mis à jour (MRR, churn, CAC, LTV, burn rate)</li>
        <li>☐ Budget use of proceeds détaillé (12-36 mois)</li>
        <li>☐ Valorisation DCF avec hypothèses justifiées</li>
      </ul>

      <h3>Structure & Cap table</h3>

      <ul>
        <li>☐ Cap table Excel clean (actionnaires, nombre actions, %) à jour</li>
        <li>☐ Pas d'actions de complaisance (accordées sans trace)</li>
        <li>☐ BSPCE documentés et signés (stock-options plan)</li>
        <li>☐ Statuts à jour + enregistrement RCS</li>
        <li>☐ Procès-verbaux assemblées/conseil 2 ans</li>
        <li>☐ Pas de conflits d'intérêt non déclarés</li>
      </ul>

      <h3>Contrats & Juridique</h3>

      <ul>
        <li>☐ Contrats employés (CDI, non-concurrence, clauses IP)</li>
        <li>☐ Contrats clients majeurs (top 10 clients &gt;= 80% revenue?)</li>
        <li>☐ Contrats fournisseurs critiques</li>
        <li>☐ NDAs et contrats confidentialité</li>
        <li>☐ Accord partenariats stratégiques (si relevant)</li>
        <li>☐ Pas de litigations en cours (certification d'avocat)</li>
      </ul>

      <h3>Fiscalité & Conformité</h3>

      <ul>
        <li>☐ Certifications fiscales N-2, N-1 et provisions</li>
        <li>☐ Crédits d'impôt identifiés (CIR, JEI si applicable)</li>
        <li>☐ Pas d'exposition URSSAF ou tax back (vérification)
</li>
        <li>☐ Structure optimisée pour impôts post-levée</li>
        <li>☐ RGPD/data privacy audit (si collecte données)</li>
      </ul>

      <h3>Propriété Intellectuelle</h3>

      <ul>
        <li>☐ Brevets/marques enregistrés (liste et statuts)</li>
        <li>☐ Code source déposé (escrow ou cabinet d'avocats)</li>
        <li>☐ Contrats de cession d'IP des salariés</li>
        <li>☐ Pas de dépendance à code tiers (licences open source vérifiées)</li>
      </ul>

      <h3>Data room</h3>

      <ul>
        <li>☐ Organisée par dossiers (Finance, Légal, Tech, Marché, Team)</li>
        <li>☐ Accessible 24/7 via plateforme sécurisée (Intralinks, Citrix, etc.)</li>
        <li>☐ Index/table des matières</li>
        <li>☐ Versions finales non-drafts seulement</li>
        <li>☐ NDA signé avant accès complet</li>
      </ul>

      <Callout type="success" title="Prochaines étapes">
        Une fois cette checklist validée, vous êtes prêt pour la levée. Durée de la
        préparation : 2 à 3 mois si la comptabilité est à jour ; la levée complète,
        préparation comprise, dure 6 à 9 mois.
      </Callout>
    </BlogPostPageRefonte>
  );
}
