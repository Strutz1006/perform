import React, { useState } from 'react';
import { Modal } from '../../../common/components/Modal';
import { Input } from '../../../common/components/Input';
import { TextArea } from '../../../common/components/TextArea';
import { Button } from '../../../common/components/Button';
import { useObjectives } from '../hooks/useObjectives';

export const ObjectiveForm = ({ isOpen, onClose, objective = null }) => {
  const { createObjective, updateObjective } = useObjectives();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: objective?.title || '',
    description: objective?.description || '',
    target_date: objective?.target_date || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.target_date) {
      newErrors.target_date = 'Target date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    
    const { error } = objective
      ? await updateObjective(objective.id, formData)
      : await createObjective(formData);

    setLoading(false);

    if (error) {
      setErrors({ submit: error.message });
    } else {
      onClose();
      // Reset form
      setFormData({ title: '', description: '', target_date: '' });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={objective ? 'Edit Objective' : 'Create New Objective'}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          error={errors.title}
          placeholder="e.g., Increase Market Share"
        />

        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the objective and its importance..."
          rows={4}
        />

        <Input
          label="Target Date"
          name="target_date"
          type="date"
          value={formData.target_date}
          onChange={handleChange}
          required
          error={errors.target_date}
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
            {loading ? 'Saving...' : objective ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};