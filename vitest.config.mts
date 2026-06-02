import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// Unit-test runner. Lives next to Playwright (which stays bound to `npm test`).
// Run via `npm run test:unit`. Coverage is intentionally not configured here
// to keep the initial setup minimal — add `@vitest/coverage-v8` later if
// needed.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    // Only pick up *.test.* files under explicit __tests__ folders so we
    // don't accidentally collide with Playwright's tests/ directory.
    include: ["**/__tests__/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
