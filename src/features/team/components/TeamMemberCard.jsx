import React from 'react';
import { Card } from '../../../common/components/Card';

export const TeamMemberCard = ({ member }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">{member.avatar}</div>
        <div>
          <h3 className="font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.role}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Active Goals</span>
        <span className="font-semibold text-gray-900">{member.goalsCount}</span>
      </div>
    </Card>
  );
};