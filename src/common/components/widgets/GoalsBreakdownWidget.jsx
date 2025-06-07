import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const GoalsBreakdownWidget = ({ data }) => {
  const { objectives = [] } = data || {};
  
  let onTrack = 0, atRisk = 0, ahead = 0;
  
  objectives.forEach(obj => {
    obj.goals?.forEach(goal => {
      if (goal.status === 'on-track') onTrack++;
      else if (goal.status === 'at-risk') atRisk++;
      else if (goal.status === 'ahead') ahead++;
    });
  });

  const chartData = [
    { name: 'On Track', value: onTrack, color: '#10B981' },
    { name: 'At Risk', value: atRisk, color: '#F59E0B' },
    { name: 'Ahead', value: ahead, color: '#3B82F6' }
  ];

  return (
    <div className="h-full">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Goals Status</h3>
      <div className="h-[calc(100%-2rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center space-x-4 mt-2">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center">
              <div 
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-600">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};