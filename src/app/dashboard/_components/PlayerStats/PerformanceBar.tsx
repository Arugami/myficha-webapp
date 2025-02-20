import React from 'react';

interface PerformanceBarProps {
  performances: number[];
}

export const PerformanceBar: React.FC<PerformanceBarProps> = ({ performances }) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-[#FAEBD7]/60 font-inter">Recent Performance</span>
        <span className="text-[#FAEBD7] font-inter">Last 5 matches</span>
      </div>
      <div className="flex gap-2">
        {performances.map((value, index) => (
          <div
            key={index}
            className="flex-1 h-2 bg-black/20 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-[#FF6B6B] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${value}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};