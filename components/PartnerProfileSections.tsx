import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import type { PartnerProfile, ProfileLink } from "@/lib/content/guillaume-profile";
import ProfileProse from "@/components/ProfileProse";

function ProfileLinks({ links, locale }: { links?: ProfileLink[]; locale: Locale }) {
  if (!links?.length) return null;
  return <ul className="mt-5 space-y-3">
    {links.map(link => <li key={link.href}>
      {link.href.startsWith("/")
        ? <Link href={parityHref(link.href, locale)} className="site-inline-link">{link.label}</Link>
        : <a href={link.href} className="site-inline-link">{link.label}</a>}
    </li>)}
  </ul>;
}

export default function PartnerProfileSections({ profile, locale }: { profile: PartnerProfile; locale: Locale }) {
  return <div className="container max-w-4xl pb-16 space-y-12" data-partner-profile>
    {profile.sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-28">
      <h2 className="mb-5">{section.title}</h2>
      <div className="site-copy max-w-prose space-y-4 text-muted-foreground leading-relaxed">
        {section.paragraphs?.map(paragraph => <p key={paragraph}><ProfileProse text={paragraph} links={profile.contentLinks} locale={locale} /></p>)}
        {section.items?.map(item => <div key={item.title} className="pt-3 space-y-4">
          <h3 className="text-foreground">{item.title}</h3>
          {item.paragraphs.map(paragraph => <p key={paragraph}><ProfileProse text={paragraph} links={profile.contentLinks} locale={locale} /></p>)}
          <ProfileLinks links={item.links} locale={locale} />
        </div>)}
        <ProfileLinks links={section.links} locale={locale} />
      </div>
    </section>)}
  </div>;
}
