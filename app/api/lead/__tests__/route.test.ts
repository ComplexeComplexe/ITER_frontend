// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const send = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({ Resend: class { emails = { send }; } }));
import { POST } from "../route";
const request = (data: unknown, source = "contact") => new NextRequest("http://localhost/api/lead", { method: "POST", body: JSON.stringify({ source, data }) });
beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "local-mocked-provider");
  vi.stubEnv("LEAD_SIGNING_SECRET", "local-unit-test-secret-no-network");
  send.mockReset();
});
describe("confirmed lead notifications", () => {
  it("rejects invalid payloads and honeypots before notification or conversion", async () => {
    for (const data of [null, [], { email: "not-an-email" }, { email: "test@example.com", message: {} }, { email: "test@example.com", website: "spam" }]) {
      expect((await POST(request(data))).status).toBe(400);
    }
    expect(send).not.toHaveBeenCalled();
  });
  it("does not claim success when the notification provider rejects or returns no receipt", async () => {
    for (const result of [{ error: { message: "rejected" }, data: null }, { error: null, data: null }]) {
      send.mockResolvedValueOnce(result);
      expect((await POST(request({ email: "test@example.com" }))).status).toBe(500);
    }
  });
  it("returns a provider receipt and escapes supplied content without claiming CRM qualification", async () => {
    send.mockResolvedValueOnce({ error: null, data: { id: "mocked-receipt" } });
    const response = await POST(request({ email: "test@example.com", message: '<a href="evil">fake link</a>', originPage: "/daf-externalise" }));
    expect(await response.json()).toEqual({ success: true, receiptId: "mocked-receipt" });
    expect(send.mock.calls[0][0].html).toContain("&lt;a href=&quot;evil&quot;&gt;");
    expect(send.mock.calls[0][0].html).toContain("/daf-externalise");
    expect(send.mock.calls[0][0].html).toContain("que si vous cliquez");
  });
});
