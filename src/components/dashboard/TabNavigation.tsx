import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface Tab {
  key: string;
  labelKey: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  const { t } = useLanguage();

  return (
    <div className="flex bg-primary">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn(
            'flex-1 py-3 px-4 text-sm font-semibold uppercase tracking-wide transition-colors',
            activeTab === tab.key
              ? 'text-primary-foreground border-b-2 border-primary-foreground'
              : 'text-primary-foreground/70 hover:text-primary-foreground'
          )}
        >
          {t(tab.labelKey)}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
