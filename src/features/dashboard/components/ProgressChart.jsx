import React from 'react';
import { Card } from '../../../common/components/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subMonths } from 'date-fns';

export const ProgressChart = ({ objectives, trends }) => {
  // Generate mock historical data - replace with real data from Supabase
  const generateHistoricalData = () => {
    const months = 6;
    const data = [];
    
    for (let i = months; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthData = {
        month: format(date, 'MMM'),
        overall: Math.max(0, Math.min(100, 
          (objectives.reduce((acc, obj) => acc + obj.progress, 0) / objectives.length) - (i * 5) + Math.random() * 10
        ))
      };
      
      objectives.forEach((obj, index) => {
        monthData[`obj${index}`] = Math.max(0, Math.min(100, 
          obj.progress - (i * 5) + Math.random() * 10
        ));
      });
      
      data.push(monthData);
    }
    
    return data;
  };

  const data = trends || generateHistoricalData();
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="overall" 
              stroke="#3B82F6" 
              strokeWidth={3}
              name="Overall Progress"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            {objectives.slice(0, 3).map((obj, index) => (
              <Line
                key={obj.id}
                type="monotone"
                dataKey={`obj${index}`}
                stroke={colors[index + 1]}
                strokeWidth={2}
                name={obj.title}
                dot={{ r: 3 }}
                strokeDasharray={index > 1 ? "5 5" : "0"}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};