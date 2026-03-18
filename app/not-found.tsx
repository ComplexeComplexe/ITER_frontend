import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-lg">
        <p className="text-7xl font-bold font-heading text-iter-violet mb-4">
          404
        </p>
        <h1 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-4">
          Page introuvable
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retrouvez nos services de DAF externalisé et CFO à temps partagé.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            Nous contacter
          </Link>
        </div>
        <div className="mt-12 text-sm text-muted-foreground">
          <p>Vous cherchez peut-être :</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-3">
            <Link href="/daf-externalise" className="text-iter-violet hover:underline">
              DAF externalisé
            </Link>
            <Link href="/drh-externalise" className="text-iter-violet hover:underline">
              DRH externalisé
            </Link>
            <Link href="/services" className="text-iter-violet hover:underline">
              Nos services
            </Link>
            <Link href="/ressources/blog" className="text-iter-violet hover:underline">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
