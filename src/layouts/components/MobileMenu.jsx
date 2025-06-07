import React from 'react';
import { BarChart3, Target, TrendingUp, CheckCircle2, Users } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'mission', label: 'Mission', icon: Target },
  { id: 'objectives', label: 'Objectives', icon: TrendingUp },
  { id: 'goals', label: 'Goals', icon: CheckCircle2 },
  { id: 'team', label: 'Team', icon: Users }
];

export const MobileMenu = ({ isOpen, activeView, setActiveView, setIsMobileMenuOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-40 bg-gray-900 pt-16">
      <nav className="px-4 py-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setActiveView(item.id);
              setIsMobileMenuOpen(false);
            }}
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
    </div>
  );
};