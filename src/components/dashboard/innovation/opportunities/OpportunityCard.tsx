import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface OpportunityCardProps {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  statusEn: string;
  statusAr: string;
  impact: 'high' | 'medium' | 'low';
  score: number;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  statusEn,
  statusAr,
  impact,
  score
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const impactColors = {
    high: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-red-100 text-red-800'
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg">{isRTL ? titleAr : titleEn}</h3>
          <p className="text-gray-600 text-sm mt-1">
            {isRTL ? descriptionAr : descriptionEn}
          </p>
        </div>
        <div className="flex items-center">
          <BarChart2 className="w-4 h-4 mr-1 text-indigo-600" />
          <span className="font-medium">{score}%</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className={`px-2 py-1 rounded-full text-sm ${impactColors[impact]}`}>
          {impact === 'high' ? (isRTL ? 'تأثير عالي' : 'High Impact') :
           impact === 'medium' ? (isRTL ? 'تأثير متوسط' : 'Medium Impact') :
           (isRTL ? 'تأثير منخفض' : 'Low Impact')}
        </span>
        <span className="text-sm text-gray-600">
          {isRTL ? statusAr : statusEn}
        </span>
      </div>
    </div>
  );
};