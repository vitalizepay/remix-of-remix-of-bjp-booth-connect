import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import TabNavigation from '@/components/dashboard/TabNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Pages: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const tabs = [
    { key: 'pages', labelKey: 'page' },
  ];

  // Demo data
  const demoPages = [
    { number: 1, totalDoors: 15, doorsCovered: 8, assignedTo: 'Volunteer 1' },
    { number: 2, totalDoors: 12, doorsCovered: 12, assignedTo: 'Volunteer 2' },
    { number: 3, totalDoors: 18, doorsCovered: 5, assignedTo: 'Volunteer 1' },
    { number: 4, totalDoors: 10, doorsCovered: 0, assignedTo: null },
    { number: 5, totalDoors: 14, doorsCovered: 10, assignedTo: 'Volunteer 3' },
  ];

  return (
    <AppLayout>
      <TabNavigation tabs={tabs} activeTab="pages" onTabChange={() => {}} />
      
      <div className="p-4 space-y-4">
        {demoPages.map((page) => {
          const progress = page.totalDoors > 0 
            ? (page.doorsCovered / page.totalDoors) * 100 
            : 0;
          const isComplete = page.doorsCovered === page.totalDoors;
          
          return (
            <Card 
              key={page.number} 
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    {t('page')} {page.number}
                  </div>
                  {isComplete ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t('doorsCovered')}: {page.doorsCovered}/{page.totalDoors}
                  </span>
                  <span className="font-medium">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                {page.assignedTo && (
                  <p className="text-sm text-muted-foreground">
                    {language === 'ta' ? 'ஒதுக்கப்பட்டது' : 'Assigned to'}: {page.assignedTo}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default Pages;
