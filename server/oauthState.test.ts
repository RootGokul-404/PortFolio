import { describe, expect, it } from "vitest";
import { decodeOAuthState, encodeOAuthState } from "../shared/const";

describe("OAuth state", () => {
  it("preserves a relative post-login admin destination", () => {
    const state = encodeOAuthState({
      redirectUri: "https://example.com/api/oauth/callback",
      nonce: "nonce",
      returnPath: "/admin",
    });

    expect(decodeOAuthState(state)).toMatchObject({
      returnPath: "/admin",
      nonce: "nonce",
    });
  });
});
