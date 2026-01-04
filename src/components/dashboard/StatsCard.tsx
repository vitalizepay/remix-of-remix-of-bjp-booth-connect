import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatsCardProps {
  titleKey: string;
  percentageKey: string;
  percentage: number;
  totalKey: string;
  total: number;
  coveredKey: string;
  covered: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  titleKey,
  percentageKey,
  percentage,
  totalKey,
  total,
  coveredKey,
  covered,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="stats-card">
      <div className="stats-card-header text-sm sm:text-base">
        {t(titleKey)}
      </div>
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <div className="text-center">
          <p className="text-base sm:text-lg font-bold text-foreground">
            {t(percentageKey)}: {percentage.toFixed(2)}%
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {t(totalKey)}: {total}
          </p>
        </div>
        
        <div className="relative">
          <Progress value={percentage} className="h-1.5 sm:h-2 progress-saffron" />
        </div>
        
        <p className="text-xs sm:text-sm text-muted-foreground text-center">
          {language === 'ta' 
            ? `${t(coveredKey)}: ${covered} ${t('outOf')} ${total}`
            : `${t(coveredKey)}: ${covered} ${t('outOf')} ${total}`
          }
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
