'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DominoTile as DominoTileType } from '@/types/game';
import DominoTile from './DominoTile';
import { Card } from "@/components/ui/card";

interface PlayerHandProps {
  tiles: DominoTileType[];
  isDealing: boolean;
  isCurrentTurn: boolean;
  onTileSelect: (tile: DominoTileType) => void;
}

const PlayerHand: React.FC<PlayerHandProps> = ({
  tiles,
  isDealing,
  isCurrentTurn,
  onTileSelect,
}) => {
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
                      onClick={() => isPlayable && onTileSelect(domino)}
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

export default PlayerHand; 