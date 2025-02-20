'use client';

import React from 'react';
import { ArrowRight, Users, Trophy } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center px-4 py-20">
      {/* Hero Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: 'url("/picture-uploads/hero-cuban-domino-players.jpg")',
          backgroundPosition: 'center 40%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/80" />
      </div>

      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-block animate-fade-in-up">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-cuban-gold/20 text-cuban-gold text-sm font-medium">
              🎲 Now Live - Join the Game
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in leading-tight">
            Experience <span className="text-cuban-gold">Cuban Dominoes</span> Like Never Before
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join a vibrant community of players and immerse yourself in the authentic spirit of the game. Play, compete, and connect.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg"
              className="bg-cuban-gold hover:bg-cuban-gold/90 text-cuban-navy font-semibold px-8 py-6 text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cuban-gold/20"
              asChild
            >
              <Link href="/dashboard" className="flex items-center">
                Start Playing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link href="/dashboard">
                Learn the Rules
              </Link>
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-400 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-cuban-gold">★★★★★</span> 4.9/5 Player Rating
              </p>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cuban-gold" /> 10k+ Active Players
              </p>
              <p className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-cuban-gold" /> Daily Tournaments
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
