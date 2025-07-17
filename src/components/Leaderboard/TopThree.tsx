interface Player {
  name: string;
  score: number;
  avatar?: string;
  prize?: string;
}

export default function TopThree({ players }: { players: Player[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {players.map((p, idx) => (
        <div key={p.name} className="bg-[#141927] p-4 rounded-xl shadow-md">
          <img
            src={p.avatar || `/avatars/${idx + 1}.png`}
            alt={p.name}
            className="mx-auto w-20 h-20 rounded-full"
          />
          <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
          <p className="text-sm text-gray-400">Score {p.score}</p>
          <div className="mt-2 text-blue-400 text-lg font-semibold">
            {p.prize ?? "💎"}
          </div>
        </div>
      ))}
    </div>
  );
}
