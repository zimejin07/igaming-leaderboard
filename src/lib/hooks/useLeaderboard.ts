import useSWR from "swr";
import { fetchPlayers } from "@/lib/api";

export function useLeaderboard() {
  const { data, error, isLoading } = useSWR("/api/player", fetchPlayers, {
    refreshInterval: 10000,
  });

  return {
    players: data || [],
    error,
    isLoading,
  };
}
