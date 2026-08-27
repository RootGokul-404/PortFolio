import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function contextFor(role: "admin" | "user"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: `${role}-test`,
      name: "Test User",
      email: "test@example.com",
      loginMethod: "manus",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("admin and spam-protection contracts", () => {
  it("rejects non-admin access to submission data", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.admin.get()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows an admin to load persisted content and save unchanged owner data", async () => {
    const caller = appRouter.createCaller(contextFor("admin"));
    const data = await caller.admin.get();

    expect(data.profile?.displayName).toBeTruthy();
    expect(data.projects.length).toBeGreaterThan(0);
    expect(data.skills.length).toBeGreaterThan(0);
    expect(data.articles.length).toBeGreaterThan(0);
    expect(data.details.length).toBeGreaterThan(0);

    const profile = data.profile!;
    await expect(caller.admin.updateProfile({
      displayName: profile.displayName,
      handle: profile.handle || "",
      role: profile.role,
      intro: profile.intro,
      about: profile.about,
      location: profile.location || "",
      email: profile.email || "",
      githubUrl: profile.githubUrl || "",
      linkedinUrl: profile.linkedinUrl || "",
      instagramUrl: profile.instagramUrl || "",
      resumeUrl: profile.resumeUrl || "",
    })).resolves.toEqual({ success: true });

    const submission = data.submissions[0];
    if (submission) {
      await expect(caller.admin.updateSubmissionStatus({ id: submission.id, status: submission.status })).resolves.toEqual({ success: true });
    }
  }, 20_000);

  it("accepts a filled honeypot without submitting it to the contact workflow", async () => {
    const caller = appRouter.createCaller(contextFor("user"));
    await expect(caller.portfolio.sendMessage({
      name: "Spam Bot",
      email: "spam@example.com",
      message: "This message is long enough to pass input validation.",
      website: "https://spam.example.com",
    })).resolves.toEqual({ success: true, emailSent: true });
  });
});
