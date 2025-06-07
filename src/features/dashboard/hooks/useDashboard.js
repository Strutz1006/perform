import { useState, useEffect } from 'react';
import { useAuth } from '../../../common/hooks/useAuth';

const defaultWidgets = [
  {
    id: 'widget-1',
    type: 'overall-progress',
    config: {}
  },
  {
    id: 'widget-2',
    type: 'performance-metrics',
    config: {}
  },
  {
    id: 'widget-3',
    type: 'progress-chart',
    config: {}
  },
  {
    id: 'widget-4',
    type: 'goals-breakdown',
    config: {}
  }
];

const defaultLayouts = {
  lg: [
    { i: 'widget-1', x: 0, y: 0, w: 12, h: 2 },
    { i: 'widget-2', x: 0, y: 2, w: 12, h: 2 },
    { i: 'widget-3', x: 0, y: 4, w: 6, h: 4 },
    { i: 'widget-4', x: 6, y: 4, w: 6, h: 4 }
  ],
  md: [
    { i: 'widget-1', x: 0, y: 0, w: 10, h: 2 },
    { i: 'widget-2', x: 0, y: 2, w: 10, h: 2 },
    { i: 'widget-3', x: 0, y: 4, w: 5, h: 4 },
    { i: 'widget-4', x: 5, y: 4, w: 5, h: 4 }
  ],
  sm: [
    { i: 'widget-1', x: 0, y: 0, w: 6, h: 2 },
    { i: 'widget-2', x: 0, y: 2, w: 6, h: 2 },
    { i: 'widget-3', x: 0, y: 4, w: 6, h: 4 },
    { i: 'widget-4', x: 0, y: 8, w: 6, h: 4 }
  ]
};

// Widget size configurations
const widgetSizes = {
  'overall-progress': { w: 12, h: 2, minW: 6, minH: 2 },
  'performance-metrics': { w: 12, h: 2, minW: 8, minH: 2 },
  'progress-chart': { w: 6, h: 4, minW: 4, minH: 3 },
  'goals-breakdown': { w: 6, h: 4, minW: 4, minH: 3 },
  'objective-comparison': { w: 12, h: 3, minW: 8, minH: 3 },
  'recent-activity': { w: 4, h: 4, minW: 3, minH: 3 },
  'objectives-grid': { w: 8, h: 3, minW: 6, minH: 2 },
  'team-overview': { w: 6, h: 3, minW: 4, minH: 3 },
  'upcoming-deadlines': { w: 6, h: 3, minW: 4, minH: 3 },
  'kpi-tracker': { w: 6, h: 3, minW: 4, minH: 2 }
};

export const useDashboardLayout = () => {
  const { user } = useAuth();
  const [widgets, setWidgets] = useState(defaultWidgets);
  const [layout, setLayout] = useState(defaultLayouts);

  // Load saved layout from localStorage
  useEffect(() => {
    if (user) {
      const savedLayout = localStorage.getItem(`dashboard-layout-${user.id}`);
      const savedWidgets = localStorage.getItem(`dashboard-widgets-${user.id}`);
      
      if (savedLayout) {
        setLayout(JSON.parse(savedLayout));
      }
      if (savedWidgets) {
        setWidgets(JSON.parse(savedWidgets));
      }
    }
  }, [user]);

  const saveLayout = (newLayouts) => {
    setLayout(newLayouts);
    if (user) {
      localStorage.setItem(`dashboard-layout-${user.id}`, JSON.stringify(newLayouts));
    }
  };

  const addWidget = (type) => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type,
      config: {}
    };

    // Calculate position for new widget
    const size = widgetSizes[type];
    const newLayoutItem = {
      i: newWidget.id,
      x: 0,
      y: Infinity, // Will be placed at the bottom
      ...size
    };

    // Add to all breakpoints
    const newLayouts = { ...layout };
    Object.keys(newLayouts).forEach(breakpoint => {
      newLayouts[breakpoint] = [...newLayouts[breakpoint], newLayoutItem];
    });

    setWidgets([...widgets, newWidget]);
    setLayout(newLayouts);

    if (user) {
      localStorage.setItem(`dashboard-widgets-${user.id}`, JSON.stringify([...widgets, newWidget]));
      localStorage.setItem(`dashboard-layout-${user.id}`, JSON.stringify(newLayouts));
    }
  };

  const removeWidget = (widgetId) => {
    const newWidgets = widgets.filter(w => w.id !== widgetId);
    const newLayouts = { ...layout };
    
    Object.keys(newLayouts).forEach(breakpoint => {
      newLayouts[breakpoint] = newLayouts[breakpoint].filter(item => item.i !== widgetId);
    });

    setWidgets(newWidgets);
    setLayout(newLayouts);

    if (user) {
      localStorage.setItem(`dashboard-widgets-${user.id}`, JSON.stringify(newWidgets));
      localStorage.setItem(`dashboard-layout-${user.id}`, JSON.stringify(newLayouts));
    }
  };

  const updateWidget = (widgetId, updates) => {
    const newWidgets = widgets.map(w => 
      w.id === widgetId ? { ...w, ...updates } : w
    );
    setWidgets(newWidgets);

    if (user) {
      localStorage.setItem(`dashboard-widgets-${user.id}`, JSON.stringify(newWidgets));
    }
  };

  const resetLayout = () => {
    setWidgets(defaultWidgets);
    setLayout(defaultLayouts);
    
    if (user) {
      localStorage.removeItem(`dashboard-widgets-${user.id}`);
      localStorage.removeItem(`dashboard-layout-${user.id}`);
    }
  };

  return {
    widgets,
    layout,
    saveLayout,
    addWidget,
    removeWidget,
    updateWidget,
    resetLayout
  };
};