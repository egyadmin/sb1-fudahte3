import React, { useState } from 'react';
import { ERPUsage } from './erp/ERPUsage';
import { DigitalTransformation } from './transformation/DigitalTransformation';
import { AnalyticsDashboard } from './analytics/AnalyticsDashboard';
import { ERPEntryForm } from './forms/ERPEntryForm';
import { TransformationForm } from './forms/TransformationForm';
import { AnalyticsForm } from './forms/AnalyticsForm';

export const TechOperations = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);

  const renderForm = () => {
    switch (activeForm) {
      case 'erp':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ERPEntryForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'transformation':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <TransformationForm onClose={() => setActiveForm(null)} />
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AnalyticsForm onClose={() => setActiveForm(null)} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderForm()}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ERPUsage onAddEntry={() => setActiveForm('erp')} />
        </div>
        <div className="space-y-6">
          <DigitalTransformation onAddInitiative={() => setActiveForm('transformation')} />
          <AnalyticsDashboard onAddMetric={() => setActiveForm('analytics')} />
        </div>
      </div>
    </div>
  );
};