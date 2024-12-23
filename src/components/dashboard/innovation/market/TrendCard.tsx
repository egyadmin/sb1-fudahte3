import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ArrowUpRight, ArrowRight, ArrowDownRight } from 'lucide-react';

interface TrendCardProps {
  titleEn: string;
  titleAr: string;
  growthRate: number;
  trendEn: string;
  trendAr: string;
  impactEn: string;
  impactAr: string;
}

export const TrendCard: React.FC<TrendCardProps> = ({
  titleEn,
  titleAr,
  growthRate,
  trendEn,
  trendAr,
  impactEn,
  impactAr
}) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const getTrendIcon = () => {
    if (growthRate > 20) return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    if (growthRate > 0) return <ArrowRight className="w-4 h-4 text-yellow-600" />;
    return <ArrowDownRight className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="p-3 border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{isRTL ? titleAr : titleEn}</h4>
        <div className="flex items-center">
          {getTrendIcon()}
          <span className="ml-1 text-sm font-medium">
            {growthRate > 0 ? '+' : ''}{growthRate}%
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        {isRTL ? impactAr : impactEn}
      </p>
      <div className="mt-2">
        <span className="text-sm text-indigo-600">
          {isRTL ? trendAr : trendEn}
        </span>
      </div>
    </div>
  );
};