import { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabase/client';
import { useAuth } from '../../../common/hooks/useAuth';

export const useGoals = (objectiveId = null) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile?.company_id) {
      fetchGoals();
    }
  }, [profile, objectiveId]);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('goals')
        .select(`
          *,
          objective:objectives (
            id,
            title
          ),
          assigned_to:profiles (
            id,
            full_name
          )
        `);

      if (objectiveId) {
        query = query.eq('objective_id', objectiveId);
      } else {
        // Get all goals for the company
        query = query.in('objective_id', 
          supabase
            .from('objectives')
            .select('id')
            .eq('company_id', profile.company_id)
        );
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      
      setGoals(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (goal) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([goal])
        .select()
        .single();

      if (error) throw error;
      
      setGoals([data, ...goals]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateGoal = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setGoals(goals.map(goal => goal.id === id ? data : goal));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateProgress = async (goalId, value, notes = '') => {
    try {
      // Insert progress update
      const { error: progressError } = await supabase
        .from('progress_updates')
        .insert([{
          goal_id: goalId,
          user_id: profile.id,
          value,
          notes
        }]);

      if (progressError) throw progressError;

      // Update goal current value
      const { data, error } = await supabase
        .from('goals')
        .update({ current_value: value })
        .eq('id', goalId)
        .select()
        .single();

      if (error) throw error;
      
      setGoals(goals.map(goal => goal.id === goalId ? data : goal));
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  return {
    goals,
    loading,
    error,
    createGoal,
    updateGoal,
    updateProgress,
    refetch: fetchGoals
  };
};