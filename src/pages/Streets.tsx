import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TabNavigation from '@/components/dashboard/TabNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const Streets: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const tabs = [
    { key: 'streets', labelKey: 'street' },
  ];

  // Demo data
  const demoStreets = [
    { name: 'Main Street', nameTamil: 'பிரதான தெரு', pages: 5, doors: 45 },
    { name: 'Temple Road', nameTamil: 'கோவில் சாலை', pages: 3, doors: 28 },
    { name: 'Market Street', nameTamil: 'சந்தை தெரு', pages: 4, doors: 36 },
    { name: 'School Lane', nameTamil: 'பள்ளி தெரு', pages: 2, doors: 18 },
  ];

  return (
    <AppLayout>
      <TabNavigation tabs={tabs} activeTab="streets" onTabChange={() => {}} />
      
      <div className="p-3 sm:p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {demoStreets.map((street, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]">
              <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <span className="truncate">{language === 'ta' ? street.nameTamil : street.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <span>{t('totalPages')}: {street.pages}</span>
                  <span>{t('totalDoors')}: {street.doors}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Streets;
