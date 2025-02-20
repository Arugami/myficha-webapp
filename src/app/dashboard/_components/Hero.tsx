'use client';

import React from 'react';
import type { Player, Match } from '@/types/dashboard';
import { RankDisplay } from './Hero/RankDisplay';
import { CDSScoreDisplay } from './Hero/CDSScoreDisplay';
import { WinRatioDisplay } from './Hero/WinRatioDisplay';
import { RankProgress } from './Hero/RankProgress';

interface HeroProps {
  playerStats?: Player;
  recentMatches?: Match[];
  isLoading?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ playerStats, recentMatches, isLoading = false }) => {
  // Move greeting to client-side effect to avoid hydration mismatch
  const [greeting, setGreeting] = React.useState('Hello');

  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-cuban.navy to-cuban.coral rounded-lg mx-8 animate-pulse shadow-lg shadow-black/5">
        <div className="space-y-8 p-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-cuban.navy to-cuban.coral rounded-lg mx-8 animate-fadeIn shadow-lg shadow-black/5">
      <div className="space-y-8 p-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90">
          {greeting}, <span className="font-inter font-semibold tracking-tight">{playerStats.username || 'Player'}</span>
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <RankDisplay cdsScore={playerStats.cdsScore} rank={playerStats.rank} />
          <CDSScoreDisplay score={playerStats.cdsScore} />
          <WinRatioDisplay 
            winRate={playerStats.statistics?.winRate ?? 0}
            totalMatches={playerStats.statistics?.totalMatches ?? 0}
          />
        </div>

        <RankProgress cdsScore={playerStats.cdsScore} />
      </div>
    </div>
  );
};