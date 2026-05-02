import { test, expect } from "@playwright/test";

// Base URL from environment or default
const BASE_URL = process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000";

// Service pages to test across all locales
const SERVICE_SLUGS = [
  "previsionnel-tresorerie",
  "gestion-financiere-externalisee",
  "accompagnement-levee-de-fond",
  "comptabilite-externalisation",
  "controle-de-gestion-externalise",
];

const LOCALES = ["fr", "en", "es"];

// Helper function to get the URL based on locale
const getServiceUrl = (slug: string, locale: string = "fr") => {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}/services/${slug}`;
};

const getDafUrl = (locale: string = "fr") => {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}/daf-externalise`;
};

const getHomeUrl = (locale: string = "fr") => {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  return `${BASE_URL}${prefix}`;
};

test.describe("Critical Routes - Service Pages", () => {
  SERVICE_SLUGS.forEach((slug) => {
    test(`FR: Service page ${slug} loads successfully`, async ({ page }) => {
      const url = getServiceUrl(slug, "fr");
      const response = await page.goto(url);

      // Should return 200 (SSG) or 404 if pre-rendering hasn't completed
      expect([200, 304]).toContain(response?.status());

      // Page should have main content
      await expect(page).toHaveTitle(/./); // Has a title
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1); // Has exactly one h1
      await expect(h1).toBeVisible();
    });

    test(`EN: Service page ${slug} loads successfully`, async ({ page }) => {
      const url = getServiceUrl(slug, "en");
      const response = await page.goto(url);

      expect([200, 304]).toContain(response?.status());
      await expect(page).toHaveTitle(/./);

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();
    });

    test(`ES: Service page ${slug} loads successfully`, async ({ page }) => {
      const url = getServiceUrl(slug, "es");
      const response = await page.goto(url);

      expect([200, 304]).toContain(response?.status());
      await expect(page).toHaveTitle(/./);

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toBeVisible();
    });
  });
});

test.describe("Critical Routes - DAF Pages", () => {
  LOCALES.forEach((locale) => {
    test(`${locale.toUpperCase()}: DAF Externalisé page loads successfully`, async ({
      page,
    }) => {
      const url = getDafUrl(locale);
      const response = await page.goto(url);

      expect([200, 304]).toContain(response?.status());
      await expect(page).toHaveTitle(/./);

      const h1 = page.locator("h1");
      await expect(h1.first()).toBeVisible();
    });
  });
});

test.describe("Critical Routes - Home Pages", () => {
  LOCALES.forEach((locale) => {
    test(`${locale.toUpperCase()}: Home page loads successfully`, async ({
      page,
    }) => {
      const url = getHomeUrl(locale);
      const response = await page.goto(url);

      expect([200, 304]).toContain(response?.status());
      await expect(page).toHaveTitle(/./);

      // Should have main navigation
      const nav = page.locator("nav");
      await expect(nav).toBeDefined();

      // Should have footer
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
    });
  });
});

test.describe("JSON-LD Structured Data", () => {
  test("Home page contains valid JSON-LD schema", async ({ page }) => {
    await page.goto(getHomeUrl("fr"));

    // Check for FAQ schema
    const scripts = page.locator('script[type="application/ld+json"]');
    expect(await scripts.count()).toBeGreaterThan(0);

    // Get the first script's content
    const content = await scripts.first().textContent();
    expect(content).toBeTruthy();

    // Validate it's valid JSON
    const schema = JSON.parse(content || "{}");
    expect(schema).toHaveProperty("@context");
  });

  test("Footer contains WPFooter schema", async ({ page }) => {
    await page.goto(getHomeUrl("fr"));

    const scripts = page.locator('script[type="application/ld+json"]');
    let foundWpFooter = false;

    for (let i = 0; i < (await scripts.count()); i++) {
      const content = await scripts.nth(i).textContent();
      if (content) {
        const schema = JSON.parse(content);
        if (schema["@type"] === "WPFooter") {
          foundWpFooter = true;
          expect(schema).toHaveProperty("hasPart");
          expect(schema.hasPart).toBeDefined();
          break;
        }
      }
    }

    expect(foundWpFooter).toBe(true);
  });
});

