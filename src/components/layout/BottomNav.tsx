import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Building2, MapPin, FileText, DoorOpen, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface NavItem {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  { key: 'booth', icon: Building2, path: '/dashboard' },
  { key: 'street', icon: MapPin, path: '/streets' },
  { key: 'page', icon: FileText, path: '/pages' },
  { key: 'door', icon: DoorOpen, path: '/doors' },
  { key: 'voter', icon: Users, path: '/voters' },
];

const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav safe-area-bottom shadow-lg">
      <div className="flex items-center justify-around max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path === '/dashboard' && location.pathname === '/');
          
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={cn(
                'bottom-nav-item flex-1 touch-target transition-all duration-200',
                isActive && 'active scale-105'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 sm:h-6 sm:w-6 mb-1 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )} />
              <span className={cn(
                'text-[10px] sm:text-xs font-medium truncate max-w-[60px]',
                isActive && 'text-primary'
              )}>
                {t(item.key)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
