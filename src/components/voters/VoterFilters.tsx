import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Tab {
  key: string;
  labelKey: string;
}

interface VoterFiltersProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick?: () => void;
}

const VoterFilters: React.FC<VoterFiltersProps> = ({
  tabs,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onFilterClick,
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide bg-primary text-primary-foreground">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              'flex-shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase whitespace-nowrap transition-colors touch-target',
              activeTab === tab.key
                ? 'border-b-2 border-primary-foreground'
                : 'opacity-70 hover:opacity-100 active:opacity-100'
            )}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 px-3 sm:px-4 md:px-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('searchVoters')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10 sm:h-11"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onFilterClick}
          className="flex-shrink-0 h-10 w-10 sm:h-11 sm:w-11 touch-target"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VoterFilters;
