'use client';

import React from 'react';

interface CircularProgressProps {
  value: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ value }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value * circumference);
  
  return (
    <div className="relative w-20 h-20">
      <svg className="transform -rotate-90 w-20 h-20">
        <circle
          className="text-black/10"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className="text-[#FFC107] transition-all duration-1000 ease-out"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[#FAEBD7] text-lg font-bold">
          {Math.round(value * 100)}%
        </span>
      </div>
    </div>
  );
};