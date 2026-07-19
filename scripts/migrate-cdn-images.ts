/**
 * CDN → local image migration — MIGRATION-02 (P0).
 *
 * Reads `migration/strapi-export.json` (produced by
 * `scripts/export-strapi.ts`), downloads every CDN-hosted image, and
 * writes a JSON map `migration/cdn-to-local.json` showing the
 * canonical CDN URL ↔ new local `/images/blog/…` path for each file.
 * That map is what the static-content integration step uses to rewrite
 * URLs in `lib/content/blog-posts.ts` and elsewhere.
 *
 * Why is rewriting the lib/content/*.ts files NOT done here? Because
 * those files contain HTML strings, not structured data — rewriting
 * them blindly with sed risks corrupting innocuous URL fragments. The
 * map file is the safe handoff: a human (or a follow-up codemod) does
 * the find-and-replace with full visibility.
 *
 * USAGE
 *   npx tsx scripts/migrate-cdn-images.ts
 *
 * The script is idempotent — already-downloaded files are skipped.
 */

import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, extname, basename } from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const EXPORT_PATH = resolve(process.cwd(), "migration", "strapi-export.json");
const MAP_PATH = resolve(process.cwd(), "migration", "cdn-to-local.json");
const OUT_DIR = resolve(process.cwd(), "public", "images", "blog");

if (!existsSync(EXPORT_PATH)) {
  console.error(
    `${EXPORT_PATH} not found. Run \`npx tsx scripts/export-strapi.ts\` first.`
  );
  process.exit(1);
}

interface Export {
  mediaUrls: string[];
}

const exported = JSON.parse(readFileSync(EXPORT_PATH, "utf8")) as Export;
if (!Array.isArray(exported.mediaUrls)) {
  console.error("strapi-export.json has no mediaUrls array.");
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

/**
 * Build a stable, human-readable local filename for a CDN URL.
 * - Strips Strapi's content-hash prefix (e.g. `abc123_blog-hero.webp` → `blog-hero.webp`).
 * - Lowercases.
 * - Falls back to a hash of the URL when the original filename collides
 *   with one already in use, so two articles with the same image basename
 *   don't overwrite each other.
 */
function localNameFor(url: string, used: Set<string>): string {
  const last = url.split("/").pop() || "image";
  const ext = (extname(last) || ".webp").toLowerCase();
  let stem = basename(last, extname(last))
    .replace(/^[a-z0-9]{8,}_/, "") // strip Strapi hash prefix
    .replace(/[^a-z0-9-_.]/gi, "-")
    .toLowerCase();
  if (!stem) stem = "image";

  let name = `${stem}${ext}`;
  if (!used.has(name)) {
    used.add(name);
    return name;
  }

  // Suffix with a short hash on collision.
  const h = (url.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 10000)
    .toString(36)
    .padStart(3, "0");
  name = `${stem}-${h}${ext}`;
  used.add(name);
  return name;
}

async function downloadOne(url: string, dest: string): Promise<{ skipped: boolean }> {
  if (existsSync(dest)) return { skipped: true };
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  if (!res.body) throw new Error(`empty body on ${url}`);
  await pipeline(Readable.fromWeb(res.body as never), createWriteStream(dest));
  return { skipped: false };
}

async function main(): Promise<void> {
  const used = new Set<string>();
  const map: Record<string, string> = {};
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const url of exported.mediaUrls) {
    try {
      const name = localNameFor(url, used);
      const dest = resolve(OUT_DIR, name);
      const localPath = `/images/blog/${name}`;
      map[url] = localPath;
      const { skipped: wasSkipped } = await downloadOne(url, dest);
      if (wasSkipped) {
        skipped += 1;
        process.stdout.write(".");
      } else {
        downloaded += 1;
        process.stdout.write("·");
      }
    } catch (e) {
      failed += 1;
      console.warn(`\n  ✗ ${url} — ${(e as Error).message}`);
    }
  }

  writeFileSync(MAP_PATH, JSON.stringify(map, null, 2), "utf8");

  console.log("\nDone.");
  console.log(`  downloaded: ${downloaded}`);
  console.log(`  already cached: ${skipped}`);
  console.log(`  failed: ${failed}`);
  console.log(`  map: ${MAP_PATH}`);
  console.log(`  files: ${OUT_DIR}`);
  console.log("");
  console.log("Next steps:");
  console.log("  1. Inspect public/images/blog/ — confirm every image is non-empty and the right format.");
  console.log("  2. Apply the URL rewrite using migration/cdn-to-local.json (see migration/RUNBOOK.md).");
  console.log("  3. Remove the CDN host from next.config.ts images.domains and the DNS prefetch in app/layout.tsx.");

  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
