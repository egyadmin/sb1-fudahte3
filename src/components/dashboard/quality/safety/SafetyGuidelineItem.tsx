import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { AlertCircle } from 'lucide-react';

interface SafetyGuidelineItemProps {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  priority: 'high' | 'medium' | 'low';
}

export const SafetyGuidelineItem: React.FC<SafetyGuidelineItemProps> = ({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  priority
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const priorityStyles = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{isRTL ? titleAr : titleEn}</h4>
          <p className="text-sm text-gray-600 mt-1">
            {isRTL ? descriptionAr : descriptionEn}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm ${priorityStyles[priority]}`}>
          {priority === 'high' ? (isRTL ? 'عالي' : 'High') :
           priority === 'medium' ? (isRTL ? 'متوسط' : 'Medium') :
           (isRTL ? 'منخفض' : 'Low')}
        </span>
      </div>
    </div>
  );
};