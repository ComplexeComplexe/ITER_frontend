import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teamMembers = [
  { name: 'sebastien-doat', url: 'https://www.linkedin.com/in/sebastien-doat-fractional-cfo/' },
  { name: 'borith-biv', url: 'https://www.linkedin.com/in/borith-biv-linkb/' },
  { name: 'sebastien-preel', url: 'https://www.linkedin.com/in/spreel/' },
  { name: 'tom-jaufre', url: 'https://www.linkedin.com/in/tom-jaufre-65904175/' },
  { name: 'jordi-kopp', url: 'https://www.linkedin.com/in/jordi-kopp/' },
  { name: 'jessica-barnicaud', url: 'https://www.linkedin.com/in/jessica-barnicaud/' },
  { name: 'ornella-salgado', url: 'https://www.linkedin.com/in/ornellaslgd/' },
  { name: 'rocio-montesano', url: 'https://www.linkedin.com/in/rocio-montesano/' },
  { name: 'pauline-mathieu', url: 'https://www.linkedin.com/in/pauline-mathieu-082488160/' },
  { name: 'benjamin-carlot', url: 'https://www.linkedin.com/in/benjamin-carlot-fractional-cfo-43303120/' },
  { name: 'christophe-hoarau', url: 'https://www.linkedin.com/in/christophe-hoarau-2bb8b8ab/?locale=en' },
];

const outputDir = path.join(__dirname, '../public/images/team');

async function downloadLinkedInPhoto(member) {
  const browser = await chromium.launch();
  const context = await browser.createBrowserContext();
  const page = await context.newPage();

  try {
    console.log(`Fetching ${member.name}...`);
    await page.goto(member.url, { waitUntil: 'networkidle' });

    // Wait for profile image to load
    await page.waitForTimeout(2000);

    // Try to find and download the profile image
    const imgSelector = 'img[alt*="profile"]';
    const img = await page.$(imgSelector);

    if (img) {
      const src = await img.getAttribute('src');
      if (src) {
        console.log(`Found image for ${member.name}: ${src}`);
        // Image found, but LinkedIn uses dynamic URLs - we'll use a different approach
      }
    }

    // Alternative: Screenshot the profile and extract the image
    // For now, just log that we visited the profile
    console.log(`✓ Profile page loaded for ${member.name}`);
  } catch (error) {
    console.error(`Error for ${member.name}:`, error.message);
  } finally {
    await browser.close();
  }
}

async function main() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting LinkedIn photo download...');
  console.log(`Output directory: ${outputDir}\n`);

  for (const member of teamMembers) {
    await downloadLinkedInPhoto(member);
  }

  console.log('\nDone! Please manually download profile photos from LinkedIn.');
}

main().catch(console.error);
