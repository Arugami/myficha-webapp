'use client';

import React from 'react';
import { Play, Users } from 'lucide-react';
import Link from 'next/link';

export const QuickActionBar: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 mx-8">
      <Link
        href="/play"
        className="flex items-center justify-center gap-2 h-14 px-8 bg-[#FFC107] text-black font-semibold rounded-lg 
                   hover:scale-105 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 
                   focus-visible:ring-[#FFC107]"
        aria-label="Start Quick Play"
      >
        <Play className="w-5 h-5" />
        <span>Quick Play</span>
      </Link>
      
      <Link
        href="/play/private"
        className="flex items-center justify-center gap-2 h-14 px-8 border-2 border-[#FFC107] text-[#FAEBD7] 
                   font-semibold rounded-lg hover:bg-[#FFC107] hover:text-black transition-colors duration-200 
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]"
        aria-label="Create Private Match"
      >
        <Users className="w-5 h-5" />
        <span>Create Private Match</span>
      </Link>
    </div>
  );
};