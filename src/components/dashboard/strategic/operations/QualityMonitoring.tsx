import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';
import { useQualityMetrics } from '../../../../hooks/useQualityMetrics';

export const QualityMonitoring: React.FC = () => {
  const { language } = useLanguage();
  const { metrics } = useQualityMetrics();
  const isRTL = language === 'ar';

  return (
    <div className="bg-green-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <CheckCircle className={`w-5 h-5 text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold text-gray-900">
          {isRTL ? 'متابعة جودة العمل' : 'Quality Monitoring'}
        </h3>
      </div>
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-3 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">
                {isRTL ? metric.titleAr : metric.titleEn}
              </h4>
              <span className="text-sm font-medium text-indigo-600">
                {metric.score}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${metric.score}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {isRTL ? metric.statusAr : metric.statusEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};