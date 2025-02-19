'use client';

import { useState, useCallback } from 'react';
import { GameState, GameMode, Player, Team, DominoTile, Position, GameActionType } from '@/types/game';
import { initializeGame } from '@/lib/game/initialization';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const startNewGame = useCallback((
    mode: GameMode,
    players: Player[],
    teams?: [Team, Team]
  ) => {
    // Initialize the game
    const initialState = initializeGame(mode, players, teams);
    console.log('Initial game state:', initialState);
    setGameState(initialState);
    return initialState;
  }, []);

  const resetGame = useCallback(() => {
    setGameState(null);
  }, []);

  // Add updateGameState function
  const updateGameState = (newState: Partial<GameState>) => {
    if (!gameState) return;
    
    setGameState({
      ...gameState,
      ...newState
    });
  };

  // Update playTile function to handle the state update correctly
  const playTile = (playerId: string, tile: DominoTile, position: Position) => {
    if (!gameState) return;

    console.log('Playing tile:', tile);
    console.log('At position:', position);
    console.log('Current game state:', gameState);

    setGameState(prevState => {
      if (!prevState) return null;

      // Create a copy of the players array with the updated hand
      const updatedPlayers = prevState.players.map(player => {
        if (player.id === playerId) {
          return {
            ...player,
            hand: player.hand.filter(t => t.id !== tile.id)
          };
        }
        return player;
      });

      // Find the next player's turn
      const nextTurnIndex = (prevState.players.findIndex(p => p.id === playerId) + 1) % prevState.players.length;
      const nextPlayerId = prevState.players[nextTurnIndex].id;

      // Create the placed tile with position
      const placedTile = {
        ...tile,
        position
      };

      // Ensure playedTiles is initialized
      const currentPlayedTiles = prevState.playedTiles || [];
      console.log('Current played tiles:', currentPlayedTiles);
      console.log('Adding new tile:', placedTile);

      // Create the new state
      const newState = {
        ...prevState,
        players: updatedPlayers,
        currentTurn: nextPlayerId,
        status: prevState.status === 'starting' ? 'playing' : prevState.status,
        playedTiles: [...currentPlayedTiles, placedTile],
        lastAction: {
          type: 'play' as GameActionType,
          playerId,
          tile: placedTile,
          timestamp: Date.now()
        }
      };

      console.log('New game state:', newState);
      return newState;
    });
  };

  return {
    gameState,
    startNewGame,
    resetGame,
    updateGameState,
    playTile
  };
};

export default useGameState; 