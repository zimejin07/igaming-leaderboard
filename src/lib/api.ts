import { Player } from "./store"

export async function fetchPlayers(): Promise<Player[]> {
  const res = await fetch('/api/player')
  if (!res.ok) throw new Error('Failed to fetch players')
  return res.json()
}
