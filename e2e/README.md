# E2E Tests with Playwright

This directory contains end-to-end tests for critical application routes using Playwright.

## Overview

The test suite covers:

- **Service Pages**: All 14 service pages (5 slugs × 3 locales = 15 tests)
- **DAF Pages**: DAF Externalisé pages in FR/EN/ES
- **Home Pages**: Home page across all locales
- **JSON-LD Schemas**: Validation of structured data (FAQ, WPFooter)
- **Mobile Responsiveness**: Tests on mobile viewports (Pixel 5, iPhone 12)
- **Localization**: Verification that correct language content appears
- **Links and Navigation**: Ensures internal links and language switchers work

## Installation

1. Install Playwright browsers:
   ```bash
   npm install
   npx playwright install
   ```

2. Ensure your development server is running:
   ```bash
   npm run dev
   ```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in UI mode (interactive):
```bash
npm run test:ui
```

### Run tests with debugging:
```bash
npm run test:debug
```

### View the HTML report:
```bash
npm run test:report
```

### Run specific test file:
```bash
npx playwright test e2e/critical-routes.spec.ts
```

### Run tests on specific project (browser):
```bash
npx playwright test --project chromium
npx playwright test --project "Mobile Chrome"
```

## Configuration

Configuration is in `playwright.config.ts`. Key settings:

- **Base URL**: `http://localhost:3000` (or `PLAYWRIGHT_TEST_BASE_URL` env var)
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Reporter**: HTML report in `playwright-report/`
- **Screenshots**: Captured on failure
- **Traces**: Enabled on first retry

## Test Structure

### Critical Routes - Service Pages
Tests that each service page:
- Returns 200/304 status code
- Has a valid title
- Has exactly one H1 heading

### Critical Routes - DAF Pages
Tests that DAF pages load and display properly across locales.

### Critical Routes - Home Pages
Tests that home pages load with proper navigation and footer.

### JSON-LD Structured Data
- Validates FAQ schema on home page
- Validates WPFooter schema in footer

### Mobile Responsiveness
- Sets mobile viewport (375x812)
- Verifies content is visible without overflow
- Tests on Pixel 5 and iPhone 12 viewports

### Links and Navigation
- Verifies service page links work
- Checks footer has sufficient links
- Tests language switcher functionality

### Locale-Specific Content
- FR page contains French content
- EN page contains English content
- ES page contains Spanish content

### Accessibility & Performance
- Checks H1/H2 hierarchy
- Verifies images have alt text
- Validates no layout shift issues

## Continuous Integration

In CI environments, tests will:
- Run with 1 worker (sequential)
- Retry failed tests up to 2 times
- Use `forbidOnly` to prevent test.only in commits
- Generate HTML report

Set `CI=true` environment variable to enable CI mode:
```bash
CI=true npm test
```

## Debugging Failed Tests

1. **UI Mode** - Best for visual debugging:
   ```bash
   npm run test:ui
   ```

2. **Debug Mode** - Step through tests:
   ```bash
   npm run test:debug
   ```

3. **View Screenshots** - Check `test-results/` for failure screenshots

4. **Check Traces** - View recorded action traces in the HTML report

## Environment Variables

- `PLAYWRIGHT_TEST_BASE_URL` - Base URL for tests (default: `http://localhost:3000`)
- `CI` - Set to `true` for CI mode

## Adding New Tests

1. Add test cases to this file or create a new `.spec.ts` file
2. Follow the naming convention: `test("description", async ({ page }) => { ... })`
3. Use `expect()` for assertions
4. Use `page.goto()`, `page.locator()`, etc. for interactions

Example:
```typescript
test("My new test", async ({ page }) => {
  await page.goto("/my-page");
  await expect(page).toHaveTitle(/Expected Title/);
});
```

## Common Issues

### Tests fail with "ECONNREFUSED"
- Make sure dev server is running: `npm run dev`
- Check that port 3000 is available

### Timeout waiting for element
- Element may not exist or may be hidden
- Use `waitFor` option: `page.locator("selector").waitFor()`
- Check the failure screenshot

### Flaky tests
- Use `expect().toBeVisible()` instead of checking visibility indirectly
- Add proper waits for dynamic content
- Use `page.waitForLoadState()` if needed

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)
