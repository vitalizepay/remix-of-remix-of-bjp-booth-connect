import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Voter {
  name: string;
  nameTamil?: string;
  fatherName?: string;
  voterId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  photoUrl?: string;
}

interface DoorCardProps {
  doorNumber: string;
  votersCount: { current: number; total: number };
  voters: Voter[];
  familyName?: string;
  isCovered?: boolean;
}

const DoorCard: React.FC<DoorCardProps> = ({
  doorNumber,
  votersCount,
  voters,
  familyName,
  isCovered = false,
}) => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Door Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
        <div className={cn(
          'w-3 h-3 rounded-full',
          isCovered ? 'bg-green-500' : 'bg-yellow-500'
        )} />
        <h3 className="font-semibold text-foreground">
          {t('door')} {t('boothNumber').split(' ')[0]}: {doorNumber} ({votersCount.current}/{votersCount.total})
        </h3>
      </div>

      {/* Voters List */}
      <div className="divide-y divide-border">
        {voters.map((voter, index) => (
          <div key={voter.voterId} className="flex gap-3 p-3">
            {/* Voter Photo */}
            <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0 flex items-center justify-center border border-border">
              {voter.photoUrl ? (
                <img
                  src={voter.photoUrl}
                  alt={voter.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-muted-foreground text-[10px]">
                  NO IMAGE<br />AVAILABLE
                </div>
              )}
            </div>

            {/* Voter Info */}
            <div className="flex-1 text-sm">
              <p className="font-semibold text-foreground">
                {index + 1}.{language === 'ta' && voter.nameTamil ? voter.nameTamil : voter.name}
              </p>
              {voter.fatherName && (
                <p className="text-muted-foreground">
                  {t('fatherName')}: {voter.fatherName}
                </p>
              )}
              <p className="text-muted-foreground">
                {t('voterId')}: {voter.voterId}
              </p>
              <p className="text-muted-foreground">
                {t('age')}:{voter.age} | {t('gender')}: {t(voter.gender)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Family Name */}
      {familyName && (
        <div className="px-4 py-2 bg-muted/30 border-t border-border">
          <p className="text-sm text-center text-muted-foreground font-medium">
            {familyName}
          </p>
        </div>
      )}
    </div>
  );
};

export default DoorCard;
