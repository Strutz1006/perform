import React from 'react';
import { Card } from '../../../common/components/Card';
import { CheckCircle, AlertCircle, TrendingUp, Target, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export const RecentActivity = ({ activities }) => {
  // Mock data - replace with real activity feed from Supabase
  const mockActivities = [
    {
      id: 1,
      type: 'goal_completed',
      message: 'Sarah completed "Launch in EMEA region"',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'goal_at_risk',
      message: 'Revenue target is at risk',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'progress_update',
      message: 'Mike updated progress on Q4 deliverables',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'objective_created',
      message: 'New objective "Expand Market Share" created',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  const activityList = activities || mockActivities;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Clock className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-3">
        {activityList.slice(0, 5).map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`mt-0.5 ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View all activity →
      </button>
    </Card>
  );
};