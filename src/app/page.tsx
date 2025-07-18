"use client";

import TopThree from "@/components/Leaderboard/TopThree";
import LeaderboardTabs from "@/components/Leaderboard/LeaderboardTabs";
import CountdownTimer from "@/components/Leaderboard/CountdownTimer";
import UserRankInfo from "@/components/Leaderboard/UserRankInfo";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";
import { useLeaderboard } from "@/lib/hooks/useLeaderboard";
import ErrorBanner from "@/components/common/ErrorBanner";
import SkeletonLeaderboard from "@/components/common/SkeletonLeaderboard";
import { useRouter } from "next/navigation";

export default function LeaderboardPage() {
  const { players, error, isLoading } = useLeaderboard();
  const router = useRouter();

  if (isLoading) return <SkeletonLeaderboard />;
  if (error) return <ErrorBanner message="Failed to load leaderboard." />;

  return (
    <main className="min-h-screen px-4 py-8 bg-[#0c0f1a] text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top bar with tabs and admin link */}
        <div className="flex justify-between items-center">
          <LeaderboardTabs />
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-gray-400 hover:text-white border border-gray-600 rounded px-3 py-1 transition-colors"
          >
            Admin Login
          </button>
        </div>

        <TopThree players={players.slice(0, 3)} />
        <CountdownTimer />
        <UserRankInfo />
        <LeaderboardTable players={players.slice(3)} />
      </div>
    </main>
  );
}
