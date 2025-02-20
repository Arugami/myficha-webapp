'use client';

import React, { useState, useEffect } from 'react';
import { MatchCard } from './matches/MatchCard';
import { Skeleton } from "@/app/_components/ui/skeleton";
import type { Match } from '@/types';

interface MatchHistoryTableProps {
  matches?: Match[];
  isLoading?: boolean;
}

export const MatchHistoryTable: React.FC<MatchHistoryTableProps> = ({ matches = [], isLoading = false }) => {
  const [mounted, setMounted] = useState(false);
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleExpand = (matchId: string) => {
    setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
  };

  const handleMouseLeave = () => {
    setExpandedMatchId(null);
  };

  // Don't render anything during SSR
  if (typeof window === 'undefined') {
    return null;
  }

  // Show loading state if not mounted or loading
  if (!mounted || isLoading) {
    return (
      <div className="bg-black/20 rounded-lg p-8 backdrop-blur-sm">
        <div className="space-y-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bg-black/10 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full bg-[#FAEBD7]/5" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48 bg-[#FAEBD7]/5" />
                  <Skeleton className="h-4 w-24 bg-[#FAEBD7]/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-black/20 rounded-lg p-8 backdrop-blur-sm transition-all duration-300 hover:bg-black/25"
      onMouseLeave={handleMouseLeave}
    >
      <div className="space-y-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bg-black/10 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full bg-[#FAEBD7]/5" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48 bg-[#FAEBD7]/5" />
                  <Skeleton className="h-4 w-24 bg-[#FAEBD7]/5" />
                </div>
              </div>
            </div>
          ))
        ) : (
          matches?.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              isExpanded={expandedMatchId === match.id}
              onToggleExpand={() => handleToggleExpand(match.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};