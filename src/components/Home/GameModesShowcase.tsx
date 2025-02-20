'use client';

import React from 'react';
import { Users, Trophy, Target, Gamepad, Calendar } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface GameMode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const gameModes: GameMode[] = [
  {
    id: "1v1",
    title: "1v1 Mode",
    description: "Test your skills in intense head-to-head matches",
    icon: <Users className="w-6 h-6 text-cuban-gold" />,
    features: [
      "Quick matchmaking",
      "Skill-based ranking",
      "Detailed post-game analysis",
      "Personal statistics tracking"
    ]
  },
  {
    id: "2v2",
    title: "2v2 Mode",
    description: "Team up with a partner for strategic gameplay",
    icon: <Users className="w-6 h-6 text-cuban-coral" />,
    features: [
      "Partner matchmaking",
      "Team coordination",
      "Combined rankings",
      "Team strategies"
    ]
  },
  {
    id: "tournament",
    title: "Tournaments",
    description: "Compete in organized tournaments for prizes",
    icon: <Trophy className="w-6 h-6 text-cuban-gold" />,
    features: [
      "Weekly tournaments",
      "Prize pools",
      "Bracket system",
      "Tournament statistics"
    ]
  },
  {
    id: "practice",
    title: "Practice Mode",
    description: "Improve your skills with AI opponents",
    icon: <Target className="w-6 h-6 text-cuban-navy" />,
    features: [
      "AI opponents",
      "Strategy tutorials",
      "Skill challenges",
      "Progress tracking"
    ]
  }
];

export const GameModesShowcase = () => {
  return (
    <section className="px-4 py-24 bg-gradient-to-b from-cuban-navy to-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Choose Your <span className="text-cuban-gold">Game Mode</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Whether you're a casual player or a competitive spirit, we have the perfect mode for you.
          </p>
        </div>

        <Tabs defaultValue="1v1" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 bg-transparent">
            {gameModes.map((mode) => (
              <TabsTrigger 
                key={mode.id}
                value={mode.id} 
                className="text-lg py-4 px-6 text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10 rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                <div className="flex items-center gap-3 justify-center">
                  {mode.icon}
                  <span>{mode.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {gameModes.map((mode) => (
            <TabsContent 
              key={mode.id} 
              value={mode.id} 
              className="mt-8 focus-visible:outline-none focus-visible:ring-0"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cuban-gold/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  <div className="w-full lg:w-1/3 space-y-6">
                    <div className="aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
                      <div className="w-full h-full bg-gradient-to-br from-cuban-gold/20 to-cuban-navy/20 flex items-center justify-center">
                        {React.cloneElement(mode.icon as React.ReactElement, { className: 'w-16 h-16 text-cuban-gold' })}
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="text-white font-medium mb-4">Mode Features</h4>
                      <ul className="space-y-3">
                        {mode.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-400">
                            <div className="w-6 h-6 rounded-full bg-cuban-gold/10 flex items-center justify-center flex-shrink-0">
                              <Target className="w-4 h-4 text-cuban-gold" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-2/3 space-y-8">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                        {mode.icon}
                        {mode.title}
                      </h3>
                      <p className="text-xl text-gray-400">{mode.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-white font-medium mb-4">Game Settings</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center justify-between">
                            <span className="text-gray-400">Time per Move</span>
                            <span className="text-white">30 seconds</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-400">Points to Win</span>
                            <span className="text-white">100</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-400">Matchmaking</span>
                            <span className="text-cuban-gold">Skill-based</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-white font-medium mb-4">Rewards</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center justify-between">
                            <span className="text-gray-400">XP per Win</span>
                            <span className="text-white">100 XP</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-400">Ranking Points</span>
                            <span className="text-white">25 RP</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-400">Special Rewards</span>
                            <span className="text-cuban-gold">Unlockable</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

