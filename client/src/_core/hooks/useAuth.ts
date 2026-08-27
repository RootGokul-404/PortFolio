import { trpc } from "@/lib/trpc";
import { useCallback } from "react";

export function useAuth() {
  const { data: user, isLoading: loading, error, refetch } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const utils = trpc.useUtils();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
      window.location.href = "/";
    },
  });

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      window.location.href = "/";
    }
  }, [logoutMutation]);

  return {
    user: user ?? null,
    loading,
    error,
    refetch,
    logout,
    isAuthenticated: Boolean(user),
  };
}
