'use client';

import React from 'react';

interface DominoTileProps {
  topValue: number;
  bottomValue: number;
  isVertical?: boolean;
  onClick?: () => void;
  isPlayable?: boolean;
}

const DominoTile: React.FC<DominoTileProps> = ({
  topValue,
  bottomValue,
  isVertical = false,
  onClick,
  isPlayable = true
}) => {
  const renderDots = (value: number) => {
    const dots = [];
    const positions = {
      1: ['center'],
      2: ['top-right', 'bottom-left'],
      3: ['top-right', 'center', 'bottom-left'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'center-left', 'center-right', 'bottom-left', 'bottom-right']
    };

    const getPosition = (pos: string) => {
      switch (pos) {
        case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
        case 'top-left': return 'top-[6px] left-[6px]';
        case 'top-right': return 'top-[6px] right-[6px]';
        case 'center-left': return 'top-1/2 left-[6px] -translate-y-1/2';
        case 'center-right': return 'top-1/2 right-[6px] -translate-y-1/2';
        case 'bottom-left': return 'bottom-[6px] left-[6px]';
        case 'bottom-right': return 'bottom-[6px] right-[6px]';
        default: return '';
      }
    };

    (positions[value as keyof typeof positions] || []).forEach((position, index) => {
      dots.push(
        <div
          key={index}
          className={`absolute w-3.5 h-3.5 rounded-full bg-black pointer-events-none ${getPosition(position)}`}
          style={{
            boxShadow: 'inset -1px -1px 2px rgba(255,255,255,0.3), inset 1px 1px 3px rgba(0,0,0,0.7)',
            background: 'radial-gradient(circle at 35% 35%, #000000 0%, #333333 100%)'
          }}
        />
      );
    });

    return dots;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayable && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`
        relative cursor-pointer transform transition-all duration-200 ease-in-out overflow-hidden select-none
        ${isVertical ? 'h-32 w-16' : 'w-32 h-16'}
        ${isPlayable ? 'hover:scale-105 hover:-translate-y-1 hover:rotate-1' : 'opacity-50 cursor-not-allowed'}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
        group rounded-lg
      `}
      onClick={handleClick}
    >
      {/* Domino tile background with enhanced 3D effect */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          background: 'linear-gradient(145deg, #ffffff 0%, #e8e8e8 100%)',
          boxShadow: '3px 3px 10px rgba(0,0,0,0.3), -1px -1px 5px rgba(255,255,255,0.8), inset 0 0 2px rgba(255,255,255,0.5)'
        }}
      >
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/5"></div>
      </div>

      {/* Enhanced divider line */}
      <div 
        className={`absolute pointer-events-none ${
          isVertical ? 'h-[2px] w-full top-1/2 -translate-y-px' : 'w-[2px] h-full left-1/2 -translate-x-px'
        }`}
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.2), rgba(0,0,0,0.1))',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
        }}
      ></div>

      {/* Top/Left value section */}
      <div className={`absolute overflow-hidden pointer-events-none ${
        isVertical ? 'top-0 h-[calc(50%-1px)] w-full' : 'left-0 w-[calc(50%-1px)] h-full'
      }`}>
        {renderDots(topValue)}
      </div>

      {/* Bottom/Right value section */}
      <div className={`absolute overflow-hidden pointer-events-none ${
        isVertical ? 'bottom-0 h-[calc(50%-1px)] w-full' : 'right-0 w-[calc(50%-1px)] h-full'
      }`}>
        {renderDots(bottomValue)}
      </div>

      {/* Enhanced hover effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none overflow-hidden"
        style={{
          background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
          boxShadow: 'inset 0 0 15px rgba(255,255,255,0.5)'
        }}
      ></div>
    </div>
  );
};

export default DominoTile; 