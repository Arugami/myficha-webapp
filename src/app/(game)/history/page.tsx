'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/ui/pagination";
import { MatchHistoryHeader } from './_components/MatchHistoryHeader';
import { MatchHistoryTable } from './_components/MatchHistoryTable';
import type { Match } from '@/types';

// Mock data function
const fetchMatchHistory = async (page: number, matchType: string | null): Promise<{ matches: Match[], total: number }> => {
  // Simulating API call with mock data
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockMatches: Match[] = Array.from({ length: 50 }, (_, i) => ({
    cdsChange: Math.floor(Math.random() * 41) - 20, // Random CDS change between -20 and +20
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
      opponent: 90 + i,
    },
    duration: 15 + i,
  }));

  // Filter by match type if specified
  const filteredMatches = matchType
    ? mockMatches.filter(match => match.matchType === matchType)
    : mockMatches;

  // Paginate
  const perPage = 10;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedMatches = filteredMatches.slice(start, end);

  return {
    matches: paginatedMatches,
    total: filteredMatches.length,
  };
};

function MatchHistoryContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMatchType, setCurrentMatchType] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentPage(parseInt(searchParams.get('page') || '1'));
    setCurrentMatchType(searchParams.get('type'));
  }, [searchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['matchHistory', currentPage, currentMatchType],
    queryFn: () => fetchMatchHistory(currentPage, currentMatchType),
    enabled: mounted,
  });

  if (!mounted || isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Match History</h1>
        <div className="p-8">Loading match history...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Match History</h1>
        <div className="p-8">Error loading match history. Please try again later.</div>
      </div>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / 10);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Match History</h1>
      
      <MatchHistoryHeader />
      
      <MatchHistoryTable matches={data?.matches || []} />
      
      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`/history?page=${Math.max(1, currentPage - 1)}${currentMatchType ? `&type=${currentMatchType}` : ''}`} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink 
                  href={`/history?page=${i + 1}${currentMatchType ? `&type=${currentMatchType}` : ''}`}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href={`/history?page=${Math.min(totalPages, currentPage + 1)}${currentMatchType ? `&type=${currentMatchType}` : ''}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default function MatchHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-8 text-[#FAEBD7]">Match History</h1>
          <div className="p-8">Loading match history...</div>
        </div>
      }
    >
      <MatchHistoryContent />
    </Suspense>
  );
}
