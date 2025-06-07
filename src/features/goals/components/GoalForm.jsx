import React, { useState } from 'react';
import { Modal } from '../../../common/components/Modal';
import { Input } from '../../../common/components/Input';
import { TextArea } from '../../../common/components/TextArea';
import { Select } from '../../../common/components/Select';
import { Button } from '../../../common/components/Button';
import { useGoals } from '../hooks/useGoals';
import { useObjectives } from '../../objectives/hooks/useObjectives';

export const GoalForm = ({ isOpen, onClose, goal = null, defaultObjectiveId = null }) => {
  const { createGoal, updateGoal } = useGoals();
  const { objectives } = useObjectives();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: goal?.title || '',
    description: goal?.description || '',
    objective_id: goal?.objective_id || defaultObjectiveId || '',
    target_value: goal?.target_value || '',
    unit: goal?.unit || '',
    due_date: goal?.due_date || '',
    status: goal?.status || 'on-track'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.objective_id) {
      newErrors.objective_id = 'Please select an objective';
    }
    if (!formData.target_value || formData.target_value <= 0) {
      newErrors.target_value = 'Target value must be greater than 0';
    }
    if (!formData.due_date) {
      newErrors.due_date = 'Due date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    
    const goalData = {
      ...formData,
      target_value: parseFloat(formData.target_value),
      current_value: goal?.current_value || 0
    };

    const { error } = goal
      ? await updateGoal(goal.id, goalData)
      : await createGoal(goalData);

    setLoading(false);

    if (error) {
      setErrors({ submit: error.message });
    } else {
      onClose();
      setFormData({
        title: '',
        description: '',
        objective_id: '',
        target_value: '',
        unit: '',
        due_date: '',
        status: 'on-track'
      });
    }
  };

  const objectiveOptions = objectives.map(obj => ({
    value: obj.id,
    label: obj.title
  }));

  const statusOptions = [
    { value: 'on-track', label: 'On Track' },
    { value: 'at-risk', label: 'At Risk' },
    { value: 'ahead', label: 'Ahead' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={goal ? 'Edit Goal' : 'Create New Goal'}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Goal Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          error={errors.title}
          placeholder="e.g., Launch in 3 new regions"
        />

        <Select
          label="Objective"
          name="objective_id"
          value={formData.objective_id}
          onChange={handleChange}
          required
          error={errors.objective_id}
          options={objectiveOptions}
          placeholder="Select an objective"
        />

        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the goal and success criteria..."
          rows={3}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Target Value"
            name="target_value"
            type="number"
            value={formData.target_value}
            onChange={handleChange}
            required
            error={errors.target_value}
            placeholder="100"
          />

          <Input
            label="Unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="%, users, revenue"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Due Date"
            name="due_date"
            type="date"
            value={formData.due_date}
            onChange={handleChange}
            required
            error={errors.due_date}
          />

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
          />
        </div>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {errors.submit}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Saving...' : goal ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};