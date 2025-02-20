'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Dice5,
  User,
  Trophy,
  History,
  Settings,
} from 'lucide-react';
import { NavItem } from './types';
import { NotificationBell } from '@/components/shared/notifications/NotificationBell';

const navItems: NavItem[] = [
  { icon: 'home', label: 'Home', path: '/' },
  { icon: 'dice', label: 'Play', path: '/play' },
  { icon: 'user', label: 'Profile', path: '/profile' },
  { icon: 'trophy', label: 'Leaderboard', path: '/leaderboard' },
  { icon: 'history', label: 'Match History', path: '/history' },
  { icon: 'settings', label: 'Settings', path: '/settings' },
].map(item => ({ ...item, path: item.path || '/' }));

const getIcon = (name: string) => {
  switch (name) {
    case 'home': return <Home className="w-6 h-6" />;
    case 'dice': return <Dice5 className="w-6 h-6" />;
    case 'user': return <User className="w-6 h-6" />;
    case 'trophy': return <Trophy className="w-6 h-6" />;
    case 'history': return <History className="w-6 h-6" />;
    case 'settings': return <Settings className="w-6 h-6" />;
    default: return null;
  }
};

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 w-[250px] h-full p-4 transition-colors duration-300 bg-background border-r">
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/"
            className="transition-opacity hover:opacity-80 text-[#fcead3]"
          >
            <h1 className="text-2xl font-bold">MyFicha</h1>
          </Link>
          <NotificationBell />
        </div>

        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10 text-foreground'
                }`}
              >
                {getIcon(item.icon)}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background p-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {getIcon(item.icon)}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
