import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../common/components/Button';
import { ObjectiveCard } from './ObjectiveCard';

export const ObjectivesView = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Strategic Objectives</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Objective
        </Button>
      </div>

      {data.objectives.map(objective => (
        <ObjectiveCard key={objective.id} objective={objective} />
      ))}
    </div>
  );
};