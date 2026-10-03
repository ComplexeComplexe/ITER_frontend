import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// Check the generated site, including metadata and JSON-LD, not only source literals.
const root = ".next/server/app";
const stale =
  /(?:\+?(?:85|100|50)\+?\s+(?:entreprises|companies|businesses|empresas|clients)|15\+?\s+(?:consultants|consultores|finance consultants)|(?:Nos|Our|Nuestros)\s+15\s+(?:collaborateurs|colaboradores|employees)|30\s+(?:partenaires technologiques|technology partners|socios tecnol[oó]gicos)|"numberOfEmployees"\s*:\s*\{[^}]*"value"\s*:\s*15\b)/i;
const failures = [];
let checked = 0;
async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (entry.name.endsWith(".html")) {
      const html = await readFile(path, "utf8");
      const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const match = text.match(stale);
      if (match) failures.push({ path, stale: match[0] });
      checked++;
    }
  }
}
await visit(root);
for (const route of [
  "index",
  "en",
  "es",
  "clients",
  "en/clients",
  "es/clientes",
  "jobs",
  "en/jobs",
  "es/jobs",
  "a-propos",
  "en/about",
  "es/quienes-somos",
]) {
  const html = await readFile(join(root, route + ".html"), "utf8");
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  if (!text.includes("90") || !text.includes("20"))
    failures.push({
      route,
      reason: "Validated company or consultant count missing",
    });
}
const names = [
  "Pennylane",
  "Holded",
  "NetSuite",
  "Odoo",
  "Microsoft Dynamics 365 Finance",
  "Agicap",
  "Kyriba",
  "Spendesk",
  "Pleo",
  "Ramp",
];
for (const route of [
  "a-propos",
  "en/about",
  "es/quienes-somos",
  "ressources/outils",
  "en/ressources/tools",
  "es/recursos/herramientas",
]) {
  const html = await readFile(join(root, route + ".html"), "utf8");
  for (const name of names)
    if (!html.includes(name)) failures.push({ route, missingTool: name });
}
console.log(
  JSON.stringify(
    { checkedGeneratedPages: checked, checkedToolPages: 6, failures },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;
