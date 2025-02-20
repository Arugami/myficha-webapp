'use client';

import React, { useState } from 'react';
import { formatDistanceToNow, subDays, isAfter, format } from 'date-fns';
import { UserRound } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import Link from 'next/link';

interface NotificationItemProps {
  notification: {
    id: number;
    type: string;
    from: string;
    message: string;
    timestamp: string | Date;
    avatarUrl?: string;
    read: boolean;
  };
  onAccept: (e: React.MouseEvent, notification: any) => void;
  onDecline: (e: React.MouseEvent, notification: any) => void;
}

const formatNotificationTime = (timestamp: string | Date) => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const twoDaysAgo = subDays(new Date(), 2);
  return isAfter(date, twoDaysAgo)
    ? formatDistanceToNow(date, { addSuffix: true })
    : format(date, 'MMM d, yyyy');
};

export const ClientNotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onAccept,
  onDecline,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDecline = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRemoving(true);
    setTimeout(() => {
      onDecline(e, notification);
    }, 400);
  };

  const getNotificationLink = () => {
    if (!notification?.type || !notification?.id) return '/';
    
    switch (notification.type) {
      case 'invite':
        return `/play?invite=${notification.id}`;
      case 'friend':
        return notification.from ? `/profile/${notification.from}` : '/';
      case 'system':
        return '/notifications';
      default:
        return '/';
    }
  };

  return (
    <Link 
      href={getNotificationLink()}
      className={`flex flex-col items-start px-4 py-3 min-h-[96px] hover:bg-white/5 transition-all duration-300 hover-lift cursor-pointer
        ${isRemoving ? 'animate-slide-out-right opacity-0' : 'animate-fade-in opacity-100'}`}
    >
      <div className="flex w-full items-start gap-3 mb-2">
        <Avatar className="h-10 w-10 flex-shrink-0 ring-1 ring-white/10">
          <AvatarImage 
            src={notification.avatarUrl} 
            alt={notification.from}
            className="object-cover"
          />
          <AvatarFallback>
            <UserRound className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start w-full">
            <span className="font-medium text-[#FAEBD7] truncate">{notification.from}</span>
            <span className="text-xs text-[#8E9196]/60 flex-shrink-0 ml-2">
              {formatNotificationTime(notification.timestamp)}
            </span>
          </div>
          <p className="text-sm text-[#8E9196] mt-1">
            {notification.message}
          </p>
        </div>
      </div>
      {(notification.type === 'invite' || notification.type === 'friend') && (
        <div className="flex gap-2 mt-2 ml-[52px]" onClick={(e) => e.stopPropagation()}>
          <Button
            onClick={(e) => onAccept(e, notification)}
            variant="default"
            size="sm"
            className="bg-[#FFC107] text-[#001F3F] hover:bg-[#FFC107]/90 button-press
              transition-all duration-300 ease-in-out
              active:bg-[#FFB300]
              transform active:scale-95
              hover:-translate-y-0.5"
          >
            Accept
          </Button>
          <Button
            onClick={handleDecline}
            variant="destructive"
            size="sm"
            className="button-press"
          >
            {notification.type === 'invite' ? 'Decline' : 'Ignore'}
          </Button>
        </div>
      )}
    </Link>
  );
};
