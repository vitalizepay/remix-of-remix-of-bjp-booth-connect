import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import VoterFilters from '@/components/voters/VoterFilters';
import VoterCard from '@/components/voters/VoterCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useVoters } from '@/hooks/useVoters';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const Voters: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect to auth if not logged in
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const { data: voters, isLoading } = useVoters({
    filter: activeTab as any,
    searchQuery,
  });

  const tabs = [
    { key: 'all', labelKey: 'all' },
    { key: 'voters', labelKey: 'voters' },
    { key: 'members', labelKey: 'members' },
    { key: 'cadres', labelKey: 'cadres' },
    { key: 'volunteers', labelKey: 'volunteers' },
  ];

  const handleVoterAction = (voterId: string, action: string) => {
    toast({
      title: t(action),
      description: `Action triggered for voter`,
    });
  };

  // Demo voters if no data from DB
  const demoVoters = [
    {
      id: '1',
      voter_id: 'WWQ1921667',
      name: 'Gomika',
      name_tamil: 'கோமிகா',
      father_name: 'Panneer Selvam',
      age: 20,
      gender: 'female' as const,
      door_number: '1',
      support_status: 'dead' as const,
      religion: 'Hindu',
      community: 'BC',
      is_member: false,
      is_family_member: false,
      photo_url: null,
      page_number: 1,
      address: null,
      phone: null,
      booth_id: null,
      care_taker_id: null,
      door_id: null,
      father_name_tamil: null,
    },
    {
      id: '2',
      voter_id: 'WWQ0603712',
      name: 'Revathi',
      name_tamil: 'ரேவதி',
      father_name: 'Muthamizh Selvan',
      age: 40,
      gender: 'female' as const,
      door_number: '1-4',
      support_status: 'supporter' as const,
      religion: 'Hindu',
      community: 'BC',
      is_member: false,
      is_family_member: false,
      photo_url: null,
      page_number: 1,
      address: null,
      phone: null,
      booth_id: null,
      care_taker_id: null,
      door_id: null,
      father_name_tamil: null,
    },
    {
      id: '3',
      voter_id: 'WWQ1548049',
      name: 'Thurairasu',
      name_tamil: 'துரைராசு',
      father_name: 'Muthusami',
      age: 62,
      gender: 'male' as const,
      door_number: '1-13',
      support_status: 'postal_voter' as const,
      religion: null,
      community: null,
      is_member: false,
      is_family_member: false,
      photo_url: null,
      page_number: 1,
      address: null,
      phone: null,
      booth_id: null,
      care_taker_id: null,
      door_id: null,
      father_name_tamil: null,
    },
    {
      id: '4',
      voter_id: 'WWQ1548050',
      name: 'Muthamizh Selvan',
      name_tamil: 'முத்தமிழ்ச்செல்வன்',
      father_name: 'Subramaniyan',
      age: 51,
      gender: 'male' as const,
      door_number: '1-38A',
      support_status: 'neutral' as const,
      religion: null,
      community: null,
      is_member: false,
      is_family_member: false,
      photo_url: null,
      page_number: 1,
      address: null,
      phone: null,
      booth_id: null,
      care_taker_id: null,
      door_id: null,
      father_name_tamil: null,
    },
  ];

  const displayVoters = voters?.length ? voters : demoVoters;

  if (authLoading) {
    return (
      <AppLayout>
        <div className="p-4 space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <VoterFilters
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="p-4 space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </>
        ) : (
          displayVoters.map((voter, index) => (
            <VoterCard
              key={voter.id}
              index={index + 1}
              name={voter.name}
              nameTamil={voter.name_tamil || undefined}
              fatherName={voter.father_name || undefined}
              voterId={voter.voter_id || 'N/A'}
              age={voter.age || 0}
              gender={voter.gender || 'other'}
              doorNumber={voter.door_number || '-'}
              photoUrl={voter.photo_url || undefined}
              supportStatus={voter.support_status}
              religion={voter.religion || undefined}
              community={voter.community || undefined}
              onAction={(action) => handleVoterAction(voter.id, action)}
            />
          ))
        )}
      </div>
    </AppLayout>
  );
};

export default Voters;
