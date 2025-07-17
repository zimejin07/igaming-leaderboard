interface Player {
  id: string;
  name: string;
  score: number;
  updatedAt: string;
}

export default function LeaderboardTable({ players }: { players: Player[] }) {
  return (
    <div className="mt-6 bg-[#121624] rounded-lg overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#1d2235] text-gray-300">
          <tr>
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">User name</th>
            <th className="px-4 py-3">Point</th>
            <th className="px-4 py-3">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, idx) => (
            <tr key={p.id} className="border-t border-[#1d2235]">
              <td className="px-4 py-3">{idx + 4}</td>
              <td className="px-4 py-3">{p.name}</td>
              <td className="px-4 py-3">{p.score.toLocaleString()}</td>
              <td className="px-4 py-3 text-xs text-gray-400">
                {new Date(p.updatedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
