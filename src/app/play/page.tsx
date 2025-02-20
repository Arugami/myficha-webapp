'use client';

import { useState } from 'react';
import { GameBoard } from './_components/GameBoard';
import { GameSidebar } from './_components/GameSidebar';
import { PlayerHand } from './_components/PlayerHand';
import { GameState } from '@/types/game/core';

export default function PlayPage() {
  const [isDealing] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    id: 'test-game',
    mode: 'classic',
    roundStartPlayer: '1',
    players: [
      { id: '1', name: 'Player 1', team: 'A', score: 0, hand: [] },
      { id: '2', name: 'Player 2', team: 'B', score: 0, hand: [] },
      { id: '3', name: 'Player 3', team: 'A', score: 0, hand: [] },
      { id: '4', name: 'Player 4', team: 'B', score: 0, hand: [] },
    ],
    currentTurn: '1',
    status: 'playing',
    board: [],
    scores: { A: 0, B: 0 },
    round: 1,
    remainingTiles: [],
    playedTiles: []
  });

  const currentPlayer = gameState.players[gameState.currentTurn];

  const handlePassTurn = () => {
    setGameState(prev => ({
      ...prev,
      currentTurn: prev.players[(prev.players.findIndex(p => p.id === prev.currentTurn) + 1) % prev.players.length].id
    }));
  };

  const handleLeaveGame = () => {
    // TODO: Implement leave game logic
    console.log('Leaving game...');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div className="flex-1 p-4 overflow-hidden">
        <div className="grid grid-rows-[1fr,auto] h-full gap-4 overflow-hidden">
          <div className="relative w-full h-full min-h-0 overflow-hidden">
            <GameBoard />
          </div>
          <PlayerHand playerId={currentPlayer.id} />
        </div>
      </div>
      <GameSidebar 
        gameState={gameState}
        currentPlayer={currentPlayer}
        isDealing={isDealing}
        onPassTurn={handlePassTurn}
        onLeaveGame={handleLeaveGame}
      />
    </div>
  );
}
