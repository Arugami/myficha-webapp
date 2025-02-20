'use client';

import React, { useState } from 'react';
import { Percent, Info, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from 'next/link';

interface WinRatioDisplayProps {
  winRate: number;
  totalMatches: number;
}

export const WinRatioDisplay: React.FC<WinRatioDisplayProps> = ({ winRate, totalMatches }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="group flex items-center gap-4 bg-black/20 hover:bg-[#FFC107]/10 transition-all duration-200 p-6 rounded-lg">
      <div className="w-10 h-10 flex items-center justify-center">
        <Percent className="w-8 h-8 text-[#FFC107]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-2xl md:text-3xl font-bold text-[#FFC107] font-inter tracking-tight truncate">
            {(winRate * 100).toFixed(1)}%
          </p>
          <button 
            onClick={() => setDialogOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Info className="w-4 h-4 text-white/70 hover:text-[#FFC107] transition-colors" />
          </button>
        </div>
        <p className="text-sm font-normal text-white/70 mt-1">Win Rate</p>
      </div>

      <Dialog>
        <DialogContent className="bg-[#112240] border border-[#FFC107]/30 shadow-lg text-gray-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#F1F1F1] text-xl font-semibold flex items-center gap-2">
              <Percent className="w-6 h-6 text-[#FFC107]" />
              Win Rate Statistics
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Your game performance overview
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-black/20 p-4 rounded-lg border border-[#FFC107]/10">
              <p className="text-sm text-gray-300">
                You've won {Math.round(totalMatches * winRate)} out of {totalMatches} games
              </p>
            </div>

            <Link 
              href="/help/statistics"
              className="inline-flex items-center gap-2 text-[#FFC107] hover:text-[#FFC107]/80 transition-colors"
              onClick={() => setDialogOpen(false)}
            >
              Learn more about statistics
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};