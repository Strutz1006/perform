import { supabase } from '../../services/supabase/client';

export const useSupabase = () => {
  return supabase;
};