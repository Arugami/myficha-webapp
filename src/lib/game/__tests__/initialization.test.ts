import { describe, it, expect, beforeEach } from 'vitest';
import { 
  generateDominoSet, 
  shuffleTiles, 
  shouldReshuffle, 
  distributeTiles,
  initializeGame,
  determineStartingPlayer
} from '../initialization';
import { DominoTile, Player, Team } from '@/types/game/core/core';

describe('Game Initialization', () => {
  describe('generateDominoSet', () => {
    let dominoSet: DominoTile[];

    beforeEach(() => {
      dominoSet = generateDominoSet();
    });

    it('should generate exactly 55 tiles for double-nine set', () => {
      expect(dominoSet).toHaveLength(55);
    });

    it('should generate tiles with values from 0 to 9', () => {
      dominoSet.forEach(tile => {
        expect(tile.top).toBeGreaterThanOrEqual(0);
        expect(tile.top).toBeLessThanOrEqual(9);
        expect(tile.bottom).toBeGreaterThanOrEqual(0);
        expect(tile.bottom).toBeLessThanOrEqual(9);
      });
    });

    it('should mark doubles correctly', () => {
      dominoSet.forEach(tile => {
        expect(tile.isDouble).toBe(tile.top === tile.bottom);
      });
    });

    it('should generate unique IDs for each tile', () => {
      const ids = new Set(dominoSet.map(tile => tile.id));
      expect(ids.size).toBe(55);
    });
  });

  describe('shuffleTiles', () => {
    let originalSet: DominoTile[];
    let shuffledSet: DominoTile[];

    beforeEach(() => {
      originalSet = generateDominoSet();
      shuffledSet = shuffleTiles([...originalSet]);
    });

    it('should maintain the same number of tiles', () => {
      expect(shuffledSet).toHaveLength(originalSet.length);
    });

    it('should contain all the same tiles', () => {
      const originalIds = new Set(originalSet.map(tile => tile.id));
      shuffledSet.forEach(tile => {
        expect(originalIds.has(tile.id)).toBe(true);
      });
    });

    it('should change the order of tiles', () => {
      // Note: There's a tiny chance this could fail randomly
      expect(shuffledSet).not.toEqual(originalSet);
    });
  });

  describe('shouldReshuffle', () => {
    it('should return true when hand has 5 doubles', () => {
      const hand: DominoTile[] = [
        { id: '1', top: 0, bottom: 0, isDouble: true },
        { id: '2', top: 1, bottom: 1, isDouble: true },
        { id: '3', top: 2, bottom: 2, isDouble: true },
        { id: '4', top: 3, bottom: 3, isDouble: true },
        { id: '5', top: 4, bottom: 4, isDouble: true },
        { id: '6', top: 0, bottom: 1, isDouble: false },
      ];
      expect(shouldReshuffle(hand)).toBe(true);
    });

    it('should return false when hand has less than 5 doubles', () => {
      const hand: DominoTile[] = [
        { id: '1', top: 0, bottom: 0, isDouble: true },
        { id: '2', top: 1, bottom: 1, isDouble: true },
        { id: '3', top: 2, bottom: 2, isDouble: true },
        { id: '4', top: 0, bottom: 1, isDouble: false },
        { id: '5', top: 1, bottom: 2, isDouble: false },
      ];
      expect(shouldReshuffle(hand)).toBe(false);
    });
  });

  describe('distributeTiles', () => {
    const mockPlayers: Player[] = [
      { id: 'p1', name: 'Player 1', position: 'north', hand: [] },
      { id: 'p2', name: 'Player 2', position: 'south', hand: [] },
    ];

    it('should distribute 10 tiles to each player', () => {
      const tiles = generateDominoSet();
      const { playerHands } = distributeTiles(tiles, mockPlayers);
      
      Object.values(playerHands).forEach(hand => {
        expect(hand).toHaveLength(10);
      });
    });

    it('should maintain the correct number of remaining tiles', () => {
      const tiles = generateDominoSet();
      const { remainingTiles } = distributeTiles(tiles, mockPlayers);
      
      // For 2 players: 55 total - (2 players * 10 tiles) = 35 remaining
      expect(remainingTiles).toHaveLength(35);
    });
  });

  describe('initializeGame', () => {
    const mockPlayers: Player[] = [
      { id: 'p1', name: 'Player 1', position: 'north', hand: [] },
      { id: 'p2', name: 'Player 2', position: 'south', hand: [] },
    ];

    const mockTeams: [Team, Team] = [
      { id: 't1', name: 'Team 1', players: [mockPlayers[0], mockPlayers[1]] as [Player, Player], score: 0 },
      { id: 't2', name: 'Team 2', players: [mockPlayers[0], mockPlayers[1]] as [Player, Player], score: 0 },
    ];

    it('should initialize a 1v1 game correctly', () => {
      const gameState = initializeGame('1v1', mockPlayers);
      
      expect(gameState.mode).toBe('1v1');
      expect(gameState.status).toBe('starting');
      expect(gameState.players).toHaveLength(2);
      expect(gameState.roundNumber).toBe(1);
      expect(gameState.playedTiles).toHaveLength(0);
    });

    it('should initialize a 2v2 game correctly', () => {
      const gameState = initializeGame('2v2', mockPlayers, mockTeams);
      
      expect(gameState.mode).toBe('2v2');
      expect(gameState.teams).toBeDefined();
      expect(gameState.teams).toHaveLength(2);
    });

    it('should assign hands to all players', () => {
      const gameState = initializeGame('1v1', mockPlayers);
      
      gameState.players.forEach(player => {
        expect(player.hand).toHaveLength(10);
      });
    });
  });

  describe('determineStartingPlayer', () => {
    const mockPlayers: Player[] = [
      { id: 'p1', name: 'Player 1', position: 'north', hand: [] },
      { id: 'p2', name: 'Player 2', position: 'south', hand: [] },
    ];

    it('should return a valid player ID and drawn tiles', () => {
      const remainingTiles = generateDominoSet();
      const result = determineStartingPlayer(mockPlayers, remainingTiles);
      
      expect(mockPlayers.map(p => p.id)).toContain(result.playerId);
      expect(Object.keys(result.drawnTiles)).toHaveLength(mockPlayers.length);
    });

    it('should assign one tile per player', () => {
      const remainingTiles = generateDominoSet();
      const { drawnTiles } = determineStartingPlayer(mockPlayers, remainingTiles);
      
      mockPlayers.forEach(player => {
        expect(drawnTiles[player.id]).toBeDefined();
      });
    });

    it('should select player with highest value tile', () => {
      // Create a controlled set of tiles where we know the highest value
      const controlledTiles: DominoTile[] = [
        { id: '1', top: 1, bottom: 1, isDouble: true },  // sum: 2
        { id: '2', top: 4, bottom: 5, isDouble: false }, // sum: 9
      ];
      
      const result = determineStartingPlayer(mockPlayers, controlledTiles);
      expect(result.playerId).toBe(mockPlayers[1].id); // Player with 4|5 should win
    });
  });
}); 