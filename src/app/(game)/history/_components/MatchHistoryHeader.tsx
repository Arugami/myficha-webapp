'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

export const MatchHistoryHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    setMounted(true);
    setSelectedType(searchParams.get('type') || 'all');
  }, [searchParams]);

  const handleMatchTypeChange = (value: string) => {
    const currentPage = searchParams.get('page') || '1';
    router.push(`/history?page=${currentPage}${value !== 'all' ? `&type=${value}` : ''}`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 animate-fadeIn">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#FAEBD7] font-inter tracking-tight mb-2">
          Match History
        </h1>
        <p className="text-[#FAEBD7]/60">View and analyze your past matches</p>
      </div>
      <Select
        value={selectedType}
        onValueChange={handleMatchTypeChange}
      >
        <SelectTrigger className="w-[180px] bg-black/20 border-[#FFC107]/20 text-[#FAEBD7] hover:bg-black/30 transition-colors">
          <SelectValue placeholder="Filter by match type" />
        </SelectTrigger>
        <SelectContent className="bg-[#001F3F] border-[#FFC107]/20">
          <SelectItem value="all" className="text-[#FAEBD7] hover:bg-[#FFC107]/10">
            All Matches
          </SelectItem>
          <SelectItem value="1v1" className="text-[#FAEBD7] hover:bg-[#FFC107]/10">
            1v1 Matches
          </SelectItem>
          <SelectItem value="2v2" className="text-[#FAEBD7] hover:bg-[#FFC107]/10">
            2v2 Matches
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};