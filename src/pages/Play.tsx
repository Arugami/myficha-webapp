'use client';

import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import GameBoard from '@/components/Game/GameBoard';
import PlayerHand from '@/components/Game/PlayerHand';
import GameSidebar from '@/components/Game/GameSidebar';
import { useGameState } from '@/hooks/useGameState';
import { Player, PlayerPosition, DominoTile as DominoTileType, Position } from '@/types/game';

const Play = () => {
  const { gameState, startNewGame, playTile } = useGameState();
  const [dealtTiles, setDealtTiles] = useState<DominoTileType[]>([]);
  const [isDealing, setIsDealing] = useState(false);

  useEffect(() => {
    // Create mock players for testing
    const testPlayers: Player[] = [
      { id: 'p1', name: 'You', position: 'south' as PlayerPosition, hand: [] },
      { id: 'p2', name: 'Player 2', position: 'north' as PlayerPosition, hand: [] },
      { id: 'p3', name: 'Player 3', position: 'east' as PlayerPosition, hand: [] },
      { id: 'p4', name: 'Player 4', position: 'west' as PlayerPosition, hand: [] },
    ];

    // Initialize a new 2v2 game
    startNewGame('2v2', testPlayers, [
      { id: 't1', name: 'Team 1', players: [testPlayers[0], testPlayers[2]] as [Player, Player], score: 0 },
      { id: 't2', name: 'Team 2', players: [testPlayers[1], testPlayers[3]] as [Player, Player], score: 0 },
    ]);
  }, [startNewGame]);

  // Handle the dealing animation when gameState changes
  useEffect(() => {
    if (gameState && gameState.status === 'starting') {
      const currentPlayer = gameState.players.find(p => p.position === 'south');
      if (currentPlayer && currentPlayer.hand.length > 0) {
        console.log('Current player:', currentPlayer);
        console.log('Game state:', gameState);
        setDealtTiles([]); // Clear existing tiles
        setIsDealing(true);
        
        // Deal tiles one by one with a delay
        currentPlayer.hand.slice(0, 10).forEach((tile, index) => {
          setTimeout(() => {
            setDealtTiles(tiles => {
              const newTiles = tiles.slice(0, index).concat(tile);
              return newTiles;
            });
            // If this is the last tile, end the dealing animation
            if (index === 9) {
              setTimeout(() => {
                setIsDealing(false);
                // Set the current player's turn after dealing
                if (gameState.currentTurn !== currentPlayer.id) {
                  // TODO: Update this through useGameState hook
                  gameState.currentTurn = currentPlayer.id;
                }
              }, 300);
            }
          }, index * 150);
        });
      }
    }
  }, [gameState]);

  if (!gameState) {
    return <div>Loading game...</div>;
  }

  // Find the current player (player with position 'south')
  const currentPlayer = gameState.players.find(p => p.position === 'south');

  // Calculate valid moves for a tile
  const calculateValidMoves = (tile: DominoTileType): Position[] => {
    if (gameState.playedTiles.length === 0) {
      // For the first tile, allow both horizontal and vertical placement in the center
      return [
        { x: 0, y: 0, rotation: 0 },   // Horizontal
        { x: 0, y: 0, rotation: 90 },  // Vertical
        { x: 0, y: 0, rotation: 180 }, // Horizontal flipped
        { x: 0, y: 0, rotation: 270 }  // Vertical flipped
      ];
    }

    // For subsequent tiles, use the last played tile
    const lastTile = gameState.playedTiles[gameState.playedTiles.length - 1] as (DominoTileType & { position: Position });
    const possibleMoves: Position[] = [];

    // Add positions around the last played tile
    if (lastTile.position.rotation === 0 || lastTile.position.rotation === 180) {
      // Add positions to the left and right
      possibleMoves.push(
        { x: lastTile.position.x - 3, y: lastTile.position.y, rotation: 0 },
        { x: lastTile.position.x + 3, y: lastTile.position.y, rotation: 0 },
        { x: lastTile.position.x - 3, y: lastTile.position.y, rotation: 180 },
        { x: lastTile.position.x + 3, y: lastTile.position.y, rotation: 180 }
      );
    } else {
      // Add positions above and below
      possibleMoves.push(
        { x: lastTile.position.x, y: lastTile.position.y - 3, rotation: 90 },
        { x: lastTile.position.x, y: lastTile.position.y + 3, rotation: 90 },
        { x: lastTile.position.x, y: lastTile.position.y - 3, rotation: 270 },
        { x: lastTile.position.x, y: lastTile.position.y + 3, rotation: 270 }
      );
    }

    return possibleMoves;
  };

  // Handle tile placement
  const handleTilePlacement = (tile: DominoTileType, position: Position) => {
    // Check if it's the player's turn and the game is in playing state
    if (
      !gameState || 
      !currentPlayer || 
      gameState.currentTurn !== currentPlayer.id ||
      (gameState.status !== 'starting' && gameState.status !== 'playing')
    ) {
      return;
    }

    // Update the game state with the played tile
    playTile(currentPlayer.id, tile, position);

    // Clear local UI state
    setDealtTiles(prev => prev.filter(t => t.id !== tile.id));
  };

  // Handle tile selection and automatic placement
  const handleTileSelect = (tile: DominoTileType) => {
    console.log('Tile selected:', tile);
    console.log('Current game state:', gameState);
    console.log('Current player:', currentPlayer);

    if (
      !gameState || 
      !currentPlayer || 
      gameState.currentTurn !== currentPlayer.id ||
      (gameState.status !== 'starting' && gameState.status !== 'playing')
    ) {
      console.log('Cannot play tile - invalid state');
      return;
    }

    // Calculate where to place the tile
    const position = calculateTilePlacement(tile);
    console.log('Calculated position:', position);

    if (position) {
      console.log('Playing tile at position:', position);
      // Automatically place the tile
      playTile(currentPlayer.id, tile, position);
      // Update local state
      setDealtTiles(prev => prev.filter(t => t.id !== tile.id));
    }
  };

  // Calculate where to place the tile automatically
  const calculateTilePlacement = (tile: DominoTileType): Position | null => {
    if (gameState.playedTiles.length === 0) {
      // First tile goes in the center
      return { x: 0, y: 0, rotation: 0 };
    }

    // For subsequent tiles, place next to the last played tile
    const lastTile = gameState.playedTiles[gameState.playedTiles.length - 1] as (DominoTileType & { position: Position });
    
    // If last tile was horizontal, place vertically
    if (lastTile.position.rotation === 0 || lastTile.position.rotation === 180) {
      return { x: lastTile.position.x, y: lastTile.position.y + 3, rotation: 90 };
    } else {
      // If last tile was vertical, place horizontally
      return { x: lastTile.position.x + 3, y: lastTile.position.y, rotation: 0 };
    }
  };

  // Handle pass turn
  const handlePassTurn = () => {
    // TODO: Implement pass turn logic
  };

  // Handle leave game
  const handleLeaveGame = () => {
    // TODO: Implement leave game logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Game Board Section */}
        <div className="lg:col-span-9">
          <Card className="p-6 bg-[#2A4B3C] shadow-xl rounded-xl min-h-[600px]">
            <GameBoard
              playedTiles={(gameState.playedTiles || []) as (DominoTileType & { position: Position })[]}
              onTilePlaced={() => {}} // No need for this anymore
              validMoves={[]}
              selectedTile={null}
              isCurrentPlayerTurn={gameState.currentTurn === currentPlayer?.id && !isDealing}
            />
          </Card>
        </div>

        {/* Sidebar */}
        <GameSidebar
          gameState={gameState}
          currentPlayer={currentPlayer}
          isDealing={isDealing}
          onPassTurn={handlePassTurn}
          onLeaveGame={handleLeaveGame}
        />
      </div>

      {/* Player's Hand */}
      <PlayerHand
        tiles={dealtTiles}
        isDealing={isDealing}
        isCurrentTurn={gameState.currentTurn === currentPlayer?.id}
        onTileSelect={handleTileSelect}
      />
    </div>
  );
};

export default Play; 