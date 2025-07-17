// "use client";
// import { useEffect } from "react";
// import { usePlayerStore } from "@/lib/store";

// export default function LeaderboardPage() {
//   const { players, fetchPlayers } = usePlayerStore();

//   useEffect(() => {
//     fetchPlayers();
//   }, [fetchPlayers]);

//   return (
//     <main className="p-8 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
//       <ul>
//         {players.map((p) => (
//           <li key={p.id} className="border-b py-2 flex justify-between">
//             <span>{p.name}</span>
//             <span>{p.score}</span>
//             <span className="text-sm text-gray-400">
//               {new Date(p.updatedAt).toLocaleString()}
//             </span>
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// }


'use client'

import { useEffect } from 'react'
import { usePlayerStore } from '@/lib/store'
import TopThree from '@/components/Leaderboard/TopThree'
import LeaderboardTabs from '@/components/Leaderboard/LeaderboardTabs'
import CountdownTimer from '@/components/Leaderboard/CountdownTimer'
import UserRankInfo from '@/components/Leaderboard/UserRankInfo'
import LeaderboardTable from '@/components/Leaderboard/LeaderboardTable'

export default function LeaderboardPage() {
  const { players, fetchPlayers } = usePlayerStore()

  useEffect(() => {
    fetchPlayers()
  }, [fetchPlayers])

  return (
    <main className="min-h-screen px-4 py-8 bg-[#0c0f1a] text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        <LeaderboardTabs />
        <TopThree players={players.slice(0, 3)} />
        <CountdownTimer />
        <UserRankInfo />
        <LeaderboardTable players={players.slice(3)} />
      </div>
    </main>
  )
}
