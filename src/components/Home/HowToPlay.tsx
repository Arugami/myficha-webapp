'use client';

import React from 'react';
import { UserPlus, Gamepad, Trophy, Users, Target, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const HowToPlay = () => {
  return (
    <section className="px-4 py-24 bg-gradient-to-b from-black to-cuban-navy relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cuban-gold/10 via-transparent to-transparent opacity-30"></div>
      
      <div className="container mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your <span className="text-cuban-gold">Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Begin your Cuban Dominoes adventure in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "1",
              icon: <UserPlus className="w-6 h-6" />,
              title: "Create Account",
              desc: "Sign up in seconds and join our community of players",
              features: [
                "Quick registration process",
                "Secure authentication",
                "Personalized profile"
              ]
            },
            {
              step: "2",
              icon: <Users className="w-6 h-6" />,
              title: "Choose Your Mode",
              desc: "Select from various game modes that suit your style",
              features: [
                "1v1 competitive matches",
                "2v2 team battles",
                "Practice with AI"
              ]
            },
            {
              step: "3",
              icon: <Trophy className="w-6 h-6" />,
              title: "Start Playing",
              desc: "Jump into games and climb the leaderboards",
              features: [
                "Quick matchmaking",
                "Skill-based ranking",
                "Daily tournaments"
              ]
            }
          ].map((item, index) => (
            <div 
              key={item.step}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-cuban-gold/30 group-hover:transform group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-cuban-gold/20 text-cuban-gold flex items-center justify-center mb-2 transition-transform duration-500 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-cuban-gold text-cuban-navy font-bold text-lg flex items-center justify-center">
                      {item.step}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>

                  <ul className="space-y-3 text-sm">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-400">
                        <Sparkles className="w-4 h-4 text-cuban-gold mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            size="lg"
            className="bg-cuban-gold hover:bg-cuban-gold/90 text-cuban-navy font-semibold px-8 py-6 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cuban-gold/20"
            asChild
          >
            <Link href="/dashboard">
              Start Your Journey
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
