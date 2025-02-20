'use client';

import React from 'react';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="game-layout">
      {/* Game-specific layout components can go here */}
      <div className="game-content">
        {children}
      </div>
    </div>
  );
}
