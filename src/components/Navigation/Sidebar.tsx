
import { Home, Dice1, User, Trophy, History, Settings, Sun } from "lucide-react";
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

export const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <aside className="hidden md:flex flex-col w-[250px] h-screen bg-card fixed left-0 top-0 border-r border-border">
      <div className="p-4 border-b border-border">
        <Link 
          to="/" 
          className="inline-block transition-colors hover:text-primary/80"
        >
          <h1 className="text-2xl font-bold text-primary">MyFicha</h1>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "nav-item",
              location.pathname === item.path && "active"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
