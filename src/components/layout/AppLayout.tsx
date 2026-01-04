import React, { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, showBottomNav = true }) => {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col safe-area-left safe-area-right">
      <Header />
      <main className={`flex-1 overflow-x-hidden ${showBottomNav ? 'pb-20 md:pb-24' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
