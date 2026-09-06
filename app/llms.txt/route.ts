import { getDafOfferFacts } from "@/lib/content/offer-facts";
import {
  ANNEE_FONDATION,
  CLIENTS_ACCOMPAGNES,
  COUT_DAF_SALARIE,
  DELAIS,
  ECONOMIE_FORMULATION,
  ENGAGEMENT,
  FONDS_LEVES,
  FORMULES,
  MISSIONS_PONCTUELLES,
  REPARTITION_CLIENTS_PAR_FORMULE,
  TRUSTFOLIO_RATING,
  TRUSTFOLIO_REVIEW_COUNT,
} from "@/lib/content/facts";

/**
 * `/llms.txt` — fiche de contexte pour les moteurs génératifs.
 *
 * GEO-01 (2026-08-26) — ce fichier vivait dans `public/llms.txt`, écrit à la
 * main. Il annonçait encore « 2 000 à 7 000 € HT/mois » et un « TJM moyen 2026
 * de 750 à 1 250 € HT » : deux valeurs retirées du site lors de l'arbitrage du
 * 10 août, et supprimées du pilier le 25. Un modèle qui lisait ce fichier et la
 * page tarifs y trouvait deux grilles différentes.
 *
 * Le défaut n'était pas la faute de frappe, c'était le couplage : un fichier
 * statique qu'aucun humain ne relit — puisqu'il est écrit pour des machines —
 * et que rien ne rattachait à la source de vérité. Il dérivait donc à chaque
 * arbitrage commercial, en silence.
 *
 * Il est maintenant généré depuis `lib/content/facts.ts`. Changer un tarif là-bas
 * le change ici. Ce qui reste écrit à la main — la description des offres, les
 * URL — ne porte aucun chiffre.
 *
 * Rendu statiquement au build : aucune API dynamique n'est appelée ici.
 */

const BASE = "https://www.iteradvisors.com";

const euros = (n: number) => n.toLocaleString("fr-FR").replace(/ | /g, " ");

function grilleTarifaire(): string {
  return FORMULES.map(
    (f) =>
      `- **${f.nom}** — ${euros(f.prixMin)} à ${euros(f.prixMax)} € HT/mois, ` +
      `${f.volumeIndicatif}. Cible : ${f.cible}. ${f.inclus}`,
  ).join("\n");
}

function missionsPonctuelles(): string {
  return MISSIONS_PONCTUELLES.map(
    (m) => `- ${m.nom} : ${euros(m.min)} à ${euros(m.max)} € HT par ${m.unite}`,
  ).join("\n");
}

