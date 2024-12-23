import React from 'react';
import { PerformanceMetrics } from './metrics/PerformanceMetrics';
import { ReviewCycles } from './cycles/ReviewCycles';
import { TeamPerformance } from './team/TeamPerformance';
import { PerformanceActions } from './actions/PerformanceActions';

export const PerformanceReview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <PerformanceActions />
        <TeamPerformance />
      </div>
      <div className="space-y-6">
        <PerformanceMetrics />
        <ReviewCycles />
      </div>
    </div>
  );
};