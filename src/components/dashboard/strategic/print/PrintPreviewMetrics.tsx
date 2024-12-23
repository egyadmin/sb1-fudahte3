import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';

interface MetricProps {
  titleEn: string;
  titleAr: string;
  value: string | number;
  trend?: string;
  status?: string;
  className?: string;
}

export const PrintPreviewMetrics: React.FC<{ metrics: MetricProps[] }> = ({ metrics }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="grid grid-cols-3 gap-4 print-metrics">
      {metrics.map((metric, index) => (
        <div key={index} className="p-3 bg-gray-50 rounded-lg print-metric">
          <h4 className="text-sm font-medium text-gray-700">
            {isRTL ? metric.titleAr : metric.titleEn}
          </h4>
          <div className="mt-1">
            <span className="text-xl font-bold text-gray-900">{metric.value}</span>
            {metric.trend && (
              <span className={`ml-2 text-sm ${
                metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend}
              </span>
            )}
          </div>
          {metric.status && (
            <p className="text-sm text-gray-600 mt-1">{metric.status}</p>
          )}
        </div>
      ))}
    </div>
  );
};