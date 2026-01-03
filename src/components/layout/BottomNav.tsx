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
    <nav className="bottom-nav safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path === '/dashboard' && location.pathname === '/');
          
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={cn('bottom-nav-item flex-1', isActive && 'active')}
            >
              <Icon className={cn('h-6 w-6 mb-1', isActive && 'text-primary')} />
              <span className="text-xs font-medium">{t(item.key)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
