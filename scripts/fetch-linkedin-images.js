#!/usr/bin/env node

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '../public/images/team');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const teamMembers = [
  { name: 'sebastien-doat', url: 'https://www.linkedin.com/in/sebastien-doat-fractional-cfo/', firstName: 'Sébastien', lastName: 'Doat' },
  { name: 'borith-biv', url: 'https://www.linkedin.com/in/borith-biv-linkb/', firstName: 'Borith', lastName: 'Biv' },
  { name: 'sebastien-preel', url: 'https://www.linkedin.com/in/spreel/', firstName: 'Sébastien', lastName: 'Preel' },
  { name: 'tom-jaufre', url: 'https://www.linkedin.com/in/tom-jaufre-65904175/', firstName: 'Tom', lastName: 'Jaufre' },
  { name: 'jordi-kopp', url: 'https://www.linkedin.com/in/jordi-kopp/', firstName: 'Jordi', lastName: 'Kopp' },
  { name: 'jessica-barnicaud', url: 'https://www.linkedin.com/in/jessica-barnicaud/', firstName: 'Jessica', lastName: 'Barnicaud' },
  { name: 'ornella-salgado', url: 'https://www.linkedin.com/in/ornellaslgd/', firstName: 'Ornella', lastName: 'Salgado' },
  { name: 'rocio-montesano', url: 'https://www.linkedin.com/in/rocio-montesano/', firstName: 'Rocio', lastName: 'Montesano' },
  { name: 'pauline-mathieu', url: 'https://www.linkedin.com/in/pauline-mathieu-082488160/', firstName: 'Pauline', lastName: 'Mathieu' },
  { name: 'benjamin-carlot', url: 'https://www.linkedin.com/in/benjamin-carlot-fractional-cfo-43303120/', firstName: 'Benjamin', lastName: 'Carlot' },
  { name: 'christophe-hoarau', url: 'https://www.linkedin.com/in/christophe-hoarau-2bb8b8ab/?locale=en', firstName: 'Christophe', lastName: 'Hoarau' },
];

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);

    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function fetchProfileImage(member) {
  const browser = await chromium.launch();

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 1024 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    const page = await context.newPage();

    console.log(`🔍 Fetching ${member.firstName} ${member.lastName}...`);

    // Navigate to LinkedIn profile
    await page.goto(member.url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for profile image
    await page.waitForTimeout(2000);

    // Try to find the profile image
    const profileImg = await page.evaluate(() => {
      // Look for the main profile image
      const img = document.querySelector('img[alt*="profile"], img[alt*="photo"], button img');
      if (img) {
        return img.src || img.getAttribute('data-src');
      }
      return null;
    });

    if (profileImg) {
      console.log(`  Found image URL`);

      // Download the image
      const filename = `${member.name}.jpg`;
      const filepath = path.join(outputDir, filename);

      try {
        await downloadFile(profileImg, filepath);
        console.log(`  ✓ Downloaded to ${filename}`);
        return true;
      } catch (err) {
        console.log(`  ⚠ Could not download image: ${err.message}`);
        return false;
      }
    } else {
      console.log(`  ⚠ Profile image not found`);
      return false;
    }
  } catch (error) {
    console.error(`  ✗ Error for ${member.firstName}: ${error.message}`);
    return false;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('LinkedIn Profile Image Downloader');
  console.log('==================================\n');
  console.log(`Output directory: ${outputDir}\n`);

  let successCount = 0;

  for (const member of teamMembers) {
    const success = await fetchProfileImage(member);
    if (success) {
      successCount++;
    }
    // Polite delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n✓ Completed: ${successCount}/${teamMembers.length} images downloaded`);

  if (successCount < teamMembers.length) {
    console.log('\n⚠ Note: Some images could not be downloaded (LinkedIn blocks automated downloads)');
    console.log('  You may need to download them manually from LinkedIn profiles.');
  }
}

main().catch(console.error);
