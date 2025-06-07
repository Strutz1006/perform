import React, { useState } from 'react';
import { CustomizableDashboard } from './CustomizableDashboard';
import { Button } from '../../../common/components/Button';
import { LayoutGrid, LayoutList } from 'lucide-react';

export const DashboardView = () => {
  const [useCustomizable, setUseCustomizable] = useState(true);

  return (
    <div>
      {/* Toggle between classic and customizable view */}
      <div className="flex justify-end mb-4">
        <Button
          size="small"
          variant="secondary"
          onClick={() => setUseCustomizable(!useCustomizable)}
        >
          {useCustomizable ? (
            <>
              <LayoutList className="w-4 h-4 mr-2" />
              Classic View
            </>
          ) : (
            <>
              <LayoutGrid className="w-4 h-4 mr-2" />
              Customizable View
            </>
          )}
        </Button>
      </div>

      {useCustomizable ? (
        <CustomizableDashboard />
      ) : (
        // Your existing dashboard view here
        <div>Classic Dashboard View</div>
      )}
    </div>
  );
};