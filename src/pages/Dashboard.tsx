import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TabNavigation from '@/components/dashboard/TabNavigation';
import BoothInfo from '@/components/dashboard/BoothInfo';
import StatsCard from '@/components/dashboard/StatsCard';
import VoterImport from '@/components/admin/VoterImport';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useBooths } from '@/hooks/useBooths';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('booth');

  const { data: booths, isLoading } = useBooths();

  // Redirect to auth if not logged in
  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const tabs = [
    { key: 'booth', labelKey: 'myBooth' },
    { key: 'import', labelKey: 'importData' },
    { key: 'map', labelKey: 'boothMapView' },
  ];

  // Use first booth for demo
  const currentBooth = booths?.[0];

  if (authLoading || isLoading) {
    return (
      <AppLayout>
        <div className="p-4 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </AppLayout>
    );
  }

  if (!currentBooth) {
    return (
      <AppLayout>
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="p-8 text-center">
          <p className="text-muted-foreground">
            {t('loading')}
          </p>
        </div>
      </AppLayout>
    );
  }

  // Calculate percentages
  const memberPercentage = currentBooth.total_voters > 0 
    ? (currentBooth.bjp_members / currentBooth.total_voters) * 100 
    : 0;
  const supporterPercentage = currentBooth.total_voters > 0 
    ? (currentBooth.bjp_supporters / currentBooth.total_voters) * 100 
    : 0;
  const doorPercentage = currentBooth.total_doors > 0 
    ? (currentBooth.doors_covered / currentBooth.total_doors) * 100 
    : 0;
  const pagePercentage = currentBooth.total_pages > 0 
    ? (currentBooth.pages_covered / currentBooth.total_pages) * 100 
    : 0;

  return (
    <AppLayout>
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'booth' ? (
        <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
          {/* Booth Info Card */}
          <BoothInfo
            boothNumber={currentBooth.booth_number}
            boothType={currentBooth.booth_type || '-'}
            boothDomain={currentBooth.booth_domain || '-'}
            boothIndex={currentBooth.booth_index || 0}
          />

          {/* Stats Cards - Grid on tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <StatsCard
              titleKey="membersVsVoters"
              percentageKey="memberPercentage"
              percentage={memberPercentage}
              totalKey="totalVoters"
              total={currentBooth.total_voters}
              coveredKey="bjpMembers"
              covered={currentBooth.bjp_members}
            />

            <StatsCard
              titleKey="supportersVsVoters"
              percentageKey="supporterPercentage"
              percentage={supporterPercentage}
              totalKey="totalVoters"
              total={currentBooth.total_voters}
              coveredKey="bjpSupporters"
              covered={currentBooth.bjp_supporters}
            />

            <StatsCard
              titleKey="doorsVsTotalDoors"
              percentageKey="doorPercentage"
              percentage={doorPercentage}
              totalKey="totalDoors"
              total={currentBooth.total_doors}
              coveredKey="doorsCovered"
              covered={currentBooth.doors_covered}
            />

            <StatsCard
              titleKey="pagesVsTotalPages"
              percentageKey="pagePercentage"
              percentage={pagePercentage}
              totalKey="totalPages"
              total={currentBooth.total_pages}
              coveredKey="pagesCovered"
              covered={currentBooth.pages_covered}
            />
          </div>
        </div>
      ) : activeTab === 'import' ? (
        <div className="p-3 sm:p-4 md:p-6">
          <VoterImport boothId={currentBooth?.id} />
        </div>
      ) : (
        <div className="p-3 sm:p-4 md:p-6">
          <div className="bg-muted rounded-lg h-64 sm:h-80 md:h-96 flex items-center justify-center">
            <div className="text-center text-muted-foreground px-4">
              <p className="text-base sm:text-lg font-semibold mb-2">
                {t('boothMapView')}
              </p>
              <p className="text-xs sm:text-sm">
                Google Maps integration coming soon
              </p>
              <p className="text-[10px] sm:text-xs mt-2">
                Add GOOGLE_MAPS_API_KEY to enable maps
              </p>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;
