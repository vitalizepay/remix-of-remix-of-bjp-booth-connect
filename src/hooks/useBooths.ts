import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Booth {
  id: string;
  booth_number: string;
  booth_type: string | null;
  booth_domain: string | null;
  booth_index: number | null;
  latitude: number | null;
  longitude: number | null;
  total_voters: number;
  total_doors: number;
  total_pages: number;
  bjp_members: number;
  bjp_supporters: number;
  doors_covered: number;
  pages_covered: number;
}

export const useBooths = () => {
  return useQuery({
    queryKey: ['booths'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('booths')
        .select('*')
        .order('booth_number');

      if (error) throw error;
      return data as Booth[];
    },
  });
};

export const useBooth = (boothId: string | undefined) => {
  return useQuery({
    queryKey: ['booth', boothId],
    queryFn: async () => {
      if (!boothId) return null;
      
      const { data, error } = await supabase
        .from('booths')
        .select('*')
        .eq('id', boothId)
        .maybeSingle();

      if (error) throw error;
      return data as Booth | null;
    },
    enabled: !!boothId,
  });
};