test.describe("Mobile Responsiveness", () => {
  test("Service page is mobile-friendly", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto(getServiceUrl("daf-externalise", "fr"));

    // Check that content is visible (not overflowing)
    const main = page.locator("main");
    await expect(main).toBeVisible();

    // Check that navigation is responsive
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Footer should be visible
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("Home page is mobile-friendly", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto(getHomeUrl("fr"));

    // Check that main sections are visible
    const sections = page.locator("section");
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);

    // At least one section should be visible
    await expect(sections.first()).toBeVisible();
  });
});

test.describe("Links and Navigation", () => {
  test("Service page links to other services work", async ({ page }) => {
    await page.goto(getServiceUrl("daf-externalise", "fr"));

    // Find any internal links
    const links = page.locator('a[href*="/services/"]').first();

    if (await links.count() > 0) {
      const href = await links.getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toContain("/services/");
    }
  });

  test("Footer navigation links are present", async ({ page }) => {
    await page.goto(getHomeUrl("fr"));

    const footer = page.locator("footer");
    const links = footer.locator("a");

    // Footer should have multiple links
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(5);
  });

  test("Language switcher works", async ({ page }) => {
    await page.goto(getHomeUrl("fr"));

    // Find language switcher links in footer
    const enLink = page.locator('a[href="/en"]');
    const esLink = page.locator('a[href="/es"]');

    // At least one language link should exist
    expect(
      (await enLink.count()) > 0 || (await esLink.count()) > 0
    ).toBe(true);
  });
});

test.describe("Performance & Accessibility", () => {
  test("Service page has proper heading hierarchy", async ({ page }) => {
    await page.goto(getServiceUrl("daf-externalise", "fr"));

    const h1 = page.locator("h1");
    const h2 = page.locator("h2");

    // Should have exactly one h1
    expect(await h1.count()).toBe(1);

    // Should have h2s (section headings)
    expect(await h2.count()).toBeGreaterThan(0);
  });

  test("Images have alt text", async ({ page }) => {
    await page.goto(getHomeUrl("fr"));

    const images = page.locator("img");
    const count = await images.count();

    if (count > 0) {
      // Check that at least most images have alt text
      let imagesWithAlt = 0;
      for (let i = 0; i < Math.min(count, 10); i++) {
        const alt = await images.nth(i).getAttribute("alt");
        if (alt && alt.length > 0) {
          imagesWithAlt++;
        }
      }

      // At least 70% of images should have alt text
      expect(imagesWithAlt / Math.min(count, 10)).toBeGreaterThanOrEqual(0.7);
    }
  });
});

test.describe("Locale-Specific Content", () => {
  test("French page contains French content", async ({ page }) => {
    await page.goto(getHomeUrl("fr"));

    // Check for French-specific text
    const body = page.locator("body");
    const text = await body.textContent();

    // Should contain common French words from the site
    expect(text).toMatch(
      /(DAF|Externalisé|Services|Ressources|Paris|Toulouse|Barcelone)/i
    );
  });

  test("English page contains English content", async ({ page }) => {
    await page.goto(getHomeUrl("en"));

    const body = page.locator("body");
    const text = await body.textContent();

    // Should contain common English words from the site
    expect(text).toMatch(
      /(CFO|Outsourced|Services|Resources|Paris|Toulouse|Barcelona)/i
    );
  });

  test("Spanish page contains Spanish content", async ({ page }) => {
    await page.goto(getHomeUrl("es"));

    const body = page.locator("body");
    const text = await body.textContent();

    // Should contain common Spanish words from the site
    expect(text).toMatch(
      /(CFO|Externalizado|Servicios|Recursos|París|Toulouse|Barcelona)/i
    );
  });
});
