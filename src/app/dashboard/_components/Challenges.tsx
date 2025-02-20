import React, { useState } from 'react';
import { Trophy, Clock, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { Challenge } from '@/types/dashboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Win 3 Games',
    reward: 'Golden Trophy',
    progress: 1,
    target: 3,
    type: 'daily',
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)),
    description: 'Win 3 games today to earn a special Golden Trophy for your profile! This challenge tests your dominoes skills and rewards consistent performance.',
  },
  {
    id: '2',
    title: 'Score 450 Points',
    reward: 'Havana Skin',
    progress: 300,
    target: 450,
    type: 'daily',
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 1)),
    description: 'Score a total of 450 points across all your games today to unlock the exclusive Havana table skin. Show off your scoring prowess!',
  },
];

export const Challenges: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const getTimeRemaining = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h`;
  };

  return (
    <div className="bg-black/20 rounded-lg shadow-lg shadow-black/5 border border-white/10 transition-all duration-300 ease-in-out hover:bg-black/25">
      <div className="flex items-center gap-2 p-4">
        <Trophy className="w-4 h-4 text-[#FFC107]" />
        <h2 className="text-lg font-semibold text-[#FAEBD7]">Daily Challenges</h2>
      </div>
      
      <div className="space-y-4 p-4 pt-0">
        {mockChallenges.map((challenge) => (
          <div 
            key={challenge.id} 
            className="bg-black/10 rounded-lg p-3 border border-white/10 hover:bg-[#FFC107]/10 
                     transition-all duration-200 cursor-pointer group"
            onClick={() => setSelectedChallenge(challenge)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#FAEBD7]">{challenge.title}</span>
              <div className="flex items-center gap-1 text-xs text-[#FFC107]">
                <Clock className="w-3 h-3" />
                <span>{getTimeRemaining(challenge.expiresAt)}</span>
              </div>
            </div>
            
            <Progress 
              value={(challenge.progress / challenge.target) * 100}
              className="h-1.5 bg-white/10"
            />
            
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-[#FAEBD7]/70">
                {challenge.progress}/{challenge.target}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#FFC107]">
                  {challenge.reward}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Info className="w-4 h-4 text-[#FAEBD7]/50 hover:text-[#FFC107]" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-[#112240] text-gray-100 px-2 py-1 rounded-lg border border-[#FFC107]/30 shadow-lg shadow-black/20"
                      sideOffset={5}
                    >
                      {challenge.description}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog>
        <DialogContent className="bg-[#112240] border border-[#FFC107]/30 shadow-lg text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-[#F1F1F1] text-xl font-semibold">
              {selectedChallenge?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              {selectedChallenge?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg border border-[#FFC107]/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-100">Progress</span>
                <span className="text-[#FFC107]">
                  {selectedChallenge?.progress}/{selectedChallenge?.target}
                </span>
              </div>
              <Progress 
                value={selectedChallenge ? (selectedChallenge.progress / selectedChallenge.target) * 100 : 0}
                className="h-2 bg-black/30"
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-100">
                <span>Reward: </span>
                <span className="text-[#FFC107]">{selectedChallenge?.reward}</span>
              </div>
              <div className="text-gray-300 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {selectedChallenge ? getTimeRemaining(selectedChallenge.expiresAt) : ''} remaining
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};