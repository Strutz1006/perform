import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../../../common/components/Card';
import { ProgressBar } from '../../../common/components/ProgressBar';
import { StatusBadge } from '../../../common/components/StatusBadge';

export const ObjectiveCard = ({ objective }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{objective.title}</h3>
          <p className="text-gray-600 mt-1">{objective.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{objective.progress}%</div>
          <div className="text-sm text-gray-500">Complete</div>
        </div>
      </div>
      
      <ProgressBar progress={objective.progress} size="large" />
      
      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-gray-700">Connected Goals</h4>
        {objective.goals.map(goal => (
          <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{goal.title}</span>
            </div>
            <div className="flex items-center space-x-3">
              <StatusBadge status={goal.status} />
              <span className="text-sm font-medium text-gray-600">{goal.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};