import React, { useState } from 'react';
import { HRTabs } from './common/HRTabs';
import { RecruitmentDashboard } from './recruitment/RecruitmentDashboard';
import { EmployeeDirectory } from './employees/EmployeeDirectory';
import { PolicyManagement } from './policy/PolicyManagement';
import { PerformanceReview } from './performance/PerformanceReview';

export const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('recruitment');

  const renderContent = () => {
    switch (activeTab) {
      case 'recruitment':
        return <RecruitmentDashboard />;
      case 'employees':
        return <EmployeeDirectory />;
      case 'policies':
        return <PolicyManagement />;
      case 'performance':
        return <PerformanceReview />;
      default:
        return <RecruitmentDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      <HRTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};