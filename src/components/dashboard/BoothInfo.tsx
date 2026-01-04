import React from 'react';
import { MoreVertical } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface BoothInfoProps {
  boothNumber: string;
  boothType: string;
  boothDomain: string;
  boothIndex: number;
  mapPreviewUrl?: string;
}

const BoothInfo: React.FC<BoothInfoProps> = ({
  boothNumber,
  boothType,
  boothDomain,
  boothIndex,
  mapPreviewUrl,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-card rounded-lg border border-border p-3 sm:p-4">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-foreground">
          {t('boothNumber')}: {boothNumber}
        </h2>
        <Button variant="ghost" size="icon" className="h-8 w-8 touch-target">
          <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-1 gap-2 sm:space-y-2">
          <div>
            <p className="text-xs sm:text-sm font-semibold text-foreground">{t('boothType')}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{boothType}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-foreground">{t('boothDomain')}</p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{boothDomain}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-foreground">{t('boothIndex')}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">{boothIndex}</p>
          </div>
        </div>

        {/* Map Preview */}
        <div className="w-full sm:w-32 h-24 sm:h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          {mapPreviewUrl ? (
            <img
              src={mapPreviewUrl}
              alt="Map preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground text-xs">
                <div className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 rounded-full bg-destructive flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                </div>
                <span>Map</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoothInfo;
