"use client";

import TopThree from "@/components/Leaderboard/TopThree";
import LeaderboardTabs from "@/components/Leaderboard/LeaderboardTabs";
import CountdownTimer from "@/components/Leaderboard/CountdownTimer";
import UserRankInfo from "@/components/Leaderboard/UserRankInfo";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";
import { useLeaderboard } from "@/lib/hooks/useLeaderboard";
import ErrorBanner from "@/components/common/ErrorBanner";
import SkeletonLeaderboard from "@/components/common/SkeletonLeaderboard";

export default function LeaderboardPage() {
  const { players, error, isLoading } = useLeaderboard();

  if (isLoading) return <SkeletonLeaderboard />;
  if (error) return <ErrorBanner message="Failed to load leaderboard." />;

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
  );
}
