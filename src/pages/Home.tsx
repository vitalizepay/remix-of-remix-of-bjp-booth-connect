import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Building2, FileText } from 'lucide-react';
import landingBanner from '@/assets/landing-banner.png';
import landingSpeaker from '@/assets/landing-speaker.png';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger initial animation
    const timer1 = setTimeout(() => setIsLoaded(true), 100);
    const timer2 = setTimeout(() => setShowContent(true), 800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const features = [
    {
      icon: Building2,
      title: language === 'ta' ? 'பூத் மேலாண்மை' : 'Booth Management',
      description: language === 'ta' 
        ? 'உங்கள் பூத் விவரங்களை திறமையாக நிர்வகிக்கவும்'
        : 'Efficiently manage your booth details and coverage',
    },
    {
      icon: Users,
      title: language === 'ta' ? 'வாக்காளர் தரவு' : 'Voter Data',
      description: language === 'ta'
        ? 'வாக்காளர் தகவல்களை எளிதாக அணுகவும்'
        : 'Access and manage voter information easily',
    },
    {
      icon: FileText,
      title: language === 'ta' ? 'அறிக்கைகள்' : 'Reports',
      description: language === 'ta'
        ? 'விரிவான புள்ளிவிவரங்கள் மற்றும் அறிக்கைகள்'
        : 'Detailed statistics and progress reports',
    },
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background overflow-hidden">
      {/* Hero Section with Animated Banner */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] overflow-hidden">
        {/* Animated Background Image */}
        <div 
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
        >
          <img
            src={landingBanner}
            alt="Atmanirbhar Bharat"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </div>

        {/* Animated Content Overlay */}
        <div 
          className={`relative z-10 h-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex flex-col justify-end pb-8 sm:pb-12 px-4 transition-all duration-700 delay-500 ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Title */}
            <h1 
              className={`text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 transition-all duration-700 delay-700 ${
                showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <span className="text-primary">Atmanirbhar Bharat</span>
            </h1>
            
            <p 
              className={`text-base sm:text-lg md:text-xl text-muted-foreground mb-1 sm:mb-2 transition-all duration-700 delay-900 ${
                showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              Har Ghar Swadeshi, Ghar-Ghar Swadeshi
            </p>
            
            <p 
              className={`text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 transition-all duration-700 delay-1000 ${
                showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {t('boothVoterManagement')}
            </p>
            
            {/* CTA Button with Animation */}
            <div 
              className={`flex gap-4 justify-center transition-all duration-700 delay-1100 ${
                showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 h-11 sm:h-12 px-6 sm:px-8 touch-target"
                onClick={() => navigate('/auth')}
              >
                {t('login')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute top-10 left-5 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-5 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-saffron/20 blur-2xl animate-pulse delay-500" />
      </section>

      {/* Speaker Section with Slide-in Animation */}
      <section className="py-8 sm:py-12 px-4 bg-gradient-to-b from-background to-card">
        <div className="max-w-4xl mx-auto">
          <div 
            className={`flex flex-col md:flex-row items-center gap-6 sm:gap-8 transition-all duration-1000 delay-300 ${
              showContent ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            {/* Speaker Image */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-saffron to-primary rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <img
                src={landingSpeaker}
                alt="Leadership"
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                {language === 'ta' ? 'தலைமை' : 'Leadership'}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                {language === 'ta'
                  ? 'சமூக மேம்பாட்டிற்காக அர்ப்பணிப்புடன் பணியாற்றுவது'
                  : 'Dedicated service for community development and progress'
                }
              </p>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/auth')}
                className="hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-300 h-11 sm:h-12 touch-target"
              >
                {t('getStarted')}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Staggered Animation */}
      <section className="py-8 sm:py-12 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 
            className={`text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-foreground transition-all duration-700 ${
              showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {language === 'ta' ? 'அம்சங்கள்' : 'Features'}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-background rounded-xl p-4 sm:p-6 shadow-sm border border-border hover:shadow-lg hover:border-primary/30 transform hover:-translate-y-2 active:scale-[0.98] transition-all duration-300 ${
                    showContent 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${1200 + index * 150}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1.5 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 px-4 pb-24 sm:pb-12 bg-gradient-to-b from-card to-muted">
        <div 
          className={`max-w-md mx-auto text-center transition-all duration-700 delay-1500 ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
            {language === 'ta' 
              ? 'இப்போதே தொடங்குங்கள்'
              : 'Get Started Today'
            }
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            {language === 'ta'
              ? 'உங்கள் பூத் மேலாண்மையை எளிதாக்குங்கள்'
              : 'Streamline your booth management process'
            }
          </p>
          <Button
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 h-11 sm:h-12 touch-target"
            onClick={() => navigate('/auth')}
          >
            {t('login')} / {t('signup')}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
