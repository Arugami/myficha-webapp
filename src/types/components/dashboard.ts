export interface Challenge {
  id: string;
  title: string;
  reward: string;
  progress: number;
  target: number;
  type: 'daily' | 'weekly';
  expiresAt: Date;
  description: string;
}

export interface PlayerStatistics {
  totalMatches: number;
  winRate: number;
  averageScore: number;
  capicuas?: number;
  winStreak?: number;
}
