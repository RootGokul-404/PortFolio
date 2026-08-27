import { afterEach, describe, expect, it, vi } from "vitest";
import { sendContactNotification } from "./contactEmail";

const originalApiKey = process.env.RESEND_API_KEY;
const originalSender = process.env.CONTACT_FROM_EMAIL;

afterEach(() => {
  process.env.RESEND_API_KEY = originalApiKey;
  process.env.CONTACT_FROM_EMAIL = originalSender;
});

describe("contact email notifications", () => {
  it("sends a sanitized reply-enabled notification through Resend", async () => {
    process.env.RESEND_API_KEY = "re_test_key";
    process.env.CONTACT_FROM_EMAIL = "onboarding@resend.dev";
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "email_123" }), { status: 200 }));

    await expect(sendContactNotification({
      recipient: "gokulakannan7972@gmail.com",
      name: "Avery <Patel>",
      email: "avery@example.com",
      company: "Northstar Labs",
      message: "Please <reply> when you can.",
    }, fetchMock)).resolves.toEqual({ sent: true });

    const [, request] = fetchMock.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(String(request.body));
    expect(payload).toMatchObject({
      from: "onboarding@resend.dev",
      to: ["gokulakannan7972@gmail.com"],
      reply_to: "avery@example.com",
      subject: "New portfolio message from Avery <Patel>",
    });
    expect(payload.html).toContain("Avery &lt;Patel&gt;");
    expect(payload.html).toContain("Please &lt;reply&gt; when you can.");
    expect(request.headers).toMatchObject({ "Idempotency-Key": expect.any(String) });
  });
});
