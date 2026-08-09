/**
 * Source de vérité éditoriale — chiffres institutionnels Iter Advisors.
 *
 * Créé pour SEO-DAF-02 (audit du 9 août 2026), dont le constat était que le
 * site publiait des chiffres contradictoires d'une page à l'autre. Un lecteur
 * — ou un moteur qui extrait des réponses — pouvait relever trois nombres
 * différents pour la même réalité.
 *
 * Contradictions relevées et corrigées dans cette passe :
 *   - avis Trustfolio : 31 (8 occurrences) vs 35 (/carrieres/fractional-cfo)
 *     vs 36 (hub /ressources) ;
 *   - entreprises accompagnées : 85 (12 occurrences) vs « +100 »
 *     (/profil, LeadGenPage).
 *
 * Non contradictoires, donc conservées telles quelles :
 *   - « +100 entreprises diagnostiquées » (QualificationPage) — métrique
 *     distincte : les diagnostics réalisés, pas les clients accompagnés ;
 *   - « +50 PME accompagnées » sur la page prévisionnel de trésorerie — sous-
 *     ensemble sectoriel revendiqué, cohérent avec 85 au global.
 *
 * ────────────────────────────────────────────────────────────────────────
 * ENCORE À ARBITRER — ces chiffres divergent aussi sur le site mais aucune
 * valeur ne peut être retenue sans décision de la direction. Ils ne sont
 * volontairement PAS déclarés ici tant qu'ils ne sont pas tranchés, pour ne
 * pas figer une valeur inventée :
 *
 *   - ANNÉE DE FONDATION : 2019 ou 2021 ?
 *       « Fondé en 2021 » (lib/content/about.ts) et « depuis 2021 »
 *       (JobsPage, ResourcesPage, home.ts) d'un côté ; « depuis 2019 »
 *       (carrieres/fractional-cfo, glossary-entries) de l'autre. Les deux
 *       peuvent coexister si 2019 marque le début de l'activité et 2021
 *       l'immatriculation — mais il faut alors le formuler, car en l'état le
 *       site affirme accompagner des clients deux ans avant sa création.
 *       Le title de /a-propos annonçait « depuis 2019 » au-dessus d'un corps
 *       de page disant « Fondé en 2021 » : cette contradiction-là est levée
 *       (SEO-001), les autres occurrences attendent l'arbitrage.
 *
 *   - engagement : « aucun engagement » / préavis 1 mois / 3-6 mois / 12 mois
 *   - rythme et prix : 2 j/mois à 2 500-4 500 € vs 2 j/semaine à 3 200-8 000 €
 *   - délai de démarrage : 48-72 h / 7-14 jours / 1-2 semaines / 2-4 semaines
 *   - économie vs DAF salarié : 20-40 % / 30-50 % / 35-50 % / 50-70 %
 *   - coût d'un DAF salarié : annoncé tantôt en brut, tantôt en chargé
 * Une fois arbitrés, les déclarer ici et propager.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Les valeurs ci-dessous restent dupliquées en dur dans une quarantaine de
 * chaînes de metadata et de contenu (« 85 entreprises accompagnées »,
 * « (31 avis vérifiés) »…), où elles sont enchâssées dans des phrases
 * rédigées. Ce fichier est la référence : toute nouvelle occurrence doit
 * l'importer, et une passe de propagation reste à faire sur l'existant.
 */

/** Note Trustfolio, sur 5. */
export const TRUSTFOLIO_RATING = "5";

/**
 * Nombre d'avis Trustfolio vérifiés.
 *
 * Valeur retenue : 31, majoritaire sur le site (8 occurrences, dont le
 * balisage JSON-LD). À remonter dès que Trustfolio en enregistre de
 * nouveaux — c'est ce décalage qui avait produit les variantes 35 et 36.
 */
export const TRUSTFOLIO_REVIEW_COUNT = 31;

/** Entreprises accompagnées depuis la création du cabinet. */
export const CLIENTS_ACCOMPAGNES = 85;

/** Montant levé par les clients accompagnés, en euros, formaté. */
export const FONDS_LEVES = "100 M€";

/** Bureaux physiques. */
export const BUREAUX = ["Barcelone", "Paris", "Toulouse"] as const;
