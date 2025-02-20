'use client';

import { Navigation } from './Navigation';
import { useState, useEffect } from 'react';

export function ClientNav() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="hidden md:flex flex-col fixed left-0 top-0 w-[250px] h-full p-4 transition-colors duration-300 bg-background border-r">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
        </div>
      </nav>
    );
  }

  return <Navigation />;
}
