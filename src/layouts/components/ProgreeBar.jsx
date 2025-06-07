import React from 'react';

export const ProgressBar = ({ progress, size = 'default' }) => {
  const getColor = () => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const height = size === 'large' ? 'h-3' : 'h-2';

  return (
    <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
      <div 
        className={`${height} ${getColor()} transition-all duration-500 rounded-full`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};