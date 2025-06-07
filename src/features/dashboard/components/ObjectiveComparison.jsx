import React from 'react';
import { Card } from '../../../common/components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export const ObjectiveComparison = ({ objectives }) => {
  const data = objectives.map(obj => ({
    name: obj.title.length > 20 ? obj.title.substring(0, 20) + '...' : obj.title,
    fullName: obj.title,
    progress: obj.progress,
    target: 100,
    remaining: 100 - obj.progress,
    goalsCount: obj.goals?.length || 0,
    completedGoals: obj.goals?.filter(g => g.current_value >= g.target_value).length || 0
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium mb-1">{data.fullName}</p>
          <p className="text-sm text-gray-600">Progress: {data.progress}%</p>
          <p className="text-sm text-gray-600">
            Goals: {data.completedGoals}/{data.goalsCount} completed
          </p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (progress) => {
    if (progress >= 80) return '#10B981';
    if (progress >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Objectives Comparison</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span className="text-gray-600">≥80%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
            <span className="text-gray-600">60-79%</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span className="text-gray-600">{'<60% '}</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 12 }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="progress" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.progress)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};