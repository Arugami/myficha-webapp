'use client';

import React, { useState } from 'react';
import { Crown, Info, ArrowRight } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/_components/ui/dialog";
import { Progress } from "@/app/_components/ui/progress";
import Link from 'next/link';

interface RankDisplayProps {
  cdsScore: number;
  rank: number;
}

export const RankDisplay: React.FC<RankDisplayProps> = ({ cdsScore, rank }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const getRankTier = (score: number) => {
    if (score >= 2400) return 'Grandmaster';
    if (score >= 2200) return 'Master';
    if (score >= 2000) return 'Diamond';
    if (score >= 1800) return 'Platinum';
    return 'Gold';
  };

  const getNextMilestone = (currentScore: number) => {
    if (currentScore < 1800) return 1800;
    if (currentScore < 2000) return 2000;
    if (currentScore < 2200) return 2200;
    if (currentScore < 2400) return 2400;
    return null;
  };

  const getProgressToNextRank = (currentScore: number) => {
    const nextMilestone = getNextMilestone(currentScore);
    if (!nextMilestone) return 100;
    
    const currentTier = Math.floor(currentScore / 200) * 200;
    const progress = ((currentScore - currentTier) / (nextMilestone - currentTier)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="group flex items-center gap-4 bg-black/20 hover:bg-[#FFC107]/10 transition-all duration-200 p-6 rounded-lg">
      <div className="w-10 h-10 flex items-center justify-center">
        <Crown className="w-8 h-8 text-[#FFC107]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-2xl md:text-3xl font-bold text-[#FFC107] font-inter tracking-tight truncate">
            {getRankTier(cdsScore)}
          </p>
          <button 
            onClick={() => setDialogOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Info className="w-4 h-4 text-white/70 hover:text-[#FFC107] transition-colors" />
          </button>
        </div>
        <p className="text-sm font-normal text-white/70 mt-1">Current Rank</p>
      </div>

      <Dialog>
        <DialogContent className="bg-[#112240] border border-[#FFC107]/30 shadow-lg text-gray-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#F1F1F1] text-xl font-semibold flex items-center gap-2">
              <Crown className="w-6 h-6 text-[#FFC107]" />
              {getRankTier(cdsScore)} Rank
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Your skill tier in Cuban Dominoes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-black/20 p-4 rounded-lg border border-[#FFC107]/10">
              <Progress 
                value={getProgressToNextRank(cdsScore)} 
                className="h-2 mb-2"
              />
              <p className="text-sm text-gray-300 mt-2">
                {getNextMilestone(cdsScore) 
                  ? `${getNextMilestone(cdsScore)! - cdsScore} points until next rank`
                  : "Maximum rank achieved!"}
              </p>
            </div>

            <Link 
              href="/help/ranks"
              className="inline-flex items-center gap-2 text-[#FFC107] hover:text-[#FFC107]/80 transition-colors"
              onClick={() => setDialogOpen(false)}
            >
              Learn more about ranks
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};