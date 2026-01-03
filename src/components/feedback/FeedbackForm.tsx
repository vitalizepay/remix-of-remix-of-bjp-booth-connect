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
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t('messageCategory')}:
        </label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder={t('selectCategory')} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {t(cat.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t('messageSubject')}:
        </label>
        <Input
          type="text"
          placeholder={t('enterSubject')}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t('messageDescription')}:
        </label>
        <Textarea
          placeholder={t('enterMessage')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
        />
      </div>

      {/* Attachments */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t('attachments')}:
        </label>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start gap-2"
        >
          <Paperclip className="h-4 w-4" />
          <span className="text-muted-foreground">Add attachments</span>
        </Button>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('loading') : t('submit')}
      </Button>
    </form>
  );
};

export default FeedbackForm;
