import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { useMarketTrends } from '../../../../hooks/useMarketTrends';
import { ArrowUpRight, ArrowRight, ArrowDownRight } from 'lucide-react';

export const TrendList = () => {
  const { language } = useLanguage();
  const { trends } = useMarketTrends();
  const isRTL = language === 'ar';

  const getTrendIcon = (growthRate: number) => {
    if (growthRate > 20) return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    if (growthRate > 0) return <ArrowRight className="w-4 h-4 text-yellow-600" />;
    return <ArrowDownRight className="w-4 h-4 text-red-600" />;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technology':
        return 'bg-blue-100 text-blue-800';
      case 'market':
        return 'bg-purple-100 text-purple-800';
      case 'consumer':
        return 'bg-green-100 text-green-800';
      case 'industry':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 mt-6">
      {trends.map((trend) => (
        <div key={trend.id} className="p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium text-gray-900">
                {isRTL ? trend.titleAr : trend.titleEn}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {isRTL ? trend.impactAr : trend.impactEn}
              </p>
            </div>
            <div className="flex items-center">
              {getTrendIcon(trend.growthRate)}
              <span className={`ml-1 text-sm font-medium ${
                trend.growthRate > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.growthRate > 0 ? '+' : ''}{trend.growthRate}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(trend.category)}`}>
              {isRTL ? trend.categoryAr : trend.categoryEn}
            </span>
            <span className="text-sm text-gray-500">
              {isRTL ? trend.statusAr : trend.statusEn}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};