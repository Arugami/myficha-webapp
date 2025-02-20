'use client';

import React from 'react';
import { Card } from "@/app/_components/ui/card";
import { GameState, GamePlayer } from '@/types/game/core';

interface GameSidebarProps {
  gameState: GameState;
  currentPlayer: GamePlayer | undefined;
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
    <div className="w-80 h-screen bg-card border-l border-border p-4 space-y-4">
      {/* Game Status */}
      <Card className="p-4">
        <h3 className="text-xl font-bold mb-4">Game Status</h3>
        <div className="space-y-2 text-sm">
          <div>Status: {gameState.status}</div>
          <div>Round: {gameState.round}</div>
          <div>Current Turn: {gameState.players[gameState.currentTurn]?.name || 'Unknown'}</div>
          <div>Team A Score: {gameState.scores.A}</div>
          <div>Team B Score: {gameState.scores.B}</div>
        </div>
      </Card>

      {/* Player Info */}
      <Card className="p-4">
        <h3 className="text-xl font-bold mb-4">Players</h3>
        <div className="space-y-2">
          {gameState.players.map((player) => (
            <div key={player.id} className={`flex justify-between items-center p-2 rounded ${player.id === currentPlayer?.id ? 'bg-primary/10' : ''}`}>
              <span>{player.name}</span>
              <span>Team {player.team}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <Card className="p-4">
        <h3 className="text-xl font-bold mb-4">Actions</h3>
        <div className="space-y-2">
          <button
            className="w-full p-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
            onClick={onPassTurn}
            disabled={isDealing || currentPlayer?.id !== gameState.players[gameState.currentTurn]?.id}
          >
            Pass Turn
          </button>
          <button
            className="w-full p-2 bg-destructive text-destructive-foreground rounded"
            onClick={onLeaveGame}
          >
            Leave Game
          </button>
        </div>
      </Card>
    </div>
  );
}

export { GameSidebar };