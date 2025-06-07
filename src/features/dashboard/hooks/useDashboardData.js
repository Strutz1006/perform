import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../../services/supabase/client';

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState({
    activeGoals: 0,
    onTrackPercentage: 0,
    teamMembers: 0,
    daysToMilestone: 0,
    goalsChange: 0,
    onTrackChange: 0
  });
  const [activities, setActivities] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        // Use mock data
        setMetrics({
          activeGoals: 12,
          onTrackPercentage: 75,
          teamMembers: 8,
          daysToMilestone: 45,
          goalsChange: 12,
          onTrackChange: 5
        });
        setLoading(false);
        return;
      }

      // Fetch goals to calculate metrics
      const { data: goals } = await supabase
        .from('goals')
        .select('*');

      if (goals) {
        const activeGoals = goals.length;
        const onTrackGoals = goals.filter(g => g.status === 'on-track').length;
        const onTrackPercentage = activeGoals > 0 ? Math.round((onTrackGoals / activeGoals) * 100) : 0;

        setMetrics({
          activeGoals,
          onTrackPercentage,
          teamMembers: 8, // Mock for now
          daysToMilestone: 45, // Mock for now
          goalsChange: 12, // Mock for now
          onTrackChange: 5 // Mock for now
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    metrics,
    activities,
    trends,
    loading,
    refetch: fetchDashboardData
  };
};