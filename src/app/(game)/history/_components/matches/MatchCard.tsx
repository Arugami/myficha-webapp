'use client';

import React from 'react';
import { Trophy, X, Clock, ChevronDown, Users, User } from 'lucide-react';
import { Match, Player } from '@/types';
import { format } from 'date-fns';
import { PlayerInfo } from './PlayerInfo';
import { MatchDetails } from './MatchDetails';
import { cn } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  currentPlayer?: Player;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, currentPlayer, isExpanded, onToggleExpand }) => {
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy h:mm a');
  };

  return (
    <div
      className={cn(
        "rounded-lg transition-all duration-500 ease-out animate-fadeIn cursor-pointer",
        "bg-black/10 hover:bg-[#FFC107]/10 focus-visible:bg-[#FFC107]/10",
        match.matchType === '2v2' ? 'border-l-4 border-[#FFC107]' : ''
      )}
      onClick={onToggleExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onToggleExpand();
        }
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
        <div className="flex-grow">
          <PlayerInfo match={match} currentPlayer={currentPlayer} />
          <div className="flex items-center gap-2 text-[#FAEBD7]/60 text-sm mt-4">
            <Clock className="w-4 h-4" />
            <span>{formatDate(match.date)}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 min-w-[120px] justify-end">
          <div className="flex items-center gap-2">
            {match.result === 'win' ? (
              <Trophy className="w-6 h-6 text-[#FFC107]" />
            ) : (
              <X className="w-6 h-6 text-red-500" />
            )}
            <span className={`font-semibold min-w-[48px] text-right ${
              match.cdsChange >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {match.cdsChange >= 0 ? '+' : ''}{match.cdsChange}
            </span>
          </div>
          <ChevronDown 
            className={cn(
              "w-5 h-5 text-[#FAEBD7]/40 transform transition-transform duration-500 ease-out",
              isExpanded ? "rotate-180" : ""
            )} 
          />
        </div>
      </div>
      
      <div 
        className={cn(
          "grid transition-all duration-500 ease-out",
          isExpanded 
            ? "grid-rows-[1fr] opacity-100 transform-none" 
            : "grid-rows-[0fr] opacity-0 -translate-y-4"
        )}
      >
        <div className="overflow-hidden">
          {match.statistics && <MatchDetails match={match} />}
        </div>
      </div>
    </div>
  );
};