import React from 'react';
import { ProgressBar } from '../../../../common/components/ProgressBar';
import { TrendingUp, Target } from 'lucide-react';

export const OverallProgressWidget = ({ data }) => {
  const { progress = 0 } = data || {};
  
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Target className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Company Performance</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{progress}%</div>
          <div className="text-xs text-gray-500">Overall Progress</div>
        </div>
      </div>
      <ProgressBar progress={progress} size="large" />
    </div>
  );
};