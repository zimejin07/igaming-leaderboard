"use client";

import { motion } from "framer-motion";
import { Player } from "@/lib/store";

interface Props {
  players: Player[];
}

export default function LeaderboardTable({ players }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-separate border-spacing-y-2">
        <thead className="bg-[#1d2235]">
          <tr className="text-left text-sm text-gray-400">
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">User name</th>
            <th className="px-4 py-3">Point</th>
            <th className="px-4 py-3">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p, index) => (
            <motion.tr
              key={p.id + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-[#1c1f2e] text-white text-sm rounded px-4 py-2"
            >
              <td className="py-2 px-2">{index + 4}</td>
              <td className="py-2 px-2 flex items-center gap-2">
                <img
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${p.name}`}
                  alt="avatar"
                  className="w-6 h-6 rounded-full"
                />
                {p.name}
              </td>
              <td className="py-2 px-2">{p.score}</td>
              <td className="py-2 px-2 text-xs text-gray-400">
                {new Date(p.updatedAt).toLocaleString()}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
