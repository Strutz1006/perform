import React from 'react';
import { X, Settings, Maximize2, Minimize2 } from 'lucide-react';
import { Card } from '../../../common/components/Card';

// Import all widget components
import { OverallProgressWidget } from './widgets/OverallProgressWidget';
import { PerformanceMetricsWidget } from './widgets/PerformanceMetricsWidget';
import { ProgressChartWidget } from './widgets/ProgressChartWidget';
import { GoalsBreakdownWidget } from './widgets/GoalsBreakdownWidget';
import { ObjectiveComparisonWidget } from './widgets/ObjectiveComparisonWidget';
import { RecentActivityWidget } from './widgets/RecentActivityWidget';
import { ObjectivesGridWidget } from './widgets/ObjectivesGridWidget';
import { TeamOverviewWidget } from './widgets/TeamOverviewWidget';
import { UpcomingDeadlinesWidget } from './widgets/UpcomingDeadlinesWidget';
import { KPITrackerWidget } from './widgets/KPITrackerWidget';

const widgetComponents = {
  'overall-progress': OverallProgressWidget,
  'performance-metrics': PerformanceMetricsWidget,
  'progress-chart': ProgressChartWidget,
  'goals-breakdown': GoalsBreakdownWidget,
  'objective-comparison': ObjectiveComparisonWidget,
  'recent-activity': RecentActivityWidget,
  'objectives-grid': ObjectivesGridWidget,
  'team-overview': TeamOverviewWidget,
  'upcoming-deadlines': UpcomingDeadlinesWidget,
  'kpi-tracker': KPITrackerWidget
};

export const DashboardWidget = ({ widget, data, isEditing, onRemove, onUpdate }) => {
  const WidgetComponent = widgetComponents[widget.type];
  
  if (!WidgetComponent) {
    return (
      <Card className="h-full flex items-center justify-center">
        <p className="text-gray-500">Widget not found</p>
      </Card>
    );
  }

  const handleToggleFullscreen = () => {
    onUpdate({ fullscreen: !widget.fullscreen });
  };

  return (
    <Card className="h-full p-0 overflow-hidden relative">
      {isEditing && (
        <div className="absolute top-2 right-2 z-10 flex space-x-1">
          <button
            onClick={onRemove}
            className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      <div className="h-full p-4">
        <WidgetComponent data={data} config={widget.config} />
      </div>
    </Card>
  );
};