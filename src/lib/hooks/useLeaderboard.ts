import useSWR from 'swr'

export const useLeaderboard = () => {
  const fetcher = async () => {
    const res = await fetch('/api/player')
    return res.json()
  }

  const { data, error, mutate } = useSWR('/api/player', fetcher, {
    refreshInterval: 5000, // auto-refresh every 5s
  })

  return {
    players: data || [],
    loading: !data && !error,
    error,
    mutate,
  }
}
