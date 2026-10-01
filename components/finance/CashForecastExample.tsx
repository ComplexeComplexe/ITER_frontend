import Link from "next/link";

/** Educational example, never client evidence. Amounts are expected bank flows. */
export default function CashForecastExample() {
  return <section id="exemple-tresorerie" className="site-section scroll-mt-28 bg-iter-violet/5 py-12 sm:py-16">
    <div className="container max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-iter-violet">Exemple pédagogique fictif</p>
      <h2 className="mt-3 text-2xl sm:text-3xl font-bold">Lire les trois premières semaines d’un prévisionnel</h2>
      <p className="mt-4 text-muted-foreground">Montants en euros. Le solde de fin de semaine devient le solde d’ouverture suivant. Cet exemple ne représente aucun client ni résultat d’Iter.</p>
      <div role="region" aria-label="Exemple de prévisionnel de trésorerie" tabIndex={0} className="mt-6 overflow-x-auto rounded-xl border border-border bg-white focus-visible:outline-2 focus-visible:outline-iter-violet">
        <table className="w-full min-w-[520px] text-sm text-left">
          <caption className="sr-only">Prévision de trésorerie fictive sur trois semaines</caption>
          <thead><tr className="bg-muted"><th scope="col" className="p-4">Flux</th>{[1,2,3].map(w => <th key={w} scope="col" className="p-4 text-right">Semaine {w}</th>)}</tr></thead>
          <tbody>{[
            ["Solde d’ouverture", "30 000", "25 000", "20 000"],
            ["Encaissements attendus", "+25 000", "+18 000", "+35 000"],
            ["Décaissements prévus", "−30 000", "−23 000", "−28 000"],
            ["Solde de fin de semaine", "25 000", "20 000", "27 000"],
          ].map(([label,...values]) => <tr key={label} className="border-t border-border"><th scope="row" className="p-4 font-medium">{label}</th>{values.map((v,i) => <td key={i} className="p-4 text-right tabular-nums">{v}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted-foreground"><strong>Que décider ?</strong> Si l’entreprise fixe son seuil de sécurité à 22 000 €, la deuxième semaine appelle une revue des échéances. Si 10 000 € attendus en semaine 1 sont encaissés en semaine 3, les soldes deviennent 15 000 €, 10 000 € puis 27 000 €. Le solde final identique masque une tension intermédiaire.</p>
      <p className="mt-4 text-sm">Pour appliquer cette lecture à votre entreprise, commencez par <Link href="/ressources/blog/reduire-bfr-7-leviers-actionnables" className="underline text-iter-violet">identifier les postes de BFR à surveiller</Link>, puis cadrez la fréquence de suivi avec votre équipe.</p>
    </div>
  </section>;
}
