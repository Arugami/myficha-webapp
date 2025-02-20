import React, { forwardRef } from 'react';
import { Bell } from 'lucide-react';

interface NotificationIconProps extends React.HTMLAttributes<HTMLDivElement> {
  unreadCount: number;
  hasUnread: boolean;
}

export const NotificationIcon = forwardRef<HTMLDivElement, NotificationIconProps>(
  ({ unreadCount, hasUnread, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative p-2 rounded-full transition-all duration-200 group 
          outline-none cursor-pointer ${className}`}
        aria-label="Notifications"
        {...props}
      >
        <Bell className="w-6 h-6 group-hover:animate-gentle-shake text-[#fcead3]" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full animate-fade-in">
            {unreadCount}
          </span>
        )}
      </div>
    );
  }
);

NotificationIcon.displayName = 'NotificationIcon';