import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import FeedbackForm from '@/components/feedback/FeedbackForm';
import TabNavigation from '@/components/dashboard/TabNavigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Feedback: React.FC = () => {
  const { t } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const tabs = [
    { key: 'feedback', labelKey: 'shareYourVoice' },
  ];

  return (
    <AppLayout>
      <TabNavigation tabs={tabs} activeTab="feedback" onTabChange={() => {}} />
      <FeedbackForm />
    </AppLayout>
  );
};

export default Feedback;
