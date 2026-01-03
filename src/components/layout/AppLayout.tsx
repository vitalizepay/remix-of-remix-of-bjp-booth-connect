import React, { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, showBottomNav = true }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className={`flex-1 ${showBottomNav ? 'pb-20' : ''}`}>
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
