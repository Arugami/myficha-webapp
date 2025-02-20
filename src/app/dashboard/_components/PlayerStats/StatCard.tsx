'use client';

import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  subValue?: string;
  tooltip?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  label, 
  value, 
  subValue,
  tooltip = "More information coming soon..." 
}) => (
  <div className="p-6 rounded-lg bg-black/10 hover:bg-[#FFC107]/10 transition-all duration-200 group">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <span className="text-[#FAEBD7]/60 font-inter text-sm">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Info className="w-4 h-4 text-[#FFC107] hover:text-[#FFC107]/80" />
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="bg-[#112240] border border-[#FFC107]/30 text-gray-100 px-4 py-2 rounded-lg whitespace-pre-line shadow-lg backdrop-blur-sm"
              sideOffset={5}
            >
              <p className="text-sm font-medium">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {subValue && (
        <span className="text-[#FFC107] text-sm font-inter">{subValue}</span>
      )}
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);