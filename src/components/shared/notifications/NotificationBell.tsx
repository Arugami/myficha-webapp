'use client';

import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { NotificationIcon } from './NotificationIcon';
import { NotificationGroup } from './NotificationGroup';

const initialNotifications = [
  { id: 1, type: 'invite', from: 'JohnDoe', message: 'invited you to a game', timestamp: new Date().toISOString(), avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop', read: false },
  { id: 2, type: 'friend', from: 'JaneSmith', message: 'sent you a friend request', timestamp: new Date().toISOString(), avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop', read: false },
  { id: 3, type: 'system', from: 'System', message: 'Welcome to MyFicha!', timestamp: new Date().toISOString(), read: true },
  { id: 4, type: 'invite', from: 'AlexWong', message: 'invited you to a game', timestamp: new Date().toISOString(), avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop', read: false },
];

const groupNotifications = (notifications: typeof initialNotifications) => {
  if (!notifications) return {};
  
  return notifications.reduce((acc, notification) => {
    if (!notification || !notification.type) return acc;
    const group = acc[notification.type] || [];
    return { ...acc, [notification.type]: [...group, notification] };
  }, {} as Record<string, typeof initialNotifications>);
};

export const NotificationBell: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter(notification => !notification.read).length;
  const hasUnread = unreadCount > 0;

  const handleAcceptInvite = (e: React.MouseEvent, notification: typeof initialNotifications[0]) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Game Invite Accepted",
      description: `You've joined ${notification.from}'s game.`,
    });
    removeNotification(notification.id);
  };

  const handleDeclineInvite = (e: React.MouseEvent, notification: typeof initialNotifications[0]) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Game Invite Declined",
      description: `You've declined ${notification.from}'s game invite.`,
    });
    removeNotification(notification.id);
  };

  const handleAcceptFriend = (e: React.MouseEvent, notification: typeof initialNotifications[0]) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Friend Request Accepted",
      description: `You are now friends with ${notification.from}.`,
    });
    removeNotification(notification.id);
  };

  const handleDeclineFriend = (e: React.MouseEvent, notification: typeof initialNotifications[0]) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Friend Request Declined",
      description: `You've declined ${notification.from}'s friend request.`,
    });
    removeNotification(notification.id);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleAction = (e: React.MouseEvent, notification: typeof initialNotifications[0]) => {
    if (notification.type === 'invite') {
      handleAcceptInvite(e, notification);
    } else if (notification.type === 'friend') {
      handleAcceptFriend(e, notification);
    }
  };

  const handleDecline = (e: React.MouseEvent, notification: typeof initialNotifications[0]) => {
    if (notification.type === 'invite') {
      handleDeclineInvite(e, notification);
    } else if (notification.type === 'friend') {
      handleDeclineFriend(e, notification);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="focus:outline-none">
          <NotificationIcon unreadCount={unreadCount} hasUnread={hasUnread} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[320px] bg-[#0a192f]/90 hover:bg-[#0a192f]/95 border border-white/10 
                   animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out 
                   data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 
                   data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
                   data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
                   backdrop-blur-xl shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]
                   transition-colors duration-200"
        sideOffset={8}
        collisionPadding={16}
      >
        <DropdownMenuLabel className="text-[#FAEBD7] font-semibold px-4 py-3">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        <ScrollArea className="h-[400px]">
          {!notifications || notifications.length === 0 ? (
            <div className="px-4 py-3 text-center text-sm text-[#8E9196] min-h-[64px] flex items-center justify-center">
              No new notifications
            </div>
          ) : (
            Object.entries(groupNotifications(notifications) || {}).map(([type, groupNotifications]) => (
              <NotificationGroup
                key={type}
                type={type}
                notifications={groupNotifications || []}
                onAccept={handleAction}
                onDecline={handleDecline}
              />
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};