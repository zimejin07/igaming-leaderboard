import useSWR from "swr";

export const useLeaderboard = () => {
  const fetcher = async () => {
    const res = await fetch("/api/player");
    return res.json();
  };

  const { data, error, mutate } = useSWR("/api/player", fetcher, {
    refreshInterval: 10000, // auto-refresh every 10s
  });

  return {
    players: data || [],
    isLoading: !data && !error,
    error,
    mutate,
  };
};
