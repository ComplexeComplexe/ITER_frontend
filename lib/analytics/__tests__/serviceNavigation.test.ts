import { beforeEach, describe, expect, it, vi } from "vitest";
import { recordServiceNavigation } from "../serviceNavigation";
import { currentConsent } from "../consent";
vi.mock("../consent", () => ({ currentConsent: vi.fn() }));
beforeEach(() => { window.dataLayer = []; vi.mocked(currentConsent).mockReturnValue({ necessary:true, analytics:true, marketing:false }); });
describe("service navigation measurement", () => {
  it("does not measure without analytics consent", () => { vi.mocked(currentConsent).mockReturnValue({ necessary:true, analytics:false, marketing:true }); recordServiceNavigation("/drh-externalise", "home-hero"); expect(window.dataLayer).toEqual([]); });
  it("keeps only the controlled path and placement", () => { recordServiceNavigation("/drh-externalise?email=private@example.com#personal", "home-hero"); expect(window.dataLayer).toEqual([{ event:"service_navigation", service_family:"rh", placement:"home-hero", target_path:"/drh-externalise", page_variant:"finance-first-rh-2026-10" }]); });
  it("ignores external and unrelated destinations", () => { recordServiceNavigation("https://example.com/drh-externalise", "footer"); recordServiceNavigation("/contact?message=secret", "content"); expect(window.dataLayer).toEqual([]); });
});
