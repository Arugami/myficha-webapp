export interface TeamMember {
  username: string;
  avatar: string;
  country: string;
}

export interface Match {
  id: string;
  date: Date;
  matchType: '1v1' | '2v2';
  opponent: TeamMember | TeamMember[];
  teammate?: TeamMember;
  result: 'win' | 'loss';
  score: {
    player: number;
    opponent: number;
    teamScore?: number;
  };
  cdsChange: number;
  statistics?: {
    pollonas: number;
    capicuas: number;
    totalPoints: number;
  };
}

export interface Player {
  id: string;
  username: string;
  avatar: string;
  country: string;
  cdsScore: number;
  rank: number;
  statistics?: {
    winRate: number;
    totalMatches: number;
    averageScore: number;
  };
}