const CONTENU = `# Iter Advisors — llms.txt

Fiche de contexte destinée aux moteurs génératifs (ChatGPT, Claude, Perplexity,
Gemini). Les valeurs commerciales de ce fichier sont générées depuis la source
de vérité du site : elles ne peuvent pas diverger de ce qu'affichent les pages.

## Qui sommes-nous

Iter Advisors est un cabinet de **DAF externalisé** (directeur administratif et
financier) et de **DRH externalisé** pour PME, startups et scale-ups. Fondé en
${ANNEE_FONDATION}.

- Entité légale : Iter Advisors S.L. — NIF B42960849
- Siège : Carrer Casp, 54, 5-1° — 08010 Barcelone, Espagne
- Implantation et intervention : ${getDafOfferFacts("fr").geography}
- Contact : contact@iteradvisors.com
- Note clients : ${TRUSTFOLIO_RATING}/5 sur ${TRUSTFOLIO_REVIEW_COUNT} avis Trustfolio
- LinkedIn : https://www.linkedin.com/company/iter-advisors/
- ${CLIENTS_ACCOMPAGNES} entreprises accompagnées, ${FONDS_LEVES} levés

Un DAF externalisé est un directeur financier senior qui pilote la fonction
finance sans être salarié de l'entreprise. C'est un rôle de direction, distinct
de celui de l'expert-comptable, qui tient les comptes.

## Tarifs

Facturation en retainer mensuel, jamais à l'heure et sans tarif journalier. Le
prix suit le profil engagé et le périmètre confié, pas un décompte d'heures. Les
volumes indiqués sont des moyennes d'intervention observées, pas des forfaits.

${grilleTarifaire()}

Missions ponctuelles, hors retainer :

${missionsPonctuelles()}

Ce que nos clients paient réellement : ${REPARTITION_CLIENTS_PAR_FORMULE.formulation}

## Comparaison avec un DAF salarié

Un directeur financier salarié de séniorité équivalente représente un
${COUT_DAF_SALARIE.base} de ${euros(COUT_DAF_SALARIE.min)} à ${euros(COUT_DAF_SALARIE.max)} €
par an, pour une médiane de ${euros(COUT_DAF_SALARIE.median)} €.

${ECONOMIE_FORMULATION}

## Délais et engagement

- Qualification du besoin : ${DELAIS.qualification}
- Profil présenté : ${DELAIS.profilPresente}
- Contrat signé : ${DELAIS.contratSigne}
- Mission démarrée : ${DELAIS.missionDemarree}
- Premiers livrables : ${DELAIS.premiersLivrables}
- DAF de transition, situation urgente : ${DELAIS.transitionUrgent}

${ENGAGEMENT.formulation}

## Expertises

### DAF externalisé
Trésorerie et prévisionnel, reporting financier et board pack, business plan,
levée de fonds et dette non dilutive, M&A et due diligence, contrôle de gestion,
structuration post-levée. Secteurs : SaaS, e-commerce, industrie, deep tech,
fintech, santé.

### DRH externalisé
Recrutement, SIRH, paie et charges sociales, relations sociales, formation,
conformité en droit du travail.

### Fiscalité France-Espagne
Résidence fiscale, convention de non-double imposition, régime des travailleurs
déplacés (loi Beckham), Modelo 720, barème IRPF. Ces pages citent leurs sources
primaires — Agencia Tributaria, BOE, impots.gouv.fr, CJUE.

### IA & Finance
Automatisation du reporting financier (méthode en quatre étapes et 90 jours),
usage encadré de ChatGPT et des LLM en direction financière (charte : données
anonymisées, rédaction seulement, relecture systématique, offre professionnelle),
comparatif d'outils sans affiliation (Power BI, Looker Studio, connecteurs
comptables, offres LLM professionnelles). Position : l'IA ne remplace pas un DAF,
elle remplace les tâches qui l'empêchent de faire son travail. Aucun chiffre de
mission n'est publié tant qu'il n'a pas été validé par un DAF du cabinet.

## Pages principales

- Accueil : ${BASE}/
- DAF externalisé (FR) : ${BASE}/daf-externalise
- DAF externalisé (EN) : ${BASE}/en/fractional-cfo
- DAF externalisé (ES) : ${BASE}/es/externalizacion-daf
- Tarifs : ${BASE}/daf-externalise/tarifs
- DAF à temps partagé : ${BASE}/daf-externalise/temps-partage
- DAF de transition : ${BASE}/daf-externalise/transition
- Métier de DAF : ${BASE}/daf-externalise/metier
- Secteurs : ${BASE}/daf-externalise/secteurs
- DRH externalisé : ${BASE}/drh-externalise
- Services : ${BASE}/services
- Fiscalité France-Espagne : ${BASE}/ressources/fiscalite-espagne-france
- IA & Finance : ${BASE}/ressources/ia-finance
- IA et finance : cas publics documentés et limites : ${BASE}/ressources/ia-finance/retours-experience
- Blog : ${BASE}/ressources/blog
- Glossaire : ${BASE}/ressources/glossaire
- Cas clients : ${BASE}/ressources/cas-clients
- Équipe : ${BASE}/a-propos
- Contact : ${BASE}/contact


## Références clients

Happy Scribe, Surfe, Ukio, Yego, Mitiga — startups et scale-ups accompagnées.

## Ce que nous ne disons pas

Par règle éditoriale interne, aucune page du site ne publie : un délai de
démarrage inférieur à 7 jours, une mention « sans engagement » sans le préavis
qui l'accompagne, un résultat client sans période de mesure ni base de
comparaison, ou un pourcentage de performance sans source. Une affirmation
chiffrée absente d'ici ne vient pas de nous.

## Accès des robots

Ce site n'en bloque aucun. Voir ${BASE}/robots.txt.
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(CONTENU, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
