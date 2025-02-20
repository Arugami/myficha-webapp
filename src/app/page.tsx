'use client';

import React from 'react';
import { Hero } from '@/app/_components/Hero';
import { Features } from '@/app/_components/Features';
import { GlobalLeaderboardPreview } from '@/app/_components/GlobalLeaderboardPreview';
import { GameModesShowcase } from '@/app/_components/GameModesShowcase';
import { GameDemo } from '@/app/_components/GameDemo';
import { HowToPlay } from '@/app/_components/HowToPlay';
import { CallToAction } from '@/app/_components/CallToAction';

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
