import { describe, expect, it } from "vitest";
import { contactSubmissionInput } from "./routers";

describe("portfolio contact contract", () => {
  it("accepts a complete contact submission", () => {
    const parsed = contactSubmissionInput.parse({
      name: "Avery Patel",
      email: "avery@example.com",
      company: "Northstar Labs",
      message: "I would like to discuss a potential product collaboration.",
    });
    expect(parsed.email).toBe("avery@example.com");
  });

  it("rejects messages that are too short to be actionable", () => {
    const result = contactSubmissionInput.safeParse({
      name: "Avery Patel",
      email: "avery@example.com",
      message: "Hello",
    });
    expect(result.success).toBe(false);
  });
});
