import React from 'react';
import { Menu, MoreVertical } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLanguageChange = () => {
    setLanguage(language === 'ta' ? 'en' : 'ta');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bjp-header sticky top-0 z-50 safe-area-top">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-white/10 touch-target h-10 w-10"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <h1 className="text-lg sm:text-xl font-bold truncate max-w-[150px] sm:max-w-none">{t('appName')}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <span className={cn(
              'hidden xs:inline transition-opacity',
              language === 'en' ? 'font-bold' : 'opacity-70'
            )}>Eng</span>
            <span className={cn(
              'xs:hidden',
              language === 'en' ? 'font-bold' : 'opacity-70'
            )}>En</span>
            <Switch
              checked={language === 'ta'}
              onCheckedChange={handleLanguageChange}
              className="data-[state=checked]:bg-white/30 scale-90 sm:scale-100"
            />
            <span className={language === 'ta' ? 'font-bold' : 'opacity-70'}>தமி</span>
          </div>

          {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/10 touch-target h-10 w-10"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px] z-[60]">
              {user ? (
                <>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="touch-target">
                    {t('myBooth')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/feedback')} className="touch-target">
                    {t('shareYourVoice')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="touch-target">
                    {t('logout')}
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => navigate('/auth')} className="touch-target">
                  {t('login')}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
