'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { GameState, Player, Team } from '@/types/game';

interface GameSidebarProps {
  gameState: GameState;
  currentPlayer: Player | undefined;
  isDealing: boolean;
  onPassTurn: () => void;
  onLeaveGame: () => void;
}

const GameSidebar: React.FC<GameSidebarProps> = ({
  gameState,
  currentPlayer,
  isDealing,
  onPassTurn,
  onLeaveGame,
}) => {
  return (
    <div className="lg:col-span-3 space-y-4 relative" style={{ zIndex: 0 }}>
      {/* Game Status */}
      <Card className="p-4 bg-[#1E3A2E] text-white">
        <h3 className="text-xl font-bold mb-4">Game Status</h3>
        <div className="space-y-2 text-sm">
          <div>Mode: {gameState.mode}</div>
          <div>Status: {gameState.status}</div>
          <div>Round: {gameState.roundNumber}</div>
          <div>Current Turn: {
            gameState.players.find(p => p.id === gameState.currentTurn)?.name
          }</div>
        </div>
      </Card>

      {/* Scoreboard */}
      <Card className="p-4 bg-[#1E3A2E] text-white">
        <h3 className="text-xl font-bold mb-4">Scoreboard</h3>
        <div className="space-y-2">
          {gameState.teams?.map(team => (
            <div key={team.id} className="flex justify-between">
              <span>{team.name}</span>
              <span>{team.score}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Game Controls */}
      <Card className="p-4 bg-[#1E3A2E] text-white">
        <h3 className="text-xl font-bold mb-4">Controls</h3>
        <div className="space-y-2">
          <button 
            className="w-full bg-[#4A6D5C] hover:bg-[#5B7E6D] py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={gameState.currentTurn !== currentPlayer?.id || isDealing}
            onClick={onPassTurn}
          >
            Pass Turn
          </button>
          <button 
            className="w-full bg-[#8B4513] hover:bg-[#9C5624] py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isDealing}
            onClick={onLeaveGame}
          >
            Leave Game
          </button>
        </div>
      </Card>

      {/* Debug Info */}
      <Card className="p-4 bg-[#1E3A2E] text-white">
        <h3 className="text-xl font-bold mb-4">Debug Info</h3>
        <div className="space-y-2 text-xs">
          <div>Remaining Tiles: {gameState.remainingTiles.length}</div>
          <div>Played Tiles: {gameState.playedTiles.length}</div>
          <div>Your Hand Size: {currentPlayer?.hand.length || 0}</div>
          <div>Dealing: {isDealing ? 'Yes' : 'No'}</div>
        </div>
      </Card>
    </div>
  );
};

export { GameSidebar }; 