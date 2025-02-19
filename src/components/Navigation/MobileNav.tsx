import { Home, Dice1, User, Trophy, History, Settings } from "lucide-react";
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Dice1, label: "Play", path: "/play" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
  { icon: History, label: "Match History", path: "/history" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const MobileNav = () => {
  const pathname = usePathname();
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex justify-around p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "p-3 rounded-lg transition-colors duration-200",
              location.pathname === item.path
                ? "text-primary bg-primary/10"
                : "text-foreground/60 hover:text-primary hover:bg-primary/5"
            )}
            aria-label={item.label}
          >
            <item.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>
    </nav>
  );
};