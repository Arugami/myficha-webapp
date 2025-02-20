'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DominoTile as DominoTileType } from '@/types/game/core';
import DominoTile from './DominoTile';
import { Card } from "@/app/_components/ui/card";

interface PlayerHandProps {}

const PlayerHand: React.FC<PlayerHandProps> = () => {
  // Sample tiles for testing
  // Sample hand of 10 tiles for testing
  const tiles: DominoTileType[] = [
    { id: 't1', top: 9, bottom: 9, isDouble: true },
    { id: 't2', top: 9, bottom: 8, isDouble: false },
    { id: 't3', top: 8, bottom: 8, isDouble: true },
    { id: 't4', top: 8, bottom: 7, isDouble: false },
    { id: 't5', top: 7, bottom: 7, isDouble: true },
    { id: 't6', top: 7, bottom: 6, isDouble: false },
    { id: 't7', top: 6, bottom: 6, isDouble: true },
    { id: 't8', top: 6, bottom: 5, isDouble: false },
    { id: 't9', top: 5, bottom: 5, isDouble: true },
    { id: 't10', top: 5, bottom: 4, isDouble: false },
  ];
  const isDealing = false;
  const isCurrentTurn = true;

  const [selectedTile, setSelectedTile] = React.useState<DominoTileType | null>(null);

  const handleTileSelect = (tile: DominoTileType) => {
    if (isCurrentTurn) {
      setSelectedTile(selectedTile?.id === tile.id ? null : tile);
      console.log('Selected tile:', tile);
    }
  };
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const tileVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: 180,
      scale: 0.8
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1E3A2E] p-4" style={{ zIndex: 10 }}>
      <div className="container mx-auto max-w-[1800px]">
        <Card className="p-4 bg-[#2A4B3C] text-white relative">
          <h3 className="text-lg font-bold mb-2">Your Hand</h3>
          <motion.div 
            className="flex justify-center items-center min-h-[96px]"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ 
              maxWidth: '100%',
              gap: '32px',
              padding: '0 48px'
            }}
          >
            <AnimatePresence>
              {tiles.map((domino) => {
                const isPlayable = !isDealing && isCurrentTurn;

                return (
                  <motion.div
                    key={domino.id}
                    variants={tileVariants}
                    initial="hidden"
                    animate="show"
                    style={{ 
                      perspective: 1000, 
                      flexShrink: 0,
                      width: 'calc((100% - 9 * 32px) / 10)', // Calculate width for 10 tiles with 9 gaps of 32px
                    }}
                    className="transform transition-transform duration-200"
                  >
                    <DominoTile
                      topValue={domino.top}
                      bottomValue={domino.bottom}
                      isPlayable={isPlayable}
                      onClick={() => handleTileSelect(domino)}
                      isSelected={selectedTile?.id === domino.id}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </Card>
      </div>
    </div>
  );
};

export { PlayerHand }; 