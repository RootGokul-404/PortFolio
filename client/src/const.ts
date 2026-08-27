import { OAUTH_STATE_COOKIE, encodeOAuthState } from "@shared/const";
import { toast } from "sonner";

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const startLogin = (returnPath = window.location.pathname + window.location.search + window.location.hash) => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const safeReturnPath = returnPath.startsWith("/") && !returnPath.startsWith("//") ? returnPath : "/";

  if (!oauthPortalUrl) {
    toast.error("Authentication portal is not configured in this environment.");
    return;
  }

  try {
    const nonce = crypto.randomUUID();
    document.cookie = `${OAUTH_STATE_COOKIE}=${nonce}; Path=/; Max-Age=600; SameSite=None; Secure`;
    const state = encodeOAuthState({ redirectUri, nonce, returnPath: safeReturnPath });

    const url = new URL(`${oauthPortalUrl.replace(/\/+$/, "")}/app-auth`);
    url.searchParams.set("appId", appId || "");
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");

    window.location.href = url.toString();
  } catch (err) {
    toast.error("Failed to construct login URL.");
  }
};
