import { IPortfolioRepository, portfolioRepository } from "../repositories/portfolioRepository";
import { emailService, IEmailService } from "./emailService";

export type ContactSubmissionInput = {
  name: string;
  email: string;
  company?: string;
  message: string;
  website?: string;
};

export class ContactService {
  constructor(
    private repo: IPortfolioRepository = portfolioRepository,
    private mail: IEmailService = emailService,
  ) {}

  async submitMessage(input: ContactSubmissionInput): Promise<{ success: boolean; emailSent: boolean }> {
    if (input.website) {
      return { success: true, emailSent: true };
    }

    await this.repo.createSubmission({
      name: input.name,
      email: input.email,
      company: input.company || null,
      message: input.message,
    });

    const content = await this.repo.getPortfolioContent();
    const recipient = content.profile?.email || "gokulakannan7972@gmail.com";

    try {
      const emailResult = await this.mail.sendContactNotification({
        recipient,
        name: input.name,
        email: input.email,
        company: input.company,
        message: input.message,
      });
      return { success: true, emailSent: emailResult.sent };
    } catch (error) {
      console.error("[ContactService] Email notification error:", error);
      return { success: true, emailSent: false };
    }
  }
}

export const contactService = new ContactService();
