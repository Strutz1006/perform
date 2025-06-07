import React from 'react';
import { Target, TrendingUp, Users, Calendar } from 'lucide-react';

export const PerformanceMetricsWidget = ({ data }) => {
  const { metrics = {} } = data || {};
  
  const items = [
    {
      label: 'Active Goals',
      value: metrics.activeGoals || 0,
      change: metrics.goalsChange || 0,
      icon: Target,
      color: 'blue'
    },
    {
      label: 'On Track',
      value: `${metrics.onTrackPercentage || 0}%`,
      change: metrics.onTrackChange || 0,
      icon: TrendingUp,
      color: 'green'
    },
    {
      label: 'Team Members',
      value: metrics.teamMembers || 0,
      icon: Users,
      color: 'purple'
    },
    {
      label: 'Next Milestone',
      value: `${metrics.daysToMilestone || 0}d`,
      icon: Calendar,
      color: 'orange'
    }
  ];

  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">{item.label}</span>
              <div className={`p-1 rounded ${colors[item.color]}`}>
                <Icon className="w-3 h-3" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">{item.value}</span>
              {item.change !== undefined && (
                <span className={`text-xs ml-2 ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};