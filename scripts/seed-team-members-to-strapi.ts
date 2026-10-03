/**
 * Seed team members from the "À propos" page (iteradvisors.com/a-propos) into Strapi.
 * Creates team-members in FR, EN and ES.
 * Run: npm run seed:team
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFiles() {
  const root = resolve(process.cwd());
  for (const name of [".env.local", ".env"]) {
    const path = resolve(root, name);
    if (existsSync(path)) {
      const content = readFileSync(path, "utf8");
      for (const line of content.split("\n")) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (m && process.env[m[1]] === undefined) {
          process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
        }
      }
    }
  }
}
loadEnvFiles();

import type { Locale } from "../lib/i18n";

const rawStrapiUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_URL = rawStrapiUrl.replace(/\/admin\/?$/, "") || rawStrapiUrl;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

const LOCALES: Locale[] = ["fr", "en", "es"];
const STRAPI_LOCALE_MAP: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
  es: "es-ES",
};

/** Names and roles from https://www.iteradvisors.com/a-propos (Feb 2025) */
const TEAM_FROM_PAGE: { firstName: string; lastName: string; roleFr: string; roleEn: string; roleEs: string; linkedIn: string }[] = [
  { firstName: "Sébastien", lastName: "Doat", roleFr: "Co-fondateur et CFO", roleEn: "Co-founder & CFO", roleEs: "Cofundador y CFO", linkedIn: "https://www.linkedin.com/in/sebastien-doat/" },
  { firstName: "Benjamin", lastName: "Ziza", roleFr: "Co-fondateur et CFO", roleEn: "Co-founder & CFO", roleEs: "Cofundador y CFO", linkedIn: "https://www.linkedin.com/in/benjaminziza/" },
  { firstName: "Guillaume", lastName: "Rostand", roleFr: "Associé fondateur et CMO", roleEn: "Founding Partner & CMO", roleEs: "Socio fundador y CMO", linkedIn: "https://www.linkedin.com/in/guillaumerostand/" },
  { firstName: "Quico", lastName: "Montuenga Rios", roleFr: "Fractional CFO", roleEn: "Fractional CFO", roleEs: "CFO fraccional", linkedIn: "https://www.linkedin.com/in/quico-montuenga-rios/" },
  { firstName: "Deisy", lastName: "Arias Ramirez", roleFr: "Fractional CFO", roleEn: "Fractional CFO", roleEs: "CFO fraccional", linkedIn: "https://www.linkedin.com/in/deisy-arias-ramirez/" },
  { firstName: "Florent", lastName: "Greth", roleFr: "Fractional CFO", roleEn: "Fractional CFO", roleEs: "CFO fraccional", linkedIn: "https://www.linkedin.com/in/florent-greth/" },
  { firstName: "Ornella", lastName: "Salgado", roleFr: "Analyste financière", roleEn: "Finance Analyst", roleEs: "Analista financiera", linkedIn: "https://www.linkedin.com/in/ornella-salgado/" },
  { firstName: "Tom", lastName: "Jaufre", roleFr: "Finance CFO", roleEn: "Finance CFO", roleEs: "CFO finanzas", linkedIn: "https://www.linkedin.com/in/tom-jaufre/" },
  { firstName: "Arthur", lastName: "Soulages", roleFr: "Fractional CFO", roleEn: "Fractional CFO", roleEs: "CFO fraccional", linkedIn: "https://www.linkedin.com/in/arthur-soulages/" },
  { firstName: "Rocio", lastName: "Montesano", roleFr: "Analyste financière", roleEn: "Finance Analyst", roleEs: "Analista financiera", linkedIn: "https://www.linkedin.com/in/rocio-montesano/" },
  { firstName: "Augustin", lastName: "Louvet", roleFr: "Analyste financier", roleEn: "Finance Analyst", roleEs: "Analista financiero", linkedIn: "https://www.linkedin.com/in/augustin-louvet/" },
  { firstName: "Fabien", lastName: "Onolfo", roleFr: "Analyste financier", roleEn: "Finance Analyst", roleEs: "Analista financiero", linkedIn: "https://www.linkedin.com/in/fabien-onolfo/" },
  { firstName: "Christophe", lastName: "Hoarau", roleFr: "Chief Data Officer", roleEn: "Chief Data Officer", roleEs: "Chief Data Officer", linkedIn: "https://www.linkedin.com/in/christophe-hoarau/" },
  { firstName: "Pauline", lastName: "Mathieu", roleFr: "Analyste financière", roleEn: "Finance Analyst", roleEs: "Analista financiera", linkedIn: "https://www.linkedin.com/in/pauline-mathieu/" },
  { firstName: "Mélody", lastName: "Cadet", roleFr: "Analyste financière", roleEn: "Finance Analyst", roleEs: "Analista financiera", linkedIn: "https://www.linkedin.com/in/melody-cadet/" },
];

function slugFromName(firstName: string, lastName: string): string {
  const full = `${firstName} ${lastName}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return full || "member";
}

async function createTeamMember(
  locale: Locale,
  order: number,
  data: (typeof TEAM_FROM_PAGE)[number]
): Promise<void> {
  const strapiLocale = STRAPI_LOCALE_MAP[locale];
  const role = locale === "fr" ? data.roleFr : locale === "en" ? data.roleEn : data.roleEs;
  const slug = slugFromName(data.firstName, data.lastName);

  const body = {
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      role,
      slug,
      linkedIn: data.linkedIn || undefined,
      order,
      publishedAt: new Date().toISOString(),
    },
  };

  const url = `${STRAPI_URL.replace(/\/$/, "")}/api/team-members?locale=${encodeURIComponent(strapiLocale)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    const hint = res.status === 403 || res.status === 405
      ? " → Vérifiez dans Strapi : API Tokens → create pour team-member."
      : "";
    throw new Error(`Strapi POST failed ${res.status}: ${text.slice(0, 300)}${hint}`);
  }

  const json = await res.json();
  console.log(`  ✅ [${locale}] ${data.firstName} ${data.lastName} → ${json.data?.documentId ?? json.data?.id ?? "ok"}`);
}

async function main() {
  if (!STRAPI_TOKEN) {
    console.error("Missing STRAPI_API_TOKEN. Set it in .env.local or environment.");
    process.exit(1);
  }
  console.log("Seeding team members (from iteradvisors.com/a-propos) to Strapi at", STRAPI_URL);
  console.log("Members:", TEAM_FROM_PAGE.length);

  for (const locale of LOCALES) {
    console.log(`\n[${locale}]`);
    for (let i = 0; i < TEAM_FROM_PAGE.length; i++) {
      const data = TEAM_FROM_PAGE[i];
      try {
        await createTeamMember(locale, i + 1, data);
      } catch (e) {
        console.error(`  ❌ ${data.firstName} ${data.lastName}:`, e);
      }
    }
  }

  console.log("\nDone.");
}

main();
