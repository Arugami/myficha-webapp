import React from 'react';
import { MessageSquare, Users, Gamepad } from 'lucide-react';
import { NotificationItem } from './NotificationItem';

interface NotificationGroupProps {
  type: string;
  notifications: any[];
  onAccept: (e: React.MouseEvent, notification: any) => void;
  onDecline: (e: React.MouseEvent, notification: any) => void;
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'invite':
      return <Gamepad className="w-4 h-4" />;
    case 'friend':
      return <Users className="w-4 h-4" />;
    case 'system':
      return <MessageSquare className="w-4 h-4" />;
    default:
      return null;
  }
};

const getGroupTitle = (type: string) => {
  switch (type) {
    case 'invite':
      return 'Game Invites';
    case 'friend':
      return 'Friend Requests';
    case 'system':
      return 'System Messages';
    default:
      return 'Other';
  }
};

export const NotificationGroup: React.FC<NotificationGroupProps> = ({
  type,
  notifications,
  onAccept,
  onDecline,
}) => {
  return (
    <div className="animate-in fade-in-50 duration-300">
      <div 
        role="group"
        aria-label={getGroupTitle(type)}
        className="px-4 py-2 text-xs font-semibold text-[#8E9196] bg-white/5 flex items-center gap-2 border-t border-white/10"
      >
        {getNotificationIcon(type)}
        {getGroupTitle(type)}
      </div>
      <div className="bg-white/[0.02]">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        ))}
      </div>
    </div>
  );
};