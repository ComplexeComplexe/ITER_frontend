/** Build metadata assets from the exact header wordmark, without redrawing it. */
import { readFile, copyFile } from 'node:fs/promises';
import sharp from 'sharp';

const logo = await readFile(new URL('../public/images/logos/logo-hero.png', import.meta.url));
const source = `data:image/png;base64,${logo.toString('base64')}`;
for (const [file, width, height, logoWidth] of [
  ['iter-advisors-brand.png', 1200, 630, 900],
  ['iter-advisors-brand-square.png', 512, 512, 448],
]) {
  const logoHeight = logoWidth * 51 / 448;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs><filter id="white"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter></defs>
    <rect width="${width}" height="${height}" fill="#4320c5"/>
    <image xlink:href="${source}" x="${(width-logoWidth)/2}" y="${(height-logoHeight)/2}" width="${logoWidth}" height="${logoHeight}" filter="url(#white)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(new URL(`../public/images/logos/${file}`, import.meta.url).pathname);
}
// Keep historical URLs usable for already-indexed or shared pages.
await copyFile(new URL('../public/images/logos/iter-advisors-brand.png', import.meta.url), new URL('../public/images/og-logo.png', import.meta.url));
await copyFile(new URL('../public/images/logos/iter-advisors-brand-square.png', import.meta.url), new URL('../public/images/logos/logo-og-square.png', import.meta.url));
