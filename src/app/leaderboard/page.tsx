'use client';

import React, { useEffect, useState } from 'react';
import { LeaderboardHighlights } from './_components/LeaderboardHighlights';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function LeaderboardPage() {
  const [mounted, setMounted] = useState(false);
  const { topPlayers, isLoading, isError } = useDashboardData();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[1600px] mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Leaderboard</h1>
        <div className="p-8">Loading leaderboard data...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-[1600px] mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Leaderboard</h1>
        <div className="p-8">Loading leaderboard data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1600px] mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Leaderboard</h1>
        <div className="p-8">Error loading leaderboard data. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Leaderboard</h1>
      <LeaderboardHighlights players={topPlayers} />
    </div>
  );
}
