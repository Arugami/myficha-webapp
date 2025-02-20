'use client';

import React, { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';
import type { Player } from '@/types';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  player: Player;
  isExpanded: boolean;
  onToggle: () => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, isExpanded, onToggle }) => {
  const [mounted, setMounted] = useState(false);
  const isTopPlayer = player.rank === 1;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <div className="flex-shrink-0 w-[280px] md:w-auto snap-center md:snap-none">
      <div
        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 
                 shadow-lg shadow-black/5 animate-fadeIn cursor-pointer
                 ${isTopPlayer 
                   ? 'bg-gradient-to-r from-[#9b87f5]/10 to-[#D946EF]/10 hover:from-[#9b87f5]/20 hover:to-[#D946EF]/20' 
                   : 'bg-black/20 hover:bg-black/30'}`}
        onClick={onToggle}
      >
        <div className="relative">
          <img
            src={player.avatar}
            alt={player.username}
            className={`w-10 h-10 md:w-16 md:h-16 rounded-full object-cover
                     ${isTopPlayer ? 'ring-2 ring-[#9b87f5] ring-offset-2 ring-offset-[#001F3F]' : ''}`}
          />
          {isTopPlayer && (
            <Crown 
              className="absolute -top-2 -right-2 w-6 h-6 text-[#D946EF] drop-shadow-lg animate-pulse" 
              strokeWidth={2.5}
            />
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <p className={`font-medium font-inter truncate max-w-[150px]
                        ${isTopPlayer ? 'text-[#9b87f5]' : 'text-[#FAEBD7]'}`}>
              {player.username}
            </p>
            <span className="text-lg">{player.country}</span>
          </div>
          <p className={`font-bold font-inter
                      ${isTopPlayer ? 'text-[#D946EF]' : 'text-[#FFC107]'}`}>
            {player.cdsScore} CDS
          </p>
          
          {isExpanded && player.statistics && (
            <div className="mt-2 space-y-1 text-sm text-[#FAEBD7]/80 animate-fadeIn font-inter">
              <p>Win Rate: {(player.statistics.winRate * 100).toFixed(1)}%</p>
              <p>Matches: {player.statistics.totalMatches}</p>
              <p>Avg Score: {player.statistics.averageScore}</p>
            </div>
          )}
        </div>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full 
                      ${isTopPlayer ? 'bg-[#9b87f5]/20 text-[#9b87f5]' : 'bg-[#FFC107]/20 text-[#FFC107]'}
                      font-inter`}>
          {player.rank}
        </div>
      </div>
    </div>
  );
};