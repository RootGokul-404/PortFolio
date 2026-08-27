export type ContactEmailPayload = {
  recipient?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
};

export interface IEmailService {
  sendContactNotification(payload: ContactEmailPayload): Promise<{ sent: boolean }>;
}

const RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character] || character;
  });
}

export class ResendEmailService implements IEmailService {
  constructor(private fetchImpl: typeof fetch = fetch) {}

  async sendContactNotification(payload: ContactEmailPayload): Promise<{ sent: boolean }> {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL || "RootGokul Portfolio <onboarding@resend.dev>";
    const recipient = payload.recipient || process.env.CONTACT_TO_EMAIL || "gokulakannan7972@gmail.com";

    if (!apiKey) {
      console.warn("[ResendEmailService] RESEND_API_KEY is not set in environment. Skipping email dispatch.");
      return { sent: false };
    }

    const safeName = escapeHtml(payload.name);
    const safeEmail = escapeHtml(payload.email);
    const safeCompany = payload.company ? escapeHtml(payload.company) : "Not specified";
    const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");
    const subject = `New portfolio message from ${payload.name}`;
    const text = [
      `New portfolio inquiry from ${payload.name} (${payload.email}):`,
      `Company: ${payload.company || "Not specified"}`,
      "",
      `Message:`,
      payload.message,
    ].join("\n");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#090d0b;color:#f1f5f9;margin:0;padding:24px;">
          <div style="max-width:600px;margin:0 auto;background:#0d1310;border:1px solid #1e2922;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <div style="background:linear-gradient(135deg,#0d1310,#131f18);padding:24px;border-bottom:1px solid #1e2922;">
              <h1 style="margin:0;font-size:20px;color:#c7ff40;letter-spacing:0.05em;font-family:monospace;">ROOTGOKUL-404 // DISPATCH RECEIVED</h1>
              <p style="margin:6px 0 0 0;font-size:13px;color:#94a3b8;">New visitor transmission from your portfolio website</p>
            </div>
            <div style="padding:24px;">
              <div style="margin-bottom:16px;padding:12px;background:#111914;border-left:3px solid #c7ff40;border-radius:4px;">
                <p style="margin:0 0 6px 0;font-size:14px;"><strong>From:</strong> <span style="color:#f8fafc;">${safeName}</span> (<a href="mailto:${safeEmail}" style="color:#38bdf8;text-decoration:none;">${safeEmail}</a>)</p>
                <p style="margin:0;font-size:14px;"><strong>Organization:</strong> <span style="color:#94a3b8;">${safeCompany}</span></p>
              </div>
              <div style="margin-top:20px;">
                <h3 style="margin:0 0 8px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#c7ff40;font-family:monospace;">MESSAGE PAYLOAD</h3>
                <div style="background:#090d0b;padding:16px;border:1px solid #1e2922;border-radius:8px;font-size:14px;line-height:1.6;color:#e2e8f0;white-space:pre-wrap;">${safeMessage}</div>
              </div>
              <div style="margin-top:24px;text-align:center;">
                <a href="mailto:${safeEmail}?subject=Re:%20Portfolio%20Inquiry" style="display:inline-block;background:#c7ff40;color:#090d0b;font-weight:bold;font-size:13px;padding:10px 20px;border-radius:6px;text-decoration:none;font-family:monospace;">REPLY TO ${safeName.toUpperCase()}</a>
              </div>
            </div>
            <div style="background:#090d0b;padding:16px;border-top:1px solid #1e2922;text-align:center;font-size:11px;color:#64748b;font-family:monospace;">
              Transmitted to ${recipient} · System Core v1.0
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await this.fetchImpl(RESEND_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "rootgokul-portfolio/1.0",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: payload.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => response.statusText);
      console.error(`[ResendEmailService] Failed (${response.status}):`, errText);
      throw new Error(`Resend notification failed with status ${response.status}: ${errText}`);
    }

    return { sent: true };
  }
}

export const emailService: IEmailService = new ResendEmailService();
