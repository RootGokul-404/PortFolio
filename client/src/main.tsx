// Main React Application Entry Point
import { trpc } from "@/lib/trpc";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from "@shared/const";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { startLogin } from "./const";
import "./index.css";

// Create TanStack Query client for API caching and state management
const queryClient = new QueryClient();

// Helper function to redirect to login if session is unauthorized
const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;
  if (!isUnauthorized) return;

  startLogin(window.location.pathname + window.location.search + window.location.hash);
};

// Global listener for query errors
queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    redirectToLoginIfUnauthorized(event.query.state.error);
  }
});

// Global listener for mutation errors
queryClient.getMutationCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    redirectToLoginIfUnauthorized(event.mutation.state.error);
  }
});

// Initialize tRPC client with HTTP batch link
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      headers() {
        try {
          // Check for stored auth session token
          const raw = sessionStorage.getItem("auth-token") || sessionStorage.getItem(COOKIE_NAME);
          if (raw) {
            const prefix = `${COOKIE_NAME}=`;
            const pair = raw.split(";").find((s) => s.trim().startsWith(prefix));
            const token = pair?.trim().slice(prefix.length) || raw;
            if (token) {
              return { Authorization: `Bearer ${token}` };
            }
          }
        } catch (err) {
          console.warn("Could not read auth header:", err);
        }
        return {};
      },
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

// Render the root component into the DOM
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
