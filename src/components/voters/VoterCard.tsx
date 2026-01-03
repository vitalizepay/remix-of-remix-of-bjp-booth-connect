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
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Voter Header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50">
        <div className={cn('w-3 h-3 rounded-full', indicatorColor)} />
        <h3 className="flex-1 font-semibold text-foreground">
          {index} - {language === 'ta' && nameTamil ? nameTamil : name}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {actions.map((action) => (
              <DropdownMenuItem
                key={action}
                onClick={() => onAction?.(action)}
              >
                {t(action)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Voter Content */}
      <div className="flex gap-4 p-4">
        {/* Photo */}
        <div className="w-20 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-border">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <User className="w-8 h-8 mx-auto" />
              <p className="text-[10px] mt-1">NO IMAGE<br />AVAILABLE</p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex-1 space-y-1 text-sm">
          {fatherName && (
            <p className="text-muted-foreground">
              {t('fatherName')}: {fatherName}
            </p>
          )}
          <p className="text-muted-foreground">
            {t('voterId')}: {voterId}
          </p>
          <p className="text-muted-foreground">
            {t('age')}:{age} | {t('gender')}: {t(gender)}
          </p>
          <p className="text-muted-foreground">
            {t('doorNumber')}: {doorNumber}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 pt-2">
            <Badge className={cn('text-xs', statusBadge.className)}>
              {statusBadge.label}
            </Badge>
            {religion && (
              <Badge variant="outline" className="text-xs bg-red-100 text-red-700 border-red-200">
                {religion}
              </Badge>
            )}
            {community && (
              <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
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
