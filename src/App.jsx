import React, { useState } from 'react';
import { Calendar, Target, TrendingUp, Users, BarChart3, CheckCircle2, AlertCircle, Menu, X, Plus, ChevronRight } from 'lucide-react';

// Mock data structure
const mockData = {
  mission: "Become the industry leader in sustainable technology solutions by 2030",
  objectives: [
    {
      id: 1,
      title: "Increase Market Share",
      description: "Expand our presence in key markets",
      progress: 65,
      goals: [
        { id: 1, title: "Launch in 3 new regions", progress: 75, status: "on-track" },
        { id: 2, title: "Achieve 20% YoY growth", progress: 60, status: "at-risk" }
      ]
    },
    {
      id: 2,
      title: "Product Innovation",
      description: "Develop cutting-edge sustainable products",
      progress: 80,
      goals: [
        { id: 3, title: "Release 5 new products", progress: 80, status: "on-track" },
        { id: 4, title: "Reduce carbon footprint by 30%", progress: 90, status: "ahead" }
      ]
    }
  ]
};

// Navigation Component
const Navigation = ({ activeView, setActiveView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'mission', label: 'Mission', icon: Target },
    { id: 'objectives', label: 'Objectives', icon: TrendingUp },
    { id: 'goals', label: 'Goals', icon: CheckCircle2 },
    { id: 'team', label: 'Team', icon: Users }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900 text-white">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-800">
          <h1 className="text-xl font-bold">PerfTrack</h1>
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

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold">PerfTrack</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
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
      )}
    </>
  );
};

// Progress Bar Component
const ProgressBar = ({ progress, size = 'default' }) => {
  const getColor = () => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const height = size === 'large' ? 'h-3' : 'h-2';

  return (
    <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
      <div 
        className={`${height} ${getColor()} transition-all duration-500 rounded-full`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const config = {
    'on-track': { color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
    'at-risk': { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
    'ahead': { color: 'bg-blue-100 text-blue-800', icon: TrendingUp }
  };

  const { color, icon: Icon } = config[status] || config['on-track'];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {status.replace('-', ' ')}
    </span>
  );
};

// Dashboard View
const DashboardView = ({ data }) => {
  const overallProgress = Math.round(
    data.objectives.reduce((acc, obj) => acc + obj.progress, 0) / data.objectives.length
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Mission</h2>
        <p className="text-gray-600 mb-4">{data.mission}</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">{overallProgress}%</span>
          </div>
          <ProgressBar progress={overallProgress} size="large" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.objectives.map(objective => (
          <div key={objective.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">{objective.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{objective.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-sm font-semibold">{objective.progress}%</span>
              </div>
              <ProgressBar progress={objective.progress} />
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              {objective.goals.length} goals
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mission View
const MissionView = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <Target className="w-8 h-8 text-blue-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Company Mission</h2>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <p className="text-lg text-gray-800 leading-relaxed">{data.mission}</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Edit Mission
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Mission Alignment</h3>
        <div className="space-y-4">
          {data.objectives.map(objective => (
            <div key={objective.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <ChevronRight className="w-5 h-5 text-gray-400 mr-3" />
                <span className="font-medium text-gray-700">{objective.title}</span>
              </div>
              <ProgressBar progress={objective.progress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Objectives View
const ObjectivesView = ({ data }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Strategic Objectives</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Objective
        </button>
      </div>

      {data.objectives.map(objective => (
        <div key={objective.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{objective.title}</h3>
              <p className="text-gray-600 mt-1">{objective.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{objective.progress}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          
          <ProgressBar progress={objective.progress} size="large" />
          
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-700">Connected Goals</h4>
            {objective.goals.map(goal => (
              <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{goal.title}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <StatusBadge status={goal.status} />
                  <span className="text-sm font-medium text-gray-600">{goal.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Goals View
const GoalsView = ({ data }) => {
  const allGoals = data.objectives.flatMap(obj => 
    obj.goals.map(goal => ({ ...goal, objectiveTitle: obj.title }))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">SMART Goals</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objective</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allGoals.map(goal => (
                <tr key={goal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{goal.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{goal.objectiveTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={goal.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-24">
                        <ProgressBar progress={goal.progress} />
                      </div>
                      <span className="text-sm text-gray-600">{goal.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Team View
const TeamView = () => {
  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Product Manager', avatar: '👩', goalsCount: 3 },
    { id: 2, name: 'Mike Chen', role: 'Engineering Lead', avatar: '👨', goalsCount: 5 },
    { id: 3, name: 'Emma Davis', role: 'Marketing Director', avatar: '👩', goalsCount: 4 },
    { id: 4, name: 'James Wilson', role: 'Sales Manager', avatar: '👨', goalsCount: 6 }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map(member => (
          <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView data={mockData} />;
      case 'mission':
        return <MissionView data={mockData} />;
      case 'objectives':
        return <ObjectivesView data={mockData} />;
      case 'goals':
        return <GoalsView data={mockData} />;
      case 'team':
        return <TeamView />;
      default:
        return <DashboardView data={mockData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeView={activeView} 
        setActiveView={setActiveView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
}