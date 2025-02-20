'use client';

import React from 'react';
import { DominoTile as DominoTileType, Position, PlacedTile } from '@/types/game/core';
import DominoTile from './DominoTile';

interface GameBoardProps {}

const GameBoard: React.FC<GameBoardProps> = () => {
  const [tiles] = React.useState<PlacedTile[]>([]);
  const [selectedTile] = React.useState<DominoTileType | null>(null);
  const [validMoves] = React.useState<Position[]>([]);
  const isCurrentPlayerTurn = true; // TODO: Get from game state

  console.log('Rendering GameBoard with tiles:', tiles);

  // TODO: Connect to game state to get actual board state
  const handleTilePlacement = (position: Position) => {
    console.log('Tile placed at position:', position);
  };


  // Calculate position styles for a tile or highlight
  const getPositionStyles = (position: Position, isHighlight: boolean = false): React.CSSProperties => {
    const tileWidth = 128; // Width of a horizontal domino
    const tileHeight = 64; // Height of a horizontal domino
    const isVertical = position.rotation === 90 || position.rotation === 270;
    
    // For highlights, we want them slightly larger
    const width = isVertical ? tileHeight : tileWidth;
    const height = isVertical ? tileWidth : tileHeight;
    const padding = isHighlight ? 4 : 0;

    return {
      position: 'absolute',
      left: `${position.x - (width / 2) - padding}px`,
      top: `${position.y - (height / 2) - padding}px`,
      width: `${width + (padding * 2)}px`,
      height: `${height + (padding * 2)}px`,
      transform: `rotate(${position.rotation}deg)`,
      transformOrigin: 'center'
    };
  };

  console.log('Rendering GameBoard with tiles:', tiles);

  return (
    <div className="absolute inset-0 bg-[#2A4B3C] rounded-lg overflow-hidden">
      {/* Cuban-themed background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/patterns/havana.svg')]"></div>
      
      {/* Game board grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: '800px', height: '600px' }}>
          <div className="absolute inset-0">
        {/* Highlight valid move positions */}
        {selectedTile && isCurrentPlayerTurn && validMoves.map((position, index) => (
          <div
            key={`highlight-${index}`}
            className="absolute bg-yellow-300/20 border-2 border-yellow-400/50 rounded transition-all duration-300 hover:bg-yellow-300/40 cursor-pointer"
            style={getPositionStyles(position, true)}
            onClick={() => handleTilePlacement(position)}
          />
        ))}

        {/* Render placed tiles */}
        {tiles.map((tile) => {
          console.log('Rendering tile:', tile);
          const isVertical = tile.position.rotation === 90 || tile.position.rotation === 270;
          return (
            <div
              key={`tile-${tile.tile.id}`}
              className="absolute transition-all duration-300"
              style={getPositionStyles(tile.position)}
            >
              <DominoTile
                topValue={tile.tile.top}
                bottomValue={tile.tile.bottom}
                isVertical={isVertical}
                isPlayable={false}
              />
            </div>
          );
        })}

        {/* Center position indicator (only show if no tiles placed) */}
        {tiles.length === 0 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-white/20 rounded border-2 border-dashed border-white/30">
            <div className="w-full h-full flex items-center justify-center text-white/50">
              Start
            </div>
          </div>
        )}
          </div>
        </div>
      </div>

      {/* Player indicators */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-bold">
        Player 2
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold">
        Player 1
      </div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold transform -rotate-90">
        Player 4
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-bold transform rotate-90">
        Player 3
      </div>
    </div>
  );
};

export { GameBoard }; 