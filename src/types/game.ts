export interface DominoTile {
  id: string;  // Unique identifier for each tile
  top: number;
  bottom: number;
  isDouble: boolean;
}

export type PlayerPosition = 'north' | 'south' | 'east' | 'west';

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  hand: DominoTile[];
  isAI?: boolean;
}

export interface Team {
  id: string;
  name: string;
  players: [Player, Player];  // Exactly 2 players per team
  score: number;
}

export type GameMode = '1v1' | '2v2';

export type GameStatus = 'waiting' | 'starting' | 'playing' | 'blocked' | 'finished';

export type GameActionType = 'play' | 'pass' | 'starting';

export interface Position {
  x: number;
  y: number;
  rotation: number; // 0, 90, 180, 270 degrees
}

export interface PlacedTile extends DominoTile {
  position: Position;
}

export interface GameState {
  id: string;
  mode: GameMode;
  status: GameStatus;
  players: Player[];
  teams?: [Team, Team];  // Only for 2v2 mode
  currentTurn: string;  // Player ID
  remainingTiles: DominoTile[];
  playedTiles: DominoTile[];
  roundNumber: number;
  roundStartPlayer: string;  // Player ID
  lastAction?: {
    type: GameActionType;
    playerId: string;
    tile?: DominoTile;
    drawnTiles?: Record<string, DominoTile>;
    timestamp: number;
  };
  winner?: string;  // Player ID or Team ID
} 