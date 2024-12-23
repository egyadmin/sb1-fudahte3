import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Building2 } from 'lucide-react';
import { ResourceDeployment } from './ResourceDeployment';
import { QualityMonitoring } from './QualityMonitoring';
import { ProgressReports } from './ProgressReports';

export const OperationsExecution: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Building2 className={`w-6 h-6 text-indigo-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
        <h2 className="text-xl font-bold text-gray-900">
          {isRTL ? 'العمليات التنفيذية بالمواقع' : 'Site Operations Execution'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ResourceDeployment />
        <QualityMonitoring />
        <ProgressReports />
      </div>
    </div>
  );
};