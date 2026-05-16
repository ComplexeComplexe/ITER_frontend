/**
 * Read-time estimator for blog articles. Strips HTML tags, counts
 * words, and returns the rounded number of minutes assuming an average
 * reading speed of 220 words/minute (French / English mix typical for
 * a business audience). Always returns at least 1.
 */
export function estimateReadMinutes(html: string | undefined): number {
  if (!html) return 1;
  const text = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 1;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
