import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { BarChart2 } from 'lucide-react';
import { usePerformanceMetrics } from '../../../../hooks/usePerformanceMetrics';

export const PerformanceReview: React.FC = () => {
  const { language } = useLanguage();
  const { metrics } = usePerformanceMetrics();
  const isRTL = language === 'ar';

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <BarChart2 className={`w-5 h-5 text-blue-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'مراجعة الأداء' : 'Performance Review'}
        </h3>
      </div>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-3 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900">
                  {isRTL ? metric.titleAr : metric.titleEn}
                </h4>
                <p className="text-sm text-gray-600">
                  {isRTL ? metric.descriptionAr : metric.descriptionEn}
                </p>
              </div>
              <span className={`text-sm font-medium ${
                metric.trend > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend > 0 ? '+' : ''}{metric.trend}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  metric.trend > 0 ? 'bg-green-600' : 'bg-red-600'
                }`}
                style={{ width: `${metric.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};