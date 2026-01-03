import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import DoorCard from '@/components/doors/DoorCard';
import TabNavigation from '@/components/dashboard/TabNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Doors: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const tabs = [
    { key: 'doors', labelKey: 'door' },
  ];

  // Demo data
  const demoDoors = [
    {
      doorNumber: '1 (0/1)',
      votersCount: { current: 0, total: 1 },
      voters: [
        {
          name: 'Gomika',
          nameTamil: 'கோமிகா',
          fatherName: 'Panneer Selvam',
          voterId: 'WWQ1921667',
          age: 20,
          gender: 'female' as const,
        },
      ],
      isCovered: false,
    },
    {
      doorNumber: '1-13 (0/1)',
      votersCount: { current: 0, total: 1 },
      voters: [
        {
          name: 'Thurairasu',
          nameTamil: 'துரைராசு',
          fatherName: 'Muthusami',
          voterId: 'WWQ1548049',
          age: 62,
          gender: 'male' as const,
        },
      ],
      familyName: 'துரைராசு வீடு',
      isCovered: false,
    },
    {
      doorNumber: '1-134 (0/2)',
      votersCount: { current: 0, total: 2 },
      voters: [
        {
          name: 'Chandrasekar',
          nameTamil: 'சந்திரசேகரன்',
          fatherName: 'Ramasami',
          voterId: 'WWQ0154666',
          age: 56,
          gender: 'male' as const,
        },
        {
          name: 'Kamila',
          nameTamil: 'கமிலா',
          fatherName: 'Chandrasekar',
          voterId: 'WWQ0154674',
          age: 45,
          gender: 'female' as const,
        },
      ],
      isCovered: false,
    },
  ];

  return (
    <AppLayout>
      <TabNavigation tabs={tabs} activeTab="doors" onTabChange={() => {}} />
      
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4 text-foreground">
          {t('door')}கள்
        </h2>
        
        <div className="space-y-4">
          {demoDoors.map((door, index) => (
            <DoorCard
              key={index}
              doorNumber={door.doorNumber}
              votersCount={door.votersCount}
              voters={door.voters}
              familyName={door.familyName}
              isCovered={door.isCovered}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Doors;
