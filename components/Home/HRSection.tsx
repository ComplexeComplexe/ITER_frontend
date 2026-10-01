import Link from "next/link";
import HRExpert from "@/components/HRExpert";

export default function HRSection() {
  return <section id="direction-rh" className="site-section bg-iter-light" data-journey="home-rh-section">
    <div className="site-container grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-14 items-start">
      <div className="site-copy"><p className="site-eyebrow">Direction des ressources humaines</p><h2>Une direction RH à temps partagé pour structurer vos équipes</h2>
        <p>Vos recrutements s’accélèrent, les managers manquent de repères ou les sujets RH reposent sur le dirigeant ? Iter vous accompagne pour organiser la fonction RH et faire avancer vos priorités, avec un périmètre et un rythme d’intervention définis ensemble.</p>
        <p>Pour les PME et startups qui ont besoin d’une direction RH sans recruter à temps plein : recrutement et intégration, organisation des équipes, pratiques managériales ou coordination de la paie et des partenaires RH.</p>
        <p>Le DAF éclaire le budget et la masse salariale ; le DRH accompagne l’organisation et les équipes. Vous pouvez faire appel à l’une ou l’autre expertise selon votre besoin.</p>
        <div className="site-actions"><Link className="site-button site-button-primary" href="/drh-externalise">Découvrir notre accompagnement DRH</Link><Link className="site-inline-link" href="/drh-externalise/temps-partage">Comment fonctionne le temps partagé ?</Link></div>
        <nav aria-label="Services RH" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-iter-violet">
          <Link href="/services/recrutement-talent-acquisition">Recrutement et intégration</Link><Link href="/services/gestion-paie-charges-sociales">Paie et coordination</Link><Link href="/services/formation-developpement">Formation et développement</Link><Link href="/services/conformite-droit-travail">Conformité et relations sociales</Link>
        </nav>
      </div><HRExpert />
    </div>
  </section>;
}
