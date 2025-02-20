'use client';

import React from 'react';
import { Bell, Calendar, Wrench } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Update {
  id: string;
  type: 'event' | 'patch' | 'announcement';
  title: string;
  date: string;
  description: string;
}

const updates: Update[] = [
  {
    id: '1',
    type: 'event',
    title: 'Cuban Independence Day Tournament',
    date: 'May 20, 2024',
    description: 'Join us for a special tournament celebrating Cuban culture and dominoes!'
  },
  {
    id: '2',
    type: 'patch',
    title: 'Game Balance Update v1.2.3',
    date: 'April 15, 2024',
    description: 'New matchmaking improvements and bug fixes.'
  },
  {
    id: '3',
    type: 'announcement',
    title: 'Community Challenge: Capicúa Kings',
    date: 'April 10, 2024',
    description: 'Score the most capicúas this week to win special rewards!'
  }
];

const getIcon = (type: Update['type']) => {
  switch (type) {
    case 'event':
      return <Calendar className="w-4 h-4 text-[#FFC107]" />;
    case 'patch':
      return <Wrench className="w-4 h-4 text-[#FF7F50]" />;
    case 'announcement':
      return <Bell className="w-4 h-4 text-[#FAEBD7]" />;
  }
};

export const UpdatesFeed = () => {
  return (
    <div className="bg-black/20 rounded-lg shadow-lg shadow-black/5 border border-white/10 transition-all duration-300 ease-in-out hover:bg-black/25">
      <h3 className="text-lg font-semibold text-[#FAEBD7] p-4 border-b border-white/10">Community Updates</h3>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4 p-4">
          {updates.map((update) => (
            <div
              key={update.id}
              className="bg-black/10 hover:bg-[#FFC107]/5 transition-all duration-200 rounded-lg p-4
                       border border-white/5 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                {getIcon(update.type)}
                <span className="text-sm font-medium text-[#FAEBD7]">{update.title}</span>
              </div>
              <p className="text-sm text-[#FAEBD7]/70 leading-relaxed mb-2">{update.description}</p>
              <p className="text-xs text-[#FAEBD7]/50">{update.date}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};