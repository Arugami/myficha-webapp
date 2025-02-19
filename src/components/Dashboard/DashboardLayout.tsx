'use client';

import React from 'react';
import { QuickActionBar } from './QuickActionBar';
import { RecentMatches } from './RecentMatches';
import { PlayerStats } from './PlayerStats';
import { FloatingActionButton } from './FloatingActionButton';
import { Hero } from './Hero';
import { PlayerProfileSnapshot } from './PlayerProfileSnapshot';
import { UpdatesFeed } from './UpdatesFeed';
import { OnlineFriends } from './OnlineFriends';
import { Challenges } from './Challenges';
import { useDashboardData } from '../../hooks/useDashboardData';

export const DashboardLayout: React.FC = () => {
  const { playerStats, recentMatches, isLoading, isError } = useDashboardData();

  // Handle initial loading state
  if (isLoading || !playerStats) {
    return (
      <div className="max-w-[1600px] mx-auto py-6 animate-pulse">
        <div className="space-y-10">
          <PlayerProfileSnapshot isLoading={true} />
          <Hero isLoading={true} playerStats={null} recentMatches={[]} />
          <PlayerStats isLoading={true} />
          <RecentMatches isLoading={true} />
          <QuickActionBar />
        </div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="max-w-[1600px] mx-auto py-6">
        <div className="text-center text-red-500 py-8">
          <p>Error loading dashboard data. Please try again later.</p>
        </div>
        <QuickActionBar />
      </div>
    );
  }

  // Handle case where data is loaded but playerStats is null
  if (!playerStats) {
    return (
      <div className="max-w-[1600px] mx-auto py-6">
        <div className="text-center text-yellow-500 py-8">
          <p>No player data available. Please complete your profile setup.</p>
        </div>
        <QuickActionBar />
      </div>
    );
  }

  // Once data is loaded, render the full dashboard
  return (
    <div className="max-w-[1600px] mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <PlayerProfileSnapshot 
            username={playerStats.username}
            rank={playerStats.rank}
            avatar={playerStats.avatar}
            country={playerStats.country}
            cdsScore={playerStats.cdsScore}
          />
          <Hero 
            playerStats={playerStats}
            recentMatches={recentMatches}
          />
          <PlayerStats 
            statistics={playerStats.statistics}
            cdsScore={playerStats.cdsScore}
          />
          <RecentMatches 
            matches={recentMatches}
            currentPlayer={playerStats}
          />
          <QuickActionBar />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            <OnlineFriends />
            <Challenges />
            <UpdatesFeed />
          </div>
        </div>
        <FloatingActionButton />
      </div>
    </div>
  );
};