import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { LineChart } from 'lucide-react';
import { OperationalMetrics } from './OperationalMetrics';
import { QualityTrends } from './QualityTrends';
import { ResourceEfficiency } from './ResourceEfficiency';
import { ImprovementProgress } from './ImprovementProgress';

export const StrategicInsights: React.FC = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <LineChart className={`w-6 h-6 text-indigo-600 ${isRTL ? 'ml-3' : 'mr-3'}`} />
        <h2 className="text-xl font-bold text-gray-900">
          {isRTL ? 'التحليل الاستراتيجي' : 'Strategic Analysis'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OperationalMetrics />
        <QualityTrends />
        <ResourceEfficiency />
        <ImprovementProgress />
      </div>
    </div>
  );
};