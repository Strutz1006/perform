import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subMonths } from 'date-fns';

export const ProgressChartWidget = ({ data }) => {
  const { objectives = [], trends = [] } = data || {};
  
  // Generate mock data if no trends provided
  const chartData = trends.length > 0 ? trends : Array.from({ length: 6 }, (_, i) => ({
    month: format(subMonths(new Date(), 5 - i), 'MMM'),
    progress: Math.round(Math.random() * 30 + 50)
  }));

  return (
    <div className="h-full">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Progress Trends</h3>
      <div className="h-[calc(100%-2rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="progress" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};