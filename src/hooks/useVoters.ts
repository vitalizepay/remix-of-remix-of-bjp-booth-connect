import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Voter {
  id: string;
  voter_id: string | null;
  name: string;
  name_tamil: string | null;
  father_name: string | null;
  father_name_tamil: string | null;
  age: number | null;
  gender: 'male' | 'female' | 'other' | null;
  address: string | null;
  phone: string | null;
  photo_url: string | null;
  door_number: string | null;
  page_number: number | null;
  support_status: 'supporter' | 'neutral' | 'opponent' | 'postal_voter' | 'dead' | 'deleted';
  religion: string | null;
  community: string | null;
  is_member: boolean;
  is_family_member: boolean;
  booth_id: string | null;
}

interface UseVotersOptions {
  boothId?: string;
  filter?: 'all' | 'voters' | 'members' | 'cadres' | 'volunteers';
  searchQuery?: string;
}

export const useVoters = (options: UseVotersOptions = {}) => {
  const { boothId, filter = 'all', searchQuery } = options;

  return useQuery({
    queryKey: ['voters', boothId, filter, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('voters')
        .select('*')
        .order('name');

      if (boothId) {
        query = query.eq('booth_id', boothId);
      }

      if (filter === 'members') {
        query = query.eq('is_member', true);
      }

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,voter_id.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.limit(100);

      if (error) throw error;
      return data as Voter[];
    },
  });
};
