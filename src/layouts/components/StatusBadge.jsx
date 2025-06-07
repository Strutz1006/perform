import React from 'react';
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const config = {
    'on-track': { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
    'at-risk': { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
    'ahead': { color: 'bg-blue-100 text-blue-800', icon: TrendingUp }
  };

  const { color, icon: Icon } = config[status] || config['on-track'];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.replace('-', ' ')}
    </span>
  );
};