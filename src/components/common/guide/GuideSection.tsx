import React from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { LucideIcon, ChevronDown } from 'lucide-react';

interface GuideSectionProps {
  icon: LucideIcon;
  titleEn: string;
  titleAr: string;
  steps: Array<{ en: string; ar: string }>;
  imageUrl: string;
}

export const GuideSection: React.FC<GuideSectionProps> = ({
  icon: Icon,
  titleEn,
  titleAr,
  steps,
  imageUrl
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <Icon className={`w-6 h-6 text-primary-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            <h3 className="text-xl font-bold text-gray-900">
              {isRTL ? titleAr : titleEn}
            </h3>
          </div>
          
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className={`flex items-center ${isRTL ? 'ml-3' : 'mr-3'}`}>
                  <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <ChevronDown className="w-4 h-4 text-primary-600 mx-2" />
                </div>
                <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">
                    {isRTL ? step.ar : step.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-64 flex-shrink-0">
          <img
            src={imageUrl}
            alt={isRTL ? titleAr : titleEn}
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};