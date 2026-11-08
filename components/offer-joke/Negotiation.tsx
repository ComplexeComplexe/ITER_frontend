"use client";

import { useState } from "react";
import styles from "@/app/(fr)/offre-imbattable/offre.module.css";

const offers = [
  { price: "1 sesterce", unit: "/ mois", reply: "Starduix : À ce prix-là, on perd de l’argent. Raleurix : On se rattrapera sur le volume." },
  { price: "½ sesterce", unit: "/ mois", reply: "Raleurix : D’accord, mais vous fournissez le parchemin. Et les chiffres." },
  { price: "Un bouton", unit: "de tunique", reply: "Starduix : On accepte aussi les boutons. Raleurix : Sauf ceux qui ferment les budgets." },
  { price: "On vous paie.", unit: "Vous avez gagné.", reply: "Raleurix : Félicitations. Vous venez de lever des fonds auprès de vos propres CFO." },
];

export default function Negotiation() {
  const [level, setLevel] = useState(0);
  const [signed, setSigned] = useState(false);
  const offer = offers[level];
  return <div className={styles.offer} id="le-devis">
    <p className={styles.offerLabel}>Notre tarif déjà beaucoup trop bas</p>
    <div className={styles.price} aria-live="polite" aria-atomic="true"><strong>{offer.price}</strong><span>{offer.unit}</span></div>
    <p className={styles.offerNote}>Deux cerveaux. Un abaque. Aucune dignité tarifaire.</p>
    <div className={styles.offerActions}>
      <button type="button" onClick={() => { setLevel(current => Math.min(current + 1, offers.length - 1)); setSigned(false); }} disabled={level === offers.length - 1} className={styles.negotiate}>{level === offers.length - 1 ? "Vous nous avez tout pris." : "C’est encore trop cher."}<span aria-hidden="true">↘</span></button>
      <button type="button" onClick={() => setSigned(true)} className={styles.sign}>Je signe sur le parchemin <span aria-hidden="true">✎</span></button>
    </div>
    <p className={styles.reaction} role="status" aria-live="polite">{signed ? "Le Sénat a rejeté le devis. Même lui a trouvé que c’était suspect. Aucun contrat, aucun message envoyé : c’était une blague." : offer.reply}</p>
    <p className={styles.finePrint}>Offre entièrement fictive. Ne constitue ni un devis, ni une découverte archéologique.</p>
  </div>;
}
