import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
});

const Auth: React.FC = () => {
  const { t, language } = useLanguage();
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate input
      if (isLogin) {
        loginSchema.parse({ email, password });
      } else {
        signupSchema.parse({ email, password, fullName });
      }

      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: t('error'),
              description: language === 'ta' 
                ? 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்'
                : 'Invalid email or password',
              variant: 'destructive',
            });
          } else {
            throw error;
          }
        } else {
          navigate('/dashboard');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: t('error'),
              description: language === 'ta'
                ? 'இந்த மின்னஞ்சல் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது'
                : 'This email is already registered',
              variant: 'destructive',
            });
          } else {
            throw error;
          }
        } else {
          toast({
            title: t('success'),
            description: language === 'ta'
              ? 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!'
              : 'Account created successfully!',
          });
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          title: t('error'),
          description: error.errors[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('error'),
          description: error.message || 'An error occurred',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bjp-header px-4 py-6 text-center safe-area-top">
        <h1 className="text-2xl font-bold">{t('appName')}</h1>
      </div>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
            <h2 className="text-2xl font-bold text-center text-foreground mb-6">
              {isLogin ? t('welcomeBack') : t('createAccount')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('fullName')}</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ta' ? 'உங்கள் பெயர்' : 'Enter your name'}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'ta' ? 'உங்கள் மின்னஞ்சல்' : 'Enter your email'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'ta' ? 'கடவுச்சொல்' : 'Enter password'}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? t('loading') : isLogin ? t('login') : t('signup')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? t('noAccount') : t('haveAccount')}{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-semibold hover:underline"
                >
                  {isLogin ? t('signup') : t('login')}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
