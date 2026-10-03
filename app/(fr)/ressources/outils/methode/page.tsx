import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

export const metadata = buildMetadata({
  locale: "fr",
  title: "Méthode de nos analyses d’outils finance | Iter Advisors",
  description:
    "Comment Iter distingue documentation éditeur, analyse de CFO et résultats clients : sources datées, critères de sélection et preuves nécessaires pour un avis outil.",
  path: "/ressources/outils/methode",
  disableHreflang: ["en", "es"],
});

export default async function ToolMethodPage() {
  return (
    <PageLayout locale="fr" cmsNavigation={await getCmsNavigation("fr")}>
      <section className="site-hero bg-background pt-32 pb-12">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Ressources", href: "/ressources" },
              { label: "Outils", href: "/ressources/outils" },
              { label: "Méthode" },
            ]}
          />
          <h1 className="mt-8 mb-5 text-4xl font-heading font-bold">
            Comment nous analysons les outils finance
          </h1>
          <p className="site-copy text-lg text-muted-foreground">
            Un outil doit aider votre entreprise à produire des données fiables
            et à décider. Notre méthode distingue ce que l’éditeur documente, ce
            que la direction financière doit vérifier et ce qu’une mission
            permet réellement de mesurer.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Méthode éditoriale Iter Advisors · publiée le{" "}
            <time dateTime="2026-10-03">3 octobre 2026</time>.
          </p>
        </div>
      </section>
      <section className="container max-w-3xl pb-16 space-y-10 site-copy text-foreground/80 leading-relaxed">
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Trois niveaux de preuve
          </h2>
          <dl className="space-y-5">
            <div>
              <dt className="font-semibold text-foreground">Fait documenté</dt>
              <dd>
                Une fonction, une restriction ou un tarif décrit dans une source
                éditeur liée et datée. Ce fait ne prouve pas que la fonction
                convient à tous les dossiers.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Analyse de CFO</dt>
              <dd>
                Une interprétation et des critères de décision :
                responsabilités, qualité des données, droits, interfaces et coût
                total. Les scénarios proposés servent de protocole de test ; ils
                ne sont pas des réalisations clients.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                Retour de mission
              </dt>
              <dd>
                Un usage décrit avec son périmètre, sa période, le professionnel
                responsable et les limites rencontrées. Un résultat chiffré
                nécessite une base de comparaison, une méthode de calcul et une
                autorisation de publication. En l’absence de ces éléments, nous
                ne présentons pas un gain comme mesuré.
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Les critères d’une sélection utile
          </h2>
          <p>
            Nous examinons le besoin métier avant la marque : fiabilité des
            pièces, rapprochement comptable, cadence du reporting, analytique,
            prévision de trésorerie et échanges entre outils. La grille précise
            les droits, le traitement des erreurs, la reprise et la récupération
            des données.
          </p>
          <p className="mt-4">
            La démonstration doit suivre une opération complète avec un
            échantillon représentatif et autorisé. L’abonnement est comparé avec
            les utilisateurs, les entités, les volumes et les prestations
            nécessaires. Nous ne proposons pas un classement universel : le
            choix dépend du dossier.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Sources, auteur et actualisation
          </h2>
          <p>
            Les fiches indiquent leur source de tarification et leur date de
            consultation. Une modification substantielle du contenu entraîne une
            nouvelle date de revue ; un changement de navigation ne rafraîchit
            pas artificiellement tout le catalogue. Les références éditoriales
            renvoient vers les profils des professionnels cités.
          </p>
          <p className="mt-4">
            La profondeur varie selon les informations disponibles. L’
            <Link
              href="/ressources/outils/pennylane"
              className="text-iter-violet underline"
            >
              analyse Pennylane
            </Link>{" "}
            détaille séparément les faits produit et leur lecture financière.
            Les autres fiches proposent des repères de sélection. Une fonction
            sensible doit toujours être confirmée dans la formule contractuelle
            retenue.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Relations commerciales et résultats
          </h2>
          <p>
            Iter vend des prestations de direction financière et peut
            accompagner le choix ou l’organisation des outils. La présence d’un
            logiciel dans cet annuaire ne constitue pas une certification ni une
            déclaration de partenariat avec son éditeur. Une relation spécifique
            doit être documentée avant d’être présentée comme telle.
          </p>
          <p className="mt-4">
            Les fiches ne recopient pas les notes d’autres plateformes comme si
            elles étaient les nôtres. Une note ou un témoignage ne serait publié
            qu’avec son auteur, son périmètre et sa méthode. Le schéma de la
            page ne doit pas annoncer un résultat absent du contenu visible.
          </p>
        </div>
        <p>
          <Link
            href="/ressources/blog/essentiels-outils-tech-finance"
            className="text-iter-violet underline"
          >
            Construire une organisation cohérente autour des outils finance
          </Link>{" "}
          ·{" "}
          <Link href="/contact" className="text-iter-violet underline">
            Signaler une information à corriger
          </Link>
        </p>
      </section>
    </PageLayout>
  );
}
