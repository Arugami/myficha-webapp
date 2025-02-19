import React from 'react';
import { Trophy, X, Clock, Users, User, ChevronDown } from 'lucide-react';
import { TableCell, TableRow } from "@/components/ui/table";
import { MatchDetails } from '../Dashboard/Matches/MatchDetails';
import type { Match, TeamMember } from '../../types/dashboard';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MatchTableRowProps {
  match: Match;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const MatchTableRow: React.FC<MatchTableRowProps> = ({ match, isExpanded, onToggleExpand }) => {
  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy h:mm a');
  };

  return (
    <>
      <TableRow 
        className={cn(
          "cursor-pointer transition-all duration-300",
          "hover:bg-black/30 backdrop-blur-sm",
          "border-b border-[#F1F1F1]/10",
          match.matchType === '2v2' ? 'border-l-2 border-l-[#FFC107]/30' : '',
          isExpanded ? 'bg-black/20 backdrop-blur-sm' : '',
          "py-4"
        )}
        onClick={onToggleExpand}
      >
        <TableCell className="py-4">
          <div className="flex items-center gap-2 text-[#FAEBD7]/50 group">
            <Clock className="w-4 h-4 group-hover:text-[#FFC107] transition-colors duration-300" />
            <span className="group-hover:text-[#FFC107] transition-colors duration-300">
              {formatDate(match.date)}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-4">
          {match.matchType === '1v1' ? (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#FFC107]/70" />
              <div className="flex items-center gap-2">
                <img
                  src={(match.opponent as TeamMember).avatar}
                  alt={(match.opponent as TeamMember).username}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#FFC107]/20 hover:border-[#FFC107]/50 transition-all duration-300"
                />
                <div>
                  <p className="text-[#FAEBD7] font-medium hover:text-[#FFC107] transition-colors duration-300">
                    {(match.opponent as TeamMember).username}
                  </p>
                  <span className="text-[#FAEBD7]/50 text-sm">
                    {(match.opponent as TeamMember).country}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#FFC107]/70" />
              <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
                {(match.opponent as TeamMember[]).map((opponent, index) => (
                  <img
                    key={index}
                    src={opponent.avatar}
                    alt={opponent.username}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#FFC107]/20 hover:border-[#FFC107]/50 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          )}
        </TableCell>
        <TableCell className="py-4">
          <div className="flex items-center gap-2">
            {match.result === 'win' ? (
              <Trophy className="w-6 h-6 text-[#FFC107] animate-pulse" />
            ) : (
              <X className="w-6 h-6 text-red-500/80" />
            )}
            <span className={cn(
              "font-medium transition-colors duration-300",
              match.result === 'win' 
                ? 'text-[#FFC107] hover:text-[#FFC107]/80' 
                : 'text-red-500/80 hover:text-red-400'
            )}>
              {match.result.charAt(0).toUpperCase() + match.result.slice(1)}
            </span>
          </div>
        </TableCell>
        <TableCell className="py-4">
          <span className="text-[#FAEBD7] font-medium">
            {match.score.player} - {match.score.opponent}
          </span>
        </TableCell>
        <TableCell className="flex items-center justify-between py-4">
          <span className={cn(
            "font-medium transition-all duration-300",
            match.cdsChange >= 0 
              ? 'text-green-400 hover:text-green-300' 
              : 'text-red-400 hover:text-red-300'
          )}>
            {match.cdsChange >= 0 ? '+' : ''}{match.cdsChange}
          </span>
          <ChevronDown className={cn(
            "w-5 h-5 text-[#FAEBD7]/40 transform transition-transform duration-500 ease-out",
            isExpanded ? "rotate-180" : "",
            "hover:text-[#FFC107]"
          )} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} className="p-0">
          <div 
            className={cn(
              "grid transition-all duration-500 ease-out",
              isExpanded 
                ? "grid-rows-[1fr] opacity-100 transform-none" 
                : "grid-rows-[0fr] opacity-0 -translate-y-4"
            )}
          >
            <div className="overflow-hidden bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-sm">
              {match.statistics && <MatchDetails match={match} />}
            </div>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};