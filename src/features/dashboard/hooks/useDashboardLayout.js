import { useState, useEffect } from 'react';

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
  ]
};

export const useDashboardLayout = () => {
  const [widgets, setWidgets] = useState(defaultWidgets);
  const [layout, setLayout] = useState(defaultLayouts);

  // Load saved layout from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('dashboard-layout');
    const savedWidgets = localStorage.getItem('dashboard-widgets');
    
    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    }
    if (savedWidgets) {
      setWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  const saveLayout = (newLayouts) => {
    setLayout(newLayouts);
    localStorage.setItem('dashboard-layout', JSON.stringify(newLayouts));
  };

  const addWidget = (type) => {
    const newWidget = {
      id: `widget-${Date.now()}`,
      type,
      config: {}
    };

    const newLayoutItem = {
      i: newWidget.id,
      x: 0,
      y: Infinity,
      w: 6,
      h: 3
    };

    const newLayouts = { ...layout };
    Object.keys(newLayouts).forEach(breakpoint => {
      newLayouts[breakpoint] = [...newLayouts[breakpoint], newLayoutItem];
    });

    setWidgets([...widgets, newWidget]);
    setLayout(newLayouts);

    localStorage.setItem('dashboard-widgets', JSON.stringify([...widgets, newWidget]));
    localStorage.setItem('dashboard-layout', JSON.stringify(newLayouts));
  };

  const removeWidget = (widgetId) => {
    const newWidgets = widgets.filter(w => w.id !== widgetId);
    const newLayouts = { ...layout };
    
    Object.keys(newLayouts).forEach(breakpoint => {
      newLayouts[breakpoint] = newLayouts[breakpoint].filter(item => item.i !== widgetId);
    });

    setWidgets(newWidgets);
    setLayout(newLayouts);

    localStorage.setItem('dashboard-widgets', JSON.stringify(newWidgets));
    localStorage.setItem('dashboard-layout', JSON.stringify(newLayouts));
  };

  const updateWidget = (widgetId, updates) => {
    const newWidgets = widgets.map(w => 
      w.id === widgetId ? { ...w, ...updates } : w
    );
    setWidgets(newWidgets);
    localStorage.setItem('dashboard-widgets', JSON.stringify(newWidgets));
  };

  return {
    widgets,
    layout,
    saveLayout,
    addWidget,
    removeWidget,
    updateWidget
  };
};