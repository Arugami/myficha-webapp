'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MatchHistoryHeader } from '@/components/MatchHistory/MatchHistoryHeader';
import { MatchHistoryTable } from '@/components/MatchHistory/MatchHistoryTable';
import type { Match } from '@/types/dashboard';
import { cn } from '@/lib/utils';

const fetchMatchHistory = async (page: number, matchType: string | null): Promise<{ matches: Match[], total: number }> => {
  // Simulating API call with mock data
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // This is mock data - replace with actual API call
  const mockMatches: Match[] = Array.from({ length: 50 }, (_, i) => ({
    id: `match-${i}`,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
    matchType: i % 2 === 0 ? '1v1' : '2v2',
    opponent: i % 2 === 0 
      ? {
          username: `Player${i}`,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop',
          country: '🇨🇺'
        }
      : [
          {
            username: `Player${i}A`,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop',
            country: '🇨🇺'
          },
          {
            username: `Player${i}B`,
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop',
            country: '🇨🇺'
          }
        ],
    teammate: i % 2 === 0 ? undefined : {
      username: `Teammate${i}`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop',
      country: '🇨🇺'
    },
    result: i % 3 === 0 ? 'win' : 'loss',
    score: {
      player: 100 + i,
      opponent: 90 + i
    },
    cdsChange: i % 3 === 0 ? 25 : -15,
    statistics: {
      pollonas: 2,
      capicuas: 1,
      totalPoints: 100 + i
    }
  }));

  const filteredMatches = matchType 
    ? mockMatches.filter(match => match.matchType === matchType)
    : mockMatches;

  const start = (page - 1) * 10;
  const paginatedMatches = filteredMatches.slice(start, start + 10);

  return {
    matches: paginatedMatches,
    total: filteredMatches.length
  };
};

const MatchHistory = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedMatchType, setSelectedMatchType] = React.useState<string | null>(null);
  const searchParams = useSearchParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['matchHistory', currentPage, selectedMatchType],
    queryFn: () => fetchMatchHistory(currentPage, selectedMatchType),
  });

  useEffect(() => {
    if (location.state?.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.state?.scrollToTop]);

  const totalPages = data ? Math.ceil(data.total / 10) : 0;

  const handleMatchTypeChange = (value: string) => {
    setSelectedMatchType(value === "all" ? null : value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <MatchHistoryHeader
        selectedMatchType={selectedMatchType}
        onMatchTypeChange={handleMatchTypeChange}
      />

      <div className="space-y-8">
        <MatchHistoryTable
          matches={data?.matches}
          isLoading={isLoading}
        />

        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={cn(
                      "bg-black/10 hover:bg-[#FFC107]/10 text-[#FAEBD7] border-[#FFC107]/20",
                      "transition-colors duration-200",
                      currentPage === 1 && "pointer-events-none opacity-50"
                    )}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className={cn(
                        "bg-black/10 hover:bg-[#FFC107]/10 text-[#FAEBD7] border-[#FFC107]/20",
                        "transition-colors duration-200",
                        currentPage === page && "bg-[#FFC107]/20"
                      )}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={cn(
                      "bg-black/10 hover:bg-[#FFC107]/10 text-[#FAEBD7] border-[#FFC107]/20",
                      "transition-colors duration-200",
                      currentPage === totalPages && "pointer-events-none opacity-50"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchHistory;