import React from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import Home from '@/pages/Home';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Home />
    </div>
  );
};

export default Index;
