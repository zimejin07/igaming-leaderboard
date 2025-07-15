"use client";
import { useEffect } from "react";
import { usePlayerStore } from "@/lib/store";

export default function LeaderboardPage() {
  const { players, fetchPlayers } = usePlayerStore();

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <ul>
        {players.map((p) => (
          <li key={p.id} className="border-b py-2 flex justify-between">
            <span>{p.name}</span>
            <span>{p.score}</span>
            <span className="text-sm text-gray-400">
              {new Date(p.updatedAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
