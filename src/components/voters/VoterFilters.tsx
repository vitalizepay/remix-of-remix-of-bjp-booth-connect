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
    <div className="space-y-3">
      {/* Tabs */}
      <div className="flex overflow-x-auto bg-primary text-primary-foreground">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={cn(
              'flex-shrink-0 px-4 py-2.5 text-sm font-semibold uppercase whitespace-nowrap transition-colors',
              activeTab === tab.key
                ? 'border-b-2 border-primary-foreground'
                : 'opacity-70 hover:opacity-100'
            )}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 px-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('searchVoters')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onFilterClick}
          className="flex-shrink-0"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default VoterFilters;
