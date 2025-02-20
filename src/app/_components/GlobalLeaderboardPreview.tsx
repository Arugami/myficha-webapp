'use client';

import React from 'react';
import { Trophy, Star, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/app/_components/ui/button';
import type { Player } from '@/types';

const demoPlayers: Player[] = [
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
  {
    id: '4',
    username: 'DominoQueen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop',
    country: '🇩🇴',
    cdsScore: 2350,
    rank: 4,
    statistics: {
      winRate: 0.65,
      totalMatches: 380,
      averageScore: 78,
    },
  },
  {
    id: '5',
    username: 'LaHabanaChamp',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
    country: '🇨🇺',
    cdsScore: 2300,
    rank: 5,
    statistics: {
      winRate: 0.63,
      totalMatches: 350,
      averageScore: 76,
    },
  },
];

export const GlobalLeaderboardPreview = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#001324] to-[#001F37]">
      <div className="container mx-auto max-w-5xl animate-fade-in">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-white via-white to-gray-300 text-transparent bg-clip-text">Become The Best</span>
          <br className="hidden sm:block" />
          <span className="text-cuban-gold">Cuban Domino Player</span>
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-white via-white to-gray-300 text-transparent bg-clip-text">In The World</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#001F37] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 animate-fade-in-up">

            <div className="w-12 h-12 bg-cuban-gold/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">

              <Trophy className="w-6 h-6 text-cuban-gold" />
            </div>
            <div className="text-3xl font-bold text-white tracking-tight">
#1</div>
            <div className="text-gray-400 text-sm">Global Ranking</div>
          </div>

          <div className="bg-[#001F37] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 animate-fade-in-up">

            <div className="w-12 h-12 bg-cuban-gold/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">

              <Star className="w-6 h-6 text-cuban-gold" />
            </div>
            <div className="text-3xl font-bold text-white tracking-tight">
68%</div>
            <div className="text-gray-400 text-sm">Win Rate</div>
          </div>

          <div className="bg-[#001F37] rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 animate-fade-in-up">

            <div className="w-12 h-12 bg-cuban-gold/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">

              <Clock className="w-6 h-6 text-cuban-gold" />
            </div>
            <div className="text-3xl font-bold text-white tracking-tight">
1m 47s</div>
            <div className="text-gray-400 text-sm">Fastest Game</div>
          </div>
        </div>

        <div className="bg-[#001F37] rounded-2xl p-6 mb-8 shadow-lg shadow-black/5 animate-fade-in-up delay-200">

          <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm border-b border-white/10 pb-4 mb-4 px-4">
            <div className="col-span-1">#</div>
            <div className="col-span-5 md:col-span-7">Player</div>
            <div className="col-span-3 md:col-span-2 text-right">Wins</div>
            <div className="col-span-3 md:col-span-2 text-right">Win Rate</div>
          </div>

          {demoPlayers.map((player) => (
            <div 
              key={player.id}
              className="grid grid-cols-12 gap-4 items-center py-4 px-4 mx-[-1rem] text-white hover:bg-[#002647] rounded-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="col-span-1 text-gray-400 group-hover:text-white transition-colors pl-2">{player.rank}</div>
              <div className="col-span-5 md:col-span-7 flex items-center gap-3">
                <img 
                  src={player.avatar} 
                  alt={player.username}
                  className="w-8 h-8 rounded-full ring-2 ring-white/10 group-hover:ring-cuban-gold transition-all"
                />
                <span className="font-medium group-hover:text-cuban-gold transition-colors">{player.username}</span>
                <span className="text-lg">{player.country}</span>
              </div>
              <div className="col-span-3 md:col-span-2 text-right text-gray-400 group-hover:text-white transition-colors pr-2">
                {player.statistics?.totalMatches || 0}
              </div>
              <div className="col-span-3 md:col-span-2 text-right font-medium group-hover:text-cuban-gold transition-colors pr-2">
                {((player.statistics?.winRate || 0) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="text-white border-white/20 hover:bg-white/10 hover:border-white/40 transition-colors px-8"
            asChild
          >
            <Link href="/leaderboard" className="font-medium">
              View Full Leaderboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

