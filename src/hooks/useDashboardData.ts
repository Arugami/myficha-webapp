'use client';

import { useQuery } from '@tanstack/react-query';
import type { Player, Match } from '@/types';

interface DashboardData {
  playerStats: Player | null;
  recentMatches: Match[];
  topPlayers: Player[];
}

const mockPlayers = [
  {
    id: '1',
    username: 'ElDominoMaestro',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop',
    country: '🇨🇺',
    cdsScore: 2500,
    rank: 1,
    statistics: {
      winRate: 0.75,
      totalMatches: 500,
      averageScore: 85,
    },
  },
  {
    id: '2',
    username: 'CubanLegend',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop',
    country: '🇨🇺',
    cdsScore: 2450,
    rank: 2,
    statistics: {
      winRate: 0.70,
      totalMatches: 450,
      averageScore: 82,
    },
  },
  {
    id: '3',
    username: 'FichaKing',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=64&h=64&fit=crop',
    country: '🇵🇷',
    cdsScore: 2400,
    rank: 3,
    statistics: {
      winRate: 0.68,
      totalMatches: 420,
      averageScore: 80,
    },
  },
];

const mockMatches: Match[] = [
  {
    id: '1',
    date: new Date('2024-02-18T14:30:00Z'),
    matchType: '1v1',
    opponent: {
      username: 'CubanLegend',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop',
      country: '🇨🇺'
    },
    result: 'win',
    score: {
      player: 150,
      opponent: 100
    },
    cdsChange: 25,
    statistics: {
      pollonas: 0,
      capicuas: 1,
      totalPoints: 150
    }
  },
  {
    id: '2',
    date: new Date('2024-02-17T18:15:00Z'),
    matchType: '1v1',
    opponent: {
      username: 'FichaKing',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=64&h=64&fit=crop',
      country: '🇵🇷'
    },
    result: 'win',
    score: {
      player: 200,
      opponent: 50
    },
    cdsChange: 35,
    statistics: {
      pollonas: 1,
      capicuas: 0,
      totalPoints: 200
    }
  },
];

const fetchPlayerStats = async (): Promise<DashboardData> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { 
    playerStats: mockPlayers[0],
    recentMatches: mockMatches,
    topPlayers: mockPlayers,
  };
};

export const useDashboardData = () => {
  const { data, isLoading, isError } = useQuery<DashboardData>({
    queryKey: ['dashboardData'],
    queryFn: fetchPlayerStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    refetchInterval: false,
  });

  console.log('Dashboard Data:', {
    data,
    isLoading,
    isError,
    playerStats: data?.playerStats,
    recentMatches: data?.recentMatches
  });

  return {
    playerStats: data?.playerStats,
    recentMatches: data?.recentMatches || [],
    topPlayers: data?.topPlayers || [],
    isLoading: isLoading || !data,
    isError,
  };
};
