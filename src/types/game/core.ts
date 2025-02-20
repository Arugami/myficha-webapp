export interface DominoTile {
  id: string;
  top: number;
  bottom: number;
  isDouble: boolean;
}

export type Team = 'A' | 'B';

export type GameMode = 'classic' | 'competitive';

export type GameActionType = 'play' | 'pass' | 'draw' | 'starting';

export interface GamePlayer {
  id: string;
  name: string;
  team: Team;
  score: number;
  hand: DominoTile[];
}

export type GameStatus = 'waiting' | 'dealing' | 'playing' | 'blocked' | 'finished' | 'starting';

export interface Position {
  x: number;
  y: number;
  rotation: number; // 0, 90, 180, 270 degrees
}

export interface PlacedTile {
  tile: DominoTile;
  position: Position;
}

export interface TeamScores {
  A: number;
  B: number;
}

export interface GameState {
  id: string;
  mode: GameMode;
  teams?: [Team, Team];
  players: GamePlayer[];
  roundStartPlayer: string;
  currentTurn: string;
  status: GameStatus;
  board: PlacedTile[];
  scores: TeamScores;
  remainingTiles: DominoTile[];
  round: number;
  playedTiles: Array<DominoTile & { position: Position }>;
  lastAction?: {
    type: GameActionType;
    playerId: string;
    tile?: DominoTile;
    drawnTiles?: Record<string, DominoTile>;
    timestamp: number;
  };
}
