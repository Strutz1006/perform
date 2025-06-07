import React from 'react';
import { Card } from '../../../common/components/Card';
import { ProgressBar } from '../../../common/components/ProgressBar';
import { OverviewCard } from './OverviewCard';

export const DashboardView = ({ data }) => {
  const overallProgress = Math.round(
    data.objectives.reduce((acc, obj) => acc + obj.progress, 0) / data.objectives.length
  );

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Mission</h2>
        <p className="text-gray-600 mb-4">{data.mission}</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">{overallProgress}%</span>
          </div>
          <ProgressBar progress={overallProgress} size="large" />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.objectives.map(objective => (
          <OverviewCard key={objective.id} objective={objective} />
        ))}
      </div>
    </div>
  );
};