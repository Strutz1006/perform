import React, { useState } from 'react';
import { Modal } from '../../../common/components/Modal';
import { Input } from '../../../common/components/Input';
import { TextArea } from '../../../common/components/TextArea';
import { Button } from '../../../common/components/Button';
import { ProgressBar } from '../../../common/components/ProgressBar';
import { useGoals } from '../hooks/useGoals';

export const ProgressUpdateForm = ({ isOpen, onClose, goal }) => {
  const { updateProgress } = useGoals();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    value: goal?.current_value || 0,
    notes: ''
  });

  const currentProgress = (goal?.current_value / goal?.target_value) * 100;
  const newProgress = (formData.value / goal?.target_value) * 100;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formData.value < 0) {
      newErrors.value = 'Value cannot be negative';
    }
    if (formData.value > goal.target_value) {
      newErrors.value = 'Value cannot exceed target';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    
    const { error } = await updateProgress(
      goal.id,
      parseFloat(formData.value),
      formData.notes
    );

    setLoading(false);

    if (error) {
      setErrors({ submit: error.message });
    } else {
      onClose();
    }
  };

  if (!goal) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Progress"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">{goal.title}</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Current Progress</span>
              <span>{goal.current_value} / {goal.target_value} {goal.unit}</span>
            </div>
            <ProgressBar progress={currentProgress} />
          </div>
        </div>

        <Input
          label={`New Value (${goal.unit || 'units'})`}
          name="value"
          type="number"
          value={formData.value}
          onChange={handleChange}
          required
          error={errors.value}
          min="0"
          max={goal.target_value}
          step="0.01"
        />

        {formData.value !== goal.current_value && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>New Progress</span>
              <span>{formData.value} / {goal.target_value} {goal.unit}</span>
            </div>
            <ProgressBar progress={newProgress} />
          </div>
        )}

        <TextArea
          label="Notes (optional)"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any relevant notes about this update..."
          rows={3}
        />

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
            {loading ? 'Updating...' : 'Update Progress'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};