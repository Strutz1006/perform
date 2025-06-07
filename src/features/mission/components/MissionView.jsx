import React from 'react';
import { Target, ChevronRight } from 'lucide-react';
import { Card } from '../../../common/components/Card';
import { Button } from '../../../common/components/Button';
import { ProgressBar } from '../../../common/components/ProgressBar';

export const MissionView = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <div className="flex items-center mb-6">
          <Target className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Company Mission</h2>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <p className="text-lg text-gray-800 leading-relaxed">{data.mission}</p>
        </div>
        <Button>Edit Mission</Button>
      </Card>

      <Card>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Mission Alignment</h3>
        <div className="space-y-4">
          {data.objectives.map(objective => (
            <div key={objective.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-gray-400 mr-3" />
                <span className="font-medium text-gray-700">{objective.title}</span>
              </div>
              <div className="w-32">
                <ProgressBar progress={objective.progress} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};