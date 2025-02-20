'use client';

import React from 'react';
import type { Match } from '@/types';

interface MatchDetailsProps {
  match: Match;
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => {
  return (
    <div className="px-6 pb-6 text-sm space-y-4 animate-fadeIn">
      <div className="h-px bg-[#FAEBD7]/10 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/10 p-4 rounded-lg">
          <h3 className="text-[#FAEBD7]/60 mb-3 font-medium">Final Score</h3>
          <div className="flex items-center justify-center gap-4 text-xl font-bold text-[#FAEBD7]">
            <span>{match.matchType === '2v2' ? 'Your Team' : 'You'}</span>
            <span className="text-2xl text-[#FFC107]">
              {match.result === 'win' ? '150' : match.score.player}
            </span>
            <span className="text-[#FAEBD7]/60">vs</span>
            <span className="text-2xl text-[#FFC107]">
              {match.result === 'win' ? match.score.opponent : '150'}
            </span>
            <span>{match.matchType === '2v2' ? 'Opponent Team' : 'Opponent'}</span>
          </div>
        </div>
        <div className="bg-black/10 p-4 rounded-lg">
          <h3 className="text-[#FAEBD7]/60 mb-3 font-medium">Match Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#FAEBD7]/60">Pollonas</p>
              <p className="text-[#FAEBD7] font-medium">{match.statistics?.pollonas}</p>
            </div>
            <div>
              <p className="text-[#FAEBD7]/60">Capicúas</p>
              <p className="text-[#FAEBD7] font-medium">{match.statistics?.capicuas}</p>
            </div>
            <div>
              <p className="text-[#FAEBD7]/60">Total Points</p>
              <p className="text-[#FAEBD7] font-medium">{match.statistics?.totalPoints}</p>
            </div>
            <div>
              <p className="text-[#FAEBD7]/60">CDS Change</p>
              <p className={`font-medium ${
                match.cdsChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {match.cdsChange >= 0 ? '+' : ''}{match.cdsChange}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};