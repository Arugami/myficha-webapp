import React from 'react';
import { User, Gamepad2, UserPlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'in-game' | 'offline';
  currentGame?: string;
}

const mockFriends: Friend[] = [
  {
    id: '1',
    username: 'MariaD',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop',
    status: 'online'
  },
  {
    id: '2',
    username: 'CarlosR',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop',
    status: 'in-game',
    currentGame: 'Ranked Match'
  },
  {
    id: '3',
    username: 'JuanP',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop',
    status: 'online'
  },
  {
    id: '4',
    username: 'AnnaM',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop',
    status: 'online'
  },
  {
    id: '5',
    username: 'PedroS',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
    status: 'in-game',
    currentGame: 'Practice Mode'
  }
];

export const OnlineFriends: React.FC = () => {
  return (
    <div className="bg-black/20 rounded-lg shadow-lg shadow-black/5 border border-white/10 transition-all duration-300 ease-in-out hover:bg-black/25">
      <h2 className="text-lg font-inter font-semibold p-4 text-[#FAEBD7]">Online Friends</h2>
      <ScrollArea className="h-[280px]">
        <div className="space-y-2 p-4 pt-0">
          {mockFriends.map((friend, index) => (
            <React.Fragment key={friend.id}>
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#FFC107]/10 cursor-pointer transition-colors duration-200">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={friend.avatar} alt={friend.username} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span 
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-black/20
                      ${friend.status === 'online' ? 'bg-green-500' : 
                        friend.status === 'in-game' ? 'bg-[#FFC107]' : 'bg-gray-500'}`}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm text-[#FAEBD7] truncate font-medium">{friend.username}</p>
                  {friend.status === 'in-game' && (
                    <div className="flex items-center gap-1 text-xs text-[#FAEBD7]/60">
                      <Gamepad2 className="w-3 h-3" />
                      <span className="truncate">{friend.currentGame}</span>
                    </div>
                  )}
                </div>
                <button 
                  className="p-1.5 transition-all duration-200"
                  aria-label={`Invite ${friend.username} to play`}
                >
                  <UserPlus className="w-4 h-4 text-[#FAEBD7]/60 hover:text-[#FAEBD7] transition-all duration-200 hover:scale-110" />
                </button>
              </div>
              {index < mockFriends.length - 1 && (
                <Separator className="bg-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};