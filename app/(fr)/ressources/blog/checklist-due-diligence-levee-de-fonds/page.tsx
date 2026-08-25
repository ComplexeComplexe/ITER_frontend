

import { Metadata } from 'next';
import BlogPostPageRefonte from '@/components/pages/BlogPostPageRefonte';
import { Callout, StatGrid, InlineCta } from '@/components/blog';

export const metadata: Metadata = {
  title: "Due diligence financière : checklist des 47 points",
  description: "Checklist de due diligence financière pour préparer votre levée : les 47 points que les VCs et investisseurs vérifient systématiquement.",
  alternates: {
    canonical: "https://www.iteradvisors.com/ressources/blog/checklist-due-diligence-levee-de-fonds",
  },
  openGraph: {
    title: "Checklist due diligence levée de fonds | Iter Advisors",
    description: "Checklist complète pour préparer la due diligence financière de votre levée de fonds.",
    type: "article",
    images: [{ url: "/images/blog/checklist-due-diligence-levee-de-fonds.webp", width: 1200, height: 630 }],
  },
};

export default function ChecklistDueDiligencePage() {
  return (
    <BlogPostPageRefonte
      locale="fr"
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="checklist-due-diligence-levee-de-fonds"
      category="Levée de fonds"
      title="Checklist due diligence : préparation financière complète pour la levée de fonds"
      dek="Guide complet avec checklist détaillée pour préparer votre due diligence financière. Documents, analyses, et préparation avec nos experts."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Associé fondateur — CFO & Investisseur, Iter Advisors",
      }}
      readingTime={13}
      dateModified="2026-05-01"
      heroImage="/images/blog/covers/checklist-due-diligence-levee-de-fonds.svg"
      toc={[
        { id: "definition", label: "1. Qu'est-ce que la due diligence ?" },
        { id: "documents-financiers", label: "2. Documents financiers à préparer" },
        { id: "analyses-cles", label: "3. Analyses clés à avoir prêts" },
        { id: "dataroom", label: "4. Organisation dataroom" },
        { id: "timeline", label: "5. Timeline et plannification" },
        { id: "erreurs-eviter", label: "6. Erreurs à éviter" },
        { id: "faq", label: "FAQ" },
      ]}
      faqItems={[
        {
          question: "Combien de temps faut-il pour préparer une due diligence financière ?",
          answer: "La préparation d'une due diligence financière complète nécessite 4 à 8 semaines si vos documents comptables sont déjà en ordre. Sans antériorité comptable propre, comptez 10 à 12 semaines. La phase critique : rassembler 3 ans de bilans, comptes de résultat et tableaux de flux de trésorerie, puis construire un prévisionnel 3 ans auditable par un investisseur externe.",
        },
        {
          question: "Quels documents les VCs demandent-ils systématiquement en due diligence ?",
          answer: "La liste minimum que tout fonds VC demande : bilans et comptes de résultat 3 ans certifiés, cap table à jour avec les BSA/BSPCE, prévisionnel P&L + trésorerie 3 ans (avec hypothèses détaillées), contrats des 5 à 10 clients représentant 80 % du CA, table d'amortissement des dettes, et rapport KYC sur les fondateurs. Une data room bien structurée (Dealroom, DocSend) accélère le closing de 2 à 3 semaines.",
        },
        {
          question: "Quel est le rôle d'un DAF externalisé pendant la due diligence ?",
          answer: "Le DAF externalisé joue trois rôles pendant la due diligence : (1) il audite les chiffres historiques et détecte les anomalies avant que les investisseurs les trouvent ; (2) il construit le prévisionnel avec des hypothèses défendables et un modèle sensibilisé ; (3) il répond aux questions financières des VCs et de leurs experts-comptables. Chez Iter Advisors, nos DAFs ont piloté la due diligence de plus de 50 levées en Seed et Series A.",
        },
        {
          question: "Combien de temps dure une due diligence financière ?",
          answer: "Une due diligence financière standard dure 4 à 8 semaines selon la taille de l'entreprise et la complexité de sa structure financière. Pour une Series A (PME ou startup < 50 salariés), comptez 3 à 4 semaines. Pour une acquisition de PME ou une Series B+ (structure multi-entités, historique plus long), prévoyez 6 à 10 semaines. La clé : avoir une data room complète et organisée réduit le délai de 30 à 50 %.",
        },
        {
          question: "Quels documents préparer pour une due diligence financière ?",
          answer: "Les documents indispensables sont : (1) 3 derniers bilans et comptes de résultat certifiés par un commissaire aux comptes ; (2) tableaux de flux de trésorerie historiques et prévisionnels (12 mois) ; (3) grand-livre comptable détaillé ; (4) liste des engagements hors-bilan (garanties, litiges, loyers futurs) ; (5) contrats clients majeurs avec clause de renouvellement ; (6) table de capitalisation à jour ; (7) procès-verbaux des assemblées des 3 dernières années. Un DAF externalisé expérimenté peut préparer ce dossier en 2 à 3 semaines.",
        },
        {
          question: "Que regardent en priorité les VCs lors d'une due diligence ?",
          answer: "Les investisseurs vérifient en priorité : (1) la qualité du MRR/ARR et son taux de croissance (fiabilité du chiffre d'affaires récurrent) ; (2) le churn rate et la rétention nette ; (3) le burn rate et le runway restant ; (4) les marges brutes et leur évolution ; (5) la cohérence entre le compte de résultat et les flux de trésorerie (détection des manipulations comptables) ; (6) la cap table et la structure de gouvernance. Tout écart entre le pitch deck et les chiffres réels est rédhibitoire.",
        },
      ]}
      relatedArticles={[
        {
          url: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
          category: "Tarifs",
          title: "Combien coûte un DAF externalisé en 2026 ?",
        },
        {
          url: "/ressources/blog/daf-externalise-vs-daf-salarie",
          category: "DAF externalisé",
          title: "DAF externalisé vs DAF salarié : analyse complète",
        },
        {
          url: "/ressources/blog/flux-de-tresorerie",
          category: "Trésorerie",
          title: "Flux de trésorerie : définition et importance",
        },
      ]}
    >
      <h2 id="definition">1. Qu'est-ce que la due diligence ?</h2>
      <p>
        La due diligence est l'audit complet que les investisseurs (VCs, business angels, fonds) effectuent avant d'investir. Elle comprend plusieurs dimensions : financière, légale, technique, commerciale. Nous nous concentrons ici sur la financière, qui est souvent la plus chronophage.
      </p>
      <p>
        <strong>Objectifs de la DD financière :</strong>
      </p>
      <ul>
        <li>Vérifier que les chiffres reportés sont exacts et auditables</li>
        <li>Comprendre la structure des coûts et marges</li>
        <li>Évaluer la trésorerie et les besoins de financement</li>
        <li>Valider les prévisions et les hypothèses</li>
        <li>Identifier les risques financiers</li>
      </ul>

      <Callout type="warning" title="Attention">
        Si votre DD financière est mal préparée, l'investisseur va douter de votre sérieux. Cela peut couler une levée avant même de discuter des termes.
      </Callout>

      <h2 id="documents-financiers">2. Documents financiers à préparer</h2>
      <p>
        <strong>Documents obligatoires :</strong>
      </p>
      <ul>
        <li>☑️ <strong>Bilans</strong> : 3 dernières années (ou depuis fondation)</li>
        <li>☑️ <strong>Comptes de résultat</strong> : 3 dernières années, mensuel/trimestiel</li>
        <li>☑️ <strong>Tableaux de flux de trésorerie</strong> : 24 mois historique + 12 mois prévisions</li>
        <li>☑️ <strong>Cap table</strong> : Actions, options, ESOP, pourcentages</li>
        <li>☑️ <strong>Prévisions 3 ans</strong> : P&L, bilan, trésorerie (détaillé)</li>
        <li>☑️ <strong>Dossier d'imposition</strong> : Liasses fiscales, déclarations TVA</li>
      </ul>
      <p>
        <strong>Documents importants :</strong>
      </p>
      <ul>
        <li>📎 Audits / Certifications : Audit externe (si &gt;€50M), Certifications ISO</li>
        <li>📎 Contrats clients clés : Top 20 clients (revenus récurrents ?)</li>
        <li>📎 Contrats fournisseurs : Dépendances critiques</li>
        <li>📎 Analyses de coûts : Détail des marges par business unit</li>
      </ul>

      <h2 id="analyses-cles">3. Analyses clés à avoir prêts</h2>
      <p>
        Au-delà des documents bruts, les investisseurs veulent des analyses qui montrent votre compréhension du business.
      </p>
      <p>
        <strong>Analyse 1 : Unit Economics</strong>
      </p>
      <ul>
        <li>Coût d'acquisition client (CAC) par canal</li>
        <li>Lifetime value (LTV)</li>
        <li>Ratio LTV/CAC (cible : &gt;3)</li>
      </ul>
      <p>
        <strong>Analyse 2 : Runway et Burn</strong>
      </p>
      <ul>
        <li>Cash en banque</li>
        <li>Burn mensuel (dépenses opérationnelles)</li>
        <li>Runway = Mois avant épuisement cash</li>
        <li>Point de break-even (si applicable)</li>
      </ul>
      <p>
        <strong>Analyse 3 : Sensibilités / Scénarios</strong>
      </p>
      <ul>
        <li>Cas base : Croissance modérée, assomptions raisonnables</li>
        <li>Cas upside : +50 % CA, meilleure retention</li>
        <li>Cas downside : -20 % CA, retention réduite</li>
      </ul>

      <StatGrid items={[
        {
          label: "Documents à préparer",
          value: "12-15",
          sublabel: "Financiers + légaux",
        },
        {
          label: "Temps de préparation",
          value: "4-8 semaines",
          sublabel: "Si documents prêts",
        },
        {
          label: "Analyses clés",
          value: "3-5",
          sublabel: "Unit econ, runway, sensibilités",
        },
      ]} />

      <h2 id="dataroom">4. Organisation dataroom</h2>
      <p>
        Tout doit être stocké dans une dataroom virtuelle sécurisée (Dealroom, VDR, Citrix ShareFile).
      </p>
      <p>
        <strong>Structure de dossiers recommandée :</strong>
      </p>
      <ul>
        <li>📁 Financial Documents (bilans, P&L, prévisions)</li>
        <li>📁 Cap Table &amp; Equity (actions, options, dilution)</li>
        <li>📁 Tax &amp; Compliance (fiscalité, compliance, audits)</li>
        <li>📁 Contracts &amp; Legal (clients, fournisseurs, employés)</li>
        <li>📁 Due Diligence Summary (résumé exécutif, FAQs, réponses questions)</li>
      </ul>
      <p>
        <strong>Bonnes pratiques :</strong>
      </p>
      <ul>
        <li>Versioning clair (v1, v2, etc.)</li>
        <li>Documents PDF nom fichiers explicites</li>
        <li>Index avec descriptions (une page word pointant vers chaque doc)</li>
        <li>Accès granulaire par rôle (lead investor vs other angel)</li>
      </ul>

      <h2 id="timeline">5. Timeline et plannification</h2>
      <p>
        <strong>T-12 semaines : Préparation</strong>
      </p>
      <ul>
        <li>Audit comptable : vérifier que les chiffres sont justes</li>
        <li>Compilation documents : rassembler tout</li>
        <li>Rédaction prévisions : build prévisions 3 ans crédibles</li>
      </ul>
      <p>
        <strong>T-8 semaines : DD informelle</strong>
      </p>
      <ul>
        <li>Conversations seed avec business angels</li>
        <li>Feedback sur prévisions / assumptions</li>
      </ul>
      <p>
        <strong>T-4 semaines : Pitch + DataRoom</strong>
      </p>
      <ul>
        <li>Launch dataroom (accès restreint d'abord)</li>
        <li>Documents disponibles pour lead investor</li>
      </ul>
      <p>
        <strong>T-0 (DD sérieuse) : 2-4 semaines</strong>
      </p>
      <ul>
        <li>Investisseurs posent questions</li>
        <li>Audits complètes</li>
        <li>Term sheet + DD terminée = closing</li>
      </ul>

      <h2 id="erreurs-eviter">6. Erreurs à éviter</h2>
      <ul>
        <li>❌ Prévisions trop agressives (réduisez de 30-50 % vos hypothèses, soyez réaliste)</li>
        <li>❌ Documents incomplets (si factures manquent, préparez attentes clientes)</li>
        <li>❌ Comptabilité mal tenue (antériorité &lt; 1 ans : problème majeur)</li>
        <li>❌ Secrets de bisness mélangés (dataroom sensible : documents NDA)</li>
        <li>❌ Pas de CFO/DAF pour répondre questions : avoir un expert dédié</li>
      </ul>

      <InlineCta
        title="Vous préparez une levée et besoin d'aide pour la DD financière ?"
        body="Nos experts DAF accompagnent founders à préparer et structurer leur due diligence. Audit, prévisions, dataroom, réponses aux questions VCs. Support 100 % aligné sur votre levée."
        ctaLabel="Aide levée de fonds (consultation)"
        ctaHref="/contact?type=levee-de-fonds"
      />

      <h2>Conclusion</h2>
      <p>
        Une DD bien préparée accélère votre levée de 2-4 semaines et augmente la confiance des investisseurs. Elle montre que vous prenez votre finance au sérieux.
      </p>
      <p>
        Chez Iter Advisors, nous avons accompagné 200+ founders à travers des levées. Nous savons exactement ce que les VCs veulent voir et comment le présenter. Si vous levez, faites-nous un call.
      </p>

      <h2 id="faq">FAQ — Due diligence et levée de fonds</h2>
      <h3>Combien de temps faut-il pour préparer une due diligence financière ?</h3>
      <p>La préparation d'une due diligence financière complète nécessite 4 à 8 semaines si vos documents comptables sont déjà en ordre. Sans antériorité comptable propre, comptez 10 à 12 semaines. La phase critique : rassembler 3 ans de bilans, comptes de résultat et tableaux de flux de trésorerie, puis construire un prévisionnel 3 ans auditable par un investisseur externe.</p>
      <h3>Quels documents les VCs demandent-ils systématiquement en due diligence ?</h3>
      <p>La liste minimum que tout fonds VC demande : bilans et comptes de résultat 3 ans certifiés, cap table à jour avec les BSA/BSPCE, prévisionnel P&L + trésorerie 3 ans (avec hypothèses détaillées), contrats des 5 à 10 clients représentant 80 % du CA, table d'amortissement des dettes, et rapport KYC sur les fondateurs. Une data room bien structurée (Dealroom, DocSend) accélère le closing de 2 à 3 semaines.</p>
      <h3>Quel est le rôle d'un DAF externalisé pendant la due diligence ?</h3>
      <p>Le <a href="/daf-externalise">DAF externalisé</a> joue trois rôles pendant la due diligence : (1) il audite les chiffres historiques et détecte les anomalies avant que les investisseurs les trouvent ; (2) il construit le prévisionnel avec des hypothèses défendables et un modèle sensibilisé ; (3) il répond aux questions financières des VCs et de leurs experts-comptables. Chez Iter Advisors, nos DAFs ont piloté la due diligence de plus de 50 levées en Seed et Series A.</p>
    </BlogPostPageRefonte>
  );
}
