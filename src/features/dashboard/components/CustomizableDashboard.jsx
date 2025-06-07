import React, { useState, useCallback } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Plus, Settings, Save, X, Grid3x3, List } from 'lucide-react';
import { Button } from '../../../common/components/Button';
import { WidgetLibrary } from './WidgetLibrary';
import { DashboardWidget } from './DashboardWidget';
import { useDashboardLayout } from '../hooks/useDashboardLayout';
import { useObjectives } from '../../objectives/hooks/useObjectives';
import { useDashboardData } from '../hooks/useDashboardData';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const CustomizableDashboard = () => {
  const { objectives, loading: objectivesLoading } = useObjectives();
  const { metrics, activities, trends, loading: dataLoading } = useDashboardData();
  const { layout, widgets, saveLayout, addWidget, removeWidget, updateWidget } = useDashboardLayout();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [compactView, setCompactView] = useState(false);

  const loading = objectivesLoading || dataLoading;

  // Widget data mapping
  const widgetData = {
    'overall-progress': { 
      progress: objectives.length > 0 
        ? Math.round(objectives.reduce((acc, obj) => acc + obj.progress, 0) / objectives.length)
        : 0 
    },
    'performance-metrics': { metrics },
    'progress-chart': { objectives, trends },
    'goals-breakdown': { objectives },
    'objective-comparison': { objectives },
    'recent-activity': { activities },
    'objectives-grid': { objectives: objectives.slice(0, 4) },
    'team-overview': { metrics },
    'upcoming-deadlines': { objectives },
    'kpi-tracker': { metrics, objectives }
  };

  const handleLayoutChange = useCallback((newLayout, layouts) => {
    if (isEditing) {
      saveLayout(layouts);
    }
  }, [isEditing, saveLayout]);

  const handleAddWidget = (widgetType) => {
    addWidget(widgetType);
    setShowLibrary(false);
  };

  const handleRemoveWidget = (widgetId) => {
    removeWidget(widgetId);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Layout is already saved on change
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {isEditing ? 'Drag widgets to rearrange • Click ✕ to remove' : 'Monitor your company performance'}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {isEditing && (
            <>
              <Button
                variant="secondary"
                size="small"
                onClick={() => setCompactView(!compactView)}
              >
                {compactView ? <List className="w-4 h-4 mr-2" /> : <Grid3x3 className="w-4 h-4 mr-2" />}
                {compactView ? 'Normal' : 'Compact'}
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={() => setShowLibrary(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Widget
              </Button>
            </>
          )}
          
          <Button
            size="small"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Layout
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Grid Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditing}
        isResizable={isEditing}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={compactView ? 60 : 80}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        compactType={compactView ? 'vertical' : null}
      >
        {widgets.map((widget) => (
          <div key={widget.id} className="relative group">
            <DashboardWidget
              widget={widget}
              data={widgetData[widget.type]}
              isEditing={isEditing}
              onRemove={() => handleRemoveWidget(widget.id)}
              onUpdate={(updates) => updateWidget(widget.id, updates)}
            />
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Widget Library Modal */}
      {showLibrary && (
        <WidgetLibrary
          onClose={() => setShowLibrary(false)}
          onAddWidget={handleAddWidget}
          currentWidgets={widgets}
        />
      )}
    </div>
  );
};
