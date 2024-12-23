import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useAnalytics } from '../../../../hooks/useAnalytics';

export const AnalyticsSummary: React.FC = () => {
  const { language } = useLanguage();
  const { metrics } = useAnalytics();
  const isRTL = language === 'ar';

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            {isRTL ? metric.titleAr : metric.titleEn}
          </p>
          <p className="text-xl font-bold text-gray-900 mt-1">
            {metric.value}
          </p>
          <div className={`text-sm ${
            metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
          }`}>
            {metric.trend}
          </div>
        </div>
      ))}
    </div>
  );
};