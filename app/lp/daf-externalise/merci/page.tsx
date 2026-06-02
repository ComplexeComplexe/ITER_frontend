import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

// Thank-you page reached via router.push after a successful lead submission
// on /lp/daf-externalise. Doubles as:
//  • a trackable URL for GA4 / future Meta pixel / remarketing audiences
//  • a clear "we received your request" confirmation distinct from inline UX
//
// The page is `noindex` because it has no SEO value and we don't want it
// surfacing in search results without a real entry path.

export const metadata: Metadata = {
  title: "Merci — votre demande est bien reçue | Iter Advisors",
  description:
    "Votre demande de diagnostic DAF externalisé a bien été enregistrée. Un de nos experts vous recontacte sous 24 h ouvrées.",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <>
      <Header locale="fr" />
      <main className="bg-gradient-to-br from-background via-background to-iter-violet/5 min-h-[70vh] flex items-center">
        <div className="container py-20 sm:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-6">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight mb-4">
              Merci, votre demande est bien reçue
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Un DAF senior d&apos;Iter Advisors revient vers vous sous 24&nbsp;heures
              ouvrées pour caler un premier échange de 30&nbsp;minutes,
              sans engagement.
            </p>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm text-left mb-8">
              <p className="font-semibold text-foreground mb-3">
                Pendant que vous attendez notre appel :
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-iter-violet">→</span>
                  <Link href="/ressources/blog" className="hover:text-iter-violet hover:underline">
                    Parcourez notre blog finance (cash, reporting, levée…)
                  </Link>
                </li>
                <li className="flex gap-2">
                  <span className="text-iter-violet">→</span>
                  <Link
                    href="/ressources/blog/cout-daf-externalise-2026-tarifs-par-mission"
                    className="hover:text-iter-violet hover:underline"
                  >
                    Découvrez nos grilles tarifaires DAF externalisé
                  </Link>
                </li>
                <li className="flex gap-2">
                  <span className="text-iter-violet">→</span>
                  <Link href="/a-propos" className="hover:text-iter-violet hover:underline">
                    Rencontrez l&apos;équipe Iter Advisors
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-iter-violet hover:underline font-medium"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
      <Footer locale="fr" />
    </>
  );
}
