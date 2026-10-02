import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LeadForm } from "../CadsRoiPage";

afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
function submit() {
  const { container } = render(<LeadForm />);
  fireEvent.submit(container.querySelector("form")!);
}
describe("ROI landing delivery", () => {
  it("does not display success or log personal data when delivery is unconfigured", async () => {
    vi.stubEnv("NEXT_PUBLIC_WEBHOOK_URL", "");
    const fetch = vi.fn(), log = vi.spyOn(console, "log");
    vi.stubGlobal("fetch", fetch);
    vi.spyOn(console, "error").mockImplementation(() => {});
    submit();
    await waitFor(() => expect(screen.getByText(/Une erreur est survenue/)).toBeTruthy());
    expect(screen.queryByText("Demande reçue.")).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });
  it("shows confirmation only after a successful delivery", async () => {
    vi.stubEnv("NEXT_PUBLIC_WEBHOOK_URL", "https://example.invalid/test-lead");
    const fetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetch);
    submit();
    await waitFor(() => expect(screen.getByText("Demande reçue.")).toBeTruthy());
    expect(fetch).toHaveBeenCalledTimes(1);
    const data = JSON.parse(fetch.mock.calls[0][1].body);
    expect(data.source).toBe("cads-roi");
    expect(data).not.toHaveProperty("website");
  });
});
