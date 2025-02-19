import React from 'react';
import { LeaderboardHighlights } from '../components/Dashboard/LeaderboardHighlights';
import { useDashboardData } from '../hooks/useDashboardData';

const Leaderboard = () => {
  const { topPlayers, isLoading, isError } = useDashboardData();

  if (isLoading) {
    return <div className="p-8">Loading leaderboard data...</div>;
  }

  if (isError) {
    return <div className="p-8">Error loading leaderboard data. Please try again later.</div>;
  }

  return (
    <div className="max-w-[1600px] mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Leaderboard</h1>
      <LeaderboardHighlights players={topPlayers.data} />
    </div>
  );
};

export default Leaderboard;