import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import { DashboardMetrics } from './metrics/DashboardMetrics';
import { StrategicPlanning } from './strategic/StrategicPlanning';
import { HRManagement } from './hr/HRManagement';
import { FinancialManagement } from './financial/FinancialManagement';
import { ProcurementManagement } from './procurement/ProcurementManagement';
import { QualityManagement } from './quality/QualityManagement';
import { TechOperations } from './tech/TechOperations';
import { LegalCompliance } from './legal/LegalCompliance';
import { InnovationDevelopment } from './innovation/InnovationDevelopment';
import { DashboardReports } from './reports/DashboardReports';

export const DashboardContent: React.FC = () => {
  const { activeSection } = useNavigation();

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardMetrics />;
      case 'strategic-planning':
        return <StrategicPlanning />;
      case 'hr':
        return <HRManagement />;
      case 'finance':
        return <FinancialManagement />;
      case 'procurement':
        return <ProcurementManagement />;
      case 'quality':
        return <QualityManagement />;
      case 'tech':
        return <TechOperations />;
      case 'legal':
        return <LegalCompliance />;
      case 'innovation':
        return <InnovationDevelopment />;
      case 'reports':
        return <DashboardReports />;
      default:
        return <DashboardMetrics />;
    }
  };

  return <div className="space-y-6">{renderSection()}</div>;
};