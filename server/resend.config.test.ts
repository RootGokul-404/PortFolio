import { describe, expect, it } from "vitest";

describe("Resend email configuration", () => {
  it("authenticates with a safe send-permission check", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    const sender = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey) {
      expect(true).toBe(true);
      return;
    }

    expect(sender, "CONTACT_FROM_EMAIL must be configured").toMatch(/.+<[^@\s]+@[^@\s]+>|^[^@\s]+@[^@\s]+$/);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "User-Agent": "rootgokul-portfolio-contact-test/1.0",
        "Content-Type": "application/json",
      },
      body: "{}",
    });

    expect([400, 422], await response.text()).toContain(response.status);
  }, 20_000);
});
