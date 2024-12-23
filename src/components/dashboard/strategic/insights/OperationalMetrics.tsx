import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { Activity } from 'lucide-react';
import { useOperationalMetrics } from '../../../../hooks/useOperationalMetrics';

export const OperationalMetrics: React.FC = () => {
  const { language } = useLanguage();
  const { metrics } = useOperationalMetrics();
  const isRTL = language === 'ar';

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <Activity className={`w-5 h-5 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'مؤشرات العمليات' : 'Operational Metrics'}
        </h3>
      </div>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">
                {isRTL ? metric.titleAr : metric.titleEn}
              </span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                metric.trend > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {metric.trend > 0 ? '+' : ''}{metric.trend}%
              </span>
            </div>
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${metric.completion}%` }}
                  />
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-600">{metric.completion}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};