'use client';

import React from 'react';
import { Hero } from '@/components/Home/Hero';
import { Features } from '@/components/Home/Features';
import { GlobalLeaderboardPreview } from '@/components/Home/GlobalLeaderboardPreview';
import { GameModesShowcase } from '@/components/Home/GameModesShowcase';
import { GameDemo } from '@/components/Home/GameDemo';
import { HowToPlay } from '@/components/Home/HowToPlay';
import { CallToAction } from '@/components/Home/CallToAction';

const Index = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [activeMode, setActiveMode] = React.useState(0);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(3, prev + 1));
  };

  React.useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setActiveMode((prev) => (prev + 1) % 4);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cuban-beige to-white">
      <Hero />
      <Features />
      <GameModesShowcase />
      <GlobalLeaderboardPreview />
      <GameDemo 
        isPlaying={isPlaying}
        currentStep={currentStep}
        onTogglePlayback={togglePlayback}
        onPrevStep={handlePrevStep}
        onNextStep={handleNextStep}
      />
      <HowToPlay />
      <CallToAction />
    </div>
  );
};

export default Index;
