import React from 'react';
import { MoreVertical, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface VoterCardProps {
  index: number;
  name: string;
  nameTamil?: string;
  fatherName?: string;
  voterId: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  doorNumber: string;
  photoUrl?: string;
  supportStatus: 'supporter' | 'neutral' | 'opponent' | 'postal_voter' | 'dead' | 'deleted';
  religion?: string;
  community?: string;
  onAction?: (action: string) => void;
}

const VoterCard: React.FC<VoterCardProps> = ({
  index,
  name,
  nameTamil,
  fatherName,
  voterId,
  age,
  gender,
  doorNumber,
  photoUrl,
  supportStatus,
  religion,
  community,
  onAction,
}) => {
  const { t, language } = useLanguage();

  const getStatusBadge = () => {
    const statusConfig = {
      supporter: { label: t('supporter'), className: 'badge-supporter' },
      neutral: { label: t('neutral'), className: 'badge-neutral' },
      opponent: { label: t('opponent'), className: 'badge-opponent' },
      postal_voter: { label: t('postalVoter'), className: 'badge-postal' },
      dead: { label: t('deadDeleted'), className: 'bg-gray-500 text-white' },
      deleted: { label: t('deadDeleted'), className: 'bg-gray-500 text-white' },
    };
    return statusConfig[supportStatus];
  };

  const statusBadge = getStatusBadge();

  // Indicator color based on status
  const indicatorColor = {
    supporter: 'bg-green-500',
    neutral: 'bg-yellow-500',
    opponent: 'bg-red-500',
    postal_voter: 'bg-blue-500',
    dead: 'bg-gray-500',
    deleted: 'bg-gray-500',
  }[supportStatus];

  const actions = [
    'addVoterMobile',
    'attachVoterPhoto',
    'convertAsMember',
    'convertAsFamilyMember',
    'enhanceVoter',
    'sendBoothSlip',
    'sendMessage',
    'assignCareTaker',
    'markAsDone',
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      {/* Voter Header */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-muted/50">
        <div className={cn('w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0', indicatorColor)} />
        <h3 className="flex-1 font-semibold text-foreground text-sm sm:text-base truncate">
          {index} - {language === 'ta' && nameTamil ? nameTamil : name}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 touch-target flex-shrink-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 z-[60]">
            {actions.map((action) => (
              <DropdownMenuItem
                key={action}
                onClick={() => onAction?.(action)}
                className="touch-target"
              >
                {t(action)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Voter Content */}
      <div className="flex gap-3 sm:gap-4 p-3 sm:p-4">
        {/* Photo */}
        <div className="w-16 h-20 sm:w-20 sm:h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-border">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <User className="w-6 h-6 sm:w-8 sm:h-8 mx-auto" />
              <p className="text-[8px] sm:text-[10px] mt-1">NO IMAGE<br />AVAILABLE</p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1 text-xs sm:text-sm">
          {fatherName && (
            <p className="text-muted-foreground truncate">
              {t('fatherName')}: {fatherName}
            </p>
          )}
          <p className="text-muted-foreground truncate">
            {t('voterId')}: {voterId}
          </p>
          <p className="text-muted-foreground">
            {t('age')}:{age} | {t('gender')}: {t(gender)}
          </p>
          <p className="text-muted-foreground">
            {t('doorNumber')}: {doorNumber}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 pt-1.5 sm:pt-2">
            <Badge className={cn('text-[10px] sm:text-xs px-1.5 sm:px-2', statusBadge.className)}>
              {statusBadge.label}
            </Badge>
            {religion && (
              <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2 bg-red-100 text-red-700 border-red-200">
                {religion}
              </Badge>
            )}
            {community && (
              <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2 bg-gray-100 text-gray-700 border-gray-200">
                {community}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterCard;
