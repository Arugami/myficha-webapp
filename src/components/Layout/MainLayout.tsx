import { Sidebar } from "../Navigation/Sidebar";
import { MobileNav } from "../Navigation/MobileNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:pl-[250px] pb-[72px] md:pb-0 min-h-screen">
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
};