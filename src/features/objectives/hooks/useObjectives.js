import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../../services/supabase/client';

// Mock data for when Supabase isn't configured
const mockObjectives = [
  {
    id: '1',
    title: "Increase Market Share",
    description: "Expand our presence in key markets",
    progress: 65,
    goals: [
      { id: '1', title: "Launch in 3 new regions", current_value: 75, target_value: 100, status: "on-track" },
      { id: '2', title: "Achieve 20% YoY growth", current_value: 60, target_value: 100, status: "at-risk" }
    ]
  }
];

export const useObjectives = () => {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchObjectives();
  }, []);

  const fetchObjectives = async () => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using mock data');
      setObjectives(mockObjectives);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching objectives from Supabase...');
      
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
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched objectives:', data);
      
      // Calculate progress for each objective
      const objectivesWithProgress = (data || []).map(obj => ({
        ...obj,
        progress: calculateObjectiveProgress(obj.goals)
      }));
      
      setObjectives(objectivesWithProgress);
    } catch (err) {
      console.error('Error fetching objectives:', err);
      setError(err);
      // Fall back to mock data on error
      setObjectives(mockObjectives);
    } finally {
      setLoading(false);
    }
  };

  const calculateObjectiveProgress = (goals) => {
    if (!goals || goals.length === 0) return 0;
    const totalProgress = goals.reduce((sum, goal) => {
      const progress = (parseFloat(goal.current_value) / parseFloat(goal.target_value)) * 100;
      return sum + Math.min(progress, 100);
    }, 0);
    return Math.round(totalProgress / goals.length);
  };

  const createObjective = async (objective) => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured');
      return { data: null, error: new Error('Supabase not configured') };
    }

    try {
      const { data, error } = await supabase
        .from('objectives')
        .insert([{
          ...objective,
          company_id: '550e8400-e29b-41d4-a716-446655440001' // Using test company ID
        }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchObjectives(); // Refetch to get updated data
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const updateObjective = async (id, updates) => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured');
      return { data: null, error: new Error('Supabase not configured') };
    }

    try {
      const { data, error } = await supabase
        .from('objectives')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchObjectives(); // Refetch to get updated data
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const deleteObjective = async (id) => {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured');
      return { error: new Error('Supabase not configured') };
    }

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
