import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp } from 'lucide-react';
import { useImprovementProgress } from '../../../../hooks/useImprovementProgress';

export const ImprovementProgress: React.FC = () => {
  const { language } = useLanguage();
  const { progress } = useImprovementProgress();
  const isRTL = language === 'ar';

  return (
    <div className="bg-yellow-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <TrendingUp className={`w-5 h-5 text-yellow-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'تقدم التحسينات' : 'Improvement Progress'}
        </h3>
      </div>
      <div className="space-y-4">
        {progress.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium text-gray-700">
                  {isRTL ? item.titleAr : item.titleEn}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {isRTL ? item.impactAr : item.impactEn}
                </p>
              </div>
              <span className={`px-2 py-1 text-sm rounded-full ${
                item.status === 'completed' ? 'bg-green-100 text-green-800' :
                item.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {isRTL ? item.statusAr : item.statusEn}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};