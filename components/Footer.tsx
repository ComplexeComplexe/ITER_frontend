import Link from "next/link";
import Image from "next/image";
import { MapPin, Linkedin } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { navigation, footerContent } from "@/lib/navigation";

export default function Footer({ locale }: { locale: Locale }) {
  const content = footerContent[locale];
  const nav = navigation[locale];

  const serviceNav = nav.find((n) => n.title === "Services" || n.title === "Servicios");
  const resourceNav = nav.find(
    (n) => n.title === "Ressources" || n.title === "Resources" || n.title === "Recursos"
  );

  return (
    <footer className="bg-iter-dark py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logos/logo-hero.webp"
              alt="Iter Advisors"
              width={140}
              height={16}
              className="mb-5 brightness-0 invert"
            />
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {content.description}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-iter-chartreuse fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white/40 text-xs">5/5 Trustfolio</span>
            </div>
          </div>

          {/* Services */}
          {serviceNav?.children && (
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {serviceNav.title}
              </h4>
              <ul className="space-y-2.5">
                {serviceNav.children.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/50 text-sm hover:text-iter-chartreuse transition-colors">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resources */}
          {resourceNav?.children && (
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {resourceNav.title}
              </h4>
              <ul className="space-y-2.5">
                {resourceNav.children.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-white/50 text-sm hover:text-iter-chartreuse transition-colors">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Locations */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {locale === "fr" ? "Nos bureaux" : locale === "en" ? "Our offices" : "Nuestras oficinas"}
            </h4>
            <div className="space-y-3">
              {[
                { city: "Barcelone", country: "Espagne" },
                { city: "Paris", country: "France" },
                { city: "Toulouse", country: "France" },
              ].map((loc) => (
                <div key={loc.city} className="flex items-start gap-2">
                  <MapPin size={14} className="text-iter-chartreuse mt-0.5 shrink-0" />
                  <div>
                    <span className="text-white/70 text-sm block">{loc.city}</span>
                    <span className="text-white/40 text-xs">{loc.country}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.linkedin.com/company/iter-advisors/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/50 hover:text-iter-chartreuse transition-colors text-sm"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>

            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">{content.copyright}</p>
          <div className="flex items-center gap-6">
            {content.legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/30 text-xs hover:text-white/60 transition-colors">
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
