import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../../../common/components/Card';
import { ProgressBar } from '../../../common/components/ProgressBar';

export const OverviewCard = ({ objective }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-gray-900 mb-2">{objective.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{objective.description}</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-sm font-semibold">{objective.progress}%</span>
        </div>
        <ProgressBar progress={objective.progress} />
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <CheckCircle2 className="w-4 h-4 mr-1" />
        {objective.goals.length} goals
      </div>
    </Card>
  );
};