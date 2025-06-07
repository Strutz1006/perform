import React, { useState } from 'react';
import { AuthProvider } from '../common/hooks/useAuth';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardView } from '../features/dashboard';
import { MissionView } from '../features/mission';
import { ObjectivesView } from '../features/objectives';
import { GoalsView } from '../features/goals';
import { TeamView } from '../features/team';

function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'mission':
        return <MissionView />;
      case 'objectives':
        return <ObjectivesView />;
      case 'goals':
        return <GoalsView />;
      case 'team':
        return <TeamView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <AuthProvider>
      <MainLayout activeView={activeView} setActiveView={setActiveView}>
        {renderView()}
      </MainLayout>
    </AuthProvider>
  );
}

export default App;