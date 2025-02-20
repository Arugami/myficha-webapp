'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Match, Player } from '@/types';
import { MatchCard } from '@/app/(game)/history/_components/matches/MatchCard';

interface RecentMatchesProps {
  matches?: Match[];
  currentPlayer?: Player;
  isLoading?: boolean;
}

export const RecentMatches: React.FC<RecentMatchesProps> = ({ matches = [], currentPlayer, isLoading = false }) => {
  const [expandedMatch, setExpandedMatch] = React.useState<string | null>(null);
  const [showAll, setShowAll] = React.useState(false);
  const router = useRouter();

  // Ensure matches is an array before calling slice
  const safeMatches = Array.isArray(matches) ? matches : [];
  const displayedMatches = showAll ? safeMatches : safeMatches.slice(0, 5);

  const handleMouseLeave = () => {
    setExpandedMatch(null);
  };

  const handleViewHistory = () => {
    router.push('/history');
  };

  if (isLoading) {
    return (
      <div className="bg-black/20 rounded-lg p-8 mx-8 animate-pulse shadow-lg shadow-black/5 backdrop-blur-sm border border-white/10">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
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
        Recent Matches
      </h2>
      <div className="space-y-6">
        {displayedMatches.map((match) => (
          <div key={match.id} onMouseLeave={handleMouseLeave}>
            <MatchCard
              match={match}
              currentPlayer={currentPlayer}
              isExpanded={expandedMatch === match.id}
              onToggleExpand={() => setExpandedMatch(expandedMatch === match.id ? null : match.id)}
            />
          </div>
        ))}
      </div>
      
      {matches.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center justify-center gap-2 w-full mt-8 py-3 text-[#FAEBD7]/70
                   hover:text-[#FAEBD7] transition-colors duration-200 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-[#FFC107] rounded-lg
                   bg-black/5 hover:bg-black/10 group"
        >
          <span className="text-sm font-medium">{showAll ? 'Show Less' : 'Load More'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
            showAll ? 'rotate-180' : ''
          }`} />
        </button>
      )}

      <button
        onClick={handleViewHistory}
        className="flex items-center justify-center gap-2 w-full mt-4 py-3 text-[#FAEBD7]/70
                 hover:text-[#FAEBD7] transition-colors duration-200 focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-[#FFC107] rounded-lg
                 bg-black/5 hover:bg-black/10 group"
      >
        <span className="text-sm font-medium">View complete match history</span>
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </button>
    </div>
  );
};