import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const FeedbackForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'complaint', labelKey: 'complaint' },
    { value: 'suggestion', labelKey: 'suggestion' },
    { value: 'feedback', labelKey: 'feedback' },
    { value: 'other', labelKey: 'other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: t('error'),
        description: 'Please login to submit feedback',
        variant: 'destructive',
      });
      return;
    }

    if (!category || !subject) {
      toast({
        title: t('error'),
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user.id,
          category,
          subject,
          description,
          status: 'open',
        });

      if (error) throw error;

      toast({
        title: t('success'),
        description: 'Your feedback has been submitted successfully',
      });

      // Reset form
      setCategory('');
      setSubject('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: t('error'),
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-6 max-w-2xl mx-auto">
      {/* Category */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-semibold text-foreground">
          {t('messageCategory')}:
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
            <SelectValue placeholder={t('selectCategory')} />
          </SelectTrigger>
          <SelectContent className="z-[60]">
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value} className="touch-target">
                {t(cat.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subject */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-semibold text-foreground">
          {t('messageSubject')}:
        </label>
        <Input
          type="text"
          placeholder={t('enterSubject')}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-10 sm:h-11 text-sm sm:text-base"
        />
      </div>

      {/* Description */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-semibold text-foreground">
          {t('messageDescription')}:
        </label>
        <Textarea
          placeholder={t('enterMessage')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
        />
      </div>

      {/* Attachments */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-semibold text-foreground">
          {t('attachments')}:
        </label>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start gap-2 h-10 sm:h-11 touch-target"
        >
          <Paperclip className="h-4 w-4" />
          <span className="text-muted-foreground text-sm">Add attachments</span>
        </Button>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 h-11 sm:h-12 text-sm sm:text-base touch-target"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('loading') : t('submit')}
      </Button>
    </form>
  );
};

export default FeedbackForm;
