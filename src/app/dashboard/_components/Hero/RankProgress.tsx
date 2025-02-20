import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { Progress } from '@/app/_components/ui/progress';

interface RankProgressProps {
  cdsScore: number;
}

export const RankProgress: React.FC<RankProgressProps> = ({ cdsScore }) => {
  const getNextMilestone = (currentScore: number) => {
    if (currentScore < 1800) return 1800;
    if (currentScore < 2000) return 2000;
    if (currentScore < 2200) return 2200;
    if (currentScore < 2400) return 2400;
    return null;
  };

  const getRankTier = (score: number) => {
    if (score >= 2400) return 'Grandmaster';
    if (score >= 2200) return 'Master';
    if (score >= 2000) return 'Diamond';
    if (score >= 1800) return 'Platinum';
    return 'Gold';
  };

  const calculateProgress = (current: number, nextMilestone: number | null) => {
    if (!nextMilestone) return 100;
    const currentTier = current < 1800 ? 1600 : 
                       current < 2000 ? 1800 : 
                       current < 2200 ? 2000 : 
                       current < 2400 ? 2200 : 
                       2400;
    
    return Math.min(((current - currentTier) / (nextMilestone - currentTier)) * 100, 100);
  };

  const nextMilestone = getNextMilestone(cdsScore);
  const progressPercentage = calculateProgress(cdsScore, nextMilestone);

  if (!nextMilestone) return null;

  return (
    <div className="group bg-black/20 hover:bg-[#FFC107]/10 transition-all duration-200 p-4 md:p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white/90">
            Progress to {getRankTier(nextMilestone)}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-opacity">
                  <Info className="w-4 h-4 text-[#FFC107] hover:text-[#FFC107]/80" />
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="bg-[#112240] text-gray-100 px-2 py-1 rounded-lg border border-[#FFC107]/30 shadow-lg shadow-black/20"
                sideOffset={5}
              >
                Track your progress towards the next rank tier
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span className="text-sm font-medium text-[#FFC107]">
          {nextMilestone - cdsScore} points needed
        </span>
      </div>
      <Progress 
        value={progressPercentage} 
        className="h-2 bg-white/20"
        indicatorColor="bg-[#FFC107]"
      />
      <p className="text-xs font-normal text-white/60 mt-2">
        {cdsScore} / {nextMilestone} points
      </p>
    </div>
  );
};