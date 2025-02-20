'use client';

import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';

interface GameDemoProps {
  isPlaying: boolean;
  currentStep: number;
  onTogglePlayback: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const GameDemo = ({ 
  isPlaying, 
  currentStep, 
  onTogglePlayback, 
  onPrevStep, 
  onNextStep 
}: GameDemoProps) => {
  return (
    <section className="px-4 py-24 bg-gradient-to-b from-cuban-navy via-black to-black relative overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6">
          Master the Art of <span className="text-cuban-gold">Cuban Dominoes</span>
        </h2>
        <p className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Learn the rules, strategies, and special moves through our interactive demo
        </p>

        
        <div className="relative aspect-video max-w-4xl mx-auto mb-12 rounded-2xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/10 group hover:border-cuban-gold/30 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-cuban-gold/5 to-cuban-navy/10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 group-hover:scale-105 transition-transform duration-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-cuban-gold/20 flex items-center justify-center border border-cuban-gold/30">
                <Play className="w-8 h-8 text-cuban-gold" />
              </div>
              <p className="text-gray-400 text-lg font-medium">Interactive preview coming soon</p>
              <p className="text-sm text-gray-500">Experience the game firsthand</p>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-white/10 hover:bg-white/20 border-white/20 hover:border-cuban-gold/50 transition-colors duration-300"
                onClick={onPrevStep}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="bg-white/10 hover:bg-white/20 border-white/20 hover:border-cuban-gold/50 transition-colors duration-300"
                onClick={onTogglePlayback}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="bg-white/10 hover:bg-white/20 border-white/20 hover:border-cuban-gold/50 transition-colors duration-300"
                onClick={onNextStep}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cuban-gold/20 via-transparent to-transparent opacity-30"></div>
          {[
            {
              title: "Starting Move",
              desc: "Begin with any tile from your hand",
              active: currentStep === 0
            },
            {
              title: "Building the Chain",
              desc: "Match numbers on open ends",
              active: currentStep === 1
            },
            {
              title: "Special Moves",
              desc: "Master Capicúa and Pollona",
              active: currentStep === 2
            },
            {
              title: "Winning Strategy",
              desc: "Score points with remaining tiles",
              active: currentStep === 3
            }
          ].map((step, index) => (
            <div
              key={step.title}
              className={`p-6 rounded-xl transition-all duration-500 backdrop-blur-sm ${
                step.active
                  ? "bg-cuban-gold/10 border border-cuban-gold shadow-lg shadow-cuban-gold/20"
                  : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
