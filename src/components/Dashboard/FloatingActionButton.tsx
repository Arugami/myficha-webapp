'use client';

import React from 'react';
import { Play } from 'lucide-react';
import Link from 'next/link';

export const FloatingActionButton: React.FC = () => {
  return (
    <Link
      href="/play"
      className="fixed md:bottom-8 md:right-8 bottom-20 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0
                 bg-[#FFC107] text-black p-4 rounded-full shadow-lg hover:scale-110 
                 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 
                 focus-visible:ring-[#FFC107] focus-visible:ring-offset-2 z-50
                 flex items-center gap-2 md:w-auto w-48 justify-center"
      aria-label="Start Quick Play"
    >
      <Play className="w-6 h-6" />
      <span className="md:hidden">Quick Play</span>
    </Link>
  );
};