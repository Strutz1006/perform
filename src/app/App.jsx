import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardView } from '../features/components/dashboard';
import { MissionView } from '../features/mission';
import { ObjectivesView } from '../features/objectives';
import { GoalsView } from '../features/goals';
import { TeamView } from '../features/team';

// Mock data - will be replaced with Supabase
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

function App() {
  const [activeView, setActiveView] = useState('dashboard');

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
    <MainLayout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </MainLayout>
  );
}

export default App;