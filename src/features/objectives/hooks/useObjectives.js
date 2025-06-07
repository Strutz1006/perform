import { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabase/client';
import { useAuth } from '../../../common/hooks/useAuth';

export const useObjectives = () => {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile?.company_id) {
      fetchObjectives();
    }
  }, [profile]);

  const fetchObjectives = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('objectives')
        .select(`
          *,
          goals (
            id,
            title,
            current_value,
            target_value,
            status
          )
        `)
        .eq('company_id', profile.company_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Calculate progress for each objective
      const objectivesWithProgress = data.map(obj => ({
        ...obj,
        progress: calculateObjectiveProgress(obj.goals)
      }));
      
      setObjectives(objectivesWithProgress);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateObjectiveProgress = (goals) => {
    if (!goals || goals.length === 0) return 0;
    const totalProgress = goals.reduce((sum, goal) => {
      const progress = (goal.current_value / goal.target_value) * 100;
      return sum + Math.min(progress, 100);
    }, 0);
    return Math.round(totalProgress / goals.length);
  };

  const createObjective = async (objective) => {
    try {
      const { data, error } = await supabase
        .from('objectives')
        .insert([{
          ...objective,
          company_id: profile.company_id,
          created_by: profile.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setObjectives([data, ...objectives]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateObjective = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('objectives')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setObjectives(objectives.map(obj => obj.id === id ? data : obj));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const deleteObjective = async (id) => {
    try {
      const { error } = await supabase
        .from('objectives')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setObjectives(objectives.filter(obj => obj.id !== id));
      return { error: null };
    } catch (err) {
      return { error: err };
    }
  };

  return {
    objectives,
    loading,
    error,
    createObjective,
    updateObjective,
    deleteObjective,
    refetch: fetchObjectives
  };
};