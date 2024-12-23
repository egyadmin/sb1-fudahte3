import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Activity } from 'lucide-react';
import { SiteReports } from './SiteReports';
import { PerformanceReview } from './PerformanceReview';
import { ImprovementActions } from './ImprovementActions';

export const MonitoringControl: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Activity className={`w-6 h-6 text-indigo-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
        <h2 className="text-xl font-bold text-gray-900">
          {isRTL ? 'الرقابة والتحسين' : 'Monitoring and Improvement'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SiteReports />
        <PerformanceReview />
        <ImprovementActions />
      </div>
    </div>
  );
};