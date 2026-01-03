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
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-white/10"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">{t('appName')}</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center gap-2 text-sm">
            <span className={language === 'en' ? 'font-bold' : 'opacity-70'}>Eng</span>
            <Switch
              checked={language === 'ta'}
              onCheckedChange={handleLanguageChange}
              className="data-[state=checked]:bg-white/30"
            />
            <span className={language === 'ta' ? 'font-bold' : 'opacity-70'}>தமிழ்</span>
          </div>

          {/* Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/10"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    {t('myBooth')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/feedback')}>
                    {t('shareYourVoice')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    {t('logout')}
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => navigate('/auth')}>
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
