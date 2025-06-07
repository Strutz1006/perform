import React from 'react';
import { TeamMemberCard } from './TeamMemberCard';

const teamMembers = [
  { id: 1, name: 'Sarah Johnson', role: 'Product Manager', avatar: '👩', goalsCount: 3 },
  { id: 2, name: 'Mike Chen', role: 'Engineering Lead', avatar: '👨', goalsCount: 5 },
  { id: 3, name: 'Emma Davis', role: 'Marketing Director', avatar: '👩', goalsCount: 4 },
  { id: 4, name: 'James Wilson', role: 'Sales Manager', avatar: '👨', goalsCount: 6 }
];

export const TeamView = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};