import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { BarChart2 } from 'lucide-react';
import { useResourceEfficiency } from '../../../../hooks/useResourceEfficiency';

export const ResourceEfficiency: React.FC = () => {
  const { language } = useLanguage();
  const { efficiency } = useResourceEfficiency();
  const isRTL = language === 'ar';

  return (
    <div className="bg-purple-50 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <BarChart2 className={`w-5 h-5 text-purple-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        <h3 className="text-lg font-semibold">
          {isRTL ? 'كفاءة الموارد' : 'Resource Efficiency'}
        </h3>
      </div>
      <div className="space-y-4">
        {efficiency.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium text-gray-700">
                  {isRTL ? item.titleAr : item.titleEn}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {isRTL ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>
              <span className="text-lg font-semibold text-purple-600">
                {item.efficiency}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full"
                style={{ width: `${item.efficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};