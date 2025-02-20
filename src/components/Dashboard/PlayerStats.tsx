'use client';

import React from 'react';
import { Trophy, Star, Award, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { PlayerStatistics } from '../../types/dashboard';
import { CircularProgress } from './PlayerStats/CircularProgress';
import { StatCard } from './PlayerStats/StatCard';

interface PlayerStatsProps {
  statistics?: {
    winRate: number;
    totalMatches: number;
    averageScore: number;
  };
  cdsScore?: number;
  isLoading?: boolean;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ statistics, cdsScore, isLoading = false }) => {
  if (isLoading || !statistics) {
    return (
      <div className="bg-black/20 rounded-lg p-8 mx-8 animate-pulse shadow-lg shadow-black/5 backdrop-blur-sm border border-white/10">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black/20 rounded-lg p-8 mx-8 animate-fadeIn shadow-lg shadow-black/5 backdrop-blur-sm 
                    transition-all duration-300 ease-in-out hover:bg-black/25 border border-white/10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white font-inter tracking-tight">
        Your Statistics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <StatCard
          icon={<Award className="w-5 h-5 text-[#FFC107]" />}
          label="Capicúas"
          value={<span className="text-3xl font-bold text-[#FFC107]">{statistics.averageScore || 0}</span>}
          tooltip="Games won with a double domino tile"
        />
        
        <StatCard
          icon={<Zap className="w-5 h-5 text-[#FFC107]" />}
          label="Win Streak"
          value={<span className="text-3xl font-bold text-[#FFC107]">{statistics.winRate * 100}%</span>}
          tooltip="Your current consecutive wins"
        />
        
        <StatCard
          icon={<Star className="w-5 h-5 text-[#FFC107]" />}
          label="Pollonas"
          value={<span className="text-3xl font-bold text-[#FFC107]">{statistics.totalMatches}</span>}
          tooltip="Games won with 200+ points difference"
        />
        
        <StatCard
          icon={<Trophy className="w-5 h-5 text-[#FFC107]" />}
          label="Total Matches"
          value={<span className="text-3xl font-bold text-[#FFC107]">{statistics.totalMatches}</span>}
          tooltip="Total number of matches played"
        />
      </div>

      <Link 
        href="/profile" 
        className="flex items-center gap-2 px-4 py-2 mt-8 rounded-lg text-[#FAEBD7]/70
                   hover:text-[#FAEBD7] transition-colors duration-200 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-[#FFC107] rounded-lg
                   bg-black/5 hover:bg-black/10 group"
      >
        <span className="text-sm font-medium">View More Statistics</span>
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};