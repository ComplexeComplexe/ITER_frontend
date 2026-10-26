import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import ClientsPage from "@/components/pages/ClientsPage";
import { clients } from "@/lib/content/clients";
import { ORGANIZATION_ID } from "@/lib/schemas/identity";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
vi.mock("@/components/Breadcrumb", () => ({ default: () => null }));

describe("client reference structured data", () => {
  for (const [locale, path, language] of [["fr", "/clients", "fr-FR"], ["en", "/en/clients", "en-GB"], ["es", "/es/clientes", "es-ES"]] as const) {
    it(`attaches client mentions to the ${locale} collection page, not to Iter's organization`, () => {
      const html = renderToStaticMarkup(<ClientsPage locale={locale} />);
      const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(match => JSON.parse(match[1]));
      const page = scripts.find(item => item["@type"] === "CollectionPage");
      expect(page).toMatchObject({
        "@id": `https://www.iteradvisors.com${path}#webpage`,
        url: `https://www.iteradvisors.com${path}`,
        inLanguage: language,
        about: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
      });
      // Prevent this template from redefining the Organization owned by the root layout.
      expect(scripts.some(item => item["@id"] === ORGANIZATION_ID)).toBe(false);
      expect(page.mentions.map((item: {name: string}) => item.name)).toEqual(clients.map(client => client.name));
      for (const client of clients) expect(html).toContain(client.name);
      for (const item of page.mentions) expect(item["@type"]).toBe("Organization");
    });
  }
});
