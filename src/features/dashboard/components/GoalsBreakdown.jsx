import React from 'react';
import { Card } from '../../../common/components/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const GoalsBreakdown = ({ objectives }) => {
  const calculateGoalsBreakdown = () => {
    let onTrack = 0;
    let atRisk = 0;
    let ahead = 0;
    let total = 0;

    objectives.forEach(obj => {
      obj.goals?.forEach(goal => {
        total++;
        switch (goal.status) {
          case 'on-track':
            onTrack++;
            break;
          case 'at-risk':
            atRisk++;
            break;
          case 'ahead':
            ahead++;
            break;
        }
      });
    });

    return [
      { name: 'On Track', value: onTrack, percentage: total > 0 ? (onTrack / total * 100).toFixed(1) : 0 },
      { name: 'At Risk', value: atRisk, percentage: total > 0 ? (atRisk / total * 100).toFixed(1) : 0 },
      { name: 'Ahead', value: ahead, percentage: total > 0 ? (ahead / total * 100).toFixed(1) : 0 }
    ];
  };

  const data = calculateGoalsBreakdown();
  const COLORS = {
    'On Track': '#10B981',
    'At Risk': '#F59E0B',
    'Ahead': '#3B82F6'
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value} goals ({payload[0].payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (entry) => {
    return `${entry.percentage}%`;
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals Status Distribution</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry.color }}>
                  {value} ({entry.payload.value})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[item.name] }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {item.value} goals
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};