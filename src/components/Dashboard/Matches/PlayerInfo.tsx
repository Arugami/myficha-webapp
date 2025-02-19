'use client';

import React from 'react';
import { User, Users } from 'lucide-react';
import { Match, TeamMember } from '@/types/dashboard';
import Image from 'next/image';
import Link from 'next/link';

interface PlayerInfoProps {
  match: Match;
}

const PlayerAvatar: React.FC<{
  player: TeamMember | undefined;
  defaultAlt?: string;
  size?: number;
}> = ({ player, defaultAlt = 'Unknown Player', size = 40 }) => {
  if (!player?.username) {
    return (
      <Image
        src="/default-avatar.png"
        alt={defaultAlt}
        width={size}
        height={size}
        className={`w-${size/4} h-${size/4} rounded-full object-cover border-2 border-[#001F3F]`}
      />
    );
  }

  return (
    <Link href={`/profile/${player.username}`}>
      <Image
        src={player.avatar || '/default-avatar.png'}
        alt={player.username}
        width={size}
        height={size}
        className={`w-${size/4} h-${size/4} rounded-full object-cover border-2 border-[#001F3F]
                 transition-all duration-300 hover:scale-110 hover:border-[#FFC107]
                 hover:shadow-lg hover:shadow-[#FFC107]/20`}
      />
    </Link>
  );
};

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ match }) => {
  if (match.matchType === '1v1') {
    const opponent = match.opponent as TeamMember;
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#FFC107]" />
          <span className="text-[#FAEBD7]/60 text-sm">1v1 Match</span>
        </div>
        <div className="flex items-center gap-2">
          <PlayerAvatar player={opponent} size={48} />
          <div>
            <p className="text-[#FAEBD7] font-medium text-lg">
              {opponent?.username || 'Unknown Player'}
            </p>
            <span className="text-[#FAEBD7]/60 text-sm">
              {opponent?.country || 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const opponents = match.opponent as TeamMember[];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-[#FFC107]" />
        <span className="text-[#FAEBD7]/60 text-sm">2v2 Match</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[#FAEBD7]/60 text-sm">Your Team</span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
              <PlayerAvatar player={match.teammate} defaultAlt="Teammate" />
              <div className="relative">
                <Image
                  src="/default-avatar.png"
                  alt="You"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#001F3F]
                           transition-all duration-300 hover:scale-110 hover:border-[#FFC107]
                           hover:shadow-lg hover:shadow-[#FFC107]/20"
                />
              </div>
            </div>
            <div className="ml-2">
              <p className="text-[#FAEBD7] text-sm font-medium">
                You & {match.teammate?.username || 'Unknown Teammate'}
              </p>
              <span className="text-[#FAEBD7]/60 text-xs">
                {match.teammate?.country || 'Unknown'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block text-[#FAEBD7]/60 font-medium">vs</div>
        
        <div className="flex flex-col gap-2">
          <span className="text-[#FAEBD7]/60 text-sm">Opponent Team</span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
              {opponents.map((opponent, index) => (
                <PlayerAvatar
                  key={index}
                  player={opponent}
                  defaultAlt={`Opponent ${index + 1}`}
                />
              ))}
            </div>
            <div className="ml-2">
              <p className="text-[#FAEBD7] text-sm font-medium">
                {opponents[0]?.username || 'Unknown'} & {opponents[1]?.username || 'Unknown'}
              </p>
              <span className="text-[#FAEBD7]/60 text-xs">
                {opponents[0]?.country || 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
