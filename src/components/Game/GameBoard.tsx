'use client';

import React from 'react';
import { DominoTile as DominoTileType, Position } from '@/types/game';
import DominoTile from './DominoTile';

interface PlacedTile extends DominoTileType {
  position: Position;
}

interface GameBoardProps {
  playedTiles: PlacedTile[];
  onTilePlaced?: (tile: DominoTileType, position: Position) => void;
  validMoves?: Position[];
  selectedTile?: DominoTileType | null;
  isCurrentPlayerTurn?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  playedTiles = [],
  onTilePlaced,
  validMoves = [],
  selectedTile,
  isCurrentPlayerTurn = false
}) => {
  // Handle tile placement
  const handleTilePlacement = (position: Position) => {
    if (!onTilePlaced || !selectedTile || !isCurrentPlayerTurn) return;
    onTilePlaced(selectedTile, position);
  };

  // Calculate position styles for a tile or highlight
  const getPositionStyles = (position: Position, isHighlight: boolean = false) => {
    const tileWidth = 128; // Width of a horizontal domino
    const tileHeight = 64; // Height of a horizontal domino
    const isVertical = position.rotation === 90 || position.rotation === 270;
    
    // Calculate the center offset based on tile dimensions
    const centerX = position.x * (tileWidth / 2);
    const centerY = position.y * (tileHeight / 2);

    // For highlights, we want them slightly larger
    const width = isHighlight 
      ? (isVertical ? tileHeight + 8 : tileWidth + 8)
      : (isVertical ? tileHeight : tileWidth);
    const height = isHighlight
      ? (isVertical ? tileWidth + 8 : tileHeight + 8)
      : (isVertical ? tileWidth : tileHeight);

    return {
      left: `calc(50% + ${centerX - (width / 2)}px)`,
      top: `calc(50% + ${centerY - (height / 2)}px)`,
      width: `${width}px`,
      height: `${height}px`,
      transform: `rotate(${position.rotation}deg)`,
      transformOrigin: 'center'
    };
  };

  console.log('Rendering GameBoard with tiles:', playedTiles);

  return (
    <div className="relative w-full h-full bg-[#2A4B3C] rounded-lg overflow-hidden">
      {/* Cuban-themed background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/patterns/havana.svg')]"></div>
      
      {/* Game board grid */}
      <div className="relative w-full h-full min-h-[600px]">
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
        {playedTiles.map((tile) => {
          console.log('Rendering tile:', tile);
          const isVertical = tile.position.rotation === 90 || tile.position.rotation === 270;
          return (
            <div
              key={`tile-${tile.id}`}
              className="absolute transition-all duration-300"
              style={getPositionStyles(tile.position)}
            >
              <DominoTile
                topValue={tile.top}
                bottomValue={tile.bottom}
                isVertical={isVertical}
                isPlayable={false}
              />
            </div>
          );
        })}

        {/* Center position indicator (only show if no tiles placed) */}
        {playedTiles.length === 0 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-white/20 rounded border-2 border-dashed border-white/30">
            <div className="w-full h-full flex items-center justify-center text-white/50">
              Start
            </div>
          </div>
        )}
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

export default GameBoard; 