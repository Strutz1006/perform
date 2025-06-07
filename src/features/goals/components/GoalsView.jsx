import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../common/components/Button';
import { GoalTable } from './GoalTable';
import { GoalForm } from './GoalForm';
import { ProgressUpdateForm } from './ProgressUpdateForm';
import { useGoals } from '../hooks/useGoals';

export const GoalsView = () => {
  const { goals, loading, error } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [updatingGoal, setUpdatingGoal] = useState(null);

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleUpdateProgress = (goal) => {
    setUpdatingGoal(goal);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingGoal(null);
  };

  if (loading) return <div>Loading goals...</div>;
  if (error) return <div>Error loading goals: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">SMART Goals</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <GoalTable 
        goals={goals}
        onEdit={handleEdit}
        onUpdateProgress={handleUpdateProgress}
      />

      <GoalForm
        isOpen={showForm}
        onClose={handleCloseForm}
        goal={editingGoal}
      />

      <ProgressUpdateForm
        isOpen={!!updatingGoal}
        onClose={() => setUpdatingGoal(null)}
        goal={updatingGoal}
      />
    </div>
  );
};