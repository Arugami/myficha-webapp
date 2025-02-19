'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PlayerProfileSnapshotProps {
  username?: string;
  rank?: number;
  avatar?: string;
  country?: string;
  cdsScore?: number;
  isLoading?: boolean;
}

export const PlayerProfileSnapshot: React.FC<PlayerProfileSnapshotProps> = ({
  username,
  rank,
  avatar,
  country,
  cdsScore,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="bg-black/20 rounded-lg p-8 mx-8 animate-fadeIn shadow-lg shadow-black/5 backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 rounded-lg p-8 mx-8 animate-fadeIn shadow-lg shadow-black/5 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <img
          src={avatar || '/default-avatar.png'}
          alt={username || 'Player'}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover border-2 border-[#FFC107]/20"
        />
        <div>
          <h2 className="text-2xl font-bold text-[#FAEBD7]">{username || 'Loading...'}</h2>
          <p className="text-[#FAEBD7]/60">Rank #{rank || '...'} {country && `• ${country}`}</p>
        </div>
      </div>
      
      <Link 
        href="/profile" 
        className="flex items-center gap-2 px-4 py-2 mt-8 rounded-lg text-[#FAEBD7]/70
                   hover:text-[#FAEBD7] transition-colors duration-200 focus-visible:outline-none
                   focus-visible:ring-2 focus-visible:ring-[#FFC107] rounded-lg
                   bg-black/5 hover:bg-black/10 group"
      >
        <span className="text-sm font-medium">View Profile</span>
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};