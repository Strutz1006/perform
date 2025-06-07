import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../common/components/Button';
import { GoalTable } from './GoalTable';

export const GoalsView = ({ data }) => {
  const allGoals = data.objectives.flatMap(obj => 
    obj.goals.map(goal => ({ ...goal, objectiveTitle: obj.title }))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">SMART Goals</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <GoalTable goals={allGoals} />
    </div>
  );
};