import { v4 as uuidv4 } from 'uuid';
import { GameState, GameMode, GamePlayer, Team, DominoTile } from '@/types/game/core';

// Generate all possible tiles for a double-nine set
export const generateDominoSet = (): DominoTile[] => {
  const tiles: DominoTile[] = [];
  
  // In double-nine set, numbers go from 0 to 9
  for (let i = 0; i <= 9; i++) {
    for (let j = i; j <= 9; j++) {
      tiles.push({
        id: uuidv4(),
        top: i,
        bottom: j,
        isDouble: i === j
      });
    }
  }
  
  return tiles;
};

// Fisher-Yates shuffle algorithm
export const shuffleTiles = (tiles: DominoTile[]): DominoTile[] => {
  const shuffled = [...tiles];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Check if a hand has 5 or more doubles
export const shouldReshuffle = (hand: DominoTile[]): boolean => {
  return hand.filter(tile => tile.isDouble).length >= 5;
};

// Distribute tiles to players
export const distributeTiles = (
  shuffledTiles: DominoTile[],
  players: GamePlayer[]
): { playerHands: Record<string, DominoTile[]>; remainingTiles: DominoTile[] } => {
  const playerHands: Record<string, DominoTile[]> = {};
  let currentIndex = 0;

  // Each player gets 10 tiles
  players.forEach(player => {
    playerHands[player.id] = shuffledTiles.slice(currentIndex, currentIndex + 10);
    currentIndex += 10;
  });

  // Return remaining tiles
  return {
    playerHands,
    remainingTiles: shuffledTiles.slice(currentIndex)
  };
};

// Initialize a new game
export const initializeGame = (
  mode: GameMode,
  players: GamePlayer[],
  teams?: [Team, Team]
): GameState => {
  // Generate a unique game ID
  const id = uuidv4();

  // Generate and shuffle tiles
  const tiles = generateDominoSet();
  const shuffledTiles = shuffleTiles(tiles);
   
  // Distribute tiles and check for reshuffle
  let distribution = distributeTiles(shuffledTiles, players);
   
  // Check if any player has 5+ doubles and reshuffle if needed
  let needsReshuffle = false;
  Object.values(distribution.playerHands).forEach(hand => {
    if (shouldReshuffle(hand)) {
      needsReshuffle = true;
    }
  });

  if (needsReshuffle) {
    const reshuffledTiles = shuffleTiles(tiles);
    distribution = distributeTiles(reshuffledTiles, players);
  }

  // Update player hands
  players.forEach(player => {
    player.hand = distribution.playerHands[player.id];
  });

  // Determine starting player
  const { playerId: startingPlayerId, drawnTiles } = determineStartingPlayer(
    players,
    distribution.remainingTiles
  );

  // Initialize the game state
  return {
    id,
    mode,
    status: 'starting',
    players,
    teams,
    currentTurn: startingPlayerId,
    roundStartPlayer: startingPlayerId,
    remainingTiles: distribution.remainingTiles,
    playedTiles: [], // Initialize empty array for played tiles
    board: [],
    scores: { A: 0, B: 0 },
    round: 1,
    lastAction: {
      type: 'starting',
      playerId: startingPlayerId,
      drawnTiles,
      timestamp: Date.now()
    }
  };
};

// Determine starting player by highest tile draw
export const determineStartingPlayer = (
  players: GamePlayer[],
  remainingTiles: DominoTile[]
): { playerId: string; drawnTiles: Record<string, DominoTile> } => {
  const shuffled = shuffleTiles(remainingTiles);
  const drawnTiles: Record<string, DominoTile> = {};
  let highestSum = -1;
  let startingPlayerId = players[0].id;

  players.forEach((player, index) => {
    const drawnTile = shuffled[index];
    drawnTiles[player.id] = drawnTile;
    const sum = drawnTile.top + drawnTile.bottom;
    
    if (sum > highestSum) {
      highestSum = sum;
      startingPlayerId = player.id;
    }
  });

  return {
    playerId: startingPlayerId,
    drawnTiles
  };
}; 