'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const CallToAction = () => {
  return (
    <section className="px-4 py-20 bg-cuban-navy text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Community?</h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Experience the excitement of Cuban dominoes with players from around the world.
        </p>
        <Button 
          size="lg"
          className="bg-cuban-gold hover:bg-cuban-gold/90 text-cuban-navy font-semibold px-8"
          asChild
        >
          <Link href="/dashboard">
            Join Now
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
