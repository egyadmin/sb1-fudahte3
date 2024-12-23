import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';
import { useQualityTrends } from '../../../../hooks/useQualityTrends';

export const QualityTrends: React.FC = () => {
  const { language } = useLanguage();
  const { trends } = useQualityTrends();
  const isRTL = language === 'ar';

  return (
    <div className="bg-green-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <CheckCircle className={`w-5 h-5 text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'اتجاهات الجودة' : 'Quality Trends'}
        </h3>
      </div>
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-700">
                {isRTL ? trend.titleAr : trend.titleEn}
              </span>
              <span className={`text-sm ${
                trend.status === 'improved' ? 'text-green-600' :
                trend.status === 'stable' ? 'text-blue-600' : 'text-red-600'
              }`}>
                {isRTL ? trend.statusAr : trend.statusEn}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {isRTL ? trend.descriptionAr : trend.descriptionEn}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};