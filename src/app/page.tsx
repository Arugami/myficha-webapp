'use client';

import React from 'react';
import { Hero } from '@/components/Home/Hero';
import { Features } from '@/components/Home/Features';
import { GlobalLeaderboardPreview } from '@/components/Home/GlobalLeaderboardPreview';
import { GameModesShowcase } from '@/components/Home/GameModesShowcase';
import { GameDemo } from '@/components/Home/GameDemo';
import { HowToPlay } from '@/components/Home/HowToPlay';
import { CallToAction } from '@/components/Home/CallToAction';

export default function Home() {
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
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const handleModeChange = (index: number) => {
    setActiveMode(index);
  };

  return (
    <div className="w-full">
      <Hero />
      <Features />
      <GlobalLeaderboardPreview />
      <GameModesShowcase
        activeMode={activeMode}
        onModeChange={handleModeChange}
      />
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
}
