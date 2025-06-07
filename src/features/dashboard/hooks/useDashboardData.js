import { useState, useEffect } from 'react';
import { supabase } from '../../../services/supabase/client';
import { useAuth } from '../../../common/hooks/useAuth';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState(null);
  const [activities, setActivities] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();

  useEffect(() => {
    if (profile?.company_id) {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [metricsData, activitiesData, trendsData] = await Promise.all([
        fetchMetrics(),
        fetchRecentActivities(),
        fetchTrends()
      ]);

      setMetrics(metricsData);
      setActivities(activitiesData);
      setTrends(trendsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetrics = async () => {
    // Fetch goals count and status
    const { data: goals } = await supabase
      .from('goals')
      .select('id, status, due_date')
      .in('objective_id', 
        supabase
          .from('objectives')
          .select('id')
          .eq('company_id', profile.company_id)
      );

    const activeGoals = goals?.length || 0;
    const onTrackGoals = goals?.filter(g => g.status === 'on-track').length || 0;
    const onTrackPercentage = activeGoals > 0 ? Math.round((onTrackGoals / activeGoals) * 100) : 0;

    // Calculate days to next milestone
    const upcomingGoal = goals
      ?.filter(g => new Date(g.due_date) > new Date())
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];
    
    const daysToMilestone = upcomingGoal
      ? Math.ceil((new Date(upcomingGoal.due_date) - new Date()) / (1000 * 60 * 60 * 24))
      : 0;

    // Fetch team members count
    const { count: teamMembers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', profile.company_id);

    return {
      activeGoals,
      onTrackPercentage,
      teamMembers: teamMembers || 0,
      daysToMilestone,
      goalsChange: 12, // Mock data - calculate from historical data
      onTrackChange: 5   // Mock data - calculate from historical data
    };
  };

  const fetchRecentActivities = async () => {
    // This would fetch from an activity log table
    // For now, returning empty array - implement when activity logging is added
    return [];
  };

  const fetchTrends = async () => {
    // Fetch historical progress data
    // This is simplified - you'd want to aggregate this data in a more efficient way
    const trendsData = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(new Date(), i));
      const monthEnd = endOfMonth(subMonths(new Date(), i));
      
      // Fetch progress snapshots for this month
      // This assumes you have a progress_snapshots table that stores historical data
      // For now, returning empty array
      trendsData.push({
        month: format(monthStart, 'MMM'),
        overall: 0 // Would calculate from actual data
      });
    }
    
    return trendsData;
  };

  return {
    metrics,
    activities,
    trends,
    loading,
    refetch: fetchDashboardData
  };
};