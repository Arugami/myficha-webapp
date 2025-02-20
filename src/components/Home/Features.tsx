'use client';

import React from 'react';
import { Dice1, Users, Trophy } from 'lucide-react';

export const Features = () => {
  return (
    <section className="px-4 py-24 bg-gradient-to-b from-black to-cuban-navy">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Players Love <span className="text-cuban-gold">MyFicha</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience the perfect blend of tradition and innovation in our modern take on Cuban Dominoes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Play Feature */}
          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-cuban-gold/50 transition-all duration-300 overflow-hidden">
            <div className="w-full h-48 mb-6 rounded-xl overflow-hidden">
              <img 
                src="/picture-uploads/quick-play-preview.png"
                alt="Quick play dominoes game"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-12 h-12 bg-cuban-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cuban-gold/20 transition-colors duration-300">
              <Dice1 className="w-6 h-6 text-cuban-gold" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cuban-gold transition-colors duration-300">
              Quick Play
            </h3>
            <p className="text-gray-400">Jump into 1v1 or 2v2 matches instantly with players from around the world. Experience the thrill of fast-paced Cuban dominoes.</p>
          </div>

          {/* Social Experience Feature */}
          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-cuban-gold/50 transition-all duration-300 overflow-hidden">
            <div className="w-full h-48 mb-6 rounded-xl overflow-hidden relative">
              <img 
                src="/picture-uploads/social-domino-gathering.jpeg"
                alt="Friends enjoying dominoes together"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="w-12 h-12 bg-cuban-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cuban-gold/20 transition-colors duration-300">
              <Users className="w-6 h-6 text-cuban-gold" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cuban-gold transition-colors duration-300">
              Social Experience
            </h3>
            <p className="text-gray-400">Connect with friends, join teams, and immerse yourself in the rich tradition of Cuban dominoes. Share stories, strategies, and memorable moments.</p>
          </div>

          {/* Competitive Play Feature */}
          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-cuban-gold/50 transition-all duration-300 overflow-hidden">
            <div className="w-full h-48 mb-6 rounded-xl overflow-hidden relative">
              <img 
                src="/picture-uploads/competitive-tournament-scene.jpg"
                alt="Competitive dominoes tournament"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            <div className="w-12 h-12 bg-cuban-gold/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cuban-gold/20 transition-colors duration-300">
              <Trophy className="w-6 h-6 text-cuban-gold" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cuban-gold transition-colors duration-300">
              Competitive Rankings
            </h3>
            <p className="text-gray-400">Compete in tournaments, climb the global leaderboard, and earn prestigious titles. Show your mastery of Cuban dominoes to the world.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

