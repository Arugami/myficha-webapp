'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Player } from '@/types/dashboard';
import { PlayerCard } from '@/app/dashboard/_components/leaderboard/PlayerCard';

interface LeaderboardHighlightsProps {
  players: Player[];
}

export const LeaderboardHighlights: React.FC<LeaderboardHighlightsProps> = ({ players = [] }) => {
  const [expandedPlayer, setExpandedPlayer] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-black/20 rounded-lg p-6">
      <h2 className="text-2xl font-inter font-bold mb-6 text-[#FAEBD7]">
        Top Players
      </h2>
      <div className="md:space-y-4 md:block flex gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            isExpanded={expandedPlayer === player.id}
            onToggle={() => setExpandedPlayer(expandedPlayer === player.id ? null : player.id)}
          />
        ))}
      </div>
      <Link
        href="/leaderboard"
        className="flex items-center justify-center gap-2 mt-6 py-2 text-[#FFC107] hover:text-[#FAEBD7] 
                 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 
                 focus-visible:ring-[#FFC107] rounded-lg font-inter"
      >
        View Full Leaderboard
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};