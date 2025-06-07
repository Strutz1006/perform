import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../common/components/Button';
import { ObjectiveCard } from './ObjectiveCard';
import { ObjectiveForm } from './ObjectiveForm';
import { useObjectives } from '../hooks/useObjectives';

export const ObjectivesView = () => {
  const { objectives, loading, error } = useObjectives();
  const [showForm, setShowForm] = useState(false);
  const [editingObjective, setEditingObjective] = useState(null);

  const handleEdit = (objective) => {
    setEditingObjective(objective);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingObjective(null);
  };

  if (loading) return <div>Loading objectives...</div>;
  if (error) return <div>Error loading objectives: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Strategic Objectives</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Objective
        </Button>
      </div>

      {objectives.map(objective => (
        <ObjectiveCard 
          key={objective.id} 
          objective={objective}
          onEdit={() => handleEdit(objective)}
        />
      ))}

      <ObjectiveForm
        isOpen={showForm}
        onClose={handleCloseForm}
        objective={editingObjective}
      />
    </div>
  );
};