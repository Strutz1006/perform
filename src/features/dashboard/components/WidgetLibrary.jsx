import React, { useState } from 'react';
import { Modal } from '../../../common/components/Modal';
import { Search, BarChart3, TrendingUp, Users, Calendar, Target, Activity, Grid, Clock, BarChart2 } from 'lucide-react';
import { Input } from '../../../common/components/Input';

const availableWidgets = [
  {
    type: 'overall-progress',
    name: 'Overall Progress',
    description: 'Company-wide progress towards mission',
    icon: Target,
    category: 'progress',
    defaultSize: { w: 12, h: 2, minW: 6, minH: 2 }
  },
  {
    type: 'performance-metrics',
    name: 'Key Metrics',
    description: 'Important performance indicators',
    icon: BarChart3,
    category: 'metrics',
    defaultSize: { w: 12, h: 2, minW: 8, minH: 2 }
  },
  {
    type: 'progress-chart',
    name: 'Progress Trends',
    description: 'Historical progress visualization',
    icon: TrendingUp,
    category: 'charts',
    defaultSize: { w: 6, h: 4, minW: 4, minH: 3 }
  },
  {
    type: 'goals-breakdown',
    name: 'Goals Status',
    description: 'Distribution of goal statuses',
    icon: BarChart2,
    category: 'charts',
    defaultSize: { w: 6, h: 4, minW: 4, minH: 3 }
  },
  {
    type: 'objective-comparison',
    name: 'Objectives Comparison',
    description: 'Compare objectives side by side',
    icon: BarChart3,
    category: 'charts',
    defaultSize: { w: 12, h: 3, minW: 8, minH: 3 }
  },
  {
    type: 'recent-activity',
    name: 'Recent Activity',
    description: 'Latest updates and changes',
    icon: Activity,
    category: 'activity',
    defaultSize: { w: 4, h: 4, minW: 3, minH: 3 }
  },
  {
    type: 'objectives-grid',
    name: 'Objectives Overview',
    description: 'Grid view of objectives',
    icon: Grid,
    category: 'objectives',
    defaultSize: { w: 8, h: 3, minW: 6, minH: 2 }
  },
  {
    type: 'team-overview',
    name: 'Team Performance',
    description: 'Team members and their goals',
    icon: Users,
    category: 'team',
    defaultSize: { w: 6, h: 3, minW: 4, minH: 3 }
  },
  {
    type: 'upcoming-deadlines',
    name: 'Upcoming Deadlines',
    description: 'Goals nearing due dates',
    icon: Calendar,
    category: 'planning',
    defaultSize: { w: 6, h: 3, minW: 4, minH: 3 }
  },
  {
    type: 'kpi-tracker',
    name: 'KPI Tracker',
    description: 'Track custom key performance indicators',
    icon: Target,
    category: 'metrics',
    defaultSize: { w: 6, h: 3, minW: 4, minH: 2 }
  }
];

const categories = [
  { id: 'all', name: 'All Widgets' },
  { id: 'progress', name: 'Progress' },
  { id: 'metrics', name: 'Metrics' },
  { id: 'charts', name: 'Charts' },
  { id: 'objectives', name: 'Objectives' },
  { id: 'team', name: 'Team' },
  { id: 'activity', name: 'Activity' },
  { id: 'planning', name: 'Planning' }
];

export const WidgetLibrary = ({ onClose, onAddWidget, currentWidgets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredWidgets = availableWidgets.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || widget.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isWidgetAdded = (type) => {
    return currentWidgets.some(w => w.type === type);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Add Widget to Dashboard"
    >
      <div className="w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Search and Filters */}
        <div className="mb-4">
          <Input
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-3"
          />
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Widget Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredWidgets.map(widget => {
              const Icon = widget.icon;
              const added = isWidgetAdded(widget.type);
              
              return (
                <div
                  key={widget.type}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    added
                      ? 'border-gray-200 bg-gray-50 opacity-60'
                      : 'border-gray-300 hover:border-blue-500 hover:shadow-md'
                  }`}
                  onClick={() => !added && onAddWidget(widget.type)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{widget.name}</h3>
                        <p className="text-sm text-gray-600">{widget.description}</p>
                      </div>
                    </div>
                    {added && (
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                        Added
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};