import React from 'react';
import { BarChart3, Target, TrendingUp, CheckCircle2, Users } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'mission', label: 'Mission', icon: Target },
  { id: 'objectives', label: 'Objectives', icon: TrendingUp },
  { id: 'goals', label: 'Goals', icon: CheckCircle2 },
  { id: 'team', label: 'Team', icon: Users }
];

export const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
        <h1 className="text-xl font-bold">Perform</h1>
      </div>
      <nav className="flex-1 px-4 pb-4 mt-5">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
              activeView === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};