'use client';

import React, { useState } from 'react';
import { Trophy, Info, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';

interface CDSScoreDisplayProps {
  score: number;
}

export const CDSScoreDisplay: React.FC<CDSScoreDisplayProps> = ({ score }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const getScoreProgress = () => {
    const currentTier = Math.floor(score / 200) * 200;
    const nextTier = currentTier + 200;
    const progress = ((score - currentTier) / (nextTier - currentTier)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="group flex items-center gap-4 bg-black/20 hover:bg-[#FFC107]/10 transition-all duration-200 p-6 rounded-lg">
      <div className="w-10 h-10 flex items-center justify-center">
        <Trophy className="w-8 h-8 text-[#FFC107]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-2xl md:text-3xl font-bold text-[#FFC107] font-inter tracking-tight truncate">
            {score}
          </p>
          <button 
            onClick={() => setDialogOpen(true)}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Info className="w-4 h-4 text-white/70 hover:text-[#FFC107] transition-colors" />
          </button>
        </div>
        <p className="text-sm font-normal text-white/70 mt-1">CDS Score</p>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#112240] border border-[#FFC107]/30 shadow-lg text-gray-100 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#F1F1F1] text-xl font-semibold flex items-center gap-2">
              <Trophy className="w-6 h-6 text-[#FFC107]" />
              Cuban Domino Score (CDS)
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Your skill rating based on game performance
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-black/20 p-4 rounded-lg border border-[#FFC107]/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-100">Current Score</span>
                <span className="text-[#FFC107] font-bold">{score} points</span>
              </div>
              <Progress 
                value={getScoreProgress()}
                className="h-2 mb-2 bg-[#FFC107]/20"
              />
              <p className="text-sm text-gray-300 mt-2">
                {200 - (score % 200)} points until next milestone
              </p>
            </div>

            <Link 
              to="/help/cds-score"
              className="inline-flex items-center gap-2 text-[#FFC107] hover:text-[#FFC107]/80 transition-colors mt-4"
              onClick={() => setDialogOpen(false)}
            >
              Learn more about CDS Score
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};