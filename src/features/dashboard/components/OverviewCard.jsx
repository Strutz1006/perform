import React from 'react';
import { CheckCircle2, AlertCircle, TrendingUp, MoreVertical } from 'lucide-react';
import { Card } from '../../../common/components/Card';
import { ProgressBar } from '../../../common/components/ProgressBar';

export const OverviewCard = ({ objective }) => {
  const getStatusIcon = () => {
    if (objective.progress >= 80) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (objective.progress >= 60) return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
    return <AlertCircle className="w-4 h-4 text-yellow-600" />;
  };

  const getStatusText = () => {
    if (objective.progress >= 80) return 'Excellent Progress';
    if (objective.progress >= 60) return 'On Track';
    return 'Needs Attention';
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 line-clamp-1">{objective.title}</h3>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{objective.description}</p>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-sm font-semibold">{objective.progress}%</span>
        </div>
        <ProgressBar progress={objective.progress} />
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-gray-500">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            {objective.goals?.length || 0} goals
          </div>
          <div className="flex items-center text-sm">
            {getStatusIcon()}
            <span className="ml-1 text-gray-600">{getStatusText()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};